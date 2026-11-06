import loveLettersToGrief from "../content/poetry/love-letters-to-grief";
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
  seoDescription: string;
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
    seoDescription:
      "The Boy Who Writes, a poem by Daramola Femi about a young writer caught between poetry, code, survival, memory, and the life he might have lived.",
    publication: {
      label: "First published on GitHub, 2026.",
      href: "https://github.com/DaramolaFemi/Poetry",
    },
    stanzas: poem0,
  },
  {
    id: "02",
    title: "Love Letters to Grief",
    slug: "love-letters-to-grief",
    year: 2026,
    seoDescription:
      "Love Letters to Grief, a five-part poem by Daramola Femi about separation, handwritten promises, bargaining with loss, and learning to let the gone remain gone.",
    publication: { label: "October 2026." },
    stanzas: loveLettersToGrief,
  },
  {
    id: "03",
    title: "Bones and Flowers",
    slug: "bones-and-flowers",
    year: 2026,
    seoDescription:
      "Bones and Flowers, a poem by Daramola Femi about love surviving burial, memory held in the body, and tenderness blooming from death and decay.",
    atmosphere: {
      artwork: "bone-botanical",
      elements: ["botanical", "petals"],
      intensity: 0.78,
      motion: "drift",
      petalCount: 5,
    },
    stanzas: poem1,
  },
  {
    id: "04",
    title: "Dreams",
    slug: "dreams",
    year: 2023,
    seoDescription:
      "Dreams, a short poem by Daramola Femi about a child, an unrealised future, and the devastating distance between hope and survival.",
    stanzas: poem2,
  },
  {
    id: "05",
    title: "He Took the One I Wed",
    slug: "he-took-the-one-i-wed",
    year: 2019,
    seoDescription:
      "He Took the One I Wed, a dirge by Daramola Femi confronting Death after the loss of a beloved wife, first published in Writers Space Africa.",
    form: "Dirge",
    publication: {
      label: "First published in WSA Magazine, November 2020.",
      href: "https://www.writersspace.net/wp-content/uploads/2020/12/wsa-november-2020-edition.pdf#page=30",
    },
    stanzas: poem3,
  },
  {
    id: "06",
    title: "Good Mo(u)rning.",
    slug: "good-mourning",
    year: 2023,
    seoDescription:
      "Good Mo(u)rning, a short poem by Daramola Femi in which morning arrives violently and the natural world becomes an unsettling scene of grief.",
    stanzas: poem4,
  },
  {
    id: "07",
    title: "A Graveyard for Lovers",
    slug: "a-graveyard-for-lovers",
    year: 2026,
    seoDescription:
      "A Graveyard for Lovers, a poem by Daramola Femi about devotion, mortality, memory, and a love imagined beyond burial and the limits of time.",
    stanzas: poem5,
  },
  {
    id: "08",
    title: "A Minute's Silence",
    slug: "a-minutes-silence",
    year: 2024,
    seoDescription:
      "A Minute's Silence, a poem by Daramola Femi remembering lost love, victims of violence, the dead, the disappeared, and the grief carried by the living.",
    stanzas: poem6,
  },
];
