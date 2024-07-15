const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

const responses = {
    greetings: ["Hello!", "Hi there!", "Hey! How can I help you?"],
    services: ["We offer a wide range of services including A, B & C", "Our services include X, Y, and Z."],
    contact: ["You can contact us at chatbot@email.com", "For further inquiries, please call 123-456-7890."],
    farewells: ["Goodbye!", "See you later!", "Have a great day!"],
    default: ["I'm sorry, I didn't understand that.", "Could you please clarify?"],
};

function getResponse(userInput) {
    if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
        return randomResponse(responses.greetings);
    } else if (userInput.toLowerCase().includes("services") || userInput.toLowerCase().includes("offer")) {
        return randomResponse(responses.services);
    } else if (userInput.toLowerCase().includes("contact") || userInput.toLowerCase().includes("email") || userInput.toLowerCase().includes("phone")) {
        return randomResponse(responses.contact);
    } else if (userInput.toLowerCase().includes("goodbye") || userInput.toLowerCase().includes("bye")) {
        return randomResponse(responses.farewells);
    } else {
        return randomResponse(responses.default);
    }
}

function randomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
}

app.use(cors());
app.use(bodyParser.json());

app.post('/bot', (req, res) => {
    const { message } = req.body;
    const botResponse = getResponse(message);
    res.json({ response: botResponse });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
