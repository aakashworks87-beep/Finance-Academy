import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sebi-true-to-label',
    title: 'Decoding SEBI\'s True-to-Label Mandate: Why Your Large Cap Fund Cannot Cheat Anymore',
    category: 'SEBI Regulation',
    date: 'October 2026',
    readTime: '5 min read',
    summary:
      'Before SEBI introduced scheme rationalization, mutual funds played fast and loose with branding. A scheme labeled "Safe Large Cap" would quietly sneak 40% of its capital into speculative micro-caps during raging bull markets. Here is how statutory classification restored integrity to Indian portfolios.',
    storyContent: [
      'In early 2017, a close friend proudly showed me his portfolio. He had chosen what was marketed as a premier "Large Cap Bluechip Fund" from a prominent bank-sponsored AMC. He believed he was taking minimal volatility while building a retirement cushion. But when the mid-cap index entered a sharp correction, his supposedly defensive fund collapsed by nearly 38%.',
      'When we opened the portfolio holdings statement, the reason became painfully clear. In an attempt to boast top-decile returns on quarterly marketing posters, the fund manager had allocated over 35% of the scheme into illiquid small-cap textile, infrastructure, and realty stocks. This deceptive practice was known across the industry as "style drift".',
      'Recognizing that millions of retail savers were unknowingly bearing venture-capital levels of volatility, SEBI stepped in with a definitive circular on Scheme Categorization and Rationalization. The market regulator divided listed companies into three strict, unambiguous buckets: the top 100 companies by market capitalization are Large Caps, companies ranked 101 to 250 are Mid Caps, and every company ranked 251 and below is Small Cap.',
      'Under these rules, any scheme calling itself a Large Cap Fund is legally mandated to maintain at least 80% of its total assets in the top 100 blue chips at all times. If a manager drifts away from this boundary, automated exchange monitoring flags the breach, and trustees must rectify the portfolio within 30 days.',
      'This reform was a watershed moment for Indian retail finance. It ensured that when you buy a large-cap fund, you genuinely receive large-cap companies like TCS, HDFC Bank, and Reliance, rather than speculative bets hidden behind an impressive brand logo.',
    ],
    takeaways: [
      'SEBI mandates that Large Cap funds hold at least 80% in the top 100 companies by market capitalization.',
      'Scheme re-categorization ended widespread "style drift" and protected retail investors from undisclosed volatility.',
      'Always examine the monthly factsheet to verify that your active fund remains obedient to its declared investment mandate.',
    ],
  },
  {
    id: 'rbi-repo-pause',
    title: 'When the RBI Pauses the Repo Rate: What It Actually Means for Your EMI and Debt Funds',
    category: 'RBI Policy',
    date: 'September 2026',
    readTime: '6 min read',
    summary:
      'Every two months, headline news breaks down whether the Monetary Policy Committee will hike, cut, or pause the benchmark repo rate. For an Indian household managing a 20-year home loan, here is what policy pauses actually do to your cash flow.',
    storyContent: [
      'Every two months, business television anchors obsess over the Monetary Policy Committee statement. For everyday families paying home loan EMIs in Bengaluru, Mumbai, or Pune, these interest rate announcements directly govern personal finances and disposable monthly income.',
      'Since October 2019, RBI rules have mandated that all floating retail loans must be tied directly to an external benchmark, which for nearly all commercial banks is the RBI Repo Rate. When the central bank increased the repo rate from 4.0% to 6.50% to cool post-pandemic inflation, banks quickly reset their lending rates upwards.',
      'Most borrowers noticed something strange: their monthly EMI deductions did not automatically jump. Instead, banks quietly extended their loan tenures. A loan originally taken for 20 years suddenly became a 28-year marathon. That quiet extension meant an additional Rs 15 to 20 Lakhs in lifetime compound interest paid to the lender.',
      'When the Monetary Policy Committee announces a pause, it indicates that headline consumer inflation has returned within the RBI target band of 4% plus or minus 2%. For borrowers, a pause provides immediate breathing room: loan tenures stop stretching, and repayment schedules stabilize.',
      'For debt mutual funds, a pause marks an attractive window. Bond yields reach their cyclical peak, credit spreads normalize, and investors in target maturity funds and dynamic bond funds can lock in strong recurring yields before eventual rate reduction cycles trigger capital appreciation.',
    ],
    takeaways: [
      'Floating home loans in India are tied to the external repo rate, meaning hikes silently extend your repayment tenure.',
      'An RBI pause provides household stability and signals that monetary tightening has reached its ceiling.',
      'Debt mutual fund investors can lock in attractive yields during pauses, benefiting as future rate cuts lift bond prices.',
    ],
  },
  {
    id: 'mf-hidden-commission-math',
    title: 'The Compounding Mirage: How a 1% Expense Ratio Difference Quietly Eats 25% of Your Wealth',
    category: 'Mutual Fund Math',
    date: 'August 2026',
    readTime: '5 min read',
    summary:
      'Most savers gladly pay a 1% distributor commission on their mutual fund investments because it feels negligible. Here is the unvarnished mathematical reality of how that seemingly small fee compounds into tens of lakhs of lost retirement wealth.',
    storyContent: [
      'Human psychology is terrible at understanding exponential mathematics. When a friendly bank manager or distributor says, "The commission is just one percent annually, you will never even feel it," most investors nod and sign the form for a Regular Plan.',
      'What they do not realize is that the Total Expense Ratio (TER) is not charged as an annual fee on your profits. It is deducted from your total fund assets every single calendar day, 365 days a year, whether the stock market rises or crashes.',
      'Consider two identical twin siblings, Rahul and Priya. Both start an SIP of Rs 10,000 every month for 25 years into the exact same underlying portfolio of Indian equities, which grows at an average gross return of 13% annually.',
      'Rahul invests through a Regular Plan with a total expense ratio of 1.75%, leaving him with a net return of 11.25%. Priya invests through a Direct Plan with a total expense ratio of 0.75%, leaving her with a net return of 12.25%. A seemingly minor gap of exactly 1.00% per year.',
      'After 25 years, both have invested exactly Rs 30 Lakhs of their own salary. Rahul\'s Regular Plan corpus grows to approximately Rs 1.70 Crores. Priya\'s Direct Plan corpus grows to Rs 2.05 Crores. That 1% annual commission cost Rahul Rs 35 Lakhs in cold hard cash. He paid away more money in distributor fees than his entire lifetime personal contributions.',
      'Switching to Direct Plans through official portals like MF Central, AMC websites, or registered execution-only platforms is the single easiest financial decision that instantly recovers this lost wealth for your family.',
    ],
    takeaways: [
      'Direct plans share the exact same stocks as Regular plans, but exclude intermediary trailing commissions.',
      'Expense ratios are calculated daily on your total asset value, compounding heavily against you over decades.',
      'A 1% annual difference typically wipes out 20% to 25% of your total ending wealth over long horizons.',
    ],
  },
];
