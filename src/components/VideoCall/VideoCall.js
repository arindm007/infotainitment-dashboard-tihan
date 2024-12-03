import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// const { generateToken04 } = require('./zegoServerAssistant');
function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallRoom() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1616851549
    const serverSecret = 'cb4c408cebd65d3834012e261c344194'
    const userID = randomID(5);
    const userName = randomID(5);
    const effectiveTimeInSeconds = 3600;
    const payload = ''; 
    // const token =  generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds, payload);
    // console.log('token:',token);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
    //     appID,
    //     token,
    //     roomID,
    //     userID,
    //     userName
    //   );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      }
    });


  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}