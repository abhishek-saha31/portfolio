// ============================================================
//  EDIT YOUR CONTENT HERE — one file controls the whole site.
//  Images live in /public/images (drop files in, keep the names).
// ============================================================

export const profile = {
  name: "Abhishek Saha",
  role: "Industrial & Production Engineer · BUET",
  email: "abhi.shuvro31@gmail.com", // <-- your email
  location: "Dhaka · Bangladesh",
  coords: "23°N 90°E",
  available: "Available 2026",
  cvFile: "/cv.pdf", // place cv.pdf in /public
  portrait: "/images/Portrait.jpeg", // your hero photo — set the real extension here
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/abhishek-saha-shuvro/" },
    { label: "Email", href: "mailto:abhi.shuvro31@gmail.com" },
    { label: "Resume", href: "/cv.pdf" },
  ],
  // Web3Forms key for the contact form (get a free one at web3forms.com)
  web3formsKey: "YOUR_WEB3FORMS_KEY",
};

export const facets = [
  ["Discipline", "IPE · BUET"],
  ["Focus", "Reinforcement Learning"],
  ["Domain", "Supply Chain"],
  ["Method", "Process Optimization"],
  ["Lens", "Quality Management"],
  ["Off-clock", "Photography"],
];

export const experience = [
  {
    when: "2026",
    role: "Undergraduate Researcher",
    org: "Dept. of IPE, BUET — under Dr. Shuva Ghosh",
    points: [
      "Designed and trained deep RL agents (Branching DQN, synchronous-action PPO) for multi-echelon perishable inventory control under stochastic demand and lead time.",
      "Benchmarked learned policies against a tuned echelon base-stock policy across a shelf-life sweep, achieving a 26% cost reduction and 54% less spoilage.",
      "Built the simulation environment, training pipeline, and evaluation suite from scratch in Python and PyTorch.",
    ],
  },
  {
    when: "Co-Founder & Lead Mentor",
    role: "After Schools Academy",
    org: "Education venture — 60+ students mentored",
    points: [
      "Co-founded and ran the academy end to end — operations, curriculum, scheduling, and mentorship.",
      "Mentored 60+ students across their coursework, including free instruction for those who couldn't afford fees.",
      "Built consistent teaching quality and met each student where they were. (Detailed below.)",
    ],
  },
  {
    when: "Nov 2025 — Dec 2025",
    role: "Industrial Attachment — Rancon",
    org: "Rancon Auto Industries (RAIL) & Rancon Motor Bikes (RMBL)",
    // List each Rancon photo with its REAL extension. Files go in /public/images/experience/
    images: [
      "/images/experience/rancon1.jpg",
      "/images/experience/rancon2.jpg",
      "/images/experience/rancon3.jpg",
      "/images/experience/rancon4.jpg",
      "/images/experience/rancon5.jpg",
      "/images/experience/rancon6.jpg",
      "/images/experience/rancon7.jpg",
      "/images/experience/rancon8.jpg",
      "/images/experience/rancon9.jpg",
      "/images/experience/rancon10.jpg",
    ],
    points: [
      "Analyzed the Mitsubishi Xpander assembly flow (task sequence, material handling, space constraints) and proposed merging the rear-axle assembly with the engine assembly to remove a bottleneck — cutting total process time by 33.89% and improving floor-space utilization by 10%.",
      "Identified and documented specific motion waste on the Xpander line, proposing targeted layout changes to improve operator efficiency.",
      "Improved the SOP for the JAC HFC1042 KD assembly line to match shop-floor reality, and built a structured tool list for faster, more consistent execution.",
      "At RMBL: ran defect analysis with Pareto charts to isolate the vital-few defect types driving most rework and rejects, enabling focused corrective action.",
      "Performed Process Capability Analysis (Cp/Cpk) on brake force for two high-demand Suzuki motorcycle models, evaluating performance against specification limits to drive quality decisions.",
    ],
  },
];

