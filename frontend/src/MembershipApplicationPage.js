import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

// Add custom styles for phone input
const phoneInputStyles = `
  .phone-input-container .react-tel-input .form-control:focus {
    border-color: #00A8E1 !important;
    box-shadow: 0 0 0 3px rgba(0, 168, 225, 0.1) !important;
    outline: none !important;
  }
  
  .phone-input-container .react-tel-input .flag-dropdown:hover {
    background-color: #f8fafc !important;
  }
  
  .phone-input-container .react-tel-input .flag-dropdown.open {
    background-color: #f8fafc !important;
  }
  
  .phone-input-container .react-tel-input .selected-flag:hover,
  .phone-input-container .react-tel-input .selected-flag:focus {
    background-color: #f8fafc !important;
  }
  
  .phone-input-container .react-tel-input .country-list {
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  
  .phone-input-container .react-tel-input .country-list .country:hover {
    background-color: #e0f2f7 !important;
  }
  
  .phone-input-container .react-tel-input .country-list .country.highlight {
    background-color: #00A8E1 !important;
    color: white !important;
  }
`;

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
    recommended_by: '',
    source_of_inquiry: 'Website sign up' // Hidden field, pre-filled
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');
  const [resetKey, setResetKey] = useState(0); // Counter to force reset of complex components

  const networkOptions = [
    'General Counsel Network',
    'Senior In-House Counsel Network',
    'Life Sciences CEO Network',
    'Risk Management Network',
    'Senior Executive Network',
    'Not sure'
  ];

  // Comprehensive list of countries
  const countryOptions = [
    { value: 'United States', label: 'United States' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' },
    { value: 'China', label: 'China' },
    { value: 'India', label: 'India' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Spain', label: 'Spain' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Poland', label: 'Poland' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Hong Kong', label: 'Hong Kong' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Russia', label: 'Russia' },
    { value: 'Turkey', label: 'Turkey' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Chile', label: 'Chile' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Philippines', label: 'Philippines' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Egypt', label: 'Egypt' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Greece', label: 'Greece' },
    { value: 'Czech Republic', label: 'Czech Republic' },
    { value: 'Hungary', label: 'Hungary' },
    { value: 'Romania', label: 'Romania' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Iceland', label: 'Iceland' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Cyprus', label: 'Cyprus' },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone_number: '+' + value
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData(prev => ({
      ...prev,
      country: selectedOption ? selectedOption.value : ''
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
      
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset form completely
      setFormData({
        full_name: '',
        work_email: '',
        personal_email: '',
        phone_number: '',
        company_name: '',
        job_title: '',
        country: '',
        network_interest: '',
        recommended_by: '',
        source_of_inquiry: 'Website sign up'
      });
      
      // Increment reset key to force re-render of phone and country components
      setResetKey(prev => prev + 1);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An error occurred while submitting your application. Please try again.');
      
      // Scroll to top to show error modal
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{phoneInputStyles}</style>
      <div className="pt-40 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent py-2 leading-tight"
            style={{
              backgroundImage: 'linear-gradient(45deg, #7f30cb, #01dcba)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Vanguard Membership Application
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Join our exclusive network of senior executives and leaders
          </p>
        </motion.div>

        {/* Success Modal Popup */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setSubmitStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Application Submitted Successfully!</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Thank you for your interest in joining The Vanguard Network. We have received your application and will be in touch soon.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(45deg, #7f30cb, #01dcba)' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Error Modal Popup */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setSubmitStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Submission Error</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(45deg, #7f30cb, #01dcba)' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
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
              <PhoneInput
                key={`phone-${resetKey}`} // Force re-render only when form is reset
                country={'us'}
                value={formData.phone_number}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone_number',
                  required: true,
                }}
                containerClass="phone-input-container"
                inputClass="phone-input-field"
                buttonClass="phone-input-button"
                dropdownClass="phone-input-dropdown"
                searchClass="phone-input-search"
                enableSearch={true}
                searchPlaceholder="Search country"
                containerStyle={{
                  width: '100%',
                }}
                inputStyle={{
                  width: '100%',
                  height: '48px',
                  fontSize: '16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  paddingLeft: '48px',
                }}
                buttonStyle={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px 0 0 8px',
                  backgroundColor: 'white',
                }}
                dropdownStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
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
              <Select
                key={`country-${resetKey}`} // Force re-render only when form is reset
                options={countryOptions}
                value={countryOptions.find(option => option.value === formData.country) || null}
                onChange={handleCountryChange}
                placeholder="Select or search for your country..."
                isClearable
                isSearchable
                required
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: '48px',
                    border: state.isFocused ? '2px solid #00A8E1' : '2px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 168, 225, 0.1)' : 'none',
                    '&:hover': {
                      border: '2px solid #00A8E1',
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected 
                      ? '#00A8E1' 
                      : state.isFocused 
                      ? '#e0f2f7' 
                      : 'white',
                    color: state.isSelected ? 'white' : '#1e293b',
                    cursor: 'pointer',
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }),
                }}
              />
            </div>

            {/* Network Interest - Required */}
            <div>
              <label htmlFor="network_interest" className="block text-sm font-bold text-slate-900 mb-2">
                Which network are you interested in? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="network_interest"
                  name="network_interest"
                  value={formData.network_interest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none bg-white appearance-none pr-10"
                  style={{
                    backgroundImage: 'none',
                  }}
                >
                  <option value="">Select a network...</option>
                  {networkOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg 
                    className="w-5 h-5 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
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
              className="w-full text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(45deg, #7f30cb, #01dcba)'
              }}
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
    </>
  );
};

export default MembershipApplicationPage;
