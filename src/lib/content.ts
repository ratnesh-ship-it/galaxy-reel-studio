import film from "@/assets/tile-film.jpg";
import product from "@/assets/tile-product.jpg";
import fashion from "@/assets/tile-fashion.jpg";
import music from "@/assets/tile-music.jpg";
import animation from "@/assets/tile-animation.jpg";
import short from "@/assets/tile-short.jpg";

export const universe = [
  { title: "AI Films", desc: "Commercials, short films and storytelling.", img: film },
  { title: "AI Advertisements", desc: "High-impact visual brand campaigns.", img: product },
  { title: "AI Visual Art", desc: "Product visuals and creative imagery.", img: music },
  { title: "AI Animation", desc: "Characters, motion graphics and digital worlds.", img: animation },
  { title: "AI Influencer Content", desc: "AI-powered personalities and campaigns.", img: fashion },
  { title: "AI Product Commercials", desc: "Innovative product storytelling.", img: short },
];

export const showcase = [
  { cat: "AI Brand Films", title: "Ringed Horizon", img: film },
  { cat: "AI Product Commercials", title: "Entropy — Eau de Parfum", img: product },
  { cat: "AI Fashion Films", title: "Chrome Orbit", img: fashion },
  { cat: "AI Music Videos", title: "Portal Frequencies", img: music },
  { cat: "AI Short Films", title: "Earthrise", img: short },
  { cat: "AI Storytelling", title: "Little Explorer", img: animation },
];

export const creators = [
  { name: "Aria Voss", spec: "AI Filmmaker", city: "Berlin", img: film },
  { name: "Kenji Mora", spec: "AI Ad Creator", city: "Tokyo", img: product },
  { name: "Lina Okafor", spec: "AI Visual Artist", city: "Lagos", img: fashion },
  { name: "Dev Raman", spec: "AI Creative Director", city: "Mumbai", img: music },
  { name: "Sofia Reyes", spec: "AI Animator", city: "Madrid", img: animation },
  { name: "Noah Kim", spec: "AI Video Editor", city: "Seoul", img: short },
];

export const specialities = ["AI Filmmaker", "AI Ad Creator", "AI Video Editor", "AI Visual Artist", "AI Animator", "AI Creative Director"];
