const nunjucks = require('nunjucks');

const fetch = require('node-fetch');
const { toLength } = require('lodash');

const fs = require('fs')
// const fse = require('fs-extra')

const path = require('path');
// const uuid = require("uuid-v4");
// const shortid = require("shortid");


async function asetcookie(fastify, req, reply, rec) {
  alert('no used')
  // if (rec.Filename !== '') reply.setCookie("ImageFilename", rec.Filename, { path: `/` })
  // if (rec.Title !== '') reply.setCookie("ImageTitle", rec.Title, { path: '/' })
  // if (rec.Modal !== '') reply.setCookie("ImageModal", rec.Modal, { path: '/' })
  // if (rec.image_id !== '') reply.setCookie("image_id", rec.image_id, { path: '/' })
  // if (rec.imageIdx !== '') reply.setCookie("imageIdx", rec.imageIdx, { path: '/' })
  // if (rec.selectedmenu !== '') reply.setCookie("selectedmenu", rec.selectedmenu, { path: '/' })
  // if (rec.selectedmenuindex !== '') reply.setCookie("selectedmenuindex", rec.selectedmenuindex, { path: '/' })
  // if (rec.sessionId !== '') reply.setCookie("sessionId", rec.sessionId, { path: '/' })
  // if (rec.selectedmenu_ !== '') reply.setCookie("session", rec.sessionId, { path: `/` })

  // // if(rec.selectedmenu_!=='') reply.setCookie(`selectedmenu_${req.session.id}`, rec.selectedmenu, { path: '/' })
  // // if(rec.selectedmenu_!=='') reply.setCookie("session",req.session.id,{ path: `/` })
  // // if(rec.selectedmenu_!=='') reply.setCookie(`selectedmenu_${rec.sessionId}`, rec.selectedmenu, { path: '/' })

  return 'done'


}

// async function resetenv(fromendpoint, fastify, reply) {
  // await resetenv('landing', moid, selectedmenu, selectedmenuindex,imageidx, fastify, reply)

  async function resetenvorig(fromendpoint, fastify, reply) {

    images = await fastify.inject({
      method: 'get',
      url: `/api/gallerynm/imagesnew`
    }).then((res) => res.json());
    images = images.data;
    // menus index created by saved script fixMenu3.js. Nove to node
    menus = await fastify.inject({
      method: 'get',
      url: `/api/gallerynm/menu?filter={"menuid":3.0}`
    }).then((res) => res.json());
    menus = menus.data[0];
    menuOptions2 = menus.menus; // menus.menuOptions2;
    menuOptions3 = menus.menus; // Options3;
    console.log('menuOptions3', menuOptions3);
    // not used
    defmenu = "current"
  
  
    //******************************/
    //   set defaults
    selectedmenu = 'hc';
    selectedmenuindex = +21
    //******************************/
  
  
    categoryImages = await fastify.inject({
      method: 'get',
      url: `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
    }).then((res) => res.json());
    categoryImages = categoryImages.data
  
  
    image = categoryImages[0]
    // console.log('categoryImages', categoryImages, categoryImages.length)
    headobj = { 'HX-Trigger': `get-numbers` }
    reply.headers = headobj
    title = 'NM Gallery'
    imageIdx = 0 * 1
    Video = ''
    Videopath = ''
    selectedIdx = imageIdx
    selectedContent = ''
    modalContent = ''
    imgModal = ''
    selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)
    selectedhtm = '';
    marginLeft = "600px"
    menuidx = menuOptions3.findIndex(x => x.id === selectedmenu)
    selectedmenudesc = menuOptions3[menuidx].name
  
    image_id = image._id
    Modal = image.Modal
    starcounter = 0;
    showAlert = false
  
    menu3 = [];
    ct = 0
    // hello = 'version:51A2.05'
    hello = 'htmx-nina55.6'
    //'3 based off htmx-nina51A2  issue with multi users changing cat and going off page'
    return 'success'
  
  }



async function resetenv(fromendpoint, mongoid, selectedmenu, selectedmenuindex,imageIdx, fastify, reply) {
  
  images = await fastify.inject({
    method: 'get',
    url: `/api/gallerynm/imagesnew`
  }).then((res) => res.json());
  images = images.data;

  // menus index created by saved script fixMenu3.js. Nove to node
  menus = await fastify.inject({
    method: 'get',
    url: `/api/gallerynm/menu?filter={"menuid":3.0}`
  }).then((res) => res.json());
  menus = menus.data[0];
  menuOptions2 = menus.menus; // menus.menuOptions2;
  menuOptions3 = menus.menus; // Options3;
  console.log('menuOptions3', menuOptions3);
  //   set defaults

  if (mongoid !== '0') {
    // this is from copytotext
 

  //******************************/

    let item = images.find(x => x._id === mongoid) //fastify from id to _id
    
    selectedmenu = item.Cat1;
   //  let menunitem = menuOptions3.find(x => x.id === selectedmenu) //fastify from id to _id
    // "name" : "flowers",
    // "index" : NumberInt(18),
    // selectedmenuindex = +menunitem.index
    // categoryImages = images.filter(x => x.Cat1 === selectedmenu)
   
    


  } else {
   // imageIdx=0
    if (selectedmenu === undefined || selectedmenu === 0) {
       //******************************/
      //   set defaults
      selectedmenu = 'hc';
      selectedmenuindex = +21
      defaultimageid=0
    } else {
      selectedmenu = selectedmenu;
      selectedmenuindex = +selectedmenuindex;
    }
  }
  //******************************/
  let catimageidx=imageIdx


  categoryImages = await fastify.inject({
    method: 'get',
    url: `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
  }).then((res) => res.json());
  categoryImages = categoryImages.data
  if (mongoid !== '0') {  
    catimageidx = categoryImages.findIndex(x => x._id === mongoid)
  console.log(catimageidx)
  };

  image = categoryImages[catimageidx]
  // console.log('categoryImages', categoryImages, categoryImages.length)
  headobj = { 'HX-Trigger': `get-numbers` }
  reply.headers = headobj
  title = 'NM Gallery'
  imageIdx = 0 * 1
  Video = ''
  Videopath = ''
  selectedIdx = imageIdx
  selectedContent = ''
  modalContent = ''
  imgModal = ''
  selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)
  selectedhtm = '';
  marginLeft = "600px"
  menuidx = menuOptions3.findIndex(x => x.id === selectedmenu)
  selectedmenudesc = menuOptions3[menuidx].name

  image_id = image._id
  Modal = image.Modal
  starcounter = 0;
  showAlert = false

  menu3 = [];
  ct = 0
  // hello = 'version:51A2.05'
  hello = 'htmx-nina54'
  //'3 based off htmx-nina51A2  issue with multi users changing cat and going off page'
  return 'success'

}

