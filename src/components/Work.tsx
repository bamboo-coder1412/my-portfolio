import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "AI Talent Operations Assistant",
    category: "AI Automation — Squadio",
    tools: "Python, LLM APIs, Structured Outputs, PostgreSQL",
    image: "/images/projects/talent-ops.webp",
    description:
      "Internal AI workflow that summarizes developer profiles, extracts technical skills, categorizes experience levels, and generates short candidate briefs — with structured prompts, backend validation, and human approval kept in the loop.",
  },
  {
    name: "Client Team Management Automation",
    category: "Workflow Automation — Squadio",
    tools: "Python, Go, Node.js, PostgreSQL, Redis",
    image: "/images/projects/team-automation.webp",
    description:
      "Backend workflows for managing active technical teams, contract renewal timelines, support requests, and performance follow-ups — automated notifications and status updates keep distributed remote teams visible.",
  },
  {
    name: "AI-Powered Business Workflow System",
    category: "Automation — ThinkBIT Solutions",
    tools: "Python, Node.js, PostgreSQL, LLM APIs, AWS",
    image: "/images/projects/workflow-system.webp",
    description:
      "Automation modules for lead routing, CRM synchronization, customer notifications, approval workflows, and document-based task tracking — with AI-assisted chatbot responses, document summaries, and task categorization.",
  },
  {
    name: "Document Processing & OCR Automation",
    category: "Data Automation — Scoville",
    tools: "Python, OCR, React, TypeScript",
    image: "/images/projects/ocr-automation.webp",
    description:
      "Document automation using OCR, validation rules, and structured data extraction to process invoices, forms, and contracts — reducing repetitive manual entry and improving data consistency for business users.",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  // Extra pinned distance after the horizontal travel completes, so the
  // last card sits fully in view for a moment instead of being cut off
  // the instant the section unpins.
  const endHold = Math.round(window.innerHeight * 0.5);

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX + endHold}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
    duration: translateX,
  });
  timeline.to({}, { duration: endHold });
  // Cleanup is handled by useGSAP's context revert, which also
  // removes the pin spacer; killing the trigger manually here
  // orphans the spacer on React StrictMode's double-mount.
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p className="work-desc">{project.description}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
