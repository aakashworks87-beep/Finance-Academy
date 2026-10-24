import { BeyondAsset } from '../types';

export const BEYOND_ASSETS: BeyondAsset[] = [
  {
    id: 'stocks',
    title: 'Direct Stocks (Equities)',
    category: 'Equity Ownership',
    summary:
      'Direct ownership of fractional shares in publicly traded companies listed on the NSE or BSE. You participate directly in corporate growth, voting rights, and cash dividends.',
    whoItSuits:
      'Investors with dedicated time and skill to study balance sheets, annual reports, quarterly earnings, and who can endure significant price swings without panic.',
    riskLevel: 'High',
    expectedReturn: '12% to 16% (long term, highly variable)',
    liquidity: 'Very High (T+1 market settlement on trading days)',
    keyRule: 'Never invest in individual stocks based on social media tips or unverified hype.',
  },
  {
    id: 'bonds',
    title: 'Bonds and Debentures',
    category: 'Fixed Income',
    summary:
      'Lending instruments issued by corporations or financial institutions to raise debt capital. In exchange, the issuer commits to paying regular interest coupons and returning principal at maturity.',
    whoItSuits:
      'Investors seeking predictable fixed income with higher interest rates than bank fixed deposits, who understand issuer credit ratings (AAA, AA, A).',
    riskLevel: 'Medium',
    expectedReturn: '8% to 11% (dependent on issuer credit rating)',
    liquidity: 'Moderate (can be traded on exchanges, but secondary market volume varies)',
    keyRule: 'Prioritize AAA or AA rated issuers, because default or delayed interest payments remain a real possibility with lower-rated paper.',
  },
  {
    id: 'g-secs',
    title: 'Government Securities (via RBI Retail Direct)',
    category: 'Sovereign Debt',
    summary:
      'Bonds, Treasury Bills, and State Development Loans (SDLs) issued directly by the Government of India and state governments. Backed by sovereign guarantee with zero credit risk.',
    whoItSuits:
      'Conservative investors and retirees seeking absolute capital safety with regular semi-annual interest, lock-in flexibility, and zero intermediary fees.',
    riskLevel: 'Low',
    expectedReturn: '6.8% to 7.4% (sovereign risk-free benchmark)',
    liquidity: 'High (tradeable via RBI Retail Direct secondary NDS-OM platform)',
    keyRule: 'You can open a free Retail Direct Gilt (RDG) account directly on rbiretaildirect.org.in with zero maintenance charges.',
  },
  {
    id: 'small-savings',
    title: 'PPF, NSC, and Small Savings Schemes',
    category: 'Government Savings',
    summary:
      'Postal and sovereign-backed savings vehicles like the Public Provident Fund (PPF), National Savings Certificate (NSC), and Sukanya Samriddhi Yojana. Rates are reviewed quarterly by the Ministry of Finance.',
    whoItSuits:
      'Individuals wanting guaranteed capital protection with attractive tax deductions under Section 80C and completely tax-free maturity status (EEE for PPF).',
    riskLevel: 'Low',
    expectedReturn: '7.1% to 8.2% (government declared quarterly)',
    liquidity: 'Low (PPF has a 15-year tenure with restricted partial withdrawals after year 7)',
    keyRule: 'Max deposit in PPF is Rs 1.5 Lakhs per financial year to claim triple tax exemption.',
  },
  {
    id: 'gold',
    title: 'Gold (Sovereign Gold Bonds, ETFs, Digital)',
    category: 'Precious Metals',
    summary:
      'A time-tested hedge against inflation and currency depreciation. Available physically, via Gold ETFs on stock exchanges, or through Sovereign Gold Bonds (SGBs) issued by the RBI.',
    whoItSuits:
      'Investors aiming to allocate 5% to 10% of their overall portfolio to an asset class that tends to hold purchasing power during geopolitical turmoil and fiat devaluation.',
    riskLevel: 'Medium',
    expectedReturn: '8% to 11% (historical long term gold appreciation in INR)',
    liquidity: 'High for Gold ETFs, Moderate for SGB secondary market',
    keyRule: 'Avoid keeping large physical gold allocations that incur locker charges, making charges, and purity deduction discounts upon resale.',
  },
  {
    id: 'fds',
    title: 'Fixed Deposits (Bank FDs)',
    category: 'Term Deposits',
    summary:
      'Term deposits placed with commercial banks for a designated duration ranging from 7 days to 10 years at a contracted interest rate. Insured up to Rs 5 Lakhs per bank by DICGC.',
    whoItSuits:
      'Emergency fund storage, short-term financial goals due within 1 to 3 years, and senior citizens needing dependable monthly interest payments.',
    riskLevel: 'Low',
    expectedReturn: '6.5% to 7.5% (additional 0.5% for senior citizens)',
    liquidity: 'Very High (premature withdrawal permitted with minor 0.5% to 1% interest penalty)',
    keyRule: 'Interest is fully taxable at your income slab rate. For people in 30% tax brackets, real post-tax return often trails inflation.',
  },
];
