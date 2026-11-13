// Listening, Writing va Speaking mazmuni. Yangi savol qo'shish uchun shu faylni tahrirlang.

// ---------- LISTENING ----------
// audio: haqiqiy audio fayl yo'li (masalan "audio/test1.mp3"). Bo'sh bo'lsa, telefonning o'z ovozi o'qiydi.
// gap javoblari: kichik harfda, bo'shliq va belgisiz yozing (tekshiruv ularni e'tiborsiz qoldiradi).
var LISTENING = {
  id: "l1",
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
    "Some people think that the government should pay for public transport, while others believe that passengers should pay the full cost. Discuss both views and give your opinion.",
    "Some people think that children should start learning a foreign language at primary school, while others believe it is better to start later. Discuss both views and give your opinion.",
    "More and more people are choosing to work from home. Do the advantages of this trend outweigh the disadvantages?",
    "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?",
    "In many cities, traffic and pollution are growing problems. What are the main causes, and what solutions can you suggest?"
  ]
};

// ---------- SPEAKING ----------
var SPEAKING = {
  id: "s1",
  questions: [
    { part: "Part 1", q: "Let's talk about your hometown. Where is it, and what do you like about living there?", max: 45 },
    { part: "Part 1", q: "Do you prefer studying in the morning or in the evening? Why?", max: 45 },
    { part: "Part 2", max: 120,
      q: "Describe a person who has helped you to learn something important.",
      cue: ["who this person is", "what they taught you", "how they helped you", "and explain why it was important to you"] }
  ]
};

