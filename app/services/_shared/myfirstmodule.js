// exports.myDateTime = function () {
//     return Date();
//   }
//   exports.name = function () {
//     return 'johnt'
//   };

//   var os = require('os');
//   // const sanitizer = require('sanitize'); //();
  
//   // const { ConstraintViolationError } = require('objection');
//   // if (os.platform() == 'win32') {
//   //   if (os.arch() == 'ia32') {
//   //     var chilkat = require('@chilkat/ck-node12-win-ia32');
//   //   } else {
//   //     var chilkat = require('@chilkat/ck-node12-win64');
//   //   }
//   // }
  
//   if (os.platform() == 'win32') {
//     if (os.arch() == 'ia32') {
//       var chilkat = require('@chilkat/ck-node16-win-ia32');
//     } else {
//       var chilkat = require('@chilkat/ck-node16-win64');
//     }
//   }
//   exports.chilkat_decrypt = function (str) {

  
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
//   }
  
  
// //   function chilkat_encrypt(str) {
  
// //     var glob = new chilkat.Global();
// //     ///////////  var success = glob.UnlockBundle("BERGEN.CB1022021_RAtwFZrN364n");
// //     var success = glob.UnlockBundle("BERGEN.CB1022023_S9Nnre6v367y");
  
  
// //     if (success !== true) {
// //       // console.log(glob.LastErrorText);
// //       return;
// //     }
  
// //     var status = glob.UnlockStatus;
// //     if (status == 2) {
// //       // console.log("Unlocked using purchased unlock code.");
// //     }
// //     else {
// //       // console.log("Unlocked in trial mode.");
// //     }
  
  
// //     var success;
// //     var crypt = new chilkat.Crypt2();
// //     crypt.CryptAlgorithm = "aes";
// //     crypt.CipherMode = "cbc";
// //     crypt.KeyLength = 256;
// //     crypt.PaddingScheme = 0;
// //     var ivHex = "000102030405060708090A0B0C0D0E0F";
// //     crypt.SetEncodedIV(ivHex, "hex");
// //     var keyHex = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F";
// //     crypt.SetEncodedKey(keyHex, "hex");
// //     crypt.Charset = "us-ascii";
// //     crypt.EncodingMode = "hex";
// //     //////////////////////////////////////////////////  
// //     let retBuf2 = crypt.EncryptStringENC(str);
// //     // // console.log("delphi_encstr2: EncryptStringENC", retBuf2);
// //     return retBuf2
// //   }
  
  
// //   function bq(text) {
// //     if (text === null) {
// //       return text
// //     } else {
// //       return "'" + text + "'"
// //     }
// //   }
// //   async function getEntityfb(database) {
// //     // all other firebird database will pass the direc which is always 7 ie sep2022
// //     // not needed if (database.toLowerCase() === 'bergen.fdb') {
// //     // console.log('database', database)
// //     if (database.length === 7) {
// //       database = `${drive}:\\Files\\MonthlyBackup\\${database}\\database\\bergen.fdb`;
// //     } else {
// //       database = `${drive}:\\firebird\\data\\brm\\bergen.fdb`;
// //     }
  
// //     options.database = database;
// //     return //entity;
// //   }
  
// //   let options = {};
// //   options.host = process.env.ADDRESS;//'127.0.0.1';
// //   options.port = 3050;
// //   const drive = process.env.drive;//opts.drive;//'d'
// //   const docspath = `${drive}:/docs`;
  
// //   options.database = `${drive}:\\firebird\\data\\brm\\bergen.fdb`;
  
