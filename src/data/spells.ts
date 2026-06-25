export type Spell = {
  id: string;
  name: string;
  pronunciation: string;
  type: "Charm" | "Curse" | "Jinx" | "Hex" | "Transfiguration" | "Counter-Spell" | "Healing";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Forbidden";
  effect: string;
  usage: string;
  notable: string[];
};

export const spells: Spell[] = [
  { id: "expelliarmus", name: "Expelliarmus", pronunciation: "ex-PEL-ee-AR-mus", type: "Charm", difficulty: "Beginner", effect: "Disarms an opponent by forcing whatever they're holding to fly away.", usage: "Harry's signature spell.", notable: ["Harry Potter", "Snape"] },
  { id: "expecto", name: "Expecto Patronum", pronunciation: "ex-PEK-toh pa-TROH-num", type: "Charm", difficulty: "Advanced", effect: "Conjures a Patronus, the only defense against Dementors.", usage: "Requires the wizard's happiest memory.", notable: ["Harry", "Lupin", "Snape", "Dumbledore"] },
  { id: "lumos", name: "Lumos", pronunciation: "LOO-mos", type: "Charm", difficulty: "Beginner", effect: "Creates a beam of light from the wand tip.", usage: "Used in dark places. Cancelled with Nox.", notable: ["Everyone"] },
  { id: "nox", name: "Nox", pronunciation: "NOX", type: "Counter-Spell", difficulty: "Beginner", effect: "Extinguishes the Lumos light.", usage: "Counter-charm to Lumos.", notable: ["Everyone"] },
  { id: "alohomora", name: "Alohomora", pronunciation: "al-LOH-ha-MOR-ah", type: "Charm", difficulty: "Beginner", effect: "Unlocks doors and windows.", usage: "First learned in Charms class.", notable: ["Hermione"] },
  { id: "wingardium", name: "Wingardium Leviosa", pronunciation: "win-GAR-dee-um lev-ee-OH-sa", type: "Charm", difficulty: "Beginner", effect: "Levitates objects.", usage: "It's leviOsa, not levioSA.", notable: ["Hermione", "Ron"] },
  { id: "accio", name: "Accio", pronunciation: "AK-ee-oh", type: "Charm", difficulty: "Intermediate", effect: "Summons an object to the caster.", usage: "Harry used it to summon his Firebolt during the First Task.", notable: ["Harry", "Hermione", "Molly"] },
  { id: "stupefy", name: "Stupefy", pronunciation: "STOO-puh-fye", type: "Charm", difficulty: "Intermediate", effect: "Renders the target unconscious.", usage: "Standard duelling stunner.", notable: ["Order of the Phoenix"] },
  { id: "protego", name: "Protego", pronunciation: "pro-TAY-goh", type: "Charm", difficulty: "Intermediate", effect: "Creates a shield that deflects most spells.", usage: "Defensive cornerstone of the DA.", notable: ["Harry", "Hermione"] },
  { id: "avada", name: "Avada Kedavra", pronunciation: "ah-VAH-dah keh-DAV-rah", type: "Curse", difficulty: "Forbidden", effect: "Instant death. No counter-curse exists.", usage: "One of the three Unforgivable Curses.", notable: ["Voldemort", "Bellatrix", "Snape"] },
  { id: "crucio", name: "Crucio", pronunciation: "KROO-see-oh", type: "Curse", difficulty: "Forbidden", effect: "Inflicts unbearable pain.", usage: "Unforgivable. You must truly want to cause pain.", notable: ["Bellatrix"] },
  { id: "imperio", name: "Imperio", pronunciation: "im-PEER-ee-oh", type: "Curse", difficulty: "Forbidden", effect: "Gives the caster total control over the target.", usage: "Unforgivable. Harry can resist it.", notable: ["Voldemort", "Barty Crouch Jr"] },
  { id: "sectumsempra", name: "Sectumsempra", pronunciation: "sec-tum-SEM-prah", type: "Curse", difficulty: "Advanced", effect: "Slashes the victim as if cut by an invisible sword.", usage: "Invented by Severus Snape. Only Snape knows the counter-song.", notable: ["Snape", "Harry (accidentally)"] },
  { id: "obliviate", name: "Obliviate", pronunciation: "oh-BLI-vee-ate", type: "Charm", difficulty: "Advanced", effect: "Erases specific memories.", usage: "Used on Muggles who witness magic.", notable: ["Hermione", "Lockhart (badly)"] },
  { id: "riddikulus", name: "Riddikulus", pronunciation: "ri-di-KUL-us", type: "Charm", difficulty: "Beginner", effect: "Forces a Boggart to take a humorous form.", usage: "Defense Against the Dark Arts third-year curriculum.", notable: ["Lupin"] },
  { id: "reparo", name: "Reparo", pronunciation: "reh-PAH-roh", type: "Charm", difficulty: "Beginner", effect: "Repairs broken objects.", usage: "Hermione mended Harry's glasses constantly.", notable: ["Hermione"] },
  { id: "muffliato", name: "Muffliato", pronunciation: "muf-lee-AH-toh", type: "Charm", difficulty: "Intermediate", effect: "Fills nearby ears with a buzzing sound so conversations cannot be overheard.", usage: "Invented by Snape; used by the trio constantly in DH.", notable: ["Snape", "Harry"] },
  { id: "fiendfyre", name: "Fiendfyre", pronunciation: "FEEND-fyre", type: "Curse", difficulty: "Forbidden", effect: "Cursed fire that takes the form of beasts and devours everything.", usage: "Can destroy Horcruxes. Almost impossible to control.", notable: ["Crabbe"] },
  { id: "morsmordre", name: "Morsmordre", pronunciation: "morz-MOR-druh", type: "Curse", difficulty: "Advanced", effect: "Conjures the Dark Mark in the sky.", usage: "Used by Death Eaters after a kill.", notable: ["Death Eaters"] },
  { id: "aguamenti", name: "Aguamenti", pronunciation: "AH-gwa-MEN-tee", type: "Charm", difficulty: "Intermediate", effect: "Produces a jet of clear water from the wand.", usage: "Dumbledore used it in the cave.", notable: ["Dumbledore", "Harry"] },
  { id: "incendio", name: "Incendio", pronunciation: "in-SEN-dee-oh", type: "Charm", difficulty: "Beginner", effect: "Conjures fire.", usage: "Used to light fireplaces and burn things.", notable: ["Many"] },
  { id: "petrificus", name: "Petrificus Totalus", pronunciation: "pe-TRI-fi-cus to-TAH-lus", type: "Hex", difficulty: "Beginner", effect: "Body-Bind: locks limbs against the body.", usage: "Hermione used it on Neville in Year 1.", notable: ["Hermione"] },
  { id: "tarantallegra", name: "Tarantallegra", pronunciation: "tah-RAN-tah-LEG-rah", type: "Jinx", difficulty: "Beginner", effect: "Forces the victim's legs to dance uncontrollably.", usage: "Used in the Duelling Club.", notable: ["Malfoy"] },
  { id: "confundo", name: "Confundo", pronunciation: "kon-FUN-doh", type: "Charm", difficulty: "Intermediate", effect: "Confuses the target.", usage: "Hermione used it on Cormac McLaggen at Quidditch trials.", notable: ["Hermione"] },
  { id: "episkey", name: "Episkey", pronunciation: "eh-PISS-key", type: "Healing", difficulty: "Intermediate", effect: "Heals minor injuries like broken noses.", usage: "Tonks fixed Harry's nose with it.", notable: ["Tonks"] },
  { id: "anapneo", name: "Anapneo", pronunciation: "ah-NAP-nee-oh", type: "Healing", difficulty: "Intermediate", effect: "Clears the airway of a choking victim.", usage: "Slughorn used it on Marcus Belby.", notable: ["Slughorn"] },
  { id: "serpensortia", name: "Serpensortia", pronunciation: "ser-pen-SOR-tee-ah", type: "Transfiguration", difficulty: "Intermediate", effect: "Conjures a serpent.", usage: "Malfoy used it in the Duelling Club.", notable: ["Draco"] },
  { id: "homenum-revelio", name: "Homenum Revelio", pronunciation: "HO-men-um re-VEL-ee-oh", type: "Charm", difficulty: "Advanced", effect: "Reveals the presence of humans nearby.", usage: "Used in the search for hidden people.", notable: ["Hermione", "Snape"] },
  { id: "geminio", name: "Geminio", pronunciation: "je-MIN-ee-oh", type: "Charm", difficulty: "Advanced", effect: "Duplicates an object.", usage: "Bellatrix cursed her vault to multiply everything touched.", notable: ["Bellatrix"] },
  { id: "piertotum", name: "Piertotum Locomotor", pronunciation: "PEER-toh-tum loh-koh-MOH-tor", type: "Charm", difficulty: "Advanced", effect: "Animates statues and suits of armor to defend a place.", usage: "McGonagall used it to defend Hogwarts.", notable: ["McGonagall"] },
];
