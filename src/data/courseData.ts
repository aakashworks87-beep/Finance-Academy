import { CourseLevel } from '../types';

export const COURSE_LEVELS: CourseLevel[] = [
  {
    id: 1,
    title: 'Level 1: Mutual Fund Basics',
    tagline: 'Understand pooling, units, NAV, and what fund managers actually do.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'What is a Mutual Fund and How Does Pooling Work?',
        content: [
          'A **mutual fund** is simply a vehicle where thousands of individual investors combine their money into one single pot. Instead of buying individual shares or bonds on your own with limited capital, your money joins a massive collective pool.',
          'An **Asset Management Company (AMC)**, such as SBI Mutual Fund, HDFC Mutual Fund, or ICICI Prudential, manages this pool. It hires a qualified professional called a **fund manager** who analyzes companies and invests the pooled money according to a strict legal charter.',
        ],
        everydayAnalogy:
          'Think of hiring a private cab versus taking a shared luxury bus. If you travel alone in a private taxi, you bear the entire fuel and driver fee. When 50 passengers share a luxury bus, everyone pays a tiny fraction of the cost, yet everyone reaches the same destination safely.',
      },
      {
        heading: 'Units and Net Asset Value (NAV) Explained Simply',
        content: [
          'When you invest in a mutual fund, you do not directly own individual shares of Infosys or Reliance. Instead, you own **units** of the mutual fund scheme.',
          'The price of one single unit is called the **Net Asset Value (NAV)**. At the close of each trading day at 3:30 PM, the fund counts the total market value of all stocks, bonds, and cash it holds. It subtracts daily operating expenses, and divides the remainder by the total number of units issued to investors.',
          'A high NAV does not mean a fund is expensive, and a low NAV does not mean a fund is cheap. A fund with an NAV of Rs 100 and a fund with an NAV of Rs 10 will deliver the exact same percentage growth if their underlying portfolios rise by 15%.',
        ],
        everydayAnalogy:
          'Imagine a large pizza sliced into 8 slices. If you pay Rs 80 for 1 slice, or Rs 800 for an entire pizza cut into 10 big slices, you measure your wealth by the total quantity of pizza you own, not whether a single slice was priced at Rs 10 or Rs 80.',
      },
      {
        heading: 'The Role and Boundaries of the Fund Manager',
        content: [
          'The **fund manager** is supported by research analysts, risk controllers, and compliance teams. Their daily job is to select securities, review company balance sheets, and rebalance the portfolio.',
          'However, fund managers cannot do whatever they please. They are strictly regulated by SEBI mandates and their scheme information document. A large-cap manager is legally forbidden from gambling investor money on tiny speculative micro-cap shares.',
        ],
      },
    ],
    numericExample: {
      scenario: 'Pooling Money with Friends to Buy Units at Launch',
      breakdown: [
        { label: 'Initial Pooled Capital', value: 'Rs 1,00,000 (10 friends contribute Rs 10,000 each)' },
        { label: 'Starting NAV', value: 'Rs 10 per unit' },
        { label: 'Total Units Issued', value: '10,000 units (1,000 units per friend)' },
        { label: 'Portfolio Value After 1 Year', value: 'Rs 1,20,000 (portfolio grew by 20%)' },
        { label: 'New NAV per Unit', value: 'Rs 12.00 (Rs 1,20,000 divided by 10,000 units)' },
        { label: 'Value of Each Friend\'s Holding', value: '1,000 units multiplied by Rs 12 = Rs 12,000' },
      ],
      conclusion: 'Every investor gained exactly 20%, regardless of whether they bought 100 units or 1,000 units.',
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'What does NAV stand for in mutual funds?',
        options: [
          'Nominal Annual Value',
          'Net Asset Value',
          'National Asset Verification',
          'New Allocation Value',
        ],
        correctIndex: 1,
        explanation: 'NAV stands for Net Asset Value. It represents the per-unit market value of all securities held in the fund after deducting expenses.',
      },
      {
        id: 'q1-2',
        question: 'Is a fund with an NAV of Rs 15 necessarily cheaper and better than a fund with an NAV of Rs 150?',
        options: [
          'Yes, because Rs 15 allows you to buy more units',
          'No, NAV only represents the division of units, not portfolio value or future growth potential',
          'Yes, lower NAV always gives higher percentage returns',
          'Yes, SEBI guarantees that low NAV funds carry lower risk',
        ],
        correctIndex: 1,
        explanation: 'NAV is just a division of total assets by unit count. If both portfolios grow by 10%, Rs 10,000 invested in either fund becomes Rs 11,000.',
      },
      {
        id: 'q1-3',
        question: 'Can a mutual fund manager invest in speculative assets outside the scheme mandate?',
        options: [
          'Yes, fund managers have complete personal discretion',
          'No, they must strictly follow SEBI mandates and the Scheme Information Document',
          'Yes, if the stock market is crashing',
          'Only if the AMC board gives verbal approval',
        ],
        correctIndex: 1,
        explanation: 'Fund managers are legally bound by SEBI scheme classification guidelines and the statutory Scheme Information Document (SID).',
      },
    ],
  },
  {
    id: 2,
    title: 'Level 2: Types of Mutual Funds',
    tagline: 'Master equity, debt, hybrid, index, direct vs regular, and growth vs IDCW.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'The Core Fund Categories',
        content: [
          '**Equity Funds**: Invest predominantly in company shares. They aim for high capital growth over 5 or more years, but carry higher short-term price fluctuations.',
          '**Debt Funds**: Invest in fixed income securities such as government bonds, treasury bills, and corporate debentures. They offer lower volatility and suit horizons from a few days to 3 years.',
          '**Hybrid Funds**: Blend both equity and debt in one scheme. Balanced Advantage or Aggressive Hybrid funds automatically manage asset allocation for steady growth.',
          '**Index Funds and ETFs**: Passive funds that mirror an index like Nifty 50 or BSE Sensex. No fund manager tries to pick winners, leading to ultra-low management costs.',
          '**ELSS (Equity Linked Savings Scheme)**: Tax-saving equity fund with a mandatory 3-year lock-in period and section 80C tax deduction under the old income tax regime.',
          '**Liquid Funds**: Ultra-safe debt funds investing in government and corporate debt maturing within 91 days. The ideal substitute for a low-yield savings bank account.',
          '**Sectoral and Thematic Funds**: Concentrate heavily on one sector, like banking, technology, or defense. They carry very high risk because if that single industry struggles, the fund falls sharply.',
          '**Fund of Funds (FoF)**: A fund that does not buy stocks directly, but buys units of other domestic or international mutual funds.',
        ],
        everydayAnalogy:
          'Think of a dietary plate. Equity is your rich protein for growth, debt is your staple water and grains for stability, and index funds are simple home-cooked meals with low cost and reliable nutrition.',
      },
      {
        heading: 'Open-Ended vs Close-Ended Funds',
        content: [
          '**Open-Ended Funds** allow you to buy or sell units on any business day directly from the fund house at the prevailing NAV. Over 98% of retail investments in India are in open-ended schemes.',
          '**Close-Ended Funds** accept money only during the initial New Fund Offer (NFO) and lock your capital until maturity. They are traded on stock exchanges, but often suffer from poor liquidity.',
        ],
      },
      {
        heading: 'Direct Plans vs Regular Plans',
        content: [
          'Every mutual fund scheme comes in two distinct variants: **Direct Plan** and **Regular Plan**.',
          'In a **Regular Plan**, the fund house pays an ongoing trailing commission to a broker, distributor, or bank agent. This commission is deducted directly from your fund assets every single day through a higher expense ratio.',
          'In a **Direct Plan**, you invest directly through the AMC website, MF Central, CAMS, KFintech, or zero-commission platforms. Because no distributor commission is paid, the expense ratio is between 0.5% to 1.2% lower every single year. Over 15 to 25 years, this difference alone can save you several lakhs of Rupees in compounding wealth.',
        ],
      },
      {
        heading: 'Growth Option vs IDCW (Dividend) Option',
        content: [
          'In the **Growth Option**, any profits made by the fund are automatically reinvested back into the fund. Your unit count stays the same while your NAV climbs higher over time. This triggers compounding.',
          'In the **IDCW Option** (Income Distribution cum Capital Withdrawal), the fund pays out cash to your bank account periodically. Remember that dividends are not free bonus gifts. They are paid by deducting the equivalent amount directly from your NAV, and are taxed at your income tax slab rate.',
        ],
      },
    ],
    numericExample: {
      scenario: 'The Staggering 20-Year Cost of a 1% Distributor Commission',
      breakdown: [
        { label: 'Monthly SIP', value: 'Rs 10,000 per month for 20 years (Rs 24 Lakhs invested)' },
        { label: 'Underlying Market Growth', value: '13.0% gross annual return' },
        { label: 'Direct Plan Return (0.5% TER)', value: '12.5% net return: Final Corpus = Rs 97.2 Lakhs' },
        { label: 'Regular Plan Return (1.5% TER)', value: '11.5% net return: Final Corpus = Rs 86.8 Lakhs' },
        { label: 'Wealth Lost to Commission', value: 'Rs 10.4 Lakhs lost purely to distributor commission' },
      ],
      conclusion: 'Choosing the Direct Plan on the exact same fund earned over Rs 10 Lakhs in extra wealth with zero added risk.',
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Why does a Direct Plan yield higher long-term returns than a Regular Plan for the identical fund?',
        options: [
          'The Direct Plan invests in higher quality companies',
          'The Direct Plan has no distributor commission, leading to a lower Total Expense Ratio',
          'Direct Plans receive tax discounts from the government',
          'Regular Plans are penalized by SEBI',
        ],
        correctIndex: 1,
        explanation: 'Both Direct and Regular plans share the exact same underlying portfolio of stocks. The Direct plan performs better purely because it does not pay distributor commissions.',
      },
      {
        id: 'q2-2',
        question: 'Under the IDCW option, where does the distributed money come from?',
        options: [
          'Extra money given by the government',
          'Free interest paid by the AMC reserves',
          'It is deducted directly from your existing Net Asset Value (NAV)',
          'From penalties charged to other investors',
        ],
        correctIndex: 2,
        explanation: 'IDCW stands for Income Distribution cum Capital Withdrawal. Any payout is deducted straight out of the fund NAV, reducing your NAV accordingly.',
      },
      {
        id: 'q2-3',
        question: 'What is the minimum lock-in period for an ELSS (Equity Linked Savings Scheme) mutual fund?',
        options: [
          '1 year',
          '3 years',
          '5 years',
          '15 years',
        ],
        correctIndex: 1,
        explanation: 'ELSS has a mandatory lock-in of 3 years, which is the shortest lock-in period among all Section 80C tax-saving financial instruments in India.',
      },
    ],
  },
  {
    id: 3,
    title: 'Level 3: How to Invest (SIP, STP, SWP, and KYC)',
    tagline: 'Understand rupee cost averaging, automated transfers, and hassle-free onboarding.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'SIP vs Lump Sum Investing',
        content: [
          'A **Systematic Investment Plan (SIP)** is a disciplined method where a fixed amount of money is automatically debited from your bank account every month or week to purchase mutual fund units.',
          'The superpower of SIP is **Rupee Cost Averaging**. When the stock market crashes, your fixed monthly amount buys more units at cheap prices. When the market surges, you buy fewer units. You never have to predict market tops or bottoms.',
          'A **Lump Sum** investment means deploying your entire capital in one single transaction. While historically profitable over long spans, entering with a lump sum right before a market correction can be emotionally stressful for beginners.',
        ],
        everydayAnalogy:
          'Think of buying petrol for your scooter. If you always fill Rs 500 worth of petrol every Monday, you automatically get more liters when fuel prices drop and fewer liters when fuel prices rise. Your average price per liter stays balanced.',
      },
      {
        heading: 'STP and SWP Explained with Real Use Cases',
        content: [
          '**Systematic Transfer Plan (STP)**: Allows you to park a large lump sum in a low-risk liquid fund, and automatically transfer a fixed amount every week or month into an equity fund. This earns liquid fund returns while averaging your equity entry.',
          '**Systematic Withdrawal Plan (SWP)**: The opposite of an SIP. It lets you redeem a fixed sum from your mutual fund corpus into your bank account every month. It is the premier tool for retirees to create a monthly pension with superior tax efficiency.',
        ],
      },
      {
        heading: 'KYC and How a Beginner Starts in India',
        content: [
          'To invest in Indian mutual funds, you need to complete a one-time process called **Know Your Customer (KYC)**.',
          'You only need three items: your **PAN Card**, your **Aadhaar Card** (linked with mobile for OTP), and an **active Indian bank account** (with IFSC and proof like a cancelled cheque).',
          'Once registered through KRAs (such as CVL, CAMS, or NDML), your KYC is valid across all 40+ mutual fund houses in India. You do not need to repeat KYC when buying another fund.',
        ],
      },
    ],
    numericExample: {
      scenario: 'How Rupee Cost Averaging Lowers Your Purchase Price',
      breakdown: [
        { label: 'Month 1 SIP (Rs 5,000)', value: 'NAV = Rs 100 -> You acquire 50.0 units' },
        { label: 'Month 2 SIP (Rs 5,000, Market Dips)', value: 'NAV = Rs 80 -> You acquire 62.5 units' },
        { label: 'Month 3 SIP (Rs 5,000, Market Recovers)', value: 'NAV = Rs 100 -> You acquire 50.0 units' },
        { label: 'Total Capital Invested', value: 'Rs 15,000 for 162.5 units' },
        { label: 'Your Effective Average Cost per Unit', value: 'Rs 15,000 divided by 162.5 = Rs 92.30' },
        { label: 'Current Portfolio Value at Rs 100 NAV', value: '162.5 units multiplied by Rs 100 = Rs 16,250' },
      ],
      conclusion: 'Even though the market ended at the exact same price it started (Rs 100), you earned a Rs 1,250 profit thanks to buying extra units in the dip.',
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'What is the core benefit of Rupee Cost Averaging in an SIP?',
        options: [
          'It guarantees you will never lose money in the short term',
          'It automatically buys more units when prices fall and fewer when prices rise',
          'It exempts your returns from all government capital gains taxes',
          'It allows you to skip KYC documentation completely',
        ],
        correctIndex: 1,
        explanation: 'Rupee Cost Averaging removes the need to time market peaks and valleys by purchasing more units at cheaper valuations during market declines.',
      },
      {
        id: 'q3-2',
        question: 'Which tool is ideal for a retiree wanting a monthly cash flow from an accumulated corpus?',
        options: [
          'SIP (Systematic Investment Plan)',
          'NFO (New Fund Offer)',
          'SWP (Systematic Withdrawal Plan)',
          'STP into a Sectoral Fund',
        ],
        correctIndex: 2,
        explanation: 'An SWP (Systematic Withdrawal Plan) lets investors systematically redeem a designated amount every month, making it ideal for regular retirement income.',
      },
      {
        id: 'q3-3',
        question: 'Do you need to complete a separate KYC for each mutual fund company you invest with?',
        options: [
          'Yes, each AMC requires a fresh physical visit',
          'No, once verified by a SEBI registered KRA, your KYC is valid across all Indian AMCs',
          'Only if investing in debt funds',
          'Yes, KYC expires every 6 months',
        ],
        correctIndex: 1,
        explanation: 'KYC is centralized under SEBI registered KRAs (KYC Registration Agencies). Once verified, you can invest across any AMC in India.',
      },
    ],
  },
  {
    id: 4,
    title: 'Level 4: How to Read a Fund Factsheet',
    tagline: 'Deconstruct TER, portfolio disclosures, benchmarks, and the Risk-o-meter.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'What is a Mutual Fund Factsheet?',
        content: [
          'Every month, each mutual fund publishes a comprehensive disclosure document known as the **Factsheet**. It provides a 360-degree transparent snapshot of where your hard-earned money is invested.',
          'Key parameters to examine include **Assets Under Management (AUM)**, the fund inception date, fund manager credentials, and the scheme objective.',
        ],
        everydayAnalogy:
          'A factsheet is like the nutritional label on the back of packaged food. It tells you the exact ingredients, calorie breakdown, and whether there are any hidden artificial preservatives.',
      },
      {
        heading: 'Total Expense Ratio (TER) and Portfolio Turnover',
        content: [
          'The **Total Expense Ratio (TER)** is the annual percentage of fund assets deducted to cover management fees, custodial charges, registrar fees, and marketing.',
          'SEBI sets regulatory caps on TER based on fund size: as a fund grows larger in AUM, it is legally required to reduce its expense ratio.',
          'The **Portfolio Turnover Ratio** indicates how frequently the fund manager buys and sells stocks within the portfolio. A turnover ratio of 20% means the manager is patient and buys for the long term. A turnover ratio of 150% means the manager trades aggressively, which increases brokerage and transaction friction.',
        ],
      },
      {
        heading: 'Benchmark Comparison and the Risk-o-meter',
        content: [
          'A fund must always compare its performance against an official **Benchmark**, such as the Nifty 50 TRI or Nifty Midcap 150 TRI. The suffix **TRI** stands for Total Returns Index, which includes both stock price growth and reinvested dividends. Never compare a fund with a simple price index.',
          'The **Risk-o-meter** is a mandatory pictorial dial with six standardized levels: Low, Low to Moderate, Moderate, Moderately High, High, and Very High. SEBI mandates that AMCs recalculate the Risk-o-meter every month based on actual portfolio holdings.',
        ],
      },
    ],
    numericExample: {
      scenario: 'Evaluating Alpha and True Benchmark Outperformance',
      breakdown: [
        { label: 'Scheme 5-Year CAGR Return', value: '16.5% per annum' },
        { label: 'Assigned Benchmark (Nifty 50 TRI)', value: '14.0% per annum' },
        { label: 'Alpha Generated by Manager', value: '+2.5% per annum above benchmark' },
        { label: 'Fund Total Expense Ratio (Direct)', value: '0.65%' },
        { label: 'Portfolio Turnover Ratio', value: '28% (patient, buy-and-hold strategy)' },
      ],
      conclusion: 'The manager delivered 2.5% net value above the passive benchmark even after all fund expenses were deducted.',
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'Why should a mutual fund always be evaluated against a Total Returns Index (TRI) benchmark?',
        options: [
          'TRI excludes taxes',
          'TRI accounts for both stock price movements and corporate dividends reinvested',
          'TRI is designed specifically for government bonds',
          'TRI guarantees a fixed 12% return',
        ],
        correctIndex: 1,
        explanation: 'A TRI (Total Returns Index) includes all dividends paid by companies, providing a fair and honest comparison against an active mutual fund.',
      },
      {
        id: 'q4-2',
        question: 'What does a high portfolio turnover ratio (e.g., over 150%) indicate?',
        options: [
          'The fund is completely passive',
          'The fund manager frequently churns holdings, which adds trading costs',
          'The fund has zero management expenses',
          'The fund is locked for 3 years',
        ],
        correctIndex: 1,
        explanation: 'High portfolio turnover indicates frequent buying and selling, which generates higher brokerage and transaction costs inside the scheme.',
      },
      {
        id: 'q4-3',
        question: 'How often does SEBI mandate fund houses to evaluate and publish the Risk-o-meter?',
        options: [
          'Once every 5 years',
          'Only during the initial NFO',
          'Monthly, based on the actual securities in the portfolio',
          'Never, it is optional',
        ],
        correctIndex: 2,
        explanation: 'SEBI requires fund houses to recalculate and publish the Risk-o-meter monthly to reflect real-time credit, liquidity, and equity risks.',
      },
    ],
  },
  {
    id: 5,
    title: 'Level 5: Risk, Returns, and Realistic Expectations',
    tagline: 'Grasp standard deviation, Sharpe ratio, and why past returns do not guarantee the future.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'The Risk-Return Trade-Off',
        content: [
          'In finance, higher potential returns are the market payment for bearing higher uncertainty and volatility. There is no such thing as high guaranteed returns without massive hidden risk.',
          'Equity markets can experience sharp drawdowns of 20%, 30%, or even 50% in black-swan events (like the 2008 global crisis or March 2020 pandemic). Risk is not just losing money permanently; it is also the emotional stress of watching your portfolio value drop temporarily.',
        ],
        everydayAnalogy:
          'Taking an airplane is faster than taking a train. But if there is turbulence in mid-air, you cannot jump out halfway. You must stay seated with your seatbelt fastened until the plane lands smoothly.',
      },
      {
        heading: 'Standard Deviation and Sharpe Ratio in Plain Words',
        content: [
          '**Standard Deviation** measures how wildly a fund return swings around its average. If Fund A and Fund B both average 12% returns, but Fund A has a Standard Deviation of 11% while Fund B has 24%, Fund A gives a much smoother ride with far less stomach-churning volatility.',
          'The **Sharpe Ratio** tells you how much extra return a fund delivers for every unit of risk it took. It subtracts the risk-free rate (like an RBI Treasury bill) from the fund return, and divides the result by standard deviation. A higher Sharpe Ratio means the fund manager generated intelligent risk-adjusted gains, not just lucky reckless bets.',
        ],
      },
      {
        heading: 'Why Past Returns Do Not Guarantee Future Returns',
        content: [
          'One of the most dangerous beginner traps is sorting funds by last year\'s return and picking the number one fund on the chart.',
          'Markets operate in cycles. The best performing sector this year (e.g., IT or defense) frequently underperforms in the subsequent two years as valuations become stretched. Long-term wealth is built by holding consistent, diversified funds through full economic cycles.',
        ],
      },
    ],
    numericExample: {
      scenario: 'Comparing Two Funds Using Sharpe Ratio (Risk-Free Rate = 6.5%)',
      breakdown: [
        { label: 'Fund A Annualized Return', value: '14.5%' },
        { label: 'Fund A Standard Deviation (Volatility)', value: '12.0%' },
        { label: 'Fund A Sharpe Ratio Calculation', value: '(14.5% - 6.5%) / 12.0% = 0.67' },
        { label: 'Fund B Annualized Return', value: '15.5%' },
        { label: 'Fund B Standard Deviation (Volatility)', value: '22.0%' },
        { label: 'Fund B Sharpe Ratio Calculation', value: '(15.5% - 6.5%) / 22.0% = 0.41' },
      ],
      conclusion: 'Fund A is the superior choice. It produced almost the same return as Fund B while taking nearly half the risk.',
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'What does a higher Sharpe Ratio signify for an investor?',
        options: [
          'The fund has higher exit load charges',
          'The fund produced better returns per unit of volatility taken',
          'The fund is fully invested in government cash',
          'The fund guarantees zero market risk',
        ],
        correctIndex: 1,
        explanation: 'A higher Sharpe ratio indicates superior risk-adjusted return. The manager is being rewarded with genuine excess return for the risk incurred.',
      },
      {
        id: 'q5-2',
        question: 'Why is picking a fund based purely on the previous 1-year return often counterproductive?',
        options: [
          'Because past winners often suffer mean reversion after cyclical peaks',
          'Because AMCs close top funds after 12 months',
          'Because SEBI freezes funds that make high returns',
          'Because 1-year returns include illegal insider profits',
        ],
        correctIndex: 0,
        explanation: 'Sectors rotate and high valuations mean-revert. Buying the top past winner often leads to buying at the absolute peak of a hype cycle.',
      },
      {
        id: 'q5-3',
        question: 'What does standard deviation reflect in fund performance statistics?',
        options: [
          'The exact amount of tax you will pay',
          'The consistency and volatility of returns around the fund average',
          'The commission paid to the distributor',
          'The number of companies in the Nifty 50',
        ],
        correctIndex: 1,
        explanation: 'Standard deviation measures volatility. A lower number indicates smoother, more consistent returns over time.',
      },
    ],
  },
  {
    id: 6,
    title: 'Level 6: Mutual Fund Taxation in India',
    tagline: 'Understand STCG, LTCG, the Rs 1.25 Lakh exemption, and debt fund rules.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'Equity Fund Taxation (Holding Period and Rates)',
        content: [
          'A mutual fund is classified as an **Equity Fund** if it invests at least 65% of its portfolio in domestic Indian company shares.',
          '**Short Term Capital Gains (STCG)**: Applies if you sell your equity fund units within 12 months of purchase. The profit is taxed at a flat rate of **20%**.',
          '**Long Term Capital Gains (LTCG)**: Applies if you hold your units for more than 12 months before selling. Profits up to **Rs 1,25,000 in a financial year are completely tax-free**. Any LTCG profit exceeding Rs 1.25 Lakh is taxed at **12.5%** without indexation benefits.',
        ],
        everydayAnalogy:
          'Think of the Rs 1.25 Lakh LTCG exemption as a free annual tax allowance pass. Every single financial year, you can harvest up to Rs 1.25 Lakh of long-term gains with zero tax to the government.',
      },
      {
        heading: 'Debt Fund Taxation Rules',
        content: [
          'Under current Indian income tax laws, mutual funds investing less than 35% in domestic equities (pure debt funds, liquid funds, conservative hybrid funds) do not enjoy the equity LTCG rate.',
          'All capital gains from specified debt mutual funds, irrespective of holding period, are added directly to your total taxable income and taxed at your applicable **income tax slab rate** (5%, 10%, 20%, or 30%).',
        ],
      },
      {
        heading: 'ELSS and Section 80C Tax Savings',
        content: [
          'Investments in **ELSS (Equity Linked Savings Scheme)** qualify for a tax deduction of up to Rs 1,50,000 per financial year under Section 80C of the Income Tax Act (applicable for investors choosing the Old Tax Regime).',
          'ELSS has a mandatory lock-in period of 3 years from the date of purchase. For SIPs in ELSS, every individual monthly installment must complete its own 3-year lock-in.',
        ],
      },
    ],
    numericExample: {
      scenario: 'Calculating Capital Gains Tax on Selling Equity Units After 2 Years',
      breakdown: [
        { label: 'Initial Investment in Equity Fund', value: 'Rs 5,00,000' },
        { label: 'Sale Value After 24 Months', value: 'Rs 7,20,000' },
        { label: 'Total Capital Profit Made', value: 'Rs 2,20,000 (Long Term Capital Gain)' },
        { label: 'Statutory Annual Exemption', value: 'First Rs 1,25,000 is 100% Tax-Free' },
        { label: 'Taxable Gain Amount', value: 'Rs 2,20,000 - Rs 1,25,000 = Rs 95,000' },
        { label: 'LTCG Tax Payable at 12.5%', value: 'Rs 95,000 multiplied by 12.5% = Rs 11,875 (plus cess)' },
      ],
      conclusion: 'On a handsome profit of Rs 2.2 Lakhs, you pay just Rs 11,875 in tax, retaining over 94% of your total gains.',
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'Under current Indian tax rules, what is the annual tax-free exemption limit on Equity LTCG?',
        options: [
          'Rs 50,000',
          'Rs 1,00,000',
          'Rs 1,25,000',
          'Rs 2,50,000',
        ],
        correctIndex: 2,
        explanation: 'The annual tax-free exemption for Long Term Capital Gains (LTCG) on listed equity and equity mutual funds is Rs 1,25,000 per financial year.',
      },
      {
        id: 'q6-2',
        question: 'What is the tax rate on Short Term Capital Gains (STCG) for equity mutual funds sold within 12 months?',
        options: [
          '10%',
          '15%',
          '20%',
          'At personal income slab rate',
        ],
        correctIndex: 2,
        explanation: 'Equity mutual fund units sold within 12 months of purchase are subject to 20% STCG tax.',
      },
      {
        id: 'q6-3',
        question: 'If you invest through an SIP in an ELSS fund, when can you redeem your units?',
        options: [
          'All units can be redeemed 3 years after the first SIP date',
          'Each individual monthly SIP installment must complete its own 3-year lock-in period',
          'Units can be withdrawn anytime with a 1% penalty',
          'Units are locked until retirement at age 60',
        ],
        correctIndex: 1,
        explanation: 'In ELSS, every single SIP installment is treated as an independent investment and has its own individual 36-month lock-in period.',
      },
    ],
  },
  {
    id: 7,
    title: 'Level 7: Deadly Investing Mistakes to Avoid',
    tagline: 'Avoid panic selling in crashes, portfolio clutter, and yield traps.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Mistake 1: Stopping or Canceling SIPs During Market Crashes',
        content: [
          'When news headlines scream about global crises, wars, or market sell-offs, beginner investors instinctively want to pause their SIPs to stop the pain.',
          'This is the single most destructive mistake in investing. A market crash is precisely when your SIP accumulates units at massive discounts. Stopping your SIP during a crash locks in fear and robs you of the aggressive rebound that follows.',
        ],
        everydayAnalogy:
          'If your favorite supermarket announces a 40% discount sale on groceries, you do not walk away in disgust. You buy more pantry essentials because everything is on sale.',
      },
      {
        heading: 'Mistake 2: Holding Too Many Mutual Funds (Portfolio Clutter)',
        content: [
          'Many beginners own 15 to 25 different mutual funds, thinking that buying more funds equals more diversification.',
          'This is an illusion called **over-diversification**. Most equity funds hold the same top 50 to 100 Indian companies (like HDFC Bank, ICICI Bank, TCS, Infosys, Reliance). Owning 15 funds simply turns your portfolio into an expensive index fund while multiplying paperwork.',
          'A healthy retail portfolio rarely needs more than 3 to 4 well-chosen funds: for example, one broad Nifty 50 Index fund, one Flexi Cap fund, and one Mid Cap or Debt fund.',
        ],
      },
      {
        heading: 'Mistake 3: Investing Without an Emergency Fund or Clear Goals',
        content: [
          'Investing in equity before having an emergency fund is a recipe for disaster. If an unexpected medical expense or job loss arrives, you may be forced to redeem your equity funds at a loss during a market trough.',
          'Always keep 6 months of living expenses safely in a combination of high-interest savings bank accounts, fixed deposits, or liquid funds before putting your first Rupee into equity mutual funds.',
        ],
      },
    ],
    numericExample: {
      scenario: 'The Cost of Panicking: Continued SIP vs Paused SIP in March 2020 Crash',
      breakdown: [
        { label: 'Monthly SIP Amount', value: 'Rs 10,000 per month in Nifty 50 Index Fund' },
        { label: 'Investor A (Continued SIP through crash)', value: 'Bought heavily at Nifty 8,000 to 10,000 levels. 3-year corpus reached Rs 6.1 Lakhs' },
        { label: 'Investor B (Stopped SIP in panic, restarted late)', value: 'Paused at Nifty 8,500 and restarted only after Nifty crossed 15,000. 3-year corpus reached Rs 4.4 Lakhs' },
        { label: 'The Discipline Advantage', value: 'Investor A gained Rs 1.7 Lakhs extra purely by doing nothing and letting the SIP run' },
      ],
      conclusion: 'Discipline and emotional composure are far more valuable than trying to outsmart the market.',
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'What is the primary danger of owning 20 different equity mutual funds?',
        options: [
          'SEBI will disqualify your KYC',
          'Heavy portfolio overlap and over-diversification without any extra return advantage',
          'AMCs will automatically convert your plans to debt funds',
          'Your NAV will be reduced by 50%',
        ],
        correctIndex: 1,
        explanation: 'Owning 20 funds creates severe portfolio overlap. You end up owning the same underlying stocks repeatedly while paying multiple expense ratios.',
      },
      {
        id: 'q7-2',
        question: 'What should an investor set up before allocating capital to volatile equity mutual funds?',
        options: [
          'A high-frequency algorithmic trading account',
          'An emergency fund covering 6 months of essential living expenses',
          'A corporate debenture portfolio',
          'A cryptocurrency trading wallet',
        ],
        correctIndex: 1,
        explanation: 'An emergency fund safeguards you from having to sell long-term equity investments during sudden life emergencies or market downturns.',
      },
      {
        id: 'q7-3',
        question: 'When a market correction occurs, what should a long-term SIP investor ideally do?',
        options: [
          'Immediately redeem all funds and hold cash',
          'Pause the SIP and wait until the market touches a fresh all-time high',
          'Continue the SIP uninterrupted to buy units at discounted valuations',
          'Borrow money to buy high-risk crypto tokens',
        ],
        correctIndex: 2,
        explanation: 'Continuing the SIP during a correction allows you to accumulate more units at cheaper prices, lowering your average cost per unit.',
      },
    ],
  },
];
