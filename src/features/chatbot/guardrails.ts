// Portfolio-only chatbot guardrails

// Quick replies to show after a blocked or out-of-scope question.
export const BLOCKED_TOPIC_QUICK_REPLIES = [
  "What services do you offer?",
  "Show me your case studies",
  "What is your tech stack?",
  "How can I book a call?",
] as const;

export const LEARNING_TOPIC_QUICK_REPLIES = [
  "How do you use Python in your work?",
  "What is your tech stack?",
  "Show me your case studies",
] as const;

export const PROMPT_INJECTION_QUICK_REPLIES = [
  "What services do you offer?",
  "How can I book a call?",
  "Show me your case studies",
] as const;

export const UNRELATED_TOPIC_QUICK_REPLIES = [
  "What services do you offer?",
  "Can you help automate my business?",
  "How can I book a call?",
] as const;

export const BOOKING_QUICK_REPLIES = [
  "How can I book a call?",
  "What happens after booking?",
  "Can you help with my project?",
] as const;

export const PRICING_QUICK_REPLIES = [
  "What is your pricing?",
  "How long does a project take?",
  "How can I book a call?",
] as const;

export const RECRUITER_QUICK_REPLIES = [
  "What is your experience?",
  "What is your availability?",
  "How can I book a call?",
] as const;

// Exact portfolio questions we want to explicitly allow.
export const ALLOWED_PROJECT_QUESTIONS = [
  "what services do you offer?",
  "how can i book a call?",
  "show me your case studies",
  "what is your experience?",
  "what technologies do you use?",
  "can you help automate my business?",
  "how do you build ai systems?",
  "what is your process?",
  "how do i get started?",
  "can i see your portfolio?",
  "how do i contact you?",
  "what is your pricing?",
  "how long does a project take?",
  "what is your background?",
  "what is your tech stack?",
  "can you show examples?",
  "how do i hire you?",
  "what is your availability?",
  "can you work on my project?",
  "what is your approach?",
  "what is your timeline?",
  "can you share references?",
  "what is your delivery process?",
  "how do you ensure quality?",
  "what is your project scope?",
  "can you explain your work?",
  "what is your role in projects?",
  "how do you handle feedback?",
  "what is your revision policy?",
  "how do you communicate with clients?",
  "what is your onboarding process?",
] as const;

// Exact non-portfolio questions we always block.
export const BLOCKED_NON_PROJECT_QUESTIONS = [
  "how do i learn python?",
  "how do i become a developer?",
  "how do i get better at coding?",
  "how do i prepare for interviews?",
  "what is the best way to learn programming?",
  "can you teach me javascript?",
  "can you teach me react?",
  "can you teach me node.js?",
  "can you teach me sql?",
  "can you teach me database design?",
  "can you teach me coding?",
  "can you recommend resources?",
  "can you recommend tutorials?",
  "can you recommend books?",
  "how do i start learning programming?",
  "how do i start learning coding?",
  "how do i start learning react?",
  "how do i start learning javascript?",
  "how do i start learning node.js?",
  "how do i start learning sql?",
  "how do i start learning database design?",
  "how do i start learning ai?",
  "how do i start learning machine learning?",
  "how do i start learning software engineering?",
  "how do i start learning web development?",
  "how do i start learning backend development?",
  "how do i start learning frontend development?",
  "how do i start learning full stack development?",
] as const;

// Main blocked response.
export const PROJECT_SCOPE_FALLBACK =
  "I'm here to help with questions about my services, projects, case studies, experience, tech stack, pricing, and how I can help your business. What would you like to know?";

export const LEARNING_SCOPE_FALLBACK =
  "I don't cover general tutorials or learning resources here — but I'm happy to talk about how I use Python, JavaScript, AI, APIs, and automation in my own projects and client work. Ask me about my tech stack, case studies, or services!";

export const PROMPT_INJECTION_FALLBACK =
  "I can't go outside my portfolio scope, but I'm happy to help with anything about my work, services, projects, or how to get started. What would you like to know?";

export const UNRELATED_TOPIC_FALLBACK =
  "That's a bit outside what I cover here. I'm best at answering questions about my services, projects, experience, pricing, and how I can help with your business. What are you looking to do?";

