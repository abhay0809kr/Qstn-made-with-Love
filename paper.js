const paper = document.getElementById("paper");

let html = "";

html += `
<div class="page">

<div class="header">
<h1>QSTN MADE WITH LOVE ❤️</h1>
<h2>NEET MOCK TEST</h2>
</div>

<div class="info">
<div>Candidate Name : ________________________</div>
<div>Time : 90 Minutes</div>
</div>

<div class="info">
<div>Roll No : ________________________</div>
<div>Marks : 120</div>
</div>

<div class="line"></div>

<div class="content">
`;

for(let i = 0; i < questions.length; i++){

    let q = questions[i];

    html += `

    <div class="questionCard">

        <div class="questionLeft">

            <strong>Q${i+1}. ${q.question}</strong>

            <div class="option">○ A. ${q.options[0]}</div>

            <div class="option">○ B. ${q.options[1]}</div>

            <div class="option">○ C. ${q.options[2]}</div>

            <div class="option">○ D. ${q.options[3]}</div>

        </div>

        <div class="questionRight">

            <div class="qno">Q${i+1}</div>

            <div class="labels">

                <span>A</span>

                <span>B</span>

                <span>C</span>

                <span>D</span>

            </div>

            <div class="bubbles">

                <span>◯</span>

                <span>◯</span>

                <span>◯</span>

                <span>◯</span>

            </div>

        </div>

    </div>

    `;

}

html += `
</div>

</div>
`;

paper.innerHTML = html;