// 'use strict'

// const Firebird = require('node-firebird')
// const util = require('util')
// const moment = require('moment');
// const path = require('path')
// const fs = require('fs-extra') // fs')
// const { Parser } = require('json2csv');
// const sharp = require('sharp')


// // const replace = require('replace') // fsgetEntity')

// // npm install replace
// var os = require('os');
// // const sanitizer = require('sanitize'); //();

// // const { ConstraintViolationError } = require('objection');
// // if (os.platform() == 'win32') {
// //   if (os.arch() == 'ia32') {
// //     var chilkat = require('@chilkat/ck-node12-win-ia32');
// //   } else {
// //     var chilkat = require('@chilkat/ck-node12-win64');
// //   }
// // }
// // tools.js
// // ========

// if (os.platform() == 'win32') {
//   if (os.arch() == 'ia32') {
//     var chilkat = require('@chilkat/ck-node16-win-ia32');
//   } else {
//     var chilkat = require('@chilkat/ck-node16-win64');
//   }
// }

// let options = {};
// options.host = process.env.ADDRESS;//'127.0.0.1';
// options.port = 3050;
// const drive = process.env.drive;//opts.drive;//'d'
// const docspath = `${drive}:/docs`;

// options.database = `${drive}:\\firebird\\data\\brm\\bergen.fdb`;

// options.user = process.env.DB_USER;
// options.password = process.env.DB_PASSWORD;
// options.lowercase_keys = false; // set to true to lowercase keys
// options.role = null; // default
// options.pageSize = 8192;
// options.charset = 'UTF8'
// const optionsdoc = {};
// optionsdoc.host = process.env.ADDRESS;
// optionsdoc.port = 3050;
// optionsdoc.database = `${drive}:\\firebird\\data\\brm\\bergendoc.fdb`;
// optionsdoc.user = process.env.DB_USER;
// optionsdoc.password = process.env.DB_PASSWORD;
// optionsdoc.lowercase_keys = false; // set to true to lowercase keys
// optionsdoc.role = null; // default
// optionsdoc.pageSize = 8192;
// optionsdoc.charset = 'UTF8'

// module.exports = {
//   chilkat_decrypt: function (str) {

//     var glob = new chilkat.Global();
//     // var success = glob.UnlockBundle("BERGEN.CB1022021_RAtwFZrN364n"); //2020

//     var success = glob.UnlockBundle("BERGEN.CB1022023_S9Nnre6v367y");


//     //   Unlock Code 2021 BERGEN.CB1022023_S9Nnre6v367y 



//     if (success !== true) {
//       // console.log(glob.LastErrorText);
//       return;
//     }

//     var status = glob.UnlockStatus;
//     if (status == 2) {
//       // console.log("Unlocked using purchased unlock code.");
//     }
//     else {
//       // console.log("Unlocked in trial mode.");
//     }


//     var success;
//     var crypt = new chilkat.Crypt2();
//     crypt.CryptAlgorithm = "aes";
//     crypt.CipherMode = "cbc";
//     crypt.KeyLength = 256;
//     crypt.PaddingScheme = 0;
//     var ivHex = "000102030405060708090A0B0C0D0E0F";
//     crypt.SetEncodedIV(ivHex, "hex");
//     var keyHex = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F";
//     crypt.SetEncodedKey(keyHex, "hex");
//     crypt.Charset = "us-ascii";//windows-1252";//"us-ascii"//utf8";
//     //// do not use crypt.CryptAlgorithm = "blowfish2";
//     crypt.EncodingMode = "hex";
//     //////////////////////////////////////////////////  
//     let retBuf2 = crypt.DecryptStringENC(str);
//     // console.log("delphi_encstr2: DecryptStringENC", retBuf2);
//     return retBuf2
//   },


//   chilkat_encrypt: function (str) {

//     var glob = new chilkat.Global();
//     ///////////  var success = glob.UnlockBundle("BERGEN.CB1022021_RAtwFZrN364n");
//     var success = glob.UnlockBundle("BERGEN.CB1022023_S9Nnre6v367y");


//     if (success !== true) {
//       // console.log(glob.LastErrorText);
//       return;
//     }

//     var status = glob.UnlockStatus;
//     if (status == 2) {
//       // console.log("Unlocked using purchased unlock code.");
//     }
//     else {
//       // console.log("Unlocked in trial mode.");
//     }


