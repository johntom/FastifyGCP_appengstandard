
'use strict'
         
        
module.exports = async function (fastify, opts) {
  // console.log('Data service started...');
 
  const fs = require('fs-extra') 
  // const io = // fastify.io // socketio
  const drive = process.env.drive;
  const userdrive = process.env.userdrive;
  // // console.log(userdrive) 
  const path = require('path') 

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //   function sleep(ms) {
  //     return new Promise(resolve => setTimeout(resolve, ms));
  // }

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

  function reviver_reviver(key, value) {
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
  function reviver(key, value) {
    if (typeof value === 'string') {

      if (/\d{4}-\d{1,2}-\d{1,2}/.test(value) ||
        /\d{4}\/\d{1,2}\/\d{1,2}/.test(value)) {
        return new Date(value);
      } else if (key === '_id') {
        return require('mongodb').ObjectId(value);
      } else if (key === 'file') {
        //pdf names have a timestap
        return value;
      }
    }
    return value;
  }


  //
  // Post (Create)
  //

  fastify.post('/:database/:collection', {
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
      body: {
        type: 'object'
      }
    }
  },
    async (req, reply) => {
      let { database, collection } = req.params;
      const entity = getEntity(database, collection);

      const bod = JSON.stringify(req.body)

      const obj = JSON.parse(bod, reviver);

      let result;
      if (Array.isArray(obj)) {
        result = await entity.insertMany(obj);
        // console.log('result ', result)//,result.insertedIds.toString())
        // console.log('result.insertedIds ', result.insertedIds)//,result.insertedIds.toString())

        return result//.insertedIds.toString();
      } else {
        result = await entity.insertOne(obj);
        // console.log('result.insertedIds ', result.insertedId.toString())

        obj._id = result.insertedId.toString()
        // // console.log('sockets ', obj)
        // reply.send({ status: 'ok' })//, id: result.insertedId.toString() })
        // @guivic/fastify-socket.io'
        // f

        // fastify.io.emit('lobby', obj);
        // console.log(' // fastify.io.emit ', obj)
        // // fastify.io.sockets.emit('lobby', obj);
        // // console.log('// fastify.io.sockets ', obj)
        var resp = { status: 'ok', id: obj._id };
        // console.log(resp);
        reply.send(resp);
      }
    });

  fastify.get('/:database/:collection/:id', {
    // preValidation: [fastify.authenticate],
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
          },
          id: {
            description: 'The document id',
            // summary: 'The document id',
            type: 'string'
          }
        }
      }
    }
  },
    async (req, reply) => {

      const {
        database,
        collection,
        id
      } = req.params;
      const entity = getEntity(database, collection);
      // const _id = new ObjectId(id);
      // console.log('get _id===collection========= ', collection)
      const _id = require('mongodb').ObjectId(id);
      // console.log(`===============reply======================${_id} `) //--  -- ${req.session.authenticated} [0].lastName} `)
      // if (req.session.authenticated) {

      const result = await entity.findOne({
        _id
      });
      // 
      // fastify.io.sockets.emit('lobby', result);
      //   return {database, collection, id, _id, result};
      //  } else result = 'not autenticated'
      // // console.log('===result========= ', result)
      // // return {result};
      // return { data: result };

      var resp = { "data": result };
      // console.log(resp);
      reply.send(resp);

    }
  );
  
  // Get changed from reply.send({ "data": result }) to return ({ "data": result })
  // http://localhost:8080/apinoauth/brm/user/5865d34214e11d6bfafd191d
  // thumbnails plus
  fastify.get('/:database/:collection',
    {

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
      const { database, collection, option } = req.params;
      const { filter, orderBy, limit = 0, skip = 0, fo = false, f = null, c = false, ci, filterregex } = req.query;
      let query = {};
      let sort = {};
      let project = {};
      let findOne = fo;

      if (filter) {
     //   // console.log('filter', filter)
        // query = JSON.parse(filter);//, reviver);
        query = JSON.parse(filter, reviver);

      //  // console.log('query', query)
      }

      // // console.log("filter", filter) //[0].lastName} `)

      if (orderBy) {
       
        sort = JSON.parse(orderBy)//, reviver);
      }
      // if(sort==="{POID:-1}") sort={POID:-1}
      // // console.log('orderBy  ', ' sort ', sort)
      // // console.log('limit ', limit)
      // // console.log('query +', query)



      if (f) {
        // console.log(f);
        project = JSON.parse(f);
      }
      // // console.log('project +', project)

      const entity = getEntity(database, collection);
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
            // console.log('=======================',query)
            result = await entity.find(query).sort(sort).skip(+skip).limit(+limit).toArray();
            //  result = await entity.find(query).toArray();
          }
        }
      }

      // @guivic/fastify-socket.io'
      // fastify.io.sockets.emit('lobby', result);
      // // console.log('result', result.length)
      // // console.log('=======================')

      // Get changed from reply.send({ "data": result }) to return ({ "data": result })
      return ({ "data": result })


    }
  );

  fastify.get('/:database/:collection/nodataobj',
    {

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
      const { database, collection, nodataobj } = req.params;
      const { filter, orderBy, limit = 0, skip = 0, fo = false, f = null, c = false, ci, filterregex } = req.query;
      let query = {};
      let sort = {};
      let project = {};
      let findOne = fo;
      // if 3 params optios = 'nodata' 
      // http://localhost:8080/api/parktower/po/nodataobj?limit=200&f={"AccountID":1,"PONumber":1,"Comments":1}
      if (filter) {
        // console.log('filter', filter)
        // query = JSON.parse(filter);//, reviver);
        query = JSON.parse(filter, reviver);

        // console.log('query', query)
      }

      // // console.log("filter", filter) //[0].lastName} `)

      if (orderBy) {

        // sort = JSON.stringify(orderBy)
        sort = JSON.parse(orderBy)//, reviver);
      }


      if (f) {
        // console.log(f);
        project = JSON.parse(f);
      }
      // console.log('project +', project)

      const entity = getEntity(database, collection);
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


      // // fastify.io.sockets.emit('lobby', result);
      // console.log('result', result.length)
      // // console.log('=======================',result)
      reply.send(result)
      // if(nodataobj='nodataobj') {
      // reply.send(result)
      // } else reply.send({'data':result})



    }
  );


  /////////// myget
  fastify.get('/:database/:collection/sub',
    {

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
      const { database, collection, nodataobj } = req.params;
      const { filter, orderBy, limit = 0, skip = 0, fo = false, f = null, c = false, ci, filterregex } = req.query;
      let query = {};
      let sort = {};
      let project = {};
      let findOne = fo;
      // if 3 params optios = 'nodata' 
      // http://localhost:8080/api/parktower/po/nodataobj?limit=200&f={"AccountID":1,"PONumber":1,"Comments":1}
      if (filter) {
        // console.log('filter', filter)
        // query = JSON.parse(filter);//, reviver);
        query = JSON.parse(filter, reviver);

        // console.log('query', query)
      }

      // // console.log("filter", filter) //[0].lastName} `)

      if (orderBy) {

        // sort = JSON.stringify(orderBy)
        sort = JSON.parse(orderBy)//, reviver);
      }


      if (f) {
        // console.log(f);
        project = JSON.parse(f);
      }
      // console.log('project +', project)

      const entity = getEntity(database, collection);
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


      // // fastify.io.sockets.emit('lobby', result);
      // // console.log('result', result.length)
      // // console.log('=======================',result)
      reply.send({ "data": {"book":result} })
      // if(nodataobj='nodataobj') {
      // reply.send(result)
      // } else reply.send({'data':result})



    }
  );
  /////

  fastify.put('/:database/:collection',
    {
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
            }
          },
          // required: [
          //   'filter'
          // ]
        },

        body: {
          type: 'object'
        }
      }
    },
    async (req, reply) => {
      const { database, collection } = req.params;
      // const { filter, updatestmt } = req.query;
      // console.log(" fastify.put('/:database/:collection'")
      const entity = getEntity(database, collection);
      // console.log('collection', collection)


      // const bod = JSON.stringify(req.body)
      // const obj = JSON.parse(bod, reviver);

      const obj = req.body
      // console.log('obj', obj)


      let query

      // let updatemanuflag = false
      // let updatestmt = req.body.updatestmt
      // if (updatestmt !== undefined) {
      //   // updatemanuflag=true

      //   let filter = req.body.filter
      //   // if (filter) { 
      //   if (filter !== undefined) {
      //     // console.log('filter', filter)
      //     query = JSON.parse(filter, reviver);
      //     updatemanuflag = true
      //   }

      // }

      query = {
        _id: require('mongodb').ObjectId(obj._id)
      } //obj._id};

      delete obj._id;
      let isodate2 = new Date() // this inserts as isodate
      obj.updatedAt = isodate2

      // obj.filters = ''
      let result1 = await entity.updateOne(query, { $set: obj }, { upsert: true });
      // fastify.io.sockets.emit('lobby', obj);
      reply.send({ data: result1 })

    });

  fastify.delete('/:database/:collection/:id', {
    // preValidation: [fastify.authenticate],
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
          },
          id: {
            description: 'The id of the document',
            // summary: 'The id',
            type: 'string'
          }
        }
      }
    }
  },
    async (req, reply) => {
      const {
        database,
        collection,
        id
      } = req.params;
      const entity = getEntity(database, collection);
      const _id = require('mongodb').ObjectId(id); // cant use reviver here as param
      const result = await entity.deleteOne({
        _id
      });
      // fastify.io.sockets.emit('lobby', result);
      if (!result.deletedCount) {
        return reply.code(404).send({
          status: 'Not found!'
        });
      }
      return result.deletedCount;
      // return {database, collection, id, _id, result};
    }
  );
  // 127.0.0.1:8080/api/loadjson

  // fastify.get("/useselection", 
  // async (request, reply) => {
  //   // const  selection = JSON.parse(request.query.selection);

  //   // const bod = JSON.stringify(request.query.selection)
  //   // const bod = request.query.selection
  //   // const obj = JSON.parse(bod, reviver);
  //   // // console.log(obj)
  //   // // var selarry =  selection
  //   // // console.log(request.query.selection)
  //  // console.log('selection')

  // })


  // async (req, reply) => {
  //   let { database, collection } = req.params;
  //   const entity = getEntity(database, collection);

  //   const bod = JSON.stringify(req.body)

  //   const obj = JSON.parse(bod, reviver);
  ///////////////////////////////////////////////////////
  fastify.post('/loadjson_form', {
    // preValidation: [fastify.authenticate],
    schema: {
      params: {
        type: 'object',
        properties: {
          title: {
            description: 'The title name',
            // summary: 'The title name',
            type: 'string'
          }
        }
      },
      body: {
        type: 'object'
      }
    }

  },
    async (req, reply) => {

      const bod = JSON.stringify(req.body)
      // console.log(bod)
      let newjson = [];
      // const { form } = req.params;
      let buildPath = path.resolve(`D:/Devel/htmx-medium/htmx7/app/json/demo.json`);//d:drive}:/docs/Images/pdf/checks/checks.pdf`),
      let json = fs.readFileSync(buildPath, 'utf8');

      newjson = JSON.parse(json);
      // // console.log(json[0], json[0]["job_title"])
      // 
      // for (const rec of json) {
      //    if (rec["job_title"] === title) {
      //     newjson.push(rec); // to delete it, could be any other instruction
      //   }
      // }
      reply.send(newjson);
    }
  )

  fastify.get('/loadjson_demoparam/:title', {
    // preValidation: [fastify.authenticate],
    schema: {
      params: {
        type: 'object',
        properties: {
          title: {
            description: 'The title name',
            // summary: 'The title name',
            type: 'string'
          }
        }
      }
    }
  },
    async (req, reply) => {
      let { title } = req.params;
      if (title === '') {
        title = req.query.title
        // title = JSON.parse(req.query);
      }
      let buildPath = path.resolve(`D:/Devel/htmx-medium/htmx7/app/json/demo.json`);//d:drive}:/docs/Images/pdf/checks/checks.pdf`),
      let json = fs.readFileSync(buildPath, 'utf8');
      // console.log(json[0])
      json = JSON.parse(json);
      // console.log(json[0], json[0]["job_title"])
      let newjson = [];
      for (const rec of json) {
        if (rec["job_title"] === title) {
          newjson.push(rec); // to delete it, could be any other instruction
        }
      }
      reply.send(newjson);
    }
  )


  fastify.get("/loadjson_demo",
    async (request, reply) => {
      let buildPath = path.resolve(`D:/Devel/htmx-medium/htmx7/app/json/demo.json`);//d:drive}:/docs/Images/pdf/checks/checks.pdf`),
      // const json = fs.readFileSync('../../json/demo.json', 'utf8');
      const json = fs.readFileSync(buildPath, 'utf8');
      // // console.log(json[0])
      reply.send(json);

    });
  fastify.get("/loadjson_tabulator",
    async (request, reply) => {
      var json = require('../../json/tabulator.json'); //(with path)
      // // console.log(json)
      reply.send(json);

    });

  fastify.post("/useselection",
    async (request, reply) => {

      // const obj =request.body // object
      // // console.log(obj)
      let array = []
      array = request.body;//.array  // array object
      // console.log(array)

      //const  selection = JSON.parse(request.query.selection);

      // const bod = JSON.stringify(request.query.selection)

      // const bod = JSON.stringify(request.body.array)

      // const bod = request.query.selection
      // const obj = JSON.parse(bod, reviver);

      // var selarry =  selection
      //   // console.log(request.query.selection)
      //  // console.log(selection)

    })




};

/////



///////


// module.exports.autoPrefix = '/apinoauth';
module.exports.autoPrefix = '/api';
