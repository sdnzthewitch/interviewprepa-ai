import type { UserProfile } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
//  AI Coach Responses — Refined
//  Rule: Every response must explain *why* the advice works, not just *what*
//  to do. Language should be direct, role-aware, and practical.
// ─────────────────────────────────────────────────────────────────────────────

export interface CoachTip {
  id: string;
  title: string;
  body: string;
}

/**
 * Dashboard insight: one focused, role-aware piece of coaching.
 * This is the most visible coaching text in the app — it must be immediately useful.
 */
export function getDashboardInsight(profile: UserProfile): string {
  const { interviewType, urgency, englishLevel, userType, targetRole, sector } = profile;
  const role = targetRole || "this role";

  if (urgency === "this-week") {
    if (interviewType === "behavioral") {
      return `With limited time, breadth is the wrong strategy. Pick your 3 strongest real experiences — moments where you drove something, fixed something, or learned something significant. Each of these can answer 5–8 different behavioral questions depending on how you frame them. Memorising 15 different answers is slower and less effective than deeply owning 3 strong stories.`;
    }
    if (interviewType === "phone") {
      return `Phone screens fail for one reason: candidates take too long to get to the point. The interviewer can't read your body language, so your first sentence carries all the weight. This week, practice starting every answer with a one-sentence summary — then your evidence — then your close. That structure keeps the interviewer engaged when they can't see you.`;
    }
    if (interviewType === "technical") {
      return `This week, prioritise communicating your thinking over perfecting your answers. Technical interviewers are watching how you approach problems, not just whether you get the answer right. When you're stuck, say what you know, what you're uncertain about, and what you'd do to find out. Silence is the biggest mistake candidates make in technical interviews.`;
    }
    return `This week, go deep — not wide. Three well-prepared stories beat ten rushed ones. Each story should have a clear problem, clear actions you took, and a measurable outcome. That combination answers the most common interview questions and leaves a stronger impression than surface-level coverage.`;
  }

  if (interviewType === "behavioral") {
    return `Behavioral interviews test whether your real experiences are transferable to ${role}. The key mistake candidates make is narrating events rather than explaining decisions. For each question, the interviewer wants to understand: what did *you* specifically do, what was difficult about it, and what changed as a result? Prepare stories that answer all three.`;
  }

  if (interviewType === "technical") {
    return `Technical interviews for ${role} test two things simultaneously: your domain knowledge, and your ability to communicate under pressure. Most candidates over-focus on knowledge and under-practice communication. Start each practice session by thinking aloud as you solve a problem — record yourself if possible. The way you explain your reasoning is often more important than the answer itself.`;
  }

  if (interviewType === "case-study") {
    return `Case interviews in ${sector} are designed to see how you think when you don't have all the information — which is the actual job. When you get a case question, the 5-second pause before you answer is an asset, not a weakness. Say "Let me structure this first" and outline your approach before you speak to the answer. This signals exactly what ${sector} interviewers are looking for: structured thinking under pressure.`;
  }

  if (userType === "career-switcher") {
    return `Career switchers often apologise for their background — either directly or through how they frame their experience. Don't. Your previous experience is context that ${role} interviewers can evaluate. What they need from you is a clear line from your past work to the skills this role requires. Every answer should connect: "I've done this before in a different context, which is why I can do it here." Practice that connection explicitly.`;
  }

  if (userType === "student" || userType === "new-graduate") {
    return `Without extensive work experience, your evidence comes from projects, academic work, placements, and any real responsibility you've had. The language you use matters: don't say "group project" — say "led the technical delivery of a team project under a 3-week deadline." The experience is the same. The framing is what makes it land in a ${role} interview.`;
  }

  if (englishLevel === "intermediate" || englishLevel === "beginner") {
    return `In English-language interviews, the clarity of your structure compensates for vocabulary gaps. If you follow a consistent pattern — context, action, result — the interviewer can follow you even if individual words aren't perfect. Before your interview, memorise 4–5 transition phrases in English: "What I did was...", "The outcome was...", "What I learned from this is...". These phrases act as bridges that keep your answer on track.`;
  }

  return `The most prepared candidates don't memorise answers — they own their stories. Before each session, pick one real experience and practice framing it three different ways: as a leadership story, as a problem-solving story, and as a collaboration story. The same event answers dozens of interview questions depending on which angle you lead with. That flexibility is what makes preparation efficient.`;
}

/**
 * Coaching tips for the full AI Coach page.
 * Each tip must explain *why* the advice works — not just *what* to do.
 */
