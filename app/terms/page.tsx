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
<p className="text-black mt-8 text-[16px]">
Last updated: Dec 30, 2025
</p>
</section>

{/* ---------------- CONTENT BOX ---------------- */}
<section className="py-0">
<div className="max-w-4xl mx-auto px-6 md:px-0 space-y-8">

{/* Introduction */}
<div>
<h2 className="text-[24px] text-black font-bold mb-2">
Introduction
</h2>
<p className="text-black text-[17px]">
These Terms of Service ("Terms") govern your access to and use of
the CheckEmailHealth website and services.
</p>
<p className="text-black text-[17px] mt-2">
By accessing or using CheckEmailHealth, you agree to be bound by
these Terms. If you do not agree, please do not use the service.
</p>
</div>

{/* Section 1 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
1. Description of Service
</h2>
<p className="text-black text-[17px]">
CheckEmailHealth provides an email health and deliverability
analysis tool that evaluates publicly available domain-level
email configurations.
</p>
<p className="text-black text-[17px] mt-2">
The service analyzes technical records such as SPF, DKIM, DMARC,
and email forwarding configurations to help identify potential
deliverability risks.
</p>
</div>

{/* Section 2 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
2. Eligibility and Account Use
</h2>
<p className="text-black text-[17px]">
You may use CheckEmailHealth only if you have the legal authority
to do so and are not prohibited by applicable laws.
</p>
<p className="text-black text-[17px] mt-2">
You are responsible for maintaining the confidentiality of your
account and for all activities that occur under your account.
</p>
</div>

{/* Section 3 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
3. Acceptable Use
</h2>
<p className="text-black text-[17px]">
You agree not to misuse the service or use it for any unlawful,
abusive, or harmful purpose.
</p>
<ul className="list-disc ml-6 text-black text-[17px] mt-2">
<li>Attempt to access systems or data without authorization</li>
<li>Interfere with or disrupt the service</li>
<li>Use the service to violate any applicable laws or regulations</li>
</ul>
</div>

{/* Section 4 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
4. Data and Privacy
</h2>
<p className="text-black text-[17px]">
CheckEmailHealth does not read, store, or process email message
content.
</p>
<p className="text-black text-[17px] mt-2">
The service only analyzes publicly accessible DNS and domain
configuration data. For more information, please review our
Privacy Policy.
</p>
</div>

{/* Section 5 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
5. Accuracy of Results
</h2>
<p className="text-black text-[17px]">
While we strive to provide accurate and up-to-date information,
CheckEmailHealth does not guarantee that all results will be
complete, error-free, or suitable for every use case.
</p>
<p className="text-black text-[17px] mt-2">
The service is provided for informational purposes only and
should not be considered professional or legal advice.
</p>
</div>

{/* Section 6 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
6. Subscription and Payments
</h2>
<p className="text-black text-[17px]">
Some features of CheckEmailHealth may require a paid
subscription.
</p>
<p className="text-black text-[17px] mt-2">
All fees are billed in advance and are non-refundable unless
otherwise stated. Pricing details are available on the website.
</p>
</div>

{/* Section 7 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
7. Termination
</h2>
<p className="text-black text-[17px]">
We reserve the right to suspend or terminate access to the
service at any time if these Terms are violated.
</p>
<p className="text-black text-[17px] mt-2">
You may stop using the service at any time.
</p>
</div>

{/* Section 8 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
8. Limitation of Liability
</h2>
<p className="text-black text-[17px]">
To the maximum extent permitted by law, CheckEmailHealth shall
not be liable for any indirect, incidental, or consequential
damages arising from your use of the service.
</p>
</div>

{/* Section 9 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
9. Changes to These Terms
</h2>
<p className="text-black text-[17px]">
We may update these Terms from time to time.
</p>
<p className="text-black text-[17px] mt-2">
Continued use of the service after changes are posted constitutes
acceptance of the updated Terms.
</p>
</div>

{/* Section 10 */}
<div className="mt-8">
<h2 className="text-[24px] text-black font-bold mb-2">
10. Contact Information
</h2>
<p className="text-black text-[17px]">
If you have any questions about these Terms, please contact us at:
</p>
<p className="text-black mb-14 text-[17px] mt-2">
📩 Email: <b>support@checkemailhealth.com</b><br />
🌐 Website: <b>www.checkemailhealth.com</b>
</p>
</div>

</div>
</section>

<Footer />
</main>
</>
);
}