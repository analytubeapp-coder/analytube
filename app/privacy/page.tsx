"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      {/* ---------------- PAGE CONTENT ---------------- */}
      <main className="min-h-screen w-full text-black bg-white relative">
        <Navbar />

        {/* ---------------- HEADER SECTION ---------------- */}
        <section className="pt-34 pb-18 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-black">
            Privacy Policy
          </h1>
          <p className="text-black mt-8 text-[16px]">
            Last updated: Dec 7, 2025
          </p>
        </section>

        {/* ---------------- CONTENT ---------------- */}
        <section className="py-0">
          <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-8">

            {/* OVERVIEW */}
            <div>
              <h2 className="text-[24px] text-black font-bold mb-2">
                Privacy Overview
              </h2>
              <p className="text-black text-[17px]">
                This Privacy Policy explains how [YourBrand] collects, uses,
                stores, and protects your information when you access or use our
                website and services.
              </p>
              <p className="text-black text-[17px] mt-2">
                We are committed to respecting your privacy and limiting data
                collection to what is strictly necessary to operate the service.
                Transparency, security, and user trust are core principles of how
                we handle information.
              </p>
              <p className="text-black text-[17px] mt-2">
                By using [YourBrand], you agree to the practices described in this
                Privacy Policy. If you do not agree, please discontinue use of
                the service.
              </p>
            </div>

            {/* 1 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                1. Information We Collect
              </h2>
              <p className="text-black text-[17px]">
                We collect only the information necessary to provide, maintain,
                secure, and improve our services.
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Email address and basic account information</li>
                <li>Domain names and email routing configuration data</li>
                <li>Billing, subscription, and payment-related information</li>
                <li>Limited technical and usage data for performance and security</li>
              </ul>
              <p className="text-black text-[17px] mt-3">
                We do not collect unnecessary personal data and never request
                access to your private email content.
              </p>
            </div>

            {/* 2 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-black text-[17px]">
                Your information is used solely for legitimate business purposes
                related to operating and improving [YourBrand].
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Providing, maintaining, and supporting the service</li>
                <li>Processing subscriptions, invoices, and payments</li>
                <li>Sending important service-related notifications</li>
                <li>Improving reliability, performance, and security</li>
              </ul>
              <p className="text-black text-[17px] mt-3">
                We do not use your data for advertising, profiling, or resale.
              </p>
            </div>

            {/* 3 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                3. Email Content & Privacy
                </h2>
              <p className="text-black text-[17px]">
                [YourBrand] does not access, read, store, scan, or analyze the
                content of your emails.
              </p>
              <p className="text-black text-[17px] mt-2">
                Our service functions purely as an email routing layer. All
                incoming and outgoing emails are delivered directly to your
                selected third-party inbox provider, such as Gmail or Outlook.
              </p>
              <p className="text-black text-[17px] mt-2">
                Email content remains under the control of those providers and is
                governed by their respective privacy policies.
              </p>
            </div>

            {/* 4 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                4. Data Sharing
              </h2>
              <p className="text-black text-[17px]">
                We do not sell, rent, trade, or monetize your personal
                information.
              </p>
              <p className="text-black text-[17px] mt-2">
                Information may be shared only with trusted third-party service
                providers when necessary to operate core functionality, such as
                payment processing, infrastructure hosting, or security services.
              </p>
            </div>

            {/* 5 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                5. Cookies & Analytics
              </h2>
              <p className="text-black text-[17px]">
                We may use cookies or similar technologies to ensure proper site
                functionality and understand general usage patterns.
              </p>
              <p className="text-black text-[17px] mt-2">
                These tools help us improve performance and user experience and
                do not collect sensitive personal data.
              </p>
            </div>

            {/* 6 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                6. Data Security
              </h2>
              <p className="text-black text-[17px]">
                We implement industry-standard technical and organizational
                security measures to protect your information.
              </p>
              <p className="text-black text-[17px] mt-2">
                While no system can guarantee absolute security, we continuously
                review and enhance our safeguards to reduce risk.
              </p>
            </div>

            {/* 7 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                7. Data Retention
              </h2>
              <p className="text-black text-[17px]">
                We retain personal data only for as long as necessary to provide
                the service or comply with legal and regulatory obligations.
              </p>
              <p className="text-black text-[17px] mt-2">
                You may request deletion of your account and associated data at
                any time, subject to applicable requirements.
              </p>
            </div>

            {/* 8 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                8. Your Rights
              </h2>
              <p className="text-black text-[17px]">
                Depending on your jurisdiction, you may have the right to
                access, correct, or delete your personal information.
              </p>
              <p className="text-black text-[17px] mt-2">
                Requests regarding your data can be made by contacting our
                support team.
              </p>
            </div>

            {/* 9 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                9. Changes to This Policy
              </h2>
              <p className="text-black text-[17px]">
                We may update this Privacy Policy from time to time to reflect
                changes in legal requirements or service functionality.
              </p>
              <p className="text-black text-[17px] mt-2">
                Continued use of the service after changes take effect
                constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* 10 */}
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">
                10. Contact Us
              </h2>
              <p className="text-black text-[17px]">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <p className="text-black mb-14 text-[17px] mt-2">
                📩 Email: <b>support@[YourBrand].com</b><br />
                🌐 Website: <b>[YourBrand].com</b>
              </p>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}