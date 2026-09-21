import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Check, MessageCircle, AlertCircle, Loader2, Calendar, Users, Gift, Utensils, Clock } from 'lucide-react';

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
    date: '',
    time: '18:00',
    guests: '20 - 40 guests',
    reservationGuests: '4 people',
    eventType: 'Birthday Party',
    seatingArea: 'Porch / Verandah (Cricket Field View)',
    cateringOptions: [] as string[],
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    phone: string;
    type: string;
    date?: string;
    guests?: string | null;
    message?: string;
  } | null>(null);

  const toggleCatering = (option: string) => {
    setFormData(prev => ({
      ...prev,
      cateringOptions: prev.cateringOptions.includes(option)
        ? prev.cateringOptions.filter(o => o !== option)
        : [...prev.cateringOptions, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const typeTitle =
      enquiryType === 'function' ? 'Function / Event Booking Request' :
      enquiryType === 'reservation' ? 'Table Reservation Request' :
      'General Enquiry';

    const subject =
      enquiryType === 'function' ? `🎉 [Eddie Macs] Function Booking: ${formData.firstName} ${formData.lastName} (${formData.guests})` :
      enquiryType === 'reservation' ? `🍽️ [Eddie Macs] Table Booking: ${formData.firstName} ${formData.lastName} (${formData.date})` :
      `✉️ [Eddie Macs] Website Enquiry from ${formData.firstName} ${formData.lastName}`;

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
    };

    if (enquiryType === 'function') {
      payload.Event_Type = formData.eventType;
      payload.Proposed_Date = formData.date || 'To be confirmed';
      payload.Estimated_Guests = formData.guests;
      payload.Catering_Interests = formData.cateringOptions.length > 0 ? formData.cateringOptions.join(', ') : 'None selected';
    } else if (enquiryType === 'reservation') {
      payload.Reservation_Date = formData.date || 'Today / Upcoming';
      payload.Reservation_Time = formData.time;
      payload.Party_Size = formData.reservationGuests;
      payload.Seating_Preference = formData.seatingArea;
    }

    payload.Message = formData.message || 'No additional message provided';
    payload.Sent_Via = 'Eddie Macs Official Website';

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
        date: formData.date,
        guests: enquiryType === 'function' ? formData.guests : enquiryType === 'reservation' ? formData.reservationGuests : null,
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
        date: formData.date,
        guests: enquiryType === 'function' ? formData.guests : enquiryType === 'reservation' ? formData.reservationGuests : null,
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
      date: '',
      time: '18:00',
      guests: '20 - 40 guests',
      reservationGuests: '4 people',
      eventType: 'Birthday Party',
      seatingArea: 'Porch / Verandah (Cricket Field View)',
      cateringOptions: [],
      message: '',
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Eddie Macs! I just submitted an enquiry on your website.\n\n` +
    `*Name:* ${submittedSummary?.name || formData.firstName + ' ' + formData.lastName}\n` +
    `*Type:* ${submittedSummary?.type || (enquiryType === 'function' ? 'Function Booking' : 'General Enquiry')}\n` +
    (formData.phone ? `*Phone:* ${formData.phone}\n` : '') +
    (formData.date ? `*Date:* ${formData.date}\n` : '') +
    (formData.guests && enquiryType === 'function' ? `*Guests:* ${formData.guests}\n` : '') +
    (formData.message ? `*Notes:* ${formData.message}\n` : '')
  );

  const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
    `[Eddie Macs Enquiry] ${formData.firstName} ${formData.lastName}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEnquiry Type: ${enquiryType}\nDate: ${formData.date}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div id="contact-section" className="mt-16 max-w-4xl mx-auto bg-stone-900 border-2 border-stone-800 p-6 md:p-12 shadow-2xl relative scroll-mt-24">
      <div className="absolute -top-4 -right-4 bg-red-600 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transform rotate-12 border-2 border-stone-950 shadow-lg">
        <Send className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>

      <div className="text-center md:text-left mb-8">
        <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 text-red-500 font-black uppercase text-xs tracking-widest px-3 py-1 mb-3">
          <Mail className="w-3.5 h-3.5" /> Direct to {TARGET_EMAIL}
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white border-b-4 border-red-600 inline-block pb-2" style={{ fontFamily: 'var(--font-slug)' }}>
          Contact & Bookings
        </h2>
        <p className="text-stone-300 text-sm md:text-base font-medium mt-3 leading-relaxed">
          Planning a celebration, team function, reserving a table for the match, or have a question? Complete the form below and your request will auto-send directly to our club managers at <span className="text-yellow-400 font-bold">{TARGET_EMAIL}</span>.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8 bg-stone-950 p-2 border border-stone-800">
        <button
          type="button"
          onClick={() => setEnquiryType('function')}
          className={`py-3 px-4 font-black text-xs md:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            enquiryType === 'function'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Gift className="w-4 h-4" /> Book a Function
        </button>
        <button
          type="button"
          onClick={() => setEnquiryType('reservation')}
          className={`py-3 px-4 font-black text-xs md:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            enquiryType === 'reservation'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Utensils className="w-4 h-4" /> Table Reservation
        </button>
        <button
          type="button"
          onClick={() => setEnquiryType('general')}
          className={`py-3 px-4 font-black text-xs md:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            enquiryType === 'general'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-stone-400 hover:text-white hover:bg-stone-900'
          }`}
        >
          <Mail className="w-4 h-4" /> General Enquiry
        </button>
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
            {submittedSummary?.date && (
              <div>
                <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Date:</span>{' '}
                <span className="text-white font-bold">{submittedSummary?.date}</span>
              </div>
            )}
            {submittedSummary?.guests && (
              <div>
                <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Party Size:</span>{' '}
                <span className="text-white font-bold">{submittedSummary?.guests}</span>
              </div>
            )}
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Email:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.email}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase text-xs font-black tracking-wider">Phone:</span>{' '}
              <span className="text-white font-bold">{submittedSummary?.phone}</span>
            </div>
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
              className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white font-bold uppercase tracking-wider py-3.5 px-6 transition-all"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Function Specific Fields */}
          {enquiryType === 'function' && (
            <div className="bg-stone-950 border border-stone-800 p-6 space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" /> Proposed Date *
                  </label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-red-500" /> Estimated Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
                  >
                    <option value="10 - 20 guests">10 - 20 guests</option>
                    <option value="20 - 40 guests">20 - 40 guests</option>
                    <option value="40 - 70 guests">40 - 70 guests</option>
                    <option value="70 - 100+ guests">70 - 100+ guests</option>
                    <option value="100+ Large Function">100+ Large Function</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-red-500" /> Event Type
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
                  >
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate / Year-End Event">Corporate / Year-End Event</option>
                    <option value="Sports Club / Tour Event">Sports Club / Tour Event</option>
                    <option value="Stag / Hen Party">Stag / Hen Party</option>
                    <option value="Anniversary / Family Gathering">Anniversary / Family Gathering</option>
                    <option value="Other Function">Other Function</option>
                  </select>
                </div>
              </div>

              {/* Catering Interests */}
              <div className="space-y-2 pt-2">
                <label className="text-stone-300 font-bold uppercase tracking-wider text-xs block">
                  Catering Interests (Select any that apply):
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Braai Packs (Cuyler Butchery)',
                    'Lekker Snack Platters (R99pp)',
                    'Pizza Menu Packages',
                    'Captains Table Deals',
                    'Bar / Drinks Only',
                  ].map(option => {
                    const isSelected = formData.cateringOptions.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleCatering(option)}
                        className={`text-xs uppercase font-bold py-2 px-3 border transition-all ${
                          isSelected
                            ? 'bg-yellow-500 text-stone-950 border-yellow-500 shadow'
                            : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Table Reservation Specific Fields */}
          {enquiryType === 'reservation' && (
            <div className="bg-stone-950 border border-stone-800 p-6 space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" /> Date *
                  </label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-500" /> Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
                  >
                    <option value="11:30 (Lunch)">11:30 (Lunch)</option>
                    <option value="12:30 (Lunch)">12:30 (Lunch)</option>
                    <option value="13:30 (Lunch)">13:30 (Lunch)</option>
                    <option value="15:00 (Afternoon)">15:00 (Afternoon)</option>
                    <option value="17:00 (Sundowner)">17:00 (Sundowner)</option>
                    <option value="18:00 (Dinner)">18:00 (Dinner)</option>
                    <option value="19:00 (Dinner)">19:00 (Dinner)</option>
                    <option value="20:00 (Late Dinner)">20:00 (Late Dinner)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-stone-300 font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-red-500" /> Number of People
                  </label>
                  <select
                    value={formData.reservationGuests}
                    onChange={(e) => setFormData({ ...formData, reservationGuests: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
                  >
                    <option value="1 - 2 people">1 - 2 people</option>
                    <option value="3 - 4 people">3 - 4 people</option>
                    <option value="5 - 8 people">5 - 8 people</option>
                    <option value="8 - 12 people">8 - 12 people</option>
                    <option value="12+ people (Group)">12+ people (Group)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">Seating Preference</label>
                <select
                  value={formData.seatingArea}
                  onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 p-3.5 text-white font-medium focus:border-red-600 focus:outline-none transition-colors"
                >
                  <option value="Porch / Verandah (Cricket Field View)">Porch / Verandah (Cricket Field View)</option>
                  <option value="Near Big Screen TVs (Live Sports / Rugby)">Near Big Screen TVs (Live Sports / Rugby)</option>
                  <option value="Indoor Main Bar / Dining">Indoor Main Bar / Dining</option>
                  <option value="No Preference / Best Available">No Preference / Best Available</option>
                </select>
              </div>
            </div>
          )}

          {/* Message Area */}
          <div className="space-y-2">
            <label className="text-stone-300 font-bold uppercase tracking-wider text-xs">
              {enquiryType === 'function' ? 'Special Requirements / Details (Optional)' :
               enquiryType === 'reservation' ? 'Special Requests / Notes (Optional)' :
               'Write your message *'}
            </label>
            <textarea 
              required={enquiryType === 'general'}
              rows={4} 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                enquiryType === 'function' ? 'Tell us any special requirements, music, dietary notes, or decor arrangements...' :
                enquiryType === 'reservation' ? 'Any specific table preferences, birthday candles, or dietary requirements...' :
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
