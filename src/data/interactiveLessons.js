// Interactive lesson data for practice sections
export const interactiveLessons = {
  'backsolving': {
    practiceSections: [
      {
        title: "Backsolving Practice Test",
        description: "Complete this practice test using backsolving techniques. Answer all 8 questions, then review your results. Remember to start with answer choice B or C and work systematically!",
        isTest: true,
        questions: [
          {
            id: 1,
            text: "If 3x² + 4x = 91, what is the value of x?",
            answers: {
              A: "1.5",
              B: "2",
              C: "2.5",
              D: "3"
            },
            correctAnswer: "C",
            explanation: "Using backsolving: Try each answer choice by substituting into 3x² + 4x = 91. When you test the values systematically, C gives the correct result.",
            hint: "Start with the middle values and substitute into 3x² + 4x = 91."
          },
          {
            id: 2,
            text: "For what value of x is the equation 3.25x + 6 = 5x - 8 true?",
            answers: {
              A: "4",
              B: "6",
              C: "8",
              D: "12"
            },
            correctAnswer: "C",
            explanation: "Try C (x = 8): Left side: 3.25(8) + 6 = 26 + 6 = 32. Right side: 5(8) - 8 = 40 - 8 = 32. They match!",
            hint: "Substitute each answer choice into both sides of the equation to see which makes them equal."
          },
          {
            id: 3,
            text: "The length of a rectangle is 8 inches longer than its width. If the perimeter of the rectangle is 52 inches, what is the width of the rectangle?",
            answers: {
              A: "4",
              B: "9",
              C: "11",
              D: "18"
            },
            correctAnswer: "B",
            explanation: "Try B (width = 9): length = 9 + 8 = 17. Perimeter = 2(9 + 17) = 2(26) = 52 ✓",
            hint: "Remember that perimeter of a rectangle = 2(length + width)."
          },
          {
            id: 4,
            text: "If √3x = 9, what is the value of x?",
            answers: {
              A: "3",
              B: "27",
              C: "81",
              D: "243"
            },
            correctAnswer: "B",
            explanation: "Try B (x = 27): √3(27) = √81 = 9 ✓",
            hint: "Think about what number, when multiplied by 3, gives you a perfect square that equals 81."
          },
          {
            id: 5,
            text: "If 3ˣ = 2187, what is the value of x?",
            answers: {
              A: "5",
              B: "6",
              C: "7",
              D: "9"
            },
            correctAnswer: "C",
            explanation: "Try C (x = 7): 3⁷ = 3×3×3×3×3×3×3 = 2187 ✓",
            hint: "Think about what power of 3 equals 2187. You can work backwards: 2187 ÷ 3 = 729, 729 ÷ 3 = 243, etc."
          },
          {
            id: 6,
            text: "(12x/5) + 2 = (4/10)x. What is the value of x in the equation above?",
            answers: {
              A: "-2",
              B: "-1",
              C: "2",
              D: "5"
            },
            correctAnswer: "B",
            explanation: "Try B (x = -1): Left side: (12×(-1))/5 + 2 = -12/5 + 2 = -2.4 + 2 = -0.4. Right side: (4/10)×(-1) = -0.4. They match! ✓",
            hint: "Substitute each answer choice into both sides of the equation to see which makes them equal."
          },
          {
            id: 7,
            text: "If the area of a rectangle is 16 and one side has a length of 20, what is the width of the rectangle?",
            answers: {
              A: "2/5",
              B: "1/2",
              C: "4/5",
              D: "1"
            },
            correctAnswer: "C",
            explanation: "Try C (width = 4/5): Area = length × width = 20 × (4/5) = 16 ✓",
            hint: "Use the formula Area = length × width. You know Area = 16 and length = 20."
          },
          {
            id: 8,
            text: "150 tickets were sold to a concert. VIP tickets were sold for $10 and normal tickets were sold for $5. If total sales were $1,100. How many of the VIP tickets were sold?",
            answers: {
              A: "65",
              B: "70",
              C: "80",
              D: "90"
            },
            correctAnswer: "B",
            explanation: "Try B (70 VIP tickets): Normal tickets = 150 - 70 = 80. Revenue = 70($10) + 80($5) = $700 + $400 = $1,100 ✓",
            hint: "Calculate the number of normal tickets (150 - VIP tickets), then check if the total revenue equals $1,100."
          }
        ]
      }
    ]
  }
};

export default interactiveLessons;