//     var success;
//     var crypt = new chilkat.Crypt2();
//     crypt.CryptAlgorithm = "aes";
//     crypt.CipherMode = "cbc";
//     crypt.KeyLength = 256;
//     crypt.PaddingScheme = 0;
//     var ivHex = "000102030405060708090A0B0C0D0E0F";
//     crypt.SetEncodedIV(ivHex, "hex");
//     var keyHex = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F";
//     crypt.SetEncodedKey(keyHex, "hex");
//     crypt.Charset = "us-ascii";
//     crypt.EncodingMode = "hex";
//     //////////////////////////////////////////////////  
//     let retBuf2 = crypt.EncryptStringENC(str);
//     // // console.log("delphi_encstr2: EncryptStringENC", retBuf2);
//     return retBuf2
//   },


//   bq: function (text) {
//     if (text === null) {
//       return text
//     } else {
//       return "'" + text + "'"
//     }
//   },
//   foo: function () {
//     // whatever
//   },
//   bar: function () {
//     // whatever
//   },
//   getDB: async function () {
//     // THIS IS NOT USED
//     return new Promise(async function (resolve, reject) {
//         await (Firebird.attach(options, function (err, db) {
//             if (err)
//                 resolve(db)


//         }))
//     })
// },
//   getEntity: function (database, collection) {
//     // const db = fastify.mongo.db(database);
//     const entity = fastify.mongo[database].db.collection(collection);
//     return entity;
//   },
//   getProp: function (object, keys, defaultVal) {
//     keys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
//     object = object[keys[0]];
//     if (object && keys.length > 1) {
//       return getProp(object, keys.slice(1), defaultVal);
//     }
//     return object === undefined ? defaultVal : object;
//   },
//   reviver: function (key, value) {
//     if (typeof value === 'string') {

//       if (/\d{4}-\d{1,2}-\d{1,2}/.test(value) ||
//         /\d{4}\/\d{1,2}\/\d{1,2}/.test(value)) {
//         return new Date(value);
//       } else if (key === '_id') {
//         return require('mongodb').ObjectId(value);
//       } else if (key === 'file') {
//         //pdf names have a timestap
//         return value;
//       }
//     }
//     return value;
//   },
//   // reviver: (key, value) {
//   //   if (typeof value === 'string') {
//   //     if (/\d{4}-\d{1,2}-\d{1,2}/.test(value) ||
//   //       /\d{4}\/\d{1,2}\/\d{1,2}/.test(value)) {
//   //       return new Date(value);
//   //     } else if (key === '_id') {
//   //       return require('mongodb').ObjectId(value);
//   //     }
//   //   }
//   //   return value;
//   // },


//   getQueryNoParam: async function (qrystr) {

//     return new Promise(async function (resolve, reject) {
//       //let qrystr = 'select ID "id", "Staff Init" "username" ,"WebPassword" "password", "role" ,"AdjusterID" "adjusterid" from "Staff" where id >0';
  
//       await (Firebird.attach(options, function (err, db) {
//         if (err)
//           //  throw err;
//           console.log('errDB ', err)
  
     
//         db.query(qrystr, function (err, results) {
//           db.detach();
//           if (err) {
//             //  throw err;
//             resolve('failure')
//             console.log('err ', err)
//           } else {
//             if (results === undefined) results = 'savedproc';// inserted
//             // console.log('=line 190:: ');//,results.length)//[0]) rystr.substring(0, 50), 
//             resolve(results)// .low_)
//           }
//         })
//       }))
  
//     })
//   },
  



//   getEntityfb: async function (database) {
//     // all other firebird database will pass the direc which is always 7 ie sep2022
//     // not needed if (database.toLowerCase() === 'bergen.fdb') {
//     // console.log('database', database)
//     if (database.length === 7) {
//       database = `${drive}:\\Files\\MonthlyBackup\\${database}\\database\\bergen.fdb`;
//     } else {
//       database = `${drive}:\\firebird\\data\\brm\\bergen.fdb`;
//     }

//     options.database = database;
//     return //entity;
//   },


//   getQuery: async function (qrystr, sqlVals) {
//     //https://learn.snyk.io/lesson/sql-injection/   https://snyk.io/blog/sql-injection-cheat-sheet/?loc=learn
//     // this breaks diary   // qrystr= qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');  // // console.log('======qrystr: ', qrystr);

