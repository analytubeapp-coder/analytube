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
                At CheckEmailHealth, we take your privacy seriously.
                This Privacy Policy explains how we collect, use, and protect information when you use our website and services.
              </p>
              <p className="text-black text-[17px] mt-2">
                By using CheckEmailHealth, you agree to the practices described in this policy.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">1. Information We Collect</h2>

              <h3 className="text-[17px] text-black font-bold mb-1">
                Information You Provide
              </h3>
              <p className="text-black text-[17px]">
                When you use our services or contact us, we may collect:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Your email address (for authentication, support, or account-related communication)</li>
                <li>Information you submit through contact forms or support requests</li>
              </ul>

              <br />

              <h3 className="text-[17px] text-black font-bold mb-1">
                Information We Do Not Collect
              </h3>
              <p className="text-black text-[17px]">
                CheckEmailHealth does not:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Read your email messages</li>
                <li>Store email content</li>
                <li>Access inboxes or mail servers</li>
                <li>Collect passwords or private email data</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                Our service only analyzes publicly available domain-level email configurations.
              </p>
            </div>


            
            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">2. How Our Email Health Check Works</h2>
              <p className="text-black text-[17px]">
                CheckEmailHealth analyzes technical email authentication records associated with your domain, including:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>SPF</li>
                <li>DKIM</li>
                <li>DMARC</li>
                <li>Email forwarding configuration</li>
              </ul>
              <p className="mt-2">These records are publicly accessible via DNS and do not contain private or personal email content.</p>
            </div>



            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">3. How We Use Your Information</h2>
              <p className="text-black text-[17px]">
                We use collected information only to:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Provide and operate the CheckEmailHealth service</li>
                <li>Generate email health and deliverability reports</li>
                <li>Improve platform performance and reliability</li>
                <li>Respond to support inquiries</li>
                <li>Communicate important service-related updates</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                We do not sell, rent, or trade your personal data.
              </p>
            </div>


            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">4. Data Storage and Security</h2>
              <p className="text-black text-[17px]">
                We take reasonable technical and organizational measures to protect your data against unauthorized access, loss, or misuse.
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>We do not store email message content</li>
                <li>We do not monitor or intercept communications</li>
                <li>We limit data access to essential systems only</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                While no online service is 100% secure, we continuously work to protect your information.
              </p>
            </div>


            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">5. Cookies and Analytics</h2>
              <p className="text-black text-[17px]">
                We may use cookies or similar technologies to:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Understand how users interact with our website</li>
                <li>Improve user experience and performance</li>
                <li>Analyze traffic and usage trends</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                You can control or disable cookies through your browser settings.
              </p>
            </div>



            <div className="mt-8">
              <h2 className="text-[24px] text-black font-bold mb-2">6. Third-Party Services</h2>
              <p className="text-black text-[17px]">
                We may use trusted third-party services for:
              </p>
              <ul className="list-disc ml-6 text-black text-[17px] mt-2">
                <li>Authentication</li>
                <li>Hosting and infrastructure</li>
                <li>Analytics</li>
                <li>Payment processing (if applicable)</li>
              </ul>
              <p className="text-black text-[17px] mt-2">
                These providers only access information necessary to perform their services and are required to protect your data.
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