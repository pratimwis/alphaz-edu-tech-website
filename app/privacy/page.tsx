import Link from "next/link";

const sections = [
  {
    title: "1) Scope",
    body: "This Privacy Policy explains how AlphaZ Exchange (\"AlphaZ\", \"we\", \"our\", \"us\") collects, uses, stores, and protects your information when you use our website, web app, and Android debug build. AlphaZ is currently a virtual crypto trading platform for learning and simulation only.",
  },
  {
    title: "2) Important Product Note",
    body: "AlphaZ currently provides virtual-money trading. We do not process real-money deposits, withdrawals, or live exchange transactions in this phase. Performance and balances shown on the platform represent simulated trading activity.",
  },
  {
    title: "3) Information We Collect",
    body: "We may collect account details (such as email and encrypted password), device and technical data (browser type, IP, logs, app version), usage analytics (pages visited, session activity, clicks), and support information you share while requesting help.",
  },
  {
    title: "4) How We Use Information",
    body: "We use your data to create and manage accounts, provide virtual trading features, improve product performance, detect abuse or suspicious behavior, respond to support queries, communicate product updates, and maintain platform reliability and security.",
  },
  {
    title: "5) Debug APK and Testing Builds",
    body: "Our Android app is currently distributed as a debug/testing build through a shared download link. Debug builds may include diagnostic logging to help us fix bugs and improve stability. Please install only from our official shared link and avoid sharing sensitive personal information in test environments.",
  },
  {
    title: "6) Cookies and Similar Technologies",
    body: "We may use cookies, local storage, and similar technologies to keep you signed in, remember preferences, analyze usage patterns, and improve user experience. You can manage cookies through your browser settings, but some features may not work correctly if disabled.",
  },
  {
    title: "7) Data Sharing",
    body: "We do not sell your personal data. We may share limited data with trusted service providers for hosting, analytics, authentication, support, and security operations. These partners are required to process data only for authorized purposes and with appropriate safeguards.",
  },
  {
    title: "8) Data Retention",
    body: "We retain data only as long as necessary for product operations, legal compliance, dispute handling, and security monitoring. Retention periods may vary based on account activity and applicable legal requirements.",
  },
  {
    title: "9) Security",
    body: "We apply reasonable technical and organizational controls to protect your information, including access restrictions and secure transport practices. However, no online system is 100% secure, and you should also protect your credentials and devices.",
  },
  {
    title: "10) Your Choices and Rights",
    body: "You may request access, correction, or deletion of eligible personal information, subject to legal and operational constraints. You can also contact us to close your account or ask questions about how your data is handled.",
  },
  {
    title: "11) Children's Privacy",
    body: "AlphaZ is not intended for children under the age required by local law to use our services. If we discover ineligible data collection, we will take appropriate steps to delete the information.",
  },
  {
    title: "12) Policy Updates",
    body: "We may update this Privacy Policy as our product evolves. When material changes are made, we will revise the effective date and may provide additional notice inside the platform.",
  },
  {
    title: "13) Contact Us",
    body: "For privacy-related questions or requests, contact our support team through the in-app support ticket section. You can also use the support links available on our website footer.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-1)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-soft)]">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--text-strong)]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            Effective date: April 30, 2026
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            This page describes how AlphaZ handles user data for our virtual trading
            platform and associated testing applications.
          </p>

          <div className="mt-8 space-y-5">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface-2)] p-4 sm:p-5"
              >
                <h2 className="text-base font-semibold text-[var(--text-strong)]">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[var(--line-soft)] bg-[var(--surface-2)] p-4">
            <p className="text-sm text-[var(--text-muted)]">
              By using AlphaZ, you acknowledge this policy and our terms.
              <span className="mx-2">•</span>
              <Link href="/terms" className="text-[var(--accent)] hover:underline">
                View Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
