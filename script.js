let questions = JSON.parse(sessionStorage.getItem("quizData")) || [];
let quiz = [];
let current = 0;
let score = 0;
let timer;
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const endSound = document.getElementById("endSound");

function saveQuestion() {
  const q = document.getElementById("question").value.trim();
  const a = document.getElementById("answer").value.trim();
  if (!q || !a) return alert("Please enter both question and answer");
  questions.push({ q, a });
  sessionStorage.setItem("quizData", JSON.stringify(questions));
  alert("Question saved!");
  document.getElementById("question").value = "";
  document.getElementById("answer").value = "";
}

function startQuiz() {
  if (questions.length === 0) return alert("No questions available!");
  quiz = [...questions].sort(() => Math.random() - 0.5);
  document.getElementById("create-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  document.getElementById("result-section").style.display = "none";
  current = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  if (current >= quiz.length) return endQuiz();
  const q = quiz[current];
  document.getElementById("quiz-question").innerText = `Q${current + 1}: ${q.q}`;
  document.getElementById("userAnswer").value = "";
  let time = 10;
  document.getElementById("timer").innerText = `⏳ Time left: ${time}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = `⏳ Time left: ${time}s`;
    if (time <= 0) {
      clearInterval(timer);
      submitAnswer();
    }
  }, 1000);
}

function submitAnswer() {
  clearInterval(timer);
  const userAns = document.getElementById("userAnswer").value.trim().toLowerCase();
  const correct = quiz[current].a.toLowerCase();
  if (userAns === correct) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }
  current++;
  showQuestion();
}

function endQuiz() {
  endSound.play();
  document.getElementById("quiz-section").style.display = "none";
  const result = document.getElementById("result-section");
  result.style.display = "block";
  let html = `<h2>🎉 Quiz Completed!</h2><p>Your Score: ${score} / ${quiz.length}</p>`;
  html += '<h3>Review:</h3><ul>';
  quiz.forEach((q, i) => {
    html += `<li><strong>Q${i + 1}:</strong> ${q.q}<br/><strong>Answer:</strong> ${q.a}</li>`;
  });
  html += '</ul>';
  result.innerHTML = html;
}

// Dark mode toggle
const themeSwitch = document.getElementById("themeSwitch");
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", themeSwitch.checked);
});
