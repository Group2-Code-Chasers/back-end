
"use strict";



const express = require('express');
const server = express();
const PORT =  3000;
const cors = require('cors');
const axios = require('axios')

const APIKey = "6cy3aAAxKRS42r8DdIJrHyIGaLvrRz1AsZKstf2q" ;


require('dotenv').config();
server.use(cors())
server.use(express.json())


const pg = require('pg');
const client = new pg.Client('postgresql://localhost:5432/quiz')



//routes//
server.get('/', homeHandler)
server.get('/choosequiz', chooseQuiz)
server.get('/getAllCategories', getAllCategories)
server.get("/leaderboard", getGrades);
server.post("/grades", addGrade);



server.get("*", (req, res) => {
  res.status(404).send("Sorry, page not found");
});

server.get("*", (req, res) => {
  res.status(500).send({
    status: 500,
    responseText: "Sorry, something went wrong",
  });
});


server.use(errorHandler);





server.get('/', homeHandler)
server.get('/choosequiz', chooseQuiz)
server.get('/getAllCategories', getAllCategories)


function chooseQuiz(req, res) {
  const quizCategory = req.query.category;
  const difficulty = req.query.difficulty;
  const limit = req.query.limit
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





function getAllCategories(req, res) {
  const API_URL = `https://opentdb.com/api_category.php`;
  axios.get(API_URL)
    .then((response) => {
      res.status(200).send(response.data.trivia_categories)

      console.log(response.data)

    })
    .catch(error => {
      res.send(error)
    })

}

// function getAllCategories(req, res) {
//   const API_URL = `https://the-trivia-api.com/v2/categories`;
//   axios.get(API_URL)
//     .then((response) => {
//       res.status(200).send(response.data)

//       console.log(response.data)

//     })
//     .catch(error => {
//       res.send(error)
//     })

// }


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











