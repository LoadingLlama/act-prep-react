/**
 * ACT Prep Test Utilities
 * Shared JavaScript functions for all test components
 */

class ACTTestUtils {
    constructor() {
        this.answers = {};
        this.flaggedQuestions = new Set();
        this.timeSpentPerQuestion = {};
        this.currentQuestion = 1;
        this.totalQuestions = 0;
        this.sectionName = '';
        this.questionStartTime = Date.now();
        this.timerInterval = null;
        this.timeLeft = 0;
    }

    /**
     * Initialize test with section configuration
     */
    initializeTest(config) {
        this.sectionName = config.sectionName;
        this.totalQuestions = config.totalQuestions;
        this.timeLeft = config.duration * 60 * 1000; // Convert minutes to milliseconds
        this.currentQuestion = 1;

        // Load saved data if exists
        this.loadSavedData();

        // Start timer
        this.startTimer();

        // Initialize UI
        this.updateQuestionCounter();
        this.updateNavigationButtons();

        console.log(`${this.sectionName} test initialized with ${this.totalQuestions} questions`);
    }

    /**
     * Load saved test data from localStorage
     */
    loadSavedData() {
        const storageKey = `${this.sectionName.toLowerCase()}TestData`;
        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.answers = data.answers || {};
                this.flaggedQuestions = new Set(data.flaggedQuestions || []);
                this.timeSpentPerQuestion = data.timeSpentPerQuestion || {};
                this.currentQuestion = data.currentQuestion || 1;
                console.log(`Loaded saved ${this.sectionName} test data`);
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }

    /**
     * Save test data to localStorage
     */
    saveTestData() {
        const storageKey = `${this.sectionName.toLowerCase()}TestData`;
        const dataToSave = {
            answers: this.answers,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            timeSpentPerQuestion: this.timeSpentPerQuestion,
            currentQuestion: this.currentQuestion,
            lastSaved: Date.now()
        };

        try {
            localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving test data:', error);
        }
    }

    /**
     * Save final test results
     */
    saveTestResults() {
        const resultsKey = `${this.sectionName.toLowerCase()}TestResults`;
        const results = {
            answers: this.answers,
            timeSpentPerQuestion: this.timeSpentPerQuestion,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            completedAt: Date.now(),
            sectionName: this.sectionName,
            totalQuestions: this.totalQuestions
        };

        try {
            localStorage.setItem(resultsKey, JSON.stringify(results));
            console.log(`${this.sectionName} test results saved successfully`);
        } catch (error) {
            console.error('Error saving test results:', error);
        }
    }

    /**
     * Record time spent on current question and move to next
     */
    recordQuestionTime() {
        const timeSpent = Date.now() - this.questionStartTime;
        const questionKey = `q${this.currentQuestion}`;
        this.timeSpentPerQuestion[questionKey] = timeSpent;
        this.questionStartTime = Date.now();
    }

    /**
     * Navigate to specific question
     */
    goToQuestion(questionNum) {
        if (questionNum < 1 || questionNum > this.totalQuestions) return;

        // Record time for current question
        this.recordQuestionTime();

        // Hide current question
        const currentQ = document.querySelector('.question.active');
        if (currentQ) currentQ.classList.remove('active');

        // Show target question
        this.currentQuestion = questionNum;
        const targetQ = document.getElementById(`question${questionNum}`);
        if (targetQ) targetQ.classList.add('active');

        // Update UI
        this.updateQuestionCounter();
        this.updateNavigationButtons();
        this.updateFlagButton();

        // Save progress
        this.saveTestData();
    }