export function getCoachTips(profile: UserProfile): CoachTip[] {
  const { interviewType, userType, sector, englishLevel, targetRole } = profile;
  const role = targetRole || "your target role";
  const tips: CoachTip[] = [];

  // ── Always-first tip: answer structure ────────────────────────
  tips.push({
    id: "opening",
    title: "Why your first sentence determines the whole answer",
    body:
      interviewType === "phone"
        ? `On a phone call, the interviewer forms an impression of your answer within the first 10 seconds. They can't see you, so your language carries all the weight. Most candidates open with context — "So in 2022 I was working on..." — which buries the point. Instead, open with your conclusion, then your evidence. "I resolved this by doing X — here's what that looked like." That structure tells the interviewer immediately that you know what you're talking about, and they stay engaged for the rest.`
        : `The most common interview mistake is building up to the point instead of starting with it. Interviewers hear dozens of answers per day — they lose attention when candidates take too long to get to what they actually did. Train yourself to open each answer with a direct summary sentence, then support it with your story. This isn't just a structure tip: it's how the interviewer evaluates whether you understood the question.`,
  });

  // ── Behavioral / mixed ────────────────────────────────────────
  if (interviewType === "behavioral" || interviewType === "mixed") {
    tips.push({
      id: "star",
      title: "STAR is a skeleton, not a script — here's the difference",
      body: `STAR (Situation, Task, Action, Result) is widely known. What most candidates don't know is that only the A and R actually matter to the interviewer. The Situation and Task are just context — keep them to 20% of your answer. The Action is where you demonstrate your thinking and your role specifically. The Result is where you prove impact. If you spend 60% of your answer on context and 40% on actions and results, you've failed the STAR structure even if you're following the acronym. For a ${role} role, the result should ideally be measurable or observable — something the interviewer can mentally verify.`,
    });
  }

  // ── Technical ────────────────────────────────────────────────
  if (interviewType === "technical") {
    tips.push({
      id: "technical-talk",
      title: "How to communicate your thinking in technical interviews",
      body: `Technical interviewers distinguish between candidates who solve the problem and candidates who demonstrate *how* they solve problems. These are different things. When you're stuck, narrate your thinking: "I know X, I'm less certain about Y, and if I were working on this in a real project I'd check Z first." This kind of transparency does two things: it shows your actual capability level accurately, and it signals that you'd be a useful collaborator in a real environment — which is what the interviewer is actually evaluating.`,
    });
  }

  // ── No experience ────────────────────────────────────────────
  if (userType === "student" || userType === "new-graduate") {
    tips.push({
      id: "no-experience",
      title: "Translating academic and project experience into interview language",
      body: `Interviewers for ${role} roles don't expect corporate work history from students or recent graduates — but they do expect you to frame your experience in professional terms. This means describing what you were responsible for (not just involved in), what the constraints were (deadline, team, resources), and what specifically you contributed. A university project where you designed the database architecture is a real technical decision. A team assignment where you managed a conflicting team dynamic is a real leadership challenge. The experience is valid; the framing makes it land.`,
    });
  }

  // ── Career switcher ──────────────────────────────────────────
  if (userType === "career-switcher") {
    tips.push({
      id: "switcher",
      title: "How career switchers build credibility in a new field",
      body: `The risk for career switchers isn't that interviewers think your background is irrelevant — it's that you frame it as irrelevant by apologising for it or over-explaining why you're changing. Instead, lead with the skills from your previous field that transfer directly to ${role}. Every answer should make an implicit argument: "The way I did this in my previous context is directly applicable here, because the underlying skill — [X] — is the same." Prepare 2–3 explicit bridges between your past experience and the ${role} responsibilities listed in the job description.`,
    });
  }

  // ── English support ──────────────────────────────────────────
  if (englishLevel === "intermediate" || englishLevel === "beginner") {
    tips.push({
      id: "english",
      title: "Why structure compensates for language gaps — and how to use it",
      body: `Fluency impresses, but clarity convinces. Interviewers interviewing non-native English speakers are listening for your logic first and your vocabulary second. This means a short, structured answer with simple words will almost always land better than a longer, grammatically complex answer that loses its thread. The most effective tool is to learn and practice 5–6 transition phrases: "The situation was...", "What I specifically did was...", "The result was...", "What I'd do differently is...". These phrases keep you on track when you're nervous, and they make your answer easy for the interviewer to follow.`,
    });
  }

  // ── Turkish language ─────────────────────────────────────────
  if (profile.prepLanguage === "turkish") {
    tips.push({
      id: "turkish",
      title: "Türkçe mülakatta güçlü izlenim bırakmak",
      body: `Türkçe mülakatlar için en kritik fark yapısaldır. Türkçe'de ana fikri en sona bırakmak doğal hissettiriyor — ama mülakatta bu sizi zayıf gösterir. Tersini yapın: önce sonucu söyleyin, sonra örneği verin. "Bu sorunu şöyle çözdüm: [somut sonuç]. Süreç şöyle işledi..." yapısı mülakatçının dikkatini ilk 10 saniyede kazanır. Bireysel katkınızı netleştirin — "biz yaptık" yerine "ben önerdim ve koordine ettim" ifadesi çok daha güçlü bir profil çizer ve değerlendirmeyi kolaylaştırır.`,
    });
  }

  // ── Finance / consulting sector ──────────────────────────────
  if (sector === "finance" || sector === "consulting") {
    tips.push({
      id: "finance-consulting",
      title: `What ${sector} interviewers are specifically listening for`,
      body: `${sector === "finance" ? "Finance" : "Consulting"} interviews reward precision and quantification because those qualities reflect the work itself. When you describe an impact, estimate the number even if you don't know it exactly: "we reduced processing time by roughly 30%, which based on our volume at the time saved around 4 hours per week across the team." Estimated numbers with clear reasoning are more credible than vague claims of "significant improvement." They also demonstrate your analytical instinct — which is exactly what interviewers in this sector are looking for.`,
    });
  }

  // ── Final tip: closing ───────────────────────────────────────
  tips.push({
    id: "closing",
    title: "How to close your answer so the interviewer remembers it",
    body: `Most candidates trail off at the end of their answer — they run out of things to say and their voice drops. This is the impression that sticks. A strong close does one of two things: it links the story back to the role ("...and that's exactly the kind of problem I'd expect to face as a ${role}"), or it names the principle you took away ("...which is why I now always start with stakeholder alignment before any execution"). Either closing is active and intentional. It signals that you're not just recounting history — you're making an argument for why you're the right person for this role.`,
  });

  return tips.slice(0, 6);
}

