import "./styles/Career.css";

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
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>Scoville Co., Ltd. — Tokyo, Japan</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Developed Node.js and TypeScript REST APIs for the CircleApp
              renewal, reaching 81,000 users across 500 colleges, and built OCR
              document automation processing 1,200 documents per month.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Systems & Automation Engineer</h4>
                <h5>ThinkBIT Solutions — Quezon City, PH</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Built the backend of an AI-powered business workflow system
              automating lead routing, CRM sync, and approvals across 12,000
              monthly events, cutting lead-assignment time from 15 minutes to
              under 2.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Automation Engineer</h4>
                <h5>Squadio — Riyadh, Saudi Arabia</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built AI agent systems and talent-matching pipelines with LLM
              APIs, embeddings, and human-in-the-loop approval — processing
              3,000 profile updates monthly and raising top-10 shortlist
              acceptance from 64% to 82%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
