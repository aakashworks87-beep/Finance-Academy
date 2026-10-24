import { RbiInstrument, SebiFraud } from '../types';

export const RBI_INSTRUMENTS: RbiInstrument[] = [
  {
    name: 'Repo Rate',
    fullName: 'Repurchase Option Rate',
    explanation:
      'The interest rate at which commercial banks borrow money from the Reserve Bank of India by pledging government securities as collateral. It is the master benchmark interest rate for the entire Indian economy.',
    whyItMatters:
      'When the RBI cuts the repo rate, your bank home loans, car loans, and business borrowings become cheaper over time. When the RBI hikes the repo rate to tame inflation, your loan EMIs increase.',
    typicalImpact: 'Direct and rapid impact on all floating-rate retail bank loans.',
  },
  {
    name: 'Reverse Repo / SDF',
    fullName: 'Reverse Repurchase / Standing Deposit Facility',
    explanation:
      'The interest rate at which commercial banks park their excess cash with the RBI overnight. The Standing Deposit Facility (SDF) allows banks to park liquidity without requiring collateral securities.',
    whyItMatters:
      'Sets the absolute lower floor for interest rates in the financial system. If banks can safely earn 6.25% at the RBI with zero risk, they will never lend to companies at lower rates.',
    typicalImpact: 'Governs short-term interbank money market yields and liquid fund returns.',
  },
  {
    name: 'CRR',
    fullName: 'Cash Reserve Ratio',
    explanation:
      'The specific percentage of total customer deposits that every commercial bank must hold in pure cash with the RBI. Banks earn zero interest on this mandatory cash cushion.',
    whyItMatters:
      'Controls the amount of money banks can lend out. If RBI raises CRR from 4.5% to 5.0%, banks must immediately lock up tens of thousands of crores, reducing easy credit in the economy.',
    typicalImpact: 'Adjusts broad money supply and keeps banking liquidity safe.',
  },
  {
    name: 'SLR',
    fullName: 'Statutory Liquidity Ratio',
    explanation:
      'The mandatory minimum percentage of deposits that banks must invest in safe liquid assets, predominantly Central and State Government Securities (G-Secs), gold, or approved bonds.',
    whyItMatters:
      'Ensures commercial banks remain solvent during sudden depositor panics, and guarantees that the Indian government always has institutional buyers for its infrastructure bonds.',
    typicalImpact: 'Anchors government borrowing yields and ensures baseline bank safety.',
  },
  {
    name: 'OMO',
    fullName: 'Open Market Operations',
    explanation:
      'The open market buying and selling of Government Securities by the RBI. When the central bank buys G-Secs from the market, it injects fresh cash into the banking system. When it sells G-Secs, it absorbs excess cash.',
    whyItMatters:
      'Directly stabilizes long-term bond yields and prevents sudden market disruptions without requiring a formal change in the headline repo rate.',
    typicalImpact: 'Steers long-term borrowing costs for corporations and sovereign debt funds.',
  },
];

export const SEBI_FRAUDS: SebiFraud[] = [
  {
    name: 'Telegram & WhatsApp "Guaranteed Profit" Stock Groups',
    warningSigns:
      'Unsolicited invites to VIP investment groups, screenshots of massive trading profits, and promises of 5% to 20% daily returns.',
    howItWorks:
      'Scammers fabricate fake profit screenshots and instruct victims to transfer funds to shady personal bank accounts, promising automated algorithmic trading. Once you deposit money, the group blocks you.',
    preventionTip:
      'Remember that genuine financial advisers never operate anonymous Telegram tip channels. Real market returns can never be guaranteed.',
  },
  {
    name: 'Fake Institutional Trading Apps & Fraudulent IPO Allotment Scams',
    warningSigns:
      'Links sent via SMS or WhatsApp to install APK files disguised as elite foreign institutional investor (FII) trading terminals.',
    howItWorks:
      'Victims are tricked into believing they have exclusive 100% guaranteed allocation in hot, oversubscribed IPOs. The application displays fake balances, but when the user requests a withdrawal, they are asked to pay high "customs taxes" or "clearance fees" before the scammer disappears.',
    preventionTip:
      'Only apply for IPOs via official ASBA (Application Supported by Blocked Amount) through your registered bank NetBanking portal or authorized UPI handles on SEBI registered broker platforms.',
  },
  {
    name: 'Unregistered Portfolio Management (PMS) & Ponzi Schemes',
    warningSigns:
      'Private operators asking you to transfer capital to their individual or private firm account, promising fixed 2% to 4% monthly interest.',
    howItWorks:
      'The operator pays early investors using money brought in by newer investors. No real underlying business exists. Once fresh inflows slow down, the promoter vanishes with the entire pool.',
    preventionTip:
      'A legitimate SEBI-registered PMS requires a statutory legal minimum ticket size of Rs 50 Lakhs. Any scheme taking Rs 50,000 or Rs 2 Lakhs with guaranteed returns is illegal.',
  },
  {
    name: 'Pump-and-Dump in Illiquid Penny Stocks',
    warningSigns:
      'Coordinated social media campaigns on YouTube, Instagram, and SMS claiming that a virtually unknown micro-cap penny company will explode 10x.',
    howItWorks:
      'Fraudulent operators quietly accumulate illiquid penny shares at Rs 2. They release fake rumors and paid influencer reels. Unsuspecting retail investors rush in to buy, pushing the stock to Rs 20. The fraudsters dump their shares at the peak, leaving retail investors trapped in lower-circuit price freezes.',
    preventionTip:
      'Never trade obscure penny stocks with tiny market capitalizations and negligible trading volume based on social media promotions.',
  },
  {
    name: 'Unregulated Forex & Binary Option Betting Platforms',
    warningSigns:
      'Advertisements promising quick double-up payouts based on guessing whether a currency pair or gold price will rise or fall in 60 seconds.',
    howItWorks:
      'These offshore platforms are strictly illegal in India under the Foreign Exchange Management Act (FEMA). The software is rigged against the trader, and wire transfers sent abroad cannot be recovered.',
    preventionTip:
      'The RBI maintains an "Alert List" of unauthorized forex trading portals. Always check the official RBI Alert List before signing up on any trading platform.',
  },
];
