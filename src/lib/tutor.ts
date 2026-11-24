/**
 * Browser-side AI tutor for Finance Academy.
 *
 * The tutor used to run on an AI Studio dev backend (server.ts). That backend
 * now sits behind a cookie check page and cannot answer API calls, which
 * broke the chat and the voice for every visitor. The site is fully static
 * (GitHub Pages), so the tutor now talks to Gemini directly from the browser
 * using the same models, system instruction, and fallbacks as the old server.
 *
 * The API key is injected at build time from the VITE_GEMINI_API_KEY
 * environment variable (a GitHub Actions secret). It is never committed to
 * this repository in plain text.
 */
import { GoogleGenAI } from '@google/genai';

const RAW_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ?? '';
const API_KEY = RAW_KEY.trim();

/** True when a usable Gemini API key was provided at build time. */
export const tutorConfigured = API_KEY.length > 0 && API_KEY !== 'MY_GEMINI_API_KEY';

let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!tutorConfigured) {
    throw new Error('The tutor is not configured.');
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: API_KEY });
  }
  return client;
}

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

const CHAT_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
];

const TTS_MODELS = ['gemini-2.5-flash-preview-tts', 'gemini-3.8-flash-lite-tts'];

function isQuotaError(err: unknown): boolean {
  const message = String((err as { message?: unknown })?.message ?? err);
  return (
    message.includes('429') ||
    message.toLowerCase().includes('quota') ||
    message.includes('RESOURCE_EXHAUSTED')
  );
}

export interface TutorMessage {
  role: string;
  content: string;
}

/** Send the conversation to Gemini and return the tutor's reply text. */
export async function tutorChat(messages: TutorMessage[], mode?: string): Promise<string> {
  const ai = getClient();
  const contents = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));
  const systemInstruction =
    mode === 'deep'
      ? `${SYSTEM_INSTRUCTION}\n\nDEEP MODE: Provide a thorough, in-depth explanation with mathematical definitions, practical Indian investor calculations, and key risk warnings.`
      : SYSTEM_INSTRUCTION;

  let lastError: unknown = null;
  for (const model of CHAT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction },
      });
      const text = (response.text ?? '').replace(/—/g, ', ').trim();
      if (!text) throw new Error('Empty reply from model');
      return text;
    } catch (err) {
      lastError = err;
      if (isQuotaError(err)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Tutor unavailable');
}

function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\[ACTION:.*?\]/g, '')
    .replace(/\*\*|`|\*|#+/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/₹/g, 'Rupees ')
    .replace(/—/g, ', ')
    .trim();
}

/** Wrap raw 16-bit PCM samples in a WAV container and return a blob URL. */
function pcmToWavUrl(base64: string, sampleRate: number): string {
  const binary = atob(base64);
  const pcm = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) pcm[i] = binary.charCodeAt(i);

  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcm.length, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcm.length, true);

  const blob = new Blob([header, pcm.buffer as ArrayBuffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

function audioDataToUrl(base64: string, mimeType: string): string {
  // Already a WAV file (starts with the RIFF header).
  try {
    if (atob(base64.slice(0, 16)).startsWith('RIFF')) {
      return `data:audio/wav;base64,${base64}`;
    }
  } catch {
    // fall through to the generic handling below
  }
  const rateMatch = /rate=(\d+)/i.exec(mimeType);
  if (/l16|pcm/i.test(mimeType) || rateMatch) {
    return pcmToWavUrl(base64, rateMatch ? parseInt(rateMatch[1], 10) : 24000);
  }
  return `data:${mimeType.split(';')[0] || 'audio/wav'};base64,${base64}`;
}

/** Generate tutor speech for a reply and return a playable audio URL. */
export async function tutorSpeakUrl(text: string): Promise<string> {
  const ai = getClient();
  const cleanSpeechText = cleanTextForSpeech(text);
  if (!cleanSpeechText) throw new Error('Nothing to speak');

  let lastError: unknown = null;
  for (const model of TTS_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
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
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const data = part?.inlineData?.data;
      if (!data) throw new Error('No audio returned from speech model');
      return audioDataToUrl(data, part?.inlineData?.mimeType ?? 'audio/wav');
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Speech unavailable');
}
