DROP TABLE IF EXISTS grades;

CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    numQuestions INT,
    numCorrectAnswers INT,
    numUnanswered INT,
    score DECIMAL
);