/**
 * Coaching feedback on a draft answer.
 * Must explain *why* the draft works or doesn't, not just *what* to change.
 */
export function getMockCoachFeedback(
  questionText: string,
  answerDraft: string,
  profile: UserProfile
): string {
  const words = answerDraft.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const isLong = wordCount > 130;
  const isShort = wordCount < 25;
  const hasResult =
    answerDraft.toLowerCase().includes("result") ||
    answerDraft.toLowerCase().includes("outcome") ||
    answerDraft.toLowerCase().includes("led to") ||
    answerDraft.toLowerCase().includes("achieved") ||
    answerDraft.toLowerCase().includes("delivered");
  const hasAction =
    answerDraft.toLowerCase().includes(" i ") ||
    answerDraft.toLowerCase().includes("i decided") ||
    answerDraft.toLowerCase().includes("i chose") ||
    answerDraft.toLowerCase().includes("my approach");

  const { interviewType, targetRole } = profile;
  const role = targetRole || "this role";

  if (isShort) {
    return `This draft is around ${wordCount} words — too short to be competitive in a ${interviewType} interview. Short answers signal either that you haven't thought deeply about the experience, or that you don't have much to say about it. Add a specific example: what exactly happened, what you specifically did (not the team — you), and what measurably changed as a result. A well-developed answer for ${role} should run 80–120 words spoken aloud, or around 60–90 seconds.`;
  }

  if (isLong && interviewType === "phone") {
    return `For a phone interview, this draft is too long at ~${wordCount} words. Phone interviewers lose attention after 60–75 seconds because there's no visual engagement to hold them. The fix isn't to remove detail — it's to front-load the most important point. Move your conclusion to the first sentence, then give your single strongest example. Cut anything that explains context rather than demonstrates your capability. Aim for 80–100 words.`;
  }

  if (isLong) {
    return `At ~${wordCount} words, this answer is too long for a live interview setting. The risk isn't that the interviewer loses interest — it's that you dilute your strongest points with too much context. In an interview, a dense 90-word answer is more memorable than a fluent 200-word one. Go through this draft and identify the single most important action you took and the single strongest outcome. Cut everything else. What you remove is usually context, not evidence.`;
  }

  if (!hasResult && interviewType === "behavioral") {
    return `This draft doesn't show a clear result yet — and for a behavioral interview, the result is actually the most important part. Interviewers aren't evaluating the story; they're evaluating the outcome: what changed, what you produced, or what you proved. Without a result, the answer reads like a job description. Add one sentence that states specifically what happened because of your actions — even a rough estimate like "the process improved by roughly 20%" is more convincing than no number at all.`;
  }

  if (!hasAction) {
    return `This draft describes a situation but doesn't yet make clear what *you* specifically did. Interviewers are listening for the first-person: "I decided to...", "My approach was...", "I noticed that...". Group efforts are valid context, but your individual contribution is what makes the answer evaluable. Revise one or two sentences to put yourself at the centre of the action — even in a collaborative story, your specific role and decisions need to be clear to the ${role} interviewer.`;
  }

  return `This is a solid draft. Before your interview, say it aloud and time it — aim for 60–90 seconds. If it runs shorter, you may be leaving out the result or the specific action taken. If it runs longer, the opening context is probably taking too long. One additional improvement: make sure the last sentence of your answer connects the experience to something specific about the ${role} role. That closing link is what separates a competent answer from a memorable one.`;
}
