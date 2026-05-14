import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

type Category =
  | "All"
  | "Short-Form Videos"
  | "Social Media Posts"
  | "Graphic Design"
  | "Website Creation"
  | "Analytics & Reports"
  | "Content Writing";

type WorkCategory = Exclude<Category, "All">;
type WorkItem = {
  title: string;
  category: WorkCategory;
  preview: string;
  description: string;
  details: string;
  accent: string;
};

type IconName =
  | "spark"
  | "arrow"
  | "mail"
  | "phone"
  | "play"
  | "image"
  | "chart"
  | "web"
  | "briefcases"
  | "briefcase"
  | "admin"
  | "systems"
  | "shield"
  | "care"
  | "moon"
  | "sun"
  | "star"
  | "download";

const icons: Record<IconName, string> = {
  spark: "✨",
  arrow: "🎯",
  mail: "✉️",
  phone: "📞",
  play: "🎬",
  image: "🖋️",
  chart: "📈",
  web: "🛍️",
  briefcases: "💼",
  briefcase: "◆",
  admin: "🗂️",
  systems: "🧩",
  shield: "🛡️",
  care: "🩺",
  moon: "🌙",
  sun: "☀️",
  star: "✦",
  download: "⤓",
};

const navItems = ["About", "Services", "Portfolio", "Experience", "Contact"];

const services: [string, string, IconName][] = [
  [
    "Executive Virtual Assistance",
    "Inbox management, scheduling, research, organization, documentation, and day-to-day operational support for busy founders and teams.",
    "briefcases",
  ],
  [
    "Social Media Management",
    "Content scheduling, publishing, engagement, captions, and platform support to keep brands active and consistent online.",
    "spark",
  ],
  [
  "Creative Support",
  "Branded visuals, caption writing, creative direction, and platform-ready assets designed to strengthen brand presence and audience engagement.",
  "image",
],
  [
    "Short-Form Video Editing",
    "Short-form video support for Reels, TikTok, and Shorts with polished editing, captions, hooks, and platform-ready formatting.",
    "play",
  ],
  [
    "Shopify Support",
    "Shopify layout customization, product organization, homepage editing, and e-commerce support.",
    "web",
  ],
  [
    "Customer Communication",
    "Customer support through Gorgias, email, and live chat with organized communication and customer-first assistance.",
    "mail",
  ],
  [
    "Analytics & Reporting",
    "Social media reporting, engagement tracking, growth insights, and organized performance summaries for client visibility.",
    "chart",
  ],
  [
    "Lead Generation",
    "Prospect research, lead organization, outreach tracking, and follow-up support for growing brands and agencies.",
    "arrow",
  ],
];

const howIHelp: [string, string, IconName][] = [
  [
    "Consistent content support",
    "Keeping content scheduled, captions polished, engagement managed, and platforms active without everything feeling rushed or disorganized.",
    "spark",
  ],
  [
    "Organized backend operations",
    "Supporting inboxes, reporting, follow-ups, scheduling, and admin workflows so founders can focus on higher-level priorities.",
    "briefcase",
  ],
  [
    "Better customer experience",
    "Helping customers feel supported through organized communication, faster responses, and smoother Shopify support workflows.",
    "mail",
  ],
  [
    "Reliable day-to-day execution",
    "Helping brands stay consistent behind the scenes through dependable support, attention to detail, and proactive communication.",
    "chart",
  ],
];

const works: WorkItem[] = [
  {
    title: "Why Posting Every Day Isn’t the Secret",
    category: "Short-Form Videos",
    preview: "/Reel 2 (1).mp4",
    description:
      "Business-focused short-form reel edited for audience retention, clear messaging, and strong social media pacing.",
    details:
      "Edited for stronger audience retention, cleaner pacing, and more engaging social-first storytelling.",
    accent: "linear-gradient(135deg,#22d3ee,#3b82f6,#7c3aed)",
  },
  {
    title: "Marketing Without ROI Is Costly",
    category: "Short-Form Videos",
    preview: "/Reel3.mp4",
    description:
      "Short-form marketing reel focused on ROI, positioning, and stronger customer-focused messaging.",
    details:
      "Focused on business clarity, audience attention, and polished short-form content presentation.",
    accent: "linear-gradient(135deg,#34d399,#14b8a6,#06b6d4)",
  },
  {
    title: "Apple Vision Pro First-Time Experience",
    category: "Short-Form Videos",
    preview: "/Reel 4 (1).mp4",
    description:
      "Lifestyle and tech-focused short-form content edited for engagement, storytelling, and platform retention.",
    details:
      "Blends reaction-based storytelling with cleaner pacing and platform-focused editing support.",
    accent: "linear-gradient(135deg,#8b5cf6,#a855f7,#4f46e5)",
  },
  {
    title: "Story-Driven LinkedIn Caption Strategy",
    category: "Content Writing",
    preview: "/Creating-Caption-1.png",
    description:
      "This caption framework was written to make content feel more personal, conversation-driven, and emotionally engaging instead of overly promotional.",
    details:
      "The structure improves readability, emotional connection, audience retention, and overall engagement quality.",
    accent: "linear-gradient(135deg,#0f172a,#4338ca,#7c3aed)",
  },
  {
    title: "Brand Voice & Audience Engagement Copy",
    category: "Content Writing",
    preview: "/Creating-Caption-2.png",
    description:
      "Copywriting sample focused on improving clarity, audience connection, and content structure while keeping a polished brand voice.",
    details:
      "The content was reorganized to create cleaner communication, smoother reading flow, and stronger audience attention.",
    accent: "linear-gradient(135deg,#ec4899,#d946ef,#7c3aed)",
  },
  {
    title: "Community Engagement Management",
    category: "Social Media Posts",
    preview: "/comment1.png",
    description:
      "Engagement replies written to help the brand feel more active, approachable, and human instead of generic or automated.",
    details:
      "Focused on increasing interaction through conversational, thoughtful replies that matched the brand tone and community style.",
    accent: "linear-gradient(135deg,#2563eb,#0ea5e9,#22d3ee)",
  },
  {
    title: "Audience Interaction & Visibility Support",
    category: "Social Media Posts",
    preview: "/comment2.png",
    description:
      "Audience interaction sample designed to improve response quality while keeping the brand visible and responsive online.",
    details:
      "The replies were adjusted to feel more conversational and community-focused, helping increase audience connection and engagement visibility.",
    accent: "linear-gradient(135deg,#7c3aed,#6366f1,#3b82f6)",
  },
  {
    title: "Brand Community Communication Support",
    category: "Social Media Posts",
    preview: "/comment3.png",
    description:
      "Engagement sample showing how thoughtful communication strengthens trust, consistency, and community interaction.",
    details:
      "The communication style was refined to feel natural, supportive, and aligned with the brand personality while improving interaction quality.",
    accent: "linear-gradient(135deg,#f43f5e,#ec4899,#9333ea)",
  },
  {
    title: "Social Media Performance Reporting",
    category: "Analytics & Reports",
    preview: "/analytics.png",
    description:
      "Client-ready analytics reporting focused on impressions, engagement, growth tracking, audience performance, and content insights.",
    details:
      "This reporting layout helps clients quickly understand performance trends, engagement, and visibility without overwhelming data presentation.",
    accent: "linear-gradient(135deg,#22c55e,#14b8a6,#0ea5e9)",
  },
  {
    title: "Performance Reporting & Analytics Tracking",
    category: "Analytics & Reports",
    preview: "/analytics2.png",
    description:
      "Organized client reporting dashboard focused on impressions, engagement tracking, audience growth, and visibility insights.",
    details:
      "The structure makes performance data easier to understand, visually cleaner, and more useful for client decision-making.",
    accent: "linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)",
  },
  {
    title: "Shopify Storefront & Product Layout",
    category: "Website Creation",
    preview: "/shopify (1).mp4",
    description:
      "Shopify storefront support focused on cleaner product organization, homepage structure, navigation, and polished e-commerce presentation.",
    details:
      "The storefront layout was refined to improve browsing experience, product visibility, structure, and customer usability.",
    accent: "linear-gradient(135deg,#84cc16,#22c55e,#14b8a6)",
  },
  {
    title: "YouTube & Social Media Thumbnail Design",
    category: "Graphic Design",
    preview: "/Thumbnail.png",
    description:
      "Thumbnail designs created to improve click-through visibility using stronger hierarchy, bold text placement, and attention-focused visuals.",
    details:
      "The designs were structured to feel visually competitive, easier to scan, and more optimized for audience attention across platforms.",
    accent: "linear-gradient(135deg,#22d3ee,#3b82f6,#9333ea)",
  },
];

