export type Fact = {
  id: string;
  title: string;
  category: "Book-Only" | "Removed Scene" | "Hidden Lore" | "Missing Character" | "Deleted Storyline" | "Tiny Detail";
  body: string;
};

export const facts: Fact[] = [
  { id: "f1", title: "Peeves Doesn't Exist in the Films", category: "Missing Character", body: "Rik Mayall actually filmed scenes as Peeves for Philosopher's Stone — all of them were cut. Peeves never appears in any film despite being a major part of the school's chaos." },
  { id: "f2", title: "Harry Repairs the Elder Wand", category: "Removed Scene", body: "In the book, Harry uses the Elder Wand to repair his broken holly wand and then returns the Elder Wand to Dumbledore's tomb. The film has him snap it in half and throw it off a bridge — an act book-Harry would never commit." },
  { id: "f3", title: "Dumbledore is Furious in Goblet of Fire", category: "Tiny Detail", body: "The film's 'Did you put your name in the Goblet of Fire?!' shouting scene is famously OOC. In the book Dumbledore asks Harry 'calmly' — that single word changes everything." },
  { id: "f4", title: "Voldemort's Final Death is Mundane", category: "Book-Only", body: "In the book Voldemort dies from a rebounding Killing Curse and falls dead like an ordinary man — no dramatic disintegration. Harry then walks over and tucks the Elder Wand away as students watch in stunned silence." },
  { id: "f5", title: "S.P.E.W.", category: "Deleted Storyline", body: "Hermione's entire campaign for elf rights — knitting hats, leaving them around the common room, founding the Society for the Promotion of Elfish Welfare — is cut from every film." },
  { id: "f6", title: "Hermione's Parents", category: "Removed Scene", body: "Hermione modifies her parents' memories so they forget she exists and move to Australia, to protect them from Voldemort. The films skip this devastating sacrifice entirely." },
  { id: "f7", title: "Dumbledore's Funeral", category: "Removed Scene", body: "The book features a moving funeral with centaurs firing arrows, merpeople singing from the lake, and a phoenix-shaped fire. The film cuts straight to wand-raising — beautiful but much shorter." },
  { id: "f8", title: "The Quidditch World Cup", category: "Book-Only", body: "The opening of Goblet of Fire features the legendary Ireland-vs-Bulgaria final with Krum's Wronski Feint. The film skips the entire match and shows only the arrival." },
  { id: "f9", title: "Ginny is Actually Funny", category: "Tiny Detail", body: "Book-Ginny is a witty firecracker who hexes bullies and dates around. Film-Ginny barely speaks and feeds Harry shoelaces — fans never forgave it." },
  { id: "f10", title: "Trelawney's Second Prophecy", category: "Book-Only", body: "Trelawney made two real prophecies. The second, about Wormtail returning to his master, is delivered to Harry alone in a tea shop — and never reaches the film." },
  { id: "f11", title: "Voldemort's True Origin", category: "Hidden Lore", body: "Voldemort cannot feel love because his mother Merope conceived him while feeding his Muggle father a love potion. He was, quite literally, born of false love." },
  { id: "f12", title: "Dumbledore Was In Love", category: "Hidden Lore", body: "J.K. Rowling confirmed that Dumbledore loved Gellert Grindelwald, the dark wizard he eventually defeated in 1945. It haunts him for the rest of his life." },
  { id: "f13", title: "Harry Names His Owl After a Witch in His History Book", category: "Tiny Detail", body: "Hedwig is named after Saint Hedwig — Harry chose the name from 'A History of Magic'. A small but lovely detail the films skip." },
  { id: "f14", title: "Tonks's Patronus Changes", category: "Hidden Lore", body: "Tonks's Patronus changes from a Jack Russell to a wolf after she falls in love with Remus Lupin — a wolf because of his lycanthropy. The films never explain this." },
  { id: "f15", title: "Neville Marries Hannah Abbott", category: "Hidden Lore", body: "Neville becomes Herbology professor and marries Hannah Abbott, who becomes landlady of the Leaky Cauldron. The pair live above the pub." },
  { id: "f16", title: "Kreacher's Heroism", category: "Deleted Storyline", body: "Kreacher reveals the heartbreaking story of Regulus Black's death in the cave — and leads the house-elves into the Battle of Hogwarts crying 'Fight! Fight! Fight for my master, defender of house-elves!'" },
  { id: "f17", title: "Snape Could Fly", category: "Tiny Detail", body: "Snape could fly without a broom — a skill he learned from Voldemort. It's mentioned once in Deathly Hallows when he escapes Hogwarts." },
  { id: "f18", title: "The Real R.A.B.", category: "Hidden Lore", body: "Regulus Arcturus Black sacrificed himself to steal Slytherin's locket from the cave Horcrux. He was killed by Inferi after telling Kreacher to destroy it." },
  { id: "f19", title: "Harry's Eyes", category: "Tiny Detail", body: "Every character notes Harry has his mother's eyes — bright, almond-shaped, green. Daniel Radcliffe has blue eyes and the contact lenses gave him reactions, so the film simply ignored it." },
  { id: "f20", title: "Voldemort Has a Daughter", category: "Hidden Lore", body: "In 'Harry Potter and the Cursed Child', Bellatrix and Voldemort have a daughter named Delphini, born in secret at Malfoy Manor before the Battle of Hogwarts." },
  { id: "f21", title: "Sir Cadogan", category: "Missing Character", body: "The deranged knight who challenges everyone to duels and temporarily guards Gryffindor Tower after the Fat Lady is attacked — entirely cut from Prisoner of Azkaban." },
  { id: "f22", title: "Winky the House-Elf", category: "Missing Character", body: "Crouch's loyal house-elf, key to the entire plot of Goblet of Fire, is removed from the film — making Barty Crouch Jr's escape from Azkaban inexplicable." },
  { id: "f23", title: "Voldemort's Body Falls", category: "Tiny Detail", body: "When Voldemort dies in the books, his body is laid in a side chamber away from the cheering — Rowling refused to glorify his death." },
  { id: "f24", title: "Trelawney Throws Sherry Bottles", category: "Tiny Detail", body: "During the Battle of Hogwarts, Trelawney drops crystal balls on the heads of Death Eaters from above. The films don't show her fighting at all." },
];