    /**
     * Go to next question
     */
    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.goToQuestion(this.currentQuestion + 1);
        }
    }

    /**
     * Go to previous question
     */
    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.goToQuestion(this.currentQuestion - 1);
        }
    }

    /**
     * Record answer for current question
     */
    recordAnswer(answer) {
        const questionKey = `q${this.currentQuestion}`;
        this.answers[questionKey] = {
            answer: answer,
            timestamp: Date.now()
        };

        // Update UI to show selection
        document.querySelectorAll('.choice').forEach(choice => {
            choice.classList.remove('selected');
        });

        const selectedChoice = document.querySelector(`[data-choice="${answer}"]`);
        if (selectedChoice) {
            selectedChoice.classList.add('selected');
        }

        // Save progress
        this.saveTestData();

        console.log(`Answer recorded for question ${this.currentQuestion}: ${answer}`);
    }

    /**
     * Toggle flag on current question
     */
    toggleFlag() {
        const questionKey = `q${this.currentQuestion}`;

        if (this.flaggedQuestions.has(questionKey)) {
            this.flaggedQuestions.delete(questionKey);
        } else {
            this.flaggedQuestions.add(questionKey);
        }

        this.updateFlagButton();
        this.saveTestData();
    }

    /**
     * Update flag button appearance
     */
    updateFlagButton() {
        const flagBtn = document.getElementById('flagBtn');
        const questionKey = `q${this.currentQuestion}`;

        if (flagBtn) {
            if (this.flaggedQuestions.has(questionKey)) {
                flagBtn.classList.add('flagged');
            } else {
                flagBtn.classList.remove('flagged');
            }
        }
    }

    /**
     * Update question counter display
     */
    updateQuestionCounter() {
        const counter = document.getElementById('questionCounter');
        const itemNumber = document.getElementById('itemNumber');

        if (counter) {
            counter.textContent = `${this.currentQuestion} of ${this.totalQuestions}`;
        }

        if (itemNumber) {
            itemNumber.textContent = `Item ${this.currentQuestion}`;
        }
    }

    /**
     * Update navigation button states
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 1;
        }

        if (nextBtn) {
            if (this.currentQuestion === this.totalQuestions) {
                nextBtn.textContent = this.getEndButtonText();
                nextBtn.onclick = () => this.endSection();
            } else {
                nextBtn.textContent = 'Next →';
                nextBtn.onclick = () => this.nextQuestion();
            }
            nextBtn.disabled = false;
        }
    }

    /**
     * Get appropriate end button text based on section
     */
    getEndButtonText() {
        const sectionEndings = {
            'English': 'End English → Math',
            'Math': 'End Math → Reading',
            'Reading': 'End Reading → Science',
            'Science': 'Complete Test'
        };

        return sectionEndings[this.sectionName] || 'Complete Section';
    }

    /**
     * Get next section file name
     */
    getNextSectionFile() {
        const nextSections = {
            'English': 'math-test.html',
            'Math': 'reading-test.html',
            'Reading': 'science-test.html',
            'Science': 'analytics.html'
        };

        return nextSections[this.sectionName] || 'analytics.html';
    }

    /**
     * Start section timer
     */
    startTimer() {
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeLeft -= 1000;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    /**
     * Update timer display
     */
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        if (!timerElement) return;

        const minutes = Math.floor(this.timeLeft / 60000);
        const seconds = Math.floor((this.timeLeft % 60000) / 1000);

        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Add warning classes
        timerElement.classList.remove('warning', 'danger');
        if (this.timeLeft <= 300000) { // 5 minutes
            timerElement.classList.add('danger');
        } else if (this.timeLeft <= 600000) { // 10 minutes
            timerElement.classList.add('warning');
        }
    }

    /**
     * Handle time up
     */
    timeUp() {
        clearInterval(this.timerInterval);
        alert('Time is up! The test will now end.');
        this.endSection();
    }

    /**
     * End current section
     */
    endSection() {
        // Record final question time
        this.recordQuestionTime();

        // Save final results
        this.saveTestResults();

        // Clear interval
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Navigate to next section
        const nextFile = this.getNextSectionFile();
        console.log(`${this.sectionName} section completed. Moving to: ${nextFile}`);

        window.location.href = nextFile;
    }

    /**
     * Show question modal/index
     */
    showQuestionModal() {
        const modal = document.getElementById('questionModal');
        if (modal) {
            modal.style.display = 'block';
            this.generateQuestionGrid();
        }
    }

    /**
     * Close question modal
     */
    closeQuestionModal() {
        const modal = document.getElementById('questionModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Generate question grid for modal
     */
    generateQuestionGrid() {
        const grid = document.getElementById('questionGrid');
        if (!grid) return;

        grid.innerHTML = '';

        for (let i = 1; i <= this.totalQuestions; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'question-bubble';
            bubble.textContent = i;

            const questionKey = `q${i}`;

            // Set status class
            if (this.answers[questionKey]) {
                bubble.classList.add('answered');
            } else {
                bubble.classList.add('unanswered');
            }

            if (this.flaggedQuestions.has(questionKey)) {
                bubble.classList.add('flagged');
            }

            if (i === this.currentQuestion) {
                bubble.classList.add('current');
            }

            bubble.onclick = () => {
                this.goToQuestion(i);
                this.closeQuestionModal();
            };

            grid.appendChild(bubble);
        }
    }

    /**
     * Format time for display
     */
    static formatTime(ms) {
        if (!ms || ms === 0) return '0s';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
    }

    /**
     * Initialize choice event listeners
     */
    initializeChoiceListeners() {
        document.querySelectorAll('.choice').forEach(choice => {
            choice.addEventListener('click', () => {
                const answer = choice.getAttribute('data-choice');
                if (answer) {
                    this.recordAnswer(answer);
                }
            });
        });
    }

    /**
     * Restore selected answers when navigating between questions
     */
    restoreSelectedAnswer() {
        const questionKey = `q${this.currentQuestion}`;
        const savedAnswer = this.answers[questionKey];

        if (savedAnswer) {
            const selectedChoice = document.querySelector(`[data-choice="${savedAnswer.answer}"]`);
            if (selectedChoice) {
                selectedChoice.classList.add('selected');
            }
        }
    }

    /**
     * Add keyboard navigation
     */
    initializeKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Prevent navigation if typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousQuestion();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextQuestion();
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFlag();
                    break;
                case ' ':
                    e.preventDefault();
                    this.showQuestionModal();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeQuestionModal();
                    break;
            }
        });
    }

    /**
     * Handle page visibility changes (detect tab switching)
     */
    initializeVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Page became visible again - save current state
                this.saveTestData();
            }
        });
    }

    /**
     * Auto-save functionality
     */
    initializeAutoSave() {
        // Save every 30 seconds
        setInterval(() => {
            this.saveTestData();
        }, 30000);

        // Save when page is about to unload
        window.addEventListener('beforeunload', () => {
            this.saveTestData();
        });
    }

    /**
     * Complete test setup
     */
    setupTest(config) {
        this.initializeTest(config);
        this.initializeChoiceListeners();
        this.initializeKeyboardNavigation();
        this.initializeVisibilityHandler();
        this.initializeAutoSave();

        // Show first question
        this.goToQuestion(this.currentQuestion);

        console.log(`${this.sectionName} test fully initialized`);
    }
}

