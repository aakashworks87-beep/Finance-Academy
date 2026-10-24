import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  Award,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  Shield,
  Sparkles,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { CourseProgress, saveCourseProgress } from '../utils/courseProgress';

interface CertificateSectionProps {
  progress: CourseProgress;
  onUpdateProgress: (newProgress: CourseProgress) => void;
  onOpenExam: () => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  progress,
  onUpdateProgress,
  onOpenExam,
}) => {
  const [nameInput, setNameInput] = useState(progress.recipientName || '');
  const [isGenerating, setIsGenerating] = useState(false);

  const isUnlocked = progress.finalExamPassed;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim();
    if (!cleanName) return;

    const updated: CourseProgress = {
      ...progress,
      certificateClaimed: true,
      recipientName: cleanName,
    };
    onUpdateProgress(updated);
    saveCourseProgress(updated);
  };

  const handleDownloadPdf = () => {
    setIsGenerating(true);
    try {
      // Landscape A4: 297mm x 210mm
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const recipientName = progress.recipientName || 'Valued Learner';
      const certId = progress.certificateId;
      const certDate = progress.certificateDate;
      const quote = progress.certificateQuote;

      // 1. Deep Navy Background (#080d1a -> RGB: 8, 13, 26)
      doc.setFillColor(8, 13, 26);
      doc.rect(0, 0, 297, 210, 'F');

      // 2. Subtle Dark Layer
      doc.setFillColor(11, 18, 36);
      doc.rect(8, 8, 281, 194, 'F');

      // 3. Gold Borders (#d4af37 -> RGB: 212, 175, 55)
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(1.5);
      doc.rect(12, 12, 273, 186);

      doc.setLineWidth(0.4);
      doc.rect(15, 15, 267, 180);

      // Corner Accents
      const drawCorner = (x: number, y: number, xDir: number, yDir: number) => {
        doc.setLineWidth(1);
        doc.line(x, y, x + 8 * xDir, y);
        doc.line(x, y, x, y + 8 * yDir);
      };
      drawCorner(18, 18, 1, 1);
      drawCorner(279, 18, -1, 1);
      drawCorner(18, 192, 1, -1);
      drawCorner(279, 192, -1, -1);

      // 4. Header: Academy Signature
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(212, 175, 55);
      doc.text('FINANCE ACADEMY BY AAKASH', 148.5, 30, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('AN INVESTOR EDUCATION & REGULATORY MASTERY INITIATIVE', 148.5, 36, { align: 'center' });

      // 5. Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.text('Certificate of Completion', 148.5, 52, { align: 'center' });

      // Decorative divider
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.6);
      doc.line(108, 57, 189, 57);

      // 6. Presentation text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(203, 213, 225);
      doc.text('This certificate is proudly presented to', 148.5, 68, { align: 'center' });

      // 7. Student Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(250, 229, 150);
      doc.text(recipientName, 148.5, 82, { align: 'center' });

      // Name underline accent
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      const nameWidth = doc.getTextWidth(recipientName);
      doc.line(148.5 - nameWidth / 2 - 4, 85, 148.5 + nameWidth / 2 + 4, 85);

      // 8. Course achievement text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(226, 232, 240);
      const courseDesc =
        'for successfully completing the Mutual Funds course: Basics to Confident at Finance Academy by Aakash';
      doc.text(courseDesc, 148.5, 96, { align: 'center' });

      const detailsDesc =
        'Demonstrating verified mastery across NAV mechanics, Expense Ratios, Direct vs Regular plans, Debt yields, Factsheet analysis, and SEBI investor safeguards.';
      doc.setFontSize(8.5);
      doc.setTextColor(148, 163, 184);
      doc.text(detailsDesc, 148.5, 103, { align: 'center' });

      // 9. Emotional Quote Box
      doc.setFillColor(15, 23, 42);
      doc.setDrawColor(51, 65, 85);
      doc.setLineWidth(0.3);
      doc.roundedRect(38, 114, 221, 22, 2, 2, 'FD');

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.5);
      doc.setTextColor(250, 229, 150);
      const wrappedQuote = doc.splitTextToSize(`"${quote}"`, 210);
      doc.text(wrappedQuote, 148.5, 124, { align: 'center' });

      // 10. Verified Seals and Signatures
      // Left: Date
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(212, 175, 55);
      doc.text('DATE OF ISSUANCE', 48, 158);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(certDate, 48, 165);

      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.3);
      doc.line(48, 168, 95, 168);

      // Center: Instructor Signature
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text('Aakash Hegde', 148.5, 163, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(212, 175, 55);
      doc.text('FOUNDER & INSTRUCTOR', 148.5, 168, { align: 'center' });

      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Finance Academy by Aakash', 148.5, 173, { align: 'center' });

      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.3);
      doc.line(125, 156, 172, 156);

      // Right: Certificate ID
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(212, 175, 55);
      doc.text('CERTIFICATE ID', 249, 158, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(certId, 249, 165, { align: 'right' });

      doc.setDrawColor(71, 85, 105);
      doc.setLineWidth(0.3);
      doc.line(202, 168, 249, 168);

      // Bottom statutory notice
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(
        'Verified credential issued upon passing all 7 modules and the Final Examination. Educational recognition only.',
        148.5,
        188,
        { align: 'center' }
      );

      // Download trigger
      const cleanFileName = `Finance_Academy_Certificate_${recipientName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      doc.save(cleanFileName);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isUnlocked) {
    return (
      <section id="certificate" className="py-16 md:py-24 border-t border-slate-800/80 bg-[#060a14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked Credential</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Official Certificate of Completion
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Every certificate from Finance Academy is strictly earned. Pass all 7 module quizzes with at least 2 out of 3 correct, then pass the comprehensive Final Exam to unlock your verified credential.
          </p>

          {/* Locked Preview Card */}
          <div className="relative max-w-2xl mx-auto rounded-3xl border-2 border-dashed border-slate-800 bg-slate-950/60 p-8 sm:p-12 text-center overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-300 mb-2">
              Certificate of Completion
            </h3>

            <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto">
              Your personalized certificate featuring a unique verification ID, custom student name, and date of completion will unlock here.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Current Status: {progress.passedLevels.length} of 7 Levels Passed</span>
            </div>

            {progress.passedLevels.length === 7 ? (
              <div className="mt-8">
                <button
                  onClick={onOpenExam}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-sm shadow-xl shadow-[#d4af37]/25 hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-105 transition-all"
                >
                  All 7 Levels Passed: Take Final Exam Now
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certificate" className="py-16 md:py-24 border-t border-slate-800/80 bg-[#060a14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/70 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Achievement Unlocked</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Claim Your Certificate of Completion
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            You conquered all 7 modules and passed the comprehensive Final Exam. Enter your name below to personalize and download your official credential.
          </p>
        </div>

        {/* Name input Form */}
        <div className="max-w-xl mx-auto mb-12">
          <form
            onSubmit={handleClaim}
            className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-slate-900/90 border border-[#d4af37]/40 shadow-xl"
          >
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your full name for the certificate"
              className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm shrink-0 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all"
            >
              Update Name
            </button>
          </form>
        </div>

        {/* Live Visual Certificate Preview */}
        <div className="relative rounded-3xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#0a1022] via-[#070b17] to-[#040711] p-6 sm:p-10 md:p-12 shadow-2xl shadow-[#d4af37]/15 overflow-hidden print:border-none print:shadow-none mb-10">
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/80 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/80 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/80 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/80 pointer-events-none" />

          {/* Certificate Inner Content */}
          <div className="text-center relative z-10 space-y-6">
            <div>
              <div className="text-[#d4af37] text-xs font-extrabold tracking-widest uppercase mb-1">
                Finance Academy by Aakash
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider uppercase">
                Investor Education & Regulatory Mastery Initiative
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Certificate of Completion
              </h3>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
            </div>

            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-slate-300">
                This certificate is proudly presented to
              </p>
              <div className="text-2xl sm:text-4xl font-extrabold text-[#fae596] tracking-tight py-2 font-serif">
                {progress.recipientName || nameInput || 'Your Full Name'}
              </div>
              <div className="w-48 h-px bg-slate-700/80 mx-auto" />
            </div>

            <div className="max-w-2xl mx-auto space-y-2">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                for successfully completing the Mutual Funds course: Basics to Confident at Finance Academy by Aakash
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Demonstrating verified mastery across NAV mechanics, Expense Ratios, Direct vs Regular plans, Debt yields, Factsheet analysis, and SEBI investor safeguards.
              </p>
            </div>

            {/* Emotional Quote */}
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 text-amber-200 text-xs sm:text-sm font-medium italic shadow-inner">
              &ldquo;{progress.certificateQuote}&rdquo;
            </div>

            {/* Certificate Meta Details */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-left">
              <div>
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">
                  Date of Issuance
                </span>
                <span className="text-xs sm:text-sm text-white font-medium">
                  {progress.certificateDate}
                </span>
              </div>

              <div className="sm:text-center">
                <div className="text-sm font-bold text-white font-serif">
                  Aakash Hegde
                </div>
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">
                  Founder & Instructor
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Finance Academy by Aakash
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block">
                  Certificate ID
                </span>
                <span className="text-xs sm:text-sm text-white font-mono font-semibold">
                  {progress.certificateId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Share2 className="w-4 h-4 text-[#d4af37]" />
              <span>Share Your Milestone on LinkedIn</span>
            </h4>
            <p className="text-xs text-slate-400">
              Download your verified PDF and upload it to LinkedIn to showcase your disciplined financial education!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#d4af37]/50 flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-[#d4af37]" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-amber-300 to-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Certificate (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
