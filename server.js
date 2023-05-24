const express = require('express');
const server = express();
const PORT =process.env.PORT ||3003;
const cors = require('cors');
const axios = require('axios')
require('dotenv').config();
server.use(cors())
server.use(express.json())


const pg = require('pg');
const client = new pg.Client ((process.env.DATABASE_URL||`${DATABASE_URL}`)) 


///////////////////////////////////////////////////////////////////////////////////////////

server.get('/', homeHandler)
server.get('/choosequiz', chooseQuiz)
server.get('/getAllCategories', getAllCategories)
//////////////////////////////////////////////////////////////////////////////////////////

function chooseQuiz(req, res) {
    const quizCategory = req.query.category;
    const difficulty=req.query.difficulty;
    const limit=req.query.limit
    console.log(req.query.category)
    const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${APIKey}&category=${quizCategory}&difficulty=${difficulty}&limit=${limit}`;
    axios.get(API_URL)
        .then((response) => {
            res.send(response.data.products)
        })
        .catch(error => {
            res.send(error)
        })
}




function homeHandler(req, res) {
    res.status(200).send("Hello from the My quiz App")
}



server.listen(PORT, () => {
    console.log(`Listening on ${PORT}: I'm ready`)
})
     




function getAllCategories(req, res) {
    const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${APIKey}`;
    axios.get(API_URL)
        .then((response) => {
            res.status(200).send(response.data)
        })
        .catch(error => {
            res.send(error)
        })
}