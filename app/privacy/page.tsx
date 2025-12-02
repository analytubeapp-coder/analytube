"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      {/* ---------------- AURORA BACKGROUND ---------------- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">

        {/* Purple Aura */}
        <div
          className="
            absolute top-[35%] left-[55%]
            w-[900px] h-[450px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[25deg]
            rounded-[9999px] blur-[160px] opacity-60
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(170,110,255,0.55), transparent 90%)",
          }}
        ></div>

        {/* Bronze Aura */}
        <div
          className="
            absolute top-[60%] left-[40%]
            w-[1000px] h-[550px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[-30deg]
            rounded-[9999px] blur-[100px] opacity-60
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,180,100,0.55), transparent 90%)",
          }}
        ></div>

      </div>

      {/* ---------------- PAGE CONTENT ---------------- */}
      <main className="min-h-screen w-full text-white relative">
        <Navbar />

        {/* ---------------- HEADER SECTION ---------------- */}
        <section className="py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-white/70 mt-8 text-lg">Last updated: [date]</p>
        </section>

        {/* ---------------- CONTENT BOX ---------------- */}
        <section className="py-0">
          <div
            className="
              max-w-4xl mx-auto 
              bg-white/10 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl 
              p-12 space-y-8 
              text-white 
              shadow-[0_0_35px_rgba(0,0,0,0.25)]
            "
          >
          
          {/* SECTION 01 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">1. Introduction</h2>
            <p className="text-white/80 text-[17px]">
              At <b>——</b>, your privacy, security, and trust are extremely important
              to us. This Privacy Policy explains what information we collect,
              how we use it, how it is stored, and what rights you have regarding
              your personal data and activity on the platform.
            </p>
            <p className="text-white/80 text-[17px] mt-2">
              By accessing or using ——, you agree to the terms outlined in this
              Privacy Policy. We are committed to full transparency and apply
              industry-standard protection measures to ensure that your data is
              handled responsibly and safely at all times.
            </p>
          </div>

          {/* SECTION 02 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">2. Information We Collect</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>
                <b>Account Information:</b> name, email address, and login
                credentials required to create and maintain your account.
              </li>
              <li>
                <b>Usage Data:</b> features you interact with, pages you visit,
                preferences you set, and interactions within the dashboard.
              </li>
              <li>
                <b>Technical Data:</b> IP address, device type, browser version,
                operating system, and approximate location.
              </li>
              <li>
                <b>Cookies & Tracking:</b> used to enhance functionality, remember
                preferences, and improve platform analytics.
              </li>
            </ul>
          </div>

          {/* SECTION 03 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">3. How We Use Your Data</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>
                To operate core platform features, including analytics,
                personalization, and service optimization.
              </li>
              <li>
                To enhance user experience, save preferences, and maintain
                consistent performance across sessions.
              </li>
              <li>
                To send essential notifications regarding account activity or
                service updates (never spam).
              </li>
              <li>
                To analyze platform performance and improve reliability,
                accuracy, and future updates.
              </li>
              <li>
                To comply with legal requirements and ensure security
                against fraud or misuse.
              </li>
            </ul>
            <p className="text-white/80 text-[17px] mt-2">
              We do <b>not</b> sell or share your personal data with advertisers
              or unrelated third-party marketing agencies.
            </p>
          </div>

          {/* SECTION 04 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">4. Data Sharing</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>
                <b>Service Providers:</b> such as hosting companies, payment
                processors, and analytics tools that support platform operations.
              </li>
              <li>
                <b>Legal Requirements:</b> only when required by law, regulation,
                or valid legal process.
              </li>
              <li>
                <b>Business Transfers:</b> if —— is involved in a merger or
                acquisition, some data may be transferred appropriately.
              </li>
            </ul>
            <p className="text-white/80 text-[17px] mt-2">
              Your personal data is <b>never</b> sold or exchanged for advertising
              purposes.
            </p>
          </div>

          {/* SECTION 05 */}
          <div>
            <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>
                Personal data is retained as long as your account remains active
                or is necessary for providing our services.
              </li>
              <li>
                When an account is deleted, identifying data is removed or
                securely anonymized within 12 months.
              </li>
              <li>
                Aggregated or non-identifiable technical data may be stored
                longer for performance and auditing purposes.
              </li>
            </ul>
          </div>

          {/* SECTION 06 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">6. Your Rights</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>Request a copy of the data we store about you.</li>
              <li>Update or correct your personal information.</li>
              <li>Request full deletion of your personal data.</li>
              <li>Unsubscribe from optional communication at any time.</li>
              <li>
                Request your data in a portable, machine-readable format.
              </li>
            </ul>
            <p className="text-white/80 text-[17px] mt-2">
              To submit a privacy request, contact:{" "}
              <a
                href="mailto:support@analytubeapp.com"
                className="text-purple font-semibold"
              >
                support@analytubeapp.com
              </a>
            </p>
          </div>

          {/* SECTION 07 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">7. Security</h2>
            <p className="text-white/80 text-[17px]">
              We implement modern security measures including HTTPS encryption,
              secure authentication, and continuous monitoring. While we take all
              reasonable steps to protect your information, no online system is
              ever completely risk-free, and we cannot guarantee absolute
              security.
            </p>
          </div>

          {/* SECTION 08 */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">8. Changes to This Policy</h2>
            <ul className="list-disc list-inside text-white/80 text-[17px] space-y-1">
              <li>
                This Privacy Policy may be updated to reflect service changes,
                new regulations, or improvements to data practices.
              </li>
              <li>
                Updated versions will always be available on this page, and significant changes will be communicated via email or in-app
                notifications.
              </li>
            </ul>
          </div>

        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}