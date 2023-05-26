
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
server.get("/leaderboard", getGrades);
server.post("/grades", addGrade);
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
  // const quizCategory = req.query.category;
  const difficulty = req.query.difficulty;
  const amount = req.query.amount
  const categoryId = req.query.categoryId;
  console.log(req.query.category)
  const API_URL = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`;


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



function getGrades(req, res) {

  const sql = `SELECT * FROM Grades;`;
  client.query(sql).then((data) => {
    res.send(data.rows)
  }).catch((error) => {
    errorHandler(error, req, res)
  })
}


function addGrade(req, res) {
  const { name, score, total_qes, correct_answers } = req.body;
  const sql =
    'INSERT INTO Grades (name, score, total_qes, correct_answers) VALUES ($1, $2, $3, $4)';
  const values = [name, score, total_qes, correct_answers];

  client
    .query(sql, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
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











