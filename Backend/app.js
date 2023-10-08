const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8080;
// const API_KEY = "your key ";

app.use(bodyParser.json());
app.use(cors());

// code converted route
app.post("/convert", async (req, res) => {
     try {
          const { code, language } = req.body;

          const chatGPTResponse = await axios.post(
               "https://api.openai.com/v1/chat/completions",
               {
                    model: "gpt-3.5-turbo",
                    messages: [
                         {
                              role: "system",
                              content: `You are a code converter that converts code into ${language}.`,
                         },
                         { role: "user", content: code },
                    ],
                    max_tokens: 200,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${API_KEY}`,
                    },
               }
          );

          const convertedCode = chatGPTResponse.data.choices[0].message.content;
          console.log(convertedCode);
          res.json({ convertedCode });
     } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: "An error occurred while converting code." });
     }
});

// debug code route

app.post("/debug", async (req, res) => {
     try {
          const { code, language } = req.body;

          const chatGPTResponse = await axios.post(
               "https://api.openai.com/v1/chat/completions",
               {
                    model: "gpt-3.5-turbo",
                    messages: [
                         {
                              role: "system",
                              content: `Help me to solve the issue and write updated code. Also explain what the issue was and what you  did to fix it.`,
                         },
                         { role: "user", content: code },
                    ],
                    max_tokens: 200,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${API_KEY}`,
                    },
               }
          );

          const convertedCode = chatGPTResponse.data.choices[0].message.content;
          console.log(convertedCode);

          res.json({ convertedCode });
     } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: "An error occurred while converting code." });
     }
});

// Quality check route

app.post("/check", async (req, res) => {
     try {
          const { code, language } = req.body;

          const chatGPTResponse = await axios.post(
               "https://api.openai.com/v1/chat/completions",
               {
                    model: "gpt-3.5-turbo",
                    messages: [
                         {
                              role: "system",
                              content: `Please provide a code quality assessment for the given code. Consider the following parameters:

                    1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting.
                    2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.
                    3. Code Documentation: Review the code for appropriate comments, inline documentation, and clear explanations of complex logic.
                    4. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms.
                    5. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability.
                    6. Code Modularity: Assess the code for modular design, separation of concerns, and reusability of components.
                    7. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells.
                    8. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability.
                    9. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices.

                    Please provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.
                    `,
                         },
                         { role: "user", content: code },
                    ],
                    max_tokens: 400,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${API_KEY}`,
                    },
               }
          );

          const convertedCode = chatGPTResponse.data.choices[0].message.content;
          console.log(convertedCode);

          res.json({ convertedCode });
     } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: "An error occurred while converting code." });
     }
});

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
