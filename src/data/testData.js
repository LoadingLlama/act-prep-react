// Test passages and questions data
export const passages = {
  1: {
    title: "Passage I",
    content: `Brazilian chef Alex Atala has revolutionized fine dining in São Paulo with his innovative use of native Amazonian ingredients. At his restaurant D.O.M., diners are delighted by unexpected flavors from the rainforest.

Atala sources ingredients such as—manioc root, jambu leaves, and tucumã fruit—directly from indigenous communities in the Amazon. These partnerships not only provide unique flavors but also support local economies.

The chef's approach challenges conventional fine dining by incorporating ingredients that were previously unknown to urban Brazilian palates. His work has earned international recognition and inspired a new generation of Brazilian chefs.`
  },
  2: {
    title: "Passage II",
    content: `The Northern Lights, or Aurora Borealis, create one of nature's most spectacular displays. These ethereal curtains of light dance across polar skies, captivating observers with their otherworldly beauty.

The phenomenon occurs when charged particles from solar wind interact with Earth's magnetic field. As these particles collide with atmospheric gases, they produce the characteristic green, blue, and red glows that illuminate the northern sky.

Indigenous cultures have long attributed spiritual significance to these lights, viewing them as pathways for souls or messages from ancestors. Modern science has revealed the physical processes behind the aurora, but the sense of wonder remains unchanged.`
  }
};

export const questions = [
  {
    id: 1,
    passage: 1,
    chapter: "Punctuation",
    text: "Which choice provides the most effective transition to the information that follows?",
    choices: {
      A: "NO CHANGE",
      B: "ingredients such as—manioc root",
      C: "ingredients such as, manioc root,",
      D: "ingredients: such as manioc root"
    },
    correct: "A"
  },
  {
    id: 2,
    passage: 1,
    chapter: "Punctuation",
    text: "F. NO CHANGE\nG. ingredients such as—manioc root\nH. ingredients such as, manioc root,\nJ. ingredients such as, manioc root,",
    choices: {
      F: "NO CHANGE",
      G: "ingredients such as—manioc root",
      H: "ingredients such as—manioc root",
      J: "ingredients such as, manioc root,"
    },
    correct: "F"
  },
  // Add more questions as needed...
];

export const questionPassages = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  // Map questions to their passages
};