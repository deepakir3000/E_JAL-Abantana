const axios = require('axios');
const https = require('https');
// const LOG = logger.getLogger("ORTPSAClient.js");

class ORTPSAClient {
  // Method to send data to the ORTPSA service
  static async sendToORTPSA(payload, method, serviceId, contentType='application/json') {
    console.log('ORTPSAClient --------------------',payload,'payload', method, serviceId );
    
    try {
      console.log('enter in try method-=-=-=-=-=-=-==-=-=-');
      const URL = ORTPSAClient.prepareURL(method, serviceId);
      console.log('URL===============', URL);
   
      const agent = new https.Agent({ rejectUnauthorized: true });
      const response = await axios.post(URL, payload, {
        headers: {
          'Content-Type': contentType,
        },
        httpsAgent: agent,
      });

      console.log('response from url =-=-=-=-=-=-=-=', response);
      
      // Logger.log('./info.log', "info", JSON.stringify(response.data), {});
      console.log('response.data---------------',JSON.stringify(response.data) );
      return response.data;
      
    } catch (error) {
     console.log("error", JSON.stringify(error), {});
    }
  }

  static prepareURL(method, serviceId) {
    console.log('prepareURL--------------------------');
  console.log('method:', method);
  console.log('serviceId:', serviceId);
    //  return `https://testapi.gaestate.in/api/${method}.php?service=${serviceId}`; //testing
     if(method == 'Insert'){
      return `https://testapi.gaestate.in/api/api_wr.php?service=${serviceId}`; //production
     } 
   else {
    return `https://testapi.gaestate.in/api/update_api_wr.php?service=${serviceId}`;//production
   }
  }
}
// class ORTPSAClient {
//   // Method to send data to the ORTPSA service
//   static async sendToORTPSA(payload, method, serviceId, contentType = 'application/json') {
//     console.log('ORTPSAClient --------------------', payload, method, serviceId);

//     try {
//       console.log('enter in try method-=-=-=-=-=-=-==-=-=-');
      
//       const URL = ORTPSAClient.prepareURL(method, serviceId);
//       console.log('URL===============', URL);
      
//       const response = fetch(URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': contentType,
//         },
//         body: contentType === 'application/json' ? JSON.stringify(payload) : payload
//       });

//       const responseData = response.json();
//       console.log('response.data---------------', JSON.stringify(responseData));
//       return responseData;

//     } catch (error) {
//       console.log("error=====", JSON.stringify(error));
//     }
//   }

//   static prepareURL(method, serviceId) {
//     console.log('prepareURL--------------------------', method, serviceId);
//     //return `https://preprod.secuodsoft.com/apiortpsa/${method}/service=${serviceId}/`; //staging
//     return `https://apiortpsa.odisha.gov.in/${method}/service=${serviceId}/`;
//   }
// }

// // Example usage:
// const payload = {
//   data: 'test data',
// };
// const mode = 'testMode';
// const version = '1.0';
// const key = 'secretKey';
// const serviceId = 'service001';

// ORTPSAClient.sendToORTPSA(payload, mode, version, key, serviceId)
//   .then((result) => {
//     console.log('Response from ORTPSA:', result);
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });
module.exports = ORTPSAClient;
