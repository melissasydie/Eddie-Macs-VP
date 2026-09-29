import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Check, AlertCircle, ArrowRight } from 'lucide-react';

const TARGET_EMAIL = 'vpclub@mwebbiz.co.za';
const WHATSAPP_NUMBER = '27717943537';
const DISPLAY_PHONE = '071 794 3537';

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.37C9.37 7.37 9.12 7.43 8.9 7.67C8.68 7.91 8.08 8.47 8.08 9.63C8.08 10.78 8.92 11.9 9.03 12.05C9.15 12.21 10.66 14.52 13 15.53C14.94 16.36 15.34 16.2 15.76 16.16C16.18 16.12 17.11 15.61 17.31 15.06C17.5 14.5 17.5 14.03 17.44 13.93C17.38 13.83 17.23 13.77 17 13.66C16.78 13.55 15.69 13.01 15.48 12.93C15.28 12.86 15.13 12.82 14.99 13.05C14.84 13.28 14.43 13.77 14.3 13.93C14.18 14.08 14.06 14.1 13.84 13.99C13.62 13.88 12.92 13.65 12.09 12.91C11.44 12.33 11.01 11.62 10.88 11.4C10.76 11.18 10.87 11.06 10.98 10.95C11.08 10.85 11.2 10.69 11.31 10.55C11.43 10.42 11.47 10.32 11.54 10.17C11.62 10.02 11.58 9.89 11.52 9.77C11.46 9.66 11.02 8.57 10.83 8.12C10.65 7.69 10.47 7.74 10.33 7.74C10.2 7.73 10.05 7.73 9.9 7.73L9.53 7.37Z" />
    </svg>
  );
}