// //   options.user = process.env.DB_USER;
// //   options.password = process.env.DB_PASSWORD;
// //   options.lowercase_keys = false; // set to true to lowercase keys
// //   options.role = null; // default
// //   options.pageSize = 8192;
// //   options.charset = 'UTF8'
// //   const optionsdoc = {};
// //   optionsdoc.host = process.env.ADDRESS;
// //   optionsdoc.port = 3050;
// //   optionsdoc.database = `${drive}:\\firebird\\data\\brm\\bergendoc.fdb`;
// //   optionsdoc.user = process.env.DB_USER;
// //   optionsdoc.password = process.env.DB_PASSWORD;
// //   optionsdoc.lowercase_keys = false; // set to true to lowercase keys
// //   optionsdoc.role = null; // default
// //   optionsdoc.pageSize = 8192;
// //   optionsdoc.charset = 'UTF8'
  
  
// //   // validates if input email and password are correct
// //   async function checkLogin(req, db) {
// //     const sqlQuery =
// //       "SELECT email FROM credentials WHERE " +
// //       "email = ? AND " +
// //       "password = ?";
  
// //     db.query(sqlQuery, [req.body.email, req.body.password], (err, result) => {
// //       if (err) {
// //         return false;
// //       }
  
// //       return result.length !== 0;
// //     });
// //   }
  
// //   //
// //   async function delQuery(qrystr, arrayvals) {
// //     // can be delete smtm or SET GENERATOR "GEN_WCPayment_ID" TO 0;
// //     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');
// //     let sqlVals = arrayvals
// //     let newsqlVals = []
// //     return new Promise(async function (resolve, reject) {
// //       await (Firebird.attach(options, function (err, db) {
// //         if (err)
// //           // console.log('errDB ', err)
// //           // let sqlVals = arrayvals
  
// //           if (sqlVals === '' || sqlVals === undefined) {
// //           } else {
// //             for (const rec of sqlVals) {
// //               if (rec !== 'null') {
// //                 newsqlVals.push(rec)
// //               }
// //             }
// //           }
// //         if (newsqlVals !== []) sqlVals = newsqlVals
  
// //         db.query(qrystr, sqlVals, function (err, results) {
// //           db.detach();
// //           if (err) {
// //           } else {
// //             if (results === undefined) results = ' deleted'
// //             resolve(results)// 
// //           }
// //         })
// //       }))
  
// //     })
// //   }
  
// //   async function checkSQL1() {
// //     const sqlQuery = `Select * from "ScanPayments" where  "Processed" = ? and "AssignTo"=? `
// //     const arrayvals = ['Y', 100]
// //     return new Promise(async function (resolve, reject) {
// //       Firebird.attach(options, function (err, db) {
// //         db.query(sqlQuery, ['Y', 100], (err, result) => {
// //           if (err) {
// //             return false;
// //           }
// //           console.log('1result.length ', result.length)
  
// //           resolve(result.length)// 
// //         });
// //       });
// //     });
// //   }
// //   async function checkSQL2() {
// //     const sqlQuery = `Select * from "ScanPayments" where  "Processed" = ? and "AssignTo"=? `
// //     const arrayvals = ['Y', 100]
// //     return new Promise(async function (resolve, reject) {
// //       Firebird.attach(options, function (err, db) {
// //         db.query(sqlQuery, arrayvals, (err, result) => {
// //           if (err) {
// //             return false;
// //           }
// //           console.log('1result.length ', result.length)
// //           resolve(result.length)// 
// //         });
// //       });
// //     });
// //   }
  
// //   async function checkSQL3(sqlQuery, arrayvals) {
// //     return new Promise(async function (resolve, reject) {
// //       Firebird.attach(options, function (err, db) {
// //         db.query(sqlQuery, ['Y', 100], (err, result) => {
// //           if (err) {
// //             return false;
// //           }
// //           console.log('1result.length ', result.length)
// //           resolve(result.length)// 
// //         });
// //       });
// //     });
// //   }
// //   async function checkSQL4(sqlQuery, arrayvals) {
// //     return new Promise(async function (resolve, reject) {
// //       Firebird.attach(options, function (err, db) {
// //         db.query(sqlQuery, arrayvals, (err, result) => {
// //           if (err) {
// //             return false;
// //           }
// //           console.log('1result.length ', result.length)
// //           resolve(result.length)// 
// //         });
// //       });
// //     });
// //   }
  
