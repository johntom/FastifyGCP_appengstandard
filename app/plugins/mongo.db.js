'use strict'
const fs = require('fs');
const fp = require('fastify-plugin');

 

module.exports = fp(async (fastify, opts) => {
  console.log('Registering databases...');
  fastify
  .register(require('@fastify/mongodb'),{tlsAllowInvalidCertificates:true,  useUnifiedTopology: true, useNewUrlParser: true, url:process.env.MONGODB_URLtodo,name: 'todo' })
  .register(require('@fastify/mongodb'),{tlsAllowInvalidCertificates:true,  useUnifiedTopology: true, useNewUrlParser: true, url:process.env.MONGODB_URLgallerynm,name: 'gallerynm' })
  .log.info('/pi 002===plugin================fastify mongodb======');

});


  // fastify.register(require('@fastify/mongodb'), {  useUnifiedTopology: true,useNewUrlParser: true,url: process.env.MONGODB_URLparktower, name: 'parktower' } )
  // fastify.register(require('@fastify/mongodb'), {  useUnifiedTopology: true,useNewUrlParser: true,url: process.env.MONGODB_URLtodo, name: 'todo' } )
  // fastify.register(require('@fastify/mongodb'), {  useUnifiedTopology: true,useNewUrlParser: true,url: process.env.MONGODB_URLbrm,name:'brm'} );
