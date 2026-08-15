import peaceCircle from "~/assets/silua/bracelet-peace-circle.jpg";
import redRose from "~/assets/silua/bracelet-red-rose.jpg";
import heroBg from "~/assets/silua/hero-bg-full.jpg";
import lotus from "~/assets/silua/product-lotus.jpg";
import pixiu from "~/assets/silua/product-pixiu.jpg";
import wulou from "~/assets/silua/product-wulou.jpg";
import siluaTag from "~/assets/silua/silua-tag.jpg";
import storyMountain from "~/assets/silua/story-mountain.jpg";

export const IMAGES = {
  heroBg,
  storyMountain,
  peaceCircle,
  redRose,
  wulou,
  lotus,
  pixiu,
  siluaTag,
};

export interface Talisman {
  num: string;
  cn: string;
  name: string;
  tag: string;
  desc: string;
  image: string;
}

export const TALISMANS: Talisman[] = [
  {
    num: "i.",
    cn: "平安扣",
    name: "The Peace Circle",
    tag: "The anchor of stillness.",
    desc: "A minimalist mandala. Trace the outer rim, find the still point, breathe. Peace isn't a destination — it's a center you already possess.",
    image: peaceCircle,
  },
  {
    num: "ii.",
    cn: "葫芦",
    name: "Wu Lou",
    tag: "The vessel of vitality.",
    desc: "Your energy is your most sacred asset. A portable reminder to protect the flame — to stay fueled, not just busy.",
    image: wulou,
  },
  {
    num: "iii.",
    cn: "莲花",
    name: "Lotus",
    tag: "The emergence pendant.",
    desc: "In the darkest water, roots grow furiously. Your challenges aren't obstacles — they're your nutrients. Bloom in any uncertainty.",
    image: lotus,
  },
  {
    num: "iv.",
    cn: "貔貅",
    name: "Pi Xiu",
    tag: "The magnet for abundance.",
    desc: "Prosperity follows the frequency of confidence. A vibrational attractor — the certainty that there is, and always will be, enough.",
    image: pixiu,
  },
];

export type BestBadge = "signature" | "gold" | "new";

export interface BestProduct {
  badge: BestBadge;
  badgeLabel: string;
  meta: string;
  metaRight: string;
  name: string;
  cn: string;
  material: string;
  price: string;
  oldPrice?: string;
  image: string;
  imageBg?: string;
}

export const BESTSELLERS: BestProduct[] = [
  {
    badge: "signature",
    badgeLabel: "Signature",
    meta: "Bracelet · 平安扣",
    metaRight: "The Peace Circle",
    name: "Rose Quartz & South Red Agate",
    cn: "寂静之锚 · Anchor of Stillness",
    material:
      'South red agate beads, hand-carved rose quartz rosette, jade guardian bead, gold-plated signature "S" tag. 316L medical-grade steel, PVD 18K gold.',
    price: "$248",
    oldPrice: "$298",
    image: redRose,
  },
  {
    badge: "gold",
    badgeLabel: "Bestseller",
    meta: "Bracelet · 平安扣",
    metaRight: "Woodland Edition",
    name: "Green Jade Peace Circle",
    cn: "静止之圆 · Portable Mandala",
    material:
      "Genuine Hetian jade circle, milk crystal beads, twin agate accents.",
    price: "$198",
    image: peaceCircle,
  },
  {
    badge: "new",
    badgeLabel: "New",
    meta: "Charm · 签名吊牌",
    metaRight: 'Signature "S"',
    name: "The Silua Signature Tag",
    cn: "灵魂标识 · Physical Fingerprint",
    material:
      "The physical fingerprint of Silua. 316L steel, PVD 18K vacuum gold plate, polished mirror finish.",
    price: "$98",
    image: siluaTag,
    imageBg: "#E4D8C1",
  },
];

export interface Voice {
  text: string;
  translation?: string;
  name: string;
  role: string;
  product: string;
}

export const VOICES: Voice[] = [
  {
    text: "In the restroom before my pitch, I held it. Three breaths. I remembered who I was, not just my valuation.",
    translation:
      "在融资路演的洗手间里，我握着它。三次呼吸。我记起了我是谁，而不只是我的估值。",
    name: "Elena Whitmore",
    role: "Founder · Verified Buyer",
    product: "The Peace Circle",
  },
  {
    text: "The year we almost died, I touched this lotus daily. It reminded me: in the darkest water, roots grow furiously. We were profitable the next year.",
    name: "Amara Okonkwo",
    role: "Studio Director · Verified Buyer",
    product: "Lotus Pendant",
  },
  {
    text: "In the chaos of a hyper-growth phase, my energy was leaking everywhere. Touching the Wu Lou before a high-stakes call became my activation ritual.",
    name: "Sofia Marchetti",
    role: "Yoga Teacher · Verified Buyer",
    product: "Wu Lou Charm",
  },
  {
    text: "I used to think wealth was something to chase. Now I know it's something to attract. Silua kept my vision clear during the pivot — we doubled our revenue.",
    name: "Isolde Fenn",
    role: "Investor · Verified Buyer",
    product: "Pi Xiu Bracelet",
  },
];

export interface Tier {
  name: string;
  cn: string;
  benefits: string;
  price: string;
  per: string;
  cta: string;
  featured?: boolean;
  badge?: string;
}

export const TIERS: Tier[] = [
  {
    name: "Novice",
    cn: "寂 · The Threshold",
    benefits:
      "Journal subscription · 10% first-piece courtesy · early access to seasonal drops · complimentary gift wrap.",
    price: "Free",
    per: "On sign-up",
    cta: "Join Silently",
  },
  {
    name: "Attuned",
    cn: "露 · The Companion",
    benefits:
      "Everything in Novice · 15% year-round · quarterly Ritual Box · complimentary engraving · access to Silua salons & meditation circles.",
    price: "$48",
    per: "Per year",
    cta: "Enter the Circle",
    featured: true,
    badge: "Most Chosen",
  },
  {
    name: "Luminary",
    cn: "雅 · The Keeper",
    benefits:
      "Everything in Attuned · 20% year-round · private curator concierge · first access to limited editions · annual atelier retreat invitation.",
    price: "By Invitation",
    per: "Or $248 / year",
    cta: "Request Access",
  },
];

export const SUBSCRIBE_FEATURES = [
  { num: "i.", txt: "One thoughtful letter a month — never a promotion." },
  { num: "ii.", txt: "Rituals, mantras & guided pauses." },
  { num: "iii.", txt: "First look at limited-edition drops." },
  { num: "iv.", txt: "Unsubscribe with one quiet click." },
];

export const FOOTER_COLUMNS = [
  {
    title: "Collection",
    links: ["The Peace Circle", "Wu Lou", "Lotus", "Pi Xiu", "Signature Tag"],
  },
  {
    title: "The House",
    links: [
      "The Story",
      "The Ritual",
      "Journal",
      "Circle Silua",
      "Craftsmanship",
    ],
  },
  {
    title: "Care",
    links: ["Contact", "Shipping", "Returns", "Care Guide", "FAQ"],
  },
];

export const MARQUEE_ITEMS = [
  "Silence + Luna = Silua",
  "· 寂静月光 ·",
  "Find Your Inner Silua",
  "· 丝露雅 ·",
  "The Quiet Light That Guides You Home",
  "· 寂静月光 ·",
  "Silence + Luna = Silua",
  "· 丝露雅 ·",
];