//     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');
//     return new Promise(async function (resolve, reject) {
//       // let sqlVals
//       await (Firebird.attach(options, function (err, db) {
//         if (err) console.log('errDB ', err)
//         //  throw err;

//         // sqlVals = arrayvals


//         db.query(qrystr, sqlVals, function (err, results) {
//           db.detach();
//           if (err) {
//             //  throw err;
//             resolve('failure')
//             // console.log('err ', err)
//           } else {
//             if (results === undefined) results = 'savedproc';// inserted
//             // // console.log('=line 241:: ', results);//,results.length)//[0]) rystr.substring(0, 50), 
//             resolve(results)// .low_)
//           }
//         })

//       }))

//     })
//   },




//   getQueryDocs: async function (qrystr, sqlVals) {
//     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');

//     return new Promise(async function (resolve, reject) {
//       await (Firebird.attach(optionsdoc, function (err, db) {
//         if (err)
//           console.log('errDB ', err) //[0].id);

//         db.query(qrystr, sqlVals,function (err, results) {
//           db.detach();
//           if (err) {
//             //  throw err;
//             console.log('err ', err)
//           } else {
//             console.log('=4=====: ')//, results.length)//[0])
//             resolve(results)

//           }
//         })
//       }))
//     })

//   },
//   getQueryDocsNoParam: async function (qrystr) {
//     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');

//     return new Promise(async function (resolve, reject) {
//       await (Firebird.attach(optionsdoc, function (err, db) {
//         if (err)
//           console.log('errDB ', err) //[0].id);

//         db.query(qrystr, function (err, results) {
//           db.detach();
//           if (err) {
//             //  throw err;
//             console.log('err ', err)
//           } else {
//             console.log('=4=====: ')//, results.length)//[0])
//             resolve(results)

//           }
//         })
//       }))
//     })

//   },

//   // validates if input email and password are correct
//   checkLogin: async function (req, db) {
//     const sqlQuery =
//       "SELECT email FROM credentials WHERE " +
//       "email = ? AND " +
//       "password = ?";

//     db.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
//       if (err) {
//         return false;
//       }

//       return result.length !== 0;
//     });
//   },

//   //
//   delQuery: async function (qrystr, arrayvals) {
//     // can be delete smtm or SET GENERATOR "GEN_WCPayment_ID" TO 0;
//     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');
//     let sqlVals = arrayvals
//     let newsqlVals = []
//     return new Promise(async function (resolve, reject) {
//       await (Firebird.attach(options, function (err, db) {
//         if (err)
//           // console.log('errDB ', err)
//           // let sqlVals = arrayvals

//           if (sqlVals === '' || sqlVals === undefined) {
//           } else {
//             for (const rec of sqlVals) {
//               if (rec !== 'null') {
//                 newsqlVals.push(rec)
//               }
//             }
//           }
//         if (newsqlVals !== []) sqlVals = newsqlVals

//         db.query(qrystr, sqlVals, function (err, results) {
//           db.detach();
//           if (err) {
//           } else {
//             if (results === undefined) results = ' deleted'
//             resolve(results)// 
//           }
//         })
//       }))

//     })
//   },

//   checkSQL1: async function () {
//     const sqlQuery = `Select * from "ScanPayments" where  "Processed" = ? and "AssignTo"=? `
//     const arrayvals = ['Y', 100]
//     return new Promise(async function (resolve, reject) {
//       Firebird.attach(options, function (err, db) {
//         db.query(sqlQuery, ['Y', 100], (err, result) => {
//           if (err) {
//             return false;
//           }
//           console.log('1result.length ', result.length)

//           resolve(result.length)// 
//         });
//       });
//     });
//   },
//   checkSQL2: async function () {
//     const sqlQuery = `Select * from "ScanPayments" where  "Processed" = ? and "AssignTo"=? `
//     const arrayvals = ['Y', 100]
//     return new Promise(async function (resolve, reject) {
//       Firebird.attach(options, function (err, db) {
//         db.query(sqlQuery, arrayvals, (err, result) => {
//           if (err) {
//             return false;
//           }
//           console.log('1result.length ', result.length)
//           resolve(result.length)// 
//         });
//       });
//     });
//   },

