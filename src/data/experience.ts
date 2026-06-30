/**
 * Professional timeline. Sourced directly from the resume — every company,
 * date, responsibility and metric is taken from it. Nothing is invented.
 */

export interface ExperienceEntry {
  company: string;
  /** e.g. "FinTech · Web3" — descriptive domain context. */
  context: string;
  role: string;
  location: string;
  start: string; // ISO yyyy-mm
  end: string | null; // null = present
  summary: string;
  responsibilities: string[];
  /** Outcomes — uses the real metrics stated in the resume. */
  impact: string[];
  stack: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "LMNTO Performance Information Technology",
    context: "FinTech · Web3 Platforms",
    role: "Senior Full Stack Developer",
    location: "Dubai, UAE",
    start: "2023-05",
    end: null,
    current: true,
    summary:
      "Own backend architecture across three interconnected FinTech/Web3 platforms — designing event-driven microservices, a centralized identity layer, and the tooling that keeps them operable at scale.",
    responsibilities: [
      "Designed and maintained 3 interconnected platforms serving 1.5M+ users, built on event-driven microservices that communicate over gRPC.",
      "Implemented a centralized authentication system using OpenID Connect for single sign-on across the platforms.",
      "Developed a unified proxy admin panel to integrate and operate the platforms from one place.",
      "Published open-source packages for the team, including nestjs-minio-backend.",
    ],
    impact: [
      "Reduced API response time by 45% with Redis-based caching on hot paths.",
      "Achieved 99.95% uptime running scalable Docker containers.",
      "Cut authentication-related support tickets by 30% through improved login UX and error handling.",
    ],
    stack: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Redis", "gRPC", "OpenID Connect", "Docker", "AWS"],
  },
  {
    company: "Coolshop SRL",
    context: "Automotive · Configurator Products",
    role: "Senior Full Stack Developer",
    location: "Dubai, UAE",
    start: "2022-11",
    end: "2023-05",
    summary:
      "Built and maintained internal configurator products (Cool-Build-and-Price, Cool-Model-Selection) with a focus on frontend performance, reusable UI and fast, automated delivery.",
    responsibilities: [
      "Built and maintained internal products — Cool-Build-and-Price and Cool-Model-Selection.",
      "Implemented high-performance UI with React, TypeScript, GraphQL and Apollo Server.",
      "Created reusable UI component libraries to standardize the frontend across products.",
      "Deployed automated CI/CD pipelines for the team.",
    ],
    impact: [
      "Reduced frontend load times by 60% through bundle optimization and code splitting.",
      "Increased development velocity by 40% with shared, reusable UI component libraries.",
      "Cut deployment time from 2 hours to under 10 minutes via automated CI/CD.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Apollo Server", "Storybook", "CI/CD"],
  },
  {
    company: "Connectopia",
    context: "Web3 · NFT",
    role: "Full Stack Blockchain Developer",
    location: "Dubai, UAE",
    start: "2022-04",
    end: "2022-10",
    summary:
      "Shipped on-chain products end to end — Ethereum smart contracts, minting pages and an NFT launchpad — while leading a small Agile team.",
    responsibilities: [
      "Created Ethereum smart contracts, minting pages and an NFT launchpad.",
      "Developed full-stack web apps using the MERN stack and the Alchemy API.",
      "Led an Agile team of 5 engineers through planning and delivery.",
    ],
    impact: [
      "Delivered 12 major features across 6 sprints.",
      "Handled 50K+ on-chain transactions with zero contract vulnerabilities (internal audit).",
    ],
    stack: ["Solidity", "Ethereum", "MongoDB", "Express", "React", "Node.js", "Alchemy"],
  },
  {
    company: "Stead Technologies LLP",
    context: "Product Studio · SaaS",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    start: "2020-12",
    end: "2022-04",
    summary:
      "Delivered full-stack products for multiple clients — a custom CMS, a complete HR platform, and an open-source calendar library.",
    responsibilities: [
      "Developed a custom CMS using Angular and Node.js.",
      "Built and deployed a complete HR platform (Spovio) for SMB customers, with React and Django.",
      "Launched and maintained an open-source calendar project.",
    ],
    impact: [
      "Improved client publishing time by 70% with the custom CMS.",
      "Spovio served 10+ businesses managing over 1,200 employees.",
      "Open-source calendar project reached 100+ weekly NPM downloads.",
    ],
    stack: ["Angular", "Node.js", "React", "Django", "PostgreSQL", "Redis", "Celery", "AWS S3"],
  },
  {
    company: "AgileCrew",
    context: "E-commerce · Real-Time",
    role: "Junior Software Developer",
    location: "Calicut, India",
    start: "2019-08",
    end: "2020-12",
    summary:
      "Built e-commerce and real-time meeting platforms on the MERN stack and AWS, growing from feature work into ownership of real-time and integration-heavy systems.",
    responsibilities: [
      "Built e-commerce and real-time meeting platforms using the MERN stack on AWS EC2.",
      "Implemented real-time communication with WebSockets.",
      "Integrated payment and identity providers into the checkout flow.",
    ],
    impact: [
      "Supported up to 2,000 concurrent users in the real-time meeting platform via WebSockets.",
      "Enabled 500+ secure checkouts daily through payment and identity integrations.",
      "Cut infrastructure costs by 25% using EC2 spot instances and containerized deployments.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "WebSockets", "AWS EC2", "Docker"],
  },
];

/** Education (from the resume). */
export const EDUCATION = {
  degree: "B.Tech, Computer Science",
  school: "MES College of Engineering",
  location: "Calicut, India",
  start: "2015",
  end: "2019",
} as const;
