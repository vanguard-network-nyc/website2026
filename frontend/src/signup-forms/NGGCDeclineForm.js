import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const DEFAULT_EVENT_CODE = 'NGGC2027_0201';
const RETURN_TO = '/programs/next-generation-general-counsel';
const SUBMIT_URL = `${process.env.REACT_APP_BACKEND_URL || ''}/api/nominate-decline/submit`;

const labelCls = 'block text-sm font-semibold text-slate-700 mb-1';
const inputCls =
  'w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#00A8E1] transition-colors text-slate-900 placeholder-slate-400';

const NGGCDeclineForm = ({ onSuccess }) => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [done, setDone] = useState(false);
  const eventCode = searchParams.get('code') || DEFAULT_EVENT_CODE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          comments: comments.trim(),
          eventCode,
        }),
      });
      let body = null;
      try { body = await res.json(); } catch (_) { /* non-json */ }
      if (!res.ok || !body || body.ok !== true) {
        throw new Error((body && body.error) || 'Something went wrong. Please try again.');
      }
      setDone(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="py-6 text-center" data-testid="decline-success">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#045184] mb-3">Thank you for letting us know.</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="decline-form">
      <p className="text-slate-700 leading-relaxed">
        Thank you for letting us know. We will keep checking in with you again next year to see if
        you have someone to nominate for the 2028 program. You can view full program details{' '}
        <a
          href={RETURN_TO}
          className="text-[#00A8E1] font-semibold hover:underline"
        >
          here
        </a>
        .
      </p>

      <div>
        <label htmlFor="decline-email" className={labelCls}>
          Your work email <span className="text-red-500">*</span>
        </label>
        <input
          id="decline-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          data-testid="decline-email"
        />
      </div>

      <div>
        <label htmlFor="decline-comments" className={labelCls}>
          Recommendations or further info
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Do you know another GC who may have a candidate to nominate or a deputy GC who might
          benefit from the program? Any other info you&apos;d like to share?
        </p>
        <textarea
          id="decline-comments"
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className={inputCls}
          data-testid="decline-comments"
        />
      </div>

      <input type="hidden" name="eventCode" value={eventCode} data-testid="decline-eventCode" readOnly />

      {errorMsg && (
        <div className="text-red-600 text-sm flex items-center gap-2" data-testid="decline-error">
          <AlertTriangle size={16} /> {errorMsg}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#045184] to-[#00A8E1] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          data-testid="decline-submit-btn"
        >
          {submitting ? (
            <><Loader2 size={20} className="animate-spin" /> Submitting…</>
          ) : (
            <>Submit <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" /></>
          )}
        </button>
      </div>
    </form>
  );
};

export default NGGCDeclineForm;
