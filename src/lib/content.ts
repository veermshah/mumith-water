export type SourceId =
  | "epa-containers"
  | "oecd-outlook"
  | "oecd-overview"
  | "jambeck-2015"
  | "geyer-2017"
  | "nih-nanoplastics"
  | "pnas-nanoplastics"
  | "danimer-certs"
  | "danimer-chapter11"
  | "teknor-danimer"
  | "pha-marine-lifetime"
  | "pha-cost"
  | "cove"
  | "natureworks-thailand"
  | "pla-heat"
  | "pla-compost"
  | "notpla-compost"
  | "ooho-volume"
  | "ooho-shelf-life"
  | "paboco"
  | "paboco-production"
  | "tetrapak-renewable"
  | "boxed-water-nad"
  | "biocycle-access"
  | "fda-bottled-water"
  | "cfr-165-110"
  | "cfr-129"
  | "dshs-bottled-water"
  | "dshs-fees"
  | "eventide"
  | "aqua-bottling"
  | "ftc-260-7"
  | "ftc-260-8";

export type Source = { id: SourceId; label: string; publisher: string; url: string };

export const sources: Source[] = [
  { id: "epa-containers", label: "Containers and Packaging: Product-Specific Data", publisher: "US EPA", url: "https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/containers-and-packaging-product-specific" },
  { id: "oecd-outlook", label: "Global Plastics Outlook (2022)", publisher: "OECD", url: "https://www.oecd.org/en/publications/global-plastics-outlook_de747aef-en.html" },
  { id: "oecd-overview", label: "Global Plastics Outlook — Overview and policy highlights", publisher: "OECD", url: "https://www.oecd.org/en/publications/global-plastics-outlook_de747aef-en/full-report/component-6.html" },
  { id: "jambeck-2015", label: "Plastic waste inputs from land into the ocean (Jambeck et al., 2015)", publisher: "Science", url: "https://www.science.org/doi/10.1126/science.1260352" },
  { id: "geyer-2017", label: "Production, use, and fate of all plastics ever made (Geyer et al., 2017)", publisher: "Science Advances", url: "https://www.science.org/doi/10.1126/sciadv.1700782" },
  { id: "nih-nanoplastics", label: "Plastic particles in bottled water", publisher: "NIH Research Matters", url: "https://www.nih.gov/news-events/nih-research-matters/plastic-particles-bottled-water" },
  { id: "pnas-nanoplastics", label: "Rapid single-particle chemical imaging of nanoplastics (Qian et al., 2024)", publisher: "PNAS", url: "https://www.pnas.org/doi/10.1073/pnas.2300582121" },
  { id: "danimer-certs", label: "PHA certifications", publisher: "Danimer Scientific", url: "https://danimerscientific.com/pha-certifications/" },
  { id: "danimer-chapter11", label: "Form 8-K: Chapter 11 filing (March 2025)", publisher: "US SEC", url: "https://www.sec.gov/Archives/edgar/data/1779020/000095017025041367/dnmr-20250318.htm" },
  { id: "teknor-danimer", label: "Teknor Apex acquires Danimer Scientific", publisher: "Teknor Apex", url: "https://www.teknorapex.com/en-us/news/teknor-apex-acquires-danimer-scientific-to-further-diversify-sustainable-materials-portfolio" },
  { id: "pha-marine-lifetime", label: "The rate of biodegradation of PHA bioplastics in the marine environment (Dilkes-Hoffman et al., 2019)", publisher: "Marine Pollution Bulletin", url: "https://doi.org/10.1016/j.marpolbul.2019.03.020" },
  { id: "pha-cost", label: "PHA production and cost review (2022)", publisher: "RSC Advances", url: "https://pubs.rsc.org/en/content/articlepdf/2022/ra/d1ra08796g" },
  { id: "cove", label: "PB1 fiber bottle", publisher: "Cove", url: "https://cove.co/" },
  { id: "natureworks-thailand", label: "NatureWorks announces grand opening in Thailand (April 2026)", publisher: "NatureWorks", url: "https://natureworksllc.com/about/news/press-releases/2026-04-29-natureworks-announces-grand-opening-thailand" },
  { id: "pla-heat", label: "PLA properties review", publisher: "International Journal of Biological Macromolecules", url: "https://www.sciencedirect.com/science/article/abs/pii/S0141813022015239" },
  { id: "pla-compost", label: "PLA biodegradability and compostability testing", publisher: "Infinita Lab", url: "https://infinitalab.com/blog/pla-biodegradability-compostability-testing/" },
  { id: "notpla-compost", label: "Home compostable vs industrial compostable packaging", publisher: "Notpla", url: "https://www.notpla.com/magazine-posts/home-compostable-vs-industrial-compostable-packaging-whats-the-difference/" },
  { id: "ooho-volume", label: "Notpla solution profile", publisher: "MIT Solve", url: "https://solve.mit.edu/solutions/15678" },
  { id: "ooho-shelf-life", label: "Ooho edible water bottle", publisher: "Circle Economy Knowledge Hub", url: "https://knowledge-hub.circle-economy.com/article/23209" },
  { id: "paboco", label: "The paper bottle", publisher: "Paboco", url: "https://www.paboco.com/" },
  { id: "paboco-production", label: "Paboco commences full-scale production for fibre-based bottles", publisher: "Packaging Europe", url: "https://packagingeurope.com/news/paboco-commences-full-scale-production-for-fibre-based-bottles/11005.article" },
  { id: "tetrapak-renewable", label: "Renewable packaging materials", publisher: "Tetra Pak", url: "https://www.tetrapak.com/en-us/solutions/packaging/packaging-material/renewable-materials" },
  { id: "boxed-water-nad", label: "Boxed Water told to change some sustainability claims (2025)", publisher: "Food Dive", url: "https://www.fooddive.com/news/boxed-water-is-better-marketing-sustainability/751069/" },
  { id: "biocycle-access", label: "Residential food waste collection access in the U.S. (2023)", publisher: "BioCycle", url: "https://www.biocycle.net/residential-food-waste-collection-access-in-u-s/" },
  { id: "fda-bottled-water", label: "Bottled Water Everywhere: Keeping it Safe", publisher: "US FDA", url: "https://www.fda.gov/consumers/consumer-updates/bottled-water-everywhere-keeping-it-safe" },
  { id: "cfr-165-110", label: "21 CFR 165.110 — Bottled water", publisher: "eCFR", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-165/subpart-B/section-165.110" },
  { id: "cfr-129", label: "21 CFR Part 129 — Processing and bottling of bottled drinking water", publisher: "eCFR", url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-129" },
  { id: "dshs-bottled-water", label: "Bottled and vended water", publisher: "Texas DSHS", url: "https://www.dshs.texas.gov/food-manufacturers-wholesalers-warehouses/bottled-vended-water-food-manufacturers-wholesalers-warehouses" },
  { id: "dshs-fees", label: "FY25 Fee Resource Manual", publisher: "Texas DSHS", url: "https://www.dshs.texas.gov/sites/default/files/legislative/2025-Reports/fy25-fee-resource-manual-final.pdf" },
  { id: "eventide", label: "Capabilities", publisher: "Eventide Water", url: "http://www.eventidewater.com/capabilities/" },
  { id: "aqua-bottling", label: "Your source for high-quality bottled water solutions", publisher: "Aqua Bottling", url: "https://aquabottling.com/aqua-bottling-your-source-for-high-quality-bottled-water-solutions/" },
  { id: "ftc-260-7", label: "16 CFR 260.7 — Compostable claims", publisher: "FTC Green Guides (eCFR)", url: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-260/section-260.7" },
  { id: "ftc-260-8", label: "16 CFR 260.8 — Degradable claims", publisher: "FTC Green Guides (eCFR)", url: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-260/section-260.8" },
];

export const sourceIndex = (id: SourceId) => sources.findIndex((s) => s.id === id) + 1;

export type Stat = {
  value: string;
  /** Numeric part animated on scroll; omitted for ranges. */
  numeric?: { to: number; decimals?: number; suffix?: string };
  label: string;
  context: string;
  source: SourceId[];
};

export const stats: Stat[] = [
  {
    value: "29.1%",
    numeric: { to: 29.1, decimals: 1, suffix: "%" },
    label: "of PET bottles and jars were recycled in the US in 2018",
    context: "EPA estimate. Most of the rest was landfilled or combusted.",
    source: ["epa-containers"],
  },
  {
    value: "9%",
    numeric: { to: 9, suffix: "%" },
    label: "of the world’s plastic waste was ultimately recycled in 2019",
    context: "22% was mismanaged — dumped, openly burned or leaked into the environment.",
    source: ["oecd-outlook"],
  },
  {
    value: "40%",
    numeric: { to: 40, suffix: "%" },
    label: "of global plastic waste came from packaging in 2019",
    context: "Packaging was the single largest source of plastic waste.",
    source: ["oecd-overview"],
  },
  {
    value: "4.8–12.7M",
    label: "metric tons of plastic entered the ocean from land in 2010",
    context: "Estimated across 192 coastal countries.",
    source: ["jambeck-2015"],
  },
  {
    value: "~240,000",
    numeric: { to: 240000 },
    label: "plastic particles per liter, on average, in tested bottled water",
    context: "From one 2024 study of three US brands; about 90% were nanoplastics.",
    source: ["nih-nanoplastics", "pnas-nanoplastics"],
  },
];

export type Material = {
  name: string;
  short: string;
  madeFrom: string;
  breaksDown: string;
  timeframe: string;
  pros: string[];
  cons: string[];
  certifications: string;
  examples: string;
  source: SourceId[];
};

export const materials: Material[] = [
  {
    name: "PHA",
    short: "Polyhydroxyalkanoates",
    madeFrom: "Polyesters made by microbes fermenting plant sugars or oils.",
    breaksDown: "Manufacturer-reported: industrial and home compost, soil, freshwater and marine settings.",
    timeframe: "A marine meta-study estimated 1.5–3.5 years for a PHA bottle.",
    pros: ["Broadest range of reported breakdown environments", "Can be molded like conventional plastic"],
    cons: ["Reported around $8/kg vs. roughly $1.25–2.53/kg for common plastics", "Few producers; Danimer went through Chapter 11 in 2025"],
    certifications: "Danimer reports TÜV certifications for its resin. A finished bottle would need its own testing.",
    examples: "Danimer Scientific (acquired by Teknor Apex, 2025)",
    source: ["danimer-certs", "pha-marine-lifetime", "pha-cost", "danimer-chapter11", "teknor-danimer"],
  },
  {
    name: "PLA",
    short: "Polylactic acid",
    madeFrom: "Lactic acid fermented from plant sugars such as sugarcane.",
    breaksDown: "Industrial composting at sustained high temperatures. Breaks down very slowly in soil, sea or landfill.",
    timeframe: "Industrial compost standards test for ≥90% biodegradation within 180 days.",
    pros: ["Produced at large commercial scale", "Clear and rigid, similar to PET"],
    cons: ["Softens around 55–65 °C — a problem in a hot car", "Needs an industrial composter, which many people can’t access"],
    certifications: "Grade-specific; we have not verified any for a bottle.",
    examples: "NatureWorks Ingeo™",
    source: ["natureworks-thailand", "pla-compost", "pla-heat", "biocycle-access"],
  },
  {
    name: "Seaweed",
    short: "Seaweed & plant extracts",
    madeFrom: "Brown seaweed and plant extracts.",
    breaksDown: "Notpla says its materials are home compostable; Ooho capsules are edible.",
    timeframe: "Notpla reports about 4–6 weeks in home compost.",
    pros: ["Home compostable per the manufacturer", "Edible membrane"],
    cons: ["Capsules hold roughly 20–100 mL — not a resealable bottle", "Short shelf life; must be made close to where it’s used"],
    certifications: "Some coated Notpla SKUs are BPI-certified; we have not verified one for Ooho.",
    examples: "Notpla Ooho",
    source: ["notpla-compost", "ooho-volume", "ooho-shelf-life"],
  },
  {
    name: "Paper bottle",
    short: "Molded fiber + barrier",
    madeFrom: "Wood fiber with a thin internal barrier layer.",
    breaksDown: "Designed to be recycled with paper — not described as compostable by the makers.",
    timeframe: "Not applicable — recycling route, not composting.",
    pros: ["Fits existing paper recycling streams", "In full-scale production (Paboco, 2024)"],
    cons: ["Still needs a barrier to hold liquid", "Composting depends on which barrier is used"],
    certifications: "Cove reports CEPI paper-recyclability testing for PB1.",
    examples: "Paboco, Cove PB1",
    source: ["paboco", "paboco-production", "cove"],
  },
  {
    name: "Carton",
    short: "Plant-based carton",
    madeFrom: "Paperboard plus thin polymer layers, some plant-derived.",
    breaksDown: "Recycled where carton recycling exists. Not compostable.",
    timeframe: "Not applicable — recycling route, not composting.",
    pros: ["Widely produced today", "High renewable-material share is possible"],
    cons: ["Multi-layer, so recycling depends on local facilities", "“Plant-based” claims have drawn regulator scrutiny"],
    certifications: "None verified for our use.",
    examples: "Tetra Pak, Boxed Water",
    source: ["tetrapak-renewable", "boxed-water-nad"],
  },
];

export const sourcingSteps: { title: string; body: string; source: SourceId[] }[] = [
  {
    title: "Work with a licensed Texas co-packer",
    body: "Rather than building a plant, a startup can contract an existing bottler. Texas operations such as Eventide Water (Mineral Wells) and Aqua Bottling publicly offer private-label bottling. We have not contacted or partnered with either.",
    source: ["eventide", "aqua-bottling"],
  },
  {
    title: "Likely start with purified water",
    body: "FDA defines purified water as water treated by distillation, reverse osmosis or similar processes; it can start from an approved municipal source. Spring water must be collected from a qualifying underground spring, which limits where it can come from.",
    source: ["fda-bottled-water", "cfr-165-110"],
  },
  {
    title: "Meet FDA and Texas rules",
    body: "FDA regulates bottled water as a food, with quality standards and bottling good manufacturing practices. Texas DSHS requires a Food Manufacturer license for firms that process and bottle water; fees scale with annual sales, starting at $100.",
    source: ["cfr-129", "dshs-bottled-water", "dshs-fees"],
  },
  {
    title: "Confirm the bottle can actually run",
    body: "The biggest open question: whether a co-packer’s filling line can handle a non-PET bottle, and how long water keeps in it. We’ll answer this before promising anything.",
    source: [],
  },
];

export type Faq = { q: string; a: string; source: SourceId[] };

export const faqs: Faq[] = [
  {
    q: "Can I buy a Mumith Water bottle today?",
    a: "No. Mumith Water is an early-stage idea. We have no suppliers, co-packers, sponsors or customers yet, and no launch date. The waitlist helps us learn whether people want this before we build it.",
    source: [],
  },
  {
    q: "How would the bottle break down?",
    a: "It depends on the material, and we haven’t picked one. PLA generally needs an industrial composter. Some PHA resins are reported to biodegrade in soil, compost and marine settings, but a marine study estimated 1.5–3.5 years for a bottle. Paper bottles and cartons are designed to be recycled, not composted. We won’t make any breakdown claim until a finished bottle has been tested.",
    source: ["pla-compost", "danimer-certs", "pha-marine-lifetime", "paboco"],
  },
  {
    q: "Is it “100% biodegradable”?",
    a: "We won’t say that. Under the FTC Green Guides, an unqualified biodegradable claim means the whole item breaks down within about a year after normal disposal — and landfills don’t provide those conditions. Any claim we make will name the environment and timeframe, backed by testing.",
    source: ["ftc-260-8", "ftc-260-7"],
  },
  {
    q: "Where would the water come from?",
    a: "Most likely a licensed Texas co-packer bottling purified water from an approved source. We have not chosen or contacted a bottler yet.",
    source: ["cfr-165-110", "dshs-bottled-water"],
  },
  {
    q: "How does sponsorship work?",
    a: "The plan is for brands to pay for bottle runs in exchange for their design on the label, which lets us give bottles away or sell them cheaply. Pricing, minimum runs and timelines don’t exist yet — sponsor interest helps us figure them out.",
    source: [],
  },
  {
    q: "Can I put it in my compost bin?",
    a: "Not necessarily. Home composting only works for materials certified or tested for it, and access to municipal food-waste collection varies — one 2023 survey counted about 14.9 million US households with access. We’ll print clear disposal instructions on every bottle.",
    source: ["biocycle-access", "ftc-260-7"],
  },
  {
    q: "When will you launch?",
    a: "We don’t have a date. Next steps are testing materials, talking to co-packers and gauging sponsor interest. We’ll email the waitlist when there’s real news.",
    source: [],
  },
];

export type UseCase = "campus" | "gym" | "events" | "other";
export const useCases: { value: UseCase; label: string }[] = [
  { value: "campus", label: "Campus" },
  { value: "gym", label: "Gym" },
  { value: "events", label: "Events" },
  { value: "other", label: "Other" },
];

export const companySizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"] as const;
export const bottleQuantities = ["Under 1,000", "1,000–5,000", "5,000–25,000", "25,000+", "Not sure yet"] as const;
