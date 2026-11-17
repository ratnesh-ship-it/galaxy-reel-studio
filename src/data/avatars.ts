export type Avatar = { slug: string; name: string; category: string; description: string; image: string };
export const avatarCategories = ["Mahabharata", "Ramayana", "Indian Gods", "Greek", "Norse", "Egyptian", "Japanese", "Chinese", "World Legends", "Folk Heroes"] as const;
export const avatars: Avatar[] = [
  {
    "slug": "krishna",
    "name": "Krishna",
    "category": "Mahabharata",
    "description": "Divine guide with a peacock crown",
    "image": "/avatars/krishna.webp"
  },
  {
    "slug": "arjuna",
    "name": "Arjuna",
    "category": "Mahabharata",
    "description": "Legendary archer of the Gandiva",
    "image": "/avatars/arjuna.webp"
  },
  {
    "slug": "bhima",
    "name": "Bhima",
    "category": "Mahabharata",
    "description": "Mighty guardian with a mace",
    "image": "/avatars/bhima.webp"
  },
  {
    "slug": "karna",
    "name": "Karna",
    "category": "Mahabharata",
    "description": "Sun-born warrior in golden armor",
    "image": "/avatars/karna.webp"
  },
  {
    "slug": "draupadi",
    "name": "Draupadi",
    "category": "Mahabharata",
    "description": "Courageous queen of the Pandavas",
    "image": "/avatars/draupadi.webp"
  },
  {
    "slug": "bhishma",
    "name": "Bhishma",
    "category": "Mahabharata",
    "description": "Wise elder of unwavering resolve",
    "image": "/avatars/bhishma.webp"
  },
  {
    "slug": "abhimanyu",
    "name": "Abhimanyu",
    "category": "Mahabharata",
    "description": "Young hero of remarkable courage",
    "image": "/avatars/abhimanyu.webp"
  },
  {
    "slug": "duryodhana",
    "name": "Duryodhana",
    "category": "Mahabharata",
    "description": "Determined royal warrior",
    "image": "/avatars/duryodhana.webp"
  },
  {
    "slug": "drona",
    "name": "Drona",
    "category": "Mahabharata",
    "description": "Revered teacher of archery",
    "image": "/avatars/drona.webp"
  },
  {
    "slug": "eklavya",
    "name": "Eklavya",
    "category": "Mahabharata",
    "description": "Devoted self-taught archer",
    "image": "/avatars/eklavya.webp"
  },
  {
    "slug": "rama",
    "name": "Rama",
    "category": "Ramayana",
    "description": "Noble prince with a sacred bow",
    "image": "/avatars/rama.webp"
  },
  {
    "slug": "sita",
    "name": "Sita",
    "category": "Ramayana",
    "description": "Dignified queen of steadfast devotion",
    "image": "/avatars/sita.webp"
  },
  {
    "slug": "lakshmana",
    "name": "Lakshmana",
    "category": "Ramayana",
    "description": "Loyal guardian and skilled archer",
    "image": "/avatars/lakshmana.webp"
  },
  {
    "slug": "hanuman",
    "name": "Hanuman",
    "category": "Ramayana",
    "description": "Revered symbol of courage and devotion",
    "image": "/avatars/hanuman.webp"
  },
  {
    "slug": "ravana",
    "name": "Ravana",
    "category": "Ramayana",
    "description": "Learned king with a regal crown",
    "image": "/avatars/ravana.webp"
  },
  {
    "slug": "jatayu",
    "name": "Jatayu",
    "category": "Ramayana",
    "description": "Noble eagle guardian",
    "image": "/avatars/jatayu.webp"
  },
  {
    "slug": "vibhishana",
    "name": "Vibhishana",
    "category": "Ramayana",
    "description": "Wise king devoted to righteousness",
    "image": "/avatars/vibhishana.webp"
  },
  {
    "slug": "indrajit",
    "name": "Indrajit",
    "category": "Ramayana",
    "description": "Fearless prince and master warrior",
    "image": "/avatars/indrajit.webp"
  },
  {
    "slug": "shiva",
    "name": "Shiva",
    "category": "Indian Gods",
    "description": "Dignified deity with a crescent moon",
    "image": "/avatars/shiva.webp"
  },
  {
    "slug": "parvati",
    "name": "Parvati",
    "category": "Indian Gods",
    "description": "Revered goddess of the mountains",
    "image": "/avatars/parvati.webp"
  },
  {
    "slug": "ganesha",
    "name": "Ganesha",
    "category": "Indian Gods",
    "description": "Beloved elephant-headed deity",
    "image": "/avatars/ganesha.webp"
  },
  {
    "slug": "vishnu",
    "name": "Vishnu",
    "category": "Indian Gods",
    "description": "Crowned preserver with divine grace",
    "image": "/avatars/vishnu.webp"
  },
  {
    "slug": "durga",
    "name": "Durga",
    "category": "Indian Gods",
    "description": "Powerful guardian with a lion",
    "image": "/avatars/durga.webp"
  },
  {
    "slug": "kali",
    "name": "Kali",
    "category": "Indian Gods",
    "description": "Revered goddess of transformation",
    "image": "/avatars/kali.webp"
  },
  {
    "slug": "saraswati",
    "name": "Saraswati",
    "category": "Indian Gods",
    "description": "Goddess of wisdom with a veena",
    "image": "/avatars/saraswati.webp"
  },
  {
    "slug": "lakshmi",
    "name": "Lakshmi",
    "category": "Indian Gods",
    "description": "Lotus-bearing goddess of abundance",
    "image": "/avatars/lakshmi.webp"
  },
  {
    "slug": "kartikeya",
    "name": "Kartikeya",
    "category": "Indian Gods",
    "description": "Peacock-associated warrior deity",
    "image": "/avatars/kartikeya.webp"
  },
  {
    "slug": "indra",
    "name": "Indra",
    "category": "Indian Gods",
    "description": "Thunder-bearing celestial king",
    "image": "/avatars/indra.webp"
  },
  {
    "slug": "zeus",
    "name": "Zeus",
    "category": "Greek",
    "description": "Ancient king of thunder",
    "image": "/avatars/zeus.webp"
  },
  {
    "slug": "athena",
    "name": "Athena",
    "category": "Greek",
    "description": "Wise guardian with an owl",
    "image": "/avatars/athena.webp"
  },
  {
    "slug": "poseidon",
    "name": "Poseidon",
    "category": "Greek",
    "description": "Sovereign of the sea with a trident",
    "image": "/avatars/poseidon.webp"
  },
  {
    "slug": "apollo",
    "name": "Apollo",
    "category": "Greek",
    "description": "Laurel-crowned deity of light",
    "image": "/avatars/apollo.webp"
  },
  {
    "slug": "artemis",
    "name": "Artemis",
    "category": "Greek",
    "description": "Moonlit guardian with a bow",
    "image": "/avatars/artemis.webp"
  },
  {
    "slug": "hermes",
    "name": "Hermes",
    "category": "Greek",
    "description": "Winged messenger and traveler",
    "image": "/avatars/hermes.webp"
  },
  {
    "slug": "hades",
    "name": "Hades",
    "category": "Greek",
    "description": "Dignified sovereign of the underworld",
    "image": "/avatars/hades.webp"
  },
  {
    "slug": "odysseus",
    "name": "Odysseus",
    "category": "Greek",
    "description": "Resourceful voyager of legend",
    "image": "/avatars/odysseus.webp"
  },
  {
    "slug": "achilles",
    "name": "Achilles",
    "category": "Greek",
    "description": "Renowned hero in bronze armor",
    "image": "/avatars/achilles.webp"
  },
  {
    "slug": "odin",
    "name": "Odin",
    "category": "Norse",
    "description": "One-eyed seeker of wisdom",
    "image": "/avatars/odin.webp"
  },
  {
    "slug": "thor",
    "name": "Thor",
    "category": "Norse",
    "description": "Red-bearded bearer of the mythic hammer",
    "image": "/avatars/thor.webp"
  },
  {
    "slug": "loki",
    "name": "Loki",
    "category": "Norse",
    "description": "Clever Norse shape-shifter",
    "image": "/avatars/loki.webp"
  },
  {
    "slug": "freyja",
    "name": "Freyja",
    "category": "Norse",
    "description": "Falcon-cloaked goddess of grace",
    "image": "/avatars/freyja.webp"
  },
  {
    "slug": "heimdall",
    "name": "Heimdall",
    "category": "Norse",
    "description": "Watchful guardian with a great horn",
    "image": "/avatars/heimdall.webp"
  },
  {
    "slug": "tyr",
    "name": "Tyr",
    "category": "Norse",
    "description": "Courageous guardian of justice",
    "image": "/avatars/tyr.webp"
  },
  {
    "slug": "ra",
    "name": "Ra",
    "category": "Egyptian",
    "description": "Falcon-headed solar deity",
    "image": "/avatars/ra.webp"
  },
  {
    "slug": "anubis",
    "name": "Anubis",
    "category": "Egyptian",
    "description": "Jackal-headed guardian",
    "image": "/avatars/anubis.webp"
  },
  {
    "slug": "horus",
    "name": "Horus",
    "category": "Egyptian",
    "description": "Crowned falcon deity of kingship",
    "image": "/avatars/horus.webp"
  },
  {
    "slug": "isis",
    "name": "Isis",
    "category": "Egyptian",
    "description": "Revered goddess with a throne crown",
    "image": "/avatars/isis.webp"
  },
  {
    "slug": "thoth",
    "name": "Thoth",
    "category": "Egyptian",
    "description": "Ibis-headed keeper of knowledge",
    "image": "/avatars/thoth.webp"
  },
  {
    "slug": "bastet",
    "name": "Bastet",
    "category": "Egyptian",
    "description": "Graceful feline guardian",
    "image": "/avatars/bastet.webp"
  },
  {
    "slug": "amaterasu",
    "name": "Amaterasu",
    "category": "Japanese",
    "description": "Radiant goddess of the sun",
    "image": "/avatars/amaterasu.webp"
  },
  {
    "slug": "susanoo",
    "name": "Susanoo",
    "category": "Japanese",
    "description": "Legendary guardian of storms",
    "image": "/avatars/susanoo.webp"
  },
  {
    "slug": "raijin",
    "name": "Raijin",
    "category": "Japanese",
    "description": "Traditional thunder deity with drums",
    "image": "/avatars/raijin.webp"
  },
  {
    "slug": "kitsune",
    "name": "Kitsune",
    "category": "Japanese",
    "description": "Enigmatic fox spirit",
    "image": "/avatars/kitsune.webp"
  },
  {
    "slug": "sun-wukong",
    "name": "Sun Wukong",
    "category": "Chinese",
    "description": "Resourceful monkey king with a staff",
    "image": "/avatars/sun-wukong.webp"
  },
  {
    "slug": "nezha",
    "name": "Nezha",
    "category": "Chinese",
    "description": "Lotus-associated youthful guardian",
    "image": "/avatars/nezha.webp"
  },
  {
    "slug": "chang-e",
    "name": "Chang'e",
    "category": "Chinese",
    "description": "Dignified goddess of the moon",
    "image": "/avatars/chang-e.webp"
  },
  {
    "slug": "guan-yu",
    "name": "Guan Yu",
    "category": "Chinese",
    "description": "Bearded guardian of loyalty",
    "image": "/avatars/guan-yu.webp"
  },
  {
    "slug": "gilgamesh",
    "name": "Gilgamesh",
    "category": "World Legends",
    "description": "Ancient king of heroic quests",
    "image": "/avatars/gilgamesh.webp"
  },
  {
    "slug": "ishtar",
    "name": "Ishtar",
    "category": "World Legends",
    "description": "Star-crowned goddess of legend",
    "image": "/avatars/ishtar.webp"
  },
  {
    "slug": "simurgh",
    "name": "Simurgh",
    "category": "World Legends",
    "description": "Majestic bird of Persian lore",
    "image": "/avatars/simurgh.webp"
  },
  {
    "slug": "merlin",
    "name": "Merlin",
    "category": "World Legends",
    "description": "Wise wizard with a silver beard",
    "image": "/avatars/merlin.webp"
  },
  {
    "slug": "the-morrigan",
    "name": "The Morrigan",
    "category": "World Legends",
    "description": "Raven-associated queen of legend",
    "image": "/avatars/the-morrigan.webp"
  },
  {
    "slug": "cu-chulainn",
    "name": "Cú Chulainn",
    "category": "World Legends",
    "description": "Courageous hero of Irish lore",
    "image": "/avatars/cu-chulainn.webp"
  },
  {
    "slug": "quetzalcoatl",
    "name": "Quetzalcoatl",
    "category": "World Legends",
    "description": "Revered feathered serpent deity",
    "image": "/avatars/quetzalcoatl.webp"
  },
  {
    "slug": "tlaloc",
    "name": "Tlaloc",
    "category": "World Legends",
    "description": "Traditional deity of rain",
    "image": "/avatars/tlaloc.webp"
  },
  {
    "slug": "anansi",
    "name": "Anansi",
    "category": "World Legends",
    "description": "Wise storyteller with a spider motif",
    "image": "/avatars/anansi.webp"
  },
  {
    "slug": "shango",
    "name": "Shango",
    "category": "World Legends",
    "description": "Revered thunder king",
    "image": "/avatars/shango.webp"
  },
  {
    "slug": "paul-bunyan",
    "name": "Paul Bunyan",
    "category": "Folk Heroes",
    "description": "Legendary lumberjack with an axe",
    "image": "/avatars/paul-bunyan.webp"
  },
  {
    "slug": "john-henry",
    "name": "John Henry",
    "category": "Folk Heroes",
    "description": "Legendary steel driver with a hammer",
    "image": "/avatars/john-henry.webp"
  }
];
export const explorerAvatar: Avatar = {"slug": "explorer", "name": "Explorer", "category": "World Legends", "description": "An astronaut exploring new creative worlds", "image": "/avatars/explorer.webp"};
export function getAvatar(slug: string | null | undefined): Avatar { return avatars.find(a => a.slug === slug) ?? explorerAvatar; }
export function avatarThumbnail(slug: string) { return `/avatars/thumbs/${getAvatar(slug).slug}.webp`; }
