import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

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

// Initialize server-side Gemini client with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the AI Financial Mentor at "Finance Academy by Aakash".
Your mission is to guide Indian beginners from zero to confident in mutual funds, personal finance, RBI monetary policy, and SEBI investor protection.

CRITICAL RULES:
1. NEVER use em-dashes anywhere in your responses. Never use the em-dash punctuation mark. Use commas, colons, parentheses, or full stops instead.
2. NEVER give stock or mutual fund buy/sell recommendations. If asked for a fund recommendation, explain the criteria to evaluate funds instead (category, TER, benchmark comparison, fund manager tenure, portfolio overlap).
3. Always maintain an educational, friendly, and patient tone.
4. Ground examples in India, such as Indian Rupees (INR, Rs, Lakhs, Crores), Nifty 50, Sensex, KYC, CAMS, KFintech, and Indian tax laws (STCG, LTCG).
5. Highlight risk-reward trade-offs and remind users that mutual funds are subject to market risks.
6. Keep answers structured, clean, and easy to read.`;

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

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'The tutor is having trouble right now, please try again in a bit.',
      });
    }

    // Format contents for @google/genai
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Select genuine, verified active models
    // gemini-3.1-flash-lite provides fast, dependable answers in 1 to 2 seconds
    const targetModel = 'gemini-3.1-flash-lite';
    const activeInstruction = mode === 'deep'
      ? `${SYSTEM_INSTRUCTION}\n\nDEEP MODE: Provide a thorough, in-depth explanation with mathematical definitions, practical Indian investor calculations, and key risk warnings.`
      : SYSTEM_INSTRUCTION;

    let response;
    try {
      response = await ai.models.generateContent({
        model: targetModel,
        contents,
        config: {
          systemInstruction: activeInstruction,
        },
      });
    } catch (primaryError: any) {
      console.warn(`Primary model call failed:`, primaryError?.message);
      throw primaryError;
    }

    // Ensure no em-dash slips into reply text
    let replyText = response?.text || 'I could not generate an answer at this moment.';
    replyText = replyText.replace(/\u2014/g, ', ');

    return res.json({
      text: replyText,
      modelUsed: targetModel,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error?.message || error);
    // Never show raw API error JSON to users
    return res.status(500).json({
      error: 'The tutor is having trouble right now, please try again in a bit.',
    });
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
