export type OwlMail = {
  fact: string;
  secret: string;
  trivia: { q: string; a: string };
  challenge: string;
};

const facts = [
  "Dumbledore's full name is Albus Percival Wulfric Brian Dumbledore.",
  "The Hogwarts Express was stolen from a Muggle train station — by enchantment.",
  "Wizards used to relieve themselves wherever they stood and vanish the evidence.",
  "Voldemort cannot feel love because he was conceived under a love potion.",
  "Florean Fortescue, the ice cream shop owner, was kidnapped and killed by Death Eaters.",
  "Aberforth Dumbledore was prosecuted for inappropriate charms on a goat.",
  "Pottermore confirmed McGonagall was 70 during the books — she was a Quidditch star in school.",
  "Crookshanks is half-Kneazle, which is why he could sense Scabbers was Pettigrew.",
];
const secrets = [
  "Try typing 'lumos' anywhere on the site.",
  "There's a Room of Requirement page that changes every visit.",
  "Whisper 'I solemnly swear that I am up to no good' to the keyboard.",
  "The Owl Tower has new mail every dawn.",
  "Ghosts sometimes drift across the screen — click them.",
];
const trivia = [
  { q: "What does the spell 'Alohomora' do?", a: "Unlocks doors and objects." },
  { q: "Who is the Half-Blood Prince?", a: "Severus Snape." },
  { q: "How many staircases are in Hogwarts?", a: "142." },
  { q: "What is Hermione's Patronus?", a: "An otter." },
  { q: "What does S.P.E.W. stand for?", a: "Society for the Promotion of Elfish Welfare." },
];
const challenges = [
  "Find and favorite 3 new spells today.",
  "Discover a secret password room.",
  "Cast Lumos with your voice.",
  "Score 5 in the Flying Broom game.",
  "Visit the Marauder's Map and identify 3 characters.",
  "Win a duel in the Duelling Arena.",
];

function dayHash(seed: string): number {
  const today = new Date().toISOString().slice(0, 10);
  let h = 0;
  for (const c of today + seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function getTodaysOwlMail(): OwlMail {
  return {
    fact: facts[dayHash("f") % facts.length],
    secret: secrets[dayHash("s") % secrets.length],
    trivia: trivia[dayHash("t") % trivia.length],
    challenge: challenges[dayHash("c") % challenges.length],
  };
}

export function getRoomOfRequirementContent() {
  const pool = [
    { title: "A Pile of Forgotten Wands", body: "Hundreds of broken wands stacked higher than your head. One pulses faintly — yours, perhaps?" },
    { title: "An Empty Duelling Platform", body: "Two wand-shaped sconces light. The room waits for an opponent that never comes." },
    { title: "A Library of Forbidden Books", body: "Every book is open to the same page: a spell with no name." },
    { title: "A Mirror like the Erised", body: "It shows you eating chocolate frogs forever. Make of that what you will." },
    { title: "Snow", body: "It's snowing indoors. You hear distant carols from the Great Hall." },
    { title: "A Kitten Made of Smoke", body: "It purrs once, then unravels into a Patronus shape." },
    { title: "Rows of Hourglasses", body: "Each holds a memory of a moment you almost forgot." },
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}
