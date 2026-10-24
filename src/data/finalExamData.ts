export interface ExamQuestion {
  id: string;
  levelId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const FINAL_EXAM_QUESTIONS: ExamQuestion[] = [
  // Level 1: Basics
  {
    id: 'fe-1',
    levelId: 1,
    question: 'How is a mutual fund unit Net Asset Value (NAV) determined each business day?',
    options: [
      'By bidding between buyers and sellers on the stock exchange floor',
      'By taking total scheme assets, subtracting operating expenses, and dividing by total outstanding units',
      'By compounding the fund launch price by the RBI policy repo rate',
      'By averaging the closing prices of the top 10 portfolio holdings',
    ],
    correctIndex: 1,
    explanation: 'NAV is mathematically computed daily by taking total scheme market assets minus liabilities and dividing by the total outstanding units issued.',
  },
  {
    id: 'fe-2',
    levelId: 1,
    question: 'If Fund A has an NAV of Rs 20 and Fund B has an NAV of Rs 200, which statement is strictly true regarding returns?',
    options: [
      'Fund A is cheaper and will automatically generate faster percentage growth',
      'Fund B is overvalued and carries higher downside risk',
      'Both funds deliver identical percentage gains if their underlying portfolios rise by 10%',
      'Fund A is legally mandated to pay higher annual dividends',
    ],
    correctIndex: 2,
    explanation: 'NAV level does not indicate whether a fund is cheap or expensive. An equal amount invested in either fund yields the exact same rupee return if both portfolios gain 10%.',
  },

  // Level 2: Direct vs Regular & TER
  {
    id: 'fe-3',
    levelId: 2,
    question: 'Why do Direct plans consistently generate higher net returns than Regular plans of the same mutual fund scheme?',
    options: [
      'Direct plans invest in completely different and higher-return equities',
      'Direct plans do not pay recurring distributor commissions, leading to a lower Total Expense Ratio (TER)',
      'Regular plans are subject to higher capital gains tax rates under Indian tax law',
      'Direct plans receive priority redemption rights during market crashes',
    ],
    correctIndex: 1,
    explanation: 'Direct plans bypass distributor commissions. That 0.5% to 1.5% saved every year stays invested in your portfolio, compounding into significant wealth over decades.',
  },
  {
    id: 'fe-4',
    levelId: 2,
    question: 'Under SEBI regulations, how does an Asset Management Company collect the Total Expense Ratio (TER)?',
    options: [
      'It bills the investor with a separate quarterly invoice',
      'It deducts it proportionally each day directly from the scheme portfolio before declaring NAV',
      'It deducts the entire annual fee upon initial unit purchase',
      'It collects the fee only when the investor makes a profitable redemption',
    ],
    correctIndex: 1,
    explanation: 'TER is accrued daily and adjusted directly within the declared NAV. Investors never receive a separate fee bill or invoice.',
  },

  // Level 3: Equity Fund Categories
  {
    id: 'fe-5',
    levelId: 3,
    question: 'Under SEBI scheme classification, what is the mandatory portfolio allocation for a Large Cap equity mutual fund?',
    options: [
      'At least 65% in companies ranked 101 to 250 by market capitalization',
      'At least 80% of total assets invested in the top 100 publicly listed companies by market capitalization',
      '100% invested across Nifty 50 constituents only',
      'At least 50% in government debt and 50% in blue-chip equities',
    ],
    correctIndex: 1,
    explanation: 'SEBI strictly mandates that a Large Cap fund must allocate at least 80% of its portfolio to the top 100 listed Indian companies by market capitalization.',
  },
  {
    id: 'fe-6',
    levelId: 3,
    question: 'Why does an actively managed Small Cap fund typically experience higher drawdowns during bear markets compared to a Large Cap fund?',
    options: [
      'Small Cap companies are exempt from all SEBI listing and compliance norms',
      'Smaller companies face thinner market liquidity, higher business earnings volatility, and wider price swings during downturns',
      'Small Cap funds are legally prohibited from holding cash buffers',
      'Fund managers in small-cap funds charge double the statutory exit load',
    ],
    correctIndex: 1,
    explanation: 'Emerging businesses have higher earnings sensitivity to macroeconomic slowdowns, and lower trading liquidity creates sharper price drops during panics.',
  },

  // Level 4: Debt Funds & Yields
  {
    id: 'fe-7',
    levelId: 4,
    question: 'What happens to the market value of existing long-term bonds in a debt fund portfolio when market interest rates rise?',
    options: [
      'Bond prices rise because higher rates make all debt securities more attractive',
      'Bond prices fall because newly issued bonds offer higher coupons, making older bonds with lower yields less valuable',
      'Bond prices remain completely fixed because sovereign bonds have zero market price volatility',
      'Bond issuers are required by RBI to immediately raise the coupon on existing bonds',
    ],
    correctIndex: 1,
    explanation: 'Bond prices and interest rates share an inverse relationship. When prevailing interest rates rise, existing lower-coupon bonds drop in market value.',
  },
  {
    id: 'fe-8',
    levelId: 4,
    question: 'An investor seeking to park an emergency fund for 2 to 4 months with minimal interest rate risk should prioritize which category?',
    options: [
      'Long Duration Gilt Funds',
      'Liquid or Ultra Short Duration Funds holding high-quality sovereign and top-tier money market instruments',
      'Credit Risk Funds focused on lower-rated corporate debentures',
      'Sectoral Banking Equity Mutual Funds',
    ],
    correctIndex: 1,
    explanation: 'Liquid and Ultra Short Duration funds invest in securities maturing in 91 days or less, providing high safety, stability, and quick redemption liquidity.',
  },

  // Level 5: SIP vs Lump Sum & Rupee Cost Averaging
  {
    id: 'fe-9',
    levelId: 5,
    question: 'How does Rupee Cost Averaging benefit a retail investor during an extended stock market correction?',
    options: [
      'It guarantees that the portfolio will never show a temporary paper loss',
      'It automatically borrows money from the bank at zero interest to buy extra units',
      'A fixed recurring rupee installment automatically purchases more units when NAV is low and fewer units when NAV is high',
      'It forces the fund manager to convert all equity holdings into fixed deposits',
    ],
    correctIndex: 2,
    explanation: 'Rupee Cost Averaging automatically turns market corrections into opportunities by accumulating a larger number of units at lower NAV prices without timing anxiety.',
  },
  {
    id: 'fe-10',
    levelId: 5,
    question: 'What is the disciplined role of an annual Step-Up SIP?',
    options: [
      'It increases your monthly investment percentage in line with annual salary growth, drastically compounding terminal wealth',
      'It moves your units into riskier small-cap funds whenever the index hits a new high',
      'It waives all capital gains taxes when you redeem units after 5 years',
      'It eliminates the fund house Total Expense Ratio after the third year',
    ],
    correctIndex: 0,
    explanation: 'Stepping up your SIP by even 10% each year matches natural career income growth and can double your long-term corpus over 15 to 20 years.',
  },

  // Level 6: Reading Factsheets & Risk Metrics
  {
    id: 'fe-11',
    levelId: 6,
    question: 'When comparing two equity funds in the same category, what does a higher Sharpe Ratio indicate?',
    options: [
      'The fund holds a higher percentage of cash and liquid debentures',
      'The fund has generated superior risk-adjusted returns per unit of total portfolio volatility',
      'The fund manager has a shorter tenure and trades more frequently',
      'The fund charges a higher management fee to investors',
    ],
    correctIndex: 1,
    explanation: 'Sharpe ratio measures excess return over the risk-free rate divided by standard deviation. A higher ratio proves superior return generation per unit of volatility.',
  },
  {
    id: 'fe-12',
    levelId: 6,
    question: 'On an official mutual fund factsheet, what is the significance of the Portfolio Turnover Ratio?',
    options: [
      'It reveals the total annual dividend payout yield of the scheme',
      'It shows how frequently the fund manager buys and sells securities in the portfolio within a year',
      'It indicates the percentage of retail investors who redeemed their units',
      'It measures the difference between fund returns and the benchmark index',
    ],
    correctIndex: 1,
    explanation: 'Portfolio turnover reflects the frequency of trading. A high turnover indicates active trading with higher transaction friction, while a low turnover reflects a buy-and-hold strategy.',
  },

  // Level 7: Taxation & Investor Rights
  {
    id: 'fe-13',
    levelId: 7,
    question: 'Under current Indian taxation rules for equity mutual funds, how are Long Term Capital Gains (LTCG) taxed when held for more than 12 months?',
    options: [
      'Completely tax-free up to any profit amount',
      'Tax-free up to Rs 1,25,000 per financial year, with gains above that threshold taxed at 12.5%',
      'Taxed at a flat rate of 20% with indexation benefits',
      'Added directly to your total income and taxed at your maximum slab rate',
    ],
    correctIndex: 1,
    explanation: 'For equity mutual funds held over 12 months, LTCG up to Rs 1.25 Lakh per financial year is exempt. Any profit exceeding Rs 1.25 Lakh is taxed at 12.5% without indexation.',
  },
  {
    id: 'fe-14',
    levelId: 7,
    question: 'If an Asset Management Company or broker fails to resolve an investor grievance within the statutory deadline, what is the official SEBI redressal platform?',
    options: [
      'RBI Ombudsman Portal for Retail Banking',
      'SEBI SCORES 2.0 (SEBI Complaints Redress System)',
      'Consumer Forum District Court',
      'AMFI Public Helpline',
    ],
    correctIndex: 1,
    explanation: 'SCORES 2.0 is the official online centralized grievance redressal platform launched by SEBI to enforce timely and audited resolution of investor complaints.',
  },
];
