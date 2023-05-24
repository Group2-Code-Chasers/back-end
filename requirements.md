Software Requirements:


Vision: 

A: What is the vision of this product?

The vision of our project is to provide an interactive platform
for user to test his knowledge in programming languages such as: SQL, Linux, Docker and more, improve their skills, and track his progress in a fun and educational manner.

B: What pain point does this project solve?

This project aims to solve several pain points:
1.find sufficient opportunities to practice programmers coding skills: This app provides a platform where they can regularly engage in quizzes that challenge their knowledge and help them improve.
 
2.Accessibility and Convenience: 
Traditional programming quizzes often require physical presence or specific time constraints, limiting accessibility and convenience. This web app provides a flexible and accessible solution that users can access anytime, anywhere, as long as they have an internet connection.


C: Why should we care about your product?

You should care about this product because of:
Learning and Skill Development in a fun way with app's online nature allows users to access quizzes for physical presence or specific schedules. It fits well into busy lifestyles and accommodates diverse learning preferences.


Scope (In/Out):

IN - What will your product do:
1.Quiz Selection: The web application will allow users to choose quiz categories from a selection provided by an API. Users can browse different tech quiz categories such as programming languages, Linux, DevOps and more.
2.Quiz Taking: Once a category is chosen, users will be presented with a set of questions from the selected category. They can answer the questions one by one and submit their answers.
3.Scoring: The web app will calculate the user's score. The total score will be viewed after submitting the Quiz
4.Data will be stored in the database and we will have a leaderboard.

OUT - What will your product not do:
User Authentication: The application will not include registration.


Minimum Viable Product(MVP):

A:What will your MVP functionality be?

1.User name  registration: Implement a simple user registration  where users can enter their names and complete to get thier result saved in database with thier names.
2.Quiz Creation: Provide functionality for creating quizzes. This includes allowing users to define questions, provide multiple-choice options, and set correct answers.
3.Quiz Taking: Enable users to select a quiz and take it. Display each question with the available options and allow users to submit their answers.
4.Scoring and Results: Calculate the score based on the user's answers , Display the final score at the end of the quiz.
good Design and User Interface: Implement a simple and intuitive user interface (UI) design that allows users to navigate through the app and take quizzes easily.


B:What are your stretch goals?

Users can retry the quiz and raise their scores.


Functional Requirements:

1.Users can access the available categories of quizzes on the home page.
2.Category Selection: Users can choose a category from the home page to generate a quiz from that particular category.
3.Quiz Interaction: Users can answer the quiz questions, navigate to the next question, and submit the quiz once they have finished answering.
4.Quiz Results: After submitting the quiz, the system will display the score, the number of questions, and the number of correct answers. These results will be added to the page that displays previous quizzes taken.

Data Flow:

The data flow in the application begins with the user accessing the home page where they can view the available categories of quizzes. Upon selecting a category, the system generates a quiz based on that category by retrieving and processing relevant quiz questions. The user can then interact with the quiz, answering questions. Once the user completes the quiz, they can submit it, and the system evaluates the submitted quiz, calculates the score, and displays the results including the number of questions attempted and the number of correct answers. These quiz results are then added to the user's quiz history. Throughout the process, the system handles the flow of data, ensuring the smooth interaction between the user and the quiz content.


Non-Functional Requirements:

1.Usability: The application has a user-friendly interface, allowing users to easily navigate through the categories, generate quizzes, answer questions, and view their quiz results.

2.Performance: The system provides a responsive and efficient user experience, ensuring quick generation of quizzes, smooth navigation to next questions, and prompt submission and display of quiz results.



