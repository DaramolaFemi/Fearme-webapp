import poem0 from "../content/poetry/the-boy-who-writes";
import poem1 from "../content/poetry/bones-and-flowers";
import poem2 from "../content/poetry/dreams";
import poem3 from "../content/poetry/he-took-the-one-i-wed";
import poem4 from "../content/poetry/good-mourning";
import poem5 from "../content/poetry/a-graveyard-for-lovers";
import poem6 from "../content/poetry/a-minutes-silence";

export type Publication = { label: string; href?: string };

export type PoemAtmosphereConfig = {
  artwork: "bone-botanical";
  elements: Array<"botanical" | "petals">;
  intensity: number;
  motion: "drift" | "still";
  petalCount?: number;
};

export type Poem = {
  id: string;
  title: string;
  slug: string;
  year: number;
  form?: string;
  stanzas: string[];
  publication?: Publication;
  atmosphere?: PoemAtmosphereConfig;
};

export const poems: Poem[] = [
  {
    id: "01",
    title: "The Boy Who Writes",
    slug: "the-boy-who-writes",
    year: 2026,
    publication: {
      label: "First published on GitHub, 2026.",
      href: "https://github.com/DaramolaFemi/Poetry",
    },
    stanzas: poem0,
  },
  {
    id: "02",
    title: "Bones and Flowers",
    slug: "bones-and-flowers",
    year: 2026,
    atmosphere: {
      artwork: "bone-botanical",
      elements: ["botanical", "petals"],
      intensity: 0.78,
      motion: "drift",
      petalCount: 5,
    },
    stanzas: poem1,
  },
  { id: "03", title: "Dreams", slug: "dreams", year: 2023, stanzas: poem2 },
  {
    id: "04",
    title: "He Took the One I Wed",
    slug: "he-took-the-one-i-wed",
    year: 2019,
    form: "Dirge",
    publication: { label: "First published in WSA Magazine, November 2020." },
    stanzas: poem3,
  },
  {
    id: "05",
    title: "Good Mo(u)rning.",
    slug: "good-mourning",
    year: 2023,
    stanzas: poem4,
  },
  {
    id: "06",
    title: "A Graveyard for Lovers",
    slug: "a-graveyard-for-lovers",
    year: 2026,
    stanzas: poem5,
  },
  {
    id: "07",
    title: "A Minute's Silence",
    slug: "a-minutes-silence",
    year: 2024,
    stanzas: poem6,
  },
];
