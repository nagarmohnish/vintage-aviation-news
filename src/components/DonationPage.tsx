import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Gift, ChevronDown } from "lucide-react";

type Frequency = "monthly" | "quarterly" | "half-yearly" | "yearly" | "one-time";

const FREQUENCIES: { key: Frequency; label: string }[] = [
  { key: "yearly", label: "Annually" },
  { key: "half-yearly", label: "Half Yearly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "monthly", label: "Monthly" },
  { key: "one-time", label: "One Time" },
];

const MONTHLY_MULTIPLIERS: Record<Frequency, number> = {
  monthly: 1, quarterly: 3, "half-yearly": 6, yearly: 12, "one-time": 1,
};

const PRESETS = [
  { value: 2, label: "$2", emphasis: "low" as const },
  { value: 5, label: "$5", emphasis: "high" as const, popular: true },
  { value: 9, label: "$9", emphasis: "medium" as const },
  { value: 15, label: "$15", emphasis: "medium" as const },
];

const TAGLINES: Record<number, string> = {
  2: "Ad-free reading",
  5: "Keep the warbirds flying ⭐",
  9: "Help the stories grow",
  15: "Keep it alive for everyone",
};

function getDailyAmount(monthlyAmount: number): string {
  return `$${(monthlyAmount / 30).toFixed(2)}/day`;
}

export default function DonationPage() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState<Frequency>("yearly");
  const [monthlyAmount, setMonthlyAmount] = useState(5);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5);
  const [inputValue, setInputValue] = useState("5");

  const isValid = monthlyAmount >= 1.5;
  const totalBilled = monthlyAmount * MONTHLY_MULTIPLIERS[frequency];
  const tagline = selectedPreset ? TAGLINES[selectedPreset] : null;

  const handlePresetClick = (preset: typeof PRESETS[number]) => {
    setSelectedPreset(preset.value);
    setMonthlyAmount(preset.value);
    setInputValue(String(preset.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) {
      setMonthlyAmount(num);
      const match = PRESETS.find((p) => p.value === num);
      setSelectedPreset(match ? match.value : null);
    } else {
      setMonthlyAmount(0);
      setSelectedPreset(null);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-foreground text-2xl md:text-3xl font-bold tracking-tight font-heading">
          Support Aviation History
        </p>
        <p className="text-base md:text-lg text-muted-foreground font-body">
          Support starts with ad-free. Many choose to give a little more.
        </p>
      </div>

      {/* Main Price Display — editable */}
      <div className={`relative rounded-xl border-2 bg-card px-5 py-5 flex items-baseline gap-1.5 transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 ${
        !isValid && inputValue.length > 0 ? "border-destructive" : "border-input"
      }`}>
        <span className="text-2xl font-semibold text-foreground font-heading">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: `${Math.max(1, inputValue.length)}ch` }}
          className="text-3xl md:text-4xl font-semibold bg-transparent text-foreground outline-none min-w-[1ch] max-w-[8ch] font-heading"
        />
        <span className="text-base text-muted-foreground font-body">{frequency === "one-time" ? "" : "/ month"}</span>
        {isValid && (
          <span className="text-base text-muted-foreground ml-auto self-center font-body">
            {getDailyAmount(monthlyAmount)}
          </span>
        )}
      </div>

      {/* Tagline or validation */}
      {(!isValid && inputValue.length > 0) || tagline ? (
        <div className="flex items-center justify-center">
          {!isValid && inputValue.length > 0 ? (
            <p className="text-base text-destructive font-body">Minimum amount is $1.50 / month</p>
          ) : (
            <p className="text-base font-medium text-muted-foreground animate-in fade-in-0 duration-200 font-body">
              {tagline}
            </p>
          )}
        </div>
      ) : null}

      {/* Preset Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => handlePresetClick(p)}
            className={`relative py-3 rounded-xl text-base font-semibold border-2 transition-all duration-150 font-body ${
              selectedPreset === p.value
                ? "bg-accent/10 border-accent text-accent"
                : p.emphasis === "low"
                  ? "bg-card border-border text-muted-foreground hover:border-muted-foreground"
                  : p.emphasis === "high"
                    ? "bg-card border-border text-foreground hover:border-accent/40 ring-1 ring-accent/10"
                    : "bg-card border-border text-foreground hover:border-muted-foreground"
            }`}
          >
            {p.label}
            {p.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[11px] font-bold text-accent-foreground bg-accent px-2 py-0.5 rounded-full leading-none font-body">
                Popular
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        disabled={!isValid}
        onClick={() => navigate(`/payment?amount=${totalBilled}&frequency=${frequency}`)}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-200 font-body ${
          isValid
            ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {frequency === "one-time" ? `Continue with $${monthlyAmount}` : `Continue with $${monthlyAmount} / month`}
      </button>

      {/* Ad-free + Billing */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 shrink-0 text-accent/70" />
          <p className="text-sm text-accent/70 font-medium font-body">
            Includes <span className="font-bold">ad-free</span> experience
          </p>
        </div>
        <div className="relative">
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className="appearance-none rounded-full border border-border bg-card pl-4 pr-8 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors focus:border-accent cursor-pointer font-body"
          >
            {FREQUENCIES.map((f) => {
              const total = monthlyAmount * MONTHLY_MULTIPLIERS[f.key];
              return (
                <option key={f.key} value={f.key}>
                  {f.key === "one-time"
                    ? `$${total.toFixed(total % 1 === 0 ? 0 : 2)} Billed One Time`
                    : `$${total.toFixed(total % 1 === 0 ? 0 : 2)} Billed ${f.label}`}
                </option>
              );
            })}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Trust strip */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-2 text-sm text-muted-foreground font-body">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 shrink-0" />
          <span>Secure payment</span>
        </div>
        <span className="text-border">·</span>
        <span>Cancel anytime</span>
      </div>
    </div>
  );
}
