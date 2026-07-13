import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
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

loadResponses();

async function loadResponses(){

    const querySnapshot = await getDocs(collection(db,"responses"));

    const table = document.getElementById("tableBody");

    table.innerHTML = "";

    querySnapshot.forEach((doc)=>{

        let data = doc.data();

        table.innerHTML += `
        <tr>

            <td>${data.candidate}</td>

            <td>${data.score}</td>

            <td>${data.correct}</td>

            <td>${data.wrong}</td>

            <td>${data.notAttempted}</td>

            <td>${
    data.submittedAt
        ? data.submittedAt.toDate().toLocaleString()
        : "N/A"
}</td>

            <td>
    <button onclick="viewResponse('${doc.id}')">
        👁 View
    </button>
</td>

        </tr>
        `;

    });

}
window.viewResponse = async function(id){

    alert("View clicked!\n\nDocument ID:\n" + id);

}