export const research = {
  title:
    "Deep Reinforcement Learning for Inventory Optimization in a Multi-Echelon Perishable Supply Chain",
  meta: [
    "B.Sc. Thesis · 2026",
    "Supervisor — Dr. Shuva Ghosh",
    "Under stochastic demand & lead time",
    "Branching DQN · SA-PPO · Base-Stock",
  ],
  stats: [
    { v: "−26%", k: "Cost vs. base-stock benchmark" },
    { v: "54%", k: "Reduction in spoilage waste" },
    { v: "87%", k: "Fill rate maintained" },
    { v: "3", k: "Retail echelons centrally allocated" },
  ],
  agents: [
    {
      color: "cyan",
      role: "Branching DQN",
      title: "The frugal one",
      desc: "Waste-averse and disciplined. Orders lean — around 472 units a day — and squeezes out spoilage. Wins on cost when shelf life is short.",
      num: "−26.0%",
    },
    {
      color: "signal",
      role: "SA-PPO",
      title: "The cautious one",
      desc: "Fill-maximizing and protective of the customer. Orders toward the ceiling — ~572 units a day — and pulls ahead as shelf life grows.",
      num: "89.0%",
    },
  ],
};

// Keyword marquee strip (Research section)
export const keywords = [
  "Branching DQN", "SA-PPO", "Base-Stock", "Multi-Echelon", "Perishable",
  "Stochastic Demand", "Lead Time", "FIFO", "Transit Ageing", "PyTorch",
  "Reinforcement Learning", "Inventory Optimization", "Discrete-Event Sim",
  "Process Optimization", "Quality Management", "Six Sigma", "SolidWorks", "IoT",
];

// Clickable pipeline stages (Research section)
export const pipeline = [
  { n: "01", title: "Environment", tag: "OWMR network", detail: "A two-echelon divergent supply chain — 1 Vendor → 1 DC → 3 retail stores (S1/S2/S3) — selling a fresh-meat product with a 4-day baseline shelf life, built from scratch as a custom Gym environment." },
  { n: "02", title: "State & Demand", tag: "Dual stochasticity", detail: "Each step injects stochastic demand at every store and stochastic lead time on replenishment — the two sources of uncertainty the agent must learn to absorb without overstocking a perishable good." },
  { n: "03", title: "Ageing & Issuing", tag: "FIFO · transit", detail: "Inventory ages in transit and on shelf. Stock is issued first-in-first-out and expires past shelf life, so the cost of ordering early is real spoilage — not just holding cost." },
  { n: "04", title: "Action Space", tag: "4×11 branching", detail: "Four simultaneous order decisions (DC + 3 stores), each discretized into 11 levels. A branching architecture avoids the combinatorial blow-up of a single 11⁴ action head." },
  { n: "05", title: "Agents", tag: "DQN · PPO", detail: "Branching DQN and synchronous-action PPO are trained against a tuned echelon base-stock benchmark, all under identical demand and lead-time seeds for a fair comparison." },
  { n: "06", title: "Reward", tag: "Cost-minimizing", detail: "A single cost signal combines ordering, holding, spoilage (waste), and lost-sales penalties — so the agent is rewarded for balancing freshness against availability." },
  { n: "07", title: "Evaluation", tag: "30 seeds", detail: "Policies are evaluated across 30 independent seeds and a shelf-life sweep (2, 4, 7, 14 days), reporting total cost, waste, fill rate, and convergence speed." },
  { n: "08", title: "Finding", tag: "Crossover", detail: "A policy crossover emerges: Branching DQN wins on cost at short shelf lives, while SA-PPO pulls ahead as shelf life grows — a central novelty of the thesis." },
];

// Tabbed results table (Research section): three policies compared
export const policyResults = {
  columns: ["Policy", "Total Cost", "vs Base", "Waste ↓", "Fill Rate", "Converged"],
  rows: [
    { policy: "Base-Stock", best: false, cells: ["$375,179", "—", "baseline", "82%", "—"] },
    { policy: "SA-PPO", best: false, cells: ["$296,823", "−20.9%", "−41%", "89.0%", "749 ep"] },
    { policy: "Branching DQN", best: true, cells: ["$277,529", "−26.0%", "−54%", "87.0%", "393 ep"] },
  ],
  note: "4-day shelf life · 30 seeds. Branching DQN leads on cost and convergence; SA-PPO wins at longer shelf lives (7d, 14d).",
};

