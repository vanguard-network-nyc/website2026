import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

/**
 * Life Sciences CEO Network Grant Application form.
 * Two-branch conditional flow:
 *   section1 -> if any yes/no answered "no" -> ineligible ending
 *            -> if all yes/no answered "yes" -> section2 -> submit -> success ending
 * Submissions POST to REACT_APP_LSCEO_GRANT_SHEETS_URL (Google Apps Script Web App).
 */

const BERKLEY_LOGO_URL =
  'https://customer-assets-rejwkqb3.emergentagent.net/job_95c11ed2-04fc-4e03-90f5-5a9265b65d8d/artifacts/i9ihq5w3_berkley.jpeg';

const SUBMIT_URL = `${process.env.REACT_APP_BACKEND_URL || ''}/api/lsceo-grant/submit`;
const GRANT_PAGE_URL = '/life-sciences-ceo/grant';
const NETWORK_PAGE_URL = '/networks/life-sciences-ceo-network';

const labelCls = 'block text-sm font-semibold text-slate-700 mb-2';
const inputCls =
  'w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#00A8E1] transition-colors text-slate-900 placeholder-slate-400';
const helpCls = 'text-xs text-slate-500 mt-1';

const phoneInputStyles = `
  .phone-input-container .react-tel-input .form-control:focus {
    outline: none; border-color: #00A8E1 !important; box-shadow: none;
  }
  .phone-input-container .react-tel-input .flag-dropdown:hover,
  .phone-input-container .react-tel-input .flag-dropdown.open,
  .phone-input-container .react-tel-input .selected-flag:hover,
  .phone-input-container .react-tel-input .selected-flag:focus {
    background: transparent !important;
  }
  .phone-input-container .react-tel-input .country-list {
    border-radius: 0.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  }
  .phone-input-container .react-tel-input .country-list .country:hover { background-color: #e0f2f7 !important; }
  .phone-input-container .react-tel-input .country-list .country.highlight { background-color: #00A8E1 !important; color: white !important; }
`;

const YesNo = ({ id, label, value, onChange, testId }) => (
  <div>
    <div id={id} className={labelCls}>
      {label} <span className="text-red-500">*</span>
    </div>
    <div className="flex gap-3">
      {['Yes', 'No'].map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={`flex-1 cursor-pointer border-2 rounded-lg px-4 py-3 text-center font-semibold transition-colors ${
              selected
                ? 'border-[#00A8E1] bg-[#00A8E1] text-white'
                : 'border-slate-200 text-slate-700 hover:border-[#00A8E1] hover:text-[#00A8E1]'
            }`}
            data-testid={`${testId}-${opt.toLowerCase()}`}
          >
            <input
              type="radio"
              name={id}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              className="sr-only"
              required
            />
            {opt}
          </label>
        );
      })}
    </div>
  </div>
);

const initialData = {
  // Section 1
  fullName: '',
  email: '',
  companyName: '',
  jobTitle: '',
  incorporated: '',
  pipeline: '',
  preRevenue: '',
  employees4Plus: '',
  // Section 2
  companyWebsite: '',
  companyAddress: '',
  phoneNumber: '',
  mission: '',
  productPipeline: '',
  teamRoles: '',
  networkContribution: '',
  signature: '',
  commitToParticipate: false,
  accurateApplication: false,
};

const wordCount = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;

// Normalize whatever the applicant typed into a submittable URL string.
// Accepts: "ibm.com", "www.ibm.com", "http://ibm.com", "https://www.ibm.com/careers".
// Leaves empty string as empty.
const normalizeUrl = (raw) => {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
};

const Header = () => (
  <div className="mb-6 pb-6 border-b border-slate-200" data-testid="grant-form-header">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Thanks to our sponsor
      </p>
      <img
        src={BERKLEY_LOGO_URL}
        alt="Berkley Lifesciences"
        className="h-14 md:h-16 mx-auto object-contain"
      />
    </div>
  </div>
);

