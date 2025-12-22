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
        <section className="pt-34 pb-18 text-center">
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
    Welcome to <b>Tubly Ai</b>. Your privacy, your content, and your trust are our top priorities. 
    This Privacy Policy explains how we collect, use, store, protect, and share information when 
    you access or use the Tubly Ai website, dashboard, or AI-powered content creation tools (“Services”).
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    By using Tubly Ai, you consent to the terms outlined in this Privacy Policy.
  </p>
</div>

{/* SECTION 01 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">1. Overview</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai is a cloud-based platform that helps content creators generate optimized YouTube 
    scripts, hooks, descriptions, titles, and CTAs. We follow industry-standard security practices 
    and comply with international data protection regulations, including:
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
    We collect information to provide, enhance, and secure our Services.
  </p>

  {/* 2.1 */}
  <h3 className="text-[20px] font-semibold mt-4">2.1 Information You Provide Directly</h3>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Email address</li>
    <li>Password (securely hashed, never stored in plain text)</li>
    <li>Channel or brand name (optional)</li>
    <li>Content inputs you submit for AI generation (scripts, hooks, descriptions, titles, CTAs)</li>
  </ul>

  {/* 2.2 */}
  <h3 className="text-[20px] font-semibold mt-4">2.2 Information Automatically Collected</h3>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>IP address</li>
    <li>Browser type and version</li>
    <li>Device information</li>
    <li>Operating system</li>
    <li>Usage logs (features used, AI outputs generated, export actions)</li>
    <li>Session analytics</li>
    <li>Requests sent to AI for diagnostics and performance monitoring</li>
  </ul>

  {/* 2.3 */}
  <h3 className="text-[20px] font-semibold mt-4">2.3 Payment Information</h3>
  <p className="text-white/80 text-[17px] mt-2">
    Processed securely via third-party payment providers. Tubly Ai never stores full credit card 
    numbers or sensitive wallet information on our servers.
  </p>

  {/* 2.4 */}
  <h3 className="text-[20px] font-semibold mt-4">2.4 Cookies & Tracking Technologies</h3>
  <p className="text-white/80 text-[17px] mt-2">
    We use:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Functional cookies for platform usability</li>
    <li>Security/session cookies</li>
    <li>Analytics cookies to improve AI performance and user experience</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-2">
    We do not use cookies for advertising or behavioral tracking.
  </p>
</div>

{/* SECTION 03 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">3. How We Use Your Information</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai uses collected data strictly to operate and enhance our platform:
  </p>

  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Generate AI-powered scripts, hooks, descriptions, titles, and CTAs</li>
    <li>Authenticate accounts and manage dashboard sessions</li>
    <li>Improve AI model accuracy and reliability</li>
    <li>Personalize recommendations and user experience</li>
    <li>Prevent abuse, spam, and malicious activity</li>
    <li>Analyze feature performance and usability</li>
    <li>Communicate important updates or service changes</li>
  </ul>

  <p className="text-white/80 text-[17px] mt-3">
  Tubly Ai never sells personal data to advertisers or external marketing firms.
  </p>
</div>

{/* SECTION 04 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">4. AI Data Usage</h2>
  <p className="text-white/80 text-[17px]">
    To maintain performance and improve AI models:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>User inputs may be analyzed automatically for optimization</li>
    <li>Generated outputs may be temporarily cached for performance</li>
    <li>We do not publish, sell, or use your content for third-party AI training</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-2">
    You may request deletion of all AI inputs/outputs at any time.
  </p>
</div>

{/* SECTION 05 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">5. Data Sharing</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai only shares your information with trusted service providers necessary to operate the platform:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Cloud hosting providers (infrastructure, backups, storage)</li>
    <li>AI processing services (model inference and optimization)</li>
    <li>Payment processors for subscription and billing management</li>
    <li>Email delivery services for transactional and support messages</li>
    <li>Security monitoring services for fraud prevention and platform integrity</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    We never sell, rent, or share your personal content with advertisers or unrelated third parties.
  </p>
</div>

{/* SECTION 06 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">6. Data Retention</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai retains user data only as long as necessary to provide our services and meet legal obligations:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Account information → kept while your account is active</li>
    <li>AI-generated content → stored until you choose to delete it</li>
    <li>Analytics and usage logs → retained for performance, security, and improvement purposes</li>
    <li>Deleted accounts → fully removed within 12 months</li>
    <li>Backups → retained temporarily as part of secure backup rotation</li>
  </ul>
</div>

{/* SECTION 07 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">7. Security Measures</h2>
  <p className="text-white/80 text-[17px]">
    We implement robust security measures to protect your data and content:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Encrypted HTTPS connections for all data transfers</li>
    <li>Password hashing using industry-standard algorithms</li>
    <li>Role-based access control and strict authentication</li>
    <li>Continuous monitoring for suspicious activity</li>
    <li>Secure server environments and regular security audits</li>
    <li>GDPR and global privacy compliance</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    While we take extensive precautions, no system can be guaranteed 100% secure.
  </p>
</div>

{/* SECTION 08 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">8. Your Rights</h2>
  <p className="text-white/80 text-[17px]">
    Depending on your jurisdiction, you may have the following rights regarding your data:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Access and obtain a copy of your personal data</li>
    <li>Request correction of inaccurate data</li>
    <li>Request deletion of your account and AI-generated content</li>
    <li>Export your data in a machine-readable format</li>
    <li>Restrict or object to certain data processing activities</li>
    <li>Opt-out of non-essential cookies</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    To exercise these rights, contact: <b>support@tublyai.com</b>
  </p>
</div>

{/* SECTION 09 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">9.
    International Data Transfers</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai may transfer and process your data across global regions to provide consistent services:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>All transfers are conducted under GDPR-compliant safeguards</li>
    <li>Standard Contractual Clauses (SCCs) are used where applicable</li>
    <li>Regional privacy protections are respected at all times</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    These measures ensure your data remains secure and protected across borders.
  </p>
</div>

{/* SECTION 10 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">10. Children’s Privacy</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai is intended for users aged 16 and older.  
    We do not knowingly collect data from children under this age.
  </p>
</div>

{/* SECTION 11 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">11. Policy Updates</h2>
  <p className="text-white/80 text-[17px]">
    We may update this Privacy Policy to reflect changes in our services or regulations:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Platform enhancements or new features</li>
    <li>Changes in data protection laws or standards</li>
    <li>Improved AI functionality and workflow updates</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    All updates will be posted with a revised “Last Updated” date. Significant changes will be communicated via email or dashboard notifications.
  </p>
</div>

{/* SECTION 12 */}
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">12. Contact Us</h2>
  <p className="text-white/80 text-[17px]">
    For questions regarding this Privacy Policy or your data, reach out to:
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    📩 Email: <b>support@tublyai.com</b><br />
    🌐 Website: <b>tublyai.com</b>
  </p>
</div>

        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}