'use strict'

module.exports = async function (fastify, opts) {
  // console.log('Default service started...');

  fastify.get('/', 
    async (req, reply) => {


      const ver = process.env.VERSION;
      const othervars=' ip:'+ process.env.ADDRESS+' port:'+process.env.PORT+' drive:'+process.env.drive
      const version = `${ver} - ${othervars} `

     // fastify.io.sockets.emit('lobby', {version});
      return {version};
    }
  );
  fastify.get('/session', 
  async (req, reply) => {

    // console.log(req.session.sessionId);//, oldSessionId)
    const ver = process.env.VERSION;
    const othervars=' ip:'+ process.env.ADDRESS+' port:'+process.env.PORT+' drive:'+process.env.drive
    const version = `${ver} - ${othervars} `

   // fastify.io.sockets.emit('lobby', {version});
    return {version};
  }
);
  

};

module.exports.autoPrefix = '/meta';