//   checkSQL3: async function (sqlQuery, arrayvals) {
//     return new Promise(async function (resolve, reject) {
//       Firebird.attach(options, function (err, db) {
//         db.query(sqlQuery, ['Y', 100], (err, result) => {
//           if (err) {
//             return false;
//           }
//           // console.log('1result.length ', result.length)
//           resolve(result.length)// 
//         });
//       });
//     });
//   },
//   checkSQL4: async function (sqlQuery, arrayvals) {
//     return new Promise(async function (resolve, reject) {
//       Firebird.attach(options, function (err, db) {
//         db.query(sqlQuery, arrayvals, (err, result) => {
//           if (err) {
//             return false;
//           }
//           console.log('1result.length ', result.length)
//           resolve({ data: result })// 
//         });
//       });
//     });
//   },

//   fixArrayVals: async function (arrayvals) {

//     let sqlVals = arrayvals
//     if (sqlVals === undefined) {
//     }

//     let newsqlVals = []
//     if (sqlVals === '' || sqlVals === undefined) {
//     } else {
//       for (let rec of sqlVals) {
//         if (rec === 'null' || rec === null) {
//         } else {
//           // not sure about next 2
//           if (typeof (rec) !== "number") {
//             rec = rec.replace(/%2f|%5c/ig, '/');
//           }
//           newsqlVals.push(rec)
//         }
//       }


//       if (newsqlVals !== []) sqlVals = newsqlVals
//       return sqlVals
//     }
//   },

// //   const convertTograyscalex = (dirname, filename) => {
// //     sharp(filename)
// //         .removeAlpha()
// //         .toFormat('jpg')
// //         .toFile(`${dirname}/out.jpg`)

// // }


//   convertTograyscale: async function (claimno, dirname, filename) {

//     let newfn = filename.replace('.tif', '.jpg')
//     // newfn= 'A1'+newfn
//     // let newfn = "A.jpg"
//     sharp(`${filename}`)
//         .removeAlpha()
//         .resize(800)
//         .toFormat('jpg')

//         .toFile(newfn)
//     return


  
// },
// //getFileSystemPathSream
// getFileSystemPathStream: async function (filepath,filename) {
//   let urlPath = filepath.replace(/%2e/ig, '.').toLowerCase();
//   urlPath = urlPath.replace(/%2f|%5c/ig, '/');

//   const normalizedPath = path.normalize(urlPath);
//     let returnstr
//   if (((normalizedPath.startsWith(`${drive}:\\docs`)) || normalizedPath.startsWith(`${drive}:\\pdf`))) {
  
//   //  returnstr= path.join(BASE_DIR, normalizedPath);
//    returnstr= fs.createReadStream(normalizedPath ,filename);
//    await sleep(500)
//    } else {

//     returnstr='failed'; 
//     //  throw new Error('Illegal path supplied in the input url: ' + urlPath); 
   
//     }
 
//   return returnstr

// },
//   getFileSystemPath: async function (inputUrl, BASE_DIR) {
//     // inputUrl = payload
//     let urlPath = BASE_DIR.replace(/%2e/ig, '.').toLowerCase();
//     urlPath = urlPath.replace(/%2f|%5c/ig, '/');
//     urlPath = decodeURIComponent(urlPath)
//     const normalizedPath = path.normalize(urlPath);


//     let returnstr

//     if (((normalizedPath.startsWith(`${drive}:\\docs`)) || normalizedPath.startsWith(`${drive}:\\pdf`))) {
//       fs.writeFileSync(normalizedPath, inputUrl);
//       returnstr = path.join(urlPath, normalizedPath);

//     } else {
//       returnstr = 'failed';
//       throw new Error('Illegal path supplied in the input url: ' + urlPath);
//     }

//     return path.join(BASE_DIR, normalizedPath);
//   },


//   getNextNo: async function (qrystr) {
//     // console.log('======getNextNo: ');
//     return new Promise(async function (resolve, reject) {
//       await (Firebird.attach(options, function (err, db) {
//         if (err)
//           //  throw err;
//           // console.log('errDB ', err) //[0].id);
//           // db = DATABASE
//           db.query(qrystr, function (err, results) {
//             db.detach();
//             if (err) {
//               //  throw err;
//               // console.log('err ', err)
//             } else {
//               // console.log('=1=====getNextNo::_:: ', results[0])
//               // let  nextaa = results[0]
//               //  // console.log('=2=====nextaa::_:: ', nextaa.NA)  //na.low_)
//               // console.log('=3=====getNextNo::_:: ', results[0].NA)  //na.low_)
//               resolve(results[0].NA)
//               //   resolve(999999)
//             }
//           })
//       }))

