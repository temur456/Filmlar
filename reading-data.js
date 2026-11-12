// Reading test mazmuni. Yangi test qo'shish uchun shu faylni tahrirlang.
// type: "mcq" (variantlar, answer = to'g'ri variant raqami, 0 dan boshlanadi)
//       "tfng" (answer = "True" | "False" | "Not given")
//       "gap"  (answer = to'g'ri javoblar ro'yxati, kichik harflarda)
var READING = {
  minutes: 15,
  title: "Samarkand: A Crossroads of the Silk Road",
  paragraphs: [
    "Samarkand is one of the oldest continuously inhabited cities in Central Asia. Its position between China, India and Persia made it a natural meeting point for merchants who travelled the Silk Road, a network of trade routes that connected East and West for more than a thousand years. Caravans arrived in the city carrying silk, spices and metalwork, and left with horses, glassware and dried fruit.",
    "Trade brought more than goods. Ideas, religions and technologies also travelled along the routes. According to tradition, the secret of papermaking reached the Islamic world through Samarkand in the eighth century, after Chinese papermakers were captured in a battle in the region. Within a few decades the city was producing paper of such high quality that it was sold across the region, making books cheaper and easier to copy.",
    "In the fourteenth century, the ruler Timur chose Samarkand as the capital of his empire. He brought skilled craftsmen from the lands he conquered and ordered the construction of grand mosques and tombs decorated with blue tiles. His grandson, Ulugh Beg, was less interested in war than in science. In the 1420s he built a large observatory and, with his team, produced a detailed catalogue of stars that remained influential for centuries.",
    "The city's fortunes changed when sea routes between Europe and Asia became more important, and overland trade slowly declined. Samarkand became quieter, yet its monuments survived. Today the Registan square attracts visitors from around the world, and careful restoration work continues to protect the old buildings. Many local craftspeople also keep traditional skills alive, making ceramics, silk and paper by hand for visitors who want to see how these products were once made."
  ],
  questions: [
    { id: 1, type: "mcq", q: "Why was Samarkand an important meeting point for merchants?",
      options: ["It was the largest city in China.", "It lay between China, India and Persia.", "It produced the most silk in the world.", "It was the capital of the Silk Road."], answer: 1 },
    { id: 2, type: "mcq", q: "What does the passage say about paper made in Samarkand?",
      options: ["It was too expensive to sell abroad.", "It was sold in other parts of the region.", "It was only used for religious books.", "It was first invented in the city."], answer: 1 },
    { id: 3, type: "mcq", q: "What was Ulugh Beg most interested in?",
      options: ["Conquering new lands", "Building mosques", "Science", "Trade"], answer: 2 },
    { id: 4, type: "mcq", q: "Why did Samarkand become quieter?",
      options: ["Many of its buildings were destroyed.", "Merchants began to prefer sea routes.", "The city lost its craftspeople.", "Paper was no longer needed."], answer: 1 },

    { id: 5, type: "tfng", q: "People have lived in Samarkand for a very long time without a break.", answer: "True" },
    { id: 6, type: "tfng", q: "Caravans brought only silk to Samarkand.", answer: "False" },
    { id: 7, type: "tfng", q: "Timur brought skilled craftsmen to Samarkand from other lands.", answer: "True" },
    { id: 8, type: "tfng", q: "Ulugh Beg ruled Samarkand for longer than Timur did.", answer: "Not given" },

    { id: 9, type: "gap", q: "Timur's mosques and tombs were decorated with ______ tiles.", answer: ["blue"] },
    { id: 10, type: "gap", q: "Today, local craftspeople make ceramics, silk and ______ by hand.", answer: ["paper"] }
  ]
};