async function buildmodels(make, selectedmodal) {
  const carmakes = {
    'audi': `<option value='a3'>a3</option>
  <option selected value='a6'>a6</option>
  <option value='a7'>a7</option >`, 'bmw': `<option value='325i'>325i</option>
  <option value='325ix'>325ix</option> <option selected value='X5'>X5</option >`,
    'toyota': 'aa', 'alpha': 'bb'
  }
  let aa = carmakes['audi']

  const models = [{ name: 'a3', cat: 1 }, { name: 'a6', cat: 2 }, { name: 'a7', cat: 1 }]

  const carnames = models
    .filter((model) => model.cat === 1)
    .map((model) => model.name)
  //console.log(carnames)


  const foods = [
    {
      name: '🍔',
      group: 1,
    },
    {
      name: '🍨',
      group: 1,
    },
    {
      name: '🍿',
      group: 2,
    },
    {
      name: '🍵',
      group: 1,
    },
  ]
  const names = foods
    .filter((food) => food.group === 1)
    .map((food) => food.name)
  // console.log(names) // [ '🍔', '🍨', '🍵' ]

  let payload = '';
  switch (make) {
    case 'audi':
      payload = `<option value='a3'>a3</option>
<option selected value='a6'>a6</option>
<option value='a7'>a7</option >`
      break
    case 'bmw':
      payload = `<option value='325i'>325i</option>
<option value='325ix'>325ix</option>
<option selected value='X5'>X5</option >`
      break
    case 'toyota':
      payload = `<option value='celica'>celica</option>
<option value='camry'>camry</option>
<option selected value='prius'>prius</option >`
      break
    case 'alpha':
      payload = `<option selected value='stelvio'>stelvio</option>
<option value='julia'>julia</option> `
      break
  }
  // console.log('payload ', payload)
  return payload
};


