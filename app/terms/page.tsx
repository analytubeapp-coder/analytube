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
            Terms & Conditions
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
          
          {/* 1. Introduction */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">1. Introduction</h2>
            <p className="text-white/80 text-[17px]">
              Welcome to <b>----</b>. By accessing or using our website, tools, and
              related services, you agree to be bound by these Terms & Conditions.
              Please read them carefully before continuing. If you do not accept
              these Terms, you must discontinue using ---- immediately.
            </p>
            <p className="text-white/80 mt-2">
              ---- provides AI-powered YouTube analytics, insights, performance
              tracking, and various tools designed to help creators, brands, and
              businesses understand their channel growth. While we strive to offer
              accurate estimates and reliable data, all results are based on public
              information and should not be considered precise financial or
              professional advice.
            </p>
          </div>

          {/* 2. Eligibility */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">2. Eligibility</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>You must be at least 18 years old or the age of majority in your region.</li>
              <li>By creating an account, you agree that all provided information is accurate and up to date.</li>
              <li>
                If you are using ---- on behalf of an organization, you must have
                legal authority to accept these Terms for that entity.
              </li>
            </ul>
          </div>

          {/* 3. Services Provided */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">3. Services Provided</h2>
            <p className="text-white/80 mb-2 text-[17px]">
              ---- offers a suite of tools for creators, marketers, and businesses,
              including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>Channel insights: subscribers, views, and engagement metrics.</li>
              <li>Estimated earnings for Shorts and long-form videos based on CPM benchmarks.</li>
              <li>Competitor analytics and performance comparisons.</li>
              <li>Growth tracking, historical insights, and future projections.</li>
            </ul>

            <p className="text-white/80 mt-2 text-[17px]">Please note:</p>

            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>All insights rely on public YouTube data and statistical modeling.</li>
              <li>Figures are estimates and should not be treated as guarantees.</li>
              <li>---- is not affiliated with YouTube, Google, or any of their services.</li>
              </ul>
          </div>

          {/* 4. User Accounts */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">4. User Accounts</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>An account is required to access premium or advanced features.</li>
              <li>You are responsible for protecting your login credentials.</li>
              <li>Sharing accounts or creating multiple accounts to bypass limits is prohibited.</li>
              <li>---- reserves the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </div>

          {/* 5. Subscription & Payment */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">5. Subscription & Payment</h2>
            <p className="text-white/80 mb-2 text-[17px]">---- operates on a freemium model:</p>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>Free users receive a limited number of analyses (currently 3).</li>
              <li>Paid plans unlock full access to premium features.</li>
              <li>Payments are securely processed through Stripe or approved partners.</li>
            </ul>

            <p className="font-semibold mt-4 text-[17px]">Auto-renewals</p>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>Subscriptions renew automatically unless canceled before renewal.</li>
              <li>By subscribing, you authorize recurring charges to your payment method.</li>
            </ul>

            <p className="font-semibold mt-4 text-[17px]">Refunds & Cancellations</p>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>Payments are non-refundable except where required by law.</li>
              <li>Canceling stops future renewals but does not refund the current cycle.</li>
              <li>Pricing or feature changes will be communicated in advance.</li>
            </ul>
          </div>

          {/* 6. Disclaimer of Liability */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">6. Disclaimer of Liability</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>---- is not affiliated with YouTube, Google, or related entities.</li>
              <li>All analytics, estimates, and projections are approximations only.</li>
              <li>Insights are informational and not professional or financial advice.</li>
              <li>
                ---- is not responsible for business decisions, financial losses, or
                outcomes based on information provided.
              </li>
              <li>All services are provided “as is” without warranties of any kind.</li>
            </ul>
          </div>

          {/* 7. Intellectual Property */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">7. Intellectual Property</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>
                All software, content, branding, and materials on ---- are protected
                intellectual property.
              </li>
              <li>
                You may not copy, distribute, or modify any part of the Platform
                without written permission.
              </li>
              <li>Unauthorized use may result in account suspension or legal action.</li>
            </ul>
          </div>

          {/* 8. Restrictions on Use */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">8. Restrictions on Use</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>Do not hack, reverse-engineer, or disrupt the Platform.</li>
              <li>Do not use bots, automation, or scraping tools.</li>
              <li>Do not upload or share harmful, false, or misleading information.</li>
              <li>Do not use ---- for illegal or unauthorized activities.</li>
            </ul>
            <p className="text-white/80 mt-2 text-[17px]">Violations may result in immediate suspension or termination of your
              account.
            </p>
          </div>

          {/* 9. Governing Law */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">9. Governing Law</h2>
            <p className="text-white/80 text-[17px]">
              These Terms are governed by the laws of England and Wales. By using
              ----, you agree that any disputes will be handled exclusively in the
              courts of England and Wales.
            </p>
          </div>

          {/* 10. Modifications */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">10. Modifications to the Terms</h2>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-[17px]">
              <li>---- may update these Terms at any time.</li>
              <li>Significant updates will be communicated via email or on the Platform.</li>
              <li>Continued use after modifications means acceptance of the new Terms.</li>
            </ul>
          </div>

          {/* 11. Contact */}
          <div>
            <h2 className="text-[24px] font-bold mb-2">11. Contact Us</h2>
            <p className="text-white/80 text-[17px]">
              For questions or support, contact us at:{" "}
              <a
                href="mailto:support@analytubeapp.com"
                className="text-purple font-semibold text-[17px]"
              >
                support@analytubeapp.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      </main>
    </>
  );
}