import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

const phoneInputStyles = `
  .phone-input-container .react-tel-input .form-control:focus {
    border-color: #00A8E1 !important;
    box-shadow: 0 0 0 3px rgba(0, 168, 225, 0.1) !important;
    outline: none !important;
  }
  .phone-input-container .react-tel-input .flag-dropdown:hover,
  .phone-input-container .react-tel-input .flag-dropdown.open,
  .phone-input-container .react-tel-input .selected-flag:hover,
  .phone-input-container .react-tel-input .selected-flag:focus {
    background-color: #f8fafc !important;
  }
  .phone-input-container .react-tel-input .country-list {
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  .phone-input-container .react-tel-input .country-list .country:hover { background-color: #e0f2f7 !important; }
  .phone-input-container .react-tel-input .country-list .country.highlight { background-color: #00A8E1 !important; color: white !important; }
`;

const networkOptions = [
  { value: 'General Counsel Network', label: 'General Counsel Network' },
  { value: 'Senior In-House Counsel Network', label: 'Senior In-House Counsel Network' },
  { value: 'Life Sciences CEO Network', label: 'Life Sciences CEO Network' },
  { value: 'Risk Management Network', label: 'Risk Management Network' },
  { value: 'Senior Leaders Network', label: 'Senior Leaders Network' },
  { value: 'Next Gen GC Network', label: 'Next Gen GC Network' },
  { value: 'Not sure', label: 'Not sure' },
];

const countryOptions = [
  'United States','United Kingdom','Canada','Australia','Germany','France','Japan','China','India','Brazil','Mexico','Italy','Spain','South Korea','Netherlands','Switzerland','Sweden','Belgium','Poland','Austria','Norway','Denmark','Finland','Ireland','New Zealand','Singapore','Hong Kong','South Africa','United Arab Emirates','Saudi Arabia','Israel','Russia','Turkey','Argentina','Chile','Colombia','Peru','Venezuela','Indonesia','Malaysia','Thailand','Philippines','Vietnam','Pakistan','Bangladesh','Egypt','Nigeria','Kenya','Morocco','Ghana','Portugal','Greece','Czech Republic','Hungary','Romania','Ukraine','Luxembourg','Iceland','Malta','Cyprus',
].map((v) => ({ value: v, label: v })).sort((a, b) => a.label.localeCompare(b.label));

/**
 * The full Membership Application form.
 * Used by both /application (as a page body) and network pages (inside a modal).
 * @param {string} initialNetwork - optional Network label to pre-select (e.g. "General Counsel Network")
 * @param {boolean} compact - true when rendered inside a modal (removes outer heading & panel)
 */