// Shelf-life crossover chart data (cost index by shelf life, lower = better)
export const crossover = {
  shelfLives: [2, 4, 7, 14],
  dqn: [62, 74, 86, 93],   // relative cost-efficiency score (higher = better)
  ppo: [54, 70, 90, 97],
  caption: "DQN leads at short shelf lives; PPO overtakes around 7 days — the crossover.",
};

// Toolkit — skills grouped by category (Toolkit & Education section)
export const toolkit = [
  {
    category: "Engineering & CAD",
    items: [
      ["SolidWorks", "Parts, assemblies, motion studies"],
      ["AutoCAD", "2D layouts and engineering drawings"],
      ["CATIA V5", "Surface and solid modeling"],
    ],
  },
  {
    category: "Analytics & Simulation",
    items: [
      ["Python", "Reinforcement learning, modeling, automation"],
      ["Excel", "Data analysis, dashboards (certified)"],
      ["MATLAB & Arena", "Numerical computing, discrete-event simulation"],
    ],
  },
  {
    category: "IE Methodologies",
    items: [
      ["Time Study & SOP", "Work measurement, standard-operating-procedure development"],
      ["Process Capability", "Cp/Cpk, statistical quality control"],
      ["Pareto & Bottleneck", "Defect prioritization, flow and layout analysis"],
    ],
  },
];

// Education entries (Toolkit & Education section)
export const education = [
  {
    school: "Bangladesh University of Engineering and Technology (BUET)",
    logo: "/images/education/buet-logo.png", // place your logo here (png with transparency works best)
    degree: "B.Sc. in Industrial & Production Engineering",
    period: "2026 (Expected)",
    cgpa: "3.45" as string | null, // set e.g. "3.85" to show a counting CGPA button
    cgpaScale: "4.00",
    cgpaLabel: "CGPA",
    points: [
      "Thesis: Deep Reinforcement Learning-Based Inventory Optimization for a Multi-Echelon Perishable Supply Chain under Stochastic Demand and Lead Time",
      "Supervisor: Dr. Shuva Ghosh",
    ],
    coursework: [
      "Operations Research",
      "Quality Management",
      "Operations Management",
      "Probability & Statistics",
      "Supply Chain Management",
    ],
  },
  {
    school: "Uttara High School and College",
    logo: "/images/education/uttara-logo.png",
    degree: "Higher Secondary Certificate (HSC)",
    period: "HSC",
    cgpa: "5.00",
    cgpaScale: "5.00",
    cgpaLabel: "GPA",
    points: [],
    coursework: [],
  },
];

