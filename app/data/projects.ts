export interface Project {
  slug: string;
  title: string;
  brand: "BMW" | "VAG";
  coverImage: string;
  gallery: string[];
  description: string;
  specs: {
    engine: string;
    power: string;
    suspension: string;
    wheels: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "g82-m4-track-prep",
    title: "G82 M4 Clubsport",
    brand: "BMW",
    coverImage: "/images/project_bmw.png",
    gallery: [
      "/images/project_bmw.png",
      "/images/hero.png",
      "/images/product_fitting.png"
    ],
    description: "A comprehensive track-oriented build designed to dominate the Nürburgring while maintaining street usability. We stripped the interior, fitted a half-cage, and completely rehauled the suspension geometry.",
    specs: {
      engine: "S58 3.0L Twin-Turbo",
      power: "620 HP / 750 Nm",
      suspension: "KW Clubsport 3-Way",
      wheels: "Protrack One 18x10.5J"
    }
  },
  {
    slug: "8v-rs3-fast-road",
    title: "8V RS3 Fast Road",
    brand: "VAG",
    coverImage: "/images/project_vag.png",
    gallery: [
      "/images/project_vag.png",
      "/images/hero.png",
      "/images/product_fitting.png"
    ],
    description: "The ultimate daily driver. We addressed the inherent understeer of the MQB platform while pushing the legendary 2.5 TFSI engine to a reliable 550 horsepower with a hybrid turbo setup.",
    specs: {
      engine: "2.5 TFSI DAZA",
      power: "550 HP / 680 Nm",
      suspension: "Bilstein B16",
      wheels: "OZ Racing Ultraleggera 19x8.5J"
    }
  },
  {
    slug: "f87-m2-comp",
    title: "F87 M2 Competition",
    brand: "BMW",
    coverImage: "/images/project_bmw.png",
    gallery: [
      "/images/project_bmw.png",
      "/images/hero.png"
    ],
    description: "Focused on sharpening the already excellent F87 chassis. Upgraded cooling systems, bespoke alignment, and lightweight body panels for a visceral driving experience.",
    specs: {
      engine: "S55 3.0L Twin-Turbo",
      power: "510 HP / 650 Nm",
      suspension: "Ohlins Road & Track",
      wheels: "Apex ARC-8 19x9.5J"
    }
  }
];