var LISTENING_SETS = [
  LISTENING,
  {
    id: "l2",
    minutes: 12,
    title: "Joining the city library",
    audio: "",
    script: [
      { s: "A", text: "Good afternoon. City Library. Can I help you?" },
      { s: "B", text: "Hi. I'd like to join the library, please. I'm a university student." },
      { s: "A", text: "Of course. Membership is free for students. You just need to show your student card. A passport isn't necessary. We're open from nine in the morning until eight in the evening on weekdays, and until five on Saturdays." },
      { s: "B", text: "Great. How many books can I borrow?" },
      { s: "A", text: "Up to six books at a time, and you can keep them for three weeks. If you return a book late, the fine is fifty cents a day." },
      { s: "B", text: "That's fine. And I'd like to know about study rooms." },
      { s: "A", text: "The group study rooms are on the third floor. You can book one at the desk or on our website." },
      { s: "B", text: "Perfect." },
      { s: "A", text: "Now, let me fill in your details. Can I have your family name?" },
      { s: "B", text: "It's Petrova. That's P, E, T, R, O, V, A." },
      { s: "A", text: "Thank you. Your membership number is four, seven, two, nine. Today I'll give you a temporary card, and your plastic card will be ready in a week." },
      { s: "B", text: "Thank you so much." },
      { s: "A", text: "You're welcome. Enjoy the library." }
    ],
    questions: [
      { id: 1, type: "mcq", q: "What time does the library close on weekdays?",
        options: ["6 p.m.", "7 p.m.", "8 p.m.", "9 p.m."], answer: 2 },
      { id: 2, type: "mcq", q: "What does the student need to show to join?",
        options: ["A passport", "A student card", "A bank card", "A letter from a teacher"], answer: 1 },

      { id: 3, type: "gap", q: "The maximum number of books at one time: ______", answer: ["six", "6"] },
      { id: 4, type: "gap", q: "Books can be kept for ______ weeks.", answer: ["three", "3"] },
      { id: 5, type: "gap", q: "The fine for a late book is ______ cents a day.", answer: ["fifty", "50"] },
      { id: 6, type: "mcq", q: "Where are the group study rooms?",
        options: ["On the ground floor", "On the first floor", "On the second floor", "On the third floor"], answer: 3 },
      { id: 7, type: "mcq", q: "How can a study room be booked?",
        options: ["By phone only", "At the desk or on the website", "Only by email", "It cannot be booked"], answer: 1 },
      { id: 8, type: "gap", q: "Student's family name: ______", answer: ["petrova"] },
      { id: 9, type: "gap", q: "Membership number: ______", answer: ["4729"] },
      { id: 10, type: "mcq", q: "What will the librarian give the student today?",
        options: ["A temporary card", "A printed map", "A guidebook", "A plastic card"], answer: 0 }
    ]
  },
  {
    id: "l3",
    minutes: 12,
    title: "Booking a city tour",
    audio: "",
    script: [
      { s: "A", text: "Good morning, Old Town Tours. How can I help?" },
      { s: "B", text: "Hello. I'd like to book a city tour for tomorrow, please." },
      { s: "A", text: "Certainly. The tour starts at ten thirty in the main square, next to the fountain. It lasts three hours." },
      { s: "B", text: "Lovely. How much does it cost?" },
      { s: "A", text: "It's forty-five dollars per person, and that includes a ticket to the city museum." },
      { s: "B", text: "Good. There will be four of us." },
      { s: "A", text: "Four people. May I have a name for the booking?" },
      { s: "B", text: "Karim. That's K, A, R, I, M." },
      { s: "A", text: "Thank you, Mr Karim. Please wear comfortable shoes, because there's a lot of walking. You can pay on the day, by cash or by card." },
      { s: "B", text: "That's fine. Thank you." },
      { s: "A", text: "I'll send you an email with a booking number. See you tomorrow!" }
    ],
    questions: [
      { id: 1, type: "mcq", q: "Where does the tour start?",
        options: ["At the railway station", "In the main square", "At the museum", "At the hotel"], answer: 1 },
      { id: 2, type: "mcq", q: "What time does the tour start?",
        options: ["9:30", "10:00", "10:30", "11:00"], answer: 2 },
      { id: 3, type: "mcq", q: "How long does the tour last?",
        options: ["Three hours", "Two hours", "Four hours", "All day"], answer: 0 },

      { id: 4, type: "gap", q: "The tour costs $ ______ per person.", answer: ["45"] },
      { id: 5, type: "gap", q: "The price includes a ticket to the city ______.", answer: ["museum"] },
      { id: 6, type: "gap", q: "The booking is for ______ people.", answer: ["four", "4"] },
      { id: 7, type: "gap", q: "Name for the booking: ______", answer: ["karim"] },
      { id: 8, type: "gap", q: "Visitors should wear comfortable ______.", answer: ["shoes"] },

      { id: 9, type: "mcq", q: "How can the customer pay?",
        options: ["Cash only", "Card only", "Cash or card", "Online only"], answer: 2 },
      { id: 10, type: "mcq", q: "What will the agent send by email?",
        options: ["A map", "A receipt", "A booking number", "A ticket"], answer: 2 }
    ]
  }
];

var SPEAKING_SETS = [
  SPEAKING,
  {
    id: "s2",
    questions: [
      { part: "Part 1", q: "Let's talk about food. What kind of food do you like to eat at home?", max: 45 },
      { part: "Part 1", q: "Do you enjoy cooking? Why or why not?", max: 45 },
      { part: "Part 2", max: 120,
        q: "Describe a place you would like to visit in the future.",
        cue: ["where it is", "how you would travel there", "what you would do there", "and explain why you want to go"] }
    ]
  },
  {
    id: "s3",
    questions: [
      { part: "Part 1", q: "Let's talk about your free time. What do you usually do on weekends?", max: 45 },
      { part: "Part 1", q: "Do you prefer spending time alone or with other people? Why?", max: 45 },
      { part: "Part 2", max: 120,
        q: "Describe a useful skill you learned recently.",
        cue: ["what the skill is", "how you learned it", "how often you use it", "and explain why it is useful"] }
    ]
  }
];

