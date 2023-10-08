
const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");


const app = express();
app.use(bodyParser.json());
app.use(cors())


const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});

const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: prompt,
    // max_tokens: 4097,
  });
  res.send(completion.data.choices[0].text);
});

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});