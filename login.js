document.getElementById("startBtn").addEventListener("click", function () {

    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("studentName", name);

    window.location.href = "exam.html";

});