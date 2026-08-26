import "./styles/TechStack.css";
import { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiCplusplus,
  SiSharp,
  SiOpenjdk,
  SiHtml5,
  SiCss3,
  SiGraphql,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiFlask,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiAmazondynamodb,
  SiAmazonwebservices,
  SiMicrosoftazure,
  SiDocker,
  SiKubernetes,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiLangchain,
  SiAwslambda,
  SiGithubactions,
  SiZapier,
  SiMake,
} from "react-icons/si";

type Tech = {
  name: string;
  icon: IconType;
  color: string;
};

const techRows: Tech[][] = [
  [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Go", icon: SiGo, color: "#00ADD8" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "C#", icon: SiSharp, color: "#8A2BE2" },
    { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  ],
  [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Flask", icon: SiFlask, color: "#FFFFFF" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  ],
  [
    { name: "Redis", icon: SiRedis, color: "#FF4438" },
    { name: "DynamoDB", icon: SiAmazondynamodb, color: "#4053D6" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
    { name: "Azure", icon: SiMicrosoftazure, color: "#0078D4" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  ],
  [
    { name: "OpenAI", icon: SiOpenai, color: "#FFFFFF" },
    { name: "Anthropic Claude", icon: SiAnthropic, color: "#D97757" },
    { name: "Google Gemini", icon: SiGooglegemini, color: "#8E75B2" },
    { name: "LangChain", icon: SiLangchain, color: "#65B687" },
    { name: "AWS Lambda", icon: SiAwslambda, color: "#FF9900" },
  ],
  [
    { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    { name: "Zapier", icon: SiZapier, color: "#FF4F00" },
    { name: "Make", icon: SiMake, color: "#B02DE9" },
  ],
];

const TechStack = () => {
  return (
    <div className="techstack">
      <h2>Making apps with modern technologies.</h2>
      <p className="techstack-sub">
        Backend, Frontend, Databases, Cloud, and AI — I build it all.
      </p>
      <div className="techstack-rows">
        {techRows.map((row, rowIndex) => (
          <div className="techstack-row" key={rowIndex}>
            {row.map((tech) => (
              <div
                className="techstack-item"
                key={tech.name}
                title={tech.name}
                style={{ "--techColor": tech.color } as React.CSSProperties}
              >
                <tech.icon />
                <span className="techstack-label">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
