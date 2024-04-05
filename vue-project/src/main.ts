import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import * as diagnostics_channel from "diagnostics_channel";


createApp(App).mount('#app')



type SubscaffoldingQuestion = {
    number: string;
    question: string;
    answer: string;
};

type ScaffoldingQuestion = {
    number: string;
    question: string;
    answer: string;
    subscaffolding_questions: SubscaffoldingQuestion[];
};

type ProblemObject = {
    problem: string;
    scaffolding_questions: ScaffoldingQuestion[];
};

const testObj: ProblemObject = {
    problem: "Original problem text",
    scaffolding_questions: [
        {
            number: "1",
            question: "Scaffolding question 1 text",
            answer: "Answer to scaffolding question 1",
            subscaffolding_questions: [
                {
                    number: "1.1",
                    question: "Subscaffolding question 1.1 text",
                    answer: "Answer to subscaffolding question 1"
                },
                {
                    number: "1.2",
                    question: "Subscaffolding question 1.2 text",
                    answer: "Answer to subscaffolding question 2"
                }
                // Add more subscaffolding questions here as needed
            ]
        },
        {
            number: "2",
            question: "Scaffolding question 2 text",
            answer: "Answer to scaffolding question 2",
            subscaffolding_questions: [
                {
                    number: "2.1",
                    question: "Subscaffolding question 2.1 text",
                    answer: "Answer to subscaffolding question 2"
                },
                {
                    number: "2.2",
                    question: "Subscaffolding question 2.2 text",
                    answer: "Answer to subscaffolding question 2"
                }
                // Add more subscaffolding questions here as needed
            ]
        }
        // Add more scaffolding questions here as needed
    ]
};


async function processQuestion(originalQuestion: ProblemObject) {
    const container = document.getElementById('response-area');
    const problem = document.createElement('div');
    const scaffolding_questions = originalQuestion.scaffolding_questions;
    console.log(scaffolding_questions);
    problem.classList.add('response-entry');
    problem.innerText = originalQuestion.problem;
    // @ts-ignore
    container.appendChild(problem);

    for (let i = 0; i < originalQuestion.scaffolding_questions.length; i++) {
        const problem = document.createElement('div');
        const problemString = originalQuestion.scaffolding_questions[i].number + ":\n" +originalQuestion.scaffolding_questions[i].question
        problem.classList.add('response-entry');
        problem.innerText = problemString;
        // @ts-ignore
        container.appendChild(problem);
        const userAnswer = await answerQuestion(originalQuestion.scaffolding_questions[i].answer);
        if (userAnswer === originalQuestion.scaffolding_questions[i].answer) {
            const correct = document.createElement('div');
            correct.classList.add('response-entry');
            correct.innerText = "Correct";
            // @ts-ignore
            container.appendChild(correct);
            break;
        } else {
            for (let j = 0; j < originalQuestion.scaffolding_questions[i].subscaffolding_questions.length; j++) {
                const problem = document.createElement('div');
                const problemString = originalQuestion.scaffolding_questions[i].subscaffolding_questions[j].number + ":\n" +originalQuestion.scaffolding_questions[i].subscaffolding_questions[j].question
                problem.classList.add('response-entry');
                problem.innerText = problemString;
                // @ts-ignore
                container.appendChild(problem);
                const userAnswer_sub = await answerQuestion(originalQuestion.scaffolding_questions[i].answer);
                if (userAnswer_sub === originalQuestion.scaffolding_questions[i].subscaffolding_questions[j].answer) {
                    const correct = document.createElement('div');
                    correct.classList.add('response-entry');
                    correct.innerText = "Correct";
                    // @ts-ignore
                    container.appendChild(correct);
                    break;
                }
            }
        }
    }
}



// @ts-ignore
// MAKE AWAIT FUNCTION AND PASS IN TW O STRINGS, STUDENT ANSWER AND THEN PROBLEM ANSWER
function answerQuestion(problem_answer: String): Promise<string> {
    const textarea = document.getElementById('text-box') as HTMLTextAreaElement;
    const button = document.getElementById('submit-button') as HTMLButtonElement;
    return new Promise(resolve => {
        button.onclick = () => {
            resolve(textarea.value);
        }
    })

}

processQuestion(testObj);