export function MailingListForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedData, setSubmittedData] = useState<{ email: string; phone: string } | null>(null);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const createWhatsAppUrl = (subEmail: string, subPhone: string) => {
    const text = 
`*Eddie Macs@VP VIP Club & WhatsApp Group* 📬

Hi Eddie Macs! Please add me to the Eddie Macs@VP WhatsApp group and mailing list for weekly specials and updates.

📧 *My Email:* ${subEmail.trim()}
📱 *Mobile / WhatsApp:* ${subPhone.trim()}
📅 *Date:* ${new Date().toLocaleDateString('en-ZA', { dateStyle: 'medium' })}

Thank you!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    setSubmittedData({ email: trimmedEmail, phone: trimmedPhone });

    // Prepare WhatsApp URL
    const url = createWhatsAppUrl(trimmedEmail, trimmedPhone);

    // Attempt to open WhatsApp directly in new window/tab
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback handled by the UI
    }

    // Backup notification to email (silent)
    try {
      const payload = {
        _subject: `📬 [Eddie Macs] New WhatsApp Group Member: ${trimmedPhone} (${trimmedEmail})`,
        _replyto: trimmedEmail,
        _template: 'table',
        _captcha: 'false',
        Subscriber_Email: trimmedEmail,
        Mobile_Number: trimmedPhone,
        Request: 'Add to Eddie Macs@VP WhatsApp Group & Mailing List',
        Subscribed_On: new Date().toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' }),
        Delivery_Method: 'WhatsApp + Website Form',
      };
      fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // Ignore background error
    }

    setStatus('success');
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setPhone('');
    setSubmittedData(null);
  };

  return (
    <div className="mt-16 bg-red-600 py-16 px-4 relative overflow-hidden w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4 pointer-events-none">
        <Mail className="w-64 h-64 text-black" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-4" style={{ fontFamily: 'var(--font-slug)' }}>
          Join Our Mailing List & WhatsApp Club
        </h2>
        <p className="text-stone-900 font-black uppercase tracking-widest mb-8 text-base md:text-lg">
          GET UPDATES ON SPECIALS, EVENTS & EVERYTHING HAPPENING AT EDDIE MACS DIRECT TO WHATSAPP!
        </p>

        {status === 'success' && submittedData ? (
          <div className="bg-stone-950 border-2 border-green-500 p-6 md:p-8 max-w-lg mx-auto shadow-2xl text-center animate-in fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 text-green-400 rounded-full mb-3">
              <WhatsAppIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white mb-2" style={{ fontFamily: 'var(--font-slug)' }}>
              Almost Done! Connect on WhatsApp
            </h3>
            <p className="text-stone-300 text-sm font-medium leading-relaxed mb-6">
              We've pre-formatted your request for <span className="text-yellow-400 font-bold">{submittedData.phone}</span> (<span className="text-stone-300">{submittedData.email}</span>) to join the Eddie Macs@VP WhatsApp group. If WhatsApp didn't open automatically on your device, tap the button below:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={createWhatsAppUrl(submittedData.email, submittedData.phone)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3.5 px-6 shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <WhatsAppIcon className="w-5 h-5" /> Open in WhatsApp
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-white py-3 px-4 border border-stone-800 hover:border-stone-700"
              >
                Add another number
              </button>
            </div>
          </div>
        ) : (
          <form className="flex flex-col md:flex-row gap-3 justify-center max-w-3xl mx-auto" onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              className="flex-1 min-w-[200px] px-6 py-4 bg-stone-950 text-white font-bold uppercase tracking-wider border-2 border-stone-950 placeholder:text-stone-500 focus:outline-none focus:border-yellow-500" 
              required 
            />
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number for WhatsApp group" 
              className="flex-1 min-w-[200px] px-6 py-4 bg-stone-950 text-white font-bold uppercase tracking-wider border-2 border-stone-950 placeholder:text-stone-500 focus:outline-none focus:border-yellow-500" 
              required 
            />
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-4 px-8 shadow-[4px_4px_0_0_#1c1917] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5" /> Join WhatsApp Group
            </button>
          </form>
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

  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    phone: string;
    type: string;
    message: string;
    whatsappUrl: string;
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

  const buildWhatsAppMessage = (typeTitle: string, data: typeof formData) => {
    return (
`*New Enquiry - Eddie Macs Victoria Park* 🍻

📋 *Enquiry Type:* ${typeTitle}
👤 *Name:* ${data.firstName.trim()} ${data.lastName.trim()}
📧 *Email:* ${data.email.trim()}
📱 *Phone / WhatsApp:* ${data.phone.trim()}

💬 *Details / Message:*
${data.message.trim()}

📍 *Sent via Eddie Macs Website*`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const typeTitle = getEnquiryLabel(enquiryType);
    const msg = buildWhatsAppMessage(typeTitle, formData);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    setSubmittedSummary({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      type: typeTitle,
      message: formData.message.trim(),
      whatsappUrl,
    });

    // Attempt to open WhatsApp directly in new window/tab
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback handled by UI button
    }

    // Backup notification to email (silent)
    try {
      const payload = {
        _subject: `📬 [Eddie Macs] ${typeTitle} via WhatsApp: ${formData.firstName} ${formData.lastName}`.trim(),
        _replyto: formData.email.trim(),
        _template: 'table',
        _captcha: 'false',
        Submission_Type: typeTitle,
        First_Name: formData.firstName.trim(),
        Last_Name: formData.lastName.trim(),
        Email: formData.email.trim(),
        Phone_WhatsApp: formData.phone.trim(),
        Message: formData.message.trim() || 'No additional message provided',
        Sent_Via: 'Eddie Macs Website (WhatsApp Action)',
      };

      fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // Ignore background error
    }

    setStatus('success');
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
    setSubmittedSummary(null);
  };

  return (
    <div id="contact-section" className="mt-16 max-w-4xl mx-auto bg-stone-900 border-2 border-stone-800 p-6 md:p-12 shadow-2xl relative scroll-mt-24">
      <div className="absolute -top-4 -right-4 bg-red-600 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transform rotate-12 border-2 border-stone-950 shadow-lg text-white">
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

      {status === 'success' && submittedSummary ? (
        <div className="bg-stone-950 border-2 border-green-500 p-6 md:p-10 text-center animate-in fade-in shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 text-green-400 rounded-full mb-4">
            <WhatsAppIcon className="w-10 h-10" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white mb-2" style={{ fontFamily: 'var(--font-slug)' }}>
            Enquiry Directed to WhatsApp!
          </h3>
          <p className="text-stone-300 text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            Thank you, <span className="text-yellow-400 font-bold">{submittedSummary.name}</span>! We've pre-filled your enquiry for Eddie Macs on WhatsApp (<span className="text-white font-bold">{DISPLAY_PHONE}</span>). If your WhatsApp chat didn't open automatically, tap below:
          </p>

          <div className="bg-stone-900 border border-stone-800 p-5 max-w-md mx-auto text-left mb-6 text-sm text-stone-300 space-y-2">
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Enquiry Type:</span>{' '}
              <span className="text-white font-bold">{submittedSummary.type}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Name:</span>{' '}
              <span className="text-white font-bold">{submittedSummary.name}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Email:</span>{' '}
              <span className="text-white font-bold">{submittedSummary.email}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Phone:</span>{' '}
              <span className="text-white font-bold">{submittedSummary.phone}</span>
            </div>
            {submittedSummary.message && (
              <div>
                <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Details:</span>{' '}
                <span className="text-stone-200">{submittedSummary.message}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={submittedSummary.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3.5 px-8 transition-all shadow-lg flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" /> Open in WhatsApp ({DISPLAY_PHONE})
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
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 px-8 transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#dc2626] flex items-center justify-center gap-3 text-lg cursor-pointer"
          >
            Send Response <Send className="w-5 h-5" />
          </button>
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
          href={`https://wa.me/${WHATSAPP_NUMBER}`} 
          target="_blank" 
          rel="noreferrer" 
          className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3 px-6 transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#000] border border-green-700 flex items-center justify-center gap-2 text-sm"
        >
          <WhatsAppIcon className="w-5 h-5" /> Chat Directly on WhatsApp ({DISPLAY_PHONE})
        </a>
      </div>
    </div>
  );
}
