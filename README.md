# dialogflow-webhook
A simple Node.js webhook server for Dialogflow that handles various intents, including ChatGPT responses. The server uses Express.

## How to use the webhook in dialogflow
1. Set up your OpenAI API key:  
    - Create an account on OpenAI.
    - Generate an API key from the OpenAI dashboard.
    - Update the .env file in your project directory with your API key:
    - `OPENAI_API_KEY=INSERT_YOUR_API_KEY_HERE`
1. Ensure you have the webhook enabled on your intents
    - Go to your Dialogflow console.
    - Select the intent you want to use the webhook with.
    - Under the Fulfillment section, check the box for Enable webhook call for this intent.
2. Install ngrok to expose your local server to the internet:  
    - Download and install ngrok from ngrok.com.
    - Run ngrok to create a tunnel to your local server:
    - ngrok http 3000
    - Copy the generated public URL (e.g., https://abcd1234.ngrok-free.app).
4. Set up the webhook in Dialogflow:  
    - Go to the Fulfillment section in your Dialogflow console.
    - Enable the webhook and set the URL to the ngrok URL you copied, followed by /webhook (e.g., https://abcd1234.ngrok-free.app /webhook).
5. Run the appliplication locally
    - Install dependencies: `npm install`
    - Run the application: `node index.js` from your directory
    - This will start your webhook server on port 3000.
6. Test your webhook:  
    - Use the Dialogflow console to test your intents and ensure the webhook is being called correctly.
