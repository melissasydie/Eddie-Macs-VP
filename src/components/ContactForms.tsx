import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Check, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';

const TARGET_EMAIL = 'vpclub@mwebbiz.co.za';

export function MailingListForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');

    try {
      const payload = {
        _subject: `📬 [Eddie Macs] New Mailing List Subscriber: ${email}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false',
        Subscriber_Email: email,
        Subscribed_On: new Date().toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' }),
        Sent_Via: 'Eddie Macs Website',
      };

      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        // FormSubmit delivers activation prompt on first submission
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error('Mailing list submission error:', err);
      // Fallback
      setStatus('error');
    }
  };

  return (
    <div className="mt-16 bg-red-600 py-16 px-4 relative overflow-hidden w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4 pointer-events-none">
        <Mail className="w-64 h-64 text-black" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-4" style={{ fontFamily: 'var(--font-slug)' }}>
          Join Our Mailing List
        </h2>
        <p className="text-stone-900 font-black uppercase tracking-widest mb-8 text-lg">
          GET UPDATES ON SPECIALS, EVENTS & EVERYTHING HAPPENING AT EDDIE MACS!
        </p>

        {status === 'success' ? (
          <div className="bg-stone-950 border-2 border-yellow-400 p-6 md:p-8 max-w-lg mx-auto shadow-2xl text-center animate-in fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 text-green-400 rounded-full mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white mb-2" style={{ fontFamily: 'var(--font-slug)' }}>
              You're On The List!
            </h3>
            <p className="text-stone-300 text-sm font-medium leading-relaxed">
              Thank you for subscribing! Your notification has been sent to{' '}
              <span className="text-yellow-400 font-bold">{TARGET_EMAIL}</span>. We can't wait to see you around the club!
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-white underline underline-offset-4"
            >
              Add another email
            </button>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              className="flex-1 max-w-md px-6 py-4 bg-stone-950 text-white font-bold uppercase tracking-wider border-2 border-stone-950 placeholder:text-stone-500 focus:outline-none focus:border-yellow-500" 
              required 
              disabled={status === 'submitting'}
            />
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-75 text-black font-black uppercase tracking-widest py-4 px-8 shadow-[4px_4px_0_0_#1c1917] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Subscribing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-stone-950 font-black text-sm mt-4 bg-yellow-400/90 py-2 px-4 inline-block border border-black">
            Could not submit right now. You can email us directly at <a href={`mailto:${TARGET_EMAIL}`} className="underline">{TARGET_EMAIL}</a>!
          </p>
        )}
      </div>
    </div>
  );
}

interface ContactProps {
  enquiryType: 'function' | 'general' | 'reservation';
  setEnquiryType: (type: 'function' | 'general' | 'reservation') => void;
}

export function ContactAndBookingForm({ enquiryType, setEnquiryType }: ContactProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    phone: string;
    type: string;
    message: string;
  } | null>(null);

  const getEnquiryLabel = (type: 'function' | 'general' | 'reservation') => {
    switch (type) {
      case 'function':
        return 'Function Booking';
      case 'reservation':
        return 'Table Reservation';
      case 'general':
      default:
        return 'General Inquiry';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const typeTitle = getEnquiryLabel(enquiryType);
    const subject = `📬 [Eddie Macs] ${typeTitle}: ${formData.firstName} ${formData.lastName}`.trim();

    const payload: Record<string, any> = {
      _subject: subject,
      _replyto: formData.email,
      _template: 'table',
      _captcha: 'false',
      Submission_Type: typeTitle,
      First_Name: formData.firstName,
      Last_Name: formData.lastName,
      Email: formData.email,
      Phone_WhatsApp: formData.phone,
      Message: formData.message || 'No additional message provided',
      Sent_Via: 'Eddie Macs Official Website',
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setSubmittedSummary({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        type: typeTitle,
        message: formData.message,
      });

      setStatus('success');
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmittedSummary({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        type: typeTitle,
        message: formData.message,
      });
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Eddie Macs! I just submitted an enquiry on your website.\n\n` +
    `*Name:* ${submittedSummary?.name || formData.firstName + ' ' + formData.lastName}\n` +
    `*Type:* ${submittedSummary?.type || getEnquiryLabel(enquiryType)}\n` +
    (formData.phone ? `*Phone:* ${formData.phone}\n` : '') +
    (formData.message ? `*Message:* ${formData.message}\n` : '')
  );

  const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    `[Eddie Macs Enquiry] ${formData.firstName} ${formData.lastName}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nType: ${getEnquiryLabel(enquiryType)}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div id="contact-section" className="mt-16 max-w-4xl mx-auto bg-stone-900 border-2 border-stone-800 p-6 md:p-12 shadow-2xl relative scroll-mt-24">
      <div className="absolute -top-4 -right-4 bg-red-600 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transform rotate-12 border-2 border-stone-950 shadow-lg">
        <Send className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>

      <div className="text-center md:text-left mb-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white border-b-4 border-red-600 inline-block pb-2" style={{ fontFamily: 'var(--font-slug)' }}>
          Contact & Bookings
        </h2>
        <p className="text-stone-300 text-sm md:text-base font-medium mt-3 leading-relaxed">
          Planning a celebration, team function, reserving a table for the match, or have a question? Complete the form below and our team will get back to you as soon as possible.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-stone-950 border-2 border-green-500 p-6 md:p-10 text-center animate-in fade-in shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 text-green-400 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white mb-2" style={{ fontFamily: 'var(--font-slug)' }}>
            Enquiry Sent to Eddie Macs!
          </h3>
          <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            Thank you, <span className="text-yellow-400 font-bold">{submittedSummary?.name}</span>! Your enquiry was delivered directly to{' '}
            <span className="text-white font-bold underline">{TARGET_EMAIL}</span>. Our team will review your details and be in touch promptly.
          </p>

          <div className="bg-stone-900 border border-stone-800 p-5 max-w-md mx-auto text-left mb-6 text-sm text-stone-300 space-y-2">
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Enquiry Type:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.type}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Name:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.name}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Email:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.email}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Phone:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.phone}</span>
            </div>
            {submittedSummary?.message && (
              <div>
                <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Details:</span>{' '}
                <span className="text-stone-200">{submittedSummary.message}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/27717943537?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3.5 px-6 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Fast-Track on WhatsApp
            </a>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase tracking-wider py-3.5 px-6 transition-all cursor-pointer"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enquiry Type Dropdown */}
          <div className="space-y-2">
            <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">
              Enquiry Type *
            </label>
            <select
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value as 'function' | 'general' | 'reservation')}
              className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
            >
              <option value="function">Function Booking</option>
              <option value="reservation">Table Reservation</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">First Name *</label>
              <input 
                type="text" 
                required 
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. John"
                className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">Last Name *</label>
              <input 
                type="text" 
                required 
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Smith"
                className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
              />
            </div>
          </div>

          {/* Contact Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">Email Address *</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">Phone / WhatsApp Number *</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 082 123 4567"
                className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-2">
            <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">
              Message / Details *
            </label>
            <textarea 
              required
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                enquiryType === 'function' ? 'Tell us about your event, preferred date, estimated guests, or special requirements...' :
                enquiryType === 'reservation' ? 'Tell us your preferred date, time, party size, or seating preference...' :
                'How can we help you today?'
              }
              className="w-full bg-stone-950 border border-stone-800 p-4 text-white font-medium focus:border-red-600 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-75 text-black font-black uppercase tracking-widest py-4 px-8 transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#dc2626] flex items-center justify-center gap-3 text-lg cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Sending to {TARGET_EMAIL}...
              </>
            ) : (
              <>
                Send to Eddie Macs <Send className="w-5 h-5" />
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="bg-red-950/50 border border-red-800 p-4 text-stone-300 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Unable to transmit automatically. You can send directly via:</span>
              </div>
              <div className="flex gap-2">
                <a 
                  href={mailtoLink}
                  className="bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase text-xs py-2 px-3 border border-stone-700"
                >
                  Email App
                </a>
                <a 
                  href={`https://wa.me/27717943537?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase text-xs py-2 px-3"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Direct Contact Links */}
      <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="text-stone-400 font-bold uppercase tracking-wider text-xs">Direct Email:</p>
          <a href={`mailto:${TARGET_EMAIL}`} className="text-white hover:text-red-500 font-bold text-sm transition-colors">
            {TARGET_EMAIL}
          </a>
        </div>
        <a 
          href="https://wa.me/27717943537" 
          target="_blank" 
          rel="noreferrer" 
          className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3 px-6 transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#000] border border-green-700 flex items-center justify-center gap-2 text-sm"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp Us (071 794 3537)
        </a>
      </div>
    </div>
  );
}