//     })
//   },

//   getNextNoDocs: async function (qrystr) {
//     // console.log('======getNextNo: ');
//     return new Promise(async function (resolve, reject) {
//       await (Firebird.attach(optionsdoc, function (err, db) {
//         if (err)
//           // console.log('errDB ', err) //[0].id);
//           db.query(qrystr, function (err, results) {
//             db.detach();
//             if (err) {
//               //  throw err;
//               // console.log('err ', err)
//             } else {
//               // console.log('=1=====getNextNo::_:: ', results[0])
//               // let  nextaa = results[0]
//               //  // console.log('=2=====nextaa::_:: ', nextaa.NA)  //na.low_)
//               // console.log('=3=====getNextNo::_:: ', results[0].NA)  //na.low_)
//               resolve(results[0].NA)
//               //   resolve(999999)
//             }
//           })
//       }))

//     })
//   },


//   runprocess: async function (fastify,database) {
//     // let query = req.query;// {};
//     // let qrystmt = query
//     // console.log('runprocess')
//     const databasepath = `${drive}:/firebird/data/brm/${database}`
    
//     let qrystr = {}
//     const ts = fastify.timestamp()// get a plugin
//     let tt1 = new Date(ts)
//     let nextavail = 0
//     let timethen = moment().format('MM/DD/YYYY HH:mm:ss')// "04/09/2013 15:00:00";
//     // console.log('/nin hello===================io======', timethen)//,ttm1)
  
//     qrystr.select = ` * `
//     // tyoe sort,ID
//     qrystr.ordfield = `ID`
//     qrystr.ordsort = `asc`
//     qrystr.table = 'VIEWWORKERMEDICARE';//"WorkerMedicare"'
//     // ID, HICNNUMBER, TAXID, LASTNAME, FIRSTNAME, MI, DOB, GENDER,
//     //RESPONSE, PREDCN1, PREDCN2, "FOUND", TOWNID,
//     //WORKERID, DESCRIPTION, WMTYPE
//     // let filter = { 'found': 1, 'WMTYPE': 'W' }; // ALSO C FOR LIABILTY CLAIMANT
//     let filter = { 'found': 1 }; // get w and c
//     // let filter2 = { 'workerid':8570}
//     qrystr.filter = JSON.stringify(filter)
  
//     qrystr.database = databasepath;// 'd:/firebird/data/brm/bergen.fdb'
//     // call plugin
//     const fbk = await fastify.knexdata(qrystr)
//     // console.log('fbk', fbk.length)
  
//     // WorkerMedicareNF
//     // WorkerMedicare
//     let ct = 0
//     for await (const workerMedicare of fbk) {
//       ct++
  
//       workerMedicare.DESCRIPTION = " "
  
//       let qrystr2 = {}
//       qrystr2.select = `  * `
//       qrystr2.ordfield = 'claimid';
//       qrystr2.ordsort = `"asc"`
  
  
//       let filetype = workerMedicare.wmtype.trim();
//       let filter2
//       qrystr2.database = databasepath;// 'd:/firebird/data/brm/bergen.fdb'
//         let fbk2
//       let filterand, filterwhere, filterwhereror
  
//       if (filetype === 'C') {
//         // C = Claimant for Liability
//         qrystr2.table = 'VIEWLIABILITYMEDICARESELECT';
//         filter2 = { 'WORKERID': workerMedicare.workerid, 'MEDICAREREPORTABLE': 0 }  // 0 -1 and  null f//ind all workers  Found 0=New 1 = Legacy
//         qrystr2.filter = JSON.stringify(filter2)
//         fbk2 = await fastify.knexdata(qrystr2)
//       }
//       if (filetype === 'W') {
//         // W = Worker for 
//         qrystr2.table = 'VIEWWCMEDICARESELECT';
//         let filterand = { 'WORKERID': workerMedicare.workerid }  /// not used  --------- Found 0=New 1 = Legacy
//         qrystr2.filterand = JSON.stringify(filterand)
  