// Global utility functions
window.ACTTestUtils = ACTTestUtils;

// Analytics utilities
class ACTAnalytics {
    static collectAllTestResults() {
        const sections = ['english', 'math', 'reading', 'science'];
        const allResults = {};

        sections.forEach(section => {
            const key = `${section}TestResults`;
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    allResults[section] = JSON.parse(data);
                } catch (error) {
                    console.error(`Error parsing ${section} results:`, error);
                }
            }
        });

        return allResults;
    }

    static calculateOverallStats(allResults) {
        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalTime = 0;

        Object.values(allResults).forEach(sectionResult => {
            totalQuestions += sectionResult.totalQuestions || 0;
            // Add calculation logic for correct answers when answer keys are available
            Object.values(sectionResult.timeSpentPerQuestion || {}).forEach(time => {
                totalTime += time;
            });
        });

        return {
            totalQuestions,
            totalCorrect,
            totalTime,
            accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
        };
    }

    static clearAllTestData() {
        const keys = [
            'englishTestData', 'mathTestData', 'readingTestData', 'scienceTestData',
            'englishTestResults', 'mathTestResults', 'readingTestResults', 'scienceTestResults'
        ];

        keys.forEach(key => localStorage.removeItem(key));
        console.log('All test data cleared');
    }
}

window.ACTAnalytics = ACTAnalytics;