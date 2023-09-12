import fetch from 'node-fetch'; // just to try a server-side fetch in Node.js
import express from 'express';
//import path from "path";

const app = express();
//app.use(express.static("public"));

fetch(`https://the-trivia-api.com/api/questions?limit=10`)
    .then((response) => response.json())
    .then((result) => {

        // API

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "public/quiz/html/quiz.html")
        });

        app.get("/quiz/:id", (req, res) => {
            const quizToGet = result[req.params.id];
            res.send(quizToGet);
        })
    })
    .catch((error) => {
        console.error("Error fetching trivia data:", error);
    });

const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});