export const RECRUITER_SCOPE_FALLBACK =
  "Great to connect! I'm happy to share my experience, project work, availability, and what I bring to the table. Feel free to ask anything — or book a quick call at /book-call to talk directly.";

// Generic learning/tutoring intent.
export const GENERAL_LEARNING_REQUEST_REGEX =
  /\b(learn|learning|teach me|tutorial|tutorials|course|courses|book|books|resource|resources|roadmap|practice|get better at|become a|become an|study|master|improve at|how to learn|how do i learn|how can i learn|tell me how to learn)\b/i;

// General tech topics we only allow when clearly tied to Moruf's work.
export const GENERAL_TECH_TOPIC_REGEX =
  /\b(python|java|javascript|react|node(?:\.js)?|sql|database|coding|programming|software engineering|software development|web development|backend|frontend|full stack|machine learning|artificial intelligence|ai)\b/i;

// Topics that count as in-scope for the portfolio.
export const PORTFOLIO_TOPIC_REGEX =
  /\b(portfolio|project|projects|case study|case studies|example|examples|service|services|experience|background|tech stack|stack|pricing|price|cost|budget|quote|estimate|timeline|deadline|delivery|deliverables|hire|hiring|availability|contact|book|booking|booked|schedule|scheduling|scheduled|call|calls|meeting|meetings|discovery call|consultation|next steps|onboarding|automation|automate|workflow|workflows|api|apis|integration|integrations|ai system|ai systems|web app|web apps|web development|web dev|website|websites|web design|ecommerce|e-commerce|app development|mobile app|backend|frontend|full-stack|full stack|software development|software engineer|client|clients|business|role|recruiter|recruitment|cv|resume|your work|what you do|who are you|built|building|build for my|help me build|help automate|linkedin|github|twitter|instagram|social|profile|email|reach you|reach out|connect|location|based|south africa|johannesburg|nigeria|lagos|education|degree|university|school|certification|course|achievement|skill|skills|language|speak|moruf|adebola|name|about you|introduce|yourself|tell me about|work with me|work together|start working|available to start|can you help|can you build|can you create|need a|need an|looking for a|looking for an|i want a|i need a)\b/i;

// Block attempts to override or manipulate chatbot instructions.
export const PROMPT_INJECTION_REGEX =
  /\b(ignore (all|any|previous|earlier) instructions|forget (all|any|previous|earlier) instructions|act as|pretend to be|roleplay as|jailbreak|bypass|override your rules|system prompt|developer prompt|reveal your prompt)\b/i;

// High-value in-scope conversation groups.
export const BOOKING_TOPIC_REGEX =
  /\b(book|booking|booked|schedule|scheduling|scheduled|calendar|call|calls|phone call|meeting|meetings|zoom|whatsapp|discovery call|consultation|talk|next steps|onboarding)\b/i;

export const PRICING_TIMELINE_TOPIC_REGEX =
  /\b(price|pricing|cost|budget|quote|estimate|timeline|deadline|how long|delivery|deliver)\b/i;

export const RECRUITER_TOPIC_REGEX =
  /\b(recruiter|recruitment|hiring|job|role|position|interview|contract|availability|cv|resume)\b/i;

// Short exploratory phrases visitors commonly use when just browsing the site.
export const SHORT_EXPLORATION_REGEX =
  /^(just exploring|just looking|just browsing|exploring|looking around|just checking|browsing)$/i;

export const SHORT_EXPLORATION_REPLY =
  "No problem — feel free to explore! Try: 'Show me your projects', 'What services do you offer?', or 'How can I book a call?'.";

// Compliments and praise from users
export const COMPLIMENT_REGEX =
  /\b(great|awesome|amazing|impressive|excellent|good|nice|cool|love|love your|love it|doing well|doing a great job|doing an excellent job|you're great|you're awesome|you're doing great|you're doing well|you are doing great|you are doing well|talented|skilled|brilliant|fantastic|wonderful|incredible|kudos|congratulations|well done|bravo|great job|good job|nice work|keep it up|rock|crushing it|killing it)\b/i;

export const COMPLIMENT_QUICK_REPLIES = [
  "What services do you offer?",
  "Show me your case studies",
  "How can I book a call?",
] as const;

export const COMPLIMENT_REPLY =
  "Thank you so much! I really appreciate that. I'm passionate about building high-quality solutions that make a real impact. If you'd like to explore how I can help with your project, just ask!";
