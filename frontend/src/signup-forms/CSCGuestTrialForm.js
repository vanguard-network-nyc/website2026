import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Exact Airtable singleSelect option labels for "Self Qualification for membership"
const SELF_QUAL_YES = 'Yes - I am a Board Member/CEO/C-Suite/Direct report to C-suite';
const SELF_QUAL_NO = 'No - I am NOT a Board Member/CEO/C-Suite/Direct report to C-suite';

const COMPANY_SIZE_OPTIONS = [
  'Pre-Revenue',
  'Less Than $40Million in revenue',
  '$40Million to $1Billion in revenue',
  '$1Billion plus in revenue',
];

const INTRO_MARKDOWN = `Please complete the form below, and we'll follow up with event details.

**New to the Vanguard Network?**
You're welcome to attend up to three of our "Unlocking Leadership" webinars to get to know our community. After that, membership is required to participate in additional events or programs. We kindly ask that all guests sign up for our mailing list by checking the box below — it helps us keep you informed and ensure a smooth experience.

The Vanguard Network welcomes executives in leadership roles at companies with more than five employees, including: Board Members, CEOs, C-suite executives and direct reports to the C-suite.`;

const TRIAL_CHECKBOX_LABEL = "Our events are designed for Vanguard Network members. If you're not yet a member, you're welcome to attend up to three of our virtual Unlocking Leadership events as a guest. We simply ask that you join our mailing list by checking the box.";

const initialState = {
  self_qualification: '',
  full_name: '',
  work_email: '',
  personal_email: '',
  company: '',
  title: '',
  phone: '',
  company_size: '',
  ea_email: '',
  recommended_by: '',
  message: '',
  ok_trial: false,
  website: '', // honeypot
};

const Field = ({ label, required, caption, children }) => (
  <div>
    <label className="block text-[13px] font-semibold text-slate-800 mb-0.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {caption && <p className="text-[11px] text-slate-500 mb-1">{caption}</p>}
    {children}
  </div>
);

const inputClass = "w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent transition-all";

const CSCGuestTrialForm = ({ event, onSuccess }) => {
  const [data, setData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!data.self_qualification) return 'Please answer the eligibility question.';
    if (!data.full_name.trim()) return 'Please enter your full name.';
    if (!data.work_email.trim()) return 'Please enter your work email.';
    if (!data.company.trim()) return 'Please enter your company.';
    if (!data.title.trim()) return 'Please enter your title.';
    if (!data.phone.trim()) return 'Please enter your phone number.';
    // Phone validation:
    //   • US format: exactly 10 digits after stripping formatting (spaces, dashes, parens, dots).
    //   • International: prefix with '+' followed by 8–15 digits (E.164).
    const raw = data.phone.trim();
    const digits = raw.replace(/\D/g, '');
    if (raw.startsWith('+')) {
      if (digits.length < 8 || digits.length > 15) {
        return 'Please enter a valid international phone number (include country code, e.g. +44 20 7946 0958).';
      }
    } else if (digits.length !== 10) {
      return 'Please enter a valid 10-digit US phone number (e.g. 555-123-4567). For international numbers, prefix with country code (e.g. +44…).';
    }
    if (!data.company_size) return 'Please select your company revenue.';
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
        form_key: 'csc_guest_trial',
        event_record_id: event.id,
        series_code: event.series_code || null,
        clean_event_code: event.clean_event_code || null,
        website: data.website,
        fields: {
          self_qualification: data.self_qualification === 'yes' ? SELF_QUAL_YES : SELF_QUAL_NO,
          full_name: data.full_name.trim(),
          work_email: data.work_email.trim(),
          personal_email: data.personal_email.trim(),
          company: data.company.trim(),
          title: data.title.trim(),
          phone: data.phone.trim(),
          company_size: data.company_size,
          ea_email: data.ea_email.trim(),
          recommended_by: data.recommended_by.trim(),
          message: data.message.trim(),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid="csc-guest-trial-form" noValidate>
      <div className="prose prose-sm max-w-none text-slate-600 text-[13px] leading-snug">
        <ReactMarkdown>{INTRO_MARKDOWN}</ReactMarkdown>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="csc_website">Website (leave blank)</label>
        <input type="text" id="csc_website" name="website" value={data.website} onChange={set('website')} tabIndex="-1" autoComplete="off" />
      </div>

      <Field label="Do you meet the Vanguard membership eligibility criteria? (See above)" required>
        <div className="flex gap-4 mt-1">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="radio" name="self_qualification" value="yes" checked={data.self_qualification === 'yes'} onChange={set('self_qualification')} />
            Yes
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="radio" name="self_qualification" value="no" checked={data.self_qualification === 'no'} onChange={set('self_qualification')} />
            No
          </label>
        </div>
      </Field>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Full name" required>
          <input type="text" className={inputClass} value={data.full_name} onChange={set('full_name')} data-testid="signup-full-name" />
        </Field>
        <Field label="Work email" required caption="For general communications">
          <input type="email" className={inputClass} value={data.work_email} onChange={set('work_email')} data-testid="signup-work-email" />
        </Field>
        <Field label="Personal email" caption="Recommended for continuity and membership">
          <input type="email" className={inputClass} value={data.personal_email} onChange={set('personal_email')} />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Company" required>
          <input type="text" className={inputClass} value={data.company} onChange={set('company')} />
        </Field>
        <Field label="Title" required>
          <input type="text" className={inputClass} value={data.title} onChange={set('title')} />
        </Field>
        <Field label="Phone" required caption="10-digit US number or +country code for international">
          <input type="tel" className={inputClass} value={data.phone} onChange={set('phone')} placeholder="555-123-4567" data-testid="signup-phone" />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Company Revenue" required caption="Select company size by revenue">
          <select className={inputClass} value={data.company_size} onChange={set('company_size')} data-testid="signup-company-size">
            <option value="">— Select —</option>
            {COMPANY_SIZE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Field>
        <Field label="Executive Assistant email">
          <input type="email" className={inputClass} value={data.ea_email} onChange={set('ea_email')} />
        </Field>
        <Field label="Recommended by">
          <input type="text" className={inputClass} value={data.recommended_by} onChange={set('recommended_by')} />
        </Field>
      </div>

      <Field label="Message">
        <textarea rows={2} className={inputClass} value={data.message} onChange={set('message')} />
      </Field>

      <label className="flex items-start gap-2 text-[13px] text-slate-700 pt-1">
        <input type="checkbox" className="mt-1 flex-shrink-0" checked={data.ok_trial} onChange={set('ok_trial')} data-testid="signup-ok-trial" />
        <span>{TRIAL_CHECKBOX_LABEL}<span className="text-red-500 ml-0.5">*</span></span>
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
    </form>
  );
};

export default CSCGuestTrialForm;
