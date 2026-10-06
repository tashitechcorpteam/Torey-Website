/**
 * Know Motion Media — editable content & statistics
 * Update numbers and links here. Do not invent unverified metrics.
 */
window.KMM = window.KMM || {};

window.KMM.content = {
  contactEmail: "toreycsim@gmail.com",

  /**
   * Impact metrics — single source of truth for the Media Impact section.
   * primary: true → rendered as the giant hero metric (500M+)
   * confirmed: false → shows display placeholder (e.g. XXM+) until client supplies a value
   * To confirm a metric: set confirmed: true, value: number, suffix: "M+" (optional)
   */
  impactMetrics: [
    {
      id: "views",
      value: 500,
      suffix: "M+",
      display: "500M+",
      label: "Views Generated",
      note: "Across the portfolio",
      primary: true,
      confirmed: true,
    },
    {
      id: "monthly-reach",
      value: null,
      suffix: "M+",
      display: "XXM+",
      label: "Monthly Reach",
      primary: false,
      confirmed: false,
    },
    {
      id: "followers",
      value: null,
      suffix: "M+",
      display: "XXM+",
      label: "Followers",
      primary: false,
      confirmed: false,
    },
    {
      id: "likes",
      value: null,
      suffix: "M+",
      display: "XXM+",
      label: "Likes",
      primary: false,
      confirmed: false,
    },
    {
      id: "brands",
      value: 4,
      suffix: "",
      display: "4",
      label: "Media Brands",
      note: "Upgrds · WldKind · CraveDept · UpgrdYou",
      primary: false,
      confirmed: true,
    },
    {
      id: "channels",
      value: null,
      suffix: "",
      display: "XX",
      label: "Social Channels",
      primary: false,
      confirmed: false,
    },
  ],

  /** @deprecated — kept for compatibility; prefer impactMetrics */
  stats: [
    {
      id: "views",
      value: 500,
      suffix: "M+",
      label: "Views",
      note: "Across the portfolio",
      confirmed: true,
    },
    {
      id: "monthly-reach",
      value: null,
      display: "XXM+",
      label: "Monthly Reach",
      note: "Editable placeholder — replace with approved figure",
      confirmed: false,
    },
    {
      id: "followers",
      value: null,
      display: "XXM+",
      label: "Followers",
      note: "Editable placeholder — replace with approved figure",
      confirmed: false,
    },
    {
      id: "likes",
      value: null,
      display: "XXM+",
      label: "Likes",
      note: "Editable placeholder — replace with approved figure",
      confirmed: false,
    },
    {
      id: "brands",
      value: 4,
      suffix: "",
      label: "Media Brands",
      note: "Upgrds · WldKind · CraveDept · UpgrdYou",
      confirmed: true,
    },
  ],

  /** Social — only official URLs. Leave href null until supplied. */
  social: [
    { name: "Instagram", href: null },
    { name: "LinkedIn", href: null },
    { name: "YouTube", href: null },
    { name: "TikTok", href: null },
    { name: "X", href: null },
  ],

  brands: {
    upgrds: {
      name: "Upgrds",
      line: "See the world differently.",
      blurb:
        "Discovery media covering stories, ideas, places, products and innovations that make you see the world differently.",
    },
    wldkind: {
      name: "WldKind",
      line: "The planet, alive.",
      blurb:
        "Wildlife and nature media focused on remarkable animals, behavior and the natural world.",
    },
    cravedept: {
      name: "CraveDept",
      line: "Taste, in motion.",
      blurb: "Food discovery and visually driven culinary content.",
    },
    upgrdyou: {
      name: "UpgrdYou",
      line: "Become the next version.",
      blurb: "Self-improvement, mindset and personal growth media.",
    },
  },
};