// Each project: a slider key (folder prefix) + how many photos.
// Photos live at /public/images/projects/<key><n>.jpg  e.g. pd1.jpg ... pd4.jpg
export const projects = [
  {
    key: "pd",
    // List each photo file with its REAL extension. Put files in /public/images/projects/
    images: ["/images/projects/pd1.png", "/images/projects/pd2.jpg"],
    video: "/videos/pd-video.mp4", // 1 video — shows as first slide; set to null to remove
    caseLabel: "CASE 04-A · Mechanical Product Design",
    idx: "P/01 · Product Design",
    title: "Multi-Purpose Plumbing Machine",
    sub: "Mechanical design · Prototyping",
    overview:
      "A compact, portable pipe-working machine with interchangeable cutters for different pipe types. I designed it around modularity and usability — bringing several plumbing operations into one tool so common tasks are faster and more repeatable for a single operator.",
    stack:
      "CAD-driven design and full assembly in SolidWorks; interchangeable cutter system for multiple pipe types; component selection focused on manufacturability, durability, and serviceability.",
    impact:
      "A modular, manufacturable design that cuts tool-switching and setup time, lowers the tooling footprint, and makes routine pipe-working accessible to a single user.",
    tags: ["Product Design", "SolidWorks", "CAD", "Manufacturability"],
  },
  {
    key: "iot",
    images: ["/images/projects/iot1.jpg", "/images/projects/iot2.jpeg"],
    video: null as string | null,
    caseLabel: "CASE 04-B · Industrial Safety & Sensing",
    idx: "P/02 · IoT & Sensing",
    title: "Smart Ammonia & Ambient Monitoring",
    sub: "Embedded · IoT · Real-time sensing",
    overview:
      "An ESP-01S-based IoT system that monitors ammonia concentration and ambient conditions in real time, with automated fan and buzzer control and a web dashboard for live data logging and threshold alerts — built for early warning in storage and processing environments.",
    stack:
      "ESP-01S microcontroller with MQ137 (ammonia) and DHT22 (temperature/humidity) sensors; automated fan and buzzer actuation on threshold breach; web dashboard for real-time logging and alerts.",
    impact:
      "Automated response to unsafe ammonia levels via fan/buzzer control, a centralized real-time data stream with threshold alerting, and a low-cost design that retrofits to existing facilities.",
    tags: ["IoT", "ESP-01S", "MQ137 · DHT22", "Embedded", "Safety"],
  },
  {
    key: "sw",
    images: ["/images/projects/sw1.JPG"],
    video: null as string | null,
    caseLabel: "CASE 04-C · CAD & Kinematics",
    idx: "P/03 · CAD",
    title: "SolidWorks Design Projects",
    sub: "3D modeling · Engineering drawings",
    overview:
      "A body of parametric 3D modeling work in SolidWorks — from individual components to full assemblies with motion — that underpins the modeling fluency behind every product-design idea I take on.",
    stack:
      "Part-by-part modeling, mechanical mates and motion studies for kinematic validation, detailed engineering drawings, and rendered presentation views.",
    impact:
      "Full assembly transparency with interference-free motion simulation, and a reusable library of parts and drawings that accelerates future design work.",
    tags: ["SolidWorks", "3D Modeling", "Assemblies"],
  },
];

export const certification = {
  badge: "Certified",
  title: "Microsoft Excel",
  desc: "Advanced spreadsheet proficiency — data modeling, analysis, and the formula fluency that underpins every quality and optimization workflow I build.",
  skills: ["Data Analysis", "Formulas", "Modeling", "Visualization"],
  side: "Excel is where a lot of the real work starts — cleaning data, sketching a model, pressure-testing an idea before it ever becomes code. The certification formalizes a tool I lean on constantly across analysis and quality work.",
};

export const academy = {
  roleLine: "Co-Founder · Manager · Lead Mentor",
  heading:
    "Building a place to learn — and making sure cost was never the barrier.",
  lede: "I co-founded After Schools Academy and ran the whole operation end to end — curriculum, scheduling, day-to-day management, and the mentoring itself.",
  body: "Over its run I mentored 60+ students across their coursework. For those who couldn't afford tuition, I taught for free or for a small, fair remuneration — because the point was access to good teaching, not a paywall in front of it. Managing the academy taught me as much about people and systems as any engineering problem: how to scale attention, keep quality consistent, and meet each student where they actually were.",
  pull: "A few students learned for free — and that's the part of the academy I'm proudest of.",
  stats: [
    { v: "60+", k: "Students mentored" },
    { v: "100%", k: "Operations run solo, founder to floor" },
    { v: "Free", k: "Tuition for students who couldn't pay" },
  ],
};

// Photography gallery: /public/images/photos/photo1.jpg ... photo8.jpg
export const photos = [
  { n: 1, label: "Street", span: "tall", src: "/images/photos/photo1.jpg" },
  { n: 2, label: "Architecture", span: "wide", src: "/images/photos/photo2.jpg" },
  { n: 3, label: "Portrait", span: "", src: "/images/photos/photo3.jpg" },
  { n: 4, label: "Light", span: "", src: "/images/photos/photo4.jpg" },
  { n: 5, label: "Landscape", span: "wide", src: "/images/photos/photo5.jpg" },
  { n: 6, label: "Detail", span: "tall", src: "/images/photos/photo6.jpg" },
  { n: 7, label: "Mono", span: "", src: "/images/photos/photo7.jpg" },
  { n: 8, label: "Motion", span: "", src: "/images/photos/photo8.jpg" },
];
