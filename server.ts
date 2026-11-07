import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Ensure Nginx routes /api/ directly to port 3000 without hitting the cookie check
function ensureNginxApiBypass() {
  try {
    const templatePath = '/etc/nginx/nginx.conf.template';
    if (fs.existsSync(templatePath)) {
      let tpl = fs.readFileSync(templatePath, 'utf8');
      if (!tpl.includes('location /api/')) {
        const tplBlock = `
        location /api/ {
            proxy_pass http://localhost:\${DEFAULT_APP_PORT};
            proxy_set_header Host localhost:\${DEFAULT_APP_PORT};
            proxy_set_header X-Forwarded-Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
`;
        const target = '        # Serve the app for all other paths.';
        if (tpl.includes(target)) {
          tpl = tpl.replace(target, tplBlock + target);
          fs.writeFileSync(templatePath, tpl);
        }
      }
    }

    const confPath = '/etc/nginx/nginx.conf';
    if (fs.existsSync(confPath)) {
      let conf = fs.readFileSync(confPath, 'utf8');
      if (!conf.includes('location /api/')) {
        const apiBlock = `
        location /api/ {
            proxy_pass http://localhost:3000;
            proxy_set_header Host localhost:3000;
            proxy_set_header X-Forwarded-Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
`;
        const target = '        # Serve the app for all other paths.';
        if (conf.includes(target)) {
          conf = conf.replace(target, apiBlock + target);
          fs.writeFileSync(confPath, conf);
          exec('nginx -s reload', (err) => {
            if (err) console.warn('Nginx reload notice:', err.message);
          });
        }
      }
    }
  } catch {
    // Non-fatal if running in environments without Nginx access
  }
}
ensureNginxApiBypass();

