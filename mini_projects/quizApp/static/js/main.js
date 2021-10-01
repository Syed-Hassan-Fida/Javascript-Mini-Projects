const quizData = [
    {
        question: 'How old are you ?',
        a: '10', b: '20', c: '30', d: '54', correct: 'c',
    }, {
        question: 'What is the most used programming languages ?',
        a: 'Java', b: 'Python', c: 'C++', d: 'JacaScript', correct: 'd',
    }, {
        question: 'Who is the President of US ?',
        a: 'Florin Pop', b: 'Donald Trump', c: 'Ivan Saldano', d: 'Mihai Andrei', correct: 'b',
    }, {
        question: 'HTML stand for ?',
        a: 'Hypertext Markup Language', b: 'English language', c: 'Hyper Language', d: 'Hyper Tension', correct: 'a',
    }, {
        question: 'When JavaScript lanunched ?',
        a: '2020', b: '2019', c: '2018', d: 'None', correct: 'd',
    } 
] 

const questionEl = document.getElementById("question");
const a_textEl = document.getElementById("a_text");
const b_textEl = document.getElementById("b_text");
const c_textEl = document.getElementById("c_text");
const d_textEl = document.getElementById("d_text");
const submitEl = document.getElementById("submit");
const quizEl = document.getElementById("quiz");
const answerEl = document.querySelectorAll(".answer");


let currentQuiz = 0;
let score = 0;

function loadQuiz(){
    deSelectAnswer();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_textEl.innerHTML = currentQuizData.a;
    b_textEl.innerHTML = currentQuizData.b;
    c_textEl.innerHTML = currentQuizData.c;
    d_textEl.innerHTML = currentQuizData.d;
    //currentQuiz++;
} 

function getSelected(){
    let answer = undefined;
    answerEl.forEach((answerEls) => {
        if(answerEls.checked){
            answer = answerEls.id;
        }
    });

    return answer;
}

function deSelectAnswer(){
    answerEl.forEach((answerEls) => {
        answerEls.checked = false;
    });
}

next.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        currentQuiz++;
        if(currentQuiz < quizData.length){
            loadQuiz();
        } else {
            //show results
            quizEl.innerHTML = `<h1>Quiz Ended</h1><h2>You 
            answered correctely at ${score}/${quizData.length} 
            questions.</h2>
            <button onclick="location.reload()">Reload</button>`;
            //alert(score);
        }
    }
}) ;

loadQuiz();