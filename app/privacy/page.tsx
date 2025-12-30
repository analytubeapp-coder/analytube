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
          <p className="text-black mt-8 text-[16px]">Last updated: Dec 30, 2025</p>
        </section>

        {/* ---------------- CONTENT BOX ---------------- */}
        <section className="py-0">
          <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-8">
            
            <div>
              <h2 className="text-[24px] text-black font-bold mb-2">Introduction</h2>
              <p className="text-black text-[17px]">
                Your privacy is important to us. This Privacy Policy explains how Canada Rental Survival Kit collects, uses, and protects your personal information when you access our website and services.
              </p>
              <p className="text-black text-[17px] mt-2">
                By using our site, you consent to the practices described in this policy.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">1. Information We Collect</h2>
              <p className="text-black text-[17px]">
                We may collect the following information when you use our services:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Personal information such as name, email address, and billing details</li>
                <li>Account credentials if you create an account</li>
                <li>Usage data, including pages visited and interaction with our site</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">2. How We Use Your Information</h2>
              <p className="text-black text-[17px]">
                We use the information we collect to:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Provide and improve our digital guides, templates, and tools</li>
                <li>Process payments and manage subscriptions</li>
                <li>Communicate with you about updates, promotions, or support</li>
                <li>Ensure security and prevent unauthorized access</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">3. Data Sharing & Third Parties</h2>
              <p className="text-black text-[17px]">
                We do not sell your personal information. We may share data with trusted third parties for:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Payment processing providers</li>
                <li>Email and communication services</li>
                <li>Analytics tools to improve our website</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                Third parties are required to use your data only for the purposes we specify and to protect it securely.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">4. Cookies & Tracking</h2>
              <p className="text-black text-[17px]">
                We may use cookies and similar technologies to enhance your experience, analyze site usage, and deliver personalized content.
              </p>
              <p className="text-black text-[17px] mt-2">
                You can manage your cookie preferences through your browser settings.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">5. Your Rights</h2>
              <p className="text-black text-[17px]">
                You have the right to:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Access and correct your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                To exercise these rights, contact us at the email provided below.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">6. Data Security</h2>
              <p className="text-black text-[17px]">
                We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-black text-[17px] mt-2">
                However, no method of transmission over the internet or electronic storage is completely secure.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">7. Service Availability</h2>
              <p className="text-black text-[17px]">
                We aim to provide uninterrupted access to our website and tools but cannot guarantee continuous availability.
              </p>
              <p className="text-black text-[17px] mt-2">
                Temporary downtime may occur due to maintenance, technical issues, or events beyond our control.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">8. Third-Party Links</h2>
              <p className="text-black text-[17px]">
                Our site may include links to third-party websites. We are not responsible for their privacy practices or content.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">9. Children’s Privacy</h2>
              <p className="text-black text-[17px]">
                Our services are not intended for children under 13, and we do not knowingly collect data from children.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">10. Changes to Privacy Policy</h2>
              <p className="text-black text-[17px]">
                We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised "Last Updated" date.
              </p>
              <p className="text-black text-[17px] mt-2">
                Continued use of our website after updates implies acceptance of the revised Privacy Policy.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">11. Contact Us</h2>
              <p className="text-black text-[17px]">
                For questions about this Privacy Policy or your data:
              </p>
              <p className="text-black mb-14 text-[17px] mt-2">
                📩 Email: <b>support@canadarentalsurvivalkit.com</b><br />
                🌐 Website: <b>www.canadarentalsurvivalkit.com</b>
              </p>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}