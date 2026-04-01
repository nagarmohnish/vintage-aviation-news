import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Twitter, Linkedin, Heart, Mail, Share2, MessageCircle, ArrowLeft, Shield, Gift } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import vanLogo from "@/assets/van-logo.png";

type Frequency = "monthly" | "quarterly" | "half-yearly" | "yearly" | "one-time";

const FREQUENCY_LABELS: Record<Frequency, string> = {
  monthly: "every month",
  quarterly: "every quarter",
  "half-yearly": "every 6 months",
  yearly: "every year",
  "one-time": "",
};

const MONTHLY_DIVISORS: Record<Frequency, number> = {
  monthly: 1,
  quarterly: 3,
  "half-yearly": 6,
  yearly: 12,
  "one-time": 0,
};

function isAdFreeEligible(amount: number, frequency: Frequency): boolean {
  if (frequency === "one-time") return amount >= 200;
  const monthly = amount / MONTHLY_DIVISORS[frequency];
  return monthly >= 5;
}

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const amount = parseInt(searchParams.get("amount") || "25", 10);
  const frequency = (searchParams.get("frequency") || "quarterly") as Frequency;
  const name = searchParams.get("name") || "Supporter";

  const [showContent, setShowContent] = useState(false);
  const [hideAmount, setHideAmount] = useState(false);

  const isRecurring = frequency !== "one-time";
  const adFreeEligible = isAdFreeEligible(amount, frequency);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const shareText =
    "I support aviation history at Vintage Aviation News. Join me in keeping warbirds flying.";
  const shareUrl = "https://www.vintageaviationnews.com/support";

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(t);
  }, []);

  const summaryText = isRecurring
    ? `$${amount} ${FREQUENCY_LABELS[frequency]}`
    : `$${amount} one-time`;

  return (
    <div className="min-h-screen bg-background flex justify-center px-5 py-10 sm:py-16 relative">
      {/* VAN Logo - top right */}
      <a href="/" className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <img src={vanLogo} alt="Vintage Aviation News" className="h-10 w-auto opacity-60 hover:opacity-90 transition-opacity" />
      </a>
      <div
        className={`w-full max-w-sm space-y-6 transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
          aria-label="Back to support page"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* 1. Hero — transaction confirmed + identity */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto font-body">
            Your {summaryText} support is confirmed. You're now helping keep aviation history alive for future generations.
          </p>
          {/* Identity badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wide font-body">Official Supporter of Aviation History</span>
          </div>
        </div>

        {/* 2. Certificate */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-shadow hover:shadow-md relative">
          {/* Heart icon top-left */}
          <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
            <Heart className="h-4 w-4 text-accent" fill="hsl(var(--accent))" />
          </div>
          {/* Decorative top edge */}
          <div className="h-1 bg-accent/80" />

          {/* Share icon top-right */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "VAN Supporter", text: shareText, url: shareUrl });
              }
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Share certificate"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <div className="px-8 py-10 sm:px-10 sm:py-12 text-center space-y-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground font-body">
              Certificate of Support
            </p>

            <div className="space-y-4">
              <div className="mx-auto h-px w-16 bg-border" />

              <div className="space-y-1.5">
                <p className="text-[11px] text-muted-foreground tracking-wide font-body">
                  This certifies that
                </p>
                <p className="text-2xl font-bold text-foreground tracking-tight font-heading">
                  {name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground tracking-wide font-body">
                  is a proud supporter of
                </p>
                <img src={vanLogo} alt="Vintage Aviation News" className="h-20 w-auto mx-auto" />
              </div>

              <div className="mx-auto h-px w-16 bg-border" />

              <p className="text-xs text-muted-foreground italic leading-relaxed font-body">
                For keeping aviation history alive
              </p>

              {!hideAmount && (
                <p className="text-sm font-medium text-foreground font-body">
                  ${amount}{isRecurring ? ` ${FREQUENCY_LABELS[frequency]}` : " one-time"}
                </p>
              )}

              <p className="text-[10px] text-muted-foreground font-body">{today}</p>
            </div>
          </div>
        </div>

        {/* Ad-free benefit confirmation */}
        {adFreeEligible && (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3 -mt-2">
            <Gift className="h-3.5 w-3.5 text-accent shrink-0" />
            <p className="text-xs text-accent font-medium font-body">
              {isRecurring
                ? "Your reading experience will be ad-free while your support is active."
                : "Your reading experience is now ad-free as a thank you for your support."}
            </p>
          </div>
        )}

        {/* Opt-out checkbox */}
        <div className="flex items-center justify-center gap-2 -mt-2">
          <Checkbox
            id="hide-amount"
            checked={hideAmount}
            onCheckedChange={(checked) => setHideAmount(checked === true)}
          />
          <label htmlFor="hide-amount" className="text-xs text-muted-foreground cursor-pointer select-none font-body">
            Hide amount from certificate
          </label>
        </div>

        {/* 3. Share */}
        <div className="space-y-3">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest font-body">
            Show others you support aviation history
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                  "_blank"
                )
              }
              className="flex items-center justify-center gap-1.5 rounded-xl border border-input bg-card px-3 py-3 text-xs font-medium text-foreground transition-colors hover:border-muted-foreground/30 hover:bg-muted/50 font-body"
            >
              <Twitter className="h-3.5 w-3.5" />
              <span>X</span>
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                  "_blank"
                )
              }
              className="flex items-center justify-center gap-1.5 rounded-xl border border-input bg-card px-3 py-3 text-xs font-medium text-foreground transition-colors hover:border-muted-foreground/30 hover:bg-muted/50 font-body"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
                  "_blank"
                )
              }
              className="flex items-center justify-center gap-1.5 rounded-xl border border-input bg-card px-3 py-3 text-xs font-medium text-foreground transition-colors hover:border-muted-foreground/30 hover:bg-muted/50 font-body"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* 4. Low-emphasis details */}
        {isRecurring && (
          <div className="pt-1">
            <p className="text-center">
              <button className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors font-body">
                Manage your support
              </button>
            </p>
          </div>
        )}

        {/* 5. Email confirmation */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground pb-4">
          <Mail className="h-3 w-3" />
          <p className="text-[11px] font-body">Certificate and invoice sent to your email</p>
        </div>
      </div>
    </div>
  );
}
