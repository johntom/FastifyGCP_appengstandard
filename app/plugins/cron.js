'use strict'
const fp = require('fastify-plugin')
// Import it this way to benefit from TypeScript typings
const fastifyCron = require('fastify-cron')
module.exports = fp(async (fastify, opts) => {

    fastify.get('/greeting', async function (request, reply) {
      

   let rz= await fastify.inject({
    method: 'get', 
    url: '/api_view/get-category/refresh'
   }).then((res) => res.json());
   console.log({ hello: rz});
     
   reply.send({ hello: rz });
});
    // Only these two properties are required,
    // the rest is from the node-cron API:
    // https://github.com/kelektiv/node-cron#api
    fastify.register(fastifyCron, {
        jobs: [
            {
         //       cronTime: '0 0 * * *', // Everyday at midnight UTC

// To run a cron job every 10 minutes, add the following line in your crontab file:
//   cronTime: '0 1 * * *' ,// At 01:00.
// cronTime: '*/10  * * * *',//At every 10 minute
 cronTime: '*/5  * * * *',//At every 5 minute
//cronTime: '* * * * *', //At every minute
start: true,// Start job immediately
                // Note: the callbacks (onTick & onComplete) take the server
                // as an argument, as opposed to nothing in the node-cron API:
                onTick: async server => {
             //       await server.db.runSomeCleanupTask()
             try {
                // const response = await server.inject('/greeting')
                const response = await server.inject('/api_view/landing')
                console.log(new Date().toString());//Date.now());
               // console.log(Date.now()+' '+response.json())
              } catch (err) { console.error(err) }
            }


               
            }
        ]

    })
})