const LSCEOGrantForm = ({ onClose }) => {
  const [step, setStep] = useState('section1'); // section1 | ineligible | section2 | success
  const [data, setData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k) => (v) => setData((prev) => ({ ...prev, [k]: v }));
  const setEvt = (k) => (e) => set(k)(e.target.value);
  const setChk = (k) => (e) => set(k)(e.target.checked);

  const yesNoAnswers = [data.incorporated, data.pipeline, data.preRevenue, data.employees4Plus];

  const handleSection1Continue = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (yesNoAnswers.includes('')) {
      setErrorMsg('Please answer all eligibility questions.');
      return;
    }
    const ineligible = yesNoAnswers.some((a) => a === 'No');
    const scrollTop = () =>
      document.querySelector('[data-testid="signup-modal"] > div:last-child')?.scrollTo({ top: 0 });

    if (!ineligible) {
      // Eligible applicants will submit once after Section 2 — no double write.
      setStep('section2');
      scrollTop();
      return;
    }

    // Ineligible — record the partial submission before showing the ending.
    setSubmitting(true);
    try {
      await submitToSheets();
      setStep('ineligible');
      scrollTop();
    } catch (err) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitToSheets = async () => {
    // Column order must match the existing "2026" tab header row (col 2 onwards).
    const payload = {
      fullName: data.fullName.trim(),
      jobTitle: data.jobTitle.trim(),
      companyName: data.companyName.trim(),
      companyWebsite: normalizeUrl(data.companyWebsite),
      companyAddress: data.companyAddress.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber ? `+${String(data.phoneNumber).replace(/^\+/, '')}` : '',
      incorporated: data.incorporated,
      pipeline: data.pipeline,
      preRevenue: data.preRevenue,
      employees4Plus: data.employees4Plus,
      mission: data.mission.trim(),
      productPipeline: data.productPipeline.trim(),
      teamRoles: data.teamRoles.trim(),
      networkContribution: data.networkContribution.trim(),
      signature: data.signature.trim(),
      todayDate: new Date().toISOString(),
      commitToParticipate: data.commitToParticipate ? 'Yes' : 'No',
      accurateApplication: data.accurateApplication ? 'Yes' : 'No',
      softrRecordId: '',
    };

    if (!SUBMIT_URL) throw new Error('Submit URL not configured.');

    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let body = null;
    try { body = await res.json(); } catch (_) { /* non-json response */ }
    if (!res.ok || !body || body.ok !== true) {
      const detail = (body && body.error) || 'Something went wrong submitting your application.';
      throw new Error(detail);
    }
  };

  const handleSection2Submit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!data.commitToParticipate || !data.accurateApplication) {
      setErrorMsg('Please accept both confirmations before submitting.');
      return;
    }
    if (wordCount(data.mission) > 250) {
      setErrorMsg('Company mission answer exceeds 250 words. Please shorten.');
      return;
    }
    setSubmitting(true);
    try {
      await submitToSheets();
      setStep('success');
      document.querySelector('[data-testid="signup-modal"] > div:last-child')?.scrollTo({ top: 0 });
    } catch (err) {
      setErrorMsg(err?.message || 'Something went wrong submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Section 1: eligibility ------------------------------------------------
  if (step === 'section1') {
    return (
      <form onSubmit={handleSection1Continue} data-testid="grant-form-section1" className="space-y-6">
        <style>{phoneInputStyles}</style>
        <Header />
        <div className="space-y-3 text-slate-700 leading-relaxed">
          <p>We invite you to apply for a Life Sciences CEO Network Membership grant.</p>
          <p>
            Grants are for pre-revenue companies and cover <strong>100% of membership fees for a year</strong>.
            Applications must reach us by <strong>March 31, 2027</strong>. To verify eligibility first, please
            answer the questions below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className={labelCls}>Full name <span className="text-red-500">*</span></label>
            <input id="fullName" type="text" required value={data.fullName} onChange={setEvt('fullName')} className={inputCls} data-testid="grant-fullName" />
          </div>
          <div>
            <label htmlFor="email" className={labelCls}>Work email <span className="text-red-500">*</span></label>
            <input id="email" type="email" required value={data.email} onChange={setEvt('email')} className={inputCls} data-testid="grant-email" />
          </div>
          <div>
            <label htmlFor="companyName" className={labelCls}>Company name <span className="text-red-500">*</span></label>
            <input id="companyName" type="text" required value={data.companyName} onChange={setEvt('companyName')} className={inputCls} data-testid="grant-companyName" />
          </div>
          <div>
            <label htmlFor="jobTitle" className={labelCls}>Your current job title <span className="text-red-500">*</span></label>
            <input id="jobTitle" type="text" required value={data.jobTitle} onChange={setEvt('jobTitle')} className={inputCls} data-testid="grant-jobTitle" />
          </div>
        </div>

        <div className="space-y-5">
          <YesNo id="incorporated" testId="grant-incorporated"
            label="Is your company legally incorporated?"
            value={data.incorporated} onChange={set('incorporated')} />
          <YesNo id="pipeline" testId="grant-pipeline"
            label="Does your company have a pipeline of therapeutic, diagnostic, or medical device candidates OR has it initiated clinical trials?"
            value={data.pipeline} onChange={set('pipeline')} />
          <YesNo id="preRevenue" testId="grant-preRevenue"
            label="Is your company in the pre-revenue stage?"
            value={data.preRevenue} onChange={set('preRevenue')} />
          <YesNo id="employees4Plus" testId="grant-employees"
            label="Does your company employ more than 4 people?"
            value={data.employees4Plus} onChange={set('employees4Plus')} />
        </div>

        {errorMsg && (
          <div className="text-red-600 text-sm flex items-center gap-2" data-testid="grant-error">
            <AlertTriangle size={16} /> {errorMsg}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={submitting}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            data-testid="grant-continue-btn">
            {submitting ? (<><Loader2 size={20} className="animate-spin" /> Saving…</>) : (<>Continue <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" /></>)}
          </button>
        </div>
      </form>
    );
  }

  // --- Ineligible ending -----------------------------------------------------
  if (step === 'ineligible') {
    return (
      <div className="py-6 text-center" data-testid="grant-form-ineligible">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
          <AlertTriangle size={26} className="text-amber-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#045184] mb-3">Thanks for your interest</h3>
        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          Based on your answers, your company may not be eligible for a grant. If your company becomes
          eligible in the future, please come back and answer the eligibility questions again.
        </p>
        <a href={GRANT_PAGE_URL} onClick={onClose}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          data-testid="grant-return-btn">
          Return to Grant page
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    );
  }

  // --- Success ending --------------------------------------------------------
  if (step === 'success') {
    return (
      <div className="py-6 text-center" data-testid="grant-form-success">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#045184] mb-3">Application received</h3>
        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          We appreciate you taking the time to complete this form. We&apos;ll be in touch shortly.
        </p>
        <a href={NETWORK_PAGE_URL} onClick={onClose}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          data-testid="grant-network-btn">
          Return to the Life Sciences CEO Network
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    );
  }

  // --- Section 2: full application ------------------------------------------
  return (
    <form onSubmit={handleSection2Submit} data-testid="grant-form-section2" className="space-y-6">
      <style>{phoneInputStyles}</style>
      <Header />
      <p className="text-slate-700 leading-relaxed">
        Based on your previous answers, your company is eligible for a grant. Please continue the application
        by answering the remaining questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="companyWebsite" className={labelCls}>Company website <span className="text-red-500">*</span></label>
          <input
            id="companyWebsite"
            type="text"
            required
            value={data.companyWebsite}
            onChange={setEvt('companyWebsite')}
            className={inputCls}
            placeholder="e.g. www.example.com"
            data-testid="grant-companyWebsite"
          />
        </div>
        <div>
          <label htmlFor="companyAddress" className={labelCls}>Company address <span className="text-red-500">*</span></label>
          <input id="companyAddress" type="text" required value={data.companyAddress} onChange={setEvt('companyAddress')} className={inputCls} data-testid="grant-companyAddress" />
        </div>
        <div className="md:col-span-2 phone-input-container">
          <label className={labelCls}>Phone number <span className="text-red-500">*</span></label>
          <PhoneInput
            country={'us'}
            value={data.phoneNumber}
            onChange={(v) => set('phoneNumber')(v)}
            inputProps={{ name: 'phoneNumber', required: true, 'data-testid': 'grant-phoneNumber' }}
            inputStyle={{ width: '100%', height: '48px', fontSize: '15px', borderRadius: '0.5rem', border: '2px solid #e2e8f0' }}
            buttonStyle={{ borderRadius: '0.5rem 0 0 0.5rem', border: '2px solid #e2e8f0', borderRight: 'none', background: 'transparent' }}
            containerStyle={{ width: '100%' }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="mission" className={labelCls}>
          Briefly describe your company&apos;s mission and focus area <span className="text-red-500">*</span>
        </label>
        <textarea id="mission" required rows={4} value={data.mission} onChange={setEvt('mission')} className={inputCls} data-testid="grant-mission" />
        <p className={helpCls}>Enter your answer (250 words max) — {wordCount(data.mission)} / 250</p>
      </div>

      <div>
        <label htmlFor="productPipeline" className={labelCls}>
          Provide an overview of your product pipeline and current development stage (e.g., preclinical, Phase 1, Phase 2, etc.) <span className="text-red-500">*</span>
        </label>
        <textarea id="productPipeline" required rows={4} value={data.productPipeline} onChange={setEvt('productPipeline')} className={inputCls} data-testid="grant-productPipeline" />
      </div>

      <div>
        <label htmlFor="teamRoles" className={labelCls}>List key team members and their roles <span className="text-red-500">*</span></label>
        <textarea id="teamRoles" required rows={4} value={data.teamRoles} onChange={setEvt('teamRoles')} className={inputCls} data-testid="grant-teamRoles" />
      </div>

      <div>
        <label htmlFor="networkContribution" className={labelCls}>
          How do you see yourself getting the most value out of the Network (e.g., mentorship, collaboration, knowledge-sharing)? <span className="text-red-500">*</span>
        </label>
        <textarea id="networkContribution" required rows={4} value={data.networkContribution} onChange={setEvt('networkContribution')} className={inputCls} data-testid="grant-networkContribution" />
      </div>

      <div>
        <label htmlFor="signature" className={labelCls}>Signature <span className="text-red-500">*</span></label>
        <input id="signature" type="text" required value={data.signature} onChange={setEvt('signature')} className={inputCls} placeholder="Type your full legal name" data-testid="grant-signature" />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required checked={data.commitToParticipate} onChange={setChk('commitToParticipate')} className="mt-1 h-5 w-5 rounded border-slate-300 text-[#00A8E1] focus:ring-[#00A8E1]" data-testid="grant-commitToParticipate" />
          <span className="text-sm text-slate-700 leading-relaxed">
            If I am chosen for a TVN Life Sciences CEO Network annual membership grant, I commit to actively
            participate in TVN networking events and virtual exchanges.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required checked={data.accurateApplication} onChange={setChk('accurateApplication')} className="mt-1 h-5 w-5 rounded border-slate-300 text-[#00A8E1] focus:ring-[#00A8E1]" data-testid="grant-accurateApplication" />
          <span className="text-sm text-slate-700 leading-relaxed">
            By submitting this form, I certify that the information provided in this application is accurate and
            that my company meets all eligibility criteria. I understand that grants are for a 1 year period,
            after which I will be invited to renew my membership at the standard Vanguard Life Sciences CEO rate.
          </span>
        </label>
      </div>

      {errorMsg && (
        <div className="text-red-600 text-sm flex items-center gap-2" data-testid="grant-error">
          <AlertTriangle size={16} /> {errorMsg}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button type="button" onClick={() => setStep('section1')}
          className="text-slate-600 hover:text-slate-900 font-semibold text-sm"
          data-testid="grant-back-btn">
          ← Back
        </button>
        <button type="submit" disabled={submitting}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          data-testid="grant-submit-btn">
          {submitting ? (<><Loader2 size={20} className="animate-spin" /> Submitting…</>) : (<>Submit application <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" /></>)}
        </button>
      </div>
    </form>
  );
};

export default LSCEOGrantForm;
