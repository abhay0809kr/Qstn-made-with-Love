import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const firebaseConfig = {

apiKey: "AIzaSyBk_pqsoq35fuS8dp2TNPM7sXzf6oBewfU",

authDomain: "qstn-made-with-love.firebaseapp.com",

projectId: "qstn-made-with-love",

storageBucket: "qstn-made-with-love.firebasestorage.app",

messagingSenderId: "107602697659",

appId: "1:107602697659:web:8a48260bba48b636bdb89e"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let review = new Array(questions.length).fill(false);
let visited = new Array(questions.length).fill(false);

document.getElementById("candidate").innerHTML =
"Candidate : " + localStorage.getItem("studentName");
let totalSeconds = 90 * 60;

startTimer();

function startTimer(){

    let timer = setInterval(function(){

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        document.getElementById("timer").innerHTML =
            String(minutes).padStart(2,'0') + ":" +
            String(seconds).padStart(2,'0');

        totalSeconds--;

        if(totalSeconds < 0){

            clearInterval(timer);

            alert("Time is Over!");

            submitExam();

        }

    },1000);

}

loadQuestion();

function loadQuestion(){
visited[currentQuestion] = true;
let q = questions[currentQuestion];

document.getElementById("questionNumber").innerHTML =
"Question " + (currentQuestion+1);

document.getElementById("questionText").innerHTML =
q.question;

document.getElementById("op1").innerHTML =
q.options[0];

document.getElementById("op2").innerHTML =
q.options[1];

document.getElementById("op3").innerHTML =
q.options[2];

document.getElementById("op4").innerHTML =
q.options[3];

document.querySelectorAll("input[name='option']").forEach(radio => {

    radio.checked = false;

});

if(answers[currentQuestion] !== null){

    document.querySelector(
        "input[value='" + answers[currentQuestion] + "']"
    ).checked = true;

}
createPalette();

}
document.getElementById("nextBtn").addEventListener("click", function () {

    let selected = document.querySelector("input[name='option']:checked");

    if(selected){

        answers[currentQuestion] = selected.value;

    }

    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        loadQuestion();

    }

});

document.getElementById("prevBtn").addEventListener("click", function () {

    let selected = document.querySelector("input[name='option']:checked");

    if(selected){

        answers[currentQuestion] = selected.value;

    }

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});
function createPalette(){

    let palette = document.getElementById("numbers");

    palette.innerHTML="";

    for(let i=0;i<questions.length;i++){

        let btn=document.createElement("button");

        btn.innerHTML=i+1;

        btn.className="qbtn";

        if(review[i]){

            btn.style.background="#8b5cf6";
            btn.style.color="white";

        }

        else if(answers[i]!=null){

            btn.style.background="#22c55e";
            btn.style.color="white";

        }

        else if(visited[i]){

            btn.style.background="#ef4444";
            btn.style.color="white";

        }

        else{

            btn.style.background="white";
            btn.style.color="black";

        }

        if(i==currentQuestion){

            btn.style.border="3px solid blue";

        }

        btn.onclick=function(){

            let selected=document.querySelector("input[name='option']:checked");

            if(selected){

                answers[currentQuestion]=selected.value;

            }

            currentQuestion=i;

            loadQuestion();

        }

        palette.appendChild(btn);

    }

}
document.getElementById("reviewBtn").addEventListener("click",function(){

    let selected=document.querySelector("input[name='option']:checked");

    if(selected){

        answers[currentQuestion]=selected.value;

    }

    review[currentQuestion]=true;

    if(currentQuestion<questions.length-1){

        currentQuestion++;

        loadQuestion();

    }

});
async function submitExam(){

    let selected =
    document.querySelector("input[name='option']:checked");

    if(selected){

        answers[currentQuestion] = selected.value;

    }

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let notAttempted = 0;

    for(let i=0;i<questions.length;i++){

        if(answers[i]==null){

            notAttempted++;

        }

        else if(Number(answers[i])===questions[i].answer){

            correct++;

            score += 4;

        }

        else{

            wrong++;

        }

    }

   try{

    await addDoc(collection(db,"responses"),{

        candidate: localStorage.getItem("studentName"),
        answers: answers,
        score: score,
        correct: correct,
        wrong: wrong,
        notAttempted: notAttempted,
        submittedAt: new Date()

    });

    localStorage.setItem(
        "answers",
        JSON.stringify(answers)
    );

    window.location.href="thankyou.html";

}
catch(error){

    console.log(error);
    alert("Failed to save response.");

}

document.querySelector(".submit").addEventListener("click", showSummary);

function showSummary(){

    let answered = 0;
    let notAnswered = 0;
    let reviewCount = 0;
    let notVisited = 0;

    for(let i=0;i<questions.length;i++){

        if(!visited[i]){

            notVisited++;

        }

        else if(review[i]){

            reviewCount++;

        }

        else if(answers[i]!=null){

            answered++;

        }

        else{

            notAnswered++;

        }

    }

    let message =
`📋 TEST SUMMARY

✅ Answered : ${answered}

❌ Not Answered : ${notAnswered}

🟣 Marked for Review : ${reviewCount}

⚪ Not Visited : ${notVisited}

---------------------------------

Submit the test?`;

    if(confirm(message)){

        submitExam();

    }

}