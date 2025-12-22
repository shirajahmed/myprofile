export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Shiraj Ahmed's portfolio website and online tools",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0f1011] text-gray-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#18191d] rounded-2xl p-8 shadow-lg border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-2">
            Privacy <span className="text-[#a65fa8]">Policy</span>
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-white">Personal Information:</strong> Name, email address, phone number when you contact us</p>
                <p><strong className="text-white">Usage Data:</strong> IP address, browser type, device information, pages visited</p>
                <p><strong className="text-white">Tool Data:</strong> Information processed by our online tools (not stored permanently)</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">How We Use Your Information</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Provide and maintain our website and tools</li>
                <li>Respond to inquiries and support requests</li>
                <li>Improve user experience and website functionality</li>
                <li>Comply with legal obligations under Indian law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Data Storage & Security</h2>
              <div className="space-y-4 text-gray-300">
                <p>Your data is processed and stored in accordance with Indian data protection laws including the Information Technology Act, 2000.</p>
                <p>We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Cookies & Analytics</h2>
              <p className="text-gray-300">
                We may use cookies and similar technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Your Rights</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Third-Party Services</h2>
              <p className="text-gray-300">
                Our website may contain links to third-party services. We are not responsible for their privacy practices. Please review their privacy policies separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#a65fa8] mb-4">Contact Us</h2>
              <div className="text-gray-300 space-y-2">
                <p>For privacy-related questions or requests:</p>
                <p>Email: <a href="mailto:shirajahmedlaskar@gmail.com" className="text-[#a65fa8] hover:text-purple-400 transition-colors">shirajahmedlaskar@gmail.com</a></p>
                <p>Location: Assam, India</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Shiraj Ahmed. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
