// Initial Data
let currentQuestion = 0;
let correctAnsewrs = 0;

showQuestions();
// Events
document.querySelector('.scoreArea button').addEventListener('click', resetQuiz)

// Functions
function showQuestions() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = (currentQuestion / questions.length) * 100;
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.questionNumber').innerHTML = `Questão ${currentQuestion + 1}`

        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.scoreArea').style.display = 'none';

        document.querySelector('.question').innerHTML = q.question;
        ansewrsHtml = '';
        for (let i in q.options) {
            ansewrsHtml += `<div class="option" data-op="${i}"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = ansewrsHtml;

        document.querySelectorAll('.option').forEach((e) => {
            e.addEventListener('click', itemClickEvent);
        })

    } else {
        finishQuiz();
    }
}

function itemClickEvent(e) {
    let answer = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === answer) {
        correctAnsewrs++;
    }

    currentQuestion++;
    showQuestions();
}

function finishQuiz() {
    document.querySelector('.progress--bar').style.width = `100%`;
    let correctPct = (correctAnsewrs / questions.length) *100;

    if (correctPct < 30 ) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa melhorar!';
        document.querySelector('.scorePct').style.color = '#ff0000';
    } else if (correctPct < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }

    document.querySelector('.scorePct').innerHTML = `${correctPct}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} perguntas e acertou ${correctAnsewrs}`;

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnsewrs = 0;
    showQuestions();
}