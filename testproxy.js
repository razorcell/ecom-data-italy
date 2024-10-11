const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { HttpProxyAgent } = require('http-proxy-agent');
const dotenv = require("dotenv");
dotenv.config();

// Main function to get protection token
async function testProxy(action) {
  const proxyAgent = new HttpProxyAgent(process.env.PROXY_URL);
  const proxyAgentsHttps = new HttpsProxyAgent(process.env.PROXY_URL);

  try {
    const responseStep1 = await fetch('https://api.ipify.org?format=json', {
      headers: {
        'Content-Type': 'application/json',
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

(async () => {
  try {
    await testProxy();
  } catch (error) {
    console.error('Error:', error);
  }
})();