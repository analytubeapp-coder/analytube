import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Terms() {
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
          <Image
            src="/term.svg"
            alt="Term"
            width={200}
            height={200}
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-5xl font-extrabold text-white">
          Terms & Conditions
        </h1>
        <p className="text-center text-white mt-8">
          Last updated: September 24, 2025
        </p>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-12 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
            <p className="text-[#414141]">
              Welcome to <b>AnalyTube</b>. By using our website and services, you
              agree to these Terms & Conditions. Please read them carefully before
              using the Platform. If you do not agree, you must stop using AnalyTube
              immediately.
            </p>
            <p className="text-[#414141] mt-2">
              AnalyTube is an online platform that provides advanced YouTube
              channel analytics, revenue estimation, competitor insights, and
              growth tracking. While our services are designed to deliver accurate
              and reliable information, all results are estimates based on public
              data and should not be treated as exact financial or business advice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Eligibility</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>You must be at least 18 years old or the legal age of majority in your country to use our services.</li>
              <li>By creating an account, you confirm that the information you provide is true, accurate, and up to date.</li>
              <li>If you are using AnalyTube on behalf of a business or organization, you must have the authority to accept these Terms on their behalf.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Services Provided</h2>
            <p className="text-[#414141] mb-2">AnalyTube offers a set of tools for YouTube creators, marketers, and businesses, including:</p>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Channel analytics such as views, subscribers, and engagement metrics.</li>
              <li>Revenue estimation for both Shorts and long-form videos, based on CPM models.</li>
              <li>Competitor benchmarking and performance comparisons.</li>
              <li>Growth tracking with historical insights and future projections.</li>
            </ul>
            <p className="text-[#414141] mt-2">Please note:</p>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Our insights are based on public YouTube data and industry benchmarks.</li>
              <li>All figures are estimates only and should not replace professional advice.</li>
              <li>AnalyTube is a third-party service and is not affiliated with YouTube or Google.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. User Accounts</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>An account is required to access premium features.</li>
              <li>You are responsible for keeping your login details secure and for all activity under your account.</li>
              <li>Sharing accounts or creating multiple accounts to bypass subscription limits is not allowed.</li>
              <li>If you violate these Terms, AnalyTube may suspend or terminate your account without notice.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Subscription & Payment</h2>
            <p className="text-[#414141] mb-2">AnalyTube uses a freemium subscription model:</p>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Free users are allowed a limited number of analyses (currently 3 free analyses).</li>
              <li>Paid subscriptions give full access to unlimited analyses and premium features.</li>
              <li>Payments are processed securely through Stripe or other trusted providers.</li>
            </ul>

            <p className="font-semibold mt-4">Auto-renewals</p>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Subscriptions automatically renew unless canceled before the renewal date.</li>
              <li>By subscribing, you allow AnalyTube to charge your payment method at each renewal period.</li>
            </ul>

            <p className="font-semibold mt-4">Refunds & Cancellations</p>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Payments are non-refundable, unless required by law.</li>
              <li>Canceling your subscription will stop future renewals but does not issue refunds for the remaining period.</li>
              <li>We may update pricing or features, but you will always be informed in advance.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Disclaimer of Liability</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>AnalyTube is not affiliated with YouTube, Google, or any of their subsidiaries.</li>
              <li>Revenue, subscriber, and engagement estimates are approximations only.</li>
              <li>The insights provided by AnalyTube are for informational purposes only and should not be relied upon as professional advice.</li>
              <li>AnalyTube shall not be held responsible for financial losses, missed opportunities, or business decisions made based on our insights.</li>
              <li>All services are provided “as is” and “as available”, without warranties of any kind.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Intellectual Property</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>All software, code, design, reports, branding, and other materials available on AnalyTube are the intellectual property of AnalyTube.</li>
              <li>Users may not copy, modify, reproduce, resell, or distribute our services or content without prior written consent.</li>
              <li>Unauthorized use may result in suspension of your account and potential legal action.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Restrictions on Use</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>Do not attempt to reverse-engineer, hack, or disrupt the Platform.</li>
              <li>Do not use bots, scripts, or automated systems to scrape or abuse the service.</li>
              <li>Do not share false, misleading, or harmful information.</li>
              <li>Do not use AnalyTube for illegal, fraudulent, or unauthorized purposes.</li>
            </ul>
            <p className="text-[#414141] mt-2">
              Any violation may lead to immediate suspension or termination of your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">9. Governing Law</h2>
            <p className="text-[#414141]">
              These Terms are governed by and interpreted in accordance with the laws
              of England and Wales. By using AnalyTube, you agree that disputes will be
              handled exclusively by the courts of England and Wales.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">10. Modifications to the Terms</h2>
            <ul className="list-disc list-inside text-[#414141] space-y-1">
              <li>AnalyTube reserves the right to update or modify these Terms at any time.</li>
              <li>Significant changes will be communicated to users via email or on the Platform.</li>
              <li>Continued use of AnalyTube after updates constitutes acceptance of the revised Terms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">11. Contact Us</h2>
            <p className="text-[#414141]">
              If you have any questions or concerns, contact us at:{" "}
              <a
                href="mailto:analytubeapp@gmail.com"
                className="text-purple font-semibold"
              >
                analytubeapp@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
