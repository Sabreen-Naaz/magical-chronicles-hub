export type MagicalObject = {
  id: string;
  name: string;
  history: string;
  owners: string[];
  importance: string;
};

export const magicalObjects: MagicalObject[] = [
  { id: "elder-wand", name: "The Elder Wand", history: "One of the three Deathly Hallows, said to be made by Death himself. The most powerful wand ever created.", owners: ["Antioch Peverell", "Gellert Grindelwald", "Albus Dumbledore", "Draco Malfoy", "Harry Potter"], importance: "Mastery passes by defeating the previous owner — not by violence necessarily." },
  { id: "cloak", name: "Cloak of Invisibility", history: "The only true Cloak of Invisibility, passed from father to son in the Potter line. One of the three Hallows.", owners: ["Ignotus Peverell", "James Potter", "Harry Potter"], importance: "Unlike enchanted cloaks, it never fades and hides the wearer from all magic." },
  { id: "stone", name: "Resurrection Stone", history: "The third Hallow. Set into a ring by Marvolo Gaunt and later made a Horcrux by Voldemort.", owners: ["Cadmus Peverell", "Marvolo Gaunt", "Tom Riddle", "Dumbledore", "Harry Potter (briefly)"], importance: "Brings back shades of the dead — but they are not truly alive, and it drives users mad." },
  { id: "marauders-map", name: "The Marauder's Map", history: "Created by Moony, Wormtail, Padfoot, and Prongs during their Hogwarts years.", owners: ["The Marauders", "Filch (briefly)", "Fred & George", "Harry Potter"], importance: "Shows every person inside Hogwarts in real time, including secret passages." },
  { id: "diary", name: "Tom Riddle's Diary", history: "Voldemort's first Horcrux, made after he killed Myrtle Warren.", owners: ["Tom Riddle", "Lucius Malfoy", "Ginny Weasley", "Harry Potter"], importance: "Destroyed by Harry with a Basilisk fang." },
  { id: "locket", name: "Slytherin's Locket", history: "Heirloom of Salazar Slytherin, hidden in a sea cave by Voldemort.", owners: ["Salazar Slytherin", "Merope Gaunt", "Tom Riddle", "Regulus Black", "Kreacher", "Mundungus Fletcher", "Umbridge"], importance: "A Horcrux destroyed by Ron with the Sword of Gryffindor." },
  { id: "diadem", name: "Ravenclaw's Diadem", history: "Lost diadem of Rowena Ravenclaw, hidden in the Room of Requirement by Voldemort.", owners: ["Rowena Ravenclaw", "Helena Ravenclaw", "Tom Riddle"], importance: "A Horcrux destroyed by Crabbe's Fiendfyre and finished by Harry." },
  { id: "cup", name: "Hufflepuff's Cup", history: "Stolen from Hepzibah Smith by Tom Riddle, who then murdered her.", owners: ["Helga Hufflepuff", "Hepzibah Smith", "Tom Riddle", "Bellatrix"], importance: "A Horcrux destroyed by Hermione with a Basilisk fang in the Chamber of Secrets." },
  { id: "sword", name: "Sword of Gryffindor", history: "Goblin-made by Ragnuk the First, claimed by Godric Gryffindor.", owners: ["Godric Gryffindor", "Harry", "Ron", "Neville"], importance: "Imbibes anything that strengthens it — including Basilisk venom. Only a true Gryffindor can pull it from the Sorting Hat." },
  { id: "mirror", name: "Mirror of Erised", history: "An ancient mirror that shows the deepest desire of the heart.", owners: ["Unknown maker", "Hogwarts"], importance: "Dumbledore: 'Men have wasted away before it, even gone mad.' Harry sees his family." },
  { id: "time-turner", name: "Time-Turner", history: "Ministry-controlled hourglasses that turn back time by hours.", owners: ["Hermione Granger", "Department of Mysteries"], importance: "All Time-Turners were destroyed in the Battle of the Department of Mysteries." },
  { id: "pensieve", name: "The Pensieve", history: "An ancient stone basin used to view memories outside the mind.", owners: ["Dumbledore (at Hogwarts)"], importance: "Allows others to relive memories in three dimensions." },
];