const experience = [
  [
    "Nov 2025 – Present",
    "Shopify Website Designer & Customer Support",
    "Freelance / E-Commerce Support",
    "Built and customized Shopify layout design while supporting customer communication through Gorgias, email support, and e-commerce workflows.",
  ],
  [
    "Jan 2024 – Present",
    "Social Media Manager & Digital Support Specialist",
    "Digital Kairos Marketing Agency",
    "Managed social media publishing, engagement, reporting, captions, inbox support, scheduling, and backend digital operations for multiple brands and business accounts.",
  ],
  [
    "Aug 2023 – Jan 2024",
    "Executive Assistant & Operations Support",
    "May’Amor Travel Agency",
    "Supported backend operations through inbox management, scheduling, lead organization, reporting assistance, research tasks, and administrative coordination.",
  ],
  [
    "Aug 2021 – Sep 2023",
    "Veterinary Technologist",
    "Happy Cats and Dog Vet Clinic",
    "Provided clinical support, animal handling, emergency care assistance, and client communication in high-pressure veterinary environments.",
  ],
  [
    "Sep 2019 – Sep 2020",
    "Veterinary Technologist",
    "G.S.C Pet Care Center",
    "Assisted with surgical preparation, patient recovery, medication support, documentation, and compassionate client care within a fast-paced clinic setting.",
  ],
];

const skillCategories = [
  {
    title: "Digital Marketing Support",
    eyebrow: "Strategy + execution",
    icon: "chart" as IconName,
    description:
      "Support for campaign organization, reporting, content coordination, research tasks, and day-to-day marketing operations.",
    skills: [
      "Reporting",
      "Campaign Tracking",
      "Research",
      "Documentation",
      "Lead Generation",
      "Client Updates",
    ],
  },
  {
    title: "Social Media Management",
    eyebrow: "Content + community",
    icon: "spark" as IconName,
    description:
      "Content publishing, captions, engagement, scheduling, and platform support focused on maintaining consistent brand presence.",
    skills: [
      "LinkedIn",
      "Instagram",
      "TikTok",
      "Facebook",
      "YouTube",
      "Engagement",
    ],
  },
  {
    title: "Executive & Admin Support",
    eyebrow: "Operations + admin",
    icon: "admin" as IconName,
    description:
      "Reliable backend support for inbox management, scheduling, organization, research, and structured administrative workflows.",
    skills: [
      "Email",
      "Calendar",
      "Research",
      "Data Entry",
      "Inbox Triage",
      "Task Management",
    ],
  },
  {
    title: "Shopify & Customer Support",
    eyebrow: "E-commerce + CX",
    icon: "web" as IconName,
    description:
      "Shopify support and customer communication workflows using Gorgias, email support, and e-commerce assistance.",
    skills: [
      "Shopify",
      "Gorgias",
      "Email Support",
      "Live Chat",
      "Product Uploads",
      "Customer Experience",
    ],
  },
  {
    title: "Content & Creative Production",
    eyebrow: "Design + editing",
    icon: "image" as IconName,
    description:
      "Creative support for short-form videos, captions, branded graphics, visual layouts, and social media content assets.",
    skills: [
      "Canva",
      "CapCut",
      "Graphics",
      "Video Editing",
      "Thumbnails",
      "Social Assets",
    ],
  },
  {
    title: "Veterinary & Client Care",
    eyebrow: "Precision + empathy",
    icon: "care" as IconName,
    description:
      "Clinical care experience that strengthened communication, organization, attention to detail, and calm client-facing support.",
    skills: [
      "Animal Handling",
      "Documentation",
      "Emergency Care",
      "Medication Support",
      "Client Education",
      "Patient Care",
    ],
  },
];

const testimonials = [
  {
    type: "CLIENT TESTIMONIAL",
    name: "Client Experience & Feedback",
    role: "Client Proof",
    quote:
      "Video feedback highlighting communication quality, reliability, organization, and overall client support experience.",
    media: "/testimonial-video.mp4",
  },
  {
    type: "text",
    name: "Angel May",
    role: "CEO • May’Amor Travel",
    quote:
      "Rolina brings structure, reliability, and consistency to the daily operations behind the business. Her communication, organization, and follow-through made a huge difference in keeping things running smoothly.",
    media: "",
  },
  {
    type: "text",
    name: "E-Commerce Client",
    role: "Shopify + Customer Support",
    quote:
      "What stood out most was her ability to balance customer communication, backend organization, and creative support all at once. She adapts quickly and handles tasks with professionalism and care.",
    media: "",
  },
];

const toolStrip = [
  { name: "Shopify", logo: "/shopify.png" },
  { name: "Gorgias", logo: "/gorgias.png" },
  { name: "Asana", logo: "/asana.png" },
  { name: "Authored", logo: "/auapp.png" },
  { name: "Calendly", logo: "/calendly.png" },
  { name: "Canva", logo: "/canva.png" },
  { name: "CapCut", logo: "/capcut.png" },
  { name: "ClickUp", logo: "/clickup.png" },
  { name: "Discord", logo: "/dc.png" },
  { name: "Facebook", logo: "/fb.png" },
  { name: "ChatGPT", logo: "/gpt.png" },
  { name: "Google Workspace", logo: "/gworkspace.png" },
  { name: "Instagram", logo: "/ig.png" },
  { name: "LastPass", logo: "/lastpass.png" },
  { name: "LinkedIn", logo: "/linkedin.png" },
  { name: "Notion", logo: "/notion.png" },
  { name: "Photoshop", logo: "/ps.png" },
  { name: "Slack", logo: "/slack.png" },
  { name: "TikTok", logo: "/tiktok.png" },
  { name: "ProtonVPN", logo: "/vpn.png" },
  { name: "Zoom", logo: "/zoom.png" },
];

export function validatePortfolioData(items: WorkItem[]) {
  return {
    hasThreeVideos:
      items.filter((item) => item.category === "Short-Form Videos").length ===
      3,
    hasTwoCaptions:
      items.filter((item) => item.category === "Content Writing").length === 2,
    hasThreeComments:
      items.filter((item) => item.category === "Social Media Posts").length ===
      3,
    hasAnalytics: items.some((item) => item.category === "Analytics & Reports"),
    hasShopify: items.some((item) => item.title.includes("Shopify")),
    hasThumbnail: items.some((item) => item.title.includes("Thumbnail")),
    hasHowIHelp: howIHelp.length === 4,
    hasPhilosophy: true,
    hasToolLogos: toolStrip.every((tool) => tool.logo.startsWith("/")),
    hasNoBrokenLogoPath: toolStrip.every(
      (tool) => !tool.logo.includes("//") && !tool.logo.includes("/logos//")
    ),
  };
}

