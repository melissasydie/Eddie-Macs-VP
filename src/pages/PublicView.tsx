import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Home, Sun, Briefcase, Gift, Trophy, CheckCircle2, Beer, Utensils, Pizza, Flame, Phone, MapPin, Globe, Menu as MenuIcon, MessageCircle, X, ChevronRight, ArrowLeft, ChevronLeft, Send, Mail, Tv, Users, Music, Clock, Calendar, Car, Facebook, Instagram, Download, FileText, Eye, Loader2, Check, AlertCircle, Cigarette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MailingListForm, ContactAndBookingForm } from '../components/ContactForms';

export default function PublicView() {
  const [currentView, setCurrentView] = useState<'home' | 'menus' | 'contact' | 'about' | 'specials' | 'main' | 'braai' | 'treats' | 'pizza' | 'additional' | 'halfprice' | 'downloads'>('home');
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [specials, setSpecials] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => a.order - b.order));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'categories'));
    
    const unsubItems = onSnapshot(collection(db, 'menuItems'), (snap) => {
      setMenuItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'menuItems'));

    const unsubSpecials = onSnapshot(collection(db, 'dailySpecials'), (snap) => {
      setSpecials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'dailySpecials'));
    
    return () => { unsubCats(); unsubItems(); unsubSpecials(); };
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'menus', label: 'MENU' },
    { id: 'events', label: 'EVENTS', href: 'https://www.facebook.com/EddieMacsatVPSportsClub/events' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-red-600 selection:text-white bg-[#050505]" style={{ backgroundImage: 'url("/assets/images/bg-texture.png"), url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', backgroundBlendMode: 'overlay', backgroundSize: 'cover, 200px 200px', backgroundAttachment: 'fixed' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/75 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 sm:py-2 md:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => setCurrentView('home')}>
            <span className="text-white text-2xl sm:text-3xl md:text-4xl leading-none" style={{ fontFamily: 'var(--font-yellowtail)' }}>Eddie Macs@VP</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex gap-6 items-center">
            {navItems.map(item => (
              item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pb-1 font-bold uppercase tracking-widest text-sm transition-all text-stone-300 hover:text-white border-b-2 border-transparent hover:border-red-600"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`pb-1 font-bold uppercase tracking-widest text-sm transition-all border-b-2 ${currentView === item.id || (item.id === 'menus' && currentView !== 'home' && currentView !== 'contact' && currentView !== 'about') ? 'text-white border-red-600' : 'text-stone-300 border-transparent hover:text-white hover:border-red-600'}`}
                >
                  {item.label}
                </button>
              )
            ))}
            <Link to="/admin" className="ml-2 px-3 py-1.5 text-stone-500 hover:text-white text-xs font-bold uppercase tracking-wider border border-stone-800 hover:bg-stone-800 transition-colors">Admin</Link>
          </nav>

          {/* Desktop Address & Hours */}
          <div className="hidden md:flex items-center gap-6 xl:gap-8 shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="text-red-600 w-6 h-6" />
              <div className="flex flex-col uppercase tracking-wider text-stone-300 font-bold text-[10px] lg:text-xs leading-tight">
                <span>Victoria Park Drive,</span>
                <span>South End, PE/GQ, 6001</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-red-600 w-6 h-6" />
              <div className="flex flex-col uppercase tracking-wider text-stone-300 font-bold text-[10px] lg:text-xs leading-tight">
                <span>Open 10AM</span>
                <span>To Late</span>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l border-stone-800 pl-4 xl:pl-6">
              <a href="https://www.facebook.com/EddieMacsatVPSportsClub/" target="_blank" rel="noreferrer" className="text-red-600 hover:text-red-500 transition-colors bg-stone-900/50 p-2 rounded-full hover:bg-stone-800">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              </a>
              <a href="https://www.instagram.com/eddiemacsatvp?stkn=MXNkNjNoY3p6bHRqYQ==" target="_blank" rel="noreferrer" className="text-red-600 hover:text-red-500 transition-colors bg-stone-900/50 p-2 rounded-full hover:bg-stone-800">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="xl:hidden text-white p-1 sm:p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>

        {/* Mobile Info Bar (Address, Hours, Socials) */}
        <div className="md:hidden border-t border-white/10 bg-black/90 px-3 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar flex-1">
            <div className="flex items-center gap-1 text-stone-300 font-bold uppercase tracking-wider text-[10px] shrink-0">
              <MapPin className="text-red-600 w-3 h-3 shrink-0" /> South End, PE/GQ
            </div>
            <span className="text-stone-600 text-[10px]">•</span>
            <div className="flex items-center gap-1 text-stone-300 font-bold uppercase tracking-wider text-[10px] shrink-0">
              <Clock className="text-red-600 w-3 h-3 shrink-0" /> 10AM - Late
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 pl-2">
            <a href="https://www.facebook.com/EddieMacsatVPSportsClub/" target="_blank" rel="noreferrer" className="text-red-600 hover:text-red-500 transition-colors">
              <Facebook className="w-3.5 h-3.5 fill-current" />
            </a>
            <a href="https://www.instagram.com/eddiemacsatvp?stkn=MXNkNjNoY3p6bHRqYQ==" target="_blank" rel="noreferrer" className="text-red-600 hover:text-red-500 transition-colors">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://wa.me/27717943537" target="_blank" rel="noreferrer" className="text-green-500 hover:text-green-400 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-stone-900 border-b border-stone-800 absolute w-full left-0 shadow-2xl">
            {navItems.map(item => (
              item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-6 py-4 font-black uppercase tracking-wider border-b border-stone-800 text-stone-300 hover:bg-stone-800"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id as any); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-6 py-4 font-black uppercase tracking-wider border-b border-stone-800 ${currentView === item.id || (item.id === 'menus' && currentView !== 'home' && currentView !== 'contact' && currentView !== 'about') ? 'bg-red-600 text-white' : 'text-stone-300 hover:bg-stone-800'}`}
                >
                  {item.label}
                </button>
              )
            ))}
             <Link to="/admin" className="block w-full text-left px-6 py-4 font-black uppercase tracking-wider text-stone-500">Admin Login</Link>
          </div>
        )}
      </header>

      <main className="max-w-[1400px] mx-auto px-4 pt-0 md:pt-6 pb-8 md:pb-12">
        {(currentView === 'home' || currentView === 'contact' || currentView === 'about') && <HomeView setCurrentView={setCurrentView} scrollToContact={currentView === 'contact'} scrollToAbout={currentView === 'about'} />}
        {currentView === 'menus' && <MenusHubView setCurrentView={setCurrentView} />}
        {currentView === 'specials' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="daily-specials.pdf"><SpecialsView specials={specials} /></MenuWrapper>}
        {currentView === 'main' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="main-menu.pdf"><MainMenuView categories={categories} items={menuItems} /></MenuWrapper>}
        {currentView === 'braai' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="braai-packs.pdf"><BraaiPacksView /></MenuWrapper>}
        {currentView === 'treats' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="tasty-treats.pdf"><TastyTreatsView /></MenuWrapper>}
        {currentView === 'pizza' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="pizza-menu.pdf"><PizzaMenuView /></MenuWrapper>}
        {currentView === 'additional' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="additional-menu-options.pdf"><AdditionalMenuOptionsView /></MenuWrapper>}
        {currentView === 'halfprice' && <MenuWrapper setCurrentView={setCurrentView} pdfFile="wednesday-half-price.pdf"><WednesdayHalfPriceView /></MenuWrapper>}
        {currentView === 'downloads' && <DownloadsView setCurrentView={setCurrentView} />}
      </main>

      <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-64 md:h-80 border-t-[6px] border-stone-800 overflow-hidden mt-0">
        <img src="/assets/images/cheers.jpg" alt="Cheers" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-stone-950/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-center p-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full">
          <span className="text-white text-4xl md:text-6xl -rotate-6 shadow-black drop-shadow-xl" style={{ fontFamily: 'var(--font-yellowtail)' }}>Good Food<br/>Great Friends</span>
          <div className="text-right">
             <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-white uppercase tracking-wider leading-none drop-shadow-2xl" style={{ fontFamily: 'var(--font-slug)' }}>SIT DOWN.<br/>RELAX.</h2>
             <h3 className="text-xl md:text-3xl font-black text-yellow-500 uppercase tracking-widest mt-2 transform -rotate-2 drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>YOU'RE AMONG FRIENDS.</h3>
             <div className="h-1.5 w-full bg-yellow-500 mt-2 transform -rotate-1"></div>
          </div>
        </div>
      </div>

      <footer className="w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] relative bg-[#0a0a0a] text-stone-300 py-12 md:py-16">
         {/* Texture overlay */}
         <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
         
         <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-8 mb-16 lg:mb-24">
               {/* Logo */}
               <div className="flex flex-col items-center xl:items-start transform hover:scale-105 transition-transform duration-500">
                  <img src="/assets/images/eddies_logo_white.png" alt="Eddie Macs Logo" className="h-32 md:h-48 object-contain mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
               </div>
               
               {/* Contact Col 1 */}
               <div className="flex flex-col gap-8 xl:border-r xl:border-stone-800 xl:border-dashed xl:pr-8 items-center xl:items-start text-center xl:text-left">
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4">
                     <MapPin className="text-red-600 w-8 h-8 md:w-10 md:h-10 shrink-0" strokeWidth={1.5} />
                     <div className="flex flex-col uppercase tracking-wider font-bold text-sm md:text-base mt-1 text-stone-300">
                       <span>Victoria Park Drive,</span>
                       <span>South End, PE/GQ, 6001</span>
                     </div>
                  </div>
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4">
                     <Mail className="text-red-600 w-8 h-8 md:w-10 md:h-10 shrink-0" strokeWidth={1.5} />
                     <div className="flex flex-col uppercase tracking-wider font-bold text-sm md:text-base mt-1 text-stone-300">
                       <a href="mailto:vpclub@mwebbiz.co.za" className="hover:text-white transition-colors">vpclub@mwebbiz.co.za</a>
                     </div>
                  </div>
                  <div className="mt-4">
                     <a href="https://wa.me/27717943537" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest py-3 px-6 transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#000] border border-green-700">
                       <MessageCircle className="w-6 h-6" /> WhatsApp Us
                     </a>
                  </div>
               </div>
               
               {/* Contact Col 2 */}
               <div className="flex flex-col gap-8 xl:border-r xl:border-stone-800 xl:border-dashed xl:pr-8 items-center xl:items-start text-center xl:text-left">
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4">
                     <Phone className="text-red-600 w-8 h-8 md:w-10 md:h-10 shrink-0 transform -scale-x-100" strokeWidth={1.5} />
                     <div className="flex flex-col uppercase tracking-wider font-bold">
                       <span className="text-2xl md:text-3xl text-white font-black" style={{ fontFamily: 'var(--font-slug)' }}>071 794 3537</span>
                       <span className="text-stone-500 text-xs md:text-sm tracking-widest">WhatsApp Only (No Calls)</span>
                     </div>
                  </div>
               </div>

               {/* Hours & Socials */}
               <div className="flex flex-col gap-6 items-center xl:items-start text-center xl:text-left">
                  <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4">
                     <Clock className="text-red-600 w-8 h-8 md:w-10 md:h-10 shrink-0" strokeWidth={1.5} />
                     <div className="flex flex-col uppercase tracking-wider font-bold text-sm md:text-base mt-1 text-stone-300">
                       <span>Open 10AM to Late</span>
                       <span className="text-stone-400">Mon - Sun</span>
                     </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                     <a href="https://www.facebook.com/EddieMacsatVPSportsClub/" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 p-2.5 rounded-full text-red-600 hover:text-red-500 hover:bg-stone-800 transition-colors shadow-lg transform hover:scale-110"><Facebook className="w-5 h-5 fill-current" /></a>
                     <a href="https://www.instagram.com/eddiemacsatvp?stkn=MXNkNjNoY3p6bHRqYQ==" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 p-2.5 rounded-full text-red-600 hover:text-red-500 hover:bg-stone-800 transition-colors shadow-lg transform hover:scale-110"><Instagram className="w-5 h-5" /></a>
                  </div>
                  <button className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-3 px-10 text-xl transition-all mt-4 transform hover:-translate-y-1" style={{ clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)' }}>
                    FOLLOW US
                  </button>
               </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center xl:items-end gap-10 lg:gap-6 pt-12 pb-4 border-t border-stone-800">
               <div className="text-xs text-stone-500 uppercase tracking-widest order-3 lg:order-1 text-center lg:text-left">
                  &copy; {new Date().getFullYear()} Eddie Macs@VP. All Rights Reserved.
               </div>
               
               <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm md:text-base font-bold uppercase tracking-widest text-stone-400 order-1 lg:order-2">
                  <button onClick={() => setCurrentView('home')} className="hover:text-red-500 transition-colors">HOME</button>
                  <span className="text-stone-700">|</span>
                  <button onClick={() => setCurrentView('about')} className="hover:text-red-500 transition-colors">ABOUT US</button>
                  <span className="text-stone-700">|</span>
                  <button onClick={() => setCurrentView('menus')} className="hover:text-red-500 transition-colors">MENU</button>
                  <span className="text-stone-700">|</span>
                  <a href="https://www.facebook.com/EddieMacsatVPSportsClub/events" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">EVENTS</a>
                  <span className="text-stone-700">|</span>
                  <button onClick={() => setCurrentView('contact')} className="hover:text-red-500 transition-colors">CONTACT</button>
               </div>
               
               <div className="text-center lg:text-right flex flex-col items-center lg:items-end order-2 lg:order-3">
                  <span className="text-stone-300 font-bold uppercase tracking-widest text-sm md:text-base mb-1" style={{ fontFamily: 'var(--font-lost)' }}>PE/GQ'S BIGGEST AND BEST</span>
                  <span className="text-white font-black uppercase tracking-widest text-lg md:text-xl mb-3" style={{ fontFamily: 'var(--font-lost)' }}>SPORTS CLUB, GRUB AND FUNCTION VENUE</span>
                  <div className="w-full h-1 bg-red-600 mb-4 transform rotate-1"></div>
                  <span className="text-stone-400 text-lg md:text-xl drop-shadow-md" style={{ fontFamily: 'var(--font-yellowtail)' }}>Good People. Great Food. Always.</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function DownloadsView({ setCurrentView }: { setCurrentView: (v: any) => void }) {
  const menus = [
    {
      id: 'main',
      name: 'Main Menu',
      tagline: 'Breakfast, Steaks, Burgers, Ribs, Seafood, Baskets & Desserts',
      badge: 'Sit Down Only • 10am - 10pm',
      file: 'main-menu.pdf',
      size: 'PDF Document • 6.0 KB',
      color: 'border-red-600',
      badgeColor: 'bg-red-600 text-white',
      highlights: '180g Burgers, Eisbein, 800g Ribs, T-Bone 350g, Starters & Little Sports',
    },
    {
      id: 'specials',
      name: 'Daily Specials',
      tagline: 'Unbeatable deals every day of the week',
      badge: 'Sit Down Only • Mon - Sun 11am - 8pm',
      file: 'daily-specials.pdf',
      size: 'PDF Document • 3.4 KB',
      color: 'border-blue-600',
      badgeColor: 'bg-blue-600 text-white',
      highlights: 'R59.90 English Bfast, BOGO Pizza, R99 Friday Meals & R199 Ribs',
    },
    {
      id: 'braai',
      name: 'Braai Packs',
      tagline: 'Everything you need for a legendary braai! Cuyler Butchery meat',
      badge: 'Min 10 Guests • Book 10 Days Prior',
      file: 'braai-packs.pdf',
      size: 'PDF Document • 2.9 KB',
      color: 'border-yellow-500',
      badgeColor: 'bg-yellow-500 text-black',
      highlights: 'R129pp Braai Pack & R159pp Ultimate with Wood, Salads, Bin & Grill',
    },
    {
      id: 'pizza',
      name: 'Pizza Menu',
      tagline: 'Delicious thin based wood-fired style pizzas',
      badge: 'WhatsApp & Collect • Mon - Sun 11am - 8pm',
      file: 'pizza-menu.pdf',
      size: 'PDF Document • 3.1 KB',
      color: 'border-orange-500',
      badgeColor: 'bg-orange-600 text-white',
      highlights: 'Basic & Deluxe: Cheesy Griller, Pork Deluxe, Spicy BBQ & Meaty Pizzas',
    },
    {
      id: 'treats',
      name: 'Tasty Treats',
      tagline: 'Platters & deals made for sharing and good times',
      badge: 'Bargain Buy for the Table',
      file: 'tasty-treats.pdf',
      size: 'PDF Document • 2.8 KB',
      color: 'border-yellow-500',
      badgeColor: 'bg-yellow-500 text-black',
      highlights: 'Lekker Snack Platters (x4 to x10), R99 Burgers, Wraps & Sharing Pizzas',
    },
    {
      id: 'additional',
      name: 'Additional Menu Options',
      tagline: 'Snack platters, braai packs & catering for functions',
      badge: 'Groups, Teams & Events',
      file: 'additional-menu-options.pdf',
      size: 'PDF Document • 2.9 KB',
      color: 'border-stone-600',
      badgeColor: 'bg-stone-700 text-white',
      highlights: 'R99pp Platters, 4pc Braai Packs, Salads & Banking Details for Bookings',
    },
    {
      id: 'halfprice',
      name: 'Wednesday Half-Price Captains Table',
      tagline: 'Great food. Great company. Half the price!',
      badge: 'Wednesdays Only • Sit Down Only',
      file: 'wednesday-half-price.pdf',
      size: 'PDF Document • 3.3 KB',
      color: 'border-green-600',
      badgeColor: 'bg-green-600 text-white',
      highlights: '16 Legendary Mains at 50% Off: Ribs, Eisbein, Steaks, Burgers & Seafood',
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto py-8 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="bg-stone-900 p-3 rounded-full hover:bg-stone-800 transition-colors border border-stone-800"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white leading-none" style={{ fontFamily: 'var(--font-slug)' }}>
            Menu <span className="text-red-600">Downloads</span>
          </h1>
          <p className="text-stone-400 text-sm md:text-base font-bold uppercase tracking-wider mt-2">
            Official Eddie Macs@VP Menus & Function Packages
          </p>
        </div>
      </div>
      
      <div className="bg-stone-900 border border-stone-800 p-6 md:p-8 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-6 border-b border-stone-800">
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider text-white">Save or Print Our Menus</h2>
            <p className="text-stone-400 text-sm font-medium mt-1">
              Download our latest high-quality menus in PDF format to view offline, print for functions, or share with family and friends.
            </p>
          </div>
          <a 
            href="https://wa.me/27717943537" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-wider text-xs md:text-sm py-2.5 px-4 shadow-md transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {menus.map((menu) => (
            <div 
              key={menu.id} 
              className={`bg-stone-950 border ${menu.color} p-6 flex flex-col justify-between group hover:border-red-500 transition-all shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 ${menu.badgeColor}`}>
                    {menu.badge}
                  </span>
                  <span className="text-stone-500 text-xs font-mono">
                    {menu.size}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-wider text-white group-hover:text-red-500 transition-colors" style={{ fontFamily: 'var(--font-slug)' }}>
                  {menu.name}
                </h3>
                
                <p className="text-stone-300 font-bold text-xs uppercase tracking-wide mt-1">
                  {menu.tagline}
                </p>

                <p className="text-stone-400 text-xs font-medium mt-3 pb-4 border-b border-stone-800/80">
                  <span className="text-yellow-500 font-bold">Includes: </span>{menu.highlights}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-2">
                <button
                  onClick={() => setCurrentView(menu.id)}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 text-xs font-black uppercase tracking-wider py-2.5 px-3 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-red-500" /> View Online
                </button>

                <a
                  href={`/assets/menus/${menu.file}`}
                  download={menu.file}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider py-2.5 px-3 transition-all flex items-center justify-center gap-1.5 shadow-[2px_2px_0_0_#000]"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeView({ setCurrentView, scrollToContact, scrollToAbout }: { setCurrentView: (v: any) => void, scrollToContact?: boolean, scrollToAbout?: boolean }) {
  const [enquiryType, setEnquiryType] = useState<'function' | 'general' | 'reservation'>('general');

  const handleBookFunctionClick = () => {
    setEnquiryType('function');
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollToContact) {
      const el = document.getElementById('contact-section');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else if (scrollToAbout) {
      const el = document.getElementById('about-section');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [scrollToContact, scrollToAbout]);

  const testimonials = [
    { name: "Gayle Fourie (via Google)", text: "Enjoyed a great meal. It was a perfect quiet Monday evening. We were able to enjoy our dinner overlooking a lovely green cricket field with children and dogs playing while parents sat on the front porch enjoying a sundowner. It was a picture perfect, peaceful, pleasant late afternoon." },
    { name: "Bryan Coetzee (via Google)", text: "Lovely staff, value for money on food and drinks special. Bacon and cheese burger out of this world. Must try on Sunday afternoon. With the great live music. If you enjoy a dance and good Seventies and Eighties music recommend it in PE." },
    { name: "Liso Sibaca (via Google)", text: "Lovely place to go with family, there's a field outside where you can play or have a picnic. Love the breakfast, I will returning for it!" },
    { name: "Corrin Africa (via Google)", text: "Very very nice place. Nice breakfast at great prices. Great trading hours with great service." },
    { name: "Ronel Van Vuuren (via Google)", text: "Eddie Macs@VP has become a regular Sunday lunch spot for us. Love the food. Great staff. Keep it up. And the onion rings are simply the best." },
    { name: "Dane Doubell (via Google)", text: "This is the place you want to go to feel that you’ve found a gem that locals had to scour the city to discover after years of trial and error. Run by a genuine member of the Charles Glass Society, the ethos of drinking & having a great time is backed up by good food & good alcohol as well as great company if you don’t bring your own!" },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mb-4 text-center py-6 sm:py-8 md:py-16 px-4 lg:px-8 xl:px-12 flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
         <img src="/assets/images/hero_image.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover z-0" />
         
         <div className="relative z-20 flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto gap-6 md:gap-8">
            {/* Center Col: Text & Features */}
            <div className="flex flex-col items-center justify-center text-center w-full relative z-10">
               <div className="flex flex-col items-center justify-center mb-4 md:mb-8 transform hover:scale-105 transition-transform duration-700">
                 <img src="/assets/images/eddies_logo_white.png" alt="Eddie Macs@VP Logo" className="h-36 sm:h-48 md:h-64 lg:h-80 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
               </div>
            
               <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-wider leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mb-1" style={{ fontFamily: 'var(--font-lost)' }}>PE/GQ'S</h2>
               <h1 className="text-red-600 text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-wider leading-[0.8] drop-shadow-[0_8px_8px_rgba(0,0,0,1)] mb-6 md:mb-8 transform -rotate-2" style={{ fontFamily: 'var(--font-lost)', WebkitTextStroke: '2px black' }}>BIGGEST AND BEST</h1>
               
               <div className="bg-yellow-500 text-stone-950 font-black uppercase tracking-widest text-lg md:text-2xl px-6 py-2 transform rotate-1 mb-6 md:mb-10 shadow-[6px_6px_0_0_#000] border-2 border-stone-900" style={{ fontFamily: 'var(--font-lost)' }}>
                 SPORTS CLUB, GRUB AND FUNCTION VENUE
               </div>

               <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-6 md:mb-10">
                 <div className="flex flex-col items-center justify-center gap-2 group">
                   <div className="text-yellow-500 mb-1 transform group-hover:scale-110 transition-transform"><Tv className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /></div>
                   <div className="text-stone-100 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-tight" style={{ fontFamily: 'var(--font-slug)' }}>Great<br/>Sport</div>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-2 group">
                   <div className="text-yellow-500 mb-1 transform group-hover:scale-110 transition-transform"><Utensils className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /></div>
                   <div className="text-stone-100 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-tight" style={{ fontFamily: 'var(--font-slug)' }}>Awesome<br/>Food</div>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-2 group">
                   <div className="text-yellow-500 mb-1 transform group-hover:scale-110 transition-transform"><Users className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /></div>
                   <div className="text-stone-100 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-tight" style={{ fontFamily: 'var(--font-slug)' }}>Functions<br/>& Events</div>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-2 group">
                   <div className="text-yellow-500 mb-1 transform group-hover:scale-110 transition-transform"><Music className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} /></div>
                   <div className="text-stone-100 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-tight" style={{ fontFamily: 'var(--font-slug)' }}>Live Music<br/>& Good Times</div>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center w-full">
                 <button 
                   onClick={() => setCurrentView('menus')}
                   className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl transition-all shadow-[4px_4px_0_0_#000] flex items-center justify-center gap-2 transform hover:-translate-y-1 w-full sm:w-auto"
                 >
                   VIEW OUR MENUS <ChevronRight strokeWidth={4} className="w-5 h-5 md:w-6 md:h-6" />
                 </button>
                 <button 
                   onClick={handleBookFunctionClick}
                   className="bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-black uppercase tracking-widest py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl transition-all shadow-[4px_4px_0_0_#000] flex items-center justify-center gap-2 transform hover:-translate-y-1 w-full sm:w-auto"
                 >
                   BOOK A FUNCTION <ChevronRight strokeWidth={4} className="w-5 h-5 md:w-6 md:h-6" />
                 </button>
               </div>
            </div>
         </div>
      </div>

      {/* About Section */}
      <div id="about-section" className="max-w-6xl mx-auto pt-8 md:pt-12 pb-12 md:pb-24 relative px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest text-white mb-6 border-b-4 border-red-600 inline-block pb-2" style={{ fontFamily: 'var(--font-slug)' }}>About Us</h2>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-medium max-w-3xl mx-auto">
            Welcome to Eddie Macs@VP, where history meets the thrill of the game! Nestled in the heart of Port Elizabeth, our sports club and grub has been a cornerstone of the community, with the building occupying the land we stand on since 1870, making us a part of a legacy that spans over a century.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-stone-900 border border-stone-800 p-8 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-1 transition-transform group">
            <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform origin-left">
              <Music className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-slug)' }}>The Experience</h3>
            <p className="text-stone-400 leading-relaxed">
              As Gqeberha's premier sports hub, we're not just a pub - we're an experience. From the moment you step through our doors, you're greeted with the electrifying atmosphere of live sports, the tantalizing aroma of affordable, mouth-watering meals, and the refreshing taste of cold beers on tap. And with the best local music talent providing the soundtrack to your visit, and enough space to host almost every function imaginable, every moment at Eddie Macs@VP is a celebration.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-stone-900 border border-stone-800 p-8 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-1 transition-transform group">
            <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform origin-left">
              <MapPin className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-slug)' }}>The Location</h3>
            <p className="text-stone-400 leading-relaxed">
              Conveniently located just five minutes from PE/GQ's Chief Dawid Stuurman International Airport, harbour, freeway, and beachfront, we offer secure parking for over 100 cars. Our spacious venue features a large lounge that can comfortably seat over 200 guests, a cozy side room for more intimate gatherings of up to 40 people, and expansive outdoor decks perfect for soaking up the sun.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-stone-900 border border-stone-800 p-8 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-1 transition-transform group">
            <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform origin-left">
              <Utensils className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-slug)' }}>The Menu</h3>
            <p className="text-stone-400 leading-relaxed">
              At Eddie Macs@VP, we pride ourselves on our fully licensed bar and diverse menu. Whether you're craving a full a la carte meal, a casual pub lunch, or a delicious platter (with vegetarian options available), we've got you covered. And with multiple indoor and outdoor braai facilities, we bring the authentic South African braai experience right to your table.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-stone-900 border border-stone-800 p-8 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-1 transition-transform group">
            <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform origin-left">
              <Tv className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-slug)' }}>The Action</h3>
            <p className="text-stone-400 leading-relaxed">
              But what's a sports club without the sports? We offer various flat screens and a big screen with surround sound, all equipped with multiple decoders to screen all major sporting events. So, whether you're a football fanatic, a rugby enthusiast, a cricket lover, or a motorsport gear head, you'll never miss a moment of the action.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl md:text-3xl font-black text-yellow-500 uppercase tracking-widest mt-8 py-8" style={{ fontFamily: 'var(--font-slug)' }}>
            So come on down to Eddie Macs@VP - where good friends meet, stories are shared, and memories are made. We can't wait to welcome you!
          </p>
          <div className="mt-8 text-center flex justify-center">
            <button 
              onClick={() => setCurrentView('downloads')}
              className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-3 md:py-4 px-10 md:px-16 text-xl md:text-2xl transition-all flex items-center justify-center gap-2 relative z-10 transform hover:scale-105 inline-flex"
              style={{ clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)' }}
            >
              DOWNLOAD OUR MENUS <ChevronRight strokeWidth={4} className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Together Banner */}
      <div className="w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] relative h-64 md:h-96 my-8 overflow-hidden">
        <img src="/assets/images/together.png" alt="Together" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Function Venue Section */}
      <div className="mt-4 w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] text-white py-16 px-4 md:px-8 relative overflow-hidden">
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8 border-b border-stone-800 pb-10">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-2 leading-none" style={{ fontFamily: 'var(--font-slug)' }}>
                PE/GQ's Premier <span className="text-red-600">Function & Events</span> Venue
              </h2>
            </div>
            <div className="hidden lg:block w-px h-24 bg-stone-700 mx-4"></div>
            <div className="flex-1 text-stone-300 text-lg md:text-xl leading-relaxed border-l-2 border-stone-700 pl-6 lg:border-none lg:pl-0 font-medium max-w-2xl">
              When it comes to hosting an unforgettable event, location is everything. That's why Eddie Macs@VP is the go-to function venue in Port Elizabeth. With our ability to accommodate 20 to 200+ guests, we offer the perfect setting for any occasion, from intimate gatherings to grand celebrations.
            </div>
          </div>

          <div className="flex flex-col gap-16 mb-16">
            {/* Why Choose */}
            <div>
              <h3 className="text-3xl font-black text-yellow-500 uppercase tracking-widest mb-8 text-center" style={{ fontFamily: 'var(--font-slug)' }}>
                Why Choose Eddie Macs@VP
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Users className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">20-200+ guests</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <MapPin className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Large Venue</span>
                </div>
                
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Car className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Ample safe parking</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Beer className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Drinks specials</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Utensils className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Meal specials</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Home className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">No mess at home</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Flame className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Braai facilities</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Sun className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Indoor & outdoor</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Pizza className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Fantastic meals</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Cigarette className="w-10 h-10 text-red-600 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Smoking & non-smoking sections</span>
                </div>
              </div>
            </div>

            {/* We Cater To */}
            <div>
              <h3 className="text-3xl font-black text-yellow-500 uppercase tracking-widest mb-8 text-center" style={{ fontFamily: 'var(--font-slug)' }}>
                We cater to:
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 mb-6">
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Calendar className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Year-End Functions</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Users className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Team Building</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Gift className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Fundraising Events</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Music className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Birthday Parties</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Tv className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">Trivia Evenings</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-3 group bg-stone-900 border border-stone-800 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                  <Briefcase className="w-10 h-10 text-yellow-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                  <span className="text-stone-200 font-bold uppercase tracking-wider text-xs md:text-sm">International Corporates</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 group bg-red-600/10 border border-red-900/50 p-6 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]">
                <CheckCircle2 className="w-10 h-10 text-red-500 shrink-0 transform group-hover:scale-110 transition-transform" />
                <span className="text-stone-100 font-black uppercase tracking-widest text-lg md:text-xl">Or any other event!</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center relative mb-16">
            <button 
              onClick={handleBookFunctionClick}
              className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest py-3 md:py-4 px-10 md:px-16 text-xl md:text-2xl transition-all flex items-center justify-center gap-2 relative z-10 transform hover:scale-105"
              style={{ clipPath: 'polygon(2% 0, 98% 2%, 100% 98%, 0 100%)' }}
            >
              BOOK A FUNCTION <ChevronRight strokeWidth={4} className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Image Banner */}
      <div className="w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] relative z-10 grid grid-cols-1 md:grid-cols-3">
        <div className="relative overflow-hidden h-[300px] md:h-[400px]">
          <img src="/assets/images/birthday.png" alt="Birthday" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="relative overflow-hidden h-[300px] md:h-[400px]">
          <img src="/assets/images/live_music.png" alt="Live Music" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="relative overflow-hidden h-[300px] md:h-[400px]">
          <img src="/assets/images/sports.png" alt="Sports" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>

      {/* Mailing List Section */}
      <MailingListForm />

      {/* Testimonials Carousel */}
      <div className="mt-16 bg-stone-900 border border-stone-800 p-8 md:p-12 shadow-xl relative text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white mb-8 inline-block border-b-2 border-red-600 pb-2" style={{ fontFamily: 'var(--font-slug)' }}>What Our Legends Say</h2>
        
        <div className="relative max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setCurrentTestimonial(p => (p === 0 ? testimonials.length - 1 : p - 1))}
            className="p-2 bg-stone-800 text-white hover:bg-red-600 transition-colors shadow-lg rounded-full"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex-1 px-8 min-h-[120px] flex flex-col justify-center">
            <p className="text-xl md:text-2xl font-bold italic text-stone-300 mb-4 transition-opacity duration-300">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="text-yellow-500 font-black uppercase tracking-wider">
              - {testimonials[currentTestimonial].name}
            </p>
          </div>
          
          <button 
            onClick={() => setCurrentTestimonial(p => (p === testimonials.length - 1 ? 0 : p + 1))}
            className="p-2 bg-stone-800 text-white hover:bg-red-600 transition-colors shadow-lg rounded-full"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${currentTestimonial === i ? 'bg-red-600' : 'bg-stone-700'}`} />
          ))}
        </div>
      </div>

      {/* Google Maps Location */}
      <div className="mt-16 border-4 border-stone-900 shadow-2xl relative h-96">
        <iframe 
          src="https://maps.google.com/maps?q=Eddie%20Macs%20@%20VP,%20Victoria%20Park%20Dr,%20South%20End,%20Port%20Elizabeth,%206001&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
      </div>

      {/* Contact Us & Function Booking Section */}
      <ContactAndBookingForm enquiryType={enquiryType} setEnquiryType={setEnquiryType} />
    </div>
  );
}

function MenusHubView({ setCurrentView }: { setCurrentView: (v: any) => void }) {
  const menus = [
    { id: 'main', title: 'Main Menu', subtitle: 'Burgers, Schnitzels, Ribs & More', color: 'bg-red-600', hoverColor: 'hover:bg-red-500', icon: Utensils },
    { id: 'specials', title: 'Daily Specials', subtitle: 'Unbeatable deals every day of the week', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-500', icon: Flame },
    { id: 'pizza', title: 'Pizza Menu', subtitle: 'Delicious Thin Based Pizzas', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-400', icon: Pizza },
    { id: 'treats', title: 'Tasty Treats', subtitle: 'Platters & Pizzas made for sharing', color: 'bg-yellow-500', textClass: 'text-stone-900', hoverColor: 'hover:bg-yellow-400', icon: Gift },
    { id: 'braai', title: 'Braai Packs', subtitle: 'Perfect for groups, teams & events', color: 'bg-red-700', hoverColor: 'hover:bg-red-600', icon: Flame },
    { id: 'additional', title: 'Additional Menu Options', subtitle: 'Snack platters for functions', color: 'bg-stone-700', hoverColor: 'hover:bg-stone-600', icon: Users },
    { id: 'halfprice', title: 'Wednesday Half-Price', subtitle: 'Famous Captains Table Deals', color: 'bg-green-600', hoverColor: 'hover:bg-green-500', icon: CheckCircle2 },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-red-600 drop-shadow-xl mb-0 leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Our</h2>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Menus</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menus.map(menu => {
          const Icon = menu.icon;
          return (
            <button 
              key={menu.id}
              onClick={() => setCurrentView(menu.id)}
              className={`${menu.color} ${menu.hoverColor} ${menu.textClass || 'text-white'} p-8 text-left transition-all transform hover:-translate-y-2 hover:scale-[1.02] shadow-[8px_8px_0_0_#1c1917] border-4 border-stone-950 flex flex-col justify-between group h-56 relative overflow-hidden`}
            >
              <div className="absolute -right-6 -bottom-6 opacity-20 transform -rotate-12">
                <Icon className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-widest drop-shadow-sm">{menu.title}</h3>
                <p className="mt-2 font-bold opacity-90 text-sm uppercase tracking-wide max-w-[80%]">{menu.subtitle}</p>
              </div>
              <div className="flex justify-end relative z-10">
                <div className="bg-stone-950 text-white p-3 rounded-full transform group-hover:translate-x-2 transition-transform shadow-lg">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MenuWrapper({ setCurrentView, children, pdfFile }: { setCurrentView: (v: any) => void, children: React.ReactNode, pdfFile?: string }) {
  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => setCurrentView('menus')}
          className="flex items-center gap-2 text-stone-400 hover:text-white font-bold uppercase tracking-wider transition-colors bg-stone-900 px-4 py-2 border border-stone-800 hover:bg-stone-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Menus
        </button>
        {pdfFile && (
          <a
            href={`/assets/menus/${pdfFile}`}
            download={pdfFile}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider transition-all px-4 py-2 shadow-[2px_2px_0_0_#000] hover:scale-105"
          >
            <Download className="w-4 h-4" /> Download PDF Menu
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

function SpecialsView({ specials }: { specials: any[] }) {
  // If no specials in DB yet, show placeholders based on posters
  const displaySpecials = specials.length > 0 ? specials : [
    {
        "id": "s1",
        "dayOfWeek": "EVERYDAY",
        "title": "English Breakfast",
        "description": "1x egg, 2x bacon, 1x sausage & hand-cut fries",
        "price": "R59.90",
        "colorTheme": "yellow"
    },
    {
        "id": "s2",
        "dayOfWeek": "MONDAY",
        "title": "Buy 1 Get One Free Pizza",
        "description": "Buy any deluxe pizza & get a basic pizza free!",
        "price": "FREE PIZZA",
        "colorTheme": "blue"
    },
    {
        "id": "s3",
        "dayOfWeek": "MONDAY",
        "title": "Chicken Schnitzel",
        "description": "Served with hand-cut fries",
        "price": "R99",
        "colorTheme": "blue"
    },
    {
        "id": "s4",
        "dayOfWeek": "TUESDAY",
        "title": "Braai Meal",
        "description": "Lamb chop, chicken sosatie, wors, pork rasher & hand cut fries",
        "price": "R99",
        "colorTheme": "cyan"
    },
    {
        "id": "s5",
        "dayOfWeek": "TUESDAY",
        "title": "Bacon & Cheese Burger",
        "description": "Homemade bacon & cheese burger served with hand-cut fries",
        "price": "R99",
        "colorTheme": "cyan"
    },
    {
        "id": "s6",
        "dayOfWeek": "WEDNESDAY",
        "title": "Famous Half-Price Captains Table",
        "description": "Choice of 16 main meals @ half price. All day special",
        "price": "HALF PRICE",
        "colorTheme": "green"
    },
    {
        "id": "s7",
        "dayOfWeek": "THURSDAY",
        "title": "Chicken Schnitzel",
        "description": "Served with hand-cut fries",
        "price": "R99",
        "colorTheme": "orange"
    },
    {
        "id": "s8",
        "dayOfWeek": "THURSDAY",
        "title": "Steak Roll & Hand-Cut Fries",
        "description": "Steak smothered in fried onions on a fresh hotdog roll & hand-cut fries",
        "price": "R99",
        "colorTheme": "orange"
    },
    {
        "id": "s9",
        "dayOfWeek": "FRIDAY",
        "title": "Friday R99 Meals",
        "description": "Eisbein, Chicken Schnitzel, Beef Curry, Fish & Chips, Bangers & Mash",
        "price": "R99 EACH",
        "colorTheme": "red"
    },
    {
        "id": "s10",
        "dayOfWeek": "SATURDAY",
        "title": "800gr Ribs",
        "description": "",
        "price": "R199",
        "colorTheme": "pink"
    },
    {
        "id": "s11",
        "dayOfWeek": "SATURDAY",
        "title": "Any Basic Pizza",
        "description": "",
        "price": "R129",
        "colorTheme": "pink"
    },
    {
        "id": "s12",
        "dayOfWeek": "SATURDAY",
        "title": "Any Deluxe Pizza",
        "description": "",
        "price": "R149",
        "colorTheme": "pink"
    },
    {
        "id": "s13",
        "dayOfWeek": "SATURDAY",
        "title": "Eisbein",
        "description": "Served crispy with sauerkraut & mash",
        "price": "R169",
        "colorTheme": "pink"
    },
    {
        "id": "s14",
        "dayOfWeek": "SUNDAY",
        "title": "Any Basic Pizza",
        "description": "",
        "price": "R129",
        "colorTheme": "yellow"
    },
    {
        "id": "s15",
        "dayOfWeek": "SUNDAY",
        "title": "Any Deluxe Pizza",
        "description": "",
        "price": "R149",
        "colorTheme": "yellow"
    }
];

  const getColorClass = (theme: string) => {
    switch (theme) {
      case 'blue': return 'bg-blue-500';
      case 'cyan': return 'bg-cyan-400 text-stone-900';
      case 'green': return 'bg-green-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-600';
      case 'pink': return 'bg-fuchsia-500';
      case 'yellow': return 'bg-yellow-400 text-stone-900';
      default: return 'bg-stone-700';
    }
  };

  const getTextColorClass = (theme: string) => {
    switch (theme) {
      case 'cyan':
      case 'yellow': return 'text-stone-900';
      default: return 'text-white';
    }
  };

  // Group by day
  const grouped = displaySpecials.reduce((acc, curr) => {
    if (!acc[curr.dayOfWeek]) acc[curr.dayOfWeek] = [];
    acc[curr.dayOfWeek].push(curr);
    return acc;
  }, {} as Record<string, any[]>);

  const daysOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'EVERYDAY'];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-red-600 mb-2 drop-shadow-lg" style={{ fontFamily: 'var(--font-slug)' }}>Daily</h2>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Specials</h2>
        <div className="inline-block mt-6 px-6 py-2 bg-red-600 text-white font-black uppercase tracking-widest transform rotate-2 shadow-lg">Sit Down Only</div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {daysOrder.filter(day => grouped[day]).map(day => {
          const daySpecials = grouped[day];
          const theme = daySpecials[0].colorTheme;
          const bgClass = getColorClass(theme);
          const textClass = getTextColorClass(theme);
          
          return (
            <div key={day} className="break-inside-avoid relative p-[2px] mb-6">
              {/* Torn paper effect container */}
              <div className="absolute inset-0 bg-stone-800 rounded-sm transform translate-x-2 translate-y-2"></div>
              <div className="relative bg-stone-900 border border-stone-700 p-6 shadow-xl">
                
                {/* Day Header Ribbon */}
                <div className={`absolute -top-4 -left-4 ${bgClass} ${textClass} px-6 py-2 font-black uppercase tracking-widest text-xl transform -rotate-3 shadow-lg border-2 border-stone-950`}>
                  {day}
                </div>
                
                <div className="mt-8 space-y-6">
                  {daySpecials.map(s => (
                    <div key={s.id} className="relative border-b border-stone-800 border-dashed pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className={`text-xl font-black uppercase leading-tight ${theme === 'yellow' || theme === 'cyan' ? 'text-white' : 'text-'+theme+'-400'} drop-shadow-sm`}>{s.title}</h4>
                          {s.description && <p className="text-stone-400 text-sm mt-1 uppercase font-bold tracking-wide">{s.description}</p>}
                        </div>
                        <div className="shrink-0 relative">
                          <div className={`absolute inset-0 ${bgClass} blur-md opacity-20`}></div>
                          <div className="relative text-2xl font-black tracking-tighter text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                            {s.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MainMenuView({ categories, items }: { categories: any[], items: any[] }) {
  // Placeholders if DB empty
  const displayCats = categories.length > 0 ? categories : [
    {
        "id": "cat_breakfast",
        "name": "Breakfast",
        "order": 1
    },
    {
        "id": "cat_starters",
        "name": "Kick Off Starters",
        "order": 2
    },
    {
        "id": "cat_salads",
        "name": "Sportsmans Salads",
        "order": 3
    },
    {
        "id": "cat_toasties",
        "name": "Toasties",
        "order": 4
    },
    {
        "id": "cat_kids",
        "name": "Little Sports",
        "order": 5
    },
    {
        "id": "cat_shakes",
        "name": "Milkshakes",
        "order": 6
    },
    {
        "id": "cat_main",
        "name": "Main Meals",
        "order": 7
    },
    {
        "id": "cat_sides",
        "name": "Offside (Sides)",
        "order": 8
    },
    {
        "id": "cat_baskets",
        "name": "Baskets",
        "order": 9
    },
    {
        "id": "cat_desserts",
        "name": "Final Whistle (Desserts)",
        "order": 10
    }
];

  const displayItems = items.length > 0 ? items : [
    {
        "id": "m1",
        "categoryId": "cat_breakfast",
        "name": "English Breakfast",
        "description": "1 egg, bacon, 1 pork/beef sausage, mushrooms, toast",
        "price": "R99"
    },
    {
        "id": "m2",
        "categoryId": "cat_breakfast",
        "name": "3 Egg Omlete",
        "description": "Add your choice of filling: Ham / Bacon / Cheese / Mushroom R25 each",
        "price": "R48"
    },
    {
        "id": "m3",
        "categoryId": "cat_breakfast",
        "name": "Captain's Breakfast",
        "description": "2 eggs, bacon, 2 pork/beef sausages, mushrooms, tomato, toast",
        "price": "R129"
    },
    {
        "id": "m4",
        "categoryId": "cat_breakfast",
        "name": "Biker's Breakfast",
        "description": "(Sat & Sun: 10am - 4pm) 2 eggs, bacon, 2 pork/beef sausages, mushrooms, tomato, toast",
        "price": "R99"
    },
    {
        "id": "m5",
        "categoryId": "cat_starters",
        "name": "Chicken Livers Peri-Peri",
        "description": "Sautéed chicken livers with a chilli lemon sauce served with toast",
        "price": "R89"
    },
    {
        "id": "m6",
        "categoryId": "cat_starters",
        "name": "Garlic, Cheese & Bacon Roll",
        "description": "Oven fresh roll dripping in hot garlic butter & topped with melted cheese & crispy bacon",
        "price": "R89"
    },
    {
        "id": "m7",
        "categoryId": "cat_starters",
        "name": "Crumbed Mushrooms",
        "description": "Crumbed mushrooms served with tartar sauce",
        "price": "R89"
    },
    {
        "id": "m8",
        "categoryId": "cat_starters",
        "name": "Escargot",
        "description": "6 sizzling snails in garlic butter / creamy Roquefort & white wine sauce, served with bread",
        "price": "R129"
    },
    {
        "id": "m9",
        "categoryId": "cat_starters",
        "name": "Homemade Soup",
        "description": "Hearty oxtail/country veg. Served with bread & butter",
        "price": "R69"
    },
    {
        "id": "m10",
        "categoryId": "cat_starters",
        "name": "Boerewors / Cheezy Griller Roll",
        "description": "",
        "price": "R89"
    },
    {
        "id": "m11",
        "categoryId": "cat_salads",
        "name": "Greek Salad",
        "description": "Grated feta & calamata olives",
        "price": "R99"
    },
    {
        "id": "m12",
        "categoryId": "cat_salads",
        "name": "Cajun Chicken Salad",
        "description": "Cajun spiced chicken strips on fresh greens in a peach, chilli & lemon dressing",
        "price": "R139"
    },
    {
        "id": "m13",
        "categoryId": "cat_salads",
        "name": "Salad Roll",
        "description": "A selection of salad greens, cheddar cheese & mayo on a toasted roll",
        "price": "R89"
    },
    {
        "id": "m14",
        "categoryId": "cat_salads",
        "name": "Veggie Burger",
        "description": "Guilt-free soya or mushroom patty on an oven fresh roll with tomato & lettuce served with hand-crafted fries",
        "price": "R99"
    },
    {
        "id": "m15",
        "categoryId": "cat_toasties",
        "name": "Cheese & Tomato",
        "description": "White or wholewheat. Add fries for R35",
        "price": "R69"
    },
    {
        "id": "m16",
        "categoryId": "cat_toasties",
        "name": "Ham/Cheese/Tomato",
        "description": "White or wholewheat. Add fries for R35",
        "price": "R79"
    },
    {
        "id": "m17",
        "categoryId": "cat_toasties",
        "name": "Chicken Mayo",
        "description": "White or wholewheat. Add fries for R35",
        "price": "R79"
    },
    {
        "id": "m18",
        "categoryId": "cat_toasties",
        "name": "Egg & Bacon",
        "description": "White or wholewheat. Add fries for R35",
        "price": "R79"
    },
    {
        "id": "m19",
        "categoryId": "cat_toasties",
        "name": "Club Sandwich",
        "description": "Chicken, cheese, tomato, bacon, lettuce & onion. White or wholewheat. Add fries for R35",
        "price": "R119"
    },
    {
        "id": "m20",
        "categoryId": "cat_kids",
        "name": "Fish Fingers",
        "description": "Served with hand-crafted fries",
        "price": "R79"
    },
    {
        "id": "m21",
        "categoryId": "cat_kids",
        "name": "Mini Beef/Chicken Burger",
        "description": "Served with hand-crafted fries",
        "price": "R89"
    },
    {
        "id": "m22",
        "categoryId": "cat_kids",
        "name": "Hot Dog",
        "description": "Served with hand-crafted fries",
        "price": "R79"
    },
    {
        "id": "m23",
        "categoryId": "cat_kids",
        "name": "Mini Pizza",
        "description": "Served with hand-crafted fries",
        "price": "R89"
    },
    {
        "id": "m24",
        "categoryId": "cat_shakes",
        "name": "Vanilla / Chocolate / Strawberry / Bubblegum",
        "description": "",
        "price": "R58"
    },
    {
        "id": "m25",
        "categoryId": "cat_shakes",
        "name": "Bar One / Coffee",
        "description": "",
        "price": "R60"
    },
    {
        "id": "m26",
        "categoryId": "cat_shakes",
        "name": "Ferrero Rocher / Cookies & Cream",
        "description": "",
        "price": "R64"
    },
    {
        "id": "m27",
        "categoryId": "cat_main",
        "name": "Burger",
        "description": "Homemade 180g beef/grilled chicken burger, with a side of hand-crafted fries. Add bacon/cheese - R20 each",
        "price": "R125"
    },
    {
        "id": "m28",
        "categoryId": "cat_main",
        "name": "Chicken Schnitzel",
        "description": "Crumbed breast with creamy sauce & hand-crafted fries",
        "price": "R149"
    },
    {
        "id": "m29",
        "categoryId": "cat_main",
        "name": "Bangers & Mash",
        "description": "3 pork/beef sausages with mash & onion gravy",
        "price": "R139"
    },
    {
        "id": "m30",
        "categoryId": "cat_main",
        "name": "Fish & Chips",
        "description": "Golden-fried, served with hand-crafted fries & our tangy sauce",
        "price": "R159"
    },
    {
        "id": "m31",
        "categoryId": "cat_main",
        "name": "Braai Meal",
        "description": "Lamb chop, chicken sosatie, wors, pork rasher & hand crafted fries",
        "price": "R189"
    },
    {
        "id": "m32",
        "categoryId": "cat_main",
        "name": "Nachos",
        "description": "Spicy mince smothered in cheese, & served with salsa, guacamole & sour cream",
        "price": "R169"
    },
    {
        "id": "m33",
        "categoryId": "cat_main",
        "name": "250g Steak, Egg & Chips",
        "description": "Sirloin served with an egg & hand-crafted fries",
        "price": "R169"
    },
    {
        "id": "m34",
        "categoryId": "cat_main",
        "name": "Eisbein",
        "description": "\"The house speciality\" served crispy with sauerkraut & mash",
        "price": "R199"
    },
    {
        "id": "m35",
        "categoryId": "cat_main",
        "name": "T-Bone 350g",
        "description": "Served rare, medium rare, medium with hand-crafted fries",
        "price": "R189"
    },
    {
        "id": "m36",
        "categoryId": "cat_main",
        "name": "400g Ribs",
        "description": "Served with hand-crafted fries",
        "price": "R189"
    },
    {
        "id": "m37",
        "categoryId": "cat_main",
        "name": "800gr Ribs",
        "description": "Served with hand-crafted fries",
        "price": "R289"
    },
    {
        "id": "m38",
        "categoryId": "cat_main",
        "name": "Mixed Grill",
        "description": "Loin chop, sirloin, pork/beef sausage & egg with hand-crafted fries",
        "price": "R189"
    },
    {
        "id": "m39",
        "categoryId": "cat_main",
        "name": "Grilled Rump",
        "description": "300g Rump Swiss Cut",
        "price": "R189"
    },
    {
        "id": "m40",
        "categoryId": "cat_main",
        "name": "Calamari",
        "description": "Grilled in garlic, lemon & herb/deep fried with hand-crafted fries & salad",
        "price": "R179"
    },
    {
        "id": "m41",
        "categoryId": "cat_main",
        "name": "Surf & Turf",
        "description": "200g prime rump & calamari dusted with seasonal flour",
        "price": "R219"
    },
    {
        "id": "m42",
        "categoryId": "cat_main",
        "name": "Fish & Calamari",
        "description": "Golden fried hake fillet with grilled/fried calamari",
        "price": "R219"
    },
    {
        "id": "m43",
        "categoryId": "cat_sides",
        "name": "Hand-Crafted Fries",
        "description": "Side order/Full order",
        "price": "R48/R68"
    },
    {
        "id": "m44",
        "categoryId": "cat_sides",
        "name": "Onion Rings",
        "description": "Side order of our famous beer-battered onion rings",
        "price": "R48"
    },
    {
        "id": "m45",
        "categoryId": "cat_sides",
        "name": "Egg / Veg of the Day / Bacon / Sausage / Cheese / Feta / All Dips",
        "description": "",
        "price": "R20"
    },
    {
        "id": "m46",
        "categoryId": "cat_sides",
        "name": "All Sauces",
        "description": "",
        "price": "R28"
    },
    {
        "id": "m47",
        "categoryId": "cat_baskets",
        "name": "Midi Basket",
        "description": "2 portion cheezy sausage / 2 portion samoosa / 2 portion springroll / 100g chicken strips / side order hand-crafted fries / onion rings",
        "price": "R159"
    },
    {
        "id": "m48",
        "categoryId": "cat_baskets",
        "name": "Maxi Basket",
        "description": "4 portion cheezy sausage / 4 portion samoosa / 4 portion springroll / 200g chicken strips / full order hand-crafted fries / onion rings",
        "price": "R299"
    },
    {
        "id": "m49",
        "categoryId": "cat_desserts",
        "name": "Irish Coffee",
        "description": "The age-old partnership of coffee & whiskey",
        "price": "R69"
    },
    {
        "id": "m50",
        "categoryId": "cat_desserts",
        "name": "Dom Pedro",
        "description": "Ice cream & whiskey/amarula/cape velvet/kahlua",
        "price": "R69"
    },
    {
        "id": "m51",
        "categoryId": "cat_desserts",
        "name": "Malva Pudding",
        "description": "Served with ice-cream",
        "price": "R69"
    },
    {
        "id": "m52",
        "categoryId": "cat_desserts",
        "name": "Bar One Chocolate Cake",
        "description": "",
        "price": "R79"
    },
    {
        "id": "m53",
        "categoryId": "cat_desserts",
        "name": "Ice Cream & Bar One Sauce",
        "description": "",
        "price": "R69"
    },
    {
        "id": "m54",
        "categoryId": "cat_desserts",
        "name": "Decadent Chocolate Brownie",
        "description": "Served with ice-cream",
        "price": "R69"
    }
];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-red-600 mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Main</h2>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Menu</h2>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {displayCats.map(cat => {
          const catItems = displayItems.filter(i => i.categoryId === cat.id);
          if (catItems.length === 0) return null;
          
          return (
            <div key={cat.id} className="relative">
              <div className="bg-red-600 inline-block px-4 py-1 transform -skew-x-12 mb-6 shadow-lg">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white transform skew-x-12">{cat.name}</h3>
              </div>
              
              <div className="space-y-6">
                {catItems.map(i => (
                  <div key={i.id} className="group">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="text-xl font-bold uppercase tracking-wider text-white group-hover:text-red-400 transition-colors">{i.name}</h4>
                      <div className="flex-1 border-b-2 border-stone-800 border-dotted opacity-50 relative top-[-6px]"></div>
                      <span className="text-xl font-black text-yellow-500 tracking-tighter">{i.price}</span>
                    </div>
                    {i.description && <p className="text-stone-400 text-sm mt-1 uppercase tracking-wide max-w-[85%]">{i.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 text-center">
         <div className="inline-block border-2 border-red-600 p-4 transform rotate-1">
            <p className="text-2xl font-black uppercase text-red-500 tracking-widest">All Weights Pre-Cooked</p>
         </div>
      </div>
    </div>
  );
}



function PizzaMenuView() {
  const categories = [
    {
        "id": "p_basic",
        "name": "Basic Pizzas",
        "order": 1
    },
    {
        "id": "p_deluxe",
        "name": "Deluxe Pizzas",
        "order": 2
    }
];
  const items = [
    {
        "id": "p1",
        "categoryId": "p_basic",
        "name": "Focaccia",
        "description": "Garlic Butter",
        "price": "R69"
    },
    {
        "id": "p2",
        "categoryId": "p_basic",
        "name": "Vegetarian Pizza",
        "description": "Tomatoes, garlic, onions, herbs & mozzarella",
        "price": "R99"
    },
    {
        "id": "p3",
        "categoryId": "p_basic",
        "name": "Margherita Pizza",
        "description": "Cherry tomatoes, basil, garlic, parmesan & mozzarella",
        "price": "R99"
    },
    {
        "id": "p4",
        "categoryId": "p_basic",
        "name": "Tropical Pizza",
        "description": "Ham & pineapple & mozzarella",
        "price": "R139"
    },
    {
        "id": "p5",
        "categoryId": "p_basic",
        "name": "Bacon & Cheese Pizza",
        "description": "Bacon, cheddar & mozzarella",
        "price": "R149"
    },
    {
        "id": "p6",
        "categoryId": "p_basic",
        "name": "Regina Pizza",
        "description": "Mushrooms, ham, olives, garlic & mozzarella",
        "price": "R149"
    },
    {
        "id": "p7",
        "categoryId": "p_basic",
        "name": "Hawaiian Pizza",
        "description": "Ham, BBQ sauce, pineapple & mozzarella",
        "price": "R149"
    },
    {
        "id": "p8",
        "categoryId": "p_deluxe",
        "name": "Cheesy Griller",
        "description": "Cheese griller, caramalised onions & mozzarella",
        "price": "R159"
    },
    {
        "id": "p9",
        "categoryId": "p_deluxe",
        "name": "Pork Deluxe",
        "description": "Pulled pork & mozzarella",
        "price": "R159"
    },
    {
        "id": "p10",
        "categoryId": "p_deluxe",
        "name": "Pepperoni Pizza",
        "description": "Pepperoni, mushrooms, olives & mozzarella",
        "price": "R169"
    },
    {
        "id": "p11",
        "categoryId": "p_deluxe",
        "name": "Spicy BBQ Chicken",
        "description": "Chicken, jalapenos, bacon & mozzarella",
        "price": "R169"
    },
    {
        "id": "p12",
        "categoryId": "p_deluxe",
        "name": "Chicken & Mushroom",
        "description": "Chicken, mushrooms, creamy mushroom sauce & mozzarella",
        "price": "R169"
    },
    {
        "id": "p13",
        "categoryId": "p_deluxe",
        "name": "Cheesy Steak Pizza",
        "description": "Sirloin steak, peppers, BBQ sauce & mozzarella",
        "price": "R179"
    },
    {
        "id": "p14",
        "categoryId": "p_deluxe",
        "name": "Meaty Pizza",
        "description": "Spicy mince, chillies & mozzarella",
        "price": "R189"
    }
];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-red-600 mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Pizza</h2>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Menu</h2>
         </div>
      </div>
      <p className="text-center text-stone-400 font-bold uppercase tracking-widest mb-12">Delicious Thin Based Pizzas • WhatsApp & Collect: 071 794 3537</p>

      {categories.map((cat: any) => {
        const catItems = items.filter((i: any) => i.categoryId === cat.id);
        return (
          <div key={cat.id} className="mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-yellow-500 uppercase tracking-widest mb-8 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>{cat.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {catItems.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start border-b border-stone-800/50 pb-4 group hover:bg-stone-900 transition-colors p-4 -mx-4 rounded-lg">
                  <div className="pr-4">
                    <h4 className="text-xl font-bold uppercase tracking-wider text-white group-hover:text-red-500 transition-colors">{item.name}</h4>
                    {item.description && <p className="text-stone-400 text-sm mt-1 uppercase tracking-wide font-medium">{item.description}</p>}
                  </div>
                  <div className="text-xl md:text-2xl font-black text-yellow-500 whitespace-nowrap">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      <div className="bg-stone-900 border border-stone-800 p-6 text-center mt-8">
        <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Add Extras</h3>
        <p className="text-stone-400 font-bold uppercase tracking-wider">Bacon / Cheddar / Mozzarella / Garlic / Chillies R30</p>
        <p className="text-red-500 font-bold uppercase tracking-wider mt-4">We are not a fast food outlet. Pizzas are all freshly prepared.</p>
      </div>
    </div>
  );
}

function AdditionalMenuOptionsView() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-red-600 mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Additional</h2>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Menu Options</h2>
         </div>
      </div>
      <p className="text-center text-yellow-500 font-bold uppercase tracking-widest mb-12 text-xl">Perfect for groups, teams & functions!</p>

      <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-yellow-500 text-black font-black uppercase tracking-widest py-2 px-6 transform rotate-45 translate-x-8 translate-y-6 shadow-lg">R99 pp</div>
        <h3 className="text-4xl font-black uppercase tracking-widest text-white mb-6 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Snack Platters</h3>
        <p className="text-stone-400 font-bold uppercase tracking-wider mb-6 text-lg">Platters for 10/20/30 People</p>
        <ul className="space-y-4 text-stone-200 font-bold uppercase tracking-wider">
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 2 x Onion Rings</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 x Cocktail Spring Roll</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 x Cocktail Cheesy Sausage</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 x Cocktail Samoosa</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 x Strip Cajun Chicken Strips</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 x Strip Crispy Calamari Strips</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Handful of Hand-Crafted Fries</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Selection of Dips</li>
        </ul>
      </div>

      <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl mb-12">
        <h3 className="text-4xl font-black uppercase tracking-widest text-red-600 mb-6 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Braai Packs</h3>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-stone-800/50 pb-4">
            <span className="text-xl font-bold uppercase tracking-wider text-white">4PC Braaipack</span>
            <span className="text-2xl font-black text-yellow-500">R129</span>
          </div>
          <div className="flex justify-between items-center border-b border-stone-800/50 pb-4">
            <span className="text-xl font-bold uppercase tracking-wider text-white">4 PC Braai Packs, Salad, Plates, Cutlery & Condiments</span>
            <span className="text-2xl font-black text-yellow-500">R159</span>
          </div>
        </div>
        <p className="mt-6 text-center text-red-500 font-bold uppercase tracking-widest">Our meat is from Cuyler Butchery - SA's No. 1 Butcher!</p>
      </div>
      
      <div className="bg-stone-950 border border-stone-800 p-8 shadow-xl text-center">
         <p className="text-yellow-500 font-bold uppercase tracking-widest text-lg mb-2">10% Service Gratuity will be levied for functions over 10 people</p>
         <p className="text-red-500 font-bold uppercase tracking-widest text-lg">All food purchases to be paid min. 10 days prior to function date</p>
      </div>
    </div>
  );
}

function WednesdayHalfPriceView() {
  const meals = [
    {
        "name": "Burger",
        "orig": "R125",
        "half": "R63"
    },
    {
        "name": "Chicken Schnitzel",
        "orig": "R149",
        "half": "R75"
    },
    {
        "name": "Bangers & Mash",
        "orig": "R139",
        "half": "R70"
    },
    {
        "name": "Fish & Chips",
        "orig": "R159",
        "half": "R80"
    },
    {
        "name": "Braai Meal",
        "orig": "R189",
        "half": "R95"
    },
    {
        "name": "Nachos",
        "orig": "R169",
        "half": "R85"
    },
    {
        "name": "250g Steak, Egg & Chips",
        "orig": "R169",
        "half": "R85"
    },
    {
        "name": "Eisbein",
        "orig": "R199",
        "half": "R100"
    },
    {
        "name": "T-Bone 350g",
        "orig": "R189",
        "half": "R95"
    },
    {
        "name": "400g Ribs",
        "orig": "R189",
        "half": "R95"
    },
    {
        "name": "800gr Ribs",
        "orig": "R299",
        "half": "R145"
    },
    {
        "name": "Mixed Grill",
        "orig": "R189",
        "half": "R95"
    },
    {
        "name": "Grilled Rump",
        "orig": "R189",
        "half": "R95"
    },
    {
        "name": "Calamari",
        "orig": "R179",
        "half": "R90"
    },
    {
        "name": "Surf & Turf",
        "orig": "R219",
        "half": "R110"
    },
    {
        "name": "Fish & Calamari",
        "orig": "R219",
        "half": "R110"
    }
];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-white mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Wednesday</h2>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-red-600 drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Half-Price</h2>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-yellow-500 drop-shadow-xl mt-2 leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Captains Table</h2>
         </div>
      </div>
      <p className="text-center text-stone-300 font-bold uppercase tracking-widest mb-12 text-xl">Great Food. Great Company. Half The Price!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {meals.map((meal: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center border-b border-stone-800/50 pb-4 group hover:bg-stone-900 p-2 -mx-2 rounded transition-colors">
            <span className="text-lg font-bold uppercase tracking-wider text-white">{meal.name}</span>
            <div className="flex items-center gap-3">
               <span className="text-stone-500 line-through text-sm font-black">{meal.orig}</span>
               <span className="text-2xl font-black text-red-600 bg-red-600/10 px-3 py-1 rounded border border-red-900/50">{meal.half}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-stone-500 font-bold uppercase tracking-widest mt-12">All Weights Pre-Cooked</p>
    </div>
  );
}


function BraaiPacksView() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-red-600 mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Braai</h2>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Packs</h2>
         </div>
      </div>
      <p className="text-center text-yellow-500 font-bold uppercase tracking-widest mb-12 text-xl">Perfect for groups, teams & events! Everything you need for a legendary braai!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white font-black uppercase tracking-widest py-2 px-8 transform rotate-45 translate-x-8 translate-y-6 shadow-lg">R129 pp</div>
          <h3 className="text-4xl font-black uppercase tracking-widest text-white mb-6 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Braai Pack</h3>
          <ul className="space-y-4 text-stone-200 font-bold uppercase tracking-wider">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Lamb Chop</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Wors</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Pork Rasher</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Chicken Sosatie</li>
          </ul>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mt-6 pt-4 border-t border-stone-800/50">(Sourced from Cuyler Butchery, Uitenhage - Voted #1 out of 130,000 butchers in SA!)</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-black font-black uppercase tracking-widest py-2 px-8 transform rotate-45 translate-x-8 translate-y-6 shadow-lg">R159 pp</div>
          <h3 className="text-4xl font-black uppercase tracking-widest text-yellow-500 mb-6 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Braai Meal Ultimate</h3>
          <p className="text-stone-400 font-bold uppercase tracking-wider mb-4">Includes everything in the braai pack plus:</p>
          <ul className="space-y-4 text-stone-200 font-bold uppercase tracking-wider">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Potato OR Noodle Salad</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Plates, Condiments & Cutlery</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Braai Bin & Grill</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 2 Bags Wood (for first 10 guests)</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> 1 Extra Bag per 5 guests</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-red-600 w-5 h-5" /> Firelighters, Kindling & Tongs</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-600/10 border border-red-900/50 p-6 flex flex-col items-center justify-center text-center gap-2 mb-8">
        <Users className="w-10 h-10 text-red-500 mb-2" />
        <h4 className="text-white font-black uppercase tracking-widest text-xl">Perfect for groups of 10 or more people!</h4>
        <p className="text-stone-400 font-bold uppercase tracking-wider">Great for birthdays, team building, corporate, functions & more!</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between bg-yellow-500 text-black font-black uppercase tracking-widest p-4 px-8 text-center sm:text-left gap-4">
        <span>Minimum 10 days' notice required</span>
        <Flame className="w-6 h-6 hidden sm:block" />
        <span>Full payment confirms booking</span>
      </div>
    </div>
  );
}

function TastyTreatsView() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-red-600 drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Tasty</h2>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Treats</h2>
        <div className="inline-block mt-4 px-6 py-2 bg-yellow-500 text-black font-black uppercase tracking-widest transform rotate-1 shadow-lg">Perfect for sharing. Made for good times</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Platters */}
        <div className="bg-stone-900 border border-stone-700 p-8 shadow-2xl relative">
          <div className="absolute -top-4 -left-4 bg-red-600 text-white font-black px-4 py-2 transform -rotate-12 uppercase tracking-widest border-2 border-stone-950">Deal</div>
          
          <div className="bg-yellow-500 inline-block px-6 py-2 transform -skew-x-12 mb-8">
            <h3 className="text-3xl font-black uppercase tracking-widest text-black transform skew-x-12">Lekker Snack</h3>
            <h3 className="text-3xl font-black uppercase tracking-widest text-black transform skew-x-12">Platters</h3>
          </div>
          
          <p className="text-stone-300 font-bold uppercase tracking-widest mb-6">Bargain buy for the table!</p>
          
          <div className="space-y-4 mb-8 max-w-sm">
             {[
               { qty: 'X4', price: 'R299' },
               { qty: 'X6', price: 'R449' },
               { qty: 'X8', price: 'R599' },
               { qty: 'X10', price: 'R749' }
             ].map(item => (
               <div key={item.qty} className="flex justify-between items-end border-b border-stone-700 border-dotted pb-1">
                 <span className="text-2xl font-black text-white">{item.qty}</span>
                 <span className="text-2xl font-black text-red-500">{item.price}</span>
               </div>
             ))}
          </div>
          
          <p className="text-stone-400 font-bold uppercase text-sm leading-relaxed">
            Cheezy Sausage, Samoosa, Spring Roll, 100gm Chicken Strips & Handful of Hand Crafted Fries
          </p>
        </div>

        {/* Other Treats */}
        <div className="space-y-8">
          
          <div className="bg-stone-900 border border-stone-700 p-6 shadow-xl relative overflow-hidden">
             <div className="bg-red-600 text-white inline-block px-4 py-1 mb-4">
                <h4 className="text-2xl font-black uppercase tracking-widest">Burger - R99</h4>
             </div>
             <p className="text-stone-300 font-bold uppercase text-sm mb-2">Homemade 180g beef or grilled chicken burger on an oven fresh roll with a side of hand-crafted fries</p>
             <p className="text-yellow-500 font-black text-sm uppercase">Add Bacon/Cheese = R20 Each</p>
          </div>

          <div className="bg-stone-900 border border-stone-700 p-6 shadow-xl">
             <div className="bg-red-600 text-white inline-block px-4 py-1 mb-4">
                <h4 className="text-2xl font-black uppercase tracking-widest">Chicken Wrap & Fries - R99</h4>
             </div>
             <p className="text-stone-300 font-bold uppercase text-sm">Original/Sweet Chilli, with crumbed chicken strips, lettuce, tomato & cucumber on a tortilla & a side of hand-crafted fries</p>
          </div>
          
        </div>
        
        {/* Pizzas */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-700 p-8 shadow-2xl mt-4">
           <h3 className="text-4xl font-black uppercase tracking-widest text-white mb-8 border-b-2 border-red-600 inline-block pb-1">Pizzas</h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { name: 'Tropical', price: 'R139', desc: 'Ham & Pineapple & Mozzarella' },
                { name: 'Bacon & Cheese', price: 'R149', desc: 'Bacon, Cheddar & Mozzarella' },
                { name: 'Cheesy Griller', price: 'R159', desc: 'Cheese Griller, Caramelised Onions & Mozzarella' },
                { name: 'BBQ Chicken', price: 'R169', desc: 'Chicken, Jalapenos, Bacon & Mozzarella' }
              ].map(p => (
                <div key={p.name} className="border-r last:border-0 border-stone-800 pr-4 last:pr-0">
                  <h4 className="text-xl font-black uppercase text-white mb-1">{p.name} | <span className="text-yellow-500">{p.price}</span></h4>
                  <p className="text-stone-400 font-bold uppercase text-xs">{p.desc}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-8 text-center bg-red-600 text-white font-black uppercase tracking-widest py-2 px-4 inline-block transform rotate-1">
             Pizzas are all freshly prepared
           </div>
        </div>

      </div>
    </div>
  );
}
