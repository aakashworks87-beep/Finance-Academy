import React from 'react';

interface FormattedMessageProps {
  content: string;
}

/**
 * Parses inline formatting like **bold**, *italic*, and `code`
 */
function renderInlineText(text: string): React.ReactNode[] {
  // Sanitize any em-dashes
  const sanitized = text.replace(/\u2014/g, ', ');

  // Regex to match **bold**, *italic*, `code`, and [link](url)
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = sanitized.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={index} className="px-1 py-0.5 rounded bg-slate-800 text-amber-200 font-mono text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[#d4af37] underline hover:text-amber-300 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ content }) => {
  if (!content) return null;

  // Clean any accidental em-dashes
  const cleanContent = content.replace(/\u2014/g, ', ');
  const lines = cleanContent.split('\n');

  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0 mt-1.5" />
              <span className="leading-relaxed">{renderInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#d4af37] font-bold text-xs shrink-0 mt-0.5 min-w-[16px]">
                {idx + 1}.
              </span>
              <span className="leading-relaxed">{renderInlineText(item)}</span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    // Horizontal Rule
    if (line === '---' || line === '***' || line === '___') {
      flushList();
      elements.push(<hr key={`hr-${i}`} className="my-3 border-slate-800" />);
      continue;
    }

    // Headings
    if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h5 key={`h4-${i}`} className="text-xs font-bold text-slate-200 mt-2.5 mb-1 uppercase tracking-wide">
          {renderInlineText(line.slice(5))}
        </h5>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={`h3-${i}`} className="text-xs sm:text-sm font-bold text-[#fae596] mt-3 mb-1.5 uppercase tracking-wide">
          {renderInlineText(line.slice(4))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={`h2-${i}`} className="text-sm sm:text-base font-bold text-white mt-3 mb-1.5">
          {renderInlineText(line.slice(3))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h2 key={`h1-${i}`} className="text-base sm:text-lg font-bold text-amber-200 mt-3.5 mb-2">
          {renderInlineText(line.slice(2))}
        </h2>
      );
      continue;
    }

    // Unordered List Items: "* " or "- "
    const ulMatch = line.match(/^[*•-]\s+(.*)$/);
    if (ulMatch) {
      if (currentList && currentList.type !== 'ul') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered List Items: "1. ", "2. "
    const olMatch = line.match(/^\d+[\.)]\s+(.*)$/);
    if (olMatch) {
      if (currentList && currentList.type !== 'ol') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed mb-2 last:mb-0">
        {renderInlineText(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1 text-slate-200 text-xs sm:text-sm">{elements}</div>;
};
