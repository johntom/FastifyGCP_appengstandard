'use strict'
//must delete // summary in fb4
/**
 * This modules provides a REST API over any given MongoDB
 * connection. It is fully dynamic and allows the consumer 
 * to view the full API specification by navigating to the 
 * following URL: localhost:3000/documentation/
 */
module.exports = async function (fastify, opts) {
 // console.log('Data service started...');

  // const ctx = fastify.mongo.brm.db // live
  // const casecollection = ctx.collection('case')
  const fs = require('fs-extra')
  const path = require('path')


  function getEntity(database, collection) {
    // const db = fastify.mongo.db(database);
    const entity = fastify.mongo[database].db.collection(collection);
    return entity;
  }
  //
  // getProp
  // Reference: https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
  // Usage: "pipeline[0].$match.modified_date.$gt"
  //
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
  fastify.get('/get-counter/:sign', {

  },
    async (req, reply) => {
      let {

        sign
      } = req.params;
      if (starcounter === undefined) starcounter = 1;
      (sign === '+') ? starcounter++ : starcounter--

      return reply.send(starcounter);
    })

  // see api_view
  // for gallery thumbs
  // test fr css modal


  fastify.get('/makes', {},
    async (req, reply) => {

      // console.log('req ', req)

      // hx-indicator=".htmx-indicator"

      let htm = `

<div class="row">
    <div class="col-md-4" style="text-align: left">
        <label>Make</label>
        <div class="select">
            <select name="make" hx-get="/apihtmx/models" hx-target="#models_dynamic" >
                <option value="audi">Audi</option>
                <option value="toyota">Toyota</option>
                <option value="bmw">BMW</option>
                <option value="alpha">Alpha</option>
            </select>
        </div>
    </div>
    <div class="col-md-4" style="text-align: left">
        <label>Model</label>
        <div class="select">
            <select id="models_dynamic" name="models_dynamic">
                <option value="a3">A3</option>
                <option value='a6'>a6</option>
                <option value='a7'>a7</option>
            </select>
        </div>
    </div>
</div>
`
     // console.log(htm)
      reply.send(htm);
    }
  );

  fastify.get('/models', {},
    async (req, reply) => {
      let make = req.query['make']
      let payload = '';
      switch (make) {
        case 'audi':
          payload = `<option value='a3'>a3</option>
<option value='a6'>a6</option>
<option value='a7'>a7</option >`
          break
        case 'bmw':
          payload = `<option value='325i'>325i</option>
<option value='325ix'>325ix</option>
<option value='X5'>X5</option >`
          break
        case 'toyota':
          payload = `<option value='celica'>celica</option>
<option value='camry'>camry</option>
<option value='prius'>prius</option >`
          break
        case 'alpha':
          payload = `<option value='stelvio'>stelvio</option>
<option value='julia'>julia</option> `
          break
      }
     // console.log('req ', req)
      reply.send(payload);
    }
  );


  fastify.get("/modal", async (request, reply) => {
    /// NOT USED
    // move to view if data is needed this is used as a test for view = _maintestcss.njk 
    reply.send(`
<div id="modal" _="on closeModal add .closing then wait for animationend then remove me">

	<div class="modal-content">
  <div class="modal__wrapper">
		<h1>Modal Dialog  <button _="on click trigger closeModal" class="button">Close</button></h1>
   
    <section class="gallery">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_10-IMG_7706.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_prayer1_6124.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_prayer2_6111.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_Oyster2_6122.jpg" alt="cat">
    
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_welcome2023.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_AlchemyVol3cover.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_collage_phantom_flowers.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_IMG_4532-mixed.jpg" alt="cat">
    
  
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_flatfile8x8.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_welcome2022.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_ThingsMyMotherTaughtMe1_14_15.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_77sunflowerpetals.jpg" alt="cat">
  
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_Meledandri_night-day_1140-1139-Edit.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_Nina_Meledandri_DillSpiral.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_Meledandri_treasure_5001.jpg" alt="cat">	
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_HarmonicConvergence3nightsky.jpg" alt="cat">
    
  
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_line1_8077.jpg" alt="cat">
    
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_collageamongfriends.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_WaitingForSpring_framed.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_Oyster2_6122.jpg" alt="cat">
    
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_welcome2023.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_AlchemyVol3cover.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_collage_phantom_flowers.jpg" alt="cat">
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_HarmonicConvergence2orangeiris.jpg" alt="cat">
  
    <img class="thumb-img" src="https://storage.googleapis.com/ninathumbs-square/tn256_line2_8078.jpg" alt="cat">
  </section>

		<button _="on click trigger closeModal" class="button">Close</button>
	</div>
  </div>
</div>`)
  })

}
module.exports.autoPrefix = '/apihtmx';

