import React, { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const INTRO_PARAGRAPHS = [
  "Starting February 1, 2027, the Vanguard Next Gen GC Program will return as a six-module accelerator for high-potential in-house counsel preparing for the General Counsel role.",
  "Across six modules, participants learn directly from sitting and former General Counsel, senior executives, and peers how to navigate the real-world demands of the GC seat — from working with the CEO and Board, to joining the top leadership team, building legal department culture, strengthening EQ, and leading through complexity.",
  "The 2027 program will also bring greater focus to the issues reshaping the future GC role, including AI adoption, legal department transformation, business acumen, agility, and decision-making in uncertain environments.",
  "GCs: Please nominate your participant(s) below. Space will be limited to a maximum of 16 seats. If you are still deciding, we can pencil in a seat while you confirm the right candidate.",
  "You may also contact Tony Powe directly to discuss further, at tony@vanguardgroup.nyc or simply send Tony your nominee's email address and we can take care of the rest.",
];

const MORE_DETAILS_URL = "https://members.thevanguardnetwork.com/next-gen-gc";

const initialState = {
  gc_full_name: '',
  gc_email: '',
  participant_first_name: '',
  participant_last_name: '',
  participant_email: '',
  participant_title: '',
  participant_company: '',
  participant_phone: '',
  additional_info: '',
  website: '', // honeypot
};

const Field = ({ label, required, caption, children }) => (
  <div>
    <label className="block text-[13px] font-semibold text-slate-800 mb-0.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {caption && <p className="text-[11px] text-slate-500 mb-1 leading-tight">{caption}</p>}
    {children}
  </div>
);

const inputClass = "w-full px-3 py-1.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E1] focus:border-transparent transition-all";

const NGGCNominationForm = ({ event, formKey, onSuccess }) => {
  const [data, setData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!data.gc_full_name.trim()) return "Please enter the GC's full name.";
    if (!data.gc_email.trim()) return "Please enter the GC's email.";
    if (!data.participant_first_name.trim()) return "Please enter the participant's first name.";
    if (!data.participant_last_name.trim()) return "Please enter the participant's last name.";
    if (!data.participant_email.trim()) return "Please enter the participant's email.";
    if (!data.participant_title.trim()) return "Please enter the participant's title.";
    if (!data.participant_company.trim()) return "Please enter the participant's company.";
    if (!data.participant_phone) return "Please enter the participant's phone number.";
    if (!isValidPhoneNumber(data.participant_phone)) return 'Please enter a valid phone number.';
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
        form_key: formKey || 'nggc-nomination-form',
        event_record_id: event?.id || null,
        series_code: event?.series_code || null,
        clean_event_code: event?.clean_event_code || null,
        website: data.website,
        fields: {
          gc_full_name: data.gc_full_name.trim(),
          gc_email: data.gc_email.trim(),
          participant_first_name: data.participant_first_name.trim(),
          participant_last_name: data.participant_last_name.trim(),
          participant_email: data.participant_email.trim(),
          participant_title: data.participant_title.trim(),
          participant_company: data.participant_company.trim(),
          participant_phone: data.participant_phone,
          additional_info: data.additional_info.trim(),
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
      setError("We couldn't submit your nomination. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setData(initialState);
    setError(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="py-6 text-center" data-testid="signup-form-success">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mb-4">✓</div>
        <p className="text-lg font-semibold text-slate-900 mb-2">Thank you!</p>
        <p className="text-slate-600 mb-6">
          If you would like to nominate a second candidate please submit the form again.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: '#00A8E1' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0096C7')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00A8E1')}
          data-testid="signup-submit-another-btn"
        >
          Submit another nomination
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid="nggc-nomination-form" noValidate>
      <div className="text-slate-600 text-[13px] leading-snug space-y-2">
        {INTRO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
        <p><a href={MORE_DETAILS_URL} target="_blank" rel="noopener noreferrer" className="text-[#00A8E1] hover:text-[#0096C7] underline">More details here</a>.</p>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="nggc_website">Website (leave blank)</label>
        <input type="text" id="nggc_website" name="website" value={data.website} onChange={set('website')} tabIndex="-1" autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Full name of GC" required caption="If you are self-nominating please confirm your GC's name for follow-up">
          <input type="text" placeholder="Enter your GC's full name" className={inputClass} value={data.gc_full_name} onChange={set('gc_full_name')} data-testid="signup-gc-name" />
        </Field>
        <Field label="Email of GC" required caption="If you are self-nominating please confirm your GC's email for follow-up">
          <input type="email" placeholder="gc.name@company.com" className={inputClass} value={data.gc_email} onChange={set('gc_email')} data-testid="signup-gc-email" />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="First name of participant" required>
          <input type="text" placeholder="First name" className={inputClass} value={data.participant_first_name} onChange={set('participant_first_name')} />
        </Field>
        <Field label="Last name of participant" required>
          <input type="text" placeholder="Last name" className={inputClass} value={data.participant_last_name} onChange={set('participant_last_name')} />
        </Field>
      </div>

      <Field label="Email address of participant" required>
        <input type="email" placeholder="participant.name@company.com" className={inputClass} value={data.participant_email} onChange={set('participant_email')} />
      </Field>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Current title of participant" required>
          <input type="text" placeholder="Participant's job title" className={inputClass} value={data.participant_title} onChange={set('participant_title')} />
        </Field>
        <Field label="Current company of participant" required>
          <input type="text" placeholder="Participant's company" className={inputClass} value={data.participant_company} onChange={set('participant_company')} />
        </Field>
      </div>

      <Field label="Participant's phone number" required caption="Best number to reach the participant on">
        <PhoneInput
          international
          defaultCountry="US"
          value={data.participant_phone}
          onChange={(value) => setData(prev => ({ ...prev, participant_phone: value || '' }))}
          className="signup-phone-input"
          data-testid="signup-participant-phone"
        />
      </Field>

      <Field label="Additional information to be considered (optional)">
        <textarea rows={3} placeholder="Anything else we should know about this nominee" className={inputClass} value={data.additional_info} onChange={set('additional_info')} />
      </Field>

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
        {submitting ? 'Submitting…' : 'Submit Nomination'}
      </button>

      <style>{`
        .signup-phone-input { display: flex; gap: 6px; align-items: center; padding: 6px 12px; border: 1px solid rgb(203 213 225); border-radius: 6px; background: #fff; }
        .signup-phone-input:focus-within { outline: none; border-color: transparent; box-shadow: 0 0 0 2px #00A8E1; }
        .signup-phone-input .PhoneInputCountry { margin-right: 4px; }
        .signup-phone-input .PhoneInputInput { border: none; outline: none; background: transparent; font-size: 14px; width: 100%; padding: 2px 0; }
      `}</style>
    </form>
  );
};

export default NGGCNominationForm;
