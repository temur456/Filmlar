// Reading test mazmuni. Yangi test qo'shish uchun shu faylni tahrirlang.
// type: "mcq" (variantlar, answer = to'g'ri variant raqami, 0 dan boshlanadi)
//       "tfng" (answer = "True" | "False" | "Not given")
//       "gap"  (answer = to'g'ri javoblar ro'yxati, kichik harflarda)
var READING = {
  id: "r1",
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

var READING_SETS = [
  READING,
  {
    id: "r2",
    minutes: 15,
    title: "How Honeybees Communicate",
    paragraphs: [
      "Honeybees live in colonies of tens of thousands of individuals, yet they find food and make decisions without any leader giving orders. Scientists have long been fascinated by how a single worker that finds a good source of nectar can bring hundreds of nestmates to the same flowers.",
      "In the 1940s the Austrian researcher Karl von Frisch discovered that returning foragers perform a 'waggle dance' on the vertical surface of the honeycomb inside the dark hive. The angle of the straight run in the dance, measured from vertical, shows the direction of the food relative to the sun. The longer the bee waggles, the further away the flowers are. For his work, von Frisch shared the Nobel Prize in 1973.",
      "The dance also carries information about quality. A bee that has found especially rich nectar dances for longer and more energetically, so more bees follow her. If a source runs out, the dancers stop, and the colony shifts its attention to better flowers without any central plan.",
      "Not everyone accepted von Frisch's idea at first. Some scientists argued that bees simply followed the smell of the flowers on the dancer's body. In the 1990s researchers built a small robotic bee that performed the dance, and real bees flew to the place the robot indicated, which strongly supported the original theory. Today the waggle dance is studied by engineers who hope to design robots that cooperate in a similar way."
    ],
    questions: [
      { id: 1, type: "mcq", q: "How does a colony of honeybees find food?",
        options: ["A leader gives orders to the workers.", "Workers share information about where food is.", "Workers search randomly until they find flowers.", "Older bees show younger bees the way."], answer: 1 },
      { id: 2, type: "mcq", q: "What does the length of the waggle show?",
        options: ["The direction of the flowers", "The quality of the nectar", "The distance to the flowers", "The time of day"], answer: 2 },
      { id: 3, type: "mcq", q: "Why did some scientists doubt von Frisch's theory?",
        options: ["They had not seen the dance themselves.", "The dance happened outside the hive.", "They thought bees used smell instead.", "Bees could not see the sun."], answer: 2 },
      { id: 4, type: "mcq", q: "What do engineers hope to do with this research?",
        options: ["Make bees produce more honey", "Protect bees from disease", "Build artificial hives", "Design robots that cooperate"], answer: 3 },

      { id: 5, type: "tfng", q: "Honeybees dance on the horizontal floor of the hive.", answer: "False" },
      { id: 6, type: "tfng", q: "A bee that finds richer nectar dances for longer.", answer: "True" },
      { id: 7, type: "tfng", q: "Von Frisch won the Nobel Prize on his own.", answer: "False" },
      { id: 8, type: "tfng", q: "Robot bees are now used to pollinate crops.", answer: "Not given" },

      { id: 9, type: "gap", q: "The straight run of the dance shows the direction of the food relative to the ______.", answer: ["sun"] },
      { id: 10, type: "gap", q: "In the 1990s, scientists built a small ______ bee that performed the dance.", answer: ["robotic", "robot"] }
    ]
  },
  {
    id: "r3",
    minutes: 15,
    title: "The Aral Sea: Loss and Recovery",
    paragraphs: [
      "The Aral Sea, which lies between Kazakhstan and Uzbekistan, was once one of the four largest lakes in the world. Fishing towns stood along its shores, and the water supported a busy local economy.",
      "In the 1960s, governments decided to take water from the two rivers that fed the sea, the Amu Darya and the Syr Darya, to irrigate cotton fields in the desert. The plan increased the harvest, but less and less water reached the lake. Over the following decades the sea shrank dramatically, and by 2007 it had lost about 90 percent of its original volume.",
      "The effects were severe. The salt in the remaining water killed most of the fish, and the fishing industry collapsed. The exposed seabed turned into a desert, and strong winds carried salty dust over nearby villages, harming crops and people's health.",
      "Some recovery has been possible. In 2005, a dam was completed that separated the northern part of the sea from the southern part. The water level in the north rose, salt levels fell and fish returned, allowing fishing to restart. In the south, where little water remains, communities have planted saxaul, a hardy desert shrub, on the dry seabed to hold the soil in place and reduce dust storms."
    ],
    questions: [
      { id: 1, type: "mcq", q: "Where is the Aral Sea?",
        options: ["Between Kazakhstan and Uzbekistan", "Between Uzbekistan and Iran", "Inside Turkmenistan", "Between Kazakhstan and China"], answer: 0 },
      { id: 2, type: "mcq", q: "Why was water taken from the two rivers?",
        options: ["To supply nearby cities", "To irrigate cotton fields", "To produce electricity", "To fill other lakes"], answer: 1 },
      { id: 3, type: "mcq", q: "What happened to the fish as the sea shrank?",
        options: ["They moved to the rivers.", "They grew larger.", "Most of them died.", "They became more valuable."], answer: 2 },
      { id: 4, type: "mcq", q: "What was the effect of the dam built in 2005?",
        options: ["It stopped dust storms in the south.", "It raised the water level in the north.", "It closed the fishing industry.", "It brought water to the south."], answer: 1 },

      { id: 5, type: "tfng", q: "The Aral Sea lost most of its volume by 2007.", answer: "True" },
      { id: 6, type: "tfng", q: "The irrigation plan failed to increase the harvest.", answer: "False" },
      { id: 7, type: "tfng", q: "Dust from the seabed affected nearby villages.", answer: "True" },
      { id: 8, type: "tfng", q: "Most villagers left the region after the fishing industry collapsed.", answer: "Not given" },

      { id: 9, type: "gap", q: "Communities have planted ______ on the dry seabed.", answer: ["saxaul"] },
      { id: 10, type: "gap", q: "The two rivers that fed the sea were the Amu Darya and the ______ Darya.", answer: ["syr"] }
    ]
  }
];

READING_SETS.push(
  {
    id: "r4", minutes: 15, title: "The Science of Sleep",
    paragraphs: [
      "Sleep is not a passive state. While we rest, the brain and body carry out important work. Most adults need between seven and nine hours of sleep a night, although the exact amount varies from person to person.",
      "A night of sleep is divided into cycles of about ninety minutes. In each cycle the body moves from light sleep into deep sleep, and then into a stage called REM sleep, when most vivid dreams occur. Deep sleep is when the body repairs muscles and strengthens the immune system, while REM sleep appears to help the brain organise memories.",
      "Lack of sleep has measurable effects. People who sleep too little find it harder to concentrate, make more mistakes and react more slowly. Over a long period, poor sleep is linked with a higher risk of health problems such as heart disease.",
      "Modern habits can make good sleep difficult. The light from phone and computer screens can delay the release of melatonin, a hormone that makes us feel sleepy. Experts therefore advise avoiding screens for an hour before bed, keeping the bedroom cool and dark, and going to bed at the same time every day."
    ],
    questions: [
      { id: 1, type: "mcq", q: "How much sleep do most adults need?", options: ["Five to six hours", "Six to seven hours", "Seven to nine hours", "Nine to eleven hours"], answer: 2 },
      { id: 2, type: "mcq", q: "What happens during deep sleep?", options: ["Most vivid dreams occur", "The body repairs muscles", "The brain stops working", "Melatonin is destroyed"], answer: 1 },
      { id: 3, type: "mcq", q: "What effect can phone and computer screens have?", options: ["They make bedrooms cooler", "They shorten sleep cycles", "They improve memory", "They delay the release of melatonin"], answer: 3 },
      { id: 4, type: "mcq", q: "What do experts recommend?", options: ["Sleeping during the day", "Going to bed at the same time every day", "Exercising just before bed", "Drinking warm milk"], answer: 1 },
      { id: 5, type: "tfng", q: "A sleep cycle lasts about ninety minutes.", answer: "True" },
      { id: 6, type: "tfng", q: "Poor sleep can slow down a person's reactions.", answer: "True" },
      { id: 7, type: "tfng", q: "Everyone needs exactly eight hours of sleep.", answer: "False" },
      { id: 8, type: "tfng", q: "Napping during the day improves memory more than sleeping at night.", answer: "Not given" },
      { id: 9, type: "gap", q: "During ______ sleep, the brain seems to organise memories.", answer: ["rem"] },
      { id: 10, type: "gap", q: "Melatonin is a ______ that makes us feel sleepy.", answer: ["hormone"] }
    ]
  },
  {
    id: "r5", minutes: 15, title: "Coral Reefs under Pressure",
    paragraphs: [
      "Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species. Fish, crabs and thousands of other animals shelter among the corals, and millions of people depend on reefs for food and for protection from storms.",
      "Corals are tiny animals that live in partnership with algae. The algae live inside the coral and give it food and its bright colours. When the sea becomes too warm, the coral expels the algae and turns white. This process is called bleaching. A bleached coral is not dead, but it is weak, and it will die if the heat continues for too long.",
      "Rising temperatures are not the only danger. As the oceans absorb more carbon dioxide from the air, the water becomes more acidic, which makes it harder for corals to build their hard skeletons. Pollution from farms and towns, and destructive fishing methods, add further pressure.",
      "There are some reasons for hope. Scientists now grow small coral fragments in underwater nurseries and attach them to damaged reefs. In some places, local communities have created protected areas where fishing is limited, and the reefs there have recovered more quickly. Experts agree, however, that reducing greenhouse gas emissions is essential in the long term."
    ],
    questions: [
      { id: 1, type: "mcq", q: "What share of the ocean floor do coral reefs cover?", options: ["More than ten percent", "About a quarter", "Less than one percent", "About half"], answer: 2 },
      { id: 2, type: "mcq", q: "What do algae give to corals?", options: ["Protection from storms", "Food and colour", "Hard skeletons", "Warm water"], answer: 1 },
      { id: 3, type: "mcq", q: "Why does more acidic water harm corals?", options: ["It makes them turn white.", "It kills the algae.", "It makes it harder to build their skeletons.", "It attracts predators."], answer: 2 },
      { id: 4, type: "mcq", q: "What has helped some reefs to recover?", options: ["Warmer water", "More tourists", "New farms", "Protected areas with limited fishing"], answer: 3 },
      { id: 5, type: "tfng", q: "A bleached coral is always dead.", answer: "False" },
      { id: 6, type: "tfng", q: "Pollution is an additional threat to reefs.", answer: "True" },
      { id: 7, type: "tfng", q: "Scientists grow coral fragments in underwater nurseries.", answer: "True" },
      { id: 8, type: "tfng", q: "Most tourists damage reefs on purpose.", answer: "Not given" },
      { id: 9, type: "gap", q: "When the sea becomes too warm, the coral expels the ______.", answer: ["algae"] },
      { id: 10, type: "gap", q: "Experts say reducing greenhouse gas ______ is essential in the long term.", answer: ["emissions"] }
    ]
  },
  {
    id: "r6", minutes: 15, title: "The Printing Revolution",
    paragraphs: [
      "Before the fifteenth century, every book in Europe was copied by hand, usually by monks. A single book could take months to finish, so books were rare and expensive, and only the wealthy or the Church could afford them.",
      "Around 1450, a German goldsmith named Johannes Gutenberg developed a printing system in the city of Mainz. His key idea was movable type: small metal letters that could be arranged into a page, inked and pressed onto paper, and then rearranged to print a different page. His most famous work, the Bible, was completed around 1455.",
      "The new technology spread quickly. By the year 1500, printing workshops had opened in hundreds of European towns, and millions of books had been produced. Prices fell, more people learned to read, and new ideas travelled faster than ever before. Many historians connect printing with the rapid growth of science and with religious reform in the sixteenth century.",
      "Not all changes were welcomed. Some authorities feared that cheap printed material would spread dangerous ideas, and they introduced rules to control what could be published. Nevertheless, printing proved impossible to stop, and it laid the foundation for modern mass communication."
    ],
    questions: [
      { id: 1, type: "mcq", q: "Who usually copied books before printing?", options: ["Merchants", "Monks", "Teachers", "Students"], answer: 1 },
      { id: 2, type: "mcq", q: "What was Gutenberg's key idea?", options: ["Using coloured ink", "Making books from leather", "Movable metal type", "Printing on cloth"], answer: 2 },
      { id: 3, type: "mcq", q: "What was one effect of falling book prices?", options: ["Books became rarer", "Printing workshops closed", "Fewer people read", "More people learned to read"], answer: 3 },
      { id: 4, type: "mcq", q: "Why did some authorities introduce rules about publishing?", options: ["They wanted cheaper books.", "They feared the spread of dangerous ideas.", "They needed more workshops.", "They disliked metal type."], answer: 1 },
      { id: 5, type: "tfng", q: "Gutenberg was originally a goldsmith.", answer: "True" },
      { id: 6, type: "tfng", q: "Gutenberg's Bible was completed before 1450.", answer: "False" },
      { id: 7, type: "tfng", q: "By 1500, millions of books had been produced.", answer: "True" },
      { id: 8, type: "tfng", q: "Gutenberg became rich from his invention.", answer: "Not given" },
      { id: 9, type: "gap", q: "Gutenberg developed his system in the German city of ______.", answer: ["mainz"] },
      { id: 10, type: "gap", q: "Small metal letters were ______ into a page, inked and pressed onto paper.", answer: ["arranged"] }
    ]
  },
  {
    id: "r7", minutes: 15, title: "Farming in the City",
    paragraphs: [
      "Cities are growing fast, and feeding their inhabitants requires food to travel long distances. Urban farming tries to solve this by growing food inside cities, on rooftops, in empty lots and even inside buildings.",
      "The most advanced form is the vertical farm, where plants grow in stacked layers under artificial light. Instead of soil, the roots sit in water containing nutrients. This method uses up to ninety percent less water than traditional farming, and because the farm is indoors, it needs no pesticides and can produce food all year round.",
      "Growing food close to customers has other advantages. Vegetables can reach shops within hours, so they are fresher and less food is wasted on the journey. Transport emissions also fall.",
      "However, vertical farms face serious challenges. The electricity needed for lighting is expensive, and so far the method works well only for a limited range of crops, mainly leafy greens and herbs. Staple foods such as wheat and rice are still grown more cheaply in open fields. Many experts therefore see urban farms as a useful addition to, not a replacement for, traditional agriculture."
    ],
    questions: [
      { id: 1, type: "mcq", q: "What is urban farming?", options: ["Growing food inside cities", "Importing food by air", "Farming only on large fields", "Selling food in markets"], answer: 0 },
      { id: 2, type: "mcq", q: "What do the roots sit in, in a vertical farm?", options: ["Soil", "Sand", "Water containing nutrients", "Ice"], answer: 2 },
      { id: 3, type: "mcq", q: "Why is food from urban farms fresher?", options: ["It is grown in soil.", "It travels a short distance.", "It is frozen.", "It is picked by machines."], answer: 1 },
      { id: 4, type: "mcq", q: "What do many experts think about urban farms?", options: ["They will replace traditional farms.", "They are useless.", "They are a useful addition to traditional farming.", "They are cheaper than open fields."], answer: 2 },
      { id: 5, type: "tfng", q: "Vertical farms need pesticides.", answer: "False" },
      { id: 6, type: "tfng", q: "Vertical farms can produce food throughout the year.", answer: "True" },
      { id: 7, type: "tfng", q: "Lighting is a major cost for vertical farms.", answer: "True" },
      { id: 8, type: "tfng", q: "Rooftop farms are more popular in Europe than in Asia.", answer: "Not given" },
      { id: 9, type: "gap", q: "Vertical farms use up to ninety percent less ______ than traditional farming.", answer: ["water"] },
      { id: 10, type: "gap", q: "At present, vertical farms mainly grow leafy greens and ______.", answer: ["herbs"] }
    ]
  },
  {
    id: "r8", minutes: 15, title: "The Story of the Bicycle",
    paragraphs: [
      "The bicycle seems simple, but it took about seventy years to reach the form we know today. The first version appeared in 1817, when the German inventor Karl von Drais built a wooden 'running machine'. It had two wheels and no pedals, and riders pushed themselves along with their feet.",
      "In the 1860s, French mechanics added pedals to the front wheel. These machines were uncomfortable and were nicknamed 'boneshakers' because of their iron wheels. In the 1870s, the front wheel became very large, since a bigger wheel meant a higher speed with each turn of the pedals. This 'penny-farthing' was fast but dangerous: a fall from such a height could cause serious injuries.",
      "The breakthrough came in the 1880s with the 'safety bicycle'. It had two wheels of equal size and a chain that drove the back wheel, so the rider sat low and close to the ground. In 1888, John Boyd Dunlop invented the air-filled rubber tyre, which made riding much smoother.",
      "The new bicycle was cheap and easy to ride, and it gave many people, especially women, a new freedom to travel independently. Today the bicycle remains one of the most widely used forms of transport, and many cities are building cycle lanes to encourage cycling."
    ],
    questions: [
      { id: 1, type: "mcq", q: "How did riders move the first bicycle?", options: ["With pedals", "By pushing with their feet", "With a small engine", "With a chain"], answer: 1 },
      { id: 2, type: "mcq", q: "Why was the front wheel of the penny-farthing so large?", options: ["To look impressive", "To carry luggage", "To improve comfort", "To increase speed"], answer: 3 },
      { id: 3, type: "mcq", q: "What was special about the safety bicycle?", options: ["It had a single wheel.", "It had a huge front wheel.", "It had two equal wheels and a chain.", "It had no seat."], answer: 2 },
      { id: 4, type: "mcq", q: "What did Dunlop's invention improve?", options: ["The brakes", "The pedals", "The weight of the frame", "The smoothness of the ride"], answer: 3 },
      { id: 5, type: "tfng", q: "The first bicycle had no pedals.", answer: "True" },
      { id: 6, type: "tfng", q: "Boneshakers had rubber tyres.", answer: "False" },
      { id: 7, type: "tfng", q: "The bicycle gave many women a new freedom to travel.", answer: "True" },
      { id: 8, type: "tfng", q: "Karl von Drais became wealthy from his invention.", answer: "Not given" },
      { id: 9, type: "gap", q: "The 'boneshaker' got its name because of its ______ wheels.", answer: ["iron"] },
      { id: 10, type: "gap", q: "John Boyd Dunlop invented the air-filled rubber ______.", answer: ["tyre", "tire"] }
    ]
  },
  {
    id: "r9", minutes: 15, title: "Learning a Language as an Adult",
    paragraphs: [
      "Many people believe that children learn languages far better than adults. The truth is more complicated. Children usually reach a more natural accent, especially if they begin before puberty. Adults, however, have advantages of their own.",
      "Adults can use what they already know about how language works. They can study grammar rules deliberately, compare a new language with their own, and set clear goals. Research suggests that, in the first months of study, adult learners often make faster progress than children, although children may catch up and overtake them over several years.",
      "What matters most is not age but the way a language is practised. Learners who use the language regularly, in real conversations, improve much faster than those who only read textbooks. Short daily sessions are more effective than a single long lesson once a week, because the brain needs repeated contact to move new words into long-term memory. Apps and flashcards that show a word again just before you are likely to forget it use this idea.",
      "Motivation also plays a major role. Adults who have a clear reason to learn, such as a new job or a move abroad, tend to keep going longer. Experts advise learners not to be afraid of making mistakes, since speaking, even imperfectly, is the quickest route to confidence."
    ],
    questions: [
      { id: 1, type: "mcq", q: "What advantage do children usually have?", options: ["Faster progress in the first months", "A more natural accent", "Better knowledge of grammar", "Stronger motivation"], answer: 1 },
      { id: 2, type: "mcq", q: "How can adults use their experience?", options: ["By avoiding grammar", "By comparing a new language with their own", "By learning only from apps", "By starting before puberty"], answer: 1 },
      { id: 3, type: "mcq", q: "Which kind of practice is most effective?", options: ["One long lesson every week", "Reading textbooks only", "Short daily sessions", "Studying only before exams"], answer: 2 },
      { id: 4, type: "mcq", q: "What do experts advise about mistakes?", options: ["Avoid speaking until you are fluent", "Correct every mistake at once", "Write instead of speaking", "Do not be afraid of them"], answer: 3 },
      { id: 5, type: "tfng", q: "Children may overtake adult learners after several years.", answer: "True" },
      { id: 6, type: "tfng", q: "Reading textbooks alone is the fastest way to improve.", answer: "False" },
      { id: 7, type: "tfng", q: "Adults with a clear reason to learn tend to continue for longer.", answer: "True" },
      { id: 8, type: "tfng", q: "Learning two languages at once is harder than learning one.", answer: "Not given" },
      { id: 9, type: "gap", q: "The brain needs repeated ______ to move new words into long-term memory.", answer: ["contact"] },
      { id: 10, type: "gap", q: "Speaking, even imperfectly, is the quickest route to ______.", answer: ["confidence"] }
    ]
  },
  {
    id: "r10", minutes: 15, title: "Solar Power in the Desert",
    paragraphs: [
      "Deserts receive more sunlight than almost any other part of the world, which makes them attractive places for solar power. Large solar farms in desert regions can produce electricity for hundreds of thousands of homes.",
      "There are two main technologies. Solar panels turn sunlight directly into electricity. Concentrated solar plants use thousands of mirrors to focus sunlight onto a tower, producing intense heat that boils water and drives a turbine. Some of these plants store the heat in tanks of molten salt, so that they can keep producing electricity after sunset.",
      "Building in the desert is not simple, however. Dust and sand settle on the panels and can reduce their output by a significant amount if they are not cleaned. Water, which is normally used for cleaning, is scarce in deserts, so some companies now use robots that brush the panels without water. Another challenge is distance: the best sites are often far from the cities that need the electricity, so expensive power lines must be built.",
      "Engineers also work on the problem of night-time supply. Large batteries can store extra daytime energy, but they are costly. As prices fall, many experts expect desert solar power to become one of the cheapest sources of electricity in the coming decades."
    ],
    questions: [
      { id: 1, type: "mcq", q: "Why are deserts attractive for solar power?", options: ["They are close to cities.", "They receive a lot of sunlight.", "They have plenty of water.", "They are cool."], answer: 1 },
      { id: 2, type: "mcq", q: "How do concentrated solar plants produce electricity?", options: ["Panels convert light directly.", "Wind turns a turbine.", "Mirrors focus sunlight to boil water.", "Batteries heat salt."], answer: 2 },
      { id: 3, type: "mcq", q: "What is the purpose of molten salt?", options: ["To clean the panels", "To store heat", "To cool the mirrors", "To make electricity directly"], answer: 1 },
      { id: 4, type: "mcq", q: "Why are power lines a challenge?", options: ["Deserts are too hot.", "Panels are too heavy.", "Lines are rarely needed.", "The best sites are often far from cities."], answer: 3 },
      { id: 5, type: "tfng", q: "Dust can reduce the output of solar panels.", answer: "True" },
      { id: 6, type: "tfng", q: "Cleaning robots in the desert use a lot of water.", answer: "False" },
      { id: 7, type: "tfng", q: "Large batteries can store extra daytime energy.", answer: "True" },
      { id: 8, type: "tfng", q: "Solar farms in Africa produce more power than those in Asia.", answer: "Not given" },
      { id: 9, type: "gap", q: "Some plants store heat in tanks of molten ______.", answer: ["salt"] },
      { id: 10, type: "gap", q: "Some companies now use robots that ______ the panels without water.", answer: ["brush"] }
    ]
  }
);
