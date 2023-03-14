# Election Simulator

This project is an Election Simulator that generates candidates and voters, assigns proposals to each candidate, and simulates a voting process. This README file will provide an overview of the project and instructions on how to use it.

## Installation

1. Clone the repository:

~~~
git clone https://github.com/eliasismael/election-simulator
~~~

2. Open the index.html file in your browser.


## Usage

- The Election Simulator allows the user to generate candidates and voters, assign proposals to candidates, and simulate a voting process.
- To create candidates, enter the number of candidates desired in the "Number of Candidates" field and click the "Generate candidates" button.
- To create voters, enter the number of voters desired in the "Number of Voters" field and click the "Generate voters" button.
- To view information about a specific candidate, enter the candidate's number in the "Candidate number" field and click the "Show candidate" button.
- To view information about a specific voter, enter the voter's number in the "Voter number" field and click the "Show voter" button.
- Once candidates and voters have been generated, click the "Vote" button to simulate a voting process.
- After the voting process has been completed, the winner of the election will be displayed, as well as the number of votes received by each candidate.
- You can press the "New vote" button at any time to stop voting and delete the current data

## Code Structure

- proposals.js: contains an array of proposals that the candidates can make.  
- functions.js: contains helper functions for generating proper nouns and DNI from scratch, as well as a function for generating a proposal.  
- index.html: contains the HTML code for the application.  
- style.css: contains the CSS code for the application.  
- main.js: contains the JavaScript code for the application, including the classes for the Candidate and Voter objects, as well as the event listeners for the buttons and forms.  

## Contributing

Contributions are welcome! If you have any suggestions or find any bugs, please open an issue or submit a pull request.
