// "use strict";
// exports.__esModule = true;
// var bigInt = require("big-integer");
// var ErrorCode; // Define enum for error codes
// (function (ErrorCode) {
//     ErrorCode[ErrorCode["success"] = 0] = "success";
//     ErrorCode[ErrorCode["appIDInvalid"] = 1] = "appIDInvalid";
//     ErrorCode[ErrorCode["userIDInvalid"] = 3] = "userIDInvalid";
//     ErrorCode[ErrorCode["secretInvalid"] = 5] = "secretInvalid";
//     ErrorCode[ErrorCode["effectiveTimeInSecondsInvalid"] = 6] = "effectiveTimeInSecondsInvalid";
// })(ErrorCode || (ErrorCode = {}));

// function RndNum(a, b) { // Function to return random number within given range
//     return Math.ceil((a + (b - a)) * Math.random());
// }

// // Function to generate random 16 character string
// function makeRandomIv() {
//     var str = '0123456789abcdefghijklmnopqrstuvwxyz';
//     var result = [];
//     for (var i = 0; i < 16; i++) {
//         var r = Math.floor(Math.random() * str.length);
//         result.push(str.charAt(r));
//     }
//     return result.join('');
// }

// // Function to determine algorithm based on length of secret key (16, 24 or 32 bytes)
// function getAlgorithm(keyBase64) {
//     var key = new TextEncoder().encode(keyBase64); // Use TextEncoder for encoding base64 key
//     switch (key.length) {
//         case 16:
//             return 'aes-128-cbc';
//         case 24:
//             return 'aes-192-cbc';
//         case 32:
//             return 'aes-256-cbc';
//     }
//     throw new Error('Invalid key length: ' + key.length);
// }

// // AES encryption function using Web Cryptography API (AES-CBC)
// async function aesEncrypt(plainText, key, iv) {
//     const encodedKey = new TextEncoder().encode(key);
//     const encodedIv = new TextEncoder().encode(iv);
//     const algorithm = getAlgorithm(key);

//     // Import the encryption key
//     const cryptoKey = await window.crypto.subtle.importKey(
//         'raw', encodedKey, { name: algorithm }, false, ['encrypt']
//     );

//     // Encrypt the plain text
//     const encrypted = await window.crypto.subtle.encrypt(
//         { name: algorithm, iv: encodedIv }, cryptoKey, new TextEncoder().encode(plainText)
//     );

//     return new Uint8Array(encrypted); // Return encrypted data as Uint8Array
// }

// // Function to generate token using given parameters
// async function generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload) {
//     if (!appId || typeof appId !== 'number') { // Check if appID is valid
//         throw {
//             errorCode: ErrorCode.appIDInvalid,
//             errorMessage: 'appID invalid'
//         };
//     }
//     if (!userId || typeof userId !== 'string') { // Check if userId is valid
//         throw {
//             errorCode: ErrorCode.userIDInvalid,
//             errorMessage: 'userId invalid'
//         };
//     }
//     if (!secret || typeof secret !== 'string' || secret.length !== 32) { // Check if secret is valid
//         throw {
//             errorCode: ErrorCode.secretInvalid,
//             errorMessage: 'secret must be a 32 byte string'
//         };
//     }
//     if (!effectiveTimeInSeconds || typeof effectiveTimeInSeconds !== 'number') { // Check if effectiveTimeInSeconds is valid
//         throw {
//             errorCode: ErrorCode.effectiveTimeInSecondsInvalid,
//             errorMessage: 'effectiveTimeInSeconds invalid'
//         };
//     }

//     var createTime = Math.floor(new Date().getTime() / 1000); // Get current time in seconds
//     var tokenInfo = { // Create object with token information
//         app_id: appId,
//         user_id: userId,
//         nonce: RndNum(-2147483648, 2147483647),
//         ctime: createTime,
//         expire: createTime + effectiveTimeInSeconds,
//         payload: payload || ''
//     };
//     var plaintText = JSON.stringify(tokenInfo); // Convert tokenInfo object to JSON string
//     console.log('plain text: ', plaintText);
//     var iv = makeRandomIv(); // Generate random 16 character string for iv
//     console.log('iv', iv);

//     // Encrypt the plaintext asynchronously
//     var encryptedBuf = await aesEncrypt(plaintText, secret, iv); 

//     var _a = [new Uint8Array(8), new Uint8Array(2), new Uint8Array(2)], b1 = _a[0], b2 = _a[1], b3 = _a[2];
//     new DataView(b1.buffer).setBigInt64(0, bigInt(tokenInfo.expire), false); // Set expire time in binary format
//     new DataView(b2.buffer).setUint16(0, iv.length, false); // Set length of iv in binary format
//     new DataView(b3.buffer).setUint16(0, encryptedBuf.byteLength, false); // Set length of encrypted information in binary format

//     // Create concatenated buffer
//     var buf = new Uint8Array([...b1, ...b2, ...new TextEncoder().encode(iv), ...b3, ...encryptedBuf]);

//     return '04' + btoa(String.fromCharCode.apply(null, buf)); // Convert to Base64 using btoa (browser API)
// }

// exports.generateToken04 = generateToken04;
