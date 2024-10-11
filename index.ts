import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { JSDOM } from 'jsdom';
import * as vm from 'vm';
import { HttpsProxyAgent } from 'https-proxy-agent';


// URLs for the scripts
const botdUrl = 'https://spesaonline.conad.it/etc.clientlibs/conad-common/clientlibs/clientlib-global-protection/resources/chunks/botd.js';
const thumbmarkUrl = 'https://spesaonline.conad.it/etc.clientlibs/conad-common/clientlibs/clientlib-global-protection/resources/chunks/thumbmark.js';

// Fetch and execute a script in a new VM context
// async function loadScript(url: string): Promise<any> {
//   const response = await fetch(url);
//   const scriptContent = await response.text();
//   const script = new vm.Script(scriptContent);
//   const context = vm.createContext({ console, window: {} });
//   script.runInContext(context);
//   return context;
// }

// Main function to get protection token
async function getProtectionToken(action: string): Promise<string> {
  // const botdContext = await loadScript(botdUrl);
  // const thumbmarkContext = await loadScript(thumbmarkUrl);

  // // Simulate bot detection and fingerprinting
  // const botd = await botdContext.Botd.load();
  // const detection = await botd.detect();
  // const thumbmark = thumbmarkContext.ThumbmarkJS;
  // thumbmark.setOption('exclude', ['canvas', 'plugins', 'permissions', 'webgl', 'system.browser.version']);
  // const fingerprint = await thumbmark.getFingerprint();
  const fingerprint = '2534243ac8343e26414c4b16b75ce003';

  // Simulate captcha handling
  // const captchaV3Token = 'simulated-captcha-token'; // Replace with actual captcha handling
  const captchaV3Token = "03AGdBq24gK9a6F7b8c9dE1fG2hI3jK4lM5nO6pQ7rS8tU9vW0xY1zA2bC3D4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5";
  // Step One
  const proxyUrl = 'http://http://20.62.44.172:8888';
  const proxyAuth = 'Basic ' + Buffer.from('43dle0eolrojlw1ovjpdj:y5inwf9thsgg1uev047de4').toString('base64');

  const responseStep1 = await fetch('https://spesaonline.conad.it/api/common/protection.json?step=one', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Proxy-Authorization': proxyAuth,
    },
    body: JSON.stringify({
      captchaToken: captchaV3Token,
      feBot: false,
      fingerprint,
      action,
      infos: null,
    }),
    agent: new HttpsProxyAgent(proxyUrl),
  });

  const dataStep1 = await responseStep1.json() as any;
  if (dataStep1?.data?.ok) {
    return dataStep1.data.token;
  }

  // // Step Two (if needed)
  // const captchaV2Token = 'simulated-captcha-token'; // Replace with actual captcha handling
  // const responseStep2 = await fetch('https://spesaonline.conad.it/api/common/protection.json?step=two', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     fingerprint,
  //     token: dataStep1.data.token,
  //     captchaToken: captchaV2Token,
  //   }),
  // });

  // const dataStep2 = await responseStep2.json();
  // if (dataStep2?.data?.ok) {
  //   return dataStep2.data.token;
  // }

  throw new Error("Unable to obtain protection token");
}

// Example usage
(async () => {
  try {
    const protectionToken = await getProtectionToken('entryaccess');
    console.log('Protection Token:', protectionToken);
  } catch (error) {
    console.error('Error:', error);
  }
})();