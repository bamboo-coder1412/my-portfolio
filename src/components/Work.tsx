import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "AI Talent Operations Assistant",
    category: "AI Automation — Squadio",
    tools: "Python, LLM APIs, Structured Outputs, PostgreSQL",
  },
  {
    name: "Talent Matching & Evaluation Pipeline",
    category: "AI Retrieval — Squadio",
    tools: "Embeddings, Vector Search, LLM Reranking, Python",
  },
  {
    name: "Client Team Management Automation",
    category: "Workflow Automation — Squadio",
    tools: "Python, Go, Node.js, PostgreSQL, Redis",
  },
  {
    name: "AI-Powered Business Workflow System",
    category: "Automation — ThinkBIT Solutions",
    tools: "Python, Node.js, PostgreSQL, LLM APIs, AWS",
  },
  {
    name: "Document Processing & OCR Automation",
    category: "Data Automation — Scoville",
    tools: "Python, OCR, React, TypeScript",
  },
  {
    name: "CircleApp 2020 Renewal",
    category: "Full-Stack — Scoville",
    tools: "Node.js, TypeScript, REST APIs, React",
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

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
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
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