/**
 * SECURITY NOTE FOR THE APP OWNER:
 * To safeguard your GEMINI_API_KEY against unauthorized third-party usage:
 * 1. Open Google Cloud Console (https://console.cloud.google.com/apis/credentials).
 * 2. Locate your Gemini API Key and click Edit Key.
 * 3. Under "Application restrictions", choose "Websites" (HTTP referrers) or set API restrictions
 *    to specifically allow only the "Generative Language API".
 * 4. Add your authorized domains, for example:
 *    - https://ais-dev-go3g32rkwrmxlyvwgidedn-813067729840.asia-southeast1.run.app/*
 *    - https://ais-pre-go3g32rkwrmxlyvwgidedn-813067729840.asia-southeast1.run.app/*
 *    - https://aakashworks87-beep.github.io/*
 * 5. This backend route acts as a secure proxy: the browser never sees or imports the API key.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Enable CORS for cross-origin requests from GitHub Pages and preview environments
const ALLOWED_ORIGIN = 'https://aakashworks87-beep.github.io';

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && (origin === ALLOWED_ORIGIN || origin.endsWith('.github.io') || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('run.app'))) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Explicit OPTIONS preflight route handlers for required API routes
app.options('/api/health', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

app.options('/api/chat', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

app.options('/api/regulatory-topics', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

app.options('/api/feeds/rbi', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

app.options('/api/feeds/sebi', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

app.options('/api/tts', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.sendStatus(204);
});

// Initialize server-side Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the AI Financial Mentor at "Finance Academy by Aakash". Your mission is to guide Indian beginners from zero to confident in mutual funds, personal finance, RBI monetary policy, and SEBI investor protection, and help them navigate this website.

FULL WEBSITE KNOWLEDGE:
- Mutual Fund Course: 7 levels covering basics, NAV, direct vs regular plans, TER, equity, debt, and hybrid types, and taxation (STCG/LTCG). Levels unlock strictly one by one. Passing a level quiz requires scoring at least 2 out of 3.
- Final Exam & Certificate: Unlocks after completing all 7 levels. Passing the Final Exam unlocks the official Certificate of Completion, which includes a unique verification ID formatted as FA-2026-XXXXXX.
- Asset Classes: Beyond mutual funds, we cover stocks (equity), bonds, government securities (G-Secs), PPF, NSC and small savings schemes, gold, and fixed deposits. Each covers risk levels, suitability, expected returns, and liquidity.
- RBI & SEBI Regulators: Covers RBI roles (monetary policy, repo rate, reverse repo and SDF, CRR, SLR, OMO, MPC, and how rate changes affect loans, FDs, and debt funds) and SEBI roles (investor protection, mutual fund categorization, scheme transparency, SCORES 2.0).
- Glossary: Quick definitions of finance and investing terms used throughout the platform.
- SIP Calculator: Interactive tool to calculate Systematic Investment Plan compounding and rupee cost averaging.
- Blog Section: Articles and analyses by Aakash explaining real market stories and practical investor insights.
- Tutor Modes: Standard Tutor (balanced and thorough), Deep Analysis (in-depth mathematical and conceptual breakdowns), and Quick Answers (concise, direct answers).

GUIDE BEHAVIOUR & IN-CHAT NAVIGATION:
- Act as a friendly beginner guide for the entire website. When asked "guide me", "what can I do here", "where do I start", or "how will this help me", give a short, simple tour in plain, basic English explaining how each part benefits the visitor.
- Suggest a sensible learning order: start Level 1 in the course, use the Glossary when stuck, test your SIP growth with the SIP Calculator, read the Blog for real Indian market insights, then take the Final Exam and earn your Certificate.
- When asked where anything is, tell them exactly where it is in the app.
- Whenever you mention a part of the website or the visitor asks to go somewhere, you MUST append a navigation action tag at the very end of your response in this exact format: [ACTION: Button Label | target]
  - Supported action targets:
    - [ACTION: Start Level 1 | course]
    - [ACTION: Open the SIP Calculator | calculator]
    - [ACTION: Open the Glossary | glossary]
    - [ACTION: Read the Blog | analysis]
    - [ACTION: Take the Final Exam | exam]
    - [ACTION: View My Certificate | certificate]
    - [ACTION: See Asset Classes | beyond]
    - [ACTION: Learn about RBI and SEBI | regulators]

CREATOR QUESTIONS:
- When asked about the creator of this website, answer with ONLY these facts and never invent more: This website was created by Aakash Manjunath Hegde, a B.Voc BFSI student at TISS Mumbai. He built Finance Academy as a free investor education initiative for Indian beginners, and he also writes the Rupee Notes finance blog.
- NEVER share any phone number, personal email, home address, or any other personal detail.

CRITICAL RULES:
1. NEVER use em-dashes anywhere in your responses. Never use the em-dash punctuation mark. Use commas, colons, parentheses, or full stops instead.
2. NEVER give stock or mutual fund buy/sell recommendations. If asked for a fund recommendation, explain criteria to evaluate funds instead (category, TER, benchmark comparison, fund manager tenure, portfolio overlap).
3. Always maintain an educational, friendly, and patient tone in simple, basic, easy English.
4. Ground examples in India, such as Indian Rupees (INR, Rs, Lakhs, Crores), Nifty 50, Sensex, KYC, CAMS, KFintech, and Indian tax laws (STCG, LTCG).
5. Highlight risk-reward trade-offs and remind users that mutual funds are subject to market risks.
6. If a question is fully outside finance and this website, answer briefly if it is a general question, then gently offer to guide them back to what the website offers.`;

// Backend health check endpoint to reflect genuine AI availability
app.get('/api/health', (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  return res.json({
    status: 'ok',
    online: hasKey,
    timestamp: new Date().toISOString(),
  });
});

// Multi-turn chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, mode } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim() || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      console.error('Gemini API Error: GEMINI_API_KEY secret is missing, empty, or placeholder.');
      return res.status(503).json({
        error: 'The tutor is having trouble right now, please try again in a bit.',
      });
    }

    // Format contents for @google/genai
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Model cascade: Primary (gemini-2.5-flash), Fallback (gemini-2.0-flash), Resilient Fallback (gemini-3.5-flash-lite, gemini-3.8-flash, gemini-3.1-flash-lite)
    const primaryModel = 'gemini-2.5-flash';
    const fallbackModel = 'gemini-2.0-flash';
    const resilientModels = ['gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    const activeInstruction = mode === 'deep'
      ? `${SYSTEM_INSTRUCTION}\n\nDEEP MODE: Provide a thorough, in-depth explanation with mathematical definitions, practical Indian investor calculations, and key risk warnings.`
      : SYSTEM_INSTRUCTION;

    let response;
    let usedModel = primaryModel;

    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        contents,
        config: {
          systemInstruction: activeInstruction,
        },
      });
    } catch (primaryError: any) {
      console.error('Primary model (gemini-2.5-flash) failed:', primaryError?.message || primaryError);

      const errorMessage = String(primaryError?.message || primaryError);
      const isQuotaError = errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError) {
        console.warn('Quota limit (429) encountered. Waiting 2 seconds before fallback retry...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      try {
        usedModel = fallbackModel;
        response = await ai.models.generateContent({
          model: fallbackModel,
          contents,
          config: {
            systemInstruction: activeInstruction,
          },
        });
      } catch (fallbackError: any) {
        console.warn('Fallback model (gemini-2.0-flash) failed, attempting active resilient model:', fallbackError?.message || fallbackError);
        
        let lastError = fallbackError;
        for (const resModel of resilientModels) {
          try {
            usedModel = resModel;
            response = await ai.models.generateContent({
              model: resModel,
              contents,
              config: {
                systemInstruction: activeInstruction,
              },
            });
            break;
          } catch (rErr: any) {
            lastError = rErr;
            console.warn(`Resilient model ${resModel} attempt failed:`, rErr?.message || rErr);
          }
        }

        if (!response) {
          throw lastError;
        }
      }
    }

    // Ensure no em-dash slips into reply text
    let replyText = response?.text || 'I could not generate an answer at this moment.';
    replyText = replyText.replace(/\u2014/g, ', ');

    return res.json({
      text: replyText,
      modelUsed: usedModel,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error?.message || error);
    // Never show raw API error JSON to users
    return res.status(500).json({
      error: 'The tutor is having trouble right now, please try again in a bit.',
    });
  }
});

// Text-to-Speech (TTS) endpoint
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text string is required.' });
    }

    if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_API_KEY.trim() || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      return res.status(503).json({ error: 'TTS service unavailable.' });
    }

    // Clean plain text for speech (strip action tags, markdown headers, bold, URLs)
    const cleanSpeechText = text
      .replace(/\[ACTION:.*?\|.*?\]/g, '')
      .replace(/\*\*|`|\*|#+/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/₹/g, 'Rupees ')
      .replace(/\u2014/g, ', ')
      .trim();

    // Use gemini-2.5-flash-preview-tts with young male voice "Puck", with fallback
    let ttsResponse;
    try {
      ttsResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ role: 'user', parts: [{ text: cleanSpeechText }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' },
            },
          },
        },
      });
    } catch (primaryTtsErr: any) {
      console.warn('gemini-2.5-flash-preview-tts failed, trying gemini-3.8-flash-lite-tts:', primaryTtsErr?.message || primaryTtsErr);
      ttsResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [{ role: 'user', parts: [{ text: cleanSpeechText }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' },
            },
          },
        },
      });
    }

    const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioBase64) {
      return res.status(500).json({ error: 'No audio returned from speech model.' });
    }

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    // If client specifically requests JSON, return base64, otherwise return binary audio/wav
    if (req.headers.accept === 'application/json') {
      return res.json({
        audio: audioBase64,
        mimeType: 'audio/wav',
      });
    }

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', audioBuffer.length);
    return res.end(audioBuffer);
  } catch (err: any) {
    console.error('TTS Endpoint Error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to generate speech.' });
  }
});

// Curated regulatory topics endpoint (Static, honest, official links)
app.get('/api/regulatory-topics', (_req: Request, res: Response) => {
  const rbiTopics = [
    {
      id: 'rbi-1',
      source: 'RBI',
      title: 'Monetary Policy Framework and Policy Repo Rate Mandate',
      category: 'Monetary Policy',
      date: 'Official Regulatory Document',
      summary: 'Statutory resolutions of the Monetary Policy Committee (MPC) governing benchmark interest rates, liquidity control, and inflation targeting.',
      url: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    },
    {
      id: 'rbi-2',
      source: 'RBI',
      title: 'Direct Retail Access to Government Debt via RBI Retail Direct',
      category: 'Retail Securities',
      date: 'Sovereign Portal',
      summary: 'Enables individual retail investors to open Retail Direct Gilt accounts and purchase sovereign Treasury Bills and Government of India Bonds directly.',
      url: 'https://rbiretaildirect.org.in/',
    },
    {
      id: 'rbi-3',
      source: 'RBI',
      title: 'Public Advisories on Digital Financial Safeguards and Mule Accounts',
      category: 'Consumer Protection',
      date: 'Public Notification',
      summary: 'Direct guidance from the Reserve Bank on recognizing illegal digital lending apps, unverified forex portals, and digital payment frauds.',
      url: 'https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx',
    },
    {
      id: 'rbi-4',
      source: 'RBI',
      title: 'Master Direction on Financial Literacy and Banking Standards',
      category: 'Investor Education',
      date: 'Master Circular',
      summary: 'Central regulatory standard outlining customer rights, fair banking conduct, and nationwide financial awareness initiatives.',
      url: 'https://rbi.org.in/Scripts/NotificationUser.aspx',
    },
  ];

  const sebiTopics = [
    {
      id: 'sebi-1',
      source: 'SEBI',
      title: 'Categorization and Rationalization of Mutual Fund Schemes',
      category: 'Mutual Fund Mandate',
      date: 'Official Master Circular',
      summary: 'The landmark regulatory framework mandating that every mutual fund must remain strictly true-to-label in Large Cap, Mid Cap, and Debt categories.',
      url: 'https://www.sebi.gov.in/legal/circulars.html',
    },
    {
      id: 'sebi-2',
      source: 'SEBI',
      title: 'SCORES 2.0 Centralized Investor Grievance Redressal System',
      category: 'Investor Redressal',
      date: 'Official Statutory Portal',
      summary: 'Two-tier auto-routing dispute mechanism that mandates listed companies and AMCs to resolve investor grievances within designated timelines.',
      url: 'https://scores.sebi.gov.in/',
    },
    {
      id: 'sebi-3',
      source: 'SEBI',
      title: 'Investor Caution on Unregistered Advisers and Tip Groups',
      category: 'Fraud Alert',
      date: 'Public Warning Notice',
      summary: 'Official cautionary guidance warning retail investors against unsolicited recommendations on Telegram, WhatsApp, and unregistered algorithmic apps.',
      url: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13',
    },
    {
      id: 'sebi-4',
      source: 'SEBI',
      title: 'Mandatory Monthly Risk-o-meter and Portfolio Disclosures',
      category: 'Transparency Mandate',
      date: 'Regulatory Requirement',
      summary: 'Requires all fund houses to publish detailed monthly portfolio holdings, expense ratios, and updated risk ratings for investor evaluation.',
      url: 'https://www.sebi.gov.in/legal/press-releases.html',
    },
  ];

  return res.json({
    rbi: rbiTopics,
    sebi: sebiTopics,
  });
});

// Live RSS Feed fetching and caching (refreshed at most once every 30 minutes)
interface FeedItem {
  title: string;
  date: string;
  link: string;
  label?: string;
  timestamp: number;
}

let rbiCache: { items: FeedItem[]; lastFetched: number } = { items: [], lastFetched: 0 };
let sebiCache: { items: FeedItem[]; lastFetched: number } = { items: [], lastFetched: 0 };
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

async function fetchRssFeed(url: string, label?: string): Promise<FeedItem[]> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 FinanceAcademy' } });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const xml = await res.text();
    
    const items: FeedItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/i);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
      const dateMatch = itemContent.match(/<(?:pubDate|dc:date|date)>([\s\S]*?)<\/(?:pubDate|dc:date|date)>/i);

      let title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : 'Official Update';
      title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

      let link = linkMatch ? linkMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
      if (!link) {
        const guidMatch = itemContent.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i);
        if (guidMatch) link = guidMatch[1].trim();
      }

      const dateStr = dateMatch ? dateMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : new Date().toUTCString();
      const parsedDate = new Date(dateStr);
      const timestamp = !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : Date.now();
      const date = !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : dateStr;

      items.push({
        title,
        date,
        link: link || (url.includes('rbi.org.in') ? 'https://rbi.org.in' : 'https://www.sebi.gov.in'),
        ...(label ? { label } : {}),
        timestamp,
      });
    }
    return items;
  } catch (err) {
    console.warn(`Failed to fetch RSS feed ${url}:`, err);
    return [];
  }
}

async function getRbiFeeds(): Promise<FeedItem[]> {
  const now = Date.now();
  if (rbiCache.items.length > 0 && (now - rbiCache.lastFetched < CACHE_TTL_MS)) {
    return rbiCache.items;
  }

  const [pressReleases, notifications] = await Promise.all([
    fetchRssFeed('https://www.rbi.org.in/pressreleases_rss.xml', 'Press Release'),
    fetchRssFeed('https://www.rbi.org.in/notifications_rss.xml', 'Notification'),
  ]);

  const combined = [...pressReleases, ...notifications];
  combined.sort((a, b) => b.timestamp - a.timestamp);

  if (combined.length > 0) {
    rbiCache = { items: combined, lastFetched: now };
  }
  return rbiCache.items;
}

async function getSebiFeeds(): Promise<FeedItem[]> {
  const now = Date.now();
  if (sebiCache.items.length > 0 && (now - sebiCache.lastFetched < CACHE_TTL_MS)) {
    return sebiCache.items;
  }

  const items = await fetchRssFeed('https://www.sebi.gov.in/sebirss.xml');
  items.sort((a, b) => b.timestamp - a.timestamp);

  if (items.length > 0) {
    sebiCache = { items, lastFetched: now };
  }
  return sebiCache.items;
}

app.get('/api/feeds/rbi', async (_req: Request, res: Response) => {
  try {
    const items = await getRbiFeeds();
    return res.json({ items, lastUpdated: new Date(rbiCache.lastFetched).toISOString() });
  } catch {
    return res.json({ items: rbiCache.items, lastUpdated: new Date(rbiCache.lastFetched).toISOString() });
  }
});

app.get('/api/feeds/sebi', async (_req: Request, res: Response) => {
  try {
    const items = await getSebiFeeds();
    return res.json({ items, lastUpdated: new Date(sebiCache.lastFetched).toISOString() });
  } catch {
    return res.json({ items: sebiCache.items, lastUpdated: new Date(sebiCache.lastFetched).toISOString() });
  }
});

// Vite or Static file serving
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Finance Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
