// Sample questions for each category
const questions = {
    terms: [
        {
            question: "What is a project?",
            options: ["Temporary endeavor", "Ongoing operation", "Random task"],
            answer: "Temporary endeavor"
        },
        {
            question: "Define 'portfolio'.",
            options: ["Group of projects", "Individual project", "Financial statement"],
            answer: "Group of projects"
        },
        {
            question: "What is the role of a project manager?",
            options: ["To lead the project team", "To control the organization", "To manage business operations"],
            answer: "To lead the project team"
        },
        {
            question: "What is the difference between a project and a program?",
            options: ["A project is part of a program", "A program is part of a project", "They are the same"],
            answer: "A project is part of a program"
        },
        {
            question: "Which document defines project scope, objectives, and participants?",
            options: ["Project charter", "Project plan", "Contract"],
            answer: "Project charter"
        }
    ],
    principles: [
        {
            question: "What is a key project management principle?",
            options: ["Be a diligent, respectful, and caring steward", "Maximize profit", "Focus on speed"],
            answer: "Be a diligent, respectful, and caring steward"
        },
        {
            question: "Which principle promotes stakeholder engagement?",
            options: ["Effectively engage with stakeholders", "Create a project environment", "Reduce risk"],
            answer: "Effectively engage with stakeholders"
        },
        {
            question: "Which principle encourages project teams to focus on value?",
            options: ["Focus on value", "Optimize risk", "Tailor based on context"],
            answer: "Focus on value"
        },
        {
            question: "What principle emphasizes leadership within project management?",
            options: ["Demonstrate leadership behaviors", "Build quality into processes", "Navigate complexity"],
            answer: "Demonstrate leadership behaviors"
        },
        {
            question: "Which principle encourages adaptability in projects?",
            options: ["Embrace adaptability and resiliency", "Effectively engage with stakeholders", "Focus on speed"],
            answer: "Embrace adaptability and resiliency"
        }
    ],
    domains: [
        {
            question: "What is the focus of the stakeholder performance domain?",
            options: ["Team management", "Risk assessment", "Stakeholder engagement"],
            answer: "Stakeholder engagement"
        },
        {
            question: "Which domain deals with measuring outcomes?",
            options: ["Measurement", "Planning", "Team"],
            answer: "Measurement"
        },
        {
            question: "What is the primary focus of the planning performance domain?",
            options: ["To define how the project will be completed", "To control resources", "To assign tasks"],
            answer: "To define how the project will be completed"
        },
        {
            question: "Which domain focuses on the effective coordination of the project team?",
            options: ["Team Performance", "Planning", "Uncertainty"],
            answer: "Team Performance"
        },
        {
            question: "Which performance domain emphasizes managing uncertainty?",
            options: ["Uncertainty", "Measurement", "Team Performance"],
            answer: "Uncertainty"
        }
    ]
};

let currentQuestion = null;
let selectedCategory = "terms";
let reviewMode = false; // Keeps track of whether you're reviewing incorrect answers
let incorrectQuestions = JSON.parse(localStorage.getItem('incorrectQuestions')) || {};

// Function to load a random question from the selected category
function loadQuestion() {
    if (reviewMode) {
        loadReviewQuestion();
        return;
    }
    
    selectedCategory = document.getElementById("category").value;
    const categoryQuestions = questions[selectedCategory];
    currentQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    
    displayQuestion(currentQuestion);
}

// Function to display the question and options
function displayQuestion(questionObj) {
    document.getElementById("question").innerText = questionObj.question;
    document.getElementById("options").innerHTML = questionObj.options.map(option => 
        `<label><input type="radio" name="option" value="${option}"> ${option}</label><br>`
    ).join("");
    
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("next-button").style.display = "none"; // Hide Next button initially
}

// Function to load a question from the incorrect answers list for review
function loadReviewQuestion() {
    const allIncorrect = incorrectQuestions[selectedCategory] || [];
    if (allIncorrect.length > 0) {
        currentQuestion = allIncorrect[Math.floor(Math.random() * allIncorrect.length)];
        displayQuestion(currentQuestion);
    } else {
        alert("No incorrect answers to review for this category.");
    }
}

// Function to check if the selected answer is correct
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }
    
    const isCorrect = selectedOption.value === currentQuestion.answer;
    document.getElementById("result").innerHTML = isCorrect ? "Correct!" : "Incorrect, try again.";
    
    // Show Next Question button after answering
    document.getElementById("next-button").style.display = "inline-block";
    
    // If the answer is incorrect, store it for future review
    if (!isCorrect) {
        storeIncorrectAnswer(selectedCategory, currentQuestion);
    }
}

// Store incorrect questions in localStorage
function storeIncorrectAnswer(category, questionObj) {
    if (!incorrectQuestions[category]) {
        incorrectQuestions[category] = [];
    }

    // Only store if it's not already stored
    if (!incorrectQuestions[category].some(q => q.question === questionObj.question)) {
        incorrectQuestions[category].push(questionObj);
        localStorage.setItem('incorrectQuestions', JSON.stringify(incorrectQuestions));
    }
}

// Review incorrect answers
function reviewIncorrect() {
    reviewMode = true;
    selectedCategory = document.getElementById("category").value;
    loadQuestion();
}