async function buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx) {
  menu = id = "themenu"
  marginLeft = "400px"
  img2 = '';
  img = '';
  //menu= img= title=
  imgSmall = "";
  if (image.Video === 'Y') {
    imgSmall = `
      <div id='selimage'>
      <div class="row">
       <span id="themenu" style="display:none">${selectedmenu}</span>
      <span id="theimage" style="display:none">${selectedimage}</span>
      <span id="thetitle" style="display:none">${selectedTitle}</span>
      <span id="theimageidx" style="display:none">${imageIdx}</span>
         
      <div class="col-md">
      <p><b>Press play for Video</b></p>
      <iframe src="${image.Videopath}" width="99%" height="400px"></iframe>
      </div>
      </div>
    
    </div>`
    //  console.log(imgSmall)
  } else {
    //   alt="${image.Alttag}"
    let s1 = `/api/gallerynm/images?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
   
    

    // <span id="themenu" >${selectedmenu}</span>
    // <span id="theimage">${selectedImage}</span>
    // <span id="thetitle" >${selectedTitle}</span>
    // <span id="theimageidx" >${imageIdx}</span>
    imgSmall = `
      <div class="row">
      <span id="themenu" style="display:none">${selectedmenu}</span>
      <span id="theimage" style="display:none">${selectedImage}</span>
      <span id="thetitle" style="display:none">${selectedTitle}</span>
      <span id="theimageidx" style="display:none">${imageIdx}</span>
      
       
      <div class="col-md-8" style="text-align: left">
      <a
      id='currentimage'
      class='pointer'
      hx-get='/api_view/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}'
      hx-target="body"
      hx-swap="beforeend"
      hx-trigger="click">
      <img alt1="${image.Filename}" alt2="${selectedmenu}" class="responsive-img" src="https://storage.googleapis.com/ninaimages/${selectedImage}" 
       alt="${image.Title}"
      />
                    </a>
                    <br>     <br>  
                 
         </div>
                   <div class="col-md-4" style="text-align: left">
                    <a class='pointer' hx-target="#selimage" 
                    hx-get="/api_view/get-image/-/${image_id}/${imageIdx}/${selectedmenu}" hx-trigger="click">
                      prev
                    </a>
                    <a  id="nextbut"               
                      class='pointer'
                      hx-target="#selimage"
                      hx-get="/api_view/get-image/+/${image_id}/${imageIdx}/${selectedmenu}"
                      hx-trigger="click">   &nbsp;&nbsp;&nbsp;&nbsp;next </a>
                    <br> <br>
                    <a
                    id='currentimage'
                      class='pointer'                    
                      hx-get='/api_view/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}'
                      hx-target="body"
                      hx-swap="beforeend"
                      hx-trigger="click">
                      thumbs [${categoryImages.length}]
                    </a>
                    <br> <br>
                    <a class='pointer' onclick="textToClipboard('${image_id}')" hx-trigger="click">click to copy page link</a>
                    <span style="margin-left:20px">${selectedContent}</span>
                   
                    ${selectedImage}     
                    <br> 
                    `

    if (image.Modal.length > 0) {
      imgSmall += `
          <a  class='pointer'  hx-target="#infoModal" hx-swap="innerHTML"
          ' hx-get="/api_view/modalContent" hx-target="#infoModal" 
           hx-trigger="click">
           <br> <span class="href"> read more...</span>
          </a><br>         <br>
              `
    }



    imgSmall += `
                  </div>
                 </div>
              </div>`


  }


  return imgSmall
}

async function loadimage(img, selectedContent) {
  // this.roleid = index;  Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal
  console.log('img', img)
  Video = 0
  if (img !== undefined && img.Video !== undefined) {
    if (img.Video === 'Y') {
      Video = 1;
      Videopath = img.Videopath

    } else {
      Video = 0
    }
  }

  selectedImage = img.Filename;
  selectedTitle = img.Title;
  selectedAlttag = img.Alttag;
  let xx = img.Medium + img.Size + img.Year;

  if (xx.length > 0) {
    selectedContent = '<br><br><strong>' + img.Title + '</strong><br>' + img.Medium +
      '<br>' + img.Size + '<br>' + img.Year + '<br>' + img.Price + '<br>' + img.Caption

  } else {
    selectedContent = '<br><br><strong>' + img.Title + '</strong> <br>' + img.Caption
  }
  if (img.Modal === undefined) img.Modal = ""
  modalContent = '<br><br><strong><spa' + img.Title + '</strong> <br>' + img.Caption + ' <br> ' + img.Modal;
  return selectedContent

}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getEntity(fastify, database, collection) {
  const entity = fastify.mongo[database].db.collection(collection);
  return entity;
}
module.exports = async function (fastify, opts) {
  //  console.log('Data service started...');

  const io = // fastify.io // socketio

    function getProp(object, keys, defaultVal) {
      keys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
      object = object[keys[0]];
      if (object && keys.length > 1) {
        return getProp(object, keys.slice(1), defaultVal);
      }
      return object === undefined ? defaultVal : object;
    }

  function reviver(key, value) {
    if (typeof value === 'string') {
      if (/\d{4}-\d{1,2}-\d{1,2}/.test(value) ||
        /\d{4}\/\d{1,2}\/\d{1,2}/.test(value)) {
        return new Date(value);
      } else if (key === '_id') {
        return require('mongodb').ObjectId(value);
      }
    }
    return value;
  }


  ///////////////////////


  fastify.get('/get_sleep', {
  },
    async (req, reply) => {

      starcounter++
      await sleep(500);

      reply.setCookie("starcounter", starcounter, { path: '/' })
      console.log(starcounter);

      return reply.send(starcounter);

    })


  fastify.get('/get-counter/:sign', {
  },
    async (req, reply) => {
      let { sign } = req.params;

      await sleep(500);
      // if ( starcounter===2 ) { 
      // reset just no good way
      //
      reply.setCookie("starcounter", starcounter, { path: '/' })
      console.log(starcounter);

      return reply.send(starcounter);

    })

  // 
  // // for gallery thumbs
  fastify.get('/:database/:collection',
    {
      //     preValidation: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            database: {
              description: 'The database name',
              // summary: 'The database name',
              type: 'string'
            },
            collection: {
              description: 'The collection name',
              // summary: 'The collection name',
              type: 'string'
            }
          }
        },
        querystring: {
          type: 'object',
          properties: {
            filter: {
              description: 'The filter criteria as a JSON string',
              // summary: 'The filter criteria',
              type: 'string'
            },
            orderBy: {
              description: 'The orderBy expression as a JSON string',
              // summary: 'The orderBy expression',
              type: 'string'
            },
            limit: {
              description: 'The limit ',
              // summary: 'The limit',
              type: 'integer'
            },
            skip: {
              description: 'The ,skip ',
              // summary: 'The skip',
              type: 'integer'
            },
            fo: {
              description: 'The find one flag',
              // summary: 'Find one',
              type: 'boolean'
            },
            f: {
              description: 'The fields object',
              // summary: 'The fields object',
              type: 'string'
            },
            c: {
              description: 'Count the number of documents',
              // summary: 'Count',
              type: 'boolean'
            }
          },
          required: []
        },

      },

    },
    async (req, reply) => {

      const { database, collection } = req.params;
      // const { filter, orderBy, limit = 0, skip = 0, fo = false, f = null, c = false, ci, filterregex } = req.query;
      const { filter, orderBy, limit = 0, skip = 0, fo = false, f, c = false, ci, filterregex } = req.query;
      let query = {};
      let sort = {};
      let project = {};
      let findOne = fo;
      // console.log(" fastify.authenticate, req.session.authenticated", fastify.authenticate, req.session.authenticated) //[0].lastName} `)
      //   console.log("collection", database, collection, orderBy)//, req.query)

      //http://localhost:9020/api/parktower/po?orderBy={"POID":-1}&f={"POID":1,"VendorID":1}&limit=1
      //"{\"Cat1\":\"rt\"}"
      // filer+='}'
      // filter='{"Cat1":"beach"}'
      if (filter !== undefined) {
        //console.log('filter', filter)
        query = JSON.parse(filter, reviver);
        //  console.log('359 query', query)
      }


      if (orderBy) {
        sort = JSON.parse(orderBy)//, reviver);
      }
      // console.log('orderBy  ', ' sort ', sort)
      // console.log('limit ', limit)
      // console.log('query +', query)

      //// if (f) {
      ////   console.log(f);
      ////   project = JSON.parse(f);
      //// }
      //// console.log('project +', project)

      const entity = getEntity(fastify, database, collection);
      let result;
      if (findOne) {
        if (f) {
          result = await entity.findOne(query, {
            projection: project
          });
        } else {
          result = await entity.findOne(query);
        }
      } else {
        if (f) {
          // let pp={POID:1,VendorID:1}
          result = await entity.find(query).project(project).sort(sort).skip(+skip).limit(+limit).toArray();
        } else {
          if (c) {
            result = await entity.find(query).count();
          } else {
            result = await entity.find(query).sort(sort).skip(+skip).limit(+limit).toArray();
            //  result = await entity.find(query).toArray();
          }
        }
      }

      if (collection === 'imagesnew') {
        let payload = ''
        // ths loads cat tn images into modal
        // now find the desc of category
        const selectedmenuid = result[0].Cat1;


        menus = await fastify.inject({
          method: 'get',
          url: `/api/gallerynm/menu?filter={"menuid":3.0}`
        }).then((res) => res.json());
        menus = menus.data[0];
        menuOptions3 = menus.menus;//menuOptions3;

        // let  selectedmenitem = menuOptions3.findIndex(x => x.id === selectedmenuid)
        // let  selectedmenudesc = menuOptions3[selectedmenitem].name

        // let
        selectedmenuitem = menuOptions3.find(x => x.id === selectedmenuid)

        selectedmenudesc = selectedmenuitem.name;
        selectedmenuindex = selectedmenuitem.index;
        // see get-select-cats

        // selectedmenu
        // const selectedmenudesc = result[0].Cat1;
        // payload += `<div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        // <div class="-m-1 flex flex-wrap md:-m-2">`
        // codepen-wrapper
        // <h1>${selectedmenudesc}  <button _="on click trigger closeModal" class="button">Close</button></h1>
        // <section class="gallery">`

        // this is how the catalog modal with thumbs works
        // change <div class="modal-content"> to  <div class="modal-content-readme">
        payload = `
    <div id="modal" _="on closeModal add .closing then wait for animationend then remove me">
    
    <div class="modal-content">
    <div class="modal__wrapper">
    <h2>${selectedmenudesc} 
    
    <a class='pointer' style="float: right;" _="on click trigger closeModal" >Close</a> 
    </h2>
    
    <br> 
    <section class="gallery">`
        let ct = 0
        let collectiontype
        let htm = '';

        for (const rec of result) {
          ct++
          // console.log(ct, rec.Filename)
          collectiontype = 'ninaimages';//live
          // htm +=   `<a  class='href'
          //   hx-on="htmx:afterSettle: outputMessage()"
          // <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_${rec.Filename}"  alt="_${rec.Title}" alt1="${rec.Filename}" alt2="${selectedmenu}" >

          payload += `<a  class='href'
         
          hx-target="#selimage"
            hx-refresh="true"
            hx-get="/api_view/get-thumbnail/${rec.Filename}/${rec.Cat1}" 
            hx-trigger="click"          
            _="on click trigger closeModal">
            <img alt1="${rec.Filename}" alt2="${selectedmenu}" class="thumb-img" 
            src="https://storage.googleapis.com/ninathumbs-square/tn256_${rec.Filename}"  alt="${rec.Title}"
           </a>`

        }
        // payload +=htm+ ` 
        payload += `
 
  </section>
  <a class='pointer' style="float: right;" _="on click trigger closeModal" >Close</a> 
  
  </div>
  </div>
  </div>`

        return payload
      }

      // <a class='pointer' style="float: right;position: relative;" _="on click trigger closeModal" >Close</a> 


      // <button _="on click trigger closeModal" class="button">Close</button>




      if (collection === 'posts') {
        return reply.send(result[0].postContent)

      }
      return result[0];
    });

  /////////////////
  fastify.get("/posting/:posttitle",
    async (request, reply) => {
      const { posttitle } = request.params;

      imageidx = categoryImages.findIndex(x => x.Filename === image.Filename)

      image = categoryImages[imageidx]


      return reply.view('parts/posttemplate.njk', { posttitle: posttitle });//, post: post, image: image });
    });

  fastify.get("/switch",
    async (request, reply) => {

      if (displaywork === true) { displaywork = false } else displaywork = true
      return
    });

  /////////////////////////
  // http://localhost:8081/api_view/works/0/hc/HarmonicConvergence0stones.jpg/Harmonic%20Convergence:%20Stones

  // fastify.get("/works/:posttitle/:menu/:image/:title",
  //http://localhost:8081/api_view/works/STATEMENT/p_current/P1170382_1346-6x6.jpg/#1346/2
  // localhost:8081/api_view/works/STATEMENT/p_current/P1170382_1346-6x6.jpg/2/#1346
  fastify.get("/works/:posttitle/:menu/:imagefilename/:imageIdx/:imagetitle",

    async (req, reply) => {
      let { posttitle, menu, imagefilename, imageIdx, imagetitle } = req.params;

      let { param } = req.query;
      //
      //99  let sessionId = req.cookies.sessionId

      // console.log('===  req.cookies.ImageFilename===============================',  req.cookies.ImageFilename,req.cookies.imageIdx);
       //99 console.log('=== posttitle =====', posttitle);
      //99  console.log('===  menu =====', menu);
      //99  console.log('===  imagefilename  ===', imagefilename);
      //99  console.log('===  imagetitle =====', imagetitle, " imageIdx ", imageIdx);


      if (menu === 'menu') menu = 0

      if (menu === -1) {
        return reply.view('_works.njk', {
          //'Htmx/NMGallery'
          title: title, hello: hello, selectedImage: image.Filename, image: image, images: images, menus: menus,
          selectedmenu: selectedmenu, menuOptions2: menuOptions2, imageIdx: imageIdx, selectedContent: selectedContent
          , Video: Video, Videopath: Videopath, modalContent: modalContent, imgModal: imgModal, selectedhtm: selectedhtm,
          marginLeft: marginLeft, categoryImages: categoryImages, image_id: image._id, selectedmenudesc: selectedmenudesc,
          Modal: Modal, menuOptions3: menuOptions3, starcounter: starcounter, menuidx: menuidx,
          showAlert: showAlert, selectedmenuindex: selectedmenuindex, displaywork: displaywork
          , demoSetBlock: 'demoSetBlock'
        });
      } else {


        title = posttitle;
        demoSetBlock = ''
        if (posttitle === '-99') {
          // 'STATEMENT') {
          posttitle = '0';
          //   <li>
          //   <a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imagetitle}"
          //     hx-target='body'
          //     hx-swap="outerHTML"    
          //     hx-on="htmx:beforeRequest:openView('STATEMENT')"
          //     >statement 00
          //   </a>
          //  </li> 
          demoSetBlock = `
          <li>
           <a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
             hx-target='body'  
             hx-swap="outerHTML"            
             hx-on="htmx:beforeRequest:openView('STATEMENT')"
             >statement99 
           </a>
          </li> 
          <li>
            <a  hx-get="/api_view/works/VITAE/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
             hx-target='body'  
             hx-swap="outerHTML"            
             hx-on="htmx:beforeRequest:openView('VITAE')"
            >vitae
            </a>
          </li> 
          <li>
           <a hx-get="/api_view/works/CONTACT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
            hx-target='body'
            hx-swap="outerHTML"    
            hx-on="htmx:beforeRequest:openView('CONTACT')"
           >contact
           </a>
         </li> 
`
        } else {


          //   <li>
          //   <a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imagetitle}"
          //    hx-target='body'
          //    hx-swap="outerHTML"    
          //    hx-on="htmx:beforeRequest:openView('STATEMENT')"
          // >statement 0
          //  </a>
          //  </li>  
          //  landingworks - ${selectedmenuindex} / ${menu}  </a>
          // 89
          // console.log(`${selectedmenuindex}/${menu}/${imagefilename}/${imageIdx}/${imagetitle}`)
// ${imagetitle}
// not sure about 
console.log(`1 ${selectedmenuindex}`)
selectedmenuindex = menuOptions3.findIndex(x => x.id === menu)// fix for 54a
console.log(`2 ${selectedmenuindex}`)

// works ${selectedmenuindex}/${menu}/${imagefilename}
// https://calm-rainfall-360818.uk.r.appspot.com/api_view/landingworks/59dc20526eef4855c6982228/0/0/0/0/0

//image_id
/* <li> <a hx-get="/api_view/landingworks/${image_id}/0/0/0/0/0"
hx-target='body'
hx-swap="outerHTML">
last 
</li>   */
          demoSetBlock = `
   


  <li> <a hx-get="/api_view/landingworks/0/${selectedmenuindex}/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
   hx-target='body'
   hx-swap="outerHTML">
   works 
  </li>         
      
  <li>
  <a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
   hx-target='body'
   hx-swap="outerHTML"    
 
>statement
 </a>
 </li> 
 <li>
 <a hx-get="/api_view/works/VITAE/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
  hx-target='body'
  hx-swap="outerHTML"    

>vitae 
</a>
</li> 

<li>
<a hx-get="/api_view/works/CONTACT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
 hx-target='body'
 hx-swap="outerHTML"    

>contact
</a>
</li> 
        `

          //         zdemoSetBlock = `
          //    <li>
          //     <a
          //     hx-get="/api_view/works/0/${menu}/${imagefilename}/${imagetitle}"
          //     hx-target='body'
          //     hx-swap="outerHTML">
          //    works [${menu} ${imagefilename} ${imagetitle} ] </a>
          //    </li>  



          //  <li>
          //  <a
          //  hx-get="/api_view/landingworks/${selectedmenuindex}/${menu}/${imagefilename}/${imagetitle}"
          //  hx-target='body'
          //  hx-swap="outerHTML">
          //  landingworks - ${selectedmenuindex} / ${menu}  </a>
          // </li>  

          //   <li><a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imagetitle}" hx-target='body' hx-swap="outerHTML" 

          //   hx-on="htmx:beforeRequest:openViewWorks('STATEMENT','${menu}','${imagefilename}','${imagetitle}')">
          //   statement </a>
          //   </li>

          //   <li><a hx-get="/api_view/works/VITAE/${menu}/${imagefilename}/${imagetitle}" hx-target='body' hx-swap="outerHTML" 

          //   hx-on="htmx:beforeRequest:openViewWorks('VITAE','${menu}','${imagefilename}','${imagetitle}')">
          //   vitae </a>
          //   </li>

          //   <li>
          //   <a hx-get="/api_view/works/CONTACT/${menu}/${imagefilename}/${imagetitle}" hx-target='body' hx-swap="outerHTML" 

          //   hx-on="htmx:beforeRequest:openViewWorks('CONTACT','${menu}','${imagefilename}','${imagetitle}')">
          //   contact </a>
          //   </li>

          //   `


        }

        console.log('demoSetBlock ', demoSetBlock)

        if (posttitle === '0') {
          displaywork = true


          // if(categoryImages[0].Cat1 !==req.cookies.selectedmenu)
          // categoryImages = images.filter(x => x.Cat1 ===   req.cookies.selectedmenu)
          // sep 6

          // images has entire array of images
          categoryImages = images.filter(x => x.Cat1 === menu)
          // no more cookies Sep 7 
          //menu,image ,title ${menu}','${imagefilename}','${imagetitle}
          // let newimageidx = categoryImages.findIndex(x => x.Filename === req.cookies.ImageFilename);

          let newimageidx = categoryImages.findIndex(x => x.Filename === imagefilename);

          if (newimageidx < 0) newimageidx = 0
          image = categoryImages[newimageidx];

          //     imageidx = categoryImages.findIndex(x => x._id === image_id) 

          Video = ''
          Videopath = ''
          selectedIdx = imageIdx
          selectedContent = ''
          modalContent = ''
          imgModal = ''
          selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)

          selectedhtm = '';
          marginLeft = "600px";
          // menuidx = menuOptions3.findIndex(x => x.id === selectedmenu)

          //  selectedmenuindex= menuOptions3.findIndex(x => x.id === selectedmenu)

          selectedmenuindex = menuOptions3.findIndex(x => x.id === menu);//param)
          // selectedmenudesc = menuOptions3[menuidx].name
          selectedmenudesc = menuOptions3[selectedmenuindex].name
          image_id = image._id
          Modal = image.Modal
          starcounter = 0
          showAlert = false
          //menu,image ,title ${menu}','${imagefilename}','${imagetitle}
          title = menu;//req.cookies.selectedmenu

          hello = menu + ' ' + selectedmenuindex + ' ' + selectedmenudesc

          //88   reply.setCookie("selectedmenu", menu, { path: '/' })


          console.log(hello);//menu,selectedmenuindex,selectedmenudesc)

          return reply.view('_works.njk', {
            // coming back from statement contact or vitae
            title: title, hello: hello, selectedImage: image.Filename, image: image, images: images, menus: menus,
            selectedmenu: selectedmenu, menuOptions2: menuOptions2, imageIdx: imageIdx, selectedContent: selectedContent
            , Video: Video, Videopath: Videopath, modalContent: modalContent, imgModal: imgModal, selectedhtm: selectedhtm,
            marginLeft: marginLeft, categoryImages: categoryImages, image_id: image._id, selectedmenudesc: selectedmenudesc,
            Modal: Modal, menuOptions3: menuOptions3, starcounter: starcounter, menuidx: menuidx,
            showAlert: showAlert, selectedmenuindex: selectedmenuindex, displaywork: displaywork
            , demoSetBlock: demoSetBlock, themenu: menu
          });

        } else {


          if (posttitle === 'STATEMENT') displaywork = 'STATEMENT';//false;
          if (posttitle === 'VITAE') displaywork = 'VITAE';
          if (posttitle === 'CONTACT') displaywork = 'CONTACT';

          // return reply.view('_works.njk', {
          //   //'Htmx/NMGallery'
          //   selectedmenu: selectedmenu, image: image, title: title, displaywork: displaywork, demoSetBlock: demoSetBlock
          // });
          return reply.view('_works.njk', {
            // coming back from statement contact or vitae
            title: title, hello: hello, selectedImage: image.Filename, image: image, images: images, menus: menus,
            selectedmenu: selectedmenu, menuOptions2: menuOptions2, imageIdx: imageIdx, selectedContent: selectedContent
            , Video: Video, Videopath: Videopath, modalContent: modalContent, imgModal: imgModal, selectedhtm: selectedhtm,
            marginLeft: marginLeft, categoryImages: categoryImages, image_id: image._id, selectedmenudesc: selectedmenudesc,
            Modal: Modal, menuOptions3: menuOptions3, starcounter: starcounter, menuidx: menuidx,
            showAlert: showAlert, selectedmenuindex: selectedmenuindex, displaywork: displaywork
            , demoSetBlock: demoSetBlock
          });
        }

      }
    });



  fastify.get("/landing", {

  },
    async (req, reply) => {

      // let sessionId = req.cookies.baz;

      // console.log('"""""""""""""""""""')
      // console.log('"sessionId======================', sessionId)
      // console.log('"""""""""""""""""""')
      let selectedmenu = 'hc';
      let selectedmenuindex = +21

      // await resetenv('landing', fastify, reply)
      let moid=''
      let imageidx = ''
      await resetenvorig('landing',fastify, reply)
    
      displaywork = false;
      // let rec = {}
      // rec.Filename = image.Filename
      // rec.Title = image.Title
      // rec.Modal = image.Modal
      // rec.image_id = image_id
      // rec.imageIdx = imageIdx
      // rec.selectedmenu = selectedmenu
      // rec.selectedmenuindex = selectedmenuindex

      // rec.sessionId = sessionId;//sid//sessionId
      // rec.aCookieValue = '';//aCookieValue
      // // rec.selectedmenu_ = '';
      // rec.selectedmenu_ = '1';

      // console.log('"""""""""""""""""""sid===========', sessionId)
      // console.log('"""""""""""""""""""sid===========')


      //88  let c = await asetcookie(fastify, req, reply, rec);


      //sessionId: sessionId
      return reply.view('_landing.njk', {
        title: title, hello: hello, selectedImage: image.Filename, image: image, images: images, menus: menus,
        selectedmenu: selectedmenu, menuOptions2: menuOptions2, imageIdx: imageIdx, selectedContent: selectedContent
        , Video: Video, Videopath: Videopath, modalContent: modalContent, imgModal: imgModal, selectedhtm: selectedhtm,
        marginLeft: marginLeft, categoryImages: categoryImages, image_id: image._id, selectedmenudesc: selectedmenudesc,
        Modal: Modal, menuOptions3: menuOptions3, starcounter: starcounter, menuidx: menuidx, showAlert: showAlert,
        selectedmenuindex: selectedmenuindex, displaywork: displaywork, imagetitle: image.Title


      });
    });


  // open link from winthin
  // ie http://localhost:8081/api_view/landingworks/0/15/line/line4_8080.jpg/4/starting%20w_(a)%20line:%208.1.18   
  // from copy text
  // ie http://localhost:8081/api_view/landingworks/5b88ac536ef575e807ea5621/0/0/0/0/0   
  // http://localhost:8081/api_view/landingworks/5b88d1156ef575e807ea5630/0/0/0/0/0   
  //  fastify.get("/landingworks/:selectedmenuindex/:menu/:imagefilename/:imageIdx/:imagetitle", {
  fastify.get("/landingworks/:mongoid/:selectedmenuindex/:menu/:imagefilename/:imageIdx/:imagetitle", {
  },
    async (req, reply) => {
      let { selectedmenuindex, mongoid, menu, imagefilename, imageIdx, imagetitle } = req.params;
      // let sessionId = req.cookies.baz;
      // console.log('"""""""""""""""""""')
      // console.log('"sessionId======================', sessionId)
       console.log('"""""""""imageIdx""""""""""',imageIdx)
      displaywork = true;
      if (mongoid !== '0') {
//async function resetenv(fromendpoint, mongoid, selectedmenu, selectedmenuindex,imageidx, fastify, reply) {
        selectedmenu=menu
        await resetenv('landing', mongoid,selectedmenu, 0, imageIdx,fastify, reply)
        Video = ''
        Videopath = ''
        selectedIdx = imageIdx
        selectedContent = ''
        modalContent = ''
        imgModal = ''
        selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)
        selectedmenu = image.Cat1;
       // let menunitem = menuOptions3.find(x => x.id === selectedmenu) //fastify from id to _id
       
        img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)
  
      } else {


        // if (typeof images === 'undefined') {
        //   // let selectedmenu = 'hc';
        //   // let selectedmenuindex = +21
        //   //let sessionId = req.cookies.baz;
        //   await resetenv('landing', mongoid, menu, selectedmenuindex,imageIdx, fastify, reply)
        // }
        await resetenv('landing', mongoid, menu, selectedmenuindex,imageIdx, fastify, reply)
        Video = ''
        Videopath = ''
        selectedIdx = imageIdx
        selectedContent = ''
        modalContent = ''
        imgModal = ''
        selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)
  
        selectedhtm = '';
        marginLeft = "600px";
       
        selectedmenuindex = menuOptions3.findIndex(x => x.id === menu);//param)
        // selectedmenudesc = menuOptions3[menuidx].name
        selectedmenudesc = menuOptions3[selectedmenuindex].name
        image_id = image._id
        Modal = image.Modal
        starcounter = 0
        showAlert = false
        //menu,image ,title ${menu}','${imagefilename}','${imagetitle}
        title = menu;//req.cookies.selectedmenu
  
        hello = menu + ' ' + selectedmenuindex + ' ' + selectedmenudesc
        //88  reply.setCookie("selectedmenu", menu, { path: '/' })
  
  
        console.log(hello);//menu,selectedmenuindex,selectedmenudesc)
        selectedmenu = menu
        img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)
  


      }

      // let rec = {}
      // rec.Filename = image.Filename
      // rec.Title = image.Title
      // rec.Modal = image.Modal
      // rec.image_id = image_id
      // rec.imageIdx = imageIdx
      // rec.selectedmenu = menu;//selectedmenu
      // rec.selectedmenuindex = selectedmenuindex

      // rec.sessionId = sessionId;//sid//sessionId
      // rec.aCookieValue = '';//aCookieValue
      // // rec.selectedmenu_ = '';
      // rec.selectedmenu_ = '1';
      // console.log('"""""""""""""""""""sid===========', sessionId)
      // console.log('"""""""""""""""""""sid===========')
      // let c = await asetcookie(fastify, req, reply, rec);
      // images has entire array of images
      //9 categoryImages = images.filter(x => x.Cat1 === menu)
      // no more cookies Sep 7 
      //menu,image ,title ${menu}','${imagefilename}','${imagetitle}
      // let newimageidx = categoryImages.findIndex(x => x.Filename === req.cookies.ImageFilename);
      //9 let newimageidx = categoryImages.findIndex(x => x.Filename === imagefilename);
      //9 if (newimageidx < 0) newimageidx = 0
      //9 image = categoryImages[newimageidx];
      //     imageidx = categoryImages.findIndex(x => x._id === image_id) 
    
    
      // Video = ''
      // Videopath = ''
      // selectedIdx = imageIdx
      // selectedContent = ''
      // modalContent = ''
      // imgModal = ''
      // selectedContent = await loadimage(image, selectedContent);// , selectedContent Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)

    
      //hx-on="htmx:beforeRequest:openView('STATEMENT')"
      demoSetBlock = `
<li>
 <a hx-get="/api_view/works/STATEMENT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
   hx-target='body'  
   hx-swap="outerHTML"            
   hx-on="htmx:beforeRequest:openView('STATEMENT')"
   >statement
 </a>
</li> 
<li>
  <a  hx-get="/api_view/works/VITAE/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
   hx-target='body'  
   hx-swap="outerHTML"            
   hx-on="htmx:beforeRequest:openView('VITAE')"
  >vitae
  </a>
</li> 
<li>
 <a hx-get="/api_view/works/CONTACT/${menu}/${imagefilename}/${imageIdx}/${imagetitle}"
  hx-target='body'
  hx-swap="outerHTML"    
  hx-on="htmx:beforeRequest:openView('CONTACT')"
 >contact
 </a>
</li> 
`

      return reply.view('_landingworks.njk', {
        // coming back from statement contact or vitae
        title: title, hello: hello, selectedImage: image.Filename, image: image, images: images, menus: menus,
        selectedmenu: selectedmenu, menuOptions2: menuOptions2, imageIdx: imageIdx, selectedContent: selectedContent
        , Video: Video, Videopath: Videopath, modalContent: modalContent, imgModal: imgModal, selectedhtm: selectedhtm,
        marginLeft: marginLeft, categoryImages: categoryImages, image_id: image._id, selectedmenudesc: selectedmenudesc,
        Modal: Modal, menuOptions3: menuOptions3, starcounter: starcounter, menuidx: menuidx,
        showAlert: showAlert, selectedmenuindex: selectedmenuindex, displaywork: displaywork
        , demoSetBlock: demoSetBlock, imagetitle: imagetitle
      });


    });

  // fastify.get('/get-select-cats', {
  fastify.get('/get-select-cats/:selectedmenuindex', {

  },
    async (req, reply) => {
      // was called from works 
      // i  changed from {# <div hx-get="/api_view/get-select-cats" hx-trigger="load"  #}
      // to <div hx-get="/api_view/get-select-cats-landing/{{selectedmenuindex}}/{{menu}}" hx-trigger="load" 
      let { selectedmenuindex } = req.params;
      let m = '';
      m += `   <select autocomplete="off"
        id="categoryselected"
        name="categoryselected"
        hx-get="/api_view/get-category"
        hx-target="#selimage"
        hx-refresh="true"
        hx-trigger="change">`
      let ct = -1
      for (const menu of menuOptions3) {
        ct++
        if (menu.link === 0) {
          if (menu.index > 1) {
            m += `</optgroup>\n`
          }
          m += `<optgroup label="${menu.name}">
             ${menu.id} 
             </option>\n`
        } else {
          // let smi = +req.cookies.selectedmenuindex;
          // console.log(ct, req.cookies.selectedmenuindex, req.cookies.selectedmenu)
          let smi = + selectedmenuindex
          console.log(ct, selectedmenuindex)
          if (ct === smi) {
            m += `<option selected value="${selectedmenu}">`
          }
          else {
            m += `<option value="${menu.id}">`
          }
          m += `${menu.name}</option>\n`
        }
      }
      m += `</optgroup>\n
         </select>       
         `
      return reply.send(m)
    })

  fastify.get('/get-select-cats-landing/:selectedmenuindex/:selectedmenu', {


  },
    async (req, reply) => {
      let { selectedmenuindex, selectedmenu } = req.params;
      console.log('  selectedmenuindex ,selectedmenu', selectedmenuindex, selectedmenu)
      let m = '';
      m += `   <select autocomplete="off"
                id="categoryselected"
                name="categoryselected"
                hx-get="/api_view/get-category"
                hx-target="#selimage"
                hx-refresh="true"
               
                hx-trigger="change">`
      let ct = -1
      for (const menu of menuOptions3) {
        ct++
        if (menu.link === 0) {
          if (menu.index > 1) {
            m += `</optgroup>\n`
          }
          m += `<optgroup label="${menu.name}">
                     ${menu.id} 
                     </option>\n`
        }

        else {

          let smi = +selectedmenuindex;
          // (ct === smi) ? m += `<option selected value="${selectedmenu}">` : m += `<option value="${menu.id}">`

          if (ct === smi) {
            console.log(' ct === smi ', ct, smi)
            m += `<option selected value="${selectedmenu}">`
          }
          else {
            m += `<option value="${menu.id}">`
          }
          m += `${menu.name}</option>\n`
        }
      }
      m += `</optgroup>\n
                 </select>       
                 `
      return reply.send(m)
    })


  fastify.get("/posts",
    async (request, reply) => {

      post = 'test'
      return reply.view('_mainpost.njk', { title: 'NinaGallery', post: post });
    });
  fastify.get("/htmxon",
    async (request, reply) => {
      selectedvalue = 14;
      return reply.view('_htmxon.njk', { title: 'htmxon' });
    });
  fastify.get("/htmxon0",
    async (request, reply) => {
      selectedvalue = 14;
      return reply.view('_htmxon0.njk', { title: 'htmxon' });
    });

  fastify.get("/htmxon1",
    async (request, reply) => {
      selectedvalue = 14;
      return reply.view('_htmxon1.njk', { title: 'htmxon' });
    });
  fastify.get('/get-select-val', {
  },
    async (req, reply) => {
      //selectedvalue=17;
      //  console.log('selectedvalue',selectedvalue)
      return reply.send(selectedvalue)
    })

  // from dropdown portfolio  
  fastify.get('/get-category', {
  },
    async (req, reply) => {

      //FIX

      selectedmenu = req.query['categoryselected']
      console.log( 'get-category 1 ',selectedmenu)
      if (selectedmenu==='') selectedmenu='line';//????
      let selectedmenitem = menuOptions3.find(x => x.id === selectedmenu)
      let selectedmenudesc = selectedmenitem.name
      selectedmenuindex = selectedmenitem.index


      //88
      // reply.setCookie("imageIdx", imageIdx, { path: '/' })
      // reply.setCookie("selectedmenu", selectedmenu, { path: '/' })
      // reply.setCookie("selectedmenuindex", selectedmenuindex, { path: '/' })

      let s1 = `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`

      categoryImages = await fastify.inject({
        method: 'get',
        url: `${s1}`
      }).then((res) => res.json());

      categoryImages = categoryImages.data
      imageIdx = 0
      image = categoryImages[imageIdx]
      image_id = image._id

      selectedImage = image.Filename
      selectedContent = await loadimage(image, selectedContent);
      marginLeft = "400px"
      // console.log('selectedImage', selectedImage)
      let menuidx = menuOptions3.findIndex(x => x.id == selectedmenu)
      selectedmenudesc = menuOptions3[menuidx].name
      // console.log('menuidx', menuidx, selectedmenudesc)
      Modal = image.Modal


      img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)


      // console.log('==================================');
      return reply.send(img);
    })
    fastify.get('/get-category/refresh', {
    },
      async (req, reply) => {
  
        //FIX
  
        selectedmenu = 'beach'
        // console.log( 'get-category 1 ',selectedmenu)
        // // if (selectedmenu==='') selectedmenu='line';//????
        // let selectedmenitem = menuOptions3.find(x => x.id === selectedmenu)
        // let selectedmenudesc = selectedmenitem.name
        // selectedmenuindex = selectedmenitem.index
        let s1 = `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
  
        categoryImages = await fastify.inject({
          method: 'get',
          url: `${s1}`
        }).then((res) => res.json());
  
        categoryImages = categoryImages.data
        return reply.send(categoryImages);
      })
  async function getcategoryfunc() {
    // console.log('selectedmenu ', selectedmenu);
    let s1 = `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
    // console.log(`s1:${s1}`)

    categoryImages = await fastify.inject({
      method: 'get',
      url: `${s1}`
    }).then((res) => res.json());


    categoryImages = categoryImages.data
    imageIdx = 0
    image = categoryImages[imageIdx]
    image_id = image._id
    selectedImage = image.Filename
    selectedContent = await loadimage(image, selectedContent);
    marginLeft = "400px"
    //console.log('selectedImage', selectedImage)
    let menuidx = menuOptions3.findIndex(x => x.id == selectedmenu)
    selectedmenudesc = menuOptions3[menuidx].name
    //console.log('menuidx', menuidx, selectedmenudesc)
    Modal = image.Modal
    // img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, selectedmenudesc, Modal)
    img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)


    return img
  }


  //:image_id/:imageIdx/:selectedmenu


  fastify.get('/get-thumbnail/:image/:selectedmenu', {

  },
    async (req, reply) => {
      let { image, selectedmenu } = req.params;
      console.log('==================================', image, selectedmenu);

      if (selectedmenu !== categoryImages[0].Cat1) {
        categoryImages = await fastify.inject({
          method: 'get',
          url: `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
        }).then((res) => res.json());
        categoryImages = categoryImages.data

      }

      imageIdx = await categoryImages.findIndex(x => x.Filename === image);



      image = categoryImages[imageIdx]

      selectedImage = image.Filename



      selectedContent = await loadimage(image, selectedContent);
      marginLeft = "400px"
      image_id = image._id
      Modal = image.Modal
      // let selectedmenitem = menuOptions3.find(x => x.id === req.cookies.selectedmenu)
      let selectedmenitem = menuOptions3.find(x => x.id === selectedmenu)

      selectedmenudesc = selectedmenitem.name
      selectedmenuindex = selectedmenitem.index
      // prev to 88
      // reply.setCookie("ImageFilename", image.Filename, { path: '/' })
      // reply.setCookie("ImageTitle", image.Title, { path: '/' })
      // reply.setCookie("ImageModal", image.Modal, { path: '/' })
      // reply.setCookie("image_id", image_id, { path: '/' })
      // reply.setCookie("selectedmenu", selectedmenu, { path: '/' })
      // reply.setCookie("selectedmenuindex", selectedmenuindex, { path: '/' })
      // reply.setCookie("imageIdx", imageIdx, { path: '/' })
      img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)

      return reply.send(img);

    })
  fastify.get('/reset-image', {

  },
    async (req, reply) => {

      image = categoryImages[imageIdx]
      return reply.send("");
    })


  // next prev
  fastify.get('/get-image/:sign/:image_id/:imageIdx/:selectedmenu', {

  },
    async (req, reply) => {
      //    console.log('john');

      let { sign, image_id, imageIdx, selectedmenu } = req.params;
      //  console.log('selectedmenudesc',image_id,imageIdx,selectedmenu);
      imageIdx = +imageIdx

      if (sign === '+') {
        imageIdx++
      } else {
        imageIdx--
      }
      console.log('selectedmenu!==categoryImages[0].Cat1', selectedmenu);


      // if (req.cookies.selectedmenu !== categoryImages[0].Cat1 || categoryImages[0].Cat1===undefined) {
      // if (req.cookies.selectedmenu !==selectedmenu || categoryImages[0].Cat1===undefined) {
      if (selectedmenu !== categoryImages[0].Cat1) {
        categoryImages = await fastify.inject({
          method: 'get',
          url: `/api/gallerynm/imagesnew?filter={"Cat1":"${selectedmenu}"}&orderBy={"SortOrder":1}`
        }).then((res) => res.json());
        categoryImages = categoryImages.data

      }


      if (imageIdx < 0) imageIdx = categoryImages.length - 1
      if (imageIdx > categoryImages.length - 1) imageIdx = 0

      image = categoryImages[imageIdx]
      selectedImage = image.Filename

      selectedContent = await loadimage(image, selectedContent);
      marginLeft = "400px"
      image_id = image._id
      Modal = image.Modal
      img = await buildhtml(image, selectedImage, categoryImages, selectedmenu, selectedContent, image_id, imageIdx)// selectedmenudesc, Modal)

      //  console.log('img', img)
      return reply.send(img);
    })


  fastify.get('/get-text', {

  },
    async (req, reply) => {

      selectedImage = images[imageIdx].Filename

      selectedContent = await loadimage(images[imageIdx], selectedContent);// , Video ,Videopath ,selectedIdx,selectedContent,modalContent,imgModal)

      return reply.send(selectedContent);
    })
  fastify.get("/", (request, reply) => {
    //  return reply.view('base.html', { title: 'Test page', hello: 'world' });
    return reply.view('base.html', { title: 'Test page', hello: 'world' });

  });

  fastify.get("/modalContent", async (request, reply) => {
    // <h1>${req.cookies.ImageTitle}<h1> 
    // ${req.cookies.ImageModal}
    // <h1>${image.Title}<h1>      ${image.Modal}
    reply.send(`
      <div id="modal" _="on closeModal add .closing then wait for animationend then remove me">
        <div class="modal-content-readme">
        <div class="modal__wrapper">
       ${selectedContent} 
       ${Modal}
    <a class='pointer' style="float: right;" _="on click trigger closeModal" >Close</a> 
    </div>
  </div>
</div>`)
  })


  //////////////// for tests

  fastify.get('/set-select-val/:selectedvalue', {
  },
    async (req, reply) => {
      //selectedvalue=17;
      let { selectedvalue } = req.params;
      selectedvalue = +selectedvalue
      //7   console.log('selectedvalue',selectedvalue)
      let h = `
    <option value="10">10 Annual Leave</option>
    <option value="11">11 Medical Leave</option>
    <option selected value="14">14 Long Service</option>
    <option  value="17">17 Leave Without Pay</option>
`
      return reply.send(h);//selectedvalue)    
    })


  fastify.get('/get-select17', {
  },
    async (req, reply) => {
      showAlert = true;
      defmenu = 'hc'
      selectedvalue = 17;
      let h = `
      <option value="10">10 Annual Leave</option>
      <option value="11">11 Medical Leave</option>
      <option value="14">14 Long Service</option>
      <option selected value="17">17 Leave Without Pay</option>
`
      return reply.send(h)
    })



  fastify.get('/get-select', {
  },
    async (req, reply) => {
      // defmenu='mp'
      showAlert = true;
      defmenu = 'hc'

      let h = `
<option value="20">20 Annual Leave</option>
<option value="21">21 Medical Leave</option>
<option selected value="22">22 Long Service</option>
<option value="23">23 Leave Without Pay</option>
`
      return reply.send({ showAlert: showAlert })

    })
  //////////////// for tests


  // html needed for live server load
  // 127.0.0.1:8080/api_view/CSNunjucks


  fastify.get("/CSNunjucks",
    async (request, reply) => {
      // return reply.view('CSNunjucks.html');
      return reply.view('CSNunjucks.njk', { title: 'CSNunjucks htmx features' });

    });

  fastify.get("/sse",
    async (request, reply) => {
      starcounter = 1

      return reply.view('_sse.njk', { title: 'SSE', starcounter: starcounter });

    });
  fastify.get("/ws",
    async (request, reply) => {
      // return reply.view('CSNunjucks.html');
      starcounter = 1

      return reply.view('_ws.njk', { title: 'WebSocket', starcounter: starcounter });

    });

  // https://backend.gtztest.com/api/gallerynm/images?Cat1=p_current


  fastify.get("/CSN",
    async (request, reply) => {

      return reply.view('CSN.html', { title: 'MTMX CLIENT SIDE EXT NUNJUCKS' });

    });

  fastify.get("/CSMustache",
    async (request, reply) => {
      return reply.view('CSMustache.html');
    });


  fastify.get('/get-prompt', async (request, reply) => {

    return reply.send(request.headers["hx-prompt"])
  })
  fastify.get('/get-input', async (request, reply) => {


    return reply.send('');//request.query.item_quantity)
  })

  fastify.post('/post-prompt', async (request, reply) => {

    return reply.send(request.headers["hx-prompt"])
  })
  fastify.post('/post-input', async (request, reply) => {
    return reply.send(request.body.item_quantity)
  })
}
module.exports.autoPrefix = '/api_view';

