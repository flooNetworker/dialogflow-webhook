require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // web framework for node.js
const bodyParser = require('body-parser'); // middleware to parse incoming request bodies
const rateLimit = require('express-rate-limit'); // rate limiter to prevent abuse, ddos attacks
const { getLocationResponse, getStoreLocationResponse, getChatGptResponse } = require('./responses');

const app = express();

// OpenAI API key not hardcoded but fetched from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use(limiter);
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const intentName = req.body.queryResult.intent.displayName; // map to the correct intent
    console.log('Intent received:', intentName);

    let responseText = '';

    // Extract from Dialogflow request
    const location = req.body.queryResult.parameters.location;
    const storelocation = req.body.queryResult.parameters.storelocation;
    const userQuery = req.body.queryResult.queryText;

    try {
        if (intentName === 'ChatGpt') {
            responseText = "Thank you for your question, here is what ChatGpt found: " + await getChatGptResponse(userQuery, OPENAI_API_KEY);
        } else if (intentName === 'ContactCustomerService') {
            responseText = getLocationResponse(location);
        } else if (intentName === 'StoreLocations') {
            responseText = getStoreLocationResponse(storelocation);
        } else {
            responseText = "No valid parameters provided for webhook, check your intent's return parameters.";
        }
    } catch (error) {
        console.error('Error processing request:', error);
        responseText = 'Sorry, I am unable to process your request at the moment.';
    }

    return res.json({
        fulfillmentText: responseText,
    });
});

app.listen(3000, () => {
    console.log('Wihoo! Webhook server is running on port 3000, please use ngrok to expose local server to internet!');
});