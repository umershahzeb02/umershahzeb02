## Shahzeb Umer

Full-stack engineer based in Islamabad. I build production web applications end to end — Node.js and FastAPI services behind React and Next.js interfaces — with a particular interest in browser internals and the parts of the platform that resist automation.

**Full Stack Developer** at the **Directorate of ICT, Allama Iqbal Open University**, shipping public and internal platforms for an institution serving 400,000+ students nationwide.

---

### Selected work

#### [BumbleTap](https://bumbletap.com) · [Chrome Web Store](https://chromewebstore.google.com/detail/bumbletap/djgihkldjjfolnbkccfophpgflekmhhd) · [Engineering blog](https://bumbletap.com/blog)

A Chrome extension that binds arbitrary keystrokes to DOM actions on any website, built from two primitives: single-key bindings — element invocation, text entry, sandboxed user JavaScript — and multi-step Auto-Actions supporting conditional branching, waits, and variable extraction.

The hard problem is durability. Conventional CSS selectors break the moment a site redeploys, so the element resolver identifies targets by multi-representation consensus and traverses shadow DOM, keeping automations alive across deployments that would invalidate them. Privileged execution is orchestrated across Chrome's isolated, main, and user-script worlds through a cross-world messaging bridge, which buys CORS-exempt requests without giving up a strictly client-side design — no backend, no telemetry.

<sub>Manifest V3 · JavaScript · Next.js · Cloudflare Workers & R2 · Vitest</sub>

#### [Lumen](https://github.com/umershahzeb02/lumen) — AI video understanding

Transcribes, summarises, and answers questions about video, using LLM APIs across text, audio, and vision. A real-time streaming pipeline over WebSockets emits live progress events, with retry and structured logging wrapped around every external call. The RAG question-answering path retrieves from a vector store using embedding search and reranking, so answers stay grounded and cite the timestamps they came from.

<sub>Next.js · FastAPI · WebSockets · Gemini & OpenAI-compatible APIs · ChromaDB</sub>

#### Production platforms at AIOU

- **[Islamic Research Index](https://iri.aiou.edu.pk)** — a Next.js 14 research-indexing platform hosting thousands of academic papers. Query optimisation and caching for page-load performance; automated content-management workflows that cut manual indexing effort.
- **[AIOU Bookstore](https://bookstore.aiou.edu.pk)** — an e-commerce platform with secure payment processing and a modular architecture spanning online sales, POS, warehouse, and notifications, with inventory synchronised between the online store and physical outlets.
- **HR Management System** *(internal)* — Node.js/Express and Next.js over PostgreSQL, covering attendance, payroll, evaluations, and employee lifecycle, with role-based access control and document storage in cloud object storage.

#### [pdf-to-json](https://github.com/umershahzeb02/pdf-to-json) · [live](https://pdf2json.vercel.app)

Converts PDF documents into structured JSON for downstream manipulation in web applications.

---

### Writing

I write about browser internals, automation, and web architecture on the [BumbleTap engineering blog](https://bumbletap.com/blog), and on [Medium](https://medium.com/@umershahzeb):

- [Understanding Terraform](https://medium.com/@umershahzeb/understanding-terraform-a-comprehensive-guide-to-infrastructure-automation-65f741c0762c) — defining, provisioning, and managing cloud resources as code, and what it takes to keep infrastructure consistent across environments.
- [Mastering Prometheus](https://medium.com/@umershahzeb/mastering-prometheus-a-comprehensive-guide-to-architecture-and-configuration-3522a852ea41) — the architecture and configuration of monitoring for distributed systems, from scrape design through alerting and scaling.
- [Are We Making DevOps Complicated?](https://medium.com/@umershahzeb/are-we-making-devops-complicated-the-case-of-simplicity-in-tooling-54b5878b5d8a) — a case for minimalism in tooling, and why flexible toolchains so often become sprawl.

---

### Stack

|  |  |
| --- | --- |
| **Languages** | TypeScript, JavaScript, Python, C++, C#, SQL |
| **Backend** | Node.js, Express, FastAPI, REST APIs, WebSockets |
| **Frontend** | React, Next.js, React Native, Tailwind CSS |
| **Data** | PostgreSQL, MySQL, MongoDB, MS SQL Server, ChromaDB |
| **AI & integration** | OpenAI-compatible & Gemini APIs, RAG, embeddings, reranking |
| **Infrastructure** | Docker, Kubernetes, AWS, Cloudflare Workers & R2, Nginx, CI/CD |

BS Computer Science, NUCES–FAST (2021–2026).

---

### Elsewhere

[LinkedIn](https://linkedin.com/in/umershahzeb) · [Medium](https://medium.com/@umershahzeb) · [Portfolio](https://umershahzeb02.github.io/my-portfolio/) · <umershahzeb@gmail.com>
