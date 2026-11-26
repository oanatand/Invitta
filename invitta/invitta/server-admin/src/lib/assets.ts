// Static images live in /public/images and are referenced by URL, so the strings stored in an
// invitation's content stay valid across builds.
export const IMG = {
  hero: "/images/hero.jpg",
  heroCouple: "/images/hero-couple.jpg",
  heroHands: "/images/hero-hands.jpg",
  floral: "/images/template-floral.jpg",
  ivory: "/images/template-ivory.jpg",
  modern: "/images/template-modern.jpg",
  italian: "/images/template-italian.jpg",
  blacktie: "/images/template-blacktie.jpg",
  tplMinimalIvory: "/images/tpl-minimal-ivory.jpg",
  tplItalianRomance: "/images/tpl-italian-romance.jpg",
  coverMinimalIvory: "/images/cover-minimal-ivory.jpg",
  coverItalianRomance: "/images/cover-italian-romance.jpg",
  coverBlackTie: "/images/cover-black-tie.jpg",
  coverFloralBeige: "/images/cover-floral-beige.png",
  galleryChateau: "/images/gallery-chateau.png",
  galleryCoupleWatercolor: "/images/gallery-couple-watercolor.png",
} as const;

/** Cover image per collection model. */
export const MODEL_IMAGES: Record<string, string> = {
  "minimal-ivory": IMG.coverMinimalIvory,
  "italian-romance": IMG.coverItalianRomance,
  "black-tie": IMG.coverBlackTie,
  "floral-beige": IMG.coverFloralBeige,
  "midnight-garden": IMG.heroHands,
  "burgundy-seal": "/images/tpl-burgundy-seal.svg",
};

/** The couple's names are printed on every collection card; this is the tone that reads on each photo. */
const ON_PHOTO_LIGHT = "text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]";
const ON_PHOTO_DARK = "text-noir";
export const MODEL_CARD_TEXT: Record<string, string> = {
  "minimal-ivory": ON_PHOTO_DARK,
  "italian-romance": ON_PHOTO_LIGHT,
  "black-tie": ON_PHOTO_LIGHT,
  "floral-beige": ON_PHOTO_DARK,
  "midnight-garden": ON_PHOTO_LIGHT,
  "burgundy-seal": ON_PHOTO_LIGHT,
};

/** Which part of a (mostly portrait) cover stays visible in the 5:4 card crop. */
export const MODEL_IMAGE_POSITION: Record<string, string> = {
  "minimal-ivory": "50% 50%",
  "italian-romance": "50% 38%",
  "black-tie": "50% 42%",
  "floral-beige": "50% 52%",
  "midnight-garden": "50% 50%",
};

/** Dark veil over each model's photo behind the white hero text (light photos need more). */
export const MODEL_HERO_VEIL: Record<string, number> = {
  "minimal-ivory": 0.45,
  "italian-romance": 0.3,
  "black-tie": 0.25,
  "floral-beige": 0.45,
};

/** Images offered in the editor's gallery picker. */
export const GALLERY = [
  IMG.galleryChateau,
  IMG.galleryCoupleWatercolor,
  IMG.coverItalianRomance,
  IMG.coverBlackTie,
  IMG.coverFloralBeige,
  IMG.coverMinimalIvory,
  IMG.hero,
  IMG.floral,
  IMG.ivory,
  IMG.modern,
  IMG.italian,
  IMG.blacktie,
];
