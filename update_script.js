const fs = require('fs');

let content = fs.readFileSync('src/pages/PublicView.tsx', 'utf8');

// 1. Root div background
content = content.replace(
  '<div className="min-h-screen bg-stone-950 text-white overflow-x-hidden selection:bg-red-600 selection:text-white" style={{ backgroundImage: \'radial-gradient(circle at center, #1c1917 0%, #0c0a09 100%)\' }}>',
  '<div className="min-h-screen text-white overflow-x-hidden selection:bg-red-600 selection:text-white bg-[#050505]" style={{ backgroundImage: \'url("/assets/images/bg-texture.png"), url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")\', backgroundBlendMode: \'overlay\', backgroundSize: \'cover, 200px 200px\', backgroundAttachment: \'fixed\' }}>'
);

// 2. Header
content = content.replace(
  '<header className="sticky top-0 z-50 bg-stone-950/95 border-b border-stone-800 backdrop-blur-sm">',
  '<header className="sticky top-0 z-50 bg-black/40 border-b border-white/10 backdrop-blur-md">'
);

// 3. Hero Section
content = content.replace(
  '<div className="relative rounded-sm overflow-hidden mb-16 border-b-4 border-stone-900 bg-[#0a0a0a] text-center lg:text-left py-12 px-4 lg:px-8 xl:px-12 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] shadow-2xl">',
  '<div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mb-16 text-center lg:text-left py-12 px-4 lg:px-8 xl:px-12 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]">'
);
content = content.replace(
  '         {/* Background Texture Placeholder */}\n         <div className="absolute inset-0 bg-stone-950/80 mix-blend-multiply z-0"></div>\n         <div className="absolute inset-0 bg-[url(\'/assets/images/bar.jpg\')] opacity-20 bg-cover bg-center z-0"></div>\n         {/* Chalkboard scratch texture simulation */}\n         <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: \'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")\' }}></div>',
  '         {/* Backgrounds removed as per request for seamless global texture */}'
);

// 4. About Section
content = content.replace(
  '<div id="about-section" className="max-w-4xl mx-auto bg-stone-900 border border-stone-800 p-8 md:p-12 shadow-xl relative">',
  '<div id="about-section" className="max-w-4xl mx-auto py-12 md:py-16 relative">'
);
content = content.replace(
  '<div className="absolute -top-4 -left-4 bg-red-600 w-16 h-16 flex items-center justify-center transform -rotate-12 border-2 border-stone-950 shadow-lg">',
  '<div className="absolute -top-4 -left-4 md:-left-8 bg-red-600 w-16 h-16 flex items-center justify-center transform -rotate-12 shadow-lg">'
);

// 5. Function Venue Section
content = content.replace(
  '<div className="mt-16 bg-[#0a0a0a] text-white py-16 px-4 md:px-8 border-y-4 border-stone-900 relative shadow-2xl overflow-hidden">',
  '<div className="mt-16 w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] text-white py-16 px-4 md:px-8 relative overflow-hidden">'
);
content = content.replace(
  '        {/* Background Texture Simulation */}\n        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: \'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")\' }}></div>',
  ''
);

// 6. Mailing List Section
content = content.replace(
  '<div className="mt-16 bg-red-600 border-4 border-stone-900 p-8 md:p-12 shadow-2xl relative overflow-hidden">',
  '<div className="mt-16 bg-red-600 py-16 px-4 relative overflow-hidden w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">'
);

// 7. Footer
content = content.replace(
  '<footer className="bg-stone-950 border-t border-stone-800 text-stone-500 py-8 mt-16 text-sm">',
  '<footer className="w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-black/40 backdrop-blur-sm border-t border-white/10 text-stone-500 py-8 mt-16 text-sm">'
);

fs.writeFileSync('src/pages/PublicView.tsx', content);
console.log("Done");
