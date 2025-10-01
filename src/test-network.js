import axios from 'axios';

// PASTE YOUR UNIQUE URL FROM WEBHOOK.SITE HERE
const webhookUrl = 'https://webhook.site/ff45977d-140e-41ca-a485-13ca7d1ea899';

async function testRequest() {
  try {
    console.log('Sending test request to:', webhookUrl);
    const response = await axios.post(webhookUrl,
      { message: 'Hello from Node.js' },
      {
        headers: {
          'Authorization': 'Bearer MY_TEST_TOKEN_12345',
          'X-Custom-Header': 'This is a test'
        }
      }
    );
    console.log('Request successful! Status:', response.status);
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

testRequest();