const validator = require('validator'); // Santiy check to prevent script injections
const axios = require('axios'); // HTTP client for making requests

function getLocationResponse(location) {
    const normalizedLocation = location.toLowerCase();

    if (!validator.isAlpha(location, 'en-US', { ignore: ' ' })) {
        return "Invalid location format.";
    }

    switch (normalizedLocation) {
        case 'mexico':
        case 'mx':
        case 'méxico':
        case 'mexico city':
            return 'Thank you, the phone number for customer service in Mexico is: 001-800-956-9964 (Call) or +52 1 3316052614 (WhatsApp)';
        case 'usa':
        case 'the united states':
        case 'united states':
        case 'u.s.':
        case 'u.s.a.':
        case 'america':
        case 'united states of america':
            return 'Thank you, to reach customer service in USA call: 800-468-1714';
        case 'brazil':
        case 'brazilian':
        case 'brasil':
        case 'rio':
        case 'sao paulo':
            return 'Great! To reach customer service in Brazil call: 0-800-70-77-782';
        case 'canada':
        case 'canadian':
        case 'the great white north':
        case 'ontario':
        case 'toronto':
            return 'Perfect! To reach customer service in Canada call: 1-800-468-1714';
        case 'china':
        case 'chinese':
        case 'peking':
        case 'beijing':
        case 'shanghai':
            return 'Thank you, the customer service number for China is 400-920-2727';
        case 'india':
        case 'bharat':
        case 'delhi':
        case 'mumbai':
        case 'bangalore':
            return 'Customer service in India is available at 1800-221-456, I\'m glad I could assist!';
        case 'philippines':
        case 'ph':
        case 'manila':
        case 'pinoy':
        case 'filipino':
            return 'To reach customer service in the Philippines call: +63 918 8255479, I\'m glad I could assist!';
        default:
            return `Sorry, I couldn't find customer service phone number for your given location: ${location}. We currently offer support in these countries:\nUSA, \nBrazil, \nCanada, \nChina, \nIndia, \nMexico, and the\nPhilippines.`;
    }
}

function getStoreLocationResponse(storelocation) {
    const normalizedStoreLocation = storelocation.toLowerCase();

    if (!validator.isAlpha(storelocation, 'en-US', { ignore: ' ' })) {
        return "Invalid store location format.";
    }

    switch (normalizedStoreLocation) {
        case 'new york':
        case 'nyc':
            return 'Thank you! Smoosh a HERSHEY\'S Double Chocolate S\'more, sip a decadent milkshake and pick up the World\'s Largest HERSHEY\'S Bar in the heart of Times Square! The address of the store in New York is: 20 Times Square building\n at 701 Seventh Ave.\n New York, NY';
        case 'las vegas':
        case 'vegas':
            return 'Great! You can bet on having a great time savoring HERSHEY\'S Chocolate bakery treats and shopping 800+ products at our West Coast flagship location on the Las Vegas strip. The address of the store in Las Vegas is: 3790 Las Vegas Blvd. S.\n Las Vegas, NV';
        case 'niagara falls':
        case 'niagara':
        case 'ontario':
            return 'Welcome! Stop by our Falls Avenue location for rich milkshakes, HERSHEY\'S Candy souvenirs and bakery-fresh sweet treats. If only the falls were made of HERSHEY\'S Chocolate! The address of the store in Niagara Falls is: 5701 Falls Avenue\n Niagara Falls, Ontario\n 1-905-374-4446, ext 4272';
        case 'singapore':
            return 'Perfect! Wherever you are in the world, you can always make magical moments and memories with HERSHEY\'S Chocolate. Shop Hershey Candy, sweet gifts and more in Singapore! The address of the store in Singapore is: Resorts World Sentosa\n Sentosa Gateway\n #01-075/076/077\n Singapore 098138\n (65) 68846733';
        default:
            return `Sorry, there is not a Hershey's chocolate world store at your given location: ${storelocation}`;
    }
}

async function getChatGptResponse(userQuery, apiKey) {
    try {
        const sanitizedQuery = validator.escape(userQuery);
        const gptResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: sanitizedQuery }],
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return gptResponse.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('Unable to process your request at the moment.');
    }
}

module.exports = {
    getLocationResponse,
    getStoreLocationResponse,
    getChatGptResponse,
};
