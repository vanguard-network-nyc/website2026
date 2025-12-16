import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from './Breadcrumb';

const PrivacyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb lightMode={true} />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90">Last updated September 14, 2021</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-16">
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Thank you for choosing to be part of our community at The Vanguard Group For Leadership LLC, dba The Vanguard Network ("Company", "we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <a href="mailto:ken@vanguardgroup.nyc" className="text-[#045184] hover:text-[#00A8E1]">ken@vanguardgroup.nyc</a>.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            When you visit our website <a href="https://www.thevanguardnetwork.com" className="text-[#045184] hover:text-[#00A8E1]">https://www.thevanguardnetwork.com</a>, or <a href="https://community.vanguardgroupforleaders.com" className="text-[#045184] hover:text-[#00A8E1]">https://community.vanguardgroupforleaders.com</a>, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            This privacy policy applies to all information collected through our website (such as <a href="https://www.thevanguardnetwork.com" className="text-[#045184] hover:text-[#00A8E1]">https://www.thevanguardnetwork.com</a>, or <a href="https://community.vanguardgroupforleaders.com" className="text-[#045184] hover:text-[#00A8E1]">https://community.vanguardgroupforleaders.com</a>), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Services").
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-12">
            Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-100 rounded-2xl p-4 md:p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Table of Contents</h2>
          <ol className="space-y-3 text-lg">
            <li><a href="#section-1" className="text-[#045184] hover:text-[#00A8E1] hover:underline">1. WHAT INFORMATION DO WE COLLECT?</a></li>
            <li><a href="#section-2" className="text-[#045184] hover:text-[#00A8E1] hover:underline">2. HOW DO WE USE YOUR INFORMATION?</a></li>
            <li><a href="#section-3" className="text-[#045184] hover:text-[#00A8E1] hover:underline">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</a></li>
            <li><a href="#section-4" className="text-[#045184] hover:text-[#00A8E1] hover:underline">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
            <li><a href="#section-5" className="text-[#045184] hover:text-[#00A8E1] hover:underline">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></li>
            <li><a href="#section-6" className="text-[#045184] hover:text-[#00A8E1] hover:underline">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
            <li><a href="#section-7" className="text-[#045184] hover:text-[#00A8E1] hover:underline">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
            <li><a href="#section-8" className="text-[#045184] hover:text-[#00A8E1] hover:underline">8. DO WE COLLECT INFORMATION FROM MINORS?</a></li>
            <li><a href="#section-9" className="text-[#045184] hover:text-[#00A8E1] hover:underline">9. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
            <li><a href="#section-10" className="text-[#045184] hover:text-[#00A8E1] hover:underline">10. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
            <li><a href="#section-11" className="text-[#045184] hover:text-[#00A8E1] hover:underline">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
            <li><a href="#section-12" className="text-[#045184] hover:text-[#00A8E1] hover:underline">12. DO WE MAKE UPDATES TO THIS POLICY?</a></li>
            <li><a href="#section-13" className="text-[#045184] hover:text-[#00A8E1] hover:underline">13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</a></li>
          </ol>
        </div>

        {/* Section 1 */}
        <section id="section-1" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. WHAT INFORMATION DO WE COLLECT?</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-4">Personal information you disclose to us</h3>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect can include the following:
          </p>

          <p className="text-slate-700 leading-relaxed mb-2">
            <strong>Name and Contact Data.</strong> We collect your first and last name, email address, postal address, phone number, and other similar contact data.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Credentials.</strong> We collect passwords, password hints, and similar security information used for authentication and account access.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-4">Information automatically collected</h3>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> Some information – such as IP address and/or browser and device characteristics – is collected automatically when you visit our Services.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
          </p>

          <p className="text-slate-700 leading-relaxed">
            Like many businesses, we also collect information through cookies and similar technologies.
          </p>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. HOW DO WE USE YOUR INFORMATION?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">We use the information we collect or receive:</p>

          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li>To facilitate account creation and logon process. If you choose to link your account with us to a third party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.</li>
            <li>To send administrative information to you. We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
            <li>Fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
            <li>To post testimonials. We post testimonials on our Services that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and testimonial. If you wish to update, or delete your testimonial, please contact us at <a href="mailto:ginger@vanguardgroup.nyc" className="text-[#045184] hover:text-[#00A8E1]">ginger@vanguardgroup.nyc</a> and be sure to include your name, testimonial location, and contact information.</li>
            <li>Request Feedback. We may use your information to request feedback and to contact you about your use of our Services.</li>
            <li>To protect our Services. We may use your information as part of our efforts to keep our Services safe and secure (for example, for fraud monitoring and prevention).</li>
            <li>To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.</li>
            <li>To enforce our terms, conditions and policies for Business Purposes, Legal Reasons and Contractual.</li>
            <li>To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</li>
            <li>To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.</li>
            <li>To deliver services to the user. We may use your information to provide you with the requested service.</li>
            <li>To respond to user inquiries/offer support to users. We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.</li>
            <li>For other Business Purposes. We may use your information for other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            We may process or share data based on the following legal basis:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-slate-700 mb-6">
            <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
            <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
            <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
            <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-4">
            More specifically, we may need to process your data or share your personal information in the following situations:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Services, which will enable them to collect data about how you interact with the Services over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.</li>
            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>Third-Party Advertisers.</strong> We may use third-party advertising companies to serve ads when you visit the Services. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.</li>
            <li><strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
            <li><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services or promotions.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
          </p>

          <p className="text-slate-700 leading-relaxed">
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
          </p>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We are not responsible for the safety of any information that you share with third-party providers who advertise, but are not affiliated with, our websites.
          </p>

          <p className="text-slate-700 leading-relaxed">
            The Services may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services or mobile applications. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy policy. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
          </p>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.
          </p>

          <p className="text-slate-700 leading-relaxed">
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
          </p>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.
          </p>

          <p className="text-slate-700 leading-relaxed">
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the services within a secure environment.
          </p>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.
          </p>

          <p className="text-slate-700 leading-relaxed">
            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at <a href="mailto:tony@vanguardgroup.nyc" className="text-[#045184] hover:text-[#00A8E1]">tony@vanguardgroup.nyc</a>.
          </p>
        </section>

        {/* Section 9 */}
        <section id="section-9" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> You may review, change, or terminate your account at any time.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer" className="text-[#045184] hover:text-[#00A8E1]">http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</a>.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-4">Account Information</h3>

          <p className="text-slate-700 leading-relaxed mb-4">
            If you would at any time like to review or change the information in your account or terminate your account, you can:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Log into your account settings and update your user account.</li>
            <li>Contact us using the contact information provided.</li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-6">
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt-out of interest-based advertising by advertisers on our Services visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#045184] hover:text-[#00A8E1]">http://www.aboutads.info/choices/</a>.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Opting out of email marketing:</strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we will still need to send you service-related emails that are necessary for the administration and use of your account. To otherwise opt-out, you may:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Note your preferences when you register an account with the site.</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section id="section-10" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          
          <p className="text-slate-700 leading-relaxed">
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.
          </p>
        </section>

        {/* Section 11 */}
        <section id="section-11" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.
          </p>

          <p className="text-slate-700 leading-relaxed mb-4">
            California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
          </p>

          <p className="text-slate-700 leading-relaxed">
            If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from our systems.
          </p>
        </section>

        {/* Section 12 */}
        <section id="section-12" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">12. DO WE MAKE UPDATES TO THIS POLICY?</h2>
          
          <p className="text-slate-600 italic mb-4">
            <strong>In Short:</strong> Yes, we will update this policy as necessary to stay compliant with relevant laws.
          </p>

          <p className="text-slate-700 leading-relaxed">
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>
        </section>

        {/* Section 13 */}
        <section id="section-13" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
          
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have questions or comments about this policy, you may contact our Data Protection Officer (DPO), Tony Powe, by email at <a href="mailto:tony@vanguardgroup.nyc" className="text-[#045184] hover:text-[#00A8E1]">tony@vanguardgroup.nyc</a>, or by post to:
          </p>

          <div className="bg-slate-100 rounded-lg p-6 mb-6">
            <p className="text-slate-700 font-medium">The Vanguard Group For Leadership LLC</p>
            <p className="text-slate-700">Tony Powe</p>
            <p className="text-slate-700">216 E 7th Street, #8</p>
            <p className="text-slate-700">New York, NY 10009</p>
            <p className="text-slate-700">United States</p>
          </div>
        </section>

        {/* Final Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
          
          <p className="text-slate-700 leading-relaxed">
            Based on the laws of some countries, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request form by clicking here. We will respond to your request within 30 days.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPage;
