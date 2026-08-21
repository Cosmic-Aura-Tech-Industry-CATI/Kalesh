export const companyInfo = {
  name: "Kalesh",
  legalName: "DIMISI TECHNOLOGIES PVT LTD",
  url: "https://thekalesh.com",
  teamUrl: "https://thekalesh.com/team",
  logo: "https://thekalesh.com/logo.png",
  description:
    "India's first real-time anonymous opinion and live polling platform for Gen-Z, built for honest expressions, instant voting, and fearless discussions.",
  email: "hello@thekalesh.com",
  country: "India",
  stats: {
    activeUsers: "2,00,000+",
    activeUsersLabel: "Active Users (Monthly)",
    livePolls: "Real-time Live Polls",
    anonymous: "100% Anonymous",
    honestConversations: "Honest Conversations",
  },
};

export const teamMembers = [
  // 1. Shikhar Dixit — CEO & Founder
  {
    id: "shikhar-dixit",
    slug: "shikhar-dixit",
    name: "Shikhar Dixit",
    kaleshRole: "CEO & Founder",
    dimisiRole: "Director & Founder",
    shortTagline: "Leading the vision and strategy for Kalesh.",
    avatar: "/images/team/Shikhar_Dixit.png",
    gallery: [
      {
        url: "/images/team/Shikhar_Dixit.png",
        alt: "Shikhar Dixit, CEO and Founder of Kalesh, portrait",
      },
    ],
    heroQuote:
      "Kalesh is more than an app, it's a movement to bring back real conversations where every opinion is equal and nobody is judged.",
    bio: "Shikhar Dixit is the visionary leader and founder of Kalesh, India's first real-time anonymous opinion & polling platform for Gen-Z. With a strong passion for building impactful digital products, he founded Kalesh to create a safe space where truth and authentic thoughts matter more than identities. He combines product thinking, business strategy, and community understanding to drive Kalesh's mission forward.",
    experience: "Product Strategy, Business Growth, Community Building",
    education: "Information Technology",
    passion:
      "Building products that create real impact and solve meaningful problems.",
    thoughtOnKalesh:
      "We grew up in a world where speaking your mind came with consequences — judgment, trolling, screenshots, and social pressure. Kalesh is our answer to that. It's a platform where you can be 100% real, share your opinions, vote on what matters, and have honest conversations without revealing who you are. My goal is to build the largest network of real opinions in India, where truth is valued more than popularity.",
    responsibilities: [
      "Setting the company vision, mission and long-term strategy",
      "Leading product direction, roadmap, and user experience",
      "Business development & strategic brand partnerships",
      "Investor relations, capital allocation & fundraising",
      "Team leadership, talent acquisition & organizational culture",
      "Marketing strategy, positioning, and Gen-Z growth loops",
      "Ensuring platform integrity, community safety, and user trust",
    ],
    whatTheyAreBuilding: [
      {
        title: "Vision & Strategy",
        desc: "Building the long-term vision and positioning Kalesh as India's premier real-time opinion layer.",
      },
      {
        title: "Product Growth",
        desc: "Driving product-market fit, viral user loops, live polling mechanics, and daily engagement.",
      },
      {
        title: "Community & Trust",
        desc: "Creating a secure, anonymous, and trusted environment for authentic Gen-Z discourse.",
      },
      {
        title: "Ecosystem & Partnerships",
        desc: "Building strong brand collaborations, campus ambassador networks, and distribution channels.",
      },
    ],
    socialLinks: {
      x: "https://x.com/shikhardixit_",
      xHandle: "@shikhardixit_",
      linkedin: "https://www.linkedin.com/in/shikhardixit",
      linkedinHandle: "/in/shikhardixit",
      instagram: "https://www.instagram.com/shikhardixit_",
      instagramHandle: "@shikhardixit_",
      dimisipedia: "https://dimisipedia.com/shikhar-dixit",
    },
    faqs: [
      {
        question: "Who is Shikhar Dixit?",
        answer:
          "Shikhar Dixit is an Indian tech entrepreneur, product strategist, and the CEO & Founder of Kalesh, as well as Director & Founder at DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question: "What is Shikhar Dixit's role at Kalesh?",
        answer:
          "Shikhar Dixit serves as the CEO & Founder of Kalesh, leading overall company strategy, product roadmap, investor relations, and brand vision.",
      },
      {
        question: "What does Shikhar Dixit do at Kalesh?",
        answer:
          "He oversees product direction, community safety algorithms, strategic growth initiatives, and platform positioning to provide a zero-judgment polling network for Gen-Z.",
      },
      {
        question: "Who founded Kalesh?",
        answer:
          "Kalesh was founded by Shikhar Dixit, together with co-founders Swatantra Singh (CTO) and Nishkarsh Mishra (CFO/COO) under DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question:
          "What is Shikhar Dixit's position at DIMISI TECHNOLOGIES PVT LTD?",
        answer:
          "Shikhar Dixit holds the position of Director & Founder at DIMISI TECHNOLOGIES PVT LTD.",
      },
    ],
  },

  // 2. Swatantra Singh — CTO & Co-Founder
  {
    id: "swatantra-singh",
    slug: "swatantra-singh",
    name: "Swatantra Singh",
    kaleshRole: "CTO & Co-Founder",
    dimisiRole: "Director & Co-Founder",
    shortTagline:
      "Building the technology and infrastructure that powers Kalesh.",
    avatar: "/images/team/Swatantra_Singh.png",
    gallery: [
      {
        url: "/images/team/Swatantra_Singh.png",
        alt: "Swatantra Singh, CTO & Co-Founder of Kalesh, portrait",
      },
    ],
    heroQuote:
      "True anonymity requires zero-compromise engineering. We build resilient systems so every voice stays authentic and secure.",
    bio: "Swatantra Singh is the technology architect, CTO, and Co-Founder of Kalesh. He spearheads engineering, cloud architecture, real-time data streaming, and cryptographic privacy standards. At DIMISI TECHNOLOGIES PVT LTD, he leads technology development across parent company projects.",
    experience:
      "Distributed Systems, Cloud Infrastructure, Real-Time Architecture",
    education: "Computer Science & Engineering",
    passion:
      "Scaling high-concurrency real-time engines with strict zero-knowledge security.",
    thoughtOnKalesh:
      "Building a platform with real-time live voting and total anonymity presents unique engineering challenges. Our infrastructure is crafted to handle hundreds of thousands of concurrent connections with sub-second polling synchronization while making user privacy irreversible and airtight.",
    responsibilities: [
      "Leading end-to-end technology strategy, architecture, and deployment",
      "Designing high-concurrency real-time WebSocket and polling servers",
      "Implementing zero-knowledge privacy protocols and data encryption",
      "Managing cloud infrastructure, DevOps pipelines, and uptime SLAs",
      "Directing core engineering sprints and quality assurance protocols",
      "Collaborating on algorithmic moderation to prevent abuse without compromising anonymity",
    ],
    whatTheyAreBuilding: [
      {
        title: "Real-Time Infrastructure",
        desc: "Low-latency WebSocket servers capable of broadcasting live poll swings to thousands of devices simultaneously.",
      },
      {
        title: "Privacy & Anonymity Core",
        desc: "Decoupled cryptographic identifier systems ensuring user interactions remain completely untraceable.",
      },
      {
        title: "Automated Scalability",
        desc: "Cloud-native auto-scaling clusters designed to handle sudden viral traffic spikes seamlessly.",
      },
      {
        title: "Engineering Excellence",
        desc: "Setting code benchmarks, CI/CD pipelines, and high-standard backend resilience.",
      },
    ],
    socialLinks: {
      x: "https://x.com/swatantrasingh",
      xHandle: "@swatantrasingh",
      linkedin: "https://www.linkedin.com/in/swatantrasingh",
      linkedinHandle: "/in/swatantrasingh",
      instagram: "https://www.instagram.com/swatantrasingh",
      instagramHandle: "@swatantrasingh",
      dimisipedia: "https://dimisipedia.com/swatantra-singh",
    },
    faqs: [
      {
        question: "Who is Swatantra Singh?",
        answer:
          "Swatantra Singh is the CTO & Co-Founder of Kalesh and Director & Co-Founder at DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question: "What is Swatantra Singh's role at Kalesh?",
        answer:
          "He serves as Chief Technology Officer (CTO), leading platform architecture, real-time infrastructure, and security engineering.",
      },
      {
        question: "What does Swatantra Singh build at Kalesh?",
        answer:
          "Swatantra builds the real-time polling backend, cryptographic anonymity layers, distributed database clusters, and cloud infrastructure.",
      },
    ],
  },

  // 3. Nishkarsh Mishra — CFO/COO & Co-Founder
  {
    id: "nishkarsh-mishra",
    slug: "nishkarsh-mishra",
    name: "Nishkarsh Mishra",
    kaleshRole: "CFO/COO & Co-Founder",
    dimisiRole: "Director & Co-Founder",
    shortTagline:
      "Managing finance, operations and driving sustainable growth.",
    avatar: "/images/team/Nishkarsh_Mishra.png",
    gallery: [
      {
        url: "/images/team/Nishkarsh_Mishra.png",
        alt: "Nishkarsh Mishra, CFO/COO & Co-Founder of Kalesh, portrait",
      },
    ],
    heroQuote:
      "Sustainable innovation happens when visionary ideas are backed by disciplined operations and fiscal clarity.",
    bio: "Nishkarsh Mishra is the operational backbone and financial strategist of Kalesh, serving as CFO/COO & Co-Founder. At DIMISI TECHNOLOGIES PVT LTD, he directs operational workflows, compliance, and corporate financial planning.",
    experience:
      "Financial Strategy, Operational Management, Corporate Governance",
    education: "Finance & Management",
    passion:
      "Scaling high-growth consumer tech startups through operational efficiency and robust unit economics.",
    thoughtOnKalesh:
      "Building a modern consumer tech brand requires agile execution. At Kalesh, we balance rapid iteration with rigorous compliance, data safety standards, and sustainable monetization structures that respect user freedom.",
    responsibilities: [
      "Overseeing corporate finance, budgeting, and unit economics",
      "Streamlining day-to-day operations and cross-functional execution",
      "Ensuring legal, regulatory, and data compliance for digital services",
      "Managing investor relations, reporting, and statutory audits",
      "Structuring vendor partnerships, monetization models, and business contracts",
      "Scaling operational workflows across the Kalesh and DIMISI ecosystems",
    ],
    whatTheyAreBuilding: [
      {
        title: "Operational Frameworks",
        desc: "Robust operational pipelines that allow engineering and product teams to execute rapidly.",
      },
      {
        title: "Fiscal Sustainability",
        desc: "Prudent financial models, runway management, and high-efficiency capital allocation.",
      },
      {
        title: "Corporate Governance",
        desc: "Legal adherence, regulatory filings, and corporate transparency under DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        title: "Monetization Roadmaps",
        desc: "Ethical revenue channels and brand integrations that preserve 100% user anonymity.",
      },
    ],
    socialLinks: {
      x: "https://x.com/nishkarshmishra",
      xHandle: "@nishkarshmishra",
      linkedin: "https://www.linkedin.com/in/nishkarshmishra",
      linkedinHandle: "/in/nishkarshmishra",
      instagram: "https://www.instagram.com/nishkarshmishra",
      instagramHandle: "@nishkarshmishra",
      dimisipedia: "https://dimisipedia.com/nishkarsh-mishra",
    },
    faqs: [
      {
        question: "Who is Nishkarsh Mishra?",
        answer:
          "Nishkarsh Mishra is the CFO/COO & Co-Founder of Kalesh and Director & Co-Founder at DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question: "What are Nishkarsh Mishra's responsibilities at Kalesh?",
        answer:
          "He manages financial planning, day-to-day operations, legal compliance, monetization strategies, and business development.",
      },
    ],
  },

  // 4. Mridul Mishra — Foundation Engineer
  {
    id: "mridul-mishra",
    slug: "mridul-mishra",
    name: "Mridul Mishra",
    kaleshRole: "Foundation Engineer",
    dimisiRole: "Core Systems Engineer",
    shortTagline: "Building the strong foundation and core systems of Kalesh.",
    avatar: "/images/team/Mridul_Mishra.png",
    gallery: [
      {
        url: "/images/team/Mridul_Mishra.png",
        alt: "Mridul Mishra, Foundation Engineer at Kalesh, portrait",
      },
    ],
    heroQuote:
      "A platform is only as fast and reliable as its core foundation. Clean code and robust data structures make real-time interaction effortless.",
    bio: "Mridul Mishra is the Foundation Engineer at Kalesh, responsible for core backend microservices, database optimizations, caching layers, and API performance. At DIMISI TECHNOLOGIES PVT LTD, he contributes to enterprise systems architecture.",
    experience:
      "Backend Architecture, Database Optimization, Caching & API Design",
    education: "Computer Science & Information Technology",
    passion:
      "Building resilient, low-latency microservices that deliver seamless real-time responses.",
    thoughtOnKalesh:
      "When users vote on a trending opinion, they expect instant feedback without lag or dropped connections. Building the foundation of Kalesh means engineering scalable APIs, reliable message brokers, and secure data storage.",
    responsibilities: [
      "Developing foundational backend microservices and API gateways",
      "Designing and optimizing relational and in-memory databases (Redis/Postgres)",
      "Building automated caching, rate-limiting, and bot-defense layers",
      "Ensuring sub-millisecond query execution on high-volume poll aggregations",
      "Collaborating with the Android team to optimize network payloads and telemetry",
      "Writing modular test suites and maintaining system observability",
    ],
    whatTheyAreBuilding: [
      {
        title: "Core API Services",
        desc: "Ultra-fast REST & WebSocket APIs powering live vote counting and instant feed updates.",
      },
      {
        title: "Database Caching Layers",
        desc: "Distributed caching engines ensuring instant aggregation of millions of votes.",
      },
      {
        title: "Bot & Spam Mitigation",
        desc: "Heuristic-based rate limiters protecting poll integrity from artificial manipulation.",
      },
      {
        title: "System Observability",
        desc: "Real-time metrics, tracing, and logging to ensure 99.99% service availability.",
      },
    ],
    socialLinks: {
      x: "https://x.com/mridulmishra",
      xHandle: "@mridulmishra",
      linkedin: "https://www.linkedin.com/in/mridulmishra",
      linkedinHandle: "/in/mridulmishra",
      instagram: "https://www.instagram.com/mridulmishra",
      instagramHandle: "@mridulmishra",
      dimisipedia: "https://dimisipedia.com/mridul-mishra",
    },
    faqs: [
      {
        question: "Who is Mridul Mishra?",
        answer:
          "Mridul Mishra is the Foundation Engineer at Kalesh and Core Systems Engineer at DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question: "What is Mridul Mishra's role at Kalesh?",
        answer:
          "Mridul engineers the foundational backend systems, database caching, API pipelines, and high-performance services that power Kalesh.",
      },
    ],
  },

  // 5. Sheelu Singh — Android Developer
  {
    id: "sheelu-singh",
    slug: "sheelu-singh",
    name: "Sheelu Singh",
    kaleshRole: "Android Developer",
    dimisiRole: "Mobile Systems Engineer",
    shortTagline: "Crafting seamless and powerful mobile experiences.",
    avatar: "/images/team/Sheelu_Singh.png",
    gallery: [
      {
        url: "/images/team/Sheelu_Singh.png",
        alt: "Sheelu Singh, Android Developer at Kalesh, portrait",
      },
    ],
    heroQuote:
      "A great mobile experience is invisible — it lets users express themselves freely, smoothly, and without friction.",
    bio: "Sheelu Singh is the Android Developer at Kalesh, responsible for engineering the native Android application, intuitive UI/UX interactions, reactive voting animations, and local cache synchronization. At DIMISI TECHNOLOGIES PVT LTD, she develops client-side mobile applications.",
    experience:
      "Android SDK, Kotlin, Jetpack Compose, Reactive UI, Offline Sync",
    education: "Information Technology & Mobile Computing",
    passion:
      "Crafting buttery-smooth, battery-efficient mobile applications with pixel-perfect design.",
    thoughtOnKalesh:
      "Gen-Z demands instant responsiveness and modern aesthetics. Developing the Kalesh Android app is all about delivering blazing-fast feed navigation, silky poll animations, and total client-side privacy safeguards.",
    responsibilities: [
      "Developing the native Kalesh Android application using modern Android architectures",
      "Creating fluid voting animations, gesture navigations, and dark-theme UI components",
      "Optimizing network payload consumption, memory footprints, and battery efficiency",
      "Implementing encrypted local caching for seamless offline-first experience",
      "Integrating real-time WebSocket listeners for live percentage swing visualizations",
      "Maintaining high crash-free rates and adhering to Google Play security guidelines",
    ],
    whatTheyAreBuilding: [
      {
        title: "Native Android App",
        desc: "High-performance Kotlin & Jetpack Compose application designed for millions of Gen-Z users.",
      },
      {
        title: "Reactive Voting UX",
        desc: "Haptic-backed interactive poll widgets with instant visual percentage feedback.",
      },
      {
        title: "Battery & Data Optimization",
        desc: "Lightweight client architecture ensuring minimum data usage and high frame rates.",
      },
      {
        title: "Mobile Security",
        desc: "Secure device-level keystore integration to protect user anonymity on mobile.",
      },
    ],
    socialLinks: {
      x: "https://x.com/sheelusingh",
      xHandle: "@sheelusingh",
      linkedin: "https://www.linkedin.com/in/sheelusingh",
      linkedinHandle: "/in/sheelusingh",
      instagram: "https://www.instagram.com/sheelusingh",
      instagramHandle: "@sheelusingh",
      dimisipedia: "https://dimisipedia.com/sheelu-singh",
    },
    faqs: [
      {
        question: "Who is Sheelu Singh?",
        answer:
          "Sheelu Singh is the Android Developer at Kalesh and Mobile Systems Engineer at DIMISI TECHNOLOGIES PVT LTD.",
      },
      {
        question: "Who develops Kalesh's Android application?",
        answer:
          "Sheelu Singh develops and maintains the official native Kalesh Android application.",
      },
    ],
  },
];
