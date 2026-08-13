import React, { useState } from 'react';
import Select from 'react-select';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const NETWORK_OPTIONS = [
  { value: 'General Counsel Network', label: 'General Counsel Network' },
  { value: 'Senior In-House Counsel Network', label: 'Senior In-House Counsel Network' },
  { value: 'Life Sciences CEO Network', label: 'Life Sciences CEO Network' },
  { value: 'Risk Management Network', label: 'Risk Management Network' },
  { value: 'Senior Leaders Network', label: 'Senior Leaders Network' },
  { value: 'Not sure', label: 'Not sure' },
];

const INTRO = "This exchange is for members of the above Vanguard network. Please complete the form below, and we'll follow up with details on how you can join this network. If you heard about us through someone else, please let us know.";

const initialState = {
  full_name: '',
  work_email: '',
  personal_email: '',
  phone: '',
  company: '',
  title: '',
  networks: [],
  recommended_by: '',
  message: '',
  website: '', // honeypot
};

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-[13px] font-semibold text-slate-800 mb-1">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = "w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent transition-all";

// react-select styles kept minimal + aligned with other inputs
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '34px',
    borderColor: state.isFocused ? 'transparent' : 'rgb(203 213 225)',
    boxShadow: state.isFocused ? '0 0 0 2px #00A8E1' : 'none',
    borderRadius: 6,
    fontSize: 14,
    '&:hover': { borderColor: state.isFocused ? 'transparent' : 'rgb(203 213 225)' },
  }),
  valueContainer: (base) => ({ ...base, padding: '2px 8px' }),
  placeholder: (base) => ({ ...base, color: '#94a3b8' }),
  multiValue: (base) => ({ ...base, backgroundColor: '#e0f2fe' }),
  multiValueLabel: (base) => ({ ...base, color: '#045184' }),
  // Portal-rendered menu must sit above the modal (z-100). Give it z-index 200.
  menuPortal: (base) => ({ ...base, zIndex: 200 }),
  menu: (base) => ({ ...base, zIndex: 200 }),
};

/**
 * Member-only network exchange form (used for GCX, RMX, LSCEOX).
 * `formKey` selects the destination on the backend.
 * The modal title (varies by network) is set in EventDetailsPage FORM_VARIANTS.
 */
const MemberNetworkForm = ({ event, formKey, onSuccess }) => {
  const [data, setData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!data.full_name.trim()) return 'Please enter your full name.';
    if (!data.work_email.trim()) return 'Please enter your work email.';
    if (!data.phone) return 'Please enter your phone number.';
    if (!isValidPhoneNumber(data.phone)) return 'Please enter a valid phone number.';
    if (!data.company.trim()) return 'Please enter your company.';
    if (!data.title.trim()) return 'Please enter your title.';
    if (!data.networks || data.networks.length === 0) return 'Please select at least one network.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) { setError(err); return; }

    setSubmitting(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const body = {
        form_key: formKey,
        event_record_id: event.id,
        series_code: event.series_code || null,
        clean_event_code: event.clean_event_code || null,
        website: data.website,
        fields: {
          full_name: data.full_name.trim(),
          work_email: data.work_email.trim(),
          personal_email: data.personal_email.trim(),
          phone: data.phone,
          company: data.company.trim(),
          title: data.title.trim(),
          networks: data.networks.map(n => n.value),  // multipleRecordLinks + typecast:true
          recommended_by: data.recommended_by.trim(),
          message: data.message.trim(),
        },
      };
      const res = await fetch(`${backendUrl}/api/events/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (ex) {
      console.error(ex);
      setError("We couldn't submit your request. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-6 text-center" data-testid="signup-form-success">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-4">✓</div>
        <p className="text-lg font-semibold text-slate-900 mb-2">Thank you for confirming your details.</p>
        <p className="text-slate-600">We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid="member-network-form" noValidate>
      <p className="text-slate-600 text-[13px] leading-snug">{INTRO}</p>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="mn_website">Website (leave blank)</label>
        <input type="text" id="mn_website" name="website" value={data.website} onChange={set('website')} tabIndex="-1" autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Full name" required>
          <input type="text" placeholder="Enter your full name" className={inputClass} value={data.full_name} onChange={set('full_name')} data-testid="signup-full-name" />
        </Field>
        <Field label="Work email" required>
          <input type="email" placeholder="your.name@company.com" className={inputClass} value={data.work_email} onChange={set('work_email')} data-testid="signup-work-email" />
        </Field>
        <Field label="Personal email (optional)">
          <input type="email" placeholder="your.name@email.com" className={inputClass} value={data.personal_email} onChange={set('personal_email')} />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Phone" required>
          <PhoneInput
            international
            defaultCountry="US"
            value={data.phone}
            onChange={(value) => setData(prev => ({ ...prev, phone: value || '' }))}
            className="signup-phone-input"
            data-testid="signup-phone"
          />
        </Field>
        <Field label="Company" required>
          <input type="text" placeholder="Your company name" className={inputClass} value={data.company} onChange={set('company')} />
        </Field>
        <Field label="Title" required>
          <input type="text" placeholder="Your job title" className={inputClass} value={data.title} onChange={set('title')} />
        </Field>
      </div>

      <Field label="Which network are you interested in?" required>
        <Select
          isMulti
          options={NETWORK_OPTIONS}
          value={data.networks}
          onChange={(vals) => setData(prev => ({ ...prev, networks: vals || [] }))}
          placeholder="Select one or more network(s) you are interested in"
          styles={selectStyles}
          classNamePrefix="signup-networks"
          menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
          menuPosition="fixed"
          data-testid="signup-networks"
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Recommended by (optional)">
          <input type="text" placeholder="How you heard about us" className={inputClass} value={data.recommended_by} onChange={set('recommended_by')} />
        </Field>
        <Field label="Message (optional)">
          <input type="text" placeholder="Anything else we should know" className={inputClass} value={data.message} onChange={set('message')} />
        </Field>
      </div>

      {error && <div className="text-sm text-red-600 py-1" role="alert">{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#00A8E1' }}
        onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = '#0096C7')}
        onMouseLeave={(e) => !submitting && (e.currentTarget.style.backgroundColor = '#00A8E1')}
        data-testid="signup-submit-btn"
      >
        {submitting ? 'Submitting…' : 'Submit'}
      </button>

      <style>{`
        .signup-phone-input {
          display: flex; gap: 6px; align-items: center;
          padding: 6px 12px;
          border: 1px solid rgb(203 213 225);
          border-radius: 6px;
          background: #fff;
        }
        .signup-phone-input:focus-within {
          outline: none;
          border-color: transparent;
          box-shadow: 0 0 0 2px #00A8E1;
        }
        .signup-phone-input .PhoneInputCountry { margin-right: 4px; }
        .signup-phone-input .PhoneInputInput {
          border: none; outline: none; background: transparent;
          font-size: 14px; width: 100%; padding: 2px 0;
        }
      `}</style>
    </form>
  );
};

export default MemberNetworkForm;
