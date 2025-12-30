"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      {/* ---------------- PAGE CONTENT ---------------- */}
      <main className="min-h-screen w-full text-black bg-white relative">
        <Navbar />

        {/* ---------------- HEADER SECTION ---------------- */}
        <section className="pt-34 pb-18 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-black">
            Terms & Conditions
          </h1>
          <p className="text-black mt-8 text-[16px]">Last updated: Dec 30, 2025</p>
        </section>

        {/* ---------------- CONTENT BOX ---------------- */}
        <section className="py-0">
          <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-8">
            
            <div>
              <h2 className="text-[24px] text-black font-bold mb-2">Terms of Service</h2>
              <p className="text-black text-[17px]">
                These Terms & Conditions govern your access to and use of the Canada Rental Survival Kit website and its services.
                By using our site and services, you agree to comply with these Terms. If you do not agree, please do not use the site or services.
              </p>
              <p className="text-black text-[17px] mt-2">
                The Canada Rental Survival Kit provides digital guides, templates, and tools designed to help renters in Canada avoid scams, understand their rights, and manage deposits and payments efficiently.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">1. Use of the Service</h2>
              <p className="text-black text-[17px]">
                You may use the Canada Rental Survival Kit only in compliance with these Terms and all applicable laws.
                You agree not to misuse the service, including but not limited to:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Sharing or redistributing the digital materials without permission</li>
                <li>Using the toolkit for illegal, fraudulent, or deceptive purposes</li>
                <li>Interfering with the integrity or functionality of the website</li>
                <li>Reselling the toolkit or its content without authorization</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">2. Your Account</h2>
              <p className="text-black text-[17px]">
                Some features may require you to create an account to access your purchased materials.
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Ensure all information provided is accurate and up-to-date</li>
                <li>Be responsible for all activity under your account</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                We are not responsible for unauthorized access resulting from your failure to secure your account.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">3. Service Content & Functionality</h2>
              <p className="text-black text-[17px]">
                The Canada Rental Survival Kit provides digital guides, checklists, and templates for personal use only.
              </p>
              <p className="text-black text-[17px] mt-2">
                We do not guarantee any specific legal outcome from using the guides. The content is for informational purposes and should not replace professional legal advice.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">4. Payments & Refunds</h2>
              <p className="text-black text-[17px]">
                Access to the Canada Rental Survival Kit requires purchase of a subscription or one-time payment.
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Payments are processed securely via our payment provider</li>
                <li>All sales are final unless required by law</li>
                <li>Prices may be updated with notice on the website</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                Failure to complete payment may result in restricted access until resolved.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">5. Acceptable Use</h2>
              <p className="text-black text-[17px]">
                You agree not to use our digital toolkit for:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Sharing or selling content illegally</li>
                <li>Any fraudulent, misleading, or harmful activities</li>
                <li>Violating the rights of landlords, tenants, or third parties</li>
              </ul>
              <p className="text-black text-[17px] mt-3">
                Accounts found in violation may be suspended or terminated.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">6. Intellectual Property</h2>
              <p className="text-black text-[17px]">
                All content in the Canada Rental Survival Kit is owned by the creators of the kit.
                Copying, redistributing, or modifying content without written permission is prohibited.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">7. Service Availability</h2>
              <p className="text-black text-[17px]">
                We aim to provide reliable access to the toolkit but cannot guarantee uninterrupted service.
              </p>
              <p className="text-black text-[17px] mt-2">
                Temporary downtime may occur due to maintenance, technical issues, or other factors beyond our control.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">8. Termination</h2>
              <p className="text-black text-[17px]">
                We may suspend or terminate your access if these Terms are violated.
                You may also cancel your subscription at any time, and your access will end upon termination.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">9. Limitation of Liability</h2>
              <p className="text-black text-[17px]">
                To the maximum extent permitted by law, we are not liable for:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Indirect or consequential damages</li>
                <li>Loss of personal data or deposit tracking errors</li>
                <li>Any damages arising from misuse of the toolkit</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                Use of the service is at your own discretion.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">10. Changes to Terms</h2>
              <p className="text-black text-[17px]">
                We may update these Terms from time to time. 
              </p>
              <p className="text-black text-[17px] mt-2">
                Continued use of the Canada Rental Survival Kit after changes implies acceptance of the new Terms.
              </p>
            </div>
            

            <div className="mt-8">
             <h2 className="text-[24px] text-black font-bold mb-2">11. Contact Us</h2>
              <p className="text-black text-[17px]">
                For questions about these Terms:
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