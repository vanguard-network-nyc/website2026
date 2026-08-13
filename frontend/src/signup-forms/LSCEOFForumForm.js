import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Airtable singleSelect options (exact match required for no auto-create pollution).
const COMPANY_STATUS_OPTIONS = [
  'Pre-revenue, pre-clinical trials',
  'Pre-revenue, in clinical trials',
  'Post-revenue',
];

const NUM_EMPLOYEES_OPTIONS = [
  '1',
  '2 to 10',
  '10 to 50',
  '50 to 100',
  '100 to 500',
  '500 to 5,000',
  '5,000 to 10,000',
  '10,000 to 50,000',
  '50,000 plus',
];

const INTRO_MARKDOWN = `Please fill out the form below so that we can reserve a place for you at the forum for Life Sciences CEOs. We will also include a 1-year complimentary membership of the Vanguard Network for Life Sciences CEOs. Fees are based on your company's current status:

- Pre-revenue, pre-clinical trial: **$1,500**
- Pre-revenue in clinical trial: **$3,000**
- Post-revenue: **$5,000**`;

const TRIAL_CHECKBOX_MARKDOWN = `Our events are for Vanguard members. Please confirm that, if you are not a member, you are comfortable with us signing you up to a 1-year complimentary membership. Benefits include:

- Two in-person Life Sciences CEO forums per year (including this one)
- Quarterly virtual exchanges with Life Sciences CEOs
- Monthly "unlocking leadership" sessions with top leaders discussing real-time topics
- On-demand access to proprietary high-performance leadership content by leading executives
- An active network of supportive peers.`;

const initialState = {
  full_name: '',
  work_email: '',
  personal_email: '',
  company: '',
  title: '',
  phone: '',
  company_status: '',
  number_of_employees: '',
  ea_email: '',
  recommended_by: '',
  message: '',
  promo_code: '',
  ok_trial: false,
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

const LSCEOFForumForm = ({ event, onSuccess }) => {
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
    if (!data.company.trim()) return 'Please enter your company.';
    if (!data.title.trim()) return 'Please enter your title.';
    if (!data.phone) return 'Please enter your phone number.';
    if (!isValidPhoneNumber(data.phone)) return 'Please enter a valid phone number.';
    if (!data.company_status) return 'Please select your company status.';
    if (!data.number_of_employees) return 'Please select the number of employees.';
    if (!data.ok_trial) return 'Please check the box to continue.';
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
        form_key: 'lsceof_forum',
        event_record_id: event.id,
        series_code: event.series_code || null,
        clean_event_code: event.clean_event_code || null,
        website: data.website,
        fields: {
          full_name: data.full_name.trim(),
          work_email: data.work_email.trim(),
          personal_email: data.personal_email.trim(),
          company: data.company.trim(),
          title: data.title.trim(),
          phone: data.phone,
          company_status: data.company_status,
          number_of_employees: data.number_of_employees,
          ea_email: data.ea_email.trim(),
          recommended_by: data.recommended_by.trim(),
          message: data.message.trim(),
          promo_code: data.promo_code.trim(),
          ok_trial: data.ok_trial,
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

  const mdParagraph = ({ node, ...props }) => <p className="mb-2" {...props} />;
  const mdList = ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-0.5" {...props} />;
  const mdStrong = ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid="lsceof-forum-form" noValidate>
      <div className="text-slate-600 text-[13px] leading-snug">
        <ReactMarkdown components={{ p: mdParagraph, ul: mdList, strong: mdStrong }}>
          {INTRO_MARKDOWN}
        </ReactMarkdown>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="lsceof_website">Website (leave blank)</label>
        <input type="text" id="lsceof_website" name="website" value={data.website} onChange={set('website')} tabIndex="-1" autoComplete="off" />
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
        <Field label="Company" required>
          <input type="text" placeholder="Your company name" className={inputClass} value={data.company} onChange={set('company')} />
        </Field>
        <Field label="Title" required>
          <input type="text" placeholder="Your job title" className={inputClass} value={data.title} onChange={set('title')} />
        </Field>
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
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Company Status" required>
          <select className={inputClass} value={data.company_status} onChange={set('company_status')} data-testid="signup-company-status">
            <option value="">Current stage of your company</option>
            {COMPANY_STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Field>
        <Field label="Number of Employees" required>
          <select className={inputClass} value={data.number_of_employees} onChange={set('number_of_employees')} data-testid="signup-num-employees">
            <option value="">Select number of employees</option>
            {NUM_EMPLOYEES_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Field>
        <Field label="Executive Assistant email (optional)">
          <input type="email" placeholder="Your assistant's email" className={inputClass} value={data.ea_email} onChange={set('ea_email')} />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Recommended by (optional)">
          <input type="text" placeholder="How you heard about us" className={inputClass} value={data.recommended_by} onChange={set('recommended_by')} />
        </Field>
        <Field label="Promo code (optional)">
          <input type="text" placeholder="Cannot be combined with any other credits or offers." className={inputClass} value={data.promo_code} onChange={set('promo_code')} data-testid="signup-promo-code" />
        </Field>
      </div>

      <Field label="Message (optional)">
        <textarea rows={2} placeholder="Use this space to ask questions or recommend other C-suite colleagues you think would compliment the conversation." className={inputClass} value={data.message} onChange={set('message')} />
      </Field>

      <label className="flex items-start gap-2 text-[13px] text-slate-700 pt-1">
        <input type="checkbox" className="mt-1 flex-shrink-0" checked={data.ok_trial} onChange={set('ok_trial')} data-testid="signup-ok-trial" />
        <span className="flex-1">
          <div className="mb-1">
            <ReactMarkdown components={{ p: mdParagraph, ul: mdList, strong: mdStrong }}>
              {TRIAL_CHECKBOX_MARKDOWN}
            </ReactMarkdown>
          </div>
          <span className="text-red-500">*</span>
        </span>
      </label>

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

      {/* Phone input styling to match other fields */}
      <style>{`
        .signup-phone-input {
          display: flex;
          gap: 6px;
          align-items: center;
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
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          width: 100%;
          padding: 2px 0;
        }
      `}</style>
    </form>
  );
};

export default LSCEOFForumForm;
