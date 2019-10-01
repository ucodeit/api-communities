const request = require('../handlers/request');

let db = 
{
   queryPG: function(query)
   {
      return new Promise(async function(resolve, reject)
      {
         try
         {
            let responseRequest = await request.pgDB(query);
            if(responseRequest.error && (responseRequest.error.constructor !== Object || Object.keys(responseRequest.error).length !== 0))
            {
               reject(responseRequest.error);
               return;
            }
            resolve(responseRequest.data);
            return;
         }
         catch(e)
         {
            reject(e);
            return;
         }
      });
      
   },
   copyPG: function(query, file) 
   {
      return new Promise(async function(resolve, reject)
      {
         try
         {
            let responseRequest = await request.pgCopy(query, file);
            if(responseRequest.error && (responseRequest.error.constructor !== Object || Object.keys(responseRequest.error).length !== 0))
            {
               reject(responseRequest.error);
               return;
            }
            resolve(responseRequest.data);
            return;
         }
         catch(e)
         {
            reject(e);
            return;
         }    
      });
      
   },
   querySingleRow: function(query, callback) 
   {
      return new Promise(async function(resolve, reject)
      {
         try
         {
            let data = await db.queryPG(query);
            resolve(data[0]);
            return;
         }
         catch(e)
         {
            reject(e);
            return;
         }
      });
   }
}
 
module.exports = db;