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
            w-[550px] md:w-[2000px] h-[450px] md:h-[650px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[25deg]
            rounded-[9999px] blur-[150px] opacity-60
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
            w-[550px] md:w-[1200px] h-[450px] md:h-[650px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[-30deg]
            rounded-[9999px] blur-[150px] opacity-60
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
          <p className="text-white/70 mt-8 text-lg">Last updated: Dec 7, 2025</p>
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
          
          {/* SECTION 00 - Welcome */}
<div>
  <h2 className="text-[24px] font-bold mb-2">Privacy Policy</h2>
  <p className="text-white/80 text-[17px]">
    Welcome to <b>SOPMakerAI</b> . Your privacy, your data, 
    and your trust are extremely important to us. This Privacy Policy explains 
    how we collect, use, store, protect, and share information when you access 
    or use the SOPMakerAI website, dashboard, or AI-powered services (“Services”).
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    By using SOPMakerAI, you agree to the terms described in this Privacy Policy.
  </p>
</div>


{/* SECTION 01 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">1. Overview</h2>
  <p className="text-white/80 text-[17px]">
    SOPMakerAI is a cloud-based platform that allows individuals and businesses 
    to generate, manage, and export AI-generated Standard Operating Procedures (SOPs).
    We follow industry-standard security practices and comply with international 
    data protection regulations including:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>GDPR (EU)</li>
    <li>CCPA & CPRA (California)</li>
    <li>UK Data Protection Act</li>
    <li>Global privacy framework standards</li>
  </ul>
</div>


{/* SECTION 02 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">2. Information We Collect</h2>
  <p className="text-white/80 text-[17px]">
    We collect information to deliver, optimize, and protect our services.
  </p>

  {/* 2.1 */}
  <h3 className="text-[20px] font-semibold mt-4">2.1 Information You Provide Directly</h3>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Email address</li>
    <li>Password (securely hashed, never stored in plain text)</li>
    <li>Business or organization name (optional)</li>
    <li>Inputs you submit to generate SOPs (prompts, descriptions, parameters)</li>
  </ul>

  {/* 2.2 */}
  <h3 className="text-[20px] font-semibold mt-4">2.2 Information Automatically Collected</h3>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>IP address</li>
    <li>Browser type & version</li>
    <li>Device information</li>
    <li>Operating system</li>
    <li>Usage logs (buttons clicked, features used, export actions)</li>
    <li>Session analytics</li>
    <li>Requests sent to the AI model for diagnostics & performance</li>
  </ul>

  {/* 2.3 */}
  <h3 className="text-[20px] font-semibold mt-4">2.3 Payment Information</h3>
  <p className="text-white/80 text-[17px] mt-2">
    Processed securely through third-party payment providers (e.g., NowPayments). 
    We never store full credit card, wallet keys, or other sensitive billing data 
    on our servers.
  </p>

  {/* 2.4 */}
  <h3 className="text-[20px] font-semibold mt-4">2.4 Cookies & Tracking Technologies</h3>
  <p className="text-white/80 text-[17px] mt-2">
    We use:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Functional cookies</li>
    <li>Security/session cookies</li>
    <li>Analytics cookies</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-2">No advertising or behavioral tracking is used.</p>
</div>


{/* SECTION 03 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">3. How We Use Your Information</h2>
  <p className="text-white/80 text-[17px]">
    We use data strictly to operate and improve SOPMakerAI:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Provide core functionality of SOP creation and export</li>
    <li>Authenticate accounts and maintain dashboard sessions</li>
    <li>Improve AI model accuracy and reliability</li>
    <li>Enhance user experience and personalize workflows</li>
    <li>Prevent abuse, spam, and malicious activity</li>
    <li>Analyze feature performance and usability</li>
    <li>Communicate essential updates or service changes</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    We never sell personal data to advertisers or external marketing firms.
  </p>
  </div>


{/* SECTION 04 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">4. AI Data Usage</h2>
  <p className="text-white/80 text-[17px]">
    To maintain performance and support the AI engine:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>User prompts may be analyzed in an automated manner</li>
    <li>SOP outputs may be temporarily cached for performance</li>
    <li>None of your SOPs or prompts are published, sold, or used for training third-party AI models</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-2">
    You may request deletion of all AI inputs/outputs at any time.
  </p>
</div>


{/* SECTION 05 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">5. Data Sharing</h2>
  <p className="text-white/80 text-[17px]">
    We only share data with trusted service providers who enable our platform to operate:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Hosting providers (cloud infrastructure, backups)</li>
    <li>AI processing providers (model inference)</li>
    <li>Payment processors (billing)</li>
    <li>Email delivery services</li>
    <li>Security/monitoring tools (fraud prevention)</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    We never share your data with advertisers, brokers, or unrelated third parties.
  </p>
</div>


{/* SECTION 06 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">6. Data Retention</h2>
  <p className="text-white/80 text-[17px]">
    We retain data only as long as necessary:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Account data → stored while the account is active</li>
    <li>Analytics logs → stored for performance and security</li>
    <li>SOP files and generated content → stored until the user deletes them</li>
    <li>Deleted accounts → permanently scrubbed within 12 months</li>
    <li>Backups → may persist temporarily as part of secure backup rotation</li>
  </ul>
</div>


{/* SECTION 07 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">7. Security Measures</h2>
  <p className="text-white/80 text-[17px]">
    We follow enterprise-grade security practices:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Encrypted HTTPS traffic</li>
    <li>Password hashing (bcrypt or equivalent)</li>
    <li>API rate limiting</li>
    <li>Automated threat detection</li>
    <li>Strict access control</li>
    <li>Secure server environments</li>
    <li>Continuous monitoring</li>
    <li>No plaintext credential storage</li>
    <li>GDPR-compliant data handling</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    While we take extensive measures, no system can be guaranteed 100% secure.
  </p>
</div>


{/* SECTION 08 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">8. Your Rights</h2>
  <p className="text-white/80 text-[17px]">
    Depending on your region, you may:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Access a copy of your stored data</li>
    <li>Request data correction</li>
    <li>Request account deletion</li>
    <li>Request AI prompt/output deletion</li>
    <li>Export your data in machine-readable format</li>
    <li>Restrict or object to certain data uses</li>
    <li>Turn off non-essential cookies</li>
    <li>Close your account permanently</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    To file a request, contact: <b>support@SOPMakerAI.com</b>
  </p>
</div>


{/* SECTION 09 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">9. International Data Transfers</h2>
  <p className="text-white/80 text-[17px]">
    Your data may be processed in servers located in various global regions.
    We use:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Standard Contractual Clauses (SCCs)</li>
    <li>GDPR-compliant safeguards</li>
    <li>Region-specific privacy protections</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    to ensure your data remains protected across borders.
  </p>
</div>


{/* SECTION 10 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">10. Children’s Privacy</h2>
  <p className="text-white/80 text-[17px]">
    SOPMakerAI is not intended for individuals under 16. 
    We do not knowingly collect data from minors.
  </p>
</div>


{/* SECTION 11 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">11. Policy Updates</h2>
  <p className="text-white/80 text-[17px]">
    We may update this Privacy Policy as:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Our services evolve</li>
    <li>Regulations change</li>
    <li>New features are added</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
    All updates are posted here with a revised “Last Updated” date. 
    For significant changes, users will be notified via email or dashboard alert.
  </p>
</div>


{/* SECTION 12 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">12. Contact Us</h2>
  <p className="text-white/80 text-[17px]">
    If you have questions regarding your privacy or data handling, contact:
  </p>

  <p className="text-white/80 text-[17px] mt-2">
    📩 Email: <b>support@SOPMakerAI.com</b><br />
    🌐 Website: <b>SOPMakerAI.com</b>
  </p>
</div>

        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}