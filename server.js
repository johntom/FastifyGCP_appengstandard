'use strict'

const assert = require('assert')
const fp = require('fastify-plugin')
const fs = require('fs')
const resolveFrom = require('resolve-from')
const parseArgs = require('./args')
const path = require('path')
// const  = require('pino-colada')


// const pump = require('pump')


let Fastify = null



//https://www.jaywolfe.dev/blog/setup-your-fastify-server-with-logging-the-right-way-no-more-express/
function showHelp() {
  fs.readFile(path.join(__dirname, 'help', 'start.txt'), 'utf8', (err, data) => {
    if (err) {
      module.exports.stop(err);
    }
    console.log(data);

    module.exports.stop();
  });
}
function stop(error) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit();
}
function loadModules(opts) {
  try {
    const basedir = path.resolve(process.cwd(), opts.file);
    Fastify = require(resolveFrom.silent(basedir, 'fastify') || 'fastify');
  } catch (e) {
    module.exports.stop(e);
  }
}
function start(args, cb) {
  let opts = parseArgs(args);
  if (!fs.existsSync(opts.file)) {
    console.error('Missing the required file app.js\n');
    return showHelp();
  }
  if (opts.help) {
    return showHelp();
  }
  require('make-promises-safe');
  loadModules(opts);


  return run(args, cb);
  // fastify.log.error(`opts address ${opts.address}`)

}
async function run (args, cb) {
  require('dotenv').config();
  let opts = parseArgs(args);

  // opts.logger=true


  opts.port = opts.port || process.env.PORT || 9050;//3000;

  opts.address = opts.address || process.env.ADDRESS || 'localhost';
  console.log('=== Version ', process.env.VERSION, '\nprocess.env.ADDRESS ', process.env.ADDRESS, '\nopts.port', process.env.PORT, '\nopts ', opts)

  //7  opts.prettyLogs = true

  cb = cb || assert.ifError;

  loadModules(opts);

  var file = null;
  try {
    file = require(path.resolve(process.cwd(), opts.file));
  } catch (e) {
    return module.exports.stop(e);
  }
  if (file.length !== 3 && file.constructor.name === 'Function') {
    return module.exports.stop(`Plugin function should contain 3 arguments. Refer to\n
      docs for more information about it`);
  }
  if (file.length !== 2 && file.constructor.name === 'AsyncFunction') {
    return module.exports.stop(`Aysnc/Await plugin function should contain 2 arguments. Refer to\n
      docs for more information about it`);
  }
  const options = {

    logger: {
      level: opts.logLevel
    },
   // pluginTimeout: opts.pluginTimeout,
    //pluginTimeout: 100000,
    // connectionTimeout: 5000 // jul2022 default 0 doesnt affect
  };
  console.log('options', options.logger)
  if (opts.bodyLimit) {
    options.bodyLimit = opts.bodyLimit;
  }

  //opts  {
//   _: [],
//   help: undefined,
//   address: 'localhost',
//   bodyLimit: undefined,
//   file: 'app/app.js',
//   logLevel: 'info',
//   options: false,
//   pluginTimeout: 10000,
//   port: '8080',
//   prefix: undefined,
//   prettyLogs: true
// }
  // if (opts.prettyLogs) {
  //   const pinoColada = PinoColada();

  //   options.logger.stream = pinoColada;
  //   pump(pinoColada, process.stdout, assert.ifError);

  // }
  const fastify = Fastify(opts.option ? Object.assign(options, file.options) : options);
  const pluginOptions = {};
  if (opts.prefix) {
    pluginOptions.prefix = opts.prefix;
    pluginOptions._routePrefix = opts.prefix || '';
  }

  // fastify.log.info(`server pluginOptions on ${pluginOptions}`)
  const pluginOptions2 = {}
  pluginOptions2.a = 'test1'
  pluginOptions2.b = 'test2'
  // const server = Fastify({
  //   // logger: true, // default is false https://www.fastify.io/docs/latest/Server/#logger
  //   // PinoColada
  //   logger
  // });

  //server.log.info("Server listening...");

  fastify.register(fp(file), pluginOptions);
  // const { connectSwagger } = require("./connectors/swagger-connector");

  if (opts.address) {
    fastify.log.info(`opts info address ${opts.address}`)
    //  fastify.log.error(`opts error address ${opts.address}`)
    let optionsObject= {}
    // app.server.headersTimeout and app.server.keepAliveTimeout
    
      fastify.server.headersTimeout=86400;
     fastify.server.keepAliveTimeout=0
    //// fastify.server.keepAliveTimeout=86600;
    //// fastify.server.connectionTimeout=0;
    //// fastify.server.connectionsCheckingInterval=90000;//30000
    //// 86400= 1 day in seconds
    fastify.listen({port:opts.port, address:opts.address, wrap:true});
  //  await connectSwagger(fastify);
  } else {
    fastify.listen(opts.port, wrap);
  }
  function wrap(err) {
    cb(err, fastify);
  }


  return fastify;
}
function cli(args) {
  console.log('arg ', args)
  start(args);
}

module.exports = { start, run, stop };

if (require.main === module) {
  cli(process.argv.slice(2));
}
