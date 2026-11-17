// Swap these placeholder tiles for real work: set `image` (and optional `video` URL).
import film from "@/assets/tile-film.jpg";
import product from "@/assets/tile-product.jpg";
import fashion from "@/assets/tile-fashion.jpg";
import music from "@/assets/tile-music.jpg";
import animation from "@/assets/tile-animation.jpg";
import short from "@/assets/tile-short.jpg";
import hero from "@/assets/hero-astronaut.jpg";
import nebula from "@/assets/nebula.jpg";

export const showcaseCategories = ["AI Brand Films", "AI Product Commercials", "AI Fashion Films", "AI Music Videos", "AI Short Films", "AI Storytelling"] as const;

export type ShowcaseItem = { id: string; category: (typeof showcaseCategories)[number]; creator: string; image: string; video?: string; ratio: "16:9" | "9:16" };

export const showcase: ShowcaseItem[] = [
  { id: "1", category: "AI Brand Films", creator: "Creator name", image: hero, ratio: "16:9" },
  { id: "2", category: "AI Product Commercials", creator: "Creator name", image: product, ratio: "9:16" },
  { id: "3", category: "AI Fashion Films", creator: "Creator name", image: fashion, ratio: "9:16" },
  { id: "4", category: "AI Short Films", creator: "Creator name", image: short, ratio: "9:16" },
  { id: "5", category: "AI Music Videos", creator: "Creator name", image: music, ratio: "16:9" },
  { id: "6", category: "AI Storytelling", creator: "Creator name", image: animation, ratio: "9:16" },
  { id: "7", category: "AI Brand Films", creator: "Creator name", image: film, ratio: "9:16" },
  { id: "8", category: "AI Short Films", creator: "Creator name", image: nebula, ratio: "16:9" },
];

export const universe = [
  { n: "01", title: "AI Films", desc: "Commercials, short films and storytelling.", image: film },
  { n: "02", title: "AI Ads", desc: "High-impact visual brand campaigns.", image: product },
  { n: "03", title: "AI Visual Art", desc: "Product visuals and creative imagery.", image: music },
  { n: "04", title: "AI Animation", desc: "Characters, motion graphics and digital worlds.", image: animation },
  { n: "05", title: "AI Influencers", desc: "AI-powered personalities and campaigns.", image: fashion },
  { n: "06", title: "AI Commercials", desc: "Innovative product storytelling.", image: short },
];
