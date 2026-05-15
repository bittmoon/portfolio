import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Local fallback assistant for when the API is unavailable
function getLocalFallbackReply(message: string, context: any[]): string {
  const lowerMsg = message.toLowerCase();

  // Skills questions
  if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack') || lowerMsg.includes('strongest')) {
    return `Ahmed is a skilled front-end developer proficient in **React, TypeScript, JavaScript, HTML5, CSS3, and Tailwind CSS**. He also works with **Node.js, Express, and various APIs**. His projects demonstrate expertise in modern web development, state management, responsive design, and building full-stack applications.`;
  }

  // Experience / about
  if (lowerMsg.includes('experience') || lowerMsg.includes('about') || lowerMsg.includes('who') || lowerMsg.includes('background')) {
    return `Ahmed Elbarbary is a passionate front-end developer who builds modern, responsive web applications. He has experience with React, TypeScript, and full-stack development. Check out the **Explorer** panel to browse his projects and case studies!`;
  }

  // Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach') || lowerMsg.includes('hire')) {
    return `You can reach Ahmed through the contact information in his portfolio. Feel free to connect — he's always open to discussing new opportunities and collaborations!`;
  }

  // Projects (general)
  if (lowerMsg.includes('project') || lowerMsg.includes('portfolio') || lowerMsg.includes('work') || lowerMsg.includes('built')) {
    if (context && context.length > 0) {
      const projectList = context.map((p: any) => `• **${p.title || p.name}**: ${p.description || 'A web application'}`).join('\n');
      return `Here are Ahmed's projects:\n\n${projectList}\n\nClick on any project in the **Explorer** panel to see more details!`;
    }
    return `Ahmed has built several impressive projects including web dashboards, portfolio sites, and full-stack applications. Browse the **Explorer** panel to see them all!`;
  }

  // Specific project mentions — try to match by name
  if (context && context.length > 0) {
    const matched = context.find((p: any) => {
      const name = (p.title || p.name || '').toLowerCase();
      return name && lowerMsg.includes(name.toLowerCase());
    });
    if (matched) {
      return `**${matched.title || matched.name}**: ${matched.description || 'A web application built by Ahmed.'}${matched.tech ? `\n\n**Tech Stack**: ${Array.isArray(matched.tech) ? matched.tech.join(', ') : matched.tech}` : ''}${matched.liveUrl ? `\n\n🔗 [Live Demo](${matched.liveUrl})` : ''}`;
    }
  }

  // Greetings
  if (lowerMsg.match(/^(hi|hello|hey|sup|yo|greetings)/)) {
    return `Hey there! 👋 I'm Ahmed's portfolio assistant. I can tell you about his **skills**, **projects**, and **experience**. What would you like to know?`;
  }

  // Default
  return `Great question! I can help you learn about Ahmed's **skills**, **projects**, and **experience**. Try asking something like:\n\n• "What are your strongest skills?"\n• "Tell me about your projects"\n• "What technologies do you use?"\n\nYou can also browse the **Explorer** panel to see all projects and case studies!`;
}

function isQuotaOrRateError(errorMsg: string): boolean {
  const patterns = ['429', 'Too Many Requests', 'quota', 'rate limit', 'rate_limit', 'RESOURCE_EXHAUSTED', 'exceeded'];
  return patterns.some(p => errorMsg.toLowerCase().includes(p.toLowerCase()));
}

function isApiKeyError(errorMsg: string): boolean {
  const patterns = ['API_KEY_INVALID', 'API key not valid', 'API key expired', 'PERMISSION_DENIED', 'forbidden'];
  return patterns.some(p => errorMsg.toLowerCase().includes(p.toLowerCase()));
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are an AI assistant built into the developer portfolio of Ahmed Elbarbary, a talented front-end developer. 
Your goal is to answer questions about the developer's projects, skills, and experience. 
Keep your answers concise, professional, and helpful. If you don't know the answer, say you don't know but encourage the user to reach out via email.

Context about the developer's projects:
${JSON.stringify(context, null, 2)}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser question: ${message}` }] }
      ],
    });

    const response = result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error.message);
    
    const errorMsg = error.message || '';
    const { message: userMessage, context } = req.body;

    if (isApiKeyError(errorMsg)) {
      // Use local fallback for API key issues
      const fallback = getLocalFallbackReply(userMessage, context);
      res.json({ reply: fallback });
    } else if (isQuotaOrRateError(errorMsg)) {
      // Use local fallback for quota/rate limit issues
      const fallback = getLocalFallbackReply(userMessage, context);
      res.json({ reply: fallback });
    } else {
      // Unknown error — still try local fallback
      console.error('Unknown error, using local fallback:', errorMsg);
      const fallback = getLocalFallbackReply(userMessage, context);
      res.json({ reply: fallback });
    }
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