LISTENING_SETS.push(
  {
    id: "l4", minutes: 12, title: "Reserving a hotel room", audio: "",
    script: [
      { s: "A", text: "Good evening, Lakeside Hotel, reception." },
      { s: "B", text: "Hello, I'd like to reserve a room for next weekend." },
      { s: "A", text: "Certainly. Which nights would you like?" },
      { s: "B", text: "From Friday the twentieth to Sunday the twenty-second." },
      { s: "A", text: "Would you like a single or a double room?" },
      { s: "B", text: "A double room, please, with a view of the lake if possible." },
      { s: "A", text: "We have one. It's ninety dollars per night. Breakfast is included, and it's served from seven to ten." },
      { s: "B", text: "Wonderful. Is there parking?" },
      { s: "A", text: "Yes, parking is free for guests. May I have your name?" },
      { s: "B", text: "Yes, it's Olivia Grant. That's G, R, A, N, T." },
      { s: "A", text: "And a contact number?" },
      { s: "B", text: "It's oh seven seven, five five one, three three nine." },
      { s: "A", text: "Thank you, Ms Grant. Check-in is from two in the afternoon." }
    ],
    questions: [
      { id: 1, type: "gap", q: "Name of the hotel: ______ Hotel", answer: ["lakeside"] },
      { id: 2, type: "gap", q: "Arrival date: Friday the ______", answer: ["20", "20th", "twentieth"] },
      { id: 3, type: "mcq", q: "Which type of room does the guest want?", options: ["A single room", "A double room", "A twin room", "A suite"], answer: 1 },
      { id: 4, type: "mcq", q: "What would the guest like the room to have?", options: ["A view of the lake", "A balcony", "A kitchen", "A bathtub"], answer: 0 },
      { id: 5, type: "gap", q: "Price: $ ______ per night", answer: ["90"] },
      { id: 6, type: "mcq", q: "When is breakfast served?", options: ["6 to 9", "7 to 10", "7 to 9", "8 to 10"], answer: 1 },
      { id: 7, type: "mcq", q: "What is said about parking?", options: ["It is free for guests.", "It costs $5 a day.", "There is none.", "It is on the street."], answer: 0 },
      { id: 8, type: "gap", q: "Guest's surname: ______", answer: ["grant"] },
      { id: 9, type: "gap", q: "Contact number: ______", answer: ["077551339"] },
      { id: 10, type: "mcq", q: "From what time can guests check in?", options: ["12 noon", "2 p.m.", "4 p.m.", "6 p.m."], answer: 1 }
    ]
  },
  {
    id: "l5", minutes: 12, title: "Joining a gym", audio: "",
    script: [
      { s: "A", text: "Hello, FitLife Gym. How can I help?" },
      { s: "B", text: "I'm interested in joining. What types of membership do you have?" },
      { s: "A", text: "We have a monthly membership for thirty-five dollars and an annual membership for three hundred and sixty dollars, which is cheaper in the long run." },
      { s: "B", text: "Is there a joining fee?" },
      { s: "A", text: "There's a joining fee of twenty dollars, but it's waived this month." },
      { s: "B", text: "What are the opening hours?" },
      { s: "A", text: "We're open from six in the morning until eleven at night, seven days a week." },
      { s: "B", text: "Do you offer classes?" },
      { s: "A", text: "Yes, yoga on Tuesdays and swimming lessons on Thursdays. They're included in the price." },
      { s: "B", text: "Is there a swimming pool?" },
      { s: "A", text: "Yes, on the ground floor, and the sauna is next to it." },
      { s: "B", text: "Can I try it before I join?" },
      { s: "A", text: "Of course. Your first visit is free. Please bring a towel and a padlock for the locker." },
      { s: "B", text: "Thanks. My name is Emma Lowe. That's L, O, W, E." },
      { s: "A", text: "Thank you, Emma. We'll see you on Saturday." }
    ],
    questions: [
      { id: 1, type: "mcq", q: "Which membership is cheaper in the long run?", options: ["Monthly", "Annual", "Weekly", "Daily"], answer: 1 },
      { id: 2, type: "gap", q: "Monthly membership: $ ______", answer: ["35"] },
      { id: 3, type: "gap", q: "Annual membership: $ ______", answer: ["360"] },
      { id: 4, type: "gap", q: "Joining fee (waived this month): $ ______", answer: ["20"] },
      { id: 5, type: "mcq", q: "What time does the gym close?", options: ["9 p.m.", "10 p.m.", "11 p.m.", "Midnight"], answer: 2 },
      { id: 6, type: "mcq", q: "Which class is on Tuesdays?", options: ["Swimming", "Yoga", "Dance", "Boxing"], answer: 1 },
      { id: 7, type: "mcq", q: "Where is the swimming pool?", options: ["On the ground floor", "On the first floor", "In the basement", "On the roof"], answer: 0 },
      { id: 8, type: "gap", q: "The first visit is ______.", answer: ["free"] },
      { id: 9, type: "gap", q: "Members should bring a towel and a ______.", answer: ["padlock"] },
      { id: 10, type: "gap", q: "Surname: ______", answer: ["lowe"] }
    ]
  },
  {
    id: "l6", minutes: 12, title: "Reporting a lost bag", audio: "",
    script: [
      { s: "A", text: "Lost property office. How can I help?" },
      { s: "B", text: "I think I left my bag on the train this morning." },
      { s: "A", text: "What kind of bag was it?" },
      { s: "B", text: "A black backpack, with a small red label on the front." },
      { s: "A", text: "Which train were you on?" },
      { s: "B", text: "The eight fifteen from Central Station to Westfield." },
      { s: "A", text: "And what was inside?" },
      { s: "B", text: "A laptop, a blue folder and a water bottle." },
      { s: "A", text: "I'll check. Can I take your name?" },
      { s: "B", text: "Daniel Ortiz. That's O, R, T, I, Z." },
      { s: "A", text: "And your phone number?" },
      { s: "B", text: "It's oh nine one, two two six, eight eight four." },
      { s: "A", text: "Thank you. We've found a black backpack at Westfield station. You can collect it from the ticket office on platform two, which is open until six. You'll need photo ID." },
      { s: "B", text: "Great. I'll come this afternoon." }
    ],
    questions: [
      { id: 1, type: "mcq", q: "What has the man lost?", options: ["A suitcase", "A backpack", "A coat", "A laptop case"], answer: 1 },
      { id: 2, type: "gap", q: "The bag is ______ with a small red label.", answer: ["black"] },
      { id: 3, type: "gap", q: "Time of the train: ______", answer: ["815", "8:15"] },
      { id: 4, type: "mcq", q: "Where was the train going?", options: ["Westfield", "Central", "Northgate", "Riverside"], answer: 0 },
      { id: 5, type: "gap", q: "Inside the bag: a laptop, a blue ______ and a water bottle.", answer: ["folder"] },
      { id: 6, type: "gap", q: "Surname: ______", answer: ["ortiz"] },
      { id: 7, type: "gap", q: "Phone number: ______", answer: ["091226884"] },
      { id: 8, type: "mcq", q: "Where has the bag been found?", options: ["On the train", "At Westfield station", "At Central Station", "In a taxi"], answer: 1 },
      { id: 9, type: "mcq", q: "Where can the man collect it?", options: ["The main hall", "The police station", "The ticket office on platform two", "The bus stop"], answer: 2 },
      { id: 10, type: "mcq", q: "What must the man bring?", options: ["A receipt", "A ticket", "A letter", "Photo ID"], answer: 3 }
    ]
  },
  {
    id: "l7", minutes: 12, title: "Making a doctor's appointment", audio: "",
    script: [
      { s: "A", text: "Maple Street Clinic, good morning." },
      { s: "B", text: "Hello, I'd like to make an appointment with Doctor Evans, please." },
      { s: "A", text: "I'm sorry, Doctor Evans is on holiday this week. Doctor Khan has a free appointment on Wednesday at a quarter past nine." },
      { s: "B", text: "That's fine." },
      { s: "A", text: "What is the appointment for?" },
      { s: "B", text: "It's for a sore knee." },
      { s: "A", text: "Please arrive ten minutes early to fill in a form. The clinic is on the second floor, above the pharmacy." },
      { s: "B", text: "Do I need to bring anything?" },
      { s: "A", text: "Please bring your insurance card and any medication you take." },
      { s: "B", text: "Okay. And what's the fee?" },
      { s: "A", text: "The consultation is forty dollars, payable at reception. May I have your name?" },
      { s: "B", text: "Sofia Mendes. That's M, E, N, D, E, S." },
      { s: "A", text: "Thank you, Ms Mendes. If you need to cancel, please call us at least twenty-four hours before." }
    ],
    questions: [
      { id: 1, type: "mcq", q: "Which doctor will the patient see?", options: ["Doctor Evans", "Doctor Khan", "Doctor Brown", "Doctor Lee"], answer: 1 },
      { id: 2, type: "mcq", q: "On which day is the appointment?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2 },
      { id: 3, type: "mcq", q: "At what time is the appointment?", options: ["9:00", "9:15", "9:30", "9:45"], answer: 1 },
      { id: 4, type: "gap", q: "Reason for the visit: a sore ______", answer: ["knee"] },
      { id: 5, type: "gap", q: "The patient should arrive ______ minutes early.", answer: ["10", "ten"] },
      { id: 6, type: "mcq", q: "On which floor is the clinic?", options: ["Ground floor", "First floor", "Second floor", "Third floor"], answer: 2 },
      { id: 7, type: "gap", q: "The patient should bring an insurance ______.", answer: ["card"] },
      { id: 8, type: "gap", q: "Consultation fee: $ ______", answer: ["40"] },
      { id: 9, type: "gap", q: "Patient's surname: ______", answer: ["mendes"] },
      { id: 10, type: "gap", q: "Cancel at least ______ hours before.", answer: ["24", "twenty-four"] }
    ]
  },
  {
    id: "l8", minutes: 12, title: "Booking a restaurant table", audio: "",
    script: [
      { s: "A", text: "Good evening, Bella Roma restaurant." },
      { s: "B", text: "Hi, I'd like to book a table for a birthday dinner." },
      { s: "A", text: "Of course. For how many people?" },
      { s: "B", text: "Eight people." },
      { s: "A", text: "And which day?" },
      { s: "B", text: "Saturday the fourteenth, at half past seven." },
      { s: "A", text: "I'm afraid half past seven is full, but we have a table at eight o'clock." },
      { s: "B", text: "Eight is fine." },
      { s: "A", text: "Would you like to sit inside or on the terrace?" },
      { s: "B", text: "The terrace, please." },
      { s: "A", text: "It may be cool in the evening, but we have heaters." },
      { s: "B", text: "That's fine. Can you make a vegetarian meal for one guest?" },
      { s: "A", text: "Certainly. We also offer a birthday cake for fifteen dollars." },
      { s: "B", text: "That would be lovely. The name is Hassan. That's H, A, S, S, A, N." },
      { s: "A", text: "Thank you, Mr Hassan. We'll see you on Saturday at eight." }
    ],
    questions: [
      { id: 1, type: "gap", q: "Name of the restaurant: Bella ______", answer: ["roma"] },
      { id: 2, type: "mcq", q: "What is the occasion?", options: ["An anniversary", "A birthday", "A business meeting", "A wedding"], answer: 1 },
      { id: 3, type: "gap", q: "Number of guests: ______", answer: ["8", "eight"] },
      { id: 4, type: "gap", q: "Date: Saturday the ______", answer: ["14", "14th", "fourteenth"] },
      { id: 5, type: "mcq", q: "What time is the table booked for?", options: ["7:30", "8:00", "8:30", "9:00"], answer: 1 },
      { id: 6, type: "mcq", q: "Where will the group sit?", options: ["Inside", "At the bar", "In a private room", "On the terrace"], answer: 3 },
      { id: 7, type: "mcq", q: "What does the restaurant have for the cool evening?", options: ["Blankets", "Heaters", "Hot drinks", "Umbrellas"], answer: 1 },
      { id: 8, type: "mcq", q: "What special meal does one guest need?", options: ["Gluten-free", "Vegan", "Vegetarian", "Halal"], answer: 2 },
      { id: 9, type: "gap", q: "Birthday cake: $ ______", answer: ["15"] },
      { id: 10, type: "gap", q: "Surname: ______", answer: ["hassan"] }
    ]
  },
  {
    id: "l9", minutes: 12, title: "Enquiring about a flat", audio: "",
    script: [
      { s: "A", text: "Hello, Green Homes Rentals." },
      { s: "B", text: "Hi, I'm calling about the flat advertised on Park Road." },
      { s: "A", text: "Yes. It's a two-bedroom flat on the fourth floor." },
      { s: "B", text: "How much is the rent?" },
      { s: "A", text: "Four hundred and fifty dollars a month, and utilities are not included." },
      { s: "B", text: "Is it furnished?" },
      { s: "A", text: "Partly. There's a bed, a wardrobe and a kitchen, but no sofa." },
      { s: "B", text: "Is it close to public transport?" },
      { s: "A", text: "Yes, the metro station is a five-minute walk away." },
      { s: "B", text: "When is it available?" },
      { s: "A", text: "From the first of December." },
      { s: "B", text: "Can I see it?" },
      { s: "A", text: "Yes, tomorrow at four in the afternoon." },
      { s: "B", text: "Great. My name is Aziz Karimov. That's K, A, R, I, M, O, V." },
      { s: "A", text: "Thank you, Mr Karimov." }
    ],
    questions: [
      { id: 1, type: "gap", q: "The flat is on ______ Road.", answer: ["park"] },
      { id: 2, type: "mcq", q: "How many bedrooms does the flat have?", options: ["One", "Two", "Three", "Four"], answer: 1 },
      { id: 3, type: "mcq", q: "On which floor is the flat?", options: ["Second", "Third", "Fourth", "Fifth"], answer: 2 },
      { id: 4, type: "gap", q: "Rent: $ ______ a month", answer: ["450"] },
      { id: 5, type: "mcq", q: "What is said about utilities?", options: ["They are included.", "They are not included.", "Half is included.", "The owner pays them."], answer: 1 },
      { id: 6, type: "mcq", q: "Which item is NOT in the flat?", options: ["A bed", "A wardrobe", "A kitchen", "A sofa"], answer: 3 },
      { id: 7, type: "gap", q: "The metro station is a ______-minute walk away.", answer: ["5", "five"] },
      { id: 8, type: "gap", q: "Available from the ______ of December.", answer: ["1", "1st", "first"] },
      { id: 9, type: "mcq", q: "When can the man see the flat?", options: ["3 p.m. today", "4 p.m. tomorrow", "4 p.m. today", "5 p.m. tomorrow"], answer: 1 },
      { id: 10, type: "gap", q: "Surname: ______", answer: ["karimov"] }
    ]
  },
  {
    id: "l10", minutes: 12, title: "Choosing a mobile plan", audio: "",
    script: [
      { s: "A", text: "TeleNet, can I help you?" },
      { s: "B", text: "Yes, I'm looking for a new mobile plan." },
      { s: "A", text: "Our most popular plan is the Standard plan. It includes twenty gigabytes of data and unlimited calls, for twelve dollars a month." },
      { s: "B", text: "Is there a contract?" },
      { s: "A", text: "No, it's a monthly plan and you can cancel at any time." },
      { s: "B", text: "What about international calls?" },
      { s: "A", text: "Calls to other countries cost ten cents a minute." },
      { s: "B", text: "Do I get a new phone with it?" },
      { s: "A", text: "No, but we have a SIM-only deal. If you sign up online, you get the first month free." },
      { s: "B", text: "How do I get the SIM card?" },
      { s: "A", text: "We deliver it free to your address within two days, or you can collect it from any TeleNet shop." },
      { s: "B", text: "I'll order online. Is there a student discount?" },
      { s: "A", text: "Yes, students get fifteen percent off with a valid student card." },
      { s: "B", text: "Excellent, thank you." }
    ],
    questions: [
      { id: 1, type: "gap", q: "The most popular plan is the ______ plan.", answer: ["standard"] },
      { id: 2, type: "gap", q: "Data included: ______ gigabytes", answer: ["20", "twenty"] },
      { id: 3, type: "gap", q: "Price: $ ______ a month", answer: ["12"] },
      { id: 4, type: "mcq", q: "What kind of plan is it?", options: ["A 12-month contract", "A 24-month contract", "A monthly plan with no contract", "A weekly plan"], answer: 2 },
      { id: 5, type: "gap", q: "International calls cost ______ cents a minute.", answer: ["10", "ten"] },
      { id: 6, type: "mcq", q: "What do customers get if they sign up online?", options: ["A free phone", "The first month free", "Free calls abroad", "A free case"], answer: 1 },
      { id: 7, type: "mcq", q: "How soon is the SIM card delivered?", options: ["Within five days", "Within a week", "Within one day", "Within two days"], answer: 3 },
      { id: 8, type: "mcq", q: "Where else can the SIM card be collected?", options: ["Any TeleNet shop", "The post office", "A supermarket", "The airport"], answer: 0 },
      { id: 9, type: "gap", q: "Student discount: ______ percent", answer: ["15", "fifteen"] },
      { id: 10, type: "mcq", q: "What do students need to show?", options: ["A passport", "A valid student card", "A letter", "A bank statement"], answer: 1 }
    ]
  }
);

SPEAKING_SETS.push(
  { id: "s4", questions: [
    { part: "Part 1", q: "Let's talk about your studies or work. What do you do, and what do you like most about it?", max: 45 },
    { part: "Part 1", q: "Do you prefer working alone or in a team? Why?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a book you have enjoyed reading.",
      cue: ["what the book is", "who wrote it", "what it is about", "and explain why you enjoyed it"] } ] },
  { id: "s5", questions: [
    { part: "Part 1", q: "Let's talk about friends. How often do you see your friends?", max: 45 },
    { part: "Part 1", q: "What do you like to do together with your friends?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a teacher who has influenced you.",
      cue: ["who the teacher was", "what subject they taught", "what made them special", "and explain how they influenced you"] } ] },
  { id: "s6", questions: [
    { part: "Part 1", q: "Let's talk about the weather. What is the weather like in your city in summer?", max: 45 },
    { part: "Part 1", q: "Does the weather affect your mood? Why or why not?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a memorable journey you have taken.",
      cue: ["where you went", "who you went with", "what you did there", "and explain why it was memorable"] } ] },
  { id: "s7", questions: [
    { part: "Part 1", q: "Let's talk about technology. What technology do you use every day?", max: 45 },
    { part: "Part 1", q: "Do you think people spend too much time on their phones? Why?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe an object that is important to you.",
      cue: ["what the object is", "how long you have had it", "how you use it", "and explain why it is important to you"] } ] },
  { id: "s8", questions: [
    { part: "Part 1", q: "Let's talk about shopping. Do you prefer shopping online or in shops?", max: 45 },
    { part: "Part 1", q: "What was the last thing you bought, and why did you buy it?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a celebration you enjoyed.",
      cue: ["what the celebration was", "who was there", "what you did", "and explain why you enjoyed it"] } ] },
  { id: "s9", questions: [
    { part: "Part 1", q: "Let's talk about transport. How do you usually travel around your city?", max: 45 },
    { part: "Part 1", q: "Would you like to change the way you travel? Why or why not?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a time when you helped someone.",
      cue: ["who you helped", "how you helped them", "how they reacted", "and explain how you felt afterwards"] } ] },
  { id: "s10", questions: [
    { part: "Part 1", q: "Let's talk about music. What kind of music do you enjoy listening to?", max: 45 },
    { part: "Part 1", q: "Do you play any musical instruments, or would you like to learn one?", max: 45 },
    { part: "Part 2", max: 120, q: "Describe a sport or activity you enjoy doing.",
      cue: ["what it is", "how often you do it", "who you do it with", "and explain why you enjoy it"] } ] }
);

WRITING.prompts.push(
  "Some people think that technology has made our lives easier, while others think it has made life more complicated. Discuss both views and give your opinion.",
  "Many people now prefer to buy things online rather than in shops. Is this a positive or negative development?",
  "Some people believe that sport should be a compulsory subject in all schools. To what extent do you agree or disagree?"
);
