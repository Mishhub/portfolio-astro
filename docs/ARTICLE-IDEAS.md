# 25 Technical Article Ideas

Topics grounded in real experience from the resume — authentication, NestJS, event-driven
systems, Redis/BullMQ, Web3, Django, real-time, and DevOps. Each line is a title + the angle.

## Authentication & Identity
1. **Centralized Authentication with OAuth2 and OpenID Connect in NestJS** — building an SSO layer multiple platforms can trust.
2. **Authorization Code + PKCE, End to End** — why PKCE matters and what a correct exchange looks like.
3. **JWT Access, Refresh, and ID Tokens — Lifecycles Done Right** — rotation, revocation, and where each token belongs.
4. **Role-Based Access Control That Doesn't Rot** — modeling RBAC so product teams can reason about it.
5. **Reducing Auth Support Tickets by Fixing Login UX and Error Handling** — the unglamorous work that moves the metric.

## Backend & Architecture
6. **Event-Driven Microservices with gRPC: When and Why** — choosing gRPC over REST for internal sync.
7. **Designing a Proxy Admin Panel to Operate Many Platforms from One Place** — unifying operations across services.
8. **Idempotent Webhook Handlers for KYC and E-Signature Providers** — making third-party callbacks safe to retry.
9. **Integrating Third-Party Compliance (SumSub KYC/AML) Without Coupling Your Domain** — an anti-corruption-layer approach.
10. **E-Signatures as a Backend Concern: Templates, Webhooks and Status Sync** — lessons from a BoldSign integration.
11. **Multi-Tenant Data Isolation in Django + DRF** — keeping tenants separate, metered and supportable.

## Performance, Caching & Queues
12. **Caching the Hot Path with Redis — Beyond Simple Key-Value** — patterns that cut API latency ~45%.
13. **BullMQ in Production: Scheduling, Retries and Bull Board** — durable background jobs and how to watch them.
14. **Background Reporting at Volume with Celery** — generating PDF/XLSX/CSV reports reliably every month.
15. **Cutting Frontend Load Times by 60%: Bundle Optimization and Code Splitting** — measuring before optimizing.

## Real-Time
16. **Horizontally-Scalable Real-Time Apps with Socket.IO and a Redis Adapter** — sharing socket sessions across instances.
17. **Supporting Thousands of Concurrent Users over WebSockets** — connection lifecycle and back-pressure.

## Web3 / Blockchain
18. **A Wallet Gateway Microservice with NestJS and Viem** — abstracting chain interactions behind a clean service.
19. **Account Abstraction for Better Wallet UX (Biconomy + Alchemy)** — gasless and smart-account flows in practice.
20. **Merkle Trees for On-Chain Reward Eligibility** — proving membership without bloating the chain.
21. **Digital-Asset Custody with Fireblocks: What Backend Engineers Should Know** — orchestrating transactions safely.
22. **Building an NFT Launchpad and Minting Flow on Ethereum** — contracts, minting pages, and the audit mindset.

## Frontend & DevOps
23. **Server-Side Rendering for SEO and Performance in React** — when SSR earns its complexity.
24. **Reusable, Themeable Component Libraries with Styled Components and Storybook** — shipping one library to 5+ regional deployments.
25. **From 2 Hours to 10 Minutes: A Pragmatic CI/CD Pipeline with GitHub Actions** — preview environments and containerized deploys.

> Bonus (AI Engineering journey): "Building My First Production RAG Pipeline", "Tool Calling and the Model Context Protocol", "Evaluating Retrieval Quality, Not Vibes".
