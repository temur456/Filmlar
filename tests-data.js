// Listening, Writing va Speaking mazmuni. Yangi savol qo'shish uchun shu faylni tahrirlang.

// ---------- LISTENING ----------
// audio: haqiqiy audio fayl yo'li (masalan "audio/test1.mp3"). Bo'sh bo'lsa, telefonning o'z ovozi o'qiydi.
// gap javoblari: kichik harfda, bo'shliq va belgisiz yozing (tekshiruv ularni e'tiborsiz qoldiradi).
var LISTENING = {
  minutes: 12,
  title: "Booking an evening course",
  audio: "",
  script: [
    { s: "A", text: "Good morning, Riverside Language Centre. How can I help you?" },
    { s: "B", text: "Hello. I'd like to join an evening English course. Could you tell me about the options?" },
    { s: "A", text: "Of course. We have two evening courses. The first is General English, on Mondays and Wednesdays. The second is Exam Preparation, on Tuesdays and Thursdays. Both start at six thirty and finish at eight." },
    { s: "B", text: "I need to prepare for an exam, so the second one sounds right. How much does it cost?" },
    { s: "A", text: "The Exam Preparation course is two hundred and forty dollars for ten weeks. If you pay before the first of March, there's a ten percent discount." },
    { s: "B", text: "That's good. When does the course begin?" },
    { s: "A", text: "The next course begins on the fourteenth of March. Can I take your name and number to book a place?" },
    { s: "B", text: "Yes, my name is Daniel Brooks. That's B, R, O, O, K, S. My phone number is oh seven nine, four four eight, six two one." },
    { s: "A", text: "Thank you, Mr Brooks. Is there anything else you'd like to know?" },
    { s: "B", text: "Yes. Do I need to bring anything to the first lesson?" },
    { s: "A", text: "Just a notebook and a pen. We give you the textbook in class. Please arrive ten minutes early to register." },
    { s: "B", text: "Great. And is there parking?" },
    { s: "A", text: "There's no parking at the centre, but there's a public car park opposite the library, and the bus stop is right outside." },
    { s: "B", text: "Perfect. Thank you very much." },
    { s: "A", text: "You're welcome. See you in March." }
  ],
  questions: [
    { id: 1, type: "mcq", q: "What time do the evening courses finish?",
      options: ["8:00", "7:30", "8:30", "9:00"], answer: 0 },
    { id: 2, type: "mcq", q: "Which course does the caller choose?",
      options: ["General English", "Exam Preparation", "A weekend course", "Private lessons"], answer: 1 },

    { id: 3, type: "gap", q: "The Exam Preparation course is on ______ and Thursdays.", answer: ["tuesday", "tuesdays"] },
    { id: 4, type: "gap", q: "The course costs $ ______ for ten weeks.", answer: ["240"] },
    { id: 5, type: "gap", q: "There is a discount if you pay before ______ March.", answer: ["1", "1st", "first"] },
    { id: 6, type: "gap", q: "The next course begins on ______ March.", answer: ["14", "14th", "fourteenth"] },
    { id: 7, type: "gap", q: "Caller's surname: ______", answer: ["brooks"] },
    { id: 8, type: "gap", q: "Caller's phone number: ______", answer: ["079448621"] },

    { id: 9, type: "mcq", q: "What should the student bring to the first lesson?",
      options: ["A textbook", "A laptop", "A notebook and a pen", "A passport"], answer: 2 },
    { id: 10, type: "mcq", q: "Where can the caller park?",
      options: ["At the centre", "Behind the bus stop", "On the second floor", "Opposite the library"], answer: 3 }
  ]
};

// ---------- WRITING (Task 2) ----------
var WRITING = {
  minutes: 40,
  minWords: 250,      // tavsiya etiladigan so'z soni
  submitWords: 50,    // yuborish uchun eng kam so'z soni
  prompts: [
    "Some people believe that studying abroad is the best way to get a good education, while others think it is better to study in their own country. Discuss both views and give your own opinion.",
    "In many countries, young people spend more and more time on their phones. Do the advantages of this outweigh the disadvantages?",
    "Some people think that the government should pay for public transport, while others believe that passengers should pay the full cost. Discuss both views and give your opinion."
  ]
};

// ---------- SPEAKING ----------
var SPEAKING = {
  questions: [
    { part: "Part 1", q: "Let's talk about your hometown. Where is it, and what do you like about living there?", max: 45 },
    { part: "Part 1", q: "Do you prefer studying in the morning or in the evening? Why?", max: 45 },
    { part: "Part 2", max: 120,
      q: "Describe a person who has helped you to learn something important.",
      cue: ["who this person is", "what they taught you", "how they helped you", "and explain why it was important to you"] }
  ]
};
