// app/privacy/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Privacy() {
  return (
    <>
      <Navbar />

      {/* Header Section with Green Background */}
      <section className="relative bg-[#bfd62e] pt-50 pb-24">
        {/* Decorative shapes */}
        <div className="absolute bottom-35 right-80 w-10 h-10 bg-white opacity-40 rotate-65"></div>
        <div className="absolute top-30 right-20 w-14 h-14 bg-white opacity-40 rounded-full"></div>
        <div className="absolute bottom-20 left-100 w-10 h-10 bg-white opacity-40 rotate-35"></div>

        <div className="absolute top-25 left-20">
          <Image src="/term.svg" alt="Privacy" width={200} height={200} />
        </div>

        {/* Title */}
        <h1 className="text-center text-5xl font-extrabold text-white">
          Privacy Policy
        </h1>
        <p className="text-center text-white mt-8">
          Last updated: September 24, 2025
        </p>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-12 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
            <p className="text-[#414141]">
              At <b>AnalyTube</b>, your privacy and trust are extremely important
              to us. This Privacy Policy explains what information we collect,
              how we use it, how it is stored, and the rights you have over your
              personal data.
            </p>
            <p className="text-[#414141] mt-2">
              By using AnalyTube, you agree to this Privacy Policy. We are
              committed to being transparent about how your data is handled and
              to protecting it with industry-standard security measures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Information We Collect</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>
                <b>Account Information:</b> name, email, and login credentials.
              </li>
              <li>
                <b>Usage Data:</b> features accessed, pages visited, and
                preferences selected.
              </li>
              <li>
                <b>Technical Data:</b> IP address, device, browser, OS, and
                location.
              </li>
              <li>
                <b>Cookies & Tracking:</b> used to remember preferences, improve
                performance, and provide analytics.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. How We Use Your Data</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>To provide core functionality like analytics and tracking.</li>
              <li>To personalize your experience and save preferences.</li>
              <li>To send essential service communications.</li>
              <li>To analyze usage patterns and improve performance.</li>
              <li>To comply with legal obligations and ensure security.</li>
            </ul>
            <p className="text-[#414141] mt-2">
              We do <b>not</b> sell your data to advertisers or unrelated third
              parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Data Sharing</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>
                <b>Service Providers:</b> hosting, payment processors, analytics
                tools.
              </li>
              <li>
                <b>Legal Compliance:</b> disclosed if required by law or court
                order.
              </li>
              <li>
                <b>Business Transfers:</b> in case of merger, acquisition, or
                sale of assets.
              </li>
            </ul>
            <p className="text-[#414141] mt-2">
              We will never sell your data to third parties for marketing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>
                Data is kept as long as your account is active or needed to
                provide services.
              </li>
              <li>
                Deleted accounts: personal data removed or anonymized within 12
                months.
              </li>
              <li>
                Technical and aggregated data may be stored longer but not
                linked to you.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Your Rights</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Access: request a copy of your data.</li>
              <li>Correction: update or fix data anytime.</li>
              <li>Deletion: permanently delete personal data.</li>
              <li>
                Opt-Out: unsubscribe from marketing communications at any time.
              </li>
              <li>Portability: request data in portable format.</li>
            </ul>
            <p className="text-[#414141] mt-2">
              For all requests, contact us at:{" "}
              <a
                href="mailto:analytubeapp@gmail.com"
                className="text-purple font-semibold"
              >
                analytubeapp@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Security</h2>
            <p className="text-[#414141]">
              We use industry-standard measures such as HTTPS, encryption, and
              continuous monitoring to protect your data. However, no system is
              100% secure, and we cannot guarantee absolute protection.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Changes to This Policy</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>
                This Privacy Policy may be updated to reflect service or legal
                changes.
              </li>
              <li>
                Updates will always be posted here, and significant changes
                notified by email or in-app.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