//         // let filterwhere = { 'workerid': workerMedicare.workerid }  /// find all workers  Found 0=New 1 = Legacy
//         // let filterwhere = { 'MEDICAREREPORTABLE': null, 'WORKERID': workerMedicare.workerid }
//         let filterwhere = { 'MEDICAREREPORTABLE': 0, 'WORKERID': workerMedicare.workerid }
//         qrystr2.filterwhere = JSON.stringify(filterwhere)
//         let filterwhereror = { 'MEDICAREREPORTABLE': -1, 'CMSCOMPLETE': 0, 'WORKERID': workerMedicare.workerid }  /// find all workers  Found 0=New 1 = Legacy
//         // dont update just report back
//         qrystr2.filterwhereror = JSON.stringify(filterwhereror)
  
//         fbk2 = await fastify.knexdatacomplex(qrystr2)
  
//         // VIEWWCMEDICARESELECT (WCID, WCID_STRING, CLAIMID, STATUS, WORKERID,/ WORKERNAME, WORKERSS, CLOSED, INDEMNITYTODATE, MEDICAL_SUM, HICN, MEDICARE_RECIP,
//         // INDEMNITY_SUM, DATEMARKEDREPORTABLE, MEDICAREREPORTABLE, CMSCOMPLETE
  
//       }
  
  
//       let ctt = 0
//       // gotru every wc for worker and check
//       for await (const viewrec of fbk2) {
//         ctt++
//         let UPDATECT = 0;
//         // if(viewrec.workerid===2633){
//         //   // console.log('')
//         // }
//         let insertstmt;
//         let legacy;
//         let qrystrup;
//         let qrystrins;
//         let updatestmt;
//         //MedicareReportable
//         // // console.log('legacy/fbk2', viewrec.medicarereportable  ,viewrec.cmscomplete,viewrec.medicarereportable===-1 && viewrec.cmscomplete===0)
//         let tf = (viewrec.medicarereportable === -1 && viewrec.cmscomplete === 0);
  
//         (tf) ? legacy = 1 : legacy = 0;
  
//         if (filetype === 'C') {
//           qrystrup = {};
//           let today = moment().format('MM/DD/YYYY')
//           // if (viewrec["Date Marked Reportable"] ===undefined  || viewrec["Date Marked Reportable"] ==='' ){
  
//           // medicarereportable:0
//           // medicare_recip:1
//           // datemarkedreportable:null
  
//           // if (viewrec.medicarereportable === null || viewrec.medicarereportable === undefined) {
//           // 0 -1 null
//           // if (viewrec.medicarereportable === null) {
//           if (viewrec["Date Marked Reportable"] === null) {
  
//             updatestmt = { '"MedicareReportable"': -1, '"Date Marked Reportable"': today, '"TestFlag"': 200 }
//             qrystrup.updatestmt = JSON.stringify(updatestmt)
//             qrystrup.wherecol = 'ID';
//             qrystrup.whereval = viewrec.wcid;
//             qrystrup.wheresign = '=';//6;
//             qrystrup.table = '"Liability"'
//             qrystrup.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//             const ufbk = await fastify.updatedata(qrystrup)
  
//           } else {
//           }
//           if (tf) {
//             let qrystrins = {};
//             nextavail++
//             insertstmt = { ID: nextavail, TID: viewrec.wcid, '"LastName"': `${workerMedicare.lastname}`, '"FirstName"': `${workerMedicare.firstname}`, '"Date of Birth"': `${workerMedicare.dob}`, '"Type"': 'C', '"Found"': legacy }
//             qrystrins.insertstmt = JSON.stringify(insertstmt)
//             qrystrins.table = '"WorkerMedicareNF"'
//             qrystrins.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//             // console.log('insertstmt', qrystrins.insertstmt)
//             const ufbkwm2C = await fastify.insertdata(qrystrins)
//           }
  
//         }
//         if (filetype === 'W') {
//           //CHECK (VALUE IN (0,1) OR VALUE IS NULL) '"Found"': 1 is new 0 is legacy
//           if ((viewrec.medical_sum >= 750) && (((viewrec.statusno = 1) || (viewrec.statusno = 3)) || (viewrec.closed >= '1/1/2010'))) {
//             nextavail++
//             UPDATECT++;
//             qrystrup = {};
//             let insertstmt
  
//             // if (viewrec["Date Marked Reportable"] === null) {
  