const MembershipApplicationForm = ({ initialNetwork = '', compact = false }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    work_email: '',
    personal_email: '',
    phone_number: '',
    company_name: '',
    job_title: '',
    country: '',
    network_interest: initialNetwork ? [initialNetwork] : [],
    recommended_by: '',
    further_details: '',
    source_of_inquiry: 'Main website',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (initialNetwork) {
      setFormData((prev) =>
        prev.network_interest.includes(initialNetwork)
          ? prev
          : { ...prev, network_interest: [initialNetwork] }
      );
    }
  }, [initialNetwork]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhoneChange = (value) => setFormData((prev) => ({ ...prev, phone_number: '+' + value }));
  const handleCountryChange = (opt) => setFormData((prev) => ({ ...prev, country: opt ? opt.value : '' }));
  const handleNetworkChange = (opt) =>
    setFormData((prev) => ({ ...prev, network_interest: opt ? [opt.value] : [] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/membership/application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to submit application');
      setSubmitStatus('success');
      setFormData({
        full_name: '', work_email: '', personal_email: '', phone_number: '',
        company_name: '', job_title: '', country: '',
        network_interest: initialNetwork ? [initialNetwork] : [],
        recommended_by: '', further_details: '', source_of_inquiry: 'Main website', website: '',
      });
      setResetKey((k) => k + 1);
    } catch (err) {
      console.error('Error submitting application:', err);
      setSubmitStatus('error');
      const message = (err instanceof TypeError && err.message === 'Failed to fetch')
        ? 'Unable to reach the server. Please check your internet connection and try again.'
        : err.message || 'An error occurred while submitting your application. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = compact
    ? "w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none"
    : "w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#00A8E1] focus:ring-2 focus:ring-[#00A8E1]/20 transition-all duration-200 outline-none";
  const labelCls = compact
    ? "block text-xs font-semibold text-slate-900 mb-1"
    : "block text-sm font-bold text-slate-900 mb-2";
  const inputHeight = compact ? 40 : 48;
  const selectStyles = {
    control: (base, state) => ({
      ...base, minHeight: `${inputHeight}px`,
      border: state.isFocused ? '2px solid #00A8E1' : '2px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(0, 168, 225, 0.1)' : 'none',
      fontSize: compact ? '14px' : '16px',
      '&:hover': { border: '2px solid #00A8E1' },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#00A8E1' : state.isFocused ? '#e0f2f7' : 'white',
      color: state.isSelected ? 'white' : '#1e293b',
      cursor: 'pointer',
      fontSize: compact ? '14px' : '16px',
    }),
    menu: (base) => ({ ...base, borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }),
    multiValue: (base) => ({ ...base, backgroundColor: '#e0f2f7' }),
    multiValueLabel: (base) => ({ ...base, color: '#045184', fontWeight: '600' }),
    multiValueRemove: (base) => ({ ...base, color: '#045184', ':hover': { backgroundColor: '#00A8E1', color: 'white' } }),
  };

  const panelCls = compact
    ? ''
    : 'bg-white rounded-3xl p-4 md:p-8 md:p-6 md:p-12 shadow-xl';

  return (
    <>
      <style>{phoneInputStyles}</style>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
          <CheckCircle2 size={22} className="text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">Application submitted successfully!</p>
            <p className="text-green-700 text-sm mt-1">Thank you for your interest in joining The Vanguard Network. We have received your application and will be in touch soon.</p>
          </div>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle size={22} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Something went wrong</p>
            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <motion.div
        initial={compact ? false : { y: 30, opacity: 0 }}
        animate={compact ? false : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={panelCls}
      >
        <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-6"}>
          {/* Honeypot */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
            <label htmlFor="mem_website">Website (leave blank)</label>
            <input type="text" id="mem_website" name="website" value={formData.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
          </div>

          <div>
            <label htmlFor="full_name" className={labelCls}>Full Name <span className="text-red-500">*</span></label>
            <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required className={inputCls} placeholder="Enter your full name" />
          </div>

          <div className={compact ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
            <div>
              <label htmlFor="work_email" className={labelCls}>Work Email <span className="text-red-500">*</span></label>
              <input type="email" id="work_email" name="work_email" value={formData.work_email} onChange={handleChange} required className={inputCls} placeholder="your.name@company.com" />
            </div>
            {!compact && <div className="mt-0" />}
            <div className={compact ? "" : "mt-6"}>
              <label htmlFor="personal_email" className={labelCls}>Personal Email <span className="text-slate-400 font-normal">(Optional)</span></label>
              <input type="email" id="personal_email" name="personal_email" value={formData.personal_email} onChange={handleChange} className={inputCls} placeholder="your.name@email.com" />
            </div>
          </div>

          <div className={compact ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
            <div>
              <label htmlFor="phone_number" className={labelCls}>Phone Number <span className="text-red-500">*</span></label>
              <PhoneInput
                key={`phone-${resetKey}`}
                country={'us'} value={formData.phone_number} onChange={handlePhoneChange}
                inputProps={{ name: 'phone_number', required: true }}
                containerClass="phone-input-container" enableSearch searchPlaceholder="Search country"
                containerStyle={{ width: '100%' }}
                inputStyle={{ width: '100%', height: `${inputHeight}px`, fontSize: compact ? '14px' : '16px', border: '2px solid #e2e8f0', borderRadius: '8px', paddingLeft: '48px' }}
                buttonStyle={{ border: '2px solid #e2e8f0', borderRadius: '8px 0 0 8px', backgroundColor: 'white' }}
                dropdownStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
            </div>
            <div className={compact ? "" : "mt-6"}>
              <label htmlFor="country" className={labelCls}>Country <span className="text-red-500">*</span></label>
              <Select
                key={`country-${resetKey}`}
                options={countryOptions}
                value={countryOptions.find((o) => o.value === formData.country) || null}
                onChange={handleCountryChange}
                placeholder="Select or search for your country..." isClearable isSearchable required
                styles={selectStyles}
              />
            </div>
          </div>

          <div className={compact ? "grid grid-cols-1 md:grid-cols-2 gap-3" : ""}>
            <div>
              <label htmlFor="company_name" className={labelCls}>Company Name <span className="text-red-500">*</span></label>
              <input type="text" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required className={inputCls} placeholder="Your company name" />
            </div>
            <div className={compact ? "" : "mt-6"}>
              <label htmlFor="job_title" className={labelCls}>Job Title <span className="text-red-500">*</span></label>
              <input type="text" id="job_title" name="job_title" value={formData.job_title} onChange={handleChange} required className={inputCls} placeholder="Your job title" />
            </div>
          </div>

          <div>
            <label htmlFor="network_interest" className={labelCls}>
              Which network are you interested in? <span className="text-red-500">*</span>
            </label>
            <Select
              key={`network-${resetKey}`} options={networkOptions}
              value={networkOptions.find((o) => formData.network_interest.includes(o.value)) || null}
              onChange={handleNetworkChange}
              placeholder="Select a network..." isClearable isSearchable required
              styles={selectStyles}
            />
          </div>

          <div>
            <label htmlFor="recommended_by" className={labelCls}>Recommended By <span className="text-slate-400 font-normal">(Optional)</span></label>
            <input type="text" id="recommended_by" name="recommended_by" value={formData.recommended_by} onChange={handleChange} className={inputCls} placeholder="Who recommended you to apply?" />
          </div>

          <div>
            <label htmlFor="further_details" className={labelCls}>Further Details <span className="text-slate-400 font-normal">(Optional)</span></label>
            <textarea id="further_details" name="further_details" value={formData.further_details} onChange={handleChange} rows={compact ? 2 : 4} className={`${inputCls} resize-none`} placeholder="Add any additional details you'd like to share with us" />
          </div>

          <motion.button
            type="submit" disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full text-white ${compact ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'} rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? '' : 'bg-gradient-to-r from-[#045184] to-[#00A8E1]'}`}
            style={{ background: isSubmitting ? '#9ca3af' : undefined }}
          >
            {isSubmitting ? (<><Loader size={20} className="animate-spin" /> Submitting...</>) : 'Submit Application'}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default MembershipApplicationForm;
