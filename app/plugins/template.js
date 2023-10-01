//'use strict'
//-- import modules
const fp = require('fastify-plugin'),
    nunjucks = require('nunjucks'), //-- template engine 
    view = require("@fastify/view"); //-- template config


// fastifyStatic = require('@fastify/static'), //-- serve public folder 
// favicon = require('fastify-favicon'), //-- icon
// path = require('path'),
// minifier = require('html-minifier'), //-- minify html
// helper = require('../config/helper.js'); //--template helper
/**
 * This plugins ... 
 */

module.exports = fp(async function (fastify) {

    // Set Static files path

    // fastify.register(fastifyStatic, {
    //     root: path.join(__dirname, '../public'),
    // })
    //fav icon
    // fastify.register(favicon, {
    //     path: path.join(__dirname, '../public'),
    //     name: 'favicon.ico'
    // })
    // configure template
    fastify.register(view, {
        engine: {
            nunjucks: nunjucks,
        },
        includeViewExtension: true,
        // root: path.join(__dirname, '../resources/views'),
        templates: './templates/',
        
    })

    ////// default view ////////////////
    // fastify.get('/', 
    // async (req, reply) => {
    //   // reply.redirect('/api/nunjucks/book')    
    //   reply.redirect('/api_view/landing')    

    // }) 
    // const shortid = require("shortid");


    fastify.get('/', (req, reply) => {
        reply.redirect('/api_view/landing')
    
    })
})

       // const aCookieValue = req.cookies.cookieName
        // `reply.unsignCookie()` is also available
       // const bCookie = req.unsignCookie(req.cookies.cookieSigned);
       //       domain: 'example.com',      domain: `http://fr.localexample.com:8081/${shortId}`,
    //   let shortId = shortid.generate();

    //    reply
    //       .setCookie('foo', 'foo', {

    //         domain: `http://fr.localexample.com:8081`,
    //         path: '/'
    //       })
    //       .cookie('baz', shortId) // alias for setCookie


          //   .setCookie('bar', 'bar', {
        //     path: '/',
        //     shortId: shortId
        //   })

        //   .setCookie('bar', 'bar', {
        //     path: '/',
        //     signed: true
        //   })
        //   .cookie('shortId', 'shortId')

        //   .setCookie('shortId', 'shortId', {
        //     path: '/',
        //     sht: shortId
        //   })


          //..send({ hello: 'world' })
      //    reply.setCookie("ImageFilename", image.Filename, { path: '/' })

                //  .setCookie('foo', 'foo', {

                //   domain: `http://fr.localexample.com:8081/${shortId}`,
                //   path: '/'
                //  })

                //  .setCookie("Domain",`http://fr.localexample.com:8081/${shortId}, { path: '/' }`)
                //  .setCookie(`http://fr.localexample.com:8081/${shortId}`,`http://fr.localexample.com:8081/${shortId}`, { path: `http://fr.localexample.com:8081/${shortId}`})

                 
    





