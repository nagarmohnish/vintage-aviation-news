import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Shield, CreditCard, Building2 } from "lucide-react";
import vanLogo from "@/assets/van-logo.png";

type Frequency = "monthly" | "quarterly" | "half-yearly" | "yearly" | "one-time";
type PaymentMethod = "bank" | "apple" | "google" | "paypal" | "venmo" | "card" | null;

const FREQUENCY_LABELS: Record<Frequency, string> = {
  monthly: "/ month",
  quarterly: "/ quarter",
  "half-yearly": "/ 6 months",
  yearly: "/ year",
  "one-time": "",
};

const EU_COUNTRIES = ["DE", "FR", "NL", "AT", "BE", "ES", "IT", "PT", "IE", "FI", "LU"];

const COUNTRIES = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "NL", label: "Netherlands", flag: "🇳🇱" },
  { code: "CA", label: "Canada", flag: "🇨🇦" },
  { code: "AU", label: "Australia", flag: "🇦🇺" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "JP", label: "Japan", flag: "🇯🇵" },
  { code: "BR", label: "Brazil", flag: "🇧🇷" },
  { code: "MX", label: "Mexico", flag: "🇲🇽" },
  { code: "KR", label: "South Korea", flag: "🇰🇷" },
  { code: "SG", label: "Singapore", flag: "🇸🇬" },
  { code: "AE", label: "UAE", flag: "🇦🇪" },
  { code: "ZA", label: "South Africa", flag: "🇿🇦" },
  { code: "OTHER", label: "Other", flag: "🌍" },
];

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-colors font-body";

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const amount = parseInt(searchParams.get("amount") || "25", 10);
  const frequency = (searchParams.get("frequency") || "quarterly") as Frequency;

  const [country, setCountry] = useState("US");
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const cardNumberRef = useRef<HTMLInputElement>(null);

  const selectedCountry = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];
  const isEU = EU_COUNTRIES.includes(country);

  const suffix = FREQUENCY_LABELS[frequency];
  const amountLabel = `$${amount}${suffix ? ` ${suffix}` : ""}`;
  const bankTransferLabel = isEU
    ? "Direct Bank Transfer (SEPA)"
    : country === "US"
    ? "Direct Bank Transfer (ACH)"
    : "Direct Bank Transfer";

  const isMethodSelected = selectedMethod !== null;

  useEffect(() => {
    if (selectedMethod === "card") {
      cardNumberRef.current?.focus();
    }
  }, [selectedMethod]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const selectMethod = (method: PaymentMethod) => {
    setSelectedMethod((prev) => (prev === method ? null : method));
  };

  const methodBtnClass = (method: PaymentMethod) =>
    `h-12 w-full rounded-xl border-2 bg-card transition-all duration-150 flex items-center justify-center font-body ${
      selectedMethod === method
        ? "border-accent bg-accent/5"
        : "border-input hover:border-muted-foreground/30"
    }`;

  return (
    <div className="min-h-screen bg-background flex justify-center px-6 pt-10 pb-28 sm:pt-16 relative">
      {/* VAN Logo - top right */}
      <a href="/" className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <img src={vanLogo} alt="Vintage Aviation News" className="h-10 w-auto opacity-60 hover:opacity-90 transition-opacity" />
      </a>

      <div className="w-full max-w-md relative space-y-6">
        {/* Header summary */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-body">You're supporting</p>
          <p className="text-3xl font-bold tracking-tight text-foreground font-heading">{amountLabel}</p>
        </div>

        {/* Select payment method label + country selector */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground font-body">Select payment method</p>
          <div className="relative">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              <span>{selectedCountry.flag}</span>
              <span className="hidden sm:inline">{selectedCountry.label}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {countryOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCountryOpen(false)} />
                <div className="absolute top-full right-0 z-50 mt-1 w-56 max-h-72 overflow-y-auto rounded-xl border border-input bg-card shadow-lg">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCountry(c.code);
                        setCountryOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors font-body ${
                        country === c.code ? "bg-accent/5 text-accent font-medium" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bank Transfer */}
        <div>
          <button
            onClick={() => selectMethod("bank")}
            className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-150 border-2 ${
              selectedMethod === "bank"
                ? "border-accent bg-accent/5"
                : "border-input bg-card hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className={`w-5 h-5 ${selectedMethod === "bank" ? "text-accent" : "text-muted-foreground"}`} />
                <span className="text-sm font-semibold text-foreground font-body">{bankTransferLabel}</span>
              </div>
              {selectedMethod === "bank" ? (
                <ChevronUp className="w-4 h-4 text-accent" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <p className={`mt-1 ml-8 text-[11px] font-body ${selectedMethod === "bank" ? "text-accent" : "text-muted-foreground"}`}>
              Best for long-term support
            </p>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${selectedMethod === "bank" ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3 px-1 pt-3 pb-1">
              <div>
                <p className="text-sm font-semibold text-foreground font-body">Pay via bank</p>
                <p className="text-xs text-muted-foreground font-body">Secure, direct payment from your bank account</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground font-body">Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="John Doe"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground font-body">{isEU ? "IBAN" : "Bank account / login"}</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder={isEU ? "DE89 3704 0044 0532 0130 00" : "Bank account / login"}
                  className={fieldClass}
                />
              </div>

              <p className="text-[10px] leading-relaxed text-muted-foreground font-body">
                By continuing, you authorize this payment and agree to the mandate for recurring bank debits.
              </p>
            </div>
          </div>
        </div>

        {/* Express Methods */}
        <div className="space-y-2">
          <p className="text-center text-xs text-muted-foreground font-body">Express checkout</p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <button className={methodBtnClass("apple")} onClick={() => selectMethod("apple")} aria-label="Apple Pay">
              <span className="text-sm font-semibold text-foreground">Apple Pay</span>
            </button>
            <button className={methodBtnClass("google")} onClick={() => selectMethod("google")} aria-label="Google Pay">
              <span className="text-sm font-semibold text-foreground">Google Pay</span>
            </button>
            <button className={methodBtnClass("paypal")} onClick={() => selectMethod("paypal")} aria-label="PayPal">
              <span className="text-sm font-semibold text-foreground">PayPal</span>
            </button>
            <button className={methodBtnClass("venmo")} onClick={() => selectMethod("venmo")} aria-label="Pay with Venmo">
              <span className="text-sm font-semibold text-foreground">Venmo</span>
            </button>
          </div>
        </div>

        {/* Card Payment (Collapsible) */}
        <div className={`overflow-hidden rounded-2xl border-2 bg-card transition-all duration-200 ${
          selectedMethod === "card" ? "border-accent bg-accent/5" : "border-input"
        }`}>
          <button
            onClick={() => selectMethod("card")}
            className="w-full px-5 py-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-medium text-foreground font-body">
                <CreditCard className={`w-4 h-4 ${selectedMethod === "card" ? "text-accent" : "text-muted-foreground"}`} />
                <span>Card payment</span>
              </div>
              {selectedMethod === "card" ? (
                <ChevronUp className="w-4 h-4 text-accent" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${selectedMethod === "card" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="space-y-3 px-5 pb-5">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground font-body">Card number</label>
                <input
                  ref={cardNumberRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground font-body">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground font-body">CVC</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust footer */}
        <div className="pt-1 text-muted-foreground">
          <div className="flex items-center justify-center gap-1.5 text-xs font-body">
            <Shield className="h-3.5 w-3.5" />
            <span>Secure payment • Powered by Stripe</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border px-6 py-4">
        <div className="max-w-md mx-auto">
          <button
            disabled={!isMethodSelected}
            onClick={() => {
              if (isMethodSelected) {
                navigate(`/success?amount=${amount}&frequency=${frequency}&name=${encodeURIComponent(bankName || "Supporter")}`);
              }
            }}
            className={`w-full rounded-2xl py-4 text-base font-semibold transition-all duration-200 font-body ${
              isMethodSelected
                ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 active:translate-y-0"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isMethodSelected ? `Complete Payment — ${amountLabel}` : "Select a payment method"}
          </button>
        </div>
      </div>
    </div>
  );
}
