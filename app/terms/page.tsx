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
            absolute top-[60%] left-[40%]
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
            Terms & Conditions
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
          <div>
  <h2 className="text-[24px] font-bold mb-2">Terms of Service</h2>
  <p className="text-white/80 text-[17px]">
    These Terms of Service (“Terms”) govern your access and use of 
    <b> SOPMakerAI</b> . By using our website, dashboard, 
    or AI-powered SOP generation tools (“Services”), you agree to follow these Terms.  
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    Please read everything carefully. If you do not agree, you may stop using 
    the platform at any time.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">1. Using SOPMakerAI</h2>
  <p className="text-white/80 text-[17px]">
    You must be at least 16 years old and legally able to enter agreements.  
    You agree to use our services responsibly and in compliance with all applicable laws.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>You are responsible for the content you generate using the platform</li>
    <li>You agree not to misuse or attempt to abuse the system</li>
    <li>You will not use the Services to create harmful, illegal, or fraudulent content</li>
    <li>You may not attempt to reverse-engineer, copy, or replicate our technology</li>
  </ul>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">2. Your Account</h2>
  <p className="text-white/80 text-[17px]">
    You must provide accurate account information and keep your login credentials secure.
    You are fully responsible for anything done through your account.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Do not share passwords with others</li>
    <li>Notify us immediately if you suspect unauthorized access</li>
    <li>We may suspend accounts that violate these Terms</li>
  </ul>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">3. AI-Generated Content</h2>
  <p className="text-white/80 text-[17px]">
    SOPMakerAI generates Standard Operating Procedures based on your inputs.  
    While we strive for accuracy, AI content may not always be perfect.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>You are responsible for reviewing and validating the generated SOPs</li>
    <li>We do not guarantee legal, operational, or regulatory compliance</li>
    <li>You hold the rights to your generated outputs</li>
    <li>We do not resell, publish, or use your SOPs for model training</li>
  </ul>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">4. Payments & Subscriptions</h2>
  <p className="text-white/80 text-[17px]">
    Paid plans grant access to premium features.  
    By subscribing, you authorize us or our payment processors to charge your chosen payment method.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>All fees are listed on our Pricing page</li>
    <li>Subscriptions renew automatically unless canceled</li>
    <li>We do not store credit card or private wallet data</li>
    <li>Refunds are processed according to our refund policy</li>
  </ul>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">5. Acceptable Use</h2>
  <p className="text-white/80 text-[17px]">
    You agree not to use the Services for harmful or unauthorized activities, including:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Generating illegal, dangerous, or fraudulent SOPs</li>
    <li>Attempting to hack, overload, or disrupt the platform</li>
    <li>Scraping or harvesting data from the Services</li>
    <li>Sharing copyrighted material without permission</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    Violations may result in temporary or permanent account suspension.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">6. Intellectual Property</h2>
  <p className="text-white/80 text-[17px]">
    All platform code, features, design, branding, and technology belong to SOPMakerAI.  
    You may not claim or redistribute our system as your own.
    </p>
  <p className="text-white/80 text-[17px] mt-2">
    You own your generated SOPs and inputs.  
    We only process them to provide the service.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">7. Service Availability</h2>
  <p className="text-white/80 text-[17px]">
    We aim for high uptime and stable performance, but interruptions may occur due to:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Scheduled maintenance</li>
    <li>System upgrades</li>
    <li>External service provider outages</li>
    <li>Security or safety actions</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    We are not liable for losses caused by downtime or AI inaccuracies.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">8. Termination</h2>
  <p className="text-white/80 text-[17px]">
    You may cancel your subscription or delete your account at any time.  
    We may suspend or terminate accounts that violate these Terms.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">9. Limitation of Liability</h2>
  <p className="text-white/80 text-[17px]">
    SOPMakerAI is provided “as is”.  
    We are not responsible for:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Business losses resulting from incorrect SOPs</li>
    <li>Misuse of generated content</li>
    <li>Downtime caused by external providers</li>
    <li>Any indirect, incidental, or consequential damages</li>
  </ul>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">10. Changes to These Terms</h2>
  <p className="text-white/80 text-[17px]">
    We may update these Terms occasionally.  
    If changes are significant, we’ll notify users via email or dashboard alerts.
  </p>
</div>
<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">11. Contact Us</h2>
  <p className="text-white/80 text-[17px]">
    If you have questions about these Terms, contact:
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