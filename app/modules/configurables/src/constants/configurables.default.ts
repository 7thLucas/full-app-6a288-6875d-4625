/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TRoadmapPhase = {
  month: string;
  title: string;
  description: string;
  milestones: string[];
};

export type TResourceItem = {
  title: string;
  description: string;
  url: string;
};

export type TResourceCategory = {
  title: string;
  description: string;
  icon: string;
  items: TResourceItem[];
};

export type TAssessmentQuestion = {
  id: string;
  category: string;
  question: string;
  type: "text" | "textarea" | "scale" | "multiselect";
  options?: string[];
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  tagline: string;
  providerName: string;
  brandColor: TBrandColor;
  welcomeMessage: string;
  aiSystemPrompt: string;
  roadmapPhases: TRoadmapPhase[];
  resourceCategories: TResourceCategory[];
  assessmentQuestions: TAssessmentQuestion[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "ASCEND Career Pathway",
  logoUrl: "FILL_LOGO_URL_HERE",
  tagline: "From Chaos to Clarity. A Structured System for Your Success.",
  providerName: "ASCEND Strategy Co.",
  brandColor: {
    primary: "#C75B12",
    secondary: "#F5E9DC",
    accent: "#C9A86A",
  },
  welcomeMessage: "Welcome back. Here's where you stand today.",
  aiSystemPrompt:
    "You are the ASCEND AI Career Strategist — a focused, direct, and execution-oriented career coach. Your role is to help clients navigate career transitions with clarity and structure. Provide actionable, specific guidance. Avoid generic motivation. Always tie advice back to the client's 7-month roadmap and immediate next action steps. Be concise, tactical, and results-driven.",
  roadmapPhases: [
    {
      month: "Month 1",
      title: "Foundation & Clarity",
      description: "Define your target role, assess your current skills, and build your career transition baseline.",
      milestones: [
        "Complete Career Assessment",
        "Define target role and industry",
        "Identify top 3 transferable skills",
        "Set 7-month goal statement",
      ],
    },
    {
      month: "Month 2",
      title: "Brand & Position",
      description: "Build your professional brand and update all positioning materials.",
      milestones: [
        "Update resume for target role",
        "Optimize LinkedIn profile",
        "Craft your professional narrative",
        "Define unique value proposition",
      ],
    },
    {
      month: "Month 3",
      title: "Network & Research",
      description: "Build strategic relationships and deepen your target market knowledge.",
      milestones: [
        "Identify 20 target companies",
        "Connect with 10 industry professionals",
        "Attend 2 industry events or webinars",
        "Conduct 3 informational interviews",
      ],
    },
    {
      month: "Month 4",
      title: "Active Job Search",
      description: "Launch a systematic, targeted job search campaign.",
      milestones: [
        "Apply to 15+ targeted positions",
        "Track all applications in system",
        "Follow up on all applications",
        "Refine outreach messaging",
      ],
    },
    {
      month: "Month 5",
      title: "Interview Preparation",
      description: "Master your interview performance and negotiation strategy.",
      milestones: [
        "Prepare STAR method stories",
        "Practice with mock interviews",
        "Research compensation benchmarks",
        "Prepare negotiation strategy",
      ],
    },
    {
      month: "Month 6",
      title: "Offer & Negotiation",
      description: "Navigate offers, negotiate effectively, and prepare for transition.",
      milestones: [
        "Evaluate any offers received",
        "Negotiate compensation and benefits",
        "Plan 30/60/90-day entry strategy",
        "Prepare transition timeline",
      ],
    },
    {
      month: "Month 7",
      title: "Launch & Thrive",
      description: "Execute your first 90 days and establish yourself in the new role.",
      milestones: [
        "Complete onboarding successfully",
        "Build key stakeholder relationships",
        "Deliver early wins",
        "Set 6-month performance goals",
      ],
    },
  ],
  resourceCategories: [
    {
      title: "Resume Guidance",
      description: "Build a resume that gets you noticed for the right roles.",
      icon: "FileText",
      items: [
        {
          title: "Resume Structure Guide",
          description: "How to structure a powerful, targeted resume for career transitions.",
          url: "",
        },
        {
          title: "ATS Optimization Tips",
          description: "Ensure your resume passes applicant tracking systems.",
          url: "",
        },
        {
          title: "Achievement Statement Formula",
          description: "Turn job duties into compelling achievement statements.",
          url: "",
        },
      ],
    },
    {
      title: "Interview Preparation",
      description: "Master every stage of the interview process.",
      icon: "MessageSquare",
      items: [
        {
          title: "STAR Method Framework",
          description: "Structure compelling behavioral interview responses.",
          url: "",
        },
        {
          title: "Top 50 Interview Questions",
          description: "Prepare for the most common and challenging interview questions.",
          url: "",
        },
        {
          title: "Salary Negotiation Scripts",
          description: "Negotiate with confidence using proven language frameworks.",
          url: "",
        },
      ],
    },
    {
      title: "Career Development",
      description: "Build long-term career capital and professional presence.",
      icon: "TrendingUp",
      items: [
        {
          title: "LinkedIn Optimization Checklist",
          description: "A step-by-step guide to building an executive LinkedIn presence.",
          url: "",
        },
        {
          title: "Networking Outreach Templates",
          description: "Proven message templates for cold and warm outreach.",
          url: "",
        },
        {
          title: "Personal Brand Workbook",
          description: "Define and communicate your unique professional value.",
          url: "",
        },
      ],
    },
  ],
  assessmentQuestions: [
    {
      id: "skills_1",
      category: "Skills Inventory",
      question: "What are your top 5 professional skills that you are most confident in?",
      type: "textarea",
    },
    {
      id: "skills_2",
      category: "Skills Inventory",
      question: "Rate your proficiency in your core technical or functional skills.",
      type: "scale",
    },
    {
      id: "skills_3",
      category: "Skills Inventory",
      question: "Which skills do you want to develop or strengthen in your next role?",
      type: "textarea",
    },
    {
      id: "interests_1",
      category: "Interests & Values",
      question: "What type of work energizes you the most?",
      type: "multiselect",
      options: [
        "Strategy & Planning",
        "People Management",
        "Technical Problem Solving",
        "Creative Work",
        "Sales & Business Development",
        "Operations & Execution",
        "Research & Analysis",
        "Communication & Storytelling",
      ],
    },
    {
      id: "interests_2",
      category: "Interests & Values",
      question: "What are your non-negotiable values in your next role?",
      type: "multiselect",
      options: [
        "Work-life balance",
        "High compensation",
        "Career growth",
        "Mission-driven work",
        "Remote flexibility",
        "Strong team culture",
        "Autonomy",
        "Stability",
      ],
    },
    {
      id: "experience_1",
      category: "Experience Review",
      question: "Describe your most significant career achievement in the last 3 years.",
      type: "textarea",
    },
    {
      id: "experience_2",
      category: "Experience Review",
      question: "What industries and company types have you worked in?",
      type: "textarea",
    },
    {
      id: "direction_1",
      category: "Career Direction",
      question: "What is your target role title or function?",
      type: "text",
    },
    {
      id: "direction_2",
      category: "Career Direction",
      question: "What is your desired timeline for landing your next role?",
      type: "multiselect",
      options: ["1-2 months", "3-4 months", "5-6 months", "6-12 months", "12+ months"],
    },
    {
      id: "direction_3",
      category: "Career Direction",
      question: "What specific challenges are you facing in your career transition?",
      type: "textarea",
    },
  ],
};
