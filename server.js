
"use strict";



const express = require('express');
const server = express();
const PORT = process.env.PORT || 3003;
const cors = require('cors');
const axios = require('axios')

const APIKey = "6cy3aAAxKRS42r8DdIJrHyIGaLvrRz1AsZKstf2q";


require('dotenv').config();
server.use(cors())
server.use(express.json())


const pg = require('pg');
const client = new pg.Client('postgresql://localhost:5432/quiz')



//routes//
server.get('/', homeHandler);
server.get('/getAllCategories', getAllCategories);
server.get('/choosequiz', chooseQuiz);
server.get('/getQusetions/:categoryId', getQuestions);
server.get("/flipping", getFlipping);
server.post("/saveQuiz", saveQuiz);
server.get('/getQuizResult',quizResultHandeler)
server.get('*', defaultHandler);
server.use(errorHandler);




function homeHandler(req, res) {
  res.status(200).send("Hello from the My quiz App")
}

function defaultHandler(req, res) {
  res.status(404).send('default route')
}

function getAllCategories(req, res) {
  const API_URL = `https://opentdb.com/api_category.php`;
  axios.get(API_URL)
    .then((response) => {
      res.status(200).send(response.data.trivia_categories)

      console.log(response.data)

    })
    .catch((error) => {
      errorHandler(error, req, res)
    })

}


function chooseQuiz(req, res) {
  const difficulty = req.query.difficulty;
  const amount = req.query.amount
  const categoryId = req.query.categoryId;
  console.log(req.query.category)
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;


  axios.get(API_URL)
    .then((response) => {
      res.send(response.data.results)
  
        console.log(response.data);
      
    })
    .catch(error => {
      res.send(error)
    })
}


function getQuestions(req, res) {
  const categoryId = req.params.categoryId;
  const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;

  axios.get(url)
    .then(response => {
      const questions = response.data.results;
      res.send({ questions: questions });
    })
    .catch((error) => {
      errorHandler(error, req, res)
    })
}



function getFlipping(req, res) {
  const { amount, category } = req.query;

  console.log(req.query.category)
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=boolean`;


  axios.get(API_URL)
    .then((response) => {
      res.send(response.data.results)
  
        console.log(response.data);
      
    })
    .catch(error => {
      res.send(error)
    })
}


function saveQuiz(req, res) {
  const { name, numQuestions,  numCorrectAnswers, numUnanswered, score } = req.body;
  const sql =
    'INSERT INTO Grades (name, numQuestions, numCorrectAnswers, numUnanswered, score) VALUES ($1, $2, $3, $4, $5)';
  const values = [name, numQuestions, numCorrectAnswers, numUnanswered, score];

  client
    .query(sql, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function quizResultHandeler(req,res)
{
  const sql=`SELECT * FROM grades ORDER BY id DESC LIMIT 1;`
  client.query(sql)
  .then((data)=>{
    res.send(data.rows)
  })
  .catch((error)=>{
    errorHandler(error,req,res)
  })
}

function errorHandler(error, req, res) {
  const err = {
    status: 500,
    message: error,
  };
  res.status(500).send(err);
}




client.connect().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});











