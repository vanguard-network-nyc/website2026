import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

/**
 * /nominate/decline is a Mailchimp deep-link. To ensure the modal opens on
 * top of the fully-loaded Next Gen GC program page (not on a blank canvas),
 * we redirect to /programs/next-generation-general-counsel?form=nggc-decline-form
 * preserving the email + code query params.
 */
const NominateDeclinePage = () => {
  const [searchParams] = useSearchParams();
  const next = new URLSearchParams();
  next.set('form', 'nggc-decline-form');
  const email = searchParams.get('email');
  const code = searchParams.get('code');
  if (email) next.set('email', email);
  if (code) next.set('code', code);
  return <Navigate to={`/programs/next-generation-general-counsel?${next.toString()}`} replace />;
};

export default NominateDeclinePage;
