import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';

const MembershipApplicationPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    work_email: '',
    personal_email: '',
    phone_number: '',
    company_name: '',
    job_title: '',
    country: '',
    network_interest: '',
    recommended_by: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const networkOptions = [
    'General Counsel Network',
    'Senior In-House Counsel Network',
    'Life Sciences CEO Network',
    'Risk Management Network',
    'Senior Executive Network',
    'Not sure'
  ];

  const handleChange = (e) => {
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
    setErrorMessage('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/membership/application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to submit application');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        full_name: '',
        work_email: '',
        personal_email: '',
        phone_number: '',
        company_name: '',
        job_title: '',
        country: '',
        network_interest: '',
        recommended_by: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-40 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#045184] to-[#00A8E1] bg-clip-text text-transparent">
            Vanguard Membership Application
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Join our exclusive network of senior executives and leaders
          </p>
        </motion.div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4"
          >
            <CheckCircle2 size={24} className="text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">Application Submitted Successfully!</h3>
              <p className="text-green-800">
                Thank you for your interest in joining The Vanguard Network. We have received your application and will be in touch soon.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4"
          >
            <AlertCircle size={24} className="text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Submission Error</h3>
              <p className="text-red-800">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Application Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name - Required */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-bold text-slate-900 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Work Email - Required */}
            <div>
              <label htmlFor="work_email" className="block text-sm font-bold text-slate-900 mb-2">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="work_email"
                name="work_email"
                value={formData.work_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="your.name@company.com"
              />
            </div>

            {/* Personal Email - Optional */}
            <div>
              <label htmlFor="personal_email" className="block text-sm font-bold text-slate-900 mb-2">
                Personal Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                id="personal_email"
                name="personal_email"
                value={formData.personal_email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="your.name@email.com"
              />
            </div>

            {/* Phone Number - Required */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-bold text-slate-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Company Name - Required */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-bold text-slate-900 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="Your company name"
              />
            </div>

            {/* Job Title - Required */}
            <div>
              <label htmlFor="job_title" className="block text-sm font-bold text-slate-900 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="Your job title"
              />
            </div>

            {/* Country - Required */}
            <div>
              <label htmlFor="country" className="block text-sm font-bold text-slate-900 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="Your country"
              />
            </div>

            {/* Network Interest - Required */}
            <div>
              <label htmlFor="network_interest" className="block text-sm font-bold text-slate-900 mb-2">
                Which network are you interested in? <span className="text-red-500">*</span>
              </label>
              <select
                id="network_interest"
                name="network_interest"
                value={formData.network_interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none bg-white"
              >
                <option value="">Select a network...</option>
                {networkOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Recommended By - Optional */}
            <div>
              <label htmlFor="recommended_by" className="block text-sm font-bold text-slate-900 mb-2">
                Recommended By <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="recommended_by"
                name="recommended_by"
                value={formData.recommended_by}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
                placeholder="Who recommended you to apply?"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipApplicationPage;