//             if (viewrec.datemarkedreportable === null) {
//               let today = moment().format('MM/DD/YYYY')
//               updatestmt = { '"MedicareReportable"': -1, '"Date Marked Reportable"': today, '"TestFlag"': 201 }
//               qrystrup.updatestmt = JSON.stringify(updatestmt)
//               qrystrup.wherecol = 'ID';
//               qrystrup.whereval = viewrec.wcid;
//               qrystrup.wheresign = '=';//6;
//               qrystrup.table = '"WComp"'
//               qrystrup.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//               let ufbk1 = await fastify.updatedata(qrystrup)
//             }
//             qrystrins = {};
//             if (tf) {
//               insertstmt = { ID: nextavail, TID: viewrec.wcid, '"LastName"': `${workerMedicare.lastname}`, '"FirstName"': `${workerMedicare.firstname}`, '"Date of Birth"': `${workerMedicare.dob}`, '"Type"': 'W', '"Found"': legacy }
  
//               qrystrins.insertstmt = JSON.stringify(insertstmt)
//               qrystrins.table = '"WorkerMedicareNF"'
//               qrystrins.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//               // console.log('insertstmt', qrystrins.insertstmt)
//               let ufbkwm1 = await fastify.insertdata(qrystrins)
//             }
  
  
//           } else {
  
//             //filetype ===  = null
//             if (((viewrec.idemnity_sum >= 5000) && (((viewrec.statusno = 1) || (viewrec.statusno = 3)) || (viewrec.closed >= '10/1/2010' && viewrec.closed <= '3/30/2010')))
//               || ((viewrec.idemnity_sum >= 2000) && (((viewrec.statusno = 3) || (viewrec.closed >= '10/1/2010' && viewrec.closed <= '9/30/2013'))))
//               || (((viewrec.idemnity_sum >= 300) && (((viewrec.statusno = 1) || (viewrec.statusno = 3)) || (viewrec.closed >= '10/1/2014'))))
//             ) {
//               if (viewrec.datemarkedreportable === null) {
           
//                 qrystrup = {};
//                 let today = moment().format('MM/DD/YYYY')
//                 updatestmt = { '"MedicareReportable"': -1, '"Date Marked Reportable"': today, '"TestFlag"': 202 }
//                 qrystrup.updatestmt = JSON.stringify(updatestmt)
//                 qrystrup.wherecol = 'ID';
//                 qrystrup.whereval = viewrec.wcid;
//                 qrystrup.wheresign = '=';//6;
//                 qrystrup.table = '"WComp"'
//                 qrystrup.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//                 let ufbk2 = await fastify.updatedata(qrystrup)
//                 // console.log('update ufbk2', ufbk2.data)
//               }
//               if (tf) {
//                 qrystrins = {};
//                  nextavail++
//                 insertstmt = { ID: nextavail, TID: viewrec.wcid, '"LastName"': `${workerMedicare.lastname}`, '"FirstName"': `${workerMedicare.firstname}`, '"Date of Birth"': `${workerMedicare.dob}`, '"Type"': 'W', '"Found"': legacy }
  
//                 qrystrins.insertstmt = JSON.stringify(insertstmt)
//                 qrystrins.table = '"WorkerMedicareNF"'
//                 qrystrins.database = databasepath;//'d:/firebird/data/brm/bergen.fdb'
//                 let ufbkwm2 = await fastify.insertdata(qrystrins)
//                 // console.log('insertstmt', insertstmt)
//               }
//             }
//           }
  
//         }// 'WORKER
  
//       }
  
//       let now = moment().format('MM/DD/YYYY HH:mm:ss')// "04/09/2013 15:00:00";
  
//       var ms = moment(now, "MM/DD/YYYY HH:mm:ss").diff(moment(timethen, "MM/DD/YYYY HH:mm:ss"));
  
//       var d = moment.duration(ms);
//       // let ti = d._data.hours + ' hr ' + d._data.minutes + ' mins ' + d._data.seconds + ' secs '
//       let ti = d._data.hours + ' hr ' + d._data.minutes + ' mins ' + d._data.seconds + ' secs '
  
//       // console.log('ct===================io======', ct, fbk.length)//,ttm1)
//      // fastify.io.sockets.emit('cms', { 'data': ct });
//       if (ct === fbk.length) {
//         // console.log('finished==1===', ct, fbk.length)//,ttm1)
//         //// fastify.io.sockets.emit('cms', { 'data': true });
//         // fastify.io.emit('cms', { 'data': true });
//         //  reply.send( 'ok')// 
//         return 'ok'
//       }
//     }
//   }


// }
// // tools.js
// // ========



