import "./styles/Career.css";

// Chronological entries; rendered newest-first below.
const roles = [
  {
    year: "2020",
    title: "Full-Stack Developer — Backend and Automation",
    company: "Scoville Co., Ltd. — Tokyo, Japan",
    period: "Mar 2020 – Jul 2022",
    points: [
      "Contributed to the 2020 renewal of CircleApp, developing Node.js and TypeScript REST APIs for student, organization, content, and administrative workflows, together with supporting React management interfaces. The platform expanded to 81,000 users across 500 colleges.",
      "Developed backend components for the Anytime Fitness Occupancy Monitoring System, processing cloud-connected CCTV events and transforming AI-based human-detection results into near-real-time occupancy information.",
      "Built the Document Processing and OCR Automation workflow using Python-based OCR, text extraction, data normalization, validation rules, and exception routing — processing 1,200 documents per month and reducing average handling time from 8 minutes to 3 minutes.",
      "Developed a React and TypeScript exception-review interface allowing operations users to compare extracted fields with source documents, correct low-confidence values, and return approved records to downstream workflows.",
      "Created an early semantic search and knowledge retrieval prototype using Python text processing, document metadata, and relevance ranking — the foundation for later work with embeddings and retrieval-augmented AI systems.",
      "Improved backend reliability through request validation, database query optimization, structured error handling, reusable API modules, access controls, and technical documentation.",
    ],
  },
  {
    year: "2022",
    title: "AI Systems & Automation Engineer — Backend-Focused Full Stack",
    company: "ThinkBIT Solutions Phils., Inc. — Quezon City, PH (Remote)",
    period: "Sep 2022 – Jul 2023",
    points: [
      "Built the backend of the AI-Powered Business Workflow System using Python, Node.js, and PostgreSQL, automating lead routing, CRM synchronization, approval tracking, notifications, and document tasks across 12,000 workflow events per month — reducing lead-assignment time from 15 minutes to under 2 minutes.",
      "Integrated LLM APIs into document summarization, internal chatbot responses, and task classification workflows with structured prompts, schema validation, confidence handling, and human review — supporting 800 AI-assisted requests per month and cutting document-review time from 10 minutes to 4 minutes.",
      "Developed a secure integration layer for CRM, email, document-management, and client APIs using authenticated REST endpoints, signed webhooks, role-based authorization, idempotency keys, and normalized payload schemas.",
      "Implemented AWS-hosted background workers and scheduled automation jobs using Python, Node.js, Redis, and containerized services — with retry policies, dead-letter handling, structured logging, and operational alerts.",
      "Improved PostgreSQL and MySQL performance through query analysis, indexing, pagination, caching, and asynchronous processing, keeping transactional operations isolated from slower AI and third-party API requests.",
      "Created lightweight React and TypeScript administration interfaces for reviewing AI output, approving automated actions, correcting classification results, and replaying failed workflow tasks.",
    ],
  },
  {
    year: "2023",
    title: "AI Automation Engineer — Agent Systems and Backend Engineering",
    company: "Squadio — Riyadh, Saudi Arabia (Remote)",
    period: "Aug 2023 – Jun 2026",
    points: [
      "Built the AI Talent Operations Assistant using Python and LLM APIs to extract technical skills, classify professional experience, normalize candidate information, and generate evidence-based profile briefs — processing 3,000 profile updates per month and reducing average profile-review time from 20 minutes to 6 minutes.",
      "Developed a Talent Matching and Evaluation Pipeline combining embeddings, metadata filtering, semantic retrieval, and LLM-based reranking — creating recruiter-labelled evaluation datasets and precision@k measurements that improved top-10 shortlist acceptance from 64% to 82%.",
      "Extended the Client Team Management Automation platform into tool-driven workflows for onboarding, team assignment, contract renewals, support escalation, and operational notifications — with explicit workflow states, idempotent actions, and deterministic approval gates.",
      "Designed Python, Go, and Node.js backend services with PostgreSQL and Redis, separating synchronous APIs from long-running AI and integration jobs, with schema validation, provider fallbacks, retry policies, and failure isolation.",
      "Containerized and deployed services across AWS and Azure using Docker, Kubernetes, and CI/CD pipelines — strengthening production security with RBAC, managed secrets, PII redaction, verified webhooks, and audit logging.",
      "Developed focused React and TypeScript operational interfaces allowing recruiters and delivery teams to inspect ranked candidates, review source evidence, approve or override AI recommendations, and replay failed automation jobs.",
    ],
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {[...roles].reverse().map((role) => (
            <div className="career-info-box" key={role.year}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{role.title}</h4>
                  <h5>{role.company}</h5>
                  <h6>{role.period}</h6>
                </div>
                <h3>{role.year}</h3>
              </div>
              <ul>
                {role.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
