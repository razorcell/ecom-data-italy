import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';

// Main function to get protection token
async function testProxy(action) {
  const proxyAgent = new HttpProxyAgent('http://43dle0eolrojlw1ovjpdj:y5inwf9thsgg1uev047de4@20.62.44.172:8888');
  const proxyAgentsHttps = new HttpsProxyAgent('http://43dle0eolrojlw1ovjpdj:y5inwf9thsgg1uev047de4@20.62.44.172:8888');

  try {
    const responseStep1 = await fetch('https://api.ipify.org?format=json', {
      headers: {
        'Content-Type': 'application/json',
        // 'Proxy-Authorization': proxyAuth,
      },
      agent: proxyAgentsHttps,
    });

    if (!responseStep1.ok) {
      const errorText = await responseStep1.text();
      throw new Error(`HTTP error! Status: ${responseStep1.status}, Message: ${errorText}`);
    }

    console.log(await responseStep1.json());
  } catch (error) {
    console.error('Fetch Error:', error.message);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const protectionToken = await testProxy();
  } catch (error) {
    console.error('Error:', error);
  }
})();