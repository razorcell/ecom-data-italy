const jwt = require('jsonwebtoken');

   // Define the payload
   const payload = {
     sub: "ecAccess",
     timestamp: Date.now(),
     typeOfService: "ORDER_AND_COLLECT",
     pointOfServiceId: "009825",
     cartId: "c-s-C-24-08443147",
     anonymousCartId: "https://jwt.io/#encoded-jwtbe0b4c4c-58de-4fac-a3f0-89bd03918a54",
     cartCreationTime: Date.now(),
     timeslotExpiration: 0,
     nStoresFound: 15,
     missingCartCounter: 0,
     clCountry: "IT",
     iss: "conad",
     iat: 1728646515
   };

   // Define the secret key
   const secret = 'your-256-bit-secret';

   // Sign the token
   const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

   console.log('Generated JWT:', token);