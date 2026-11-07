import React from 'react';

interface TutorAvatarProps {
  isSpeaking?: boolean;
  className?: string;
}

export const TutorAvatar: React.FC<TutorAvatarProps> = ({ isSpeaking = false, className = '' }) => {
  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
      aria-label="Aakash AI Finance Tutor"
    >
      <style>{`
        @keyframes tutorBlink {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.08);
          }
        }
        @keyframes tutorBreathing {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2.5px);
          }
        }
        @keyframes tutorTalking {
          0%, 100% {
            transform: scaleY(1);
          }
          20% {
            transform: scaleY(2.2) translateY(0.5px);
          }
          40% {
            transform: scaleY(1.2);
          }
          65% {
            transform: scaleY(2.8) translateY(1px);
          }
          85% {
            transform: scaleY(1.6);
          }
        }
        .tutor-bob {
          animation: tutorBreathing 4.5s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .tutor-eye {
          animation: tutorBlink 4.2s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .tutor-mouth-speaking {
          animation: tutorTalking 0.32s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      {/* Frame Container with gentle silver border and calm glow */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-b from-[#14151b] to-[#0a0b0e] border border-white/10 shadow-lg shadow-black/60 flex items-center justify-center overflow-hidden p-1">
        <svg
          viewBox="0 0 200 220"
          className="w-full h-full tutor-bob"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Skin gradient */}
            <linearGradient id="tutorSkin" x1="100" y1="50" x2="100" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d99b70" />
              <stop offset="100%" stopColor="#be8055" />
            </linearGradient>

            {/* Neck shadow */}
            <linearGradient id="tutorNeck" x1="100" y1="120" x2="100" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a86e45" />
              <stop offset="100%" stopColor="#be8055" />
            </linearGradient>

            {/* Charcoal suit gradient */}
            <linearGradient id="tutorCharcoalSuit" x1="100" y1="140" x2="100" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#25272e" />
              <stop offset="100%" stopColor="#17181c" />
            </linearGradient>

            {/* Gold tie gradient */}
            <linearGradient id="tutorGoldTie" x1="100" y1="150" x2="100" y2="215" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5cf58" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#b38f26" />
            </linearGradient>

            {/* Hair gradient */}
            <linearGradient id="tutorHair" x1="100" y1="20" x2="100" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#221e20" />
              <stop offset="100%" stopColor="#100e11" />
            </linearGradient>
          </defs>

          {/* Shoulders & Charcoal Suit Body */}
          <path
            d="M20 220 C25 180, 50 155, 75 150 L125 150 C150 155, 175 180, 180 220 Z"
            fill="url(#tutorCharcoalSuit)"
          />

          {/* White Dress Shirt V-Neck & Collar */}
          <polygon points="82,148 118,148 100,192" fill="#f8fafc" />
          {/* Shirt collar flaps */}
          <polygon points="76,146 95,168 86,148" fill="#e2e8f0" />
          <polygon points="124,146 105,168 114,148" fill="#e2e8f0" />

          {/* Gold Tie Knot & Blade */}
          <polygon points="95,162 105,162 107,174 93,174" fill="#f5cf58" />
          <polygon points="93,174 107,174 110,215 100,222 90,215" fill="url(#tutorGoldTie)" />
          {/* Subtle tie crease */}
          <line x1="100" y1="174" x2="100" y2="218" stroke="#99771b" strokeWidth="1" opacity="0.6" />

          {/* Charcoal Suit Jacket Lapels */}
          {/* Left Lapel */}
          <polygon
            points="62,152 82,148 95,190 74,185"
            fill="#2d3039"
          />
          <path
            d="M62 152 L95 190 L92 220 L58 220"
            stroke="#16171b"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Right Lapel */}
          <polygon
            points="138,152 118,148 105,190 126,185"
            fill="#2d3039"
          />
          <path
            d="M138 152 L105 190 L108 220 L142 220"
            stroke="#16171b"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Neck with smooth skin */}
          <rect x="88" y="118" width="24" height="34" rx="10" fill="url(#tutorNeck)" />

          {/* Ears */}
          <path d="M57 90 C54 90 52 97 52 104 C52 111 55 116 59 116 Z" fill="#c88b60" />
          <path d="M143 90 C146 90 148 97 148 104 C148 111 145 116 141 116 Z" fill="#c88b60" />

          {/* Face - Clean, smooth defined young Indian jawline, no wrinkles */}
          <path
            d="M60 82 C60 52, 140 52, 140 82 C140 114, 128 136, 100 137 C72 136, 60 114, 60 82 Z"
            fill="url(#tutorSkin)"
          />

          {/* Neat Short Hair with Sharp Side Part on Left */}
          {/* Back/Sides */}
          <path
            d="M58 84 C56 70, 62 50, 75 40 C90 32, 115 32, 130 38 C144 45, 145 65, 143 84 C138 68, 134 50, 115 46 C95 42, 70 48, 58 84 Z"
            fill="url(#tutorHair)"
          />
          {/* Hair Top & Sharp Part Line */}
          <path
            d="M60 74 C62 52, 76 34, 104 33 C132 33, 144 48, 142 70 C138 52, 126 44, 106 44 C90 44, 78 52, 76 60 Z"
            fill="#121013"
          />
          {/* Distinct sharp side part notch at left temple */}
          <path
            d="M72 54 L80 44 L92 45 L82 56 Z"
            fill="#2c272a"
          />

          {/* Eyebrows - neat, confident, natural */}
          <path d="M72 75 C77 72, 85 72, 91 75" stroke="#1d191b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M109 75 C115 72, 123 72, 128 75" stroke="#1d191b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Eyes - Blinking, warm dark brown iris, confident expression */}
          <g className="tutor-eye">
            {/* Left Eye */}
            <ellipse cx="81" cy="85" rx="5" ry="3.8" fill="#ffffff" />
            <circle cx="81.5" cy="85" r="2.8" fill="#2b1c14" />
            <circle cx="82.2" cy="84.2" r="1" fill="#ffffff" />

            {/* Right Eye */}
            <ellipse cx="119" cy="85" rx="5" ry="3.8" fill="#ffffff" />
            <circle cx="118.5" cy="85" r="2.8" fill="#2b1c14" />
            <circle cx="119.2" cy="84.2" r="1" fill="#ffffff" />
          </g>

          {/* Sharp, clean Nose */}
          <path
            d="M99 82 L98 99 L104 100"
            stroke="#a66e46"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Mouth - Calm subtle confident smile when idle, speaking animation when isSpeaking is true */}
          {isSpeaking ? (
            <g className="tutor-mouth-speaking">
              {/* Talking mouth: gentle open shape */}
              <ellipse cx="100" cy="116" rx="6" ry="3" fill="#692224" />
              <path d="M96 115 Q100 114 104 115" stroke="#f1f5f9" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              {/* Calm confident closed smile */}
              <path
                d="M93 115 C96 118, 104 118, 107 115"
                stroke="#6b2a26"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>

        {/* Live Speaking Indicator Pill on Avatar */}
        {isSpeaking && (
          <div className="absolute bottom-1 px-2 py-0.5 rounded-full bg-[#d4af37] text-slate-950 font-bold text-[9px] tracking-wider uppercase shadow-md flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            <span>Speaking</span>
          </div>
        )}
      </div>

      {/* Name and Designation Tag below avatar */}
      <div className="mt-1.5 text-center">
        <p className="text-xs font-serif font-bold text-slate-200 tracking-wide">
          Aakash AI
        </p>
        <p className="text-[10px] text-amber-300/80 font-sans tracking-tight">
          Finance Tutor
        </p>
      </div>
    </div>
  );
};
