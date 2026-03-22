const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const toggleLabel = document.querySelector('.toggle-label');
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
  root.setAttribute('data-theme', storedTheme);
  toggleLabel.textContent = storedTheme === 'light' ? 'Light mode' : 'Dark mode';
}

toggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  toggleLabel.textContent = nextTheme === 'light' ? 'Light mode' : 'Dark mode';
});

const quizData = [
  {
    question: 'Where was Sudhanshu born?',
    options: ['Pune', 'Mumbai', 'Nashik', 'Surat'],
    answer: 'Mumbai'
  },
  {
    question: 'What is Sudhanshu’s date of birth?',
    options: ['17 March 2002', '12 June 2001', '17 April 2002', '7 March 2002'],
    answer: '17 March 2002'
  },
  {
    question: 'Which school did he study in until 10th standard?',
    options: ['St. Xavier’s High School', 'Don Bosco School', 'Vinay High School', 'National English School'],
    answer: 'Vinay High School'
  },
  {
    question: 'Where did he complete his HSC?',
    options: ['Kirti M. Doongursee College', 'Ruparel College', 'Somaiya College', 'HR College'],
    answer: 'Kirti M. Doongursee College'
  },
  {
    question: 'In which field did he complete his diploma?',
    options: ['Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics'],
    answer: 'Mechanical Engineering'
  },
  {
    question: 'What degree is he currently completing?',
    options: ['BBA', 'Bachelor’s in Information Technology', 'Bachelor’s in Computer Science', 'MBA'],
    answer: 'Bachelor’s in Computer Science'
  },
  {
    question: 'Which role is he preparing to apply for?',
    options: ['Software Developer', 'Data Analyst', 'IT Sales Executive', 'Graphic Designer'],
    answer: 'IT Sales Executive'
  },
  {
    question: 'What kind of impression does this portfolio aim to create?',
    options: ['Casual and playful only', 'Professional and aesthetic', 'Minimal and silent', 'Technical and academic only'],
    answer: 'Professional and aesthetic'
  },
  {
    question: 'Which quality best reflects his journey?',
    options: ['Resistance to change', 'Growth mindset', 'Lack of focus', 'Preference for routine only'],
    answer: 'Growth mindset'
  },
  {
    question: 'What should visitors ideally feel after exploring the website?',
    options: ['That he is ready to learn and grow', 'That he avoids challenges', 'That he only values marks', 'That he is unsure of his path'],
    answer: 'That he is ready to learn and grow'
  }
];

let currentQuestion = 0;
const userAnswers = new Array(quizData.length).fill(null);
const quizCard = document.getElementById('quizCard');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const quizResult = document.getElementById('quizResult');

function renderQuestion() {
  const item = quizData[currentQuestion];
  progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
  quizCard.innerHTML = `
    <p class="eyebrow">Question ${currentQuestion + 1} / ${quizData.length}</p>
    <h3>${item.question}</h3>
    <div class="quiz-options">
      ${item.options
        .map(
          (option) => `
            <button class="quiz-option ${userAnswers[currentQuestion] === option ? 'active' : ''}" data-option="${option}">
              ${option}
            </button>
          `
        )
        .join('')}
    </div>
  `;

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';

  document.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      userAnswers[currentQuestion] = button.dataset.option;
      renderQuestion();
    });
  });
}

function showResult() {
  const score = userAnswers.reduce((total, answer, index) => {
    return total + (answer === quizData[index].answer ? 1 : 0);
  }, 0);

  progressBar.style.width = '100%';
  quizResult.style.display = 'block';
  quizResult.innerHTML = `You scored <strong>${score}/10</strong>. ${
    score >= 8
      ? 'You really know Sudhanshu well.'
      : score >= 5
      ? 'You know quite a bit, but there is more personality to discover.'
      : 'Time to explore the website once more and get to know him better.'
  }`;
}

prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    quizResult.style.display = 'none';
    renderQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion === quizData.length - 1) {
    showResult();
    return;
  }
  currentQuestion += 1;
  quizResult.style.display = 'none';
  renderQuestion();
});

renderQuestion();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
