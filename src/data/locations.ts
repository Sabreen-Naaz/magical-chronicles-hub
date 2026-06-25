export type MagicalLocation = {
  id: string;
  name: string;
  region: string;
  description: string;
  hidden: string[];
  x: number; // % on map
  y: number;
};

export const locations: MagicalLocation[] = [
  { id: "great-hall", name: "The Great Hall", region: "Hogwarts", description: "Ceiling enchanted to mirror the sky outside; floating candles light every feast.", hidden: ["The candles never drip wax.", "It was used as the makeshift hospital wing during the Battle of Hogwarts."], x: 50, y: 55 },
  { id: "gryffindor", name: "Gryffindor Tower", region: "Hogwarts", description: "Common room behind the portrait of the Fat Lady, on the seventh floor.", hidden: ["The password changes constantly — Neville keeps losing the list.", "Boys cannot enter the girls' staircase; an enchantment turns it into a slide."], x: 65, y: 25 },
  { id: "slytherin", name: "Slytherin Dungeon", region: "Hogwarts", description: "Underwater common room beneath the Black Lake. Greenish light glows through the windows.", hidden: ["You can sometimes see the giant squid drift by.", "The fireplace burns cold green flames."], x: 35, y: 75 },
  { id: "ror", name: "Room of Requirement", region: "Hogwarts", description: "Seventh floor opposite Barnabas the Barmy. Becomes whatever the seeker truly needs.", hidden: ["Also called the Come and Go Room.", "Houses the lost Diadem of Ravenclaw.", "Burned by Fiendfyre in the final battle."], x: 70, y: 35 },
  { id: "chamber", name: "Chamber of Secrets", region: "Hogwarts", description: "Hidden beneath the second floor girls' bathroom. Built by Salazar Slytherin himself.", hidden: ["Only a Parselmouth can open it.", "Houses the giant Basilisk skeleton.", "Hermione opened it again in DH to retrieve fangs."], x: 50, y: 90 },
  { id: "forbidden-forest", name: "Forbidden Forest", region: "Hogwarts Grounds", description: "Dark woods home to centaurs, acromantulas, unicorns and thestrals.", hidden: ["Voldemort drank unicorn blood here.", "Aragog's colony numbered in the hundreds.", "The centaurs killed Umbridge's escort."], x: 80, y: 65 },
  { id: "diagon", name: "Diagon Alley", region: "London", description: "The wizarding shopping street, entered through the Leaky Cauldron.", hidden: ["The brick pattern to open the wall: three up, two across.", "Ollivanders has been making wands since 382 B.C."], x: 20, y: 30 },
  { id: "knockturn", name: "Knockturn Alley", region: "London", description: "Dark cousin of Diagon Alley. Borgin & Burkes sells cursed objects.", hidden: ["Harry accidentally ended up here via Floo in Year 2.", "Tom Riddle worked at Borgin & Burkes after Hogwarts."], x: 25, y: 40 },
  { id: "burrow", name: "The Burrow", region: "Ottery St Catchpole", description: "The ramshackle Weasley home, held up entirely by magic.", hidden: ["Has its own ghoul in the attic.", "Burned down by Death Eaters and rebuilt."], x: 15, y: 60 },
  { id: "grimmauld", name: "12 Grimmauld Place", region: "London", description: "Ancestral Black family home, headquarters of the Order of the Phoenix.", hidden: ["Hidden by the Fidelius Charm.", "Walburga Black's portrait screams at anyone passing."], x: 25, y: 20 },
  { id: "ministry", name: "Ministry of Magic", region: "London", description: "Vast underground government complex with the Atrium fountain and Department of Mysteries.", hidden: ["Entered through a London telephone booth: 6-2-4-4-2 (MAGIC).", "Houses the Hall of Prophecy with thousands of glowing orbs."], x: 20, y: 50 },
  { id: "hogsmeade", name: "Hogsmeade Village", region: "Scotland", description: "The only entirely non-Muggle settlement in Britain.", hidden: ["Honeydukes has a secret passage straight into Hogwarts.", "The Hog's Head is owned by Aberforth Dumbledore."], x: 75, y: 50 },
  { id: "azkaban", name: "Azkaban", region: "North Sea", description: "Wizarding prison guarded by Dementors on a remote island.", hidden: ["Sirius Black is the only known person to escape.", "Originally home to dark wizard Ekrizdis."], x: 90, y: 20 },
  { id: "godric", name: "Godric's Hollow", region: "West Country", description: "Birthplace of Godric Gryffindor; site of the Potters' death.", hidden: ["Bathilda Bagshot lived here.", "The Peverell brothers, Dumbledore's family, and the Potters all rest in the cemetery."], x: 10, y: 70 },
];
