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
        <section className="pt-34 pb-18 text-center">
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
    These Terms of Service (“Terms”) govern your access and use of <b>Tubly Ai</b>. 
    By using our website, dashboard, or AI-powered video creation tools (“Services”), you agree to follow these Terms.  
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    Tubly Ai is designed to help creators produce high-quality, engaging content quickly and efficiently. 
    Please read everything carefully. If you do not agree, you may stop using the platform at any time.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">1. Using Tubly Ai</h2>
  <p className="text-white/80 text-[17px]">
    You must be at least 16 years old and legally able to enter agreements.  
    You agree to use our services responsibly, ethically, and in compliance with all applicable laws.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>You are responsible for the content you generate using Tubly Ai</li>
    <li>You agree not to misuse, manipulate, or attempt to abuse the system</li>
    <li>You will not use the Services to create harmful, illegal, or misleading content</li>
    <li>You may not attempt to reverse-engineer, copy, or replicate our proprietary AI technology</li>
    <li>All use must respect platform rules and community standards of content platforms</li>
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">2. Your Account</h2>
  <p className="text-white/80 text-[17px]">
    You must provide accurate and current account information and keep your login credentials secure.
    You are fully responsible for any activity that occurs under your account.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Do not share passwords or access with others</li>
    <li>Notify us immediately if you suspect unauthorized access</li>
    <li>We may suspend or terminate accounts that violate these Terms or show suspicious activity</li>
    <li>Ensure that your account reflects only content and activity you are authorized to create</li>
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">3. AI-Generated Content</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai generates video scripts, titles, thumbnails, CTAs, and other content based on your inputs.  
    While we strive for accuracy, AI-generated content may not always be perfect or guaranteed to perform a certain way.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>You are responsible for reviewing, refining, and editing generated content before publishing</li>
    <li>We do not guarantee success or specific performance metrics on any platform</li>
    <li>You retain full ownership and copyright of all content you generate</li>
    <li>We do not reuse, publish, or share your content for training purposes without your consent</li>
    <li>Always ensure compliance with platform-specific rules and regulations</li>
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">4. Payments & Subscriptions</h2>
  <p className="text-white/80 text-[17px]">
    Paid plans grant access to premium AI features and additional tools for enhanced video creation.  
    By subscribing, you authorize us or our payment processors to charge your selected payment method.
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>All fees and subscription options are listed on our Pricing page</li>
    <li>Subscriptions automatically renew unless canceled prior to the renewal date</li>
    <li>We do not store credit card or private payment information directly</li>
    <li>Refunds are handled according to our refund policy and subscription terms</li>
    <li>Any disputes or payment issues should be reported to our support team promptly</li>
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">5. Acceptable Use</h2>
  <p className="text-white/80 text-[17px]">
    You agree to use Tubly Ai responsibly and not engage in harmful or unauthorized activities, including:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Creating content that violates laws, platform rules, or intellectual property rights</li>
    <li>Attempting to hack, overload, or disrupt the Services</li>
    <li>Scraping, harvesting, or copying data from the platform</li>
    <li>Sharing copyrighted material without appropriate rights or permissions</li>
    <li>Using the AI to deceive or manipulate audiences intentionally</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    Violations may result in temporary or permanent suspension of your account and access to Services.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">6. Intellectual Property</h2>
  <p className="text-white/80 text-[17px]">
    All Tubly Ai code, AI models, features, branding, and technology remain the property of Tubly Ai.  
    You may not claim or redistribute our system as your own.
  </p>
  <p className="text-white/80 text-[17px] mt-2">
    You retain full ownership of all content you generate, including scripts, thumbnails, titles, and other assets.  
    We process your inputs solely to provide the service and do not claim ownership of your work.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">7. Service Availability</h2>
  <p className="text-white/80 text-[17px]">
    We aim for high uptime and stable performance, but interruptions may occur due to:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Scheduled maintenance or system upgrades</li>
    <li>Unexpected technical issues or outages from third-party providers</li>
    <li>Security, safety, or emergency interventions</li>
    <li>Force majeure or other circumstances beyond our control</li>
  </ul>
  <p className="text-white/80 text-[17px] mt-3">
    Tubly Ai is not liable for any losses, damages, or interruptions caused by downtime or AI limitations.  
    We continuously work to improve reliability and performance.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">8. Termination</h2>
  <p className="text-white/80 text-[17px]">
    You may cancel your subscription or delete your account at any time.  
    Tubly Ai reserves the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">9. Limitation of Liability</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai is provided “as is” without warranties of any kind.  
    We are not responsible for:
  </p>
  <ul className="list-disc ml-6 text-white/80 text-[17px] mt-2">
    <li>Any losses resulting from inaccurate or underperforming AI-generated content</li>
    <li>Misuse of scripts, videos, thumbnails, or other assets</li>
    <li>Downtime, service interruptions, or issues caused by external providers</li>
    <li>Any indirect, incidental, or consequential damages</li>
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">10. Changes to These Terms</h2>
  <p className="text-white/80 text-[17px]">
    Tubly Ai may update these Terms from time to time.  
    If changes are significant, users will be notified via email, dashboard alerts, or prominent notices on the website.  
    Continued use of Tubly Ai constitutes acceptance of the updated Terms.
  </p>
</div>

<div className="mt-8">
  <h2 className="text-[24px] font-bold mb-2">11. Contact Us</h2>
  <p className="text-white/80 text-[17px]">
    If you have any questions regarding these Terms, please contact our support team:
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