CREATE TABLE Grades (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    score DECIMAL,
    total_qes INT,
    correct_answers INT
);