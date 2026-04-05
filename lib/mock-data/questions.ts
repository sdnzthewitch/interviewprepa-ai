import type { Question } from "../types";

// ───────────────────────────────────────────────────────────────
//  Question Bank — Mock Data
//  In production, this would be fetched from an LLM or database
//  filtered by the user's role, sector, and interview type.
// ───────────────────────────────────────────────────────────────

export const questionBank: Question[] = [
  // ── BEHAVIORAL ──────────────────────────────────────────────
  {
    id: "b-001",
    text: "Tell me about a time you had to influence someone without direct authority.",
    category: "behavioral",
    difficulty: "intermediate",
    whyAsked:
      "Interviewers use this to assess your communication, persuasion, and interpersonal skills — especially important in cross-functional roles.",
    structureTip:
      "Use the STAR format: Situation → Task → Action → Result. Keep it under 90 seconds. Lead with the outcome, not the backstory.",
    exampleAnswer:
      "During my final year project, a team member was resistant to changing our database design. I scheduled a one-on-one to understand their concern, then reframed the change in terms of how it would reduce their workload. They agreed, and we delivered the project two days early.",
    coachNote:
      "For a phone interview, lead with one sentence summary of what happened, then your actions, then the result. Don't spend more than 20 seconds on context.",
    tags: ["communication", "influence", "leadership", "teamwork"],
  },
  {
    id: "b-002",
    text: "Describe a situation where you failed and what you learned from it.",
    category: "behavioral",
    difficulty: "intermediate",
    whyAsked:
      "This question measures self-awareness, resilience, and growth mindset — qualities that separate strong candidates from weak ones.",
    structureTip:
      "Pick a real failure, not a disguised success. State the failure clearly, own it, then spend most of your time on the lesson and what you changed.",
    exampleAnswer:
      "I underestimated the complexity of a feature and gave an optimistic estimate to my manager. The deadline passed and I hadn't communicated the risk early enough. I learned to flag scope uncertainty by day two, not day seven.",
    coachNote:
      "Avoid 'I worked too hard' or 'I cared too much.' Interviewers have heard those before. Pick something real. A small real failure handled well is far more impressive.",
    tags: ["self-awareness", "growth", "adaptability"],
  },
  {
    id: "b-003",
    text: "Give me an example of how you've handled a high-pressure deadline.",
    category: "behavioral",
    difficulty: "beginner",
    whyAsked:
      "Tests your composure, prioritisation skills, and whether you can deliver under realistic work conditions.",
    structureTip:
      "Focus on the specific steps you took to manage your time and workload — not just that you 'worked hard.' Mention what you cut or delegated.",
    exampleAnswer:
      "Before my university dissertation deadline, I had two other exams in the same week. I mapped out each task, cut non-essential reading, and blocked off mornings for deep work. I submitted on time and scored 76%.",
    coachNote:
      "Don't just say 'I stayed up all night.' Show that you had a method. Hiring managers want to see systematic thinking, not heroics.",
    tags: ["time-management", "pressure", "prioritisation"],
  },
  {
    id: "b-004",
    text: "Tell me about a time you worked with someone very different from yourself.",
    category: "behavioral",
    difficulty: "beginner",
    whyAsked:
      "Assesses your collaboration skills, empathy, and ability to work effectively in diverse teams.",
    structureTip:
      "Be specific about what was different (working style, background, perspective) and what you did to bridge the gap. Results matter.",
    exampleAnswer:
      "My project partner preferred brainstorming out loud while I work better with written briefs. I suggested we combine both: a short 10-minute verbal brainstorm followed by a written summary. Our output improved significantly.",
    coachNote:
      "Avoid framing the other person as the problem. The strongest answers show that you adapted — not that you tolerated someone difficult.",
    tags: ["collaboration", "diversity", "empathy"],
  },

  // ── MOTIVATION ──────────────────────────────────────────────
  {
    id: "m-001",
    text: "Why do you want to work at this company specifically?",
    category: "motivation",
    difficulty: "beginner",
    whyAsked:
      "Interviewers are testing whether you've done your research and genuinely want this role — or whether you're sending out mass applications.",
    structureTip:
      "Reference specific things: a product, a mission statement, a recent company move, or someone whose work you admire. Generic answers fail this question.",
    exampleAnswer:
      "I've been following your shift to open-source infrastructure for the past year. The decision to make your API freely accessible reflects a customer-first philosophy I genuinely respect, and it's part of why I want to contribute here.",
    coachNote:
      "If you don't have a company name yet, prepare a framework: (1) what the company is doing that's interesting, (2) how it connects to your skills, (3) how the role supports your 2-year goal.",
    tags: ["motivation", "research", "culture-fit"],
  },
  {
    id: "m-002",
    text: "Where do you see yourself in three years?",
    category: "motivation",
    difficulty: "beginner",
    whyAsked:
      "Tests whether your ambitions align with the role's growth path and whether you're thinking about the future thoughtfully.",
    structureTip:
      "Anchor your answer in skills you want to develop, not just job titles. Connect your growth to something this company can actually offer.",
    exampleAnswer:
      "In three years, I want to be someone who's led at least one meaningful product initiative from kickoff to launch. I want to develop stronger stakeholder communication and data analysis skills. I see this role as the foundation for that.",
    coachNote:
      "Don't say 'in your role' — it sounds like you want their job. Don't say 'running a company' — it sounds disconnected. Stay specific to skills and contributions.",
    tags: ["growth", "ambition", "alignment"],
  },

  // ── ROLE-SPECIFIC ────────────────────────────────────────────
  {
    id: "r-001",
    text: "How do you prioritise competing tasks when everything feels urgent?",
    category: "role-specific",
    difficulty: "intermediate",
    whyAsked:
      "Essential for any role involving multiple stakeholders or projects. Tests your decision-making framework, not just your energy.",
    structureTip:
      "Name a specific method you use (e.g., impact vs effort, deadlines + stakeholder weight, Eisenhower matrix). Then give an example of it in action.",
    exampleAnswer:
      "I use a simple two-step filter: first, what's time-locked vs what's flexible. Then, which task blocks someone else from moving forward. That usually narrows it to one clear priority. I re-evaluate twice a day.",
    coachNote:
      "The best answers name a system and then prove it works with a real example. If you don't have a go-to method, develop one before your interview. Interviewers will press you on this.",
    tags: ["prioritisation", "organisation", "self-management"],
  },
  {
    id: "r-002",
    text: "How do you approach learning a new tool or technology quickly?",
    category: "role-specific",
    difficulty: "beginner",
    whyAsked:
      "Common in fast-moving industries. Interviewers want to see that you're self-directed and can ramp up without constant hand-holding.",
    structureTip:
      "Describe a repeatable process: where you go first, how you practice, how you know you've learned it. Use a real example of something you learned quickly.",
    exampleAnswer:
      "I start with the official documentation to understand the mental model, then build a small project to test what I don't understand. When I learned Figma last year in one week, that approach let me go from zero to producing client-ready mockups.",
    coachNote:
      "The key phrase to include: 'I learn by building, not by reading.' It signals initiative. Back it up with a concrete example.",
    tags: ["learning", "adaptability", "technical"],
  },

  // ── SITUATIONAL ──────────────────────────────────────────────
  {
    id: "s-001",
    text: "If a colleague significantly underperforms on a shared project, what would you do?",
    category: "situational",
    difficulty: "intermediate",
    whyAsked:
      "Tests your professionalism, conflict-handling maturity, and whether you'd escalate sensibly or let things fester.",
    structureTip:
      "Show that you'd address it directly but constructively — not behind their back, not aggressively. Structure: direct conversation → offer help → involve manager only if needed.",
    exampleAnswer:
      "I'd have a private, direct conversation with them first, focusing on the impact rather than the blame: 'I noticed this section hasn't moved — is there something blocking you that I can help with?' If that didn't change things, I'd loop in the project lead.",
    coachNote:
      "Never say you'd go straight to a manager — it signals you lack interpersonal confidence. But also don't say you'd handle everything yourself indefinitely. Show a sensible escalation path.",
    tags: ["conflict", "teamwork", "professionalism"],
  },
  {
    id: "s-002",
    text: "You're given a project with an unclear brief. How do you get started?",
    category: "situational",
    difficulty: "intermediate",
    whyAsked:
      "Tests your initiative, communication style, and comfort with ambiguity — critical in most professional environments.",
    structureTip:
      "Show that you clarify before executing, not instead of executing. Name the specific questions you'd ask, then describe your first concrete step.",
    exampleAnswer:
      "I'd start by writing down my current interpretation of the goal, then schedule a 15-minute call to validate it. I'd ask three things: what does success look like, what are the must-haves vs nice-to-haves, and who are the decision-makers. Then I'd start a scoped first draft.",
    coachNote:
      "The phrase 'I'd ask clarifying questions' alone is not enough. Name the actual questions. That's what separates strong answers from vague ones.",
    tags: ["ambiguity", "initiative", "communication"],
  },

  // ── TECHNICAL (general) ─────────────────────────────────────
  {
    id: "t-001",
    text: "Walk me through a project you're proud of and the technical decisions you made.",
    category: "technical",
    difficulty: "intermediate",
    whyAsked:
      "Assesses your depth of technical understanding, ability to articulate decisions, and ownership of your own work.",
    structureTip:
      "Choose a project where you made real trade-offs. Explain the constraints, the options you considered, why you chose what you did, and what you'd do differently.",
    exampleAnswer:
      "I built a web app to visualise public transport delays using open data. I chose Next.js for fast initial load and PostgreSQL for structured query needs. The hardest decision was whether to pull live data or cache — I cached with 5-minute refreshes to balance accuracy and API limits.",
    coachNote:
      "Don't just describe what you built. The interviewer cares about the decisions you made and why. Structure: context → decision points → trade-offs → outcome → what you'd improve.",
    tags: ["technical", "problem-solving", "ownership"],
  },
];

/**
 * Get questions filtered by the user's profile.
 * In production, this would call an LLM or a curated database.
 */
export function getFilteredQuestions(
  role: string,
  sector: string,
  interviewType: string,
  count = 6
): Question[] {
  // For demo, return a curated mix based on interview type
  const priorityMap: Record<string, string[]> = {
    behavioral: ["b-001", "b-002", "b-003", "b-004", "m-001", "s-001"],
    technical: ["t-001", "r-002", "r-001", "b-002", "b-001", "s-002"],
    "case-study": ["r-001", "s-001", "s-002", "b-002", "m-001", "t-001"],
    mixed: ["b-001", "m-001", "r-001", "s-001", "t-001", "b-002"],
    phone: ["b-003", "m-001", "b-001", "r-001", "b-002", "m-002"],
    panel: ["b-001", "b-002", "m-001", "s-001", "r-001", "t-001"],
  };

  const ids = priorityMap[interviewType] ?? priorityMap["mixed"];
  return ids
    .map((id) => questionBank.find((q) => q.id === id)!)
    .filter(Boolean)
    .slice(0, count);
}