// //   async function fixArrayVals(arrayvals) {
    
// //    let sqlVals = arrayvals
// //     if (sqlVals === undefined) {
// //     }
   
// //       let newsqlVals = []
// //       if (sqlVals === '' || sqlVals === undefined) {
// //       } else {
// //         for (let rec of sqlVals) {
// //           if (rec === 'null' || rec === null) {
// //           } else {
// //             // not sure about next 2
// //             if (typeof (rec) !== "number") {
// //               rec = rec.replace(/%2f|%5c/ig, '/');
// //             }
// //             newsqlVals.push(rec)
// //           }
// //         }
      
  
// //       if (newsqlVals !== []) sqlVals = newsqlVals
// //       return sqlVals
// //     }
// //   }
  
  
// //   async function getQuery(qrystr, sqlVals) {
// //     //https://learn.snyk.io/lesson/sql-injection/   https://snyk.io/blog/sql-injection-cheat-sheet/?loc=learn
// //     // this breaks diary   // qrystr= qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');  // // console.log('======qrystr: ', qrystr);
  
// //     qrystr = qrystr.replace(/\n/g, ' ').replace(/\r/g, ' ');
// //     return new Promise(async function (resolve, reject) {
// //       // let sqlVals
// //       await (Firebird.attach(options, function (err, db) {
// //         if (err) console.log('errDB ', err)
// //         //  throw err;
  
// //         // sqlVals = arrayvals
        
        
// //           db.query(qrystr, sqlVals, function (err, results) {
// //             db.detach();
// //             if (err) {
// //               //  throw err;
// //               resolve('failure')
// //               // console.log('err ', err)
// //             } else {
// //               if (results === undefined) results = 'savedproc';// inserted
// //               // // console.log('=line 241:: ', results);//,results.length)//[0]) rystr.substring(0, 50), 
// //               resolve(results)// .low_)
// //             }
// //           })
       
// //       }))
  
// //     })
// //   }
  
// //   async function getNextNo(qrystr) {
// //     // console.log('======getNextNo: ');
// //     return new Promise(async function (resolve, reject) {
// //       await (Firebird.attach(options, function (err, db) {
// //         if (err)
// //           //  throw err;
// //           // console.log('errDB ', err) //[0].id);
// //           // db = DATABASE
// //           db.query(qrystr, function (err, results) {
// //             db.detach();
// //             if (err) {
// //               //  throw err;
// //               // console.log('err ', err)
// //             } else {
// //               // console.log('=1=====getNextNo::_:: ', results[0])
// //               // let  nextaa = results[0]
// //               //  // console.log('=2=====nextaa::_:: ', nextaa.NA)  //na.low_)
// //               // console.log('=3=====getNextNo::_:: ', results[0].NA)  //na.low_)
// //               resolve(results[0].NA)
// //               //   resolve(999999)
// //             }
// //           })
// //       }))
  
// //     })
// //   }
  
// //   async function getNextNoDocs(qrystr) {
// //     // console.log('======getNextNo: ');
// //     return new Promise(async function (resolve, reject) {
// //       await (Firebird.attach(optionsdoc, function (err, db) {
// //         if (err)
// //           // console.log('errDB ', err) //[0].id);
// //           db.query(qrystr, function (err, results) {
// //             db.detach();
// //             if (err) {
// //               //  throw err;
// //               // console.log('err ', err)
// //             } else {
// //               // console.log('=1=====getNextNo::_:: ', results[0])
// //               // let  nextaa = results[0]
// //               //  // console.log('=2=====nextaa::_:: ', nextaa.NA)  //na.low_)
// //               // console.log('=3=====getNextNo::_:: ', results[0].NA)  //na.low_)
// //               resolve(results[0].NA)
// //               //   resolve(999999)
// //             }
// //           })
// //       }))
  
// //     })
// //   }