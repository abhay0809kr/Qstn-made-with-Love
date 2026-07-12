let student = localStorage.getItem("studentName");

let answers = JSON.parse(localStorage.getItem("answers"));

let score = 0;
let correct = 0;
let wrong = 0;
let notAttempted = 0;

for(let i=0; i<questions.length; i++){

    if(answers[i] == null){

        notAttempted++;

    }

    else if(Number(answers[i]) === questions[i].answer){

        correct++;
        score += 4;

    }

    else{

        wrong++;

    }

}

document.getElementById("student").innerHTML =
"Candidate : " + student;

document.getElementById("score").innerHTML =
"Score : " + score + " / " + (questions.length*4);

document.getElementById("correct").innerHTML =
"✅ Correct Answers : " + correct;

document.getElementById("wrong").innerHTML =
"❌ Wrong Answers : " + wrong;

document.getElementById("percentage").innerHTML =
"📊 Percentage : " +
((score/(questions.length*4))*100).toFixed(2) + "%";

document.getElementById("notAttempted").innerHTML =
"⏭️ Not Attempted : " + notAttempted;