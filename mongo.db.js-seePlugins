// 'use strict'

// const fp = require('fastify-plugin');

// module.exports = fp(async (fastify, opts) => {
//   console.log('Registering databases...Aug');
//   // fastify.register(require('fastify-mongodb'), {useNewUrlParser: true, url: process.env.MONGODB_URL, name: process.env.MONGODB_NAME });
// fastify  
//   // .register(require('fastify-mongodb'), {  useNewUrlParser: true,url: process.env.mrg, name: 'mrg' })
//   // .register(require('fastify-mongodb'), {  useNewUrlParser: true,url: process.env.MONGODB_URLPOD, name: 'pod' })
//   // console.log('  ', process.env.mrg, 'registered...');
//   // console.log('  ', process.env.MONGODB_URLPOD, 'registered...');

  
// // this is for brookbridge 1 time
// // 108.60.136.131 can only access 202 on 3306
// // 108.60.136.133 can only access 203 on 3306
//   // fastify.register(require('fastify-mysql'), {
//   //   connectionString: 'mysql://remoteuser@108.60.136.133/sailsMysql'
//   // })
//   .register(require('fastify-mysql'), {
//     promise: true,
//     host: '108.60.136.133',
//     user: 'remoteuser',
//     password: 'y?#m^t3rW&yBLE',
//     database: 'nbuildingweb',
//     connectionLimit: 10,
//     waitForConnections: true,
//   })

//   fastify.mysql.getConnection(onConnect)

//   function onConnect (err, client) {
//     if (err) return reply.send(err)

//     client.query(
//       // 'SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
//       "SELECT Floors , BCSNumber , Description, Address,ProjectStatus  FROM `nbuildingweb`.`v_projectdetail` where BCSNumber='131953'",
//       function onResult (err, result) {
//         client.release()
//         reply.send(err || result)
//       }
//     )
//   }

// // sailsMysql: {
//   //     adapter: require('trails-mysql'),
//   //     host: '10.1.110.202',
//   //     port: 3306,
//   //     user: 'remoteuser',
//   //     password: 'y?#m^t3rW&yBLE',
//   //     database: 'nbuildingweb'
//   //   }  ,
 

//   console.log('/pi 002===plugin================fastify mongodb======');
// });