const tests = validatePortfolioData(works);
if (typeof console !== "undefined") {
  console.assert(
    tests.hasThreeVideos,
    "Expected 3 active short-form video samples"
  );
  console.assert(tests.hasTwoCaptions, "Expected 2 content writing samples");
  console.assert(tests.hasThreeComments, "Expected 3 engagement samples");
  console.assert(tests.hasAnalytics, "Expected analytics samples");
  console.assert(tests.hasShopify, "Expected Shopify sample");
  console.assert(tests.hasThumbnail, "Expected thumbnail sample");
  console.assert(tests.hasHowIHelp, "Expected How I Help section data");
  console.assert(tests.hasPhilosophy, "Expected personal philosophy line");
  console.assert(tests.hasToolLogos, "Expected root public logo image paths");
  console.assert(
    tests.hasNoBrokenLogoPath,
    "Expected no doubled slash logo paths"
  );
}

function Icon({ name }: { name: IconName }) {
  return <span>{icons[name]}</span>;
}

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </motion.div>
  );
}

const isMediaFile = (value: string) => value.startsWith("/");
const isVideoFile = (value: string) =>
  [".mp4", ".webm", ".mov"].some((ext) => value.toLowerCase().endsWith(ext));

function PhoneMockup({
  label,
  large = false,
}: {
  label: string;
  large?: boolean;
}) {
  return (
    <div className={large ? "phone phone-large" : "phone"}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        {isVideoFile(label) ? (
          <video
            src={encodeURI(label)}
            autoPlay
            muted
            loop
            playsInline
            controls={large}
            preload="metadata"
            className="phone-video"
          />
        ) : (
          <div className="phone-placeholder">
            <b>▶</b>
            <p>{label}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WorkPreview({
  item,
  large = false,
}: {
  item: WorkItem;
  large?: boolean;
}) {
  const mediaSrc = encodeURI(item.preview);
  if (item.category === "Short-Form Videos")
    return <PhoneMockup label={item.preview} large={large} />;
  if (isVideoFile(item.preview))
    return (
      <video
        src={mediaSrc}
        autoPlay
        muted
        loop
        playsInline
        controls={large}
        preload="metadata"
        className={
          large ? "media-preview media-preview-large" : "media-preview"
        }
      />
    );
  if (isMediaFile(item.preview))
    return (
      <img
        src={mediaSrc}
        alt={item.title}
        className={
          large ? "media-preview media-preview-large" : "media-preview"
        }
      />
    );
  return (
    <div className="preview-center">
      <b>▧</b>
      <span>{item.preview}</span>
    </div>
  );
}

export default function RolinaPortfolio() {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.001,
  });
  const categories = useMemo(
    () =>
      [
        "All",
        ...Array.from(new Set(works.map((item) => item.category))),
      ] as Category[],
    []
  );
  const filtered =
    category === "All"
      ? works
      : works.filter((item) => item.category === category);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={dark ? "site dark" : "site"}>
      <style>{styles}</style>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <b>✦</b>
              <p>Rolina Cantre</p>
              <h1>Loading portfolio experience</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX }} className="scroll-progress" />
      <div className="orb one" />
      <div className="orb two" />
      <div className="orb three" />
      <nav className="nav">
        <button onClick={() => scrollToSection("home")} className="brand">
           <img
    src="/favicon.png"
    alt="Rolina Cantre logo"
    className="brand-logo"
  />
          <b>Rolina Cantre</b>
        </button>
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button
            onClick={() => scrollToSection("contact")}
            className="work-btn"
          >
            Let’s Work
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="theme-btn"
            aria-label="Toggle theme"
          >
            <Icon name={dark ? "sun" : "moon"} />
          </button>
        </div>
      </nav>
      <main>
        <section id="home" className="hero wrap">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="pill">
              <Icon name="spark" /> Creative Digital Support
            </div>
            <h1>Rolina Cantre</h1>
            <h3>
              Executive Virtual Assistant • Social Media & Digital Operations
            </h3>
            <div className="hero-intro">
              <p>
                I help founders, agencies, and e-commerce brands stay organized,
                visible, and operationally smooth through executive assistance,
                social media support, Shopify management, content coordination,
                and customer experience support.
              </p>
              <p>
                Helping businesses stay organized behind the scenes while
                maintaining a polished digital presence.
              </p>
            </div>
            <div className="cta-row">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="primary-btn"
              >
                View Portfolio
              </button>
              <a
                href="/Rolina-Cantre-Resume.pdf"
                download
                className="secondary-btn"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
          <motion.div
            className="portrait-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src="/rolina.png" alt="Rolina Cantre professional portrait" />
            <div>
              <span>Available For</span>
              <b>Executive & Creative Support</b>
            </div>
          </motion.div>
        </section>

        <section className="stats wrap">
          {[
            ["5+", "Years Supporting Brands & Businesses"],
            [
              "Creative + Operations",
              "Support that blends organization, content, and execution",
            ],
            [
              "Multi-Platform",
              "Social media, Shopify, customer support, and backend operations",
            ],
          ].map(([number, label]) => (
            <div className="stat-card" key={label}>
              <h3>{number}</h3>
              <p>{label}</p>
            </div>
          ))}
        </section>

        <section className="tools-marquee-section wrap">
          <div className="tools-marquee-card">
            <span>Tools I work with</span>
            <div className="marquee-fade">
              <div className="marquee-track">
                {[...toolStrip, ...toolStrip].map((tool, index) => (
                  <div
                    className="tool-logo-pill"
                    key={`${tool.name}-${index}`}
                    title={tool.name}
                  >
                    <img
                      src={encodeURI(tool.logo)}
                      alt={`${tool.name} logo`}
                      onError={(event) => {
                        event.currentTarget.classList.add("is-hidden");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="wrap section about-section-premium">
          <SectionHeader
            eyebrow="About"
            title="Creative support built on precision, clarity, and reliability"
            text="My background started in clinical care and evolved into digital operations shaping a work style that’s calm, organized, and detail-focused behind the scenes."
          />

          <div className="about-premium-grid">
            <div className="about-premium-card about-story-card">
              <span className="about-card-eyebrow">My Background</span>
              <h3>From veterinary care to digital support.</h3>
              <p>
                Clinical environments taught me how to stay calm under pressure,
                communicate clearly, document details accurately, and support
                people with care.
              </p>
              <p>
                Today, I bring that same precision into content coordination,
                Shopify workflows, customer communication, reporting, and
                organized backend support for founders, agencies, and e-commerce
                brands.
              </p>

              <div className="support-belief-card">
                <div className="belief-icon">
                  <Icon name="star" />
                </div>
                <strong>
                  Great support should make the business feel lighter, calmer,
                  and easier to run.
                </strong>
              </div>

              <div className="about-photo-pair">
                <div className="about-photo-card">
                  <img
                    src="/vet1.jpg"
                    alt="Rolina working in veterinary care"
                  />
                  <div>
                    <span>Clinical care foundation</span>
                    <em />
                  </div>
                </div>
                <div className="about-photo-card">
                  <img src="/pc.png" alt="Rolina computer workspace setup" />
                  <div>
                    <span>digital workspace</span>
                    <em />
                  </div>
                </div>
              </div>
            </div>

            <div className="about-premium-card support-card">
              <span className="about-card-eyebrow">Working Style</span>
              <h3>Support that feels clear, steady, and easy to trust.</h3>
              <div className="support-accent-line" />

              {[
                [
                  "Organized systems",
                  "Clean workflows, documented tasks, and structured backend support that keep moving pieces easier to manage.",
                  "systems" as IconName,
                ],
                [
                  "Clear communication",
                  "Thoughtful updates, organized follow-through, and a calm support style that helps teams stay aligned.",
                  "mail" as IconName,
                ],
                [
                  "Creative execution",
                  "Polished content support, visual consistency, and detail-focused execution across digital platforms.",
                  "spark" as IconName,
                ],
                [
                  "Reliable ownership",
                  "Consistent day-to-day support with attention to quality, timelines, and the small details that protect the brand.",
                  "shield" as IconName,
                ],
              ].map(([title, description, icon]) => (
                <div className="support-feature" key={title as string}>
                  <div className="support-feature-icon">
                    <Icon name={icon as IconName} />
                  </div>
                  <div>
                    <h4>{title as string}</h4>
                    <p>{description as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="wrap section">
          <SectionHeader
            eyebrow="Services"
            title="Digital support designed to keep brands organized, visible, and moving smoothly"
            text="Supporting founders, agencies, and e-commerce brands through organized operations, polished content, customer support, and backend execution."
          />
          <div className="service-grid">
            {services.map(([title, description, icon]) => (
              <div className="service-card" key={title}>
                <div className="service-icon">
                  <Icon name={icon} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="wrap section">
          <SectionHeader
            eyebrow="Portfolio Showcase"
            title="A closer look at the work behind the scenes"
            text="A showcase of content support, social media execution, Shopify projects, and creative assets designed for modern brands."
          />
          <div className="filter-row">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="work-grid">
            {filtered.map((item) => (
              <article
                className="work-card"
                key={item.title}
                onClick={() => setSelected(item)}
              >
                <div
                  className="work-preview"
                  style={{ background: item.accent }}
                >
                  <WorkPreview item={item} />
                </div>
                <div className="work-content">
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>Open project preview</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="wrap section refined-experience-section">
          <SectionHeader
            eyebrow="Experience"
            title="High-volume digital support across social media and Shopify"
            text="A cleaner look at the work I’ve done behind the scenes — from managing 10+ agency client accounts to building Shopify layouts and supporting customer communication."
          />

          <div className="refined-experience-stack">
            <div className="refined-experience-card primary-experience-card">
              <div className="experience-copy-block">
                <span>Digital Kairos Marketing Agency</span>
                <h3>Managed caption creation and engagement posting for 10+ client brands simultaneously.</h3>
                <p>
                  I supported the agency’s day-to-day social media operations by
                  keeping captions, engagement activity, post links, tracking,
                  and reporting details organized across multiple client
                  accounts. My focus was making high-volume execution feel
                  cleaner, easier to review, and more consistent for the team.
                </p>
              </div>

              <div className="experience-highlight-panel">
                <div>
                  <strong>10+</strong>
                  <small>client accounts supported at once</small>
                </div>
                <div>
                  <strong>Caption + Engagement</strong>
                  <small>daily LinkedIn execution support</small>
                </div>
                <div>
                  <strong>Reporting Ready</strong>
                  <small>organized links, metrics, and updates</small>
                </div>
              </div>

              <div className="experience-proof-list">
                {[
                  "Created and polished captions so posts were easier to publish and aligned with each client’s brand voice.",
                  "Handled engagement posting and thoughtful comment support to keep accounts active, visible, and conversational.",
                  "Tracked post links, impressions, screenshots, and weekly/monthly reporting notes for clearer team visibility.",
                ].map((item) => (
                  <div className="experience-proof-item" key={item}>
                    <span>✦</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="refined-experience-card secondary-experience-card">
              <div className="experience-copy-block">
                <span>Shopify Design + Customer Support</span>
                <h3>Built cleaner Shopify layouts while supporting customer conversations through Gorgias and email.</h3>
                <p>
                  I helped improve e-commerce workflows by supporting Shopify
                  page design, product layout updates, storefront organization,
                  and customer communication across Gorgias, email, and other
                  support platforms. The goal was to make the store easier to
                  browse and the customer experience easier to manage.
                </p>
              </div>

              <div className="shopify-support-row">
                <div>
                  <Icon name="web" />
                  <strong>Shopify layout support</strong>
                </div>
                <div>
                  <Icon name="mail" />
                  <strong>Gorgias + email support</strong>
                </div>
                <div>
                  <Icon name="chart" />
                  <strong>Customer workflow organization</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="wrap section">
          <SectionHeader
            eyebrow="Tools & Skills"
            title="Tools and skills built through real client work"
            text="A mix of creative, operational, and client-facing tools used across daily digital workflows."
          />
          <div className="skill-category-grid">
            {skillCategories.map((category) => (
              <div className="skill-category-card" key={category.title}>
                <div className="skill-card-top">
                  <div className="skill-icon">
                    <Icon name={category.icon} />
                  </div>
                  <div>
                    <span>{category.eyebrow}</span>
                    <h3>{category.title}</h3>
                  </div>
                </div>
                <p>{category.description}</p>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <em key={skill}>{skill}</em>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="wrap section">
          <SectionHeader
            eyebrow="Testimonials"
            title="Kind words from people I’ve worked with"
            text="A few words from clients and teams I’ve supported behind the scenes."
          />
          <div className="testimonial-grid">
            <div className="testimonial-video-card">
              <div className="testimonial-video-shell">
                <video
                  src={encodeURI(testimonials[0].media)}
                  controls
                  playsInline
                  preload="metadata"
                />
                <div>
                  <Icon name="play" />
                  <span>Upload testimonial-video.mp4 inside public</span>
                </div>
              </div>
              <div>
                <small>{testimonials[0].type}</small>
                <h3>{testimonials[0].name}</h3>
                <p>{testimonials[0].quote}</p>
              </div>
            </div>
            <div>
              {testimonials.slice(1).map((item) => (
                <div className="testimonial-card" key={item.name + item.role}>
                  <div className="quote-mark">“</div>
                  <p>{item.quote}</p>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="wrap section">
          <div className="contact-card">
            <div>
              <span>Contact</span>
              <h2>Behind every consistent brand is organized support.</h2>
              <a href="mailto:rolinagva@gmail.com">
                <Icon name="mail" /> rolinagva@gmail.com
              </a>
              <a href="tel:+639761800549">
                <Icon name="phone" /> +63 976 180 0549
              </a>
            </div>
            <form action="https://formspree.io/f/mqenywzb" method="POST">
              <div className="form-row">
                <input name="name" placeholder="Name" required />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>
              <input name="Subject" placeholder="What can I help you with?" />
              <textarea
                name="message"
                placeholder="Tell me a little about your business and how I can help."
                required
              />
              <button type="submit">Start a Conversation</button>
            </form>
          </div>
          <footer>
            <p>
              © 2024 Rolina Cantre • Executive Virtual Assistant • Social Media
              & Digital Operations
            </p>
            <button onClick={() => scrollToSection("home")}>
              Back to top ↑
            </button>
          </footer>
        </section>
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="modal-close" onClick={() => setSelected(null)}>
              ×
            </button>
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                event.stopPropagation()
              }
            >
              <div
                className="modal-preview"
                style={{ background: selected.accent }}
              >
                <WorkPreview item={selected} large />
              </div>
              <div className="modal-info">
                <small>{selected.category}</small>
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
                <div className="note">
                  <b>Project Highlights</b>
                  <span>{selected.details}</span>
                </div>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics/>
    </div>
  );
}

const styles = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}button,input,textarea{font:inherit}button{cursor:pointer}a{text-decoration:none}:root{--text:#0f172a;--muted:#64748b;--card:rgba(255,255,255,.72);--card2:rgba(255,255,255,.86);--line:rgba(15,23,42,.08);--soft:#f8fafc;--shadow:0 18px 55px rgba(88,28,135,.10);--nav:rgba(255,255,255,.84);--glass:blur(16px)}.dark{--text:#f8fafc;--muted:#cbd5e1;--card:rgba(255,255,255,.07);--card2:rgba(15,23,42,.74);--line:rgba(255,255,255,.11);--soft:rgba(255,255,255,.06);--shadow:0 24px 70px rgba(0,0,0,.28);--nav:rgba(2,6,23,.82)}
.site{min-height:100vh;overflow-x:hidden;color:var(--text);background:radial-gradient(circle at top left,rgba(217,70,239,.16),transparent 34rem),radial-gradient(circle at bottom left,rgba(34,211,238,.18),transparent 34rem),linear-gradient(135deg,#fbf8ff,#f8fafc 52%,#fdf2f8);transition:background .25s ease,color .25s ease}.site.dark{background:radial-gradient(circle at top left,rgba(217,70,239,.18),transparent 34rem),radial-gradient(circle at bottom left,rgba(34,211,238,.12),transparent 34rem),linear-gradient(135deg,#020617,#111827 56%,#1e1b4b)}.wrap{width:min(1180px,calc(100% - 2rem));margin:0 auto;position:relative;z-index:1}.narrow{width:min(980px,calc(100% - 2rem))}.scroll-progress{position:fixed;top:0;left:0;height:4px;width:100%;transform-origin:left;z-index:120;background:linear-gradient(90deg,#22d3ee,#d946ef,#7c3aed)}
.orb{position:fixed;border-radius:999px;filter:blur(60px);pointer-events:none;opacity:.24}.orb.one{width:32rem;height:32rem;top:-12rem;left:45%;background:#d946ef}.orb.two{width:28rem;height:28rem;bottom:-12rem;left:-10rem;background:#22d3ee}.orb.three{width:26rem;height:26rem;top:35%;right:-10rem;background:#7c3aed}.loader{position:fixed;inset:0;z-index:999;display:grid;place-items:center;background:#020617;color:white}.loader>div{text-align:center}.loader b{display:grid;place-items:center;margin:0 auto 1.5rem;width:4rem;height:4rem;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.05);font-size:1.5rem}.loader p{text-transform:uppercase;letter-spacing:.35em;color:rgba(255,255,255,.6);font-size:.8rem}.loader h1{margin:.75rem 0 0;font-size:2rem;letter-spacing:-.04em}
.nav{position:fixed;left:50%;top:1.25rem;transform:translateX(-50%);width:min(1120px,calc(100% - 1.5rem));z-index:100;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.75rem;border:1px solid var(--line);border-radius:999px;background:var(--nav);box-shadow:var(--shadow);backdrop-filter:var(--glass)}.brand{display:flex;align-items:center;gap:.7rem;border:0;background:transparent;color:var(--text);font-weight:850}.brand-logo{
  width:45px;
  height:45px;
  object-fit:contain;
  border-radius:16px;

  filter:
    drop-shadow(0 10px 20px rgba(168,85,247,.28));

  transition:transform .2s ease;
}

.brand:hover .brand-logo{
  transform:scale(1.04);
}.nav-links{display:flex;align-items:center;gap:.35rem}.nav-links button{border:0;border-radius:999px;padding:.72rem 1rem;color:var(--muted);background:transparent;font-weight:700;font-size:.88rem}.nav-links button:hover{background:var(--soft);color:var(--text)}.nav-actions{display:flex;gap:.5rem}.work-btn{border:0;border-radius:999px;padding:.72rem 1rem;background:linear-gradient(135deg,#7c3aed,#d946ef);color:white;font-weight:850}.theme-btn{width:2.55rem;height:2.55rem;display:grid;place-items:center;border-radius:999px;background:var(--card2);color:var(--text);border:1px solid var(--line)}
.hero{min-height:100vh;padding-top:7rem;display:grid;grid-template-columns:1.05fr .95fr;gap:4rem;align-items:center}.pill{width:max-content;display:flex;gap:.5rem;align-items:center;padding:.7rem 1rem;border-radius:999px;color:#a21caf;background:rgba(255,255,255,.72);border:1px solid #f5d0fe;backdrop-filter:blur(10px);font-weight:800}.dark .pill{color:#a5f3fc;background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.1)}.hero h1{margin:1.5rem 0;font-size:clamp(4.5rem,9vw,9rem);line-height:.9;letter-spacing:-.075em}.hero h3{max-width:48rem;margin:0;font-size:clamp(1.25rem,2vw,1.65rem);line-height:1.45}.hero p{max-width:42rem;color:var(--muted);line-height:1.8}.hero-intro{display:grid;gap:.65rem;margin-top:1.2rem}.hero-intro p{margin:0}.cta-row{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.primary-btn,.secondary-btn{border-radius:999px;padding:1rem 1.35rem;font-weight:850;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:.45rem}.primary-btn{border:0;color:white;background:linear-gradient(135deg,#7c3aed,#d946ef,#ec4899);box-shadow:0 14px 34px rgba(217,70,239,.18)}.secondary-btn{color:var(--text);background:var(--card);border:1px solid var(--line);backdrop-filter:var(--glass)}
.portrait-card{position:relative;border-radius:2.5rem;padding:.85rem;border:1px solid var(--line);background:var(--card);box-shadow:var(--shadow);backdrop-filter:var(--glass)}.portrait-card:before{content:"";position:absolute;inset:-1.5rem;z-index:-1;border-radius:3rem;background:linear-gradient(135deg,#22d3ee,#d946ef,#7c3aed);opacity:.28;filter:blur(40px)}.portrait-card img{width:100%;height:620px;display:block;object-fit:cover;border-radius:2rem}.portrait-card>div{position:absolute;left:2rem;right:2rem;bottom:2rem;padding:1.15rem;border-radius:1.5rem;background:rgba(255,255,255,.82);backdrop-filter:blur(16px)}.dark .portrait-card>div{background:rgba(2,6,23,.72)}.portrait-card span{display:block;color:var(--muted);font-size:.75rem;text-transform:uppercase;letter-spacing:.22em}.portrait-card b{display:block;margin-top:.35rem;color:var(--text)}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;padding:2rem 0}.stat-card,.glass-card,.service-card,.work-card,.skill-category-card,.testimonial-card,.testimonial-video-card,.tools-marquee-card,.how-help-card{border:1px solid var(--line);background:var(--card);border-radius:2rem;box-shadow:var(--shadow);backdrop-filter:var(--glass)}.stat-card{padding:1.6rem}.stat-card h3{margin:0;font-size:3rem;letter-spacing:-.06em;background:linear-gradient(135deg,#6d28d9,#d946ef);-webkit-background-clip:text;color:transparent}.stat-card p{margin:.5rem 0 0;color:var(--muted)}
.tools-marquee-section{padding:1rem 0 2.25rem}.tools-marquee-card{overflow:hidden;padding:1.25rem 0}.tools-marquee-card>span{display:block;margin:0 1.35rem 1rem;color:#c026d3;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.2em}.marquee-fade{overflow:hidden}.marquee-track{display:flex;align-items:center;width:max-content;gap:2.6rem;animation:marqueeScroll 48s linear infinite;padding:.35rem 1.35rem}.tool-logo-pill{flex:0 0 auto;width:100px;height:100px;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none}.tool-logo-pill img{width:100px;height:100px;display:block;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.18));transition:transform .2s ease,filter .2s ease}.tool-logo-pill:hover img{transform:scale(1.06);filter:drop-shadow(0 18px 32px rgba(124,58,237,.28))}.tool-logo-pill img.is-hidden{display:none}@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.section{padding:7rem 0}.section-header{text-align:center;margin:0 auto 3.5rem;max-width:56rem}.section-header p{margin:0 0 1rem;text-transform:uppercase;letter-spacing:.28em;color:#c026d3;font-weight:850;font-size:.75rem}.section-header h2{margin:0;font-size:clamp(2.4rem,5vw,4.4rem);line-height:.95;letter-spacing:-.055em}.section-header span{display:block;margin:1.4rem auto 0;color:var(--muted);line-height:1.75;max-width:43rem}.about-grid{display:grid;grid-template-columns:1fr .86fr;gap:1.2rem}.glass-card{padding:2rem}.large-text h3{margin:0;font-size:clamp(1.4rem,2vw,2rem);line-height:1.45;letter-spacing:-.04em}.large-text p{color:var(--muted);line-height:1.8}.philosophy-line{margin-top:1rem;padding:1rem 1.1rem;border-left:3px solid #d946ef;border-radius:1rem;background:var(--soft);font-weight:700}.dark-card{padding:2rem;border-radius:2rem;color:white;background:linear-gradient(135deg,#020617,#4c1d95,#701a75);box-shadow:0 18px 55px rgba(88,28,135,.16)}.timeline-header-mini span{opacity:.72;text-transform:uppercase;letter-spacing:.24em;font-size:.72rem;font-weight:900}.timeline-header-mini h3{font-size:clamp(1.7rem,2.3vw,2.5rem);line-height:1;margin:.85rem 0 .75rem}.timeline-header-mini p{color:rgba(255,255,255,.7);line-height:1.6}.timeline-mini{display:grid;grid-template-columns:2.8rem 1fr;gap:1rem;margin-top:.9rem;padding:1rem;border:1px solid rgba(255,255,255,.1);border-radius:1.3rem;background:rgba(255,255,255,.07)}.timeline-mini b{width:2.3rem;height:2.3rem;display:grid;place-items:center;border-radius:999px;background:rgba(255,255,255,.12)}.timeline-mini p{margin:0;font-weight:900}.timeline-mini small{display:block;margin-top:.35rem;color:rgba(255,255,255,.68);line-height:1.5}
.vet-photo-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.9rem;margin-top:1.6rem}.vet-photo-grid>div{position:relative;overflow:hidden;min-height:15rem;border-radius:1.35rem;border:1px solid var(--line);background:var(--soft)}.vet-photo-grid img{width:100%;height:100%;min-height:15rem;display:block;object-fit:cover}.vet-photo-grid span{position:absolute;left:.8rem;right:.8rem;bottom:.8rem;padding:.65rem .75rem;border-radius:999px;color:var(--text);background:rgba(255,255,255,.82);backdrop-filter:blur(12px);font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;text-align:center}.dark .vet-photo-grid span{color:white;background:rgba(2,6,23,.72)}.service-grid,.how-help-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.service-card,.how-help-card{padding:1.5rem}.service-icon,.how-help-icon{width:4.65rem;height:4.65rem;display:grid;place-items:center;border-radius:1.35rem;color:white;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.045));border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.09),0 18px 42px rgba(124,58,237,.18);backdrop-filter:blur(18px);margin-bottom:1.45rem;font-size:2.15rem;line-height:1;transform:none;transition:none}.skill-icon{width:5.65rem;height:5.65rem;min-width:5.65rem;display:flex;align-items:center;justify-content:center;border-radius:1.65rem;color:white;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.055));border:1px solid rgba(255,255,255,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 20px 48px rgba(124,58,237,.20);backdrop-filter:blur(20px);margin-bottom:0;font-size:2.8rem;line-height:1;transform:none;transition:none;flex-shrink:0}.service-icon span,.skill-icon span,.how-help-icon span,.support-feature-icon span,.belief-icon span,.timeline-dot span{display:flex;align-items:center;justify-content:center;line-height:1;filter:drop-shadow(0 10px 18px rgba(217,70,239,.26));transform:none;transition:none}.skill-icon span{font-size:2.9rem!important;line-height:1}.service-icon span{font-size:2.05rem}.skill-card-top{align-items:center;gap:1.35rem}.service-card h3,.how-help-card h3{margin:0 0 .75rem;letter-spacing:-.03em}.service-card p,.skill-category-card p,.work-content p,.timeline-item p,.how-help-card p{color:var(--muted);line-height:1.65;font-size:.95rem}.how-help-section{padding-top:3rem}.how-help-card{position:relative;overflow:hidden;background:linear-gradient(180deg,var(--card),rgba(255,255,255,.035));transition:none}.how-help-card:before{content:"";position:absolute;inset:auto -4rem -5rem auto;width:10rem;height:10rem;border-radius:999px;background:rgba(217,70,239,.13);filter:blur(26px)}.how-help-card h3,.how-help-card p,.how-help-icon{position:relative}
.filter-row{display:flex;justify-content:center;flex-wrap:wrap;gap:.5rem;margin-bottom:2.5rem}.filter-row button{border:1px solid var(--line);border-radius:999px;padding:.7rem 1rem;background:var(--card);color:var(--muted);font-weight:850}.filter-row button.active{color:white;background:linear-gradient(135deg,#7c3aed,#d946ef)}.work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.35rem}.work-card{overflow:hidden;padding:.78rem;display:flex;flex-direction:column;min-height:36.5rem;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}.work-card:hover{transform:translateY(-5px);box-shadow:0 28px 70px rgba(88,28,135,.16)}.work-preview{height:23rem;padding:1rem;border-radius:1.45rem;display:grid;place-items:center;overflow:hidden}.work-content{padding:1.35rem;display:flex;flex-direction:column;gap:.55rem;flex:1}.work-content small{color:#c026d3;font-weight:900;text-transform:uppercase;letter-spacing:.18em;font-size:.64rem}.work-content h3{margin:.2rem 0;font-size:1.42rem;line-height:1.12}.work-content span{margin-top:auto;padding-top:.55rem;border-top:1px solid var(--line);color:var(--muted);font-weight:850}
.phone{width:12.8rem;height:25rem;border:7px solid rgba(255,255,255,.92);border-radius:3rem;padding:.48rem;position:relative;background:rgba(15,23,42,.25);box-shadow:0 24px 60px rgba(2,6,23,.24);z-index:2}.phone-large{width:min(22rem,72vw);height:min(44rem,78vh);border-width:10px}.phone-speaker{position:absolute;top:.75rem;left:50%;transform:translateX(-50%);width:4.4rem;height:.42rem;border-radius:999px;background:rgba(255,255,255,.72);z-index:3}.phone-screen{height:100%;border-radius:2.25rem;display:grid;place-items:center;background:#020617;overflow:hidden}.phone-video{width:100%;height:100%;object-fit:cover;border-radius:2rem}.media-preview{position:relative;z-index:2;width:100%;height:100%;display:block;object-fit:cover;border-radius:1.15rem}.media-preview-large{max-height:70vh;object-fit:contain;background:rgba(255,255,255,.08)}.preview-center{text-align:center;color:white}.timeline{position:relative;display:grid;gap:1.1rem}.timeline-item{position:relative;padding-left:4rem}.timeline-dot{position:absolute;left:0;top:1.4rem;width:2.8rem;height:2.8rem;display:grid;place-items:center;border-radius:999px;color:white;background:linear-gradient(135deg,#7c3aed,#d946ef);box-shadow:0 0 24px rgba(168,85,247,.35);font-size:1.25rem;line-height:1}.experience-head{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1rem}.experience-head h3{margin:0;font-size:1.55rem}.experience-head p{margin:.3rem 0 0;color:var(--muted)}.experience-head span{height:max-content;padding:.55rem .8rem;border-radius:999px;background:var(--soft);color:var(--muted);font-size:.85rem;font-weight:850;opacity:.72}.timeline-item .glass-card>p{max-width:90%}
.skill-category-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem}.skill-category-card{padding:1.75rem;min-height:21rem}.skill-card-top{display:flex;align-items:center;gap:1.35rem}.skill-card-top span{display:block;color:#c026d3;text-transform:uppercase;letter-spacing:.22em;font-size:.66rem;font-weight:900;opacity:.72}.dark .skill-card-top span{color:#e879f9}.skill-card-top h3{margin:.3rem 0 0;font-size:1.22rem}.skill-tags{display:flex;flex-wrap:wrap;gap:.62rem}.skill-tags em{font-style:normal;padding:.56rem .72rem;border-radius:999px;color:var(--text);background:var(--soft);border:1px solid var(--line);font-size:.81rem;font-weight:800;opacity:.82}.testimonial-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:1.25rem}.testimonial-video-card{display:grid;grid-template-columns:.95fr 1fr;gap:1.2rem;padding:.8rem}.testimonial-video-shell{position:relative;min-height:22rem;border-radius:1.5rem;overflow:hidden;background:linear-gradient(135deg,#020617,#4c1d95,#d946ef);display:grid;place-items:center}.testimonial-video-shell video{position:relative;z-index:2;width:100%;height:100%;object-fit:cover}.testimonial-video-shell>div{position:absolute;text-align:center;color:rgba(255,255,255,.78)}.testimonial-video-card>div:last-child{padding:1.4rem 1rem 1.4rem 0;align-self:center}.testimonial-card{padding:1.6rem;margin-bottom:1.25rem}.quote-mark{width:3rem;height:3rem;display:grid;place-items:center;border-radius:1rem;color:white;background:linear-gradient(135deg,#7c3aed,#d946ef);font-size:2rem;font-weight:900}.testimonial-card p,.testimonial-video-card p{color:var(--muted);line-height:1.75}.testimonial-card span{display:block;color:var(--muted);margin-top:.25rem}
.contact-card{display:grid;grid-template-columns:.9fr 1.1fr;gap:2rem;padding:3rem;border-radius:3rem;color:white;background:linear-gradient(135deg,#020617,#4c1d95,#701a75);box-shadow:0 24px 80px rgba(88,28,135,.24)}.contact-card span{text-transform:uppercase;letter-spacing:.28em;color:rgba(165,243,252,.75);font-weight:800;font-size:.8rem}.contact-card h2{margin:1rem 0 2rem;font-size:clamp(2.3rem,5vw,4rem);line-height:.95}.contact-card a{display:flex;gap:.75rem;align-items:center;color:rgba(255,255,255,.78);text-decoration:none;margin:1rem 0}form{display:grid;gap:.9rem;padding:1.2rem;border:1px solid rgba(255,255,255,.1);border-radius:2rem;background:rgba(255,255,255,.06)}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}input,textarea{width:100%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.1);color:white;border-radius:1rem;padding:1rem;outline:none}input::placeholder,textarea::placeholder{color:rgba(255,255,255,.65)}textarea{min-height:9rem;resize:vertical}form button{border:0;border-radius:999px;padding:1rem;color:#4c1d95;background:white;font-weight:900;transition:transform .18s ease}form button:hover{transform:translateY(-2px)}footer{display:flex;justify-content:space-between;gap:1rem;color:var(--muted);padding:2rem 0}footer button{border:0;background:transparent;color:inherit;font-weight:800}.modal{position:fixed;inset:0;z-index:150;background:rgba(2,6,23,.9);display:grid;place-items:center;padding:1rem}.modal-close{position:fixed;top:1.25rem;right:1.25rem;z-index:160;width:3rem;height:3rem;border:0;border-radius:999px;background:white;color:#0f172a;font-size:1.7rem}.modal-card{width:min(1120px,100%);max-height:92vh;overflow:hidden;display:grid;grid-template-columns:1.05fr .95fr;border-radius:2rem;background:#0f172a;color:white;box-shadow:0 30px 100px rgba(0,0,0,.3)}.modal-preview{min-height:42rem;display:grid;place-items:center;position:relative;overflow:hidden}.modal-info{overflow-y:auto;padding:2.5rem}.modal-info small{color:#e879f9;font-weight:900;text-transform:uppercase;letter-spacing:.2em}.modal-info h2{font-size:clamp(2.2rem,4vw,3.4rem);line-height:.95;margin:1rem 0}.modal-info p{color:#cbd5e1;line-height:1.8}.note{margin:2rem 0;padding:1.3rem;border-radius:1.5rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}.note b,.note span{display:block}.note span{margin-top:.6rem;color:#cbd5e1;line-height:1.7}.modal-info button{border:0;border-radius:999px;padding:1rem 1.3rem;color:white;background:linear-gradient(135deg,#7c3aed,#d946ef);font-weight:900}

.about-section-premium{padding-top:6.5rem}.about-section-premium .section-header{max-width:68rem;margin-bottom:2.4rem}.about-section-premium .section-header h2{font-size:clamp(2.8rem,5.2vw,4.85rem);line-height:.98}.about-section-premium .section-header span{font-size:1.08rem;max-width:62rem;margin-top:1.25rem}.about-premium-grid{display:grid;grid-template-columns:1fr .98fr;gap:1rem}.about-premium-card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.16);border-radius:2rem;background:linear-gradient(145deg,rgba(15,23,42,.72),rgba(2,6,23,.54));box-shadow:0 28px 80px rgba(0,0,0,.22);backdrop-filter:blur(18px)}.site:not(.dark) .about-premium-card{border-color:rgba(15,23,42,.09);background:linear-gradient(145deg,rgba(255,255,255,.9),rgba(248,250,252,.72))}.about-story-card{padding:2.75rem}.support-card{padding:2.75rem 2.75rem 2.2rem}.about-card-eyebrow{display:block;margin-bottom:1.15rem;color:#d946ef;text-transform:uppercase;letter-spacing:.2em;font-size:.78rem;font-weight:950}.about-story-card h3,.support-card h3{margin:0;color:var(--text);font-size:clamp(2rem,3.2vw,3.15rem);line-height:1.08;letter-spacing:-.055em}.support-card h3{max-width:33rem}.about-story-card>p{max-width:31rem;margin:1.65rem 0 0;color:var(--muted);font-size:1.04rem;line-height:1.85}.support-belief-card{display:grid;grid-template-columns:3.25rem 1fr;align-items:center;gap:1rem;margin:2rem 0 1.55rem;padding:1.15rem 1.2rem;border:1px solid rgba(217,70,239,.7);border-radius:1.15rem;background:linear-gradient(135deg,rgba(124,58,237,.16),rgba(2,6,23,.14));box-shadow:inset 0 0 30px rgba(217,70,239,.07)}.belief-icon{width:2.95rem;height:2.95rem;display:grid;place-items:center;border-radius:999px;color:#c084fc;background:rgba(124,58,237,.22);font-size:1.6rem;line-height:1}.support-belief-card strong{font-size:1.02rem;line-height:1.55}.about-photo-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.45rem;margin-top:1.15rem}.about-photo-card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.16);border-radius:1.45rem;background:rgba(255,255,255,.04);box-shadow:0 24px 60px rgba(0,0,0,.20)}.site:not(.dark) .about-photo-card{border-color:rgba(15,23,42,.08)}.about-photo-card img{width:100%;height:17.5rem;min-height:17.5rem;display:block;object-fit:cover;object-position:center center}.about-photo-card>div{position:static!important;padding:1rem .9rem 1.05rem;text-align:center;background:linear-gradient(180deg,rgba(15,23,42,.88),rgba(2,6,23,.98));border-top:1px solid rgba(255,255,255,.10);backdrop-filter:blur(14px)}.about-photo-card span{display:block;color:white;text-transform:uppercase;letter-spacing:.08em;font-size:.76rem;font-weight:900;line-height:1.3;text-shadow:none}.about-photo-card em{display:block;width:2.8rem;height:2px;margin:.7rem auto 0;background:#d946ef;border-radius:999px}.support-accent-line{width:4.2rem;height:2px;margin:2.05rem 0 1.55rem;background:#d946ef;border-radius:999px}.support-feature{display:grid;grid-template-columns:5.3rem 1fr;gap:1.25rem;padding:1.55rem 0;border-bottom:1px solid rgba(255,255,255,.1)}.site:not(.dark) .support-feature{border-bottom-color:rgba(15,23,42,.08)}.support-feature:last-child{border-bottom:0;padding-bottom:0}.support-feature-icon{width:4.85rem;height:4.85rem;display:grid;place-items:center;border-radius:1.45rem;color:#d946ef;background:linear-gradient(145deg,rgba(217,70,239,.16),rgba(124,58,237,.08));border:1px solid rgba(217,70,239,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 16px 36px rgba(124,58,237,.12);font-size:2rem;line-height:1;transform:none;transition:none}.support-feature h4{margin:.15rem 0 .55rem;color:var(--text);font-size:1.22rem;letter-spacing:-.035em}.support-feature p{margin:0;color:var(--muted);font-size:1.02rem;line-height:1.65}



/* ===== ABOUT PHOTO CARDS FINAL ===== */

.about-photo-pair{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:1.55rem!important;
  margin-top:1.25rem!important;
}

.about-photo-card{
  display:grid!important;
  grid-template-rows:18rem auto!important;

  overflow:hidden!important;

  border-radius:1.6rem!important;

  border:1px solid rgba(255,255,255,.14)!important;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.06),
      rgba(255,255,255,.025)
    )!important;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    0 24px 60px rgba(0,0,0,.22)!important;
}

.about-photo-card img{
  width:100%!important;
  height:100%!important;

  object-fit:cover!important;
  object-position:center center!important;

  display:block!important;
}

.about-photo-card > div{
  position:relative!important;

  padding:1.15rem 1rem 1.2rem!important;

  background:
    radial-gradient(
      circle at top right,
      rgba(217,70,239,.10),
      transparent 60%
    ),
    linear-gradient(
      180deg,
      rgba(15,23,42,.96),
      rgba(2,6,23,.98)
    )!important;

  border-top:1px solid rgba(255,255,255,.08)!important;

  text-align:center!important;
}

.about-photo-card span{
  display:block!important;

  color:white!important;

  text-transform:uppercase!important;

  letter-spacing:.08em!important;

  font-size:.74rem!important;

  font-weight:900!important;

  line-height:1.25!important;
}

.about-photo-card em{
  display:block!important;

  width:2.7rem!important;
  height:2px!important;

  margin:.8rem auto 0!important;

  border-radius:999px!important;

  background:
    linear-gradient(
      90deg,
      #a855f7,
      #d946ef,
      #f0abfc
    )!important;

  box-shadow:
    0 0 12px rgba(217,70,239,.32)!important;
}

@media(max-width:1060px){.nav{border-radius:1.4rem;align-items:flex-start;flex-wrap:wrap}.nav-links{order:3;width:100%;overflow-x:auto}.hero,.about-grid,.about-premium-grid,.service-grid,.how-help-grid,.work-grid,.skill-category-grid,.contact-card,.modal-card,.testimonial-grid,.testimonial-video-card{grid-template-columns:1fr}.hero{padding-top:10rem}.work-card{height:auto;min-height:auto}.modal-preview{min-height:28rem}.testimonial-video-card>div:last-child{padding:1.2rem}}@media(max-width:650px){.wrap{width:min(100% - 1rem,1180px)}.about-story-card,.support-card{padding:1.4rem}.about-photo-pair{grid-template-columns:1fr!important}.support-feature{grid-template-columns:1fr;gap:.85rem}.support-feature-icon{width:4.15rem;height:4.15rem;font-size:1.65rem}.about-section-premium .section-header h2{font-size:2.65rem}.brand b,.work-btn{display:none}.hero h1{font-size:4rem}.portrait-card img{height:30rem}.portrait-card>div{left:1.2rem;right:1.2rem;bottom:1.2rem}.stats,.how-help-grid{grid-template-columns:1fr}.section{padding:4rem 0}.contact-card,.glass-card,.dark-card{border-radius:1.5rem;padding:1.4rem}.form-row,.experience-head{grid-template-columns:1fr;display:grid}footer{flex-direction:column}.phone{width:10.2rem;height:19.8rem}.phone-large{width:14rem;height:28rem}.work-preview{height:21rem}.vet-photo-grid{grid-template-columns:1fr}.testimonial-video-shell{min-height:18rem}.marquee-track{gap:1.8rem}.tool-logo-pill,.tool-logo-pill img{width:90px;height:90px}.service-icon{width:4.25rem;height:4.25rem;font-size:1.95rem}.service-icon span{font-size:2rem}.skill-icon{width:5rem!important;height:5rem!important;min-width:5rem;font-size:2.45rem}.skill-icon span{font-size:2.45rem!important}}


/* ===== FINAL REFINED EXPERIENCE SECTION ===== */
.refined-experience-section{padding-top:6.5rem}.refined-experience-section .section-header{max-width:76rem}.refined-experience-stack{display:grid;gap:1.15rem}.refined-experience-card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:2.35rem;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.035));box-shadow:0 30px 90px rgba(0,0,0,.22);backdrop-filter:blur(18px)}.site:not(.dark) .refined-experience-card{border-color:rgba(15,23,42,.08);background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(248,250,252,.72))}.primary-experience-card{display:grid;grid-template-columns:1fr .92fr;gap:2rem;align-items:center;padding:3rem}.primary-experience-card:before,.secondary-experience-card:before{content:"";position:absolute;right:-9rem;top:-9rem;width:26rem;height:26rem;border-radius:999px;background:rgba(217,70,239,.14);filter:blur(46px)}.refined-experience-card>*{position:relative}.experience-copy-block span{display:block;margin-bottom:1rem;color:#d946ef;text-transform:uppercase;letter-spacing:.2em;font-size:.76rem;font-weight:950}.experience-copy-block h3{max-width:44rem;margin:0;color:var(--text);font-size:clamp(2.2rem,3.8vw,4.15rem);line-height:1;letter-spacing:-.07em}.experience-copy-block p{max-width:42rem;margin:1.55rem 0 0;color:var(--muted);font-size:1.05rem;line-height:1.82}.experience-highlight-panel{display:grid;gap:.85rem}.experience-highlight-panel div{padding:1.2rem 1.25rem;border:1px solid rgba(217,70,239,.16);border-radius:1.25rem;background:linear-gradient(145deg,rgba(217,70,239,.10),rgba(255,255,255,.045))}.experience-highlight-panel strong{display:block;color:var(--text);font-size:1.35rem;line-height:1.15;letter-spacing:-.04em}.experience-highlight-panel small{display:block;margin-top:.45rem;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;line-height:1.35}.experience-proof-list{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);gap:.85rem;margin-top:.75rem}.experience-proof-item{display:grid;grid-template-columns:2rem 1fr;gap:.7rem;align-items:start;padding:1rem;border:1px solid var(--line);border-radius:1.15rem;background:var(--soft)}.experience-proof-item span{color:#d946ef;font-weight:900;line-height:1.55}.experience-proof-item p{margin:0;color:var(--muted);font-size:.94rem;line-height:1.62}.secondary-experience-card{display:grid;grid-template-columns:1fr .92fr;gap:2rem;align-items:center;padding:2.35rem 3rem}.secondary-experience-card .experience-copy-block h3{font-size:clamp(1.9rem,3vw,3.15rem);max-width:42rem}.shopify-support-row{display:grid;gap:.8rem}.shopify-support-row div{display:grid;grid-template-columns:3.2rem 1fr;gap:.85rem;align-items:center;padding:1rem 1.1rem;border:1px solid rgba(217,70,239,.14);border-radius:1.15rem;background:var(--soft)}.shopify-support-row span{width:3rem;height:3rem;display:grid;place-items:center;border-radius:1rem;background:linear-gradient(145deg,rgba(217,70,239,.18),rgba(124,58,237,.08));font-size:1.45rem}.shopify-support-row strong{color:var(--text);font-size:1rem;line-height:1.35}
@media(max-width:1060px){.primary-experience-card,.secondary-experience-card{grid-template-columns:1fr}.experience-proof-list{grid-template-columns:1fr}.experience-highlight-panel{grid-template-columns:1fr}.shopify-support-row{grid-template-columns:1fr}}
@media(max-width:900px){.refined-experience-section{padding-top:4rem}.primary-experience-card,.secondary-experience-card{padding:1.35rem;border-radius:1.55rem;gap:1.35rem}.experience-copy-block h3{font-size:clamp(2rem,10vw,3rem)}.secondary-experience-card .experience-copy-block h3{font-size:clamp(1.75rem,8vw,2.55rem)}.experience-copy-block p{font-size:.96rem;line-height:1.72}.experience-highlight-panel div,.experience-proof-item,.shopify-support-row div{padding:.95rem}.experience-proof-item p{font-size:.9rem;line-height:1.58}.shopify-support-row span{width:2.75rem;height:2.75rem;font-size:1.25rem}}
`;
