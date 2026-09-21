const fs = require('fs');

let content = fs.readFileSync('src/pages/PublicView.tsx', 'utf8');

// Replace all instances of Dancing Script with Yellowtail
content = content.replace(/fontFamily:\s*"'Dancing Script',\s*cursive"/g, "fontFamily: 'var(--font-yellowtail)'");

// Hero Section PE/GQ's
content = content.replace(
  '<h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-wider leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mb-1" style={{ fontFamily: \'var(--font-slug)\' }}>PE/GQ\'S</h2>',
  '<h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-wider leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mb-1" style={{ fontFamily: \'var(--font-lost)\' }}>PE/GQ\'S</h2>'
);
content = content.replace(
  '<h1 className="text-red-600 text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-wider leading-[0.8] drop-shadow-[0_8px_8px_rgba(0,0,0,1)] mb-8 transform -rotate-2" style={{ fontFamily: \'var(--font-slug)\', WebkitTextStroke: \'2px black\' }}>BIGGEST & BEST</h1>',
  '<h1 className="text-red-600 text-6xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-wider leading-[0.8] drop-shadow-[0_8px_8px_rgba(0,0,0,1)] mb-8 transform -rotate-2" style={{ fontFamily: \'var(--font-lost)\', WebkitTextStroke: \'2px black\' }}>BIGGEST & BEST</h1>'
);
content = content.replace(
  '<div className="bg-yellow-500 text-stone-950 font-black uppercase tracking-widest text-lg md:text-2xl px-6 py-2 transform rotate-1 mb-10 shadow-[6px_6px_0_0_#000] border-2 border-stone-900" style={{ fontFamily: \'var(--font-slug)\' }}>\n                 SPORTS CLUB, GRUB & FUNCTION VENUE\n               </div>',
  '<div className="bg-yellow-500 text-stone-950 font-black uppercase tracking-widest text-lg md:text-2xl px-6 py-2 transform rotate-1 mb-10 shadow-[6px_6px_0_0_#000] border-2 border-stone-900" style={{ fontFamily: \'var(--font-lost)\' }}>\n                 SPORTS CLUB, GRUB & FUNCTION VENUE\n               </div>'
);

// Footer PE/GQ's
content = content.replace(
  '<span className="text-stone-300 font-bold uppercase tracking-widest text-sm md:text-base mb-1">PE/GQ\'S BIGGEST & BEST</span>',
  '<span className="text-stone-300 font-bold uppercase tracking-widest text-sm md:text-base mb-1" style={{ fontFamily: \'var(--font-lost)\' }}>PE/GQ\'S BIGGEST & BEST</span>'
);
content = content.replace(
  '<span className="text-white font-black uppercase tracking-widest text-lg md:text-xl mb-3" style={{ fontFamily: \'var(--font-slug)\' }}>SPORTS CLUB, GRUB & FUNCTION VENUE</span>',
  '<span className="text-white font-black uppercase tracking-widest text-lg md:text-xl mb-3" style={{ fontFamily: \'var(--font-lost)\' }}>SPORTS CLUB, GRUB & FUNCTION VENUE</span>'
);

fs.writeFileSync('src/pages/PublicView.tsx', content);
console.log("Done");
