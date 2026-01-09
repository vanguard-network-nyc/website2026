import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../Breadcrumb';
import SEO from '../SEO';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    interestArea: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      
      // Prepare the data payload
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        interestArea: formData.interestArea,
        message: formData.message,
        source: 'The Vanguard Network Contact Form'
      };

      console.log('Submitting form data:', payload);

      const response = await fetch(`${backendUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);

      // Check if the response is ok (status 200-299)
      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          company: '',
          interestArea: '',
          message: ''
        });
      } else {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-12 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <SEO 
        title="Contact Us"
        description="Get in touch with The Vanguard Network. Connect with our team to learn about leadership advisory services and peer-to-peer executive networks."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 md:px-8">
        <Breadcrumb />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent py-2 leading-tight"
          >
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your leadership? Get in touch with our team of experts and discover how The Vanguard Network can accelerate your executive journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-2xl p-4 md:p-4 md:p-8 shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#045184' }}>Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
              >
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm">We'll get back to you within 24 hours.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                <p className="font-medium">Error sending message.</p>
                <p className="text-sm">Please try again or contact us directly.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your full name"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Enter your company"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Interest Area</label>
                <select
                  name="interestArea"
                  value={formData.interestArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select your area of interest</option>
                  <option value="advisory">Advisory Services</option>
                  <option value="networking">Networking & Events</option>
                  <option value="programs">Leadership Programs</option>
                  <option value="book">Book & Resources</option>
                  <option value="membership">Membership Information</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <label className="block font-medium mb-2" style={{ color: '#045184' }}>Message *</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors duration-200"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00A8E1';
                    e.target.style.boxShadow = `0 0 0 2px rgba(0, 168, 225, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Tell us about your leadership development needs and how we can help you achieve your goals"
                ></textarea>
              </motion.div>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1] hover:shadow-lg'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#045184' }}>Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Email</p>
                    <a 
                      href="mailto:contact@vanguardgroup.nyc"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      contact@vanguardgroup.nyc
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Office</p>
                    <p className="text-slate-600">216 E 7th Street, #8<br />New York, NY 10009</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Globe className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>Website</p>
                    <a 
                      href="https://www.thevanguardnetwork.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      www.thevanguardnetwork.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#045184] to-[#00A8E1]">
                    <Linkedin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: '#045184' }}>LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/company/40948215" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Follow us on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl p-4 md:p-8 shadow-lg" style={{ backgroundColor: '#045184' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Why Choose The Vanguard Network?</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Proven track record with Fortune 500 executives</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Personalized leadership development programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Exclusive networking with top-tier professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#00A8E1' }}></div>
                  <span>Comprehensive advisory services and support</span>
                </li>
              </ul>
              <Link to="/advisory">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-blue-50"
                  style={{ color: '#045184' }}
                >
                  Learn More About Our Services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Our Team Link Section */}
        <div className="md:px-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-slate-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">The Vanguard Network Team</h3>
          
          <motion.a
            href="/team"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <Users size={20} />
            About Our Team
          </motion.a>
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


export default ContactPage;
