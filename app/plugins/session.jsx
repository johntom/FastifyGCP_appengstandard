// 'use strict'

// const fp = require('fastify-plugin');
// const fastifyCookie = require('@fastify/cookie');
// const fastifySession = require('@mgcrea/fastify-session');
// // const uuid = require("uuid-v4");
// const shortid = require("shortid");

// const SESSION_SECRET = "a secret with minimum length of 32 characters";
// // const SESSION_TTL = 86400; // 
// // 86400= 1 day in seconds
// // 60 seconds 1 min
// // 3600 = 1 hr
// // 1800 = 1/2 hr
// const SESSION_TTL = 86400;
// // 3600 = 1 hr 60 = 1 min



// module.exports = fp(async (fastify, opts) => {
//   // let sessionId = uuid();
//   let shortId = shortid.generate();

//   console.log('shortId', shortId)

//   //console.log('sessionId',sessionId)




//   ///// fastify.register(fastifyCookie);
//   fastify.register(require('@fastify/cookie'), {
//     cookie: { maxAge: SESSION_TTL },
//     cookieName: shortId,
//     secret: "my-secret", // for cookies signature
//     hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
//     parseOptions: {}  // options for parsing cookies
//   })


//   // fastify.register(fastifySession, {

//   //   secret: SESSION_SECRET,
//   //   // cookieName: sessionId,
//   //   hook: 'onRequest',
//   //   parseOptions: {},
//   //   //
//   //   //  cookie: { maxAge: SESSION_TTL },
//   // });
//   fastify.register(fastifySession, {
//     secret: SESSION_SECRET,
//     cookie: { maxAge: SESSION_TTL },
//     httpOnly: true,
//     // cookieName: sessionId,
//     // hook: 'onRequest',
//     // secure: true,
//     //domain: 'https://calm-rainfall-360818.uk.r.appspot.com/',

//     secure: false,
//     // domain: `http://fr.localexample.com:8081`,
//     domain: 'https://calm-rainfall-360818.uk.r.appspot.com/',
//     path: '/',
//     // path: `/${sessionId}`,
//     sameSite: 'lax',

//   });
//   // domain:'http://fr.localexample.com:8081'
//   // // domain:'https://calm-rainfall-360818.uk.r.appspot.com/',
//   // fastify.register(fastifyCookie,{
//   //   secret: SESSION_SECRET,
//   //   maxAge: SESSION_TTL,
//   //   secure: true,//false,//false, true //localhost only
//   //   httpOnly: true,
//   //   // cookieName: sessionId,
//   //   hook: 'onRequest',
//   //    domain:'https://calm-rainfall-360818.uk.r.appspot.com/',
//   //    domain:`http://fr.localexample.com:8081`,
//   //    path: '/',
//   //   sameSite: 'lax'

//   // }) 



//   // fastify.register(fastifySession, {
//   //     secret: SESSION_SECRET,

//   //     httpOnly: true,

//   //     hook: 'onRequest',
//   //     secure: false,
//   //     // domain: 'https://calm-rainfall-360818.uk.r.appspot.com/',

//   //     // secure: false,
//   //     domain: `http://fr.localexample.com:8081`,
//   //     path: '/',
//   //     // path: `/${sessionId}`,
//   //     sameSite: 'lax',

//   //   });






//   /// reply.header('set-cookie',E
//   /// console.log('"""""preHandler"""sWessionid"""""""""""sid===========')

//   ///  fastify.addHook('preHandler', (req, reply, done) => {
//   /// fastify.addHook('onSend', (req, reply, done) => {



//   // fastify.addHook('onRequest', (req, reply, done) => {
//   //   let sessionId  = req.session.id;//   getSession(); //returns current session or a new session

//   //   console.log('"""""onRequest=========',sessionId)


//   //   reply.header("sessionid", sessionId)
//   //   done()
//   // })



//   // fastify.get('/setcookie', (req, res) => {
//   //   let cookieName = uuid();
//   //   res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
//   //     maxAge: 2,
//   //     domain: 'fr.localexample.com:8081',
//   //     // domain:'https://calm-rainfall-360818.uk.r.appspot.com/',
//   //     secure: false,//false, //localhost only
//   //     httpOnly: true,
//   //     cookieName: cookieName,
//   //     path: '/',
//   //     sameSite: 'lax'
//   //   });
//   //   // res.send('Cookie have been saved successfully');
//   //   console.log('Cookie have been saved successfully', cookieName);
//   //   res.redirect('/api_view/landing/0')
//   // });


// });
