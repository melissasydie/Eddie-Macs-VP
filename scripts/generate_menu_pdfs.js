import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'assets', 'menus');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper styling constants
const BLACK = rgb(0.04, 0.04, 0.04);
const DARK_BG = rgb(0.08, 0.08, 0.08);
const CARD_BG = rgb(0.12, 0.12, 0.12);
const BORDER_COLOR = rgb(0.25, 0.25, 0.25);
const RED = rgb(0.86, 0.15, 0.15);
const YELLOW = rgb(0.95, 0.77, 0.05);
const WHITE = rgb(0.98, 0.98, 0.98);
const GRAY = rgb(0.7, 0.7, 0.7);
const GREEN = rgb(0.13, 0.65, 0.25);

async function createBaseDoc() {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  return { doc, fontBold, fontRegular };
}

function drawHeader(page, title, subtitle, fontBold, fontRegular) {
  const { width, height } = page.getSize();
  
  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: BLACK,
  });

  // Top header border
  page.drawRectangle({
    x: 20,
    y: height - 10,
    width: width - 40,
    height: 4,
    color: RED,
  });

  // Venue Name
  page.drawText('EDDIE MACS @ VP', {
    x: 30,
    y: height - 40,
    size: 24,
    font: fontBold,
    color: WHITE,
  });

  // Sub-brand
  page.drawText("PE/GQ'S BIGGEST & BEST SPORTS CLUB, GRUB & FUNCTION VENUE", {
    x: 30,
    y: height - 54,
    size: 8,
    font: fontBold,
    color: YELLOW,
  });

  // Contact info right aligned
  page.drawText('Victoria Park Dr, South End, PE/GQ', {
    x: width - 220,
    y: height - 36,
    size: 8,
    font: fontRegular,
    color: GRAY,
  });
  page.drawText('Tel: 071 794 3537 | vpclub@mwebbiz.co.za', {
    x: width - 220,
    y: height - 48,
    size: 8,
    font: fontRegular,
    color: GRAY,
  });

  // Divider
  page.drawLine({
    start: { x: 30, y: height - 64 },
    end: { x: width - 30, y: height - 64 },
    thickness: 1,
    color: BORDER_COLOR,
  });

  // Menu Title Banner
  page.drawRectangle({
    x: 30,
    y: height - 105,
    width: width - 60,
    height: 35,
    color: RED,
  });

  page.drawText(title.toUpperCase(), {
    x: 40,
    y: height - 92,
    size: 16,
    font: fontBold,
    color: WHITE,
  });

  if (subtitle) {
    page.drawText(subtitle.toUpperCase(), {
      x: 40,
      y: height - 120,
      size: 9,
      font: fontBold,
      color: YELLOW,
    });
  }

  // Footer
  page.drawText('ALL PRICES IN ZAR (R) • EDDIE MACS AT VP SPORTS CLUB', {
    x: 30,
    y: 20,
    size: 8,
    font: fontBold,
    color: GRAY,
  });

  page.drawText('WHATSAPP: 071 794 3537 • WWW.EDDIEMACSATVP.COM', {
    x: width - 260,
    y: 20,
    size: 8,
    font: fontBold,
    color: YELLOW,
  });
}

// 1. BRAAI PACKS
async function generateBraaiPacksPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  drawHeader(page, 'Braai Packs Menu', 'Perfect for Groups, Teams & Events! Everything you need for a legendary braai!', fontBold, fontRegular);

  let y = height - 150;

  // Option 1 Box
  page.drawRectangle({
    x: 30,
    y: y - 130,
    width: width - 60,
    height: 130,
    color: CARD_BG,
    borderColor: RED,
    borderWidth: 1.5,
  });

  page.drawText('BRAAI PACK - R129 PER PERSON', {
    x: 45,
    y: y - 25,
    size: 14,
    font: fontBold,
    color: RED,
  });

  const items1 = [
    '• Lamb Chop',
    '• Boerewors',
    '• Pork Rasher',
    '• Chicken Sosatie',
    '(Sourced from Cuyler Butchery, Uitenhage - Voted #1 out of 130,000 butchers in SA!)',
  ];

  let iy = y - 45;
  items1.forEach((it, idx) => {
    page.drawText(it, {
      x: 45,
      y: iy,
      size: idx === 4 ? 8 : 10,
      font: idx === 4 ? fontRegular : fontBold,
      color: idx === 4 ? YELLOW : WHITE,
    });
    iy -= 16;
  });

  y -= 150;

  // Option 2 Box
  page.drawRectangle({
    x: 30,
    y: y - 180,
    width: width - 60,
    height: 180,
    color: CARD_BG,
    borderColor: YELLOW,
    borderWidth: 1.5,
  });

  page.drawText('BRAAI MEAL ULTIMATE - R159 PER PERSON', {
    x: 45,
    y: y - 25,
    size: 14,
    font: fontBold,
    color: YELLOW,
  });

  page.drawText('INCLUDES EVERYTHING IN THE BRAAI PACK PLUS:', {
    x: 45,
    y: y - 42,
    size: 9,
    font: fontBold,
    color: GRAY,
  });

  const items2 = [
    '• Choice of Potato Salad OR Noodle Salad',
    '• Full Table Settings: Plates, Cutlery, Braai Condiments & Sauces',
    '• Braai Bin & Stainless Steel Grill provided and prepped',
    '• 2 Bags Quality Hardwood (for the first 10 guests)',
    '• 1 Extra Bag Wood for every 5 guests thereafter',
    '• Firelighters, Kindling & Braai Tongs ready for action',
  ];

  iy = y - 60;
  items2.forEach((it) => {
    page.drawText(it, {
      x: 45,
      y: iy,
      size: 10,
      font: fontRegular,
      color: WHITE,
    });
    iy -= 16;
  });

  y -= 205;

  // Details & Notes Box
  page.drawRectangle({
    x: 30,
    y: y - 160,
    width: width - 60,
    height: 160,
    color: DARK_BG,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  });

  page.drawText('BOOKING & PAYMENT INFORMATION', {
    x: 45,
    y: y - 25,
    size: 11,
    font: fontBold,
    color: WHITE,
  });

  const notes = [
    '• Perfect for groups of 10 or more people (Birthdays, corporate events, team wind-ups).',
    '• Minimum 10 days notice required prior to event date.',
    '• Full payment confirms your booking.',
    '• We bring the fire, you bring the good times!',
    '',
    'BANKING DETAILS:',
    'Account Name: Victoria Park Sports Club | Bank: First National Bank - Walmer',
    'Branch Code: 250655 | Account Number: 545 9205 8845 | Type: Current',
    'Reference: Your Name / Function Date',
  ];

  iy = y - 45;
  notes.forEach((n) => {
    page.drawText(n, {
      x: 45,
      y: iy,
      size: 8.5,
      font: n.startsWith('BANKING') ? fontBold : fontRegular,
      color: n.startsWith('BANKING') ? YELLOW : GRAY,
    });
    iy -= 13;
  });

  fs.writeFileSync(path.join(outDir, 'braai-packs.pdf'), await doc.save());
}

// 2. ADDITIONAL MENU OPTIONS
async function generateAdditionalOptionsPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  drawHeader(page, 'Additional Menu Options', 'Perfect for Groups, Teams & Functions!', fontBold, fontRegular);

  let y = height - 150;

  // Platters Box
  page.drawRectangle({
    x: 30,
    y: y - 180,
    width: width - 60,
    height: 180,
    color: CARD_BG,
    borderColor: YELLOW,
    borderWidth: 1.5,
  });

  page.drawText('SNACK PLATTERS - R99 PER PERSON', {
    x: 45,
    y: y - 25,
    size: 14,
    font: fontBold,
    color: YELLOW,
  });

  page.drawText('Platters available for 10 / 20 / 30 people', {
    x: 45,
    y: y - 42,
    size: 9,
    font: fontBold,
    color: GRAY,
  });

  const platterItems = [
    '• 2 x Golden Beer-Battered Onion Rings',
    '• 1 x Cocktail Spring Roll',
    '• 1 x Cocktail Cheesy Sausage',
    '• 1 x Cocktail Crispy Samoosa',
    '• 1 x Cajun Spiced Chicken Strip',
    '• 1 x Strip Crispy Calamari',
    '• Handful of Hand-Crafted Cut Fries',
    '• Chef Selection of Homemade Dips',
  ];

  let iy = y - 62;
  platterItems.forEach((it) => {
    page.drawText(it, {
      x: 45,
      y: iy,
      size: 9.5,
      font: fontRegular,
      color: WHITE,
    });
    iy -= 14;
  });

  y -= 200;

  // Braai Packs Section
  page.drawRectangle({
    x: 30,
    y: y - 90,
    width: width - 60,
    height: 90,
    color: CARD_BG,
    borderColor: RED,
    borderWidth: 1.5,
  });

  page.drawText('FUNCTION BRAAI PACKS', {
    x: 45,
    y: y - 25,
    size: 13,
    font: fontBold,
    color: RED,
  });

  page.drawText('• 4PC Braaipack (Lamb, Wors, Pork Rasher, Chicken Sosatie) .......................................... R129 pp', {
    x: 45,
    y: y - 45,
    size: 9.5,
    font: fontBold,
    color: WHITE,
  });

  page.drawText('• 4PC Braai Packs with Salad, Plates, Cutlery & Condiments ..................................... R159 pp', {
    x: 45,
    y: y - 62,
    size: 9.5,
    font: fontBold,
    color: YELLOW,
  });

  page.drawText('Our meat is from Cuyler Butchery - SA\'s No. 1 Butcher!', {
    x: 45,
    y: y - 78,
    size: 8,
    font: fontRegular,
    color: GRAY,
  });

  y -= 110;

  // Terms & Banking
  page.drawRectangle({
    x: 30,
    y: y - 180,
    width: width - 60,
    height: 180,
    color: DARK_BG,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  });

  page.drawText('TERMS & BANKING DETAILS', {
    x: 45,
    y: y - 25,
    size: 11,
    font: fontBold,
    color: WHITE,
  });

  const terms = [
    '• 10% Service gratuity will be levied for functions over 10 people.',
    '• All food purchases to be paid minimum 10 days prior to function date.',
    '• We cater for Team Building, Birthday Parties, Corporate Events, Functions & Fundraising.',
    '',
    'BANKING DETAILS:',
    'Account Name: VICTORIA PARK SPORTS CLUB',
    'Bank: FIRST NATIONAL BANK – WALMER',
    'Branch Code: 250655 | Account Number: 545 9205 8845 | Type: Current',
    'Reference: Your Name / Function Date',
    'Email Proof of Payment: vpclub@mwebbiz.co.za | Tel: 071 794 3537',
  ];

  iy = y - 45;
  terms.forEach((t) => {
    page.drawText(t, {
      x: 45,
      y: iy,
      size: 8.5,
      font: t.startsWith('BANKING') ? fontBold : fontRegular,
      color: t.includes('10%') || t.includes('10 days') ? YELLOW : (t.startsWith('BANKING') ? RED : GRAY),
    });
    iy -= 13;
  });

  fs.writeFileSync(path.join(outDir, 'additional-menu-options.pdf'), await doc.save());
}

// 3. DAILY SPECIALS
async function generateDailySpecialsPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  drawHeader(page, 'Daily Specials', 'Sit Down Only • Mon - Sun 11am - 8pm', fontBold, fontRegular);

  const specials = [
    {
      day: 'ALL DAY EVERYDAY',
      items: [
        { name: 'ENGLISH BREAKFAST', price: 'R59.90', desc: '1x Egg, 2x Bacon, 1x Pork or Beef Sausage & Hand-Cut Fries' },
      ],
      color: YELLOW,
    },
    {
      day: 'MONDAY',
      items: [
        { name: 'BUY 1 GET 1 FREE PIZZA', price: 'SPECIAL', desc: 'Buy any Deluxe Pizza & get a Basic Pizza absolutely FREE!' },
        { name: 'CHICKEN SCHNITZEL', price: 'R99.00', desc: 'Crumbed chicken breast served with crispy hand-cut fries' },
      ],
      color: RED,
    },
    {
      day: 'TUESDAY',
      items: [
        { name: 'BACON & CHEESE BURGER', price: 'R99.00', desc: 'Homemade beef burger with bacon & melted cheddar + hand-cut fries' },
        { name: 'BRAAI MEAL SPECIAL', price: 'R99.00', desc: 'Lamb chop, chicken sosatie, boerewors, pork rasher & hand-cut fries' },
      ],
      color: WHITE,
    },
    {
      day: 'WEDNESDAY',
      items: [
        { name: 'FAMOUS HALF-PRICE CAPTAINS TABLE MEALS', price: '50% OFF', desc: 'Choice of 16 signature main meals at Half Price! (All Day Special)' },
      ],
      color: YELLOW,
    },
    {
      day: 'THURSDAY',
      items: [
        { name: 'CHICKEN SCHNITZEL', price: 'R99.00', desc: 'Served with homemade sauce & fresh hand-cut fries' },
        { name: 'STEAK ROLL & HAND-CUT FRIES', price: 'R99.00', desc: 'Steak smothered in fried onions on a fresh hotdog roll with fries' },
      ],
      color: RED,
    },
    {
      day: 'FRIDAY',
      items: [
        { name: 'FRIDAY R99 MEALS (ONLY R99 EACH!)', price: 'R99.00', desc: 'Choice of: Crispy Eisbein, Chicken Schnitzel, Beef Curry, Fish & Chips, or Bangers & Mash' },
      ],
      color: YELLOW,
    },
    {
      day: 'SATURDAY',
      items: [
        { name: '800G PORK RIBS', price: 'R199.00', desc: 'Basted with our legendary sticky BBQ marinade + hand-cut fries' },
        { name: 'CRISPY EISBEIN', price: 'R169.00', desc: 'Served crispy with sauerkraut & mashed potatoes' },
        { name: 'ANY BASIC PIZZA: R129  |  ANY DELUXE PIZZA: R149', price: '', desc: 'Freshly prepared wood-fired style thin based pizzas' },
      ],
      color: WHITE,
    },
    {
      day: 'SUNDAY',
      items: [
        { name: 'SUNDAY PIZZA SPECIAL', price: 'R129 / R149', desc: 'Any Basic Pizza for R129 • Any Deluxe Pizza for R149' },
      ],
      color: RED,
    },
  ];

  let y = height - 135;

  specials.forEach((spec) => {
    page.drawText(spec.day, {
      x: 30,
      y,
      size: 9.5,
      font: fontBold,
      color: spec.color,
    });
    y -= 14;

    spec.items.forEach((it) => {
      page.drawText(it.name, {
        x: 40,
        y,
        size: 9,
        font: fontBold,
        color: WHITE,
      });

      if (it.price) {
        page.drawText(it.price, {
          x: width - 80,
          y,
          size: 9,
          font: fontBold,
          color: YELLOW,
        });
      }
      y -= 11;

      page.drawText(it.desc, {
        x: 40,
        y,
        size: 7.5,
        font: fontRegular,
        color: GRAY,
      });
      y -= 13;
    });

    page.drawLine({
      start: { x: 30, y: y + 5 },
      end: { x: width - 30, y: y + 5 },
      thickness: 0.5,
      color: BORDER_COLOR,
    });
    y -= 4;
  });

  fs.writeFileSync(path.join(outDir, 'daily-specials.pdf'), await doc.save());
}

// 4. PIZZA MENU
async function generatePizzaMenuPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  drawHeader(page, 'Pizza Menu', 'Delicious Thin Based Pizzas • WhatsApp & Collect: 071 794 3537', fontBold, fontRegular);

  let y = height - 145;

  // Basic Pizzas
  page.drawText('BASIC PIZZAS', {
    x: 30,
    y,
    size: 13,
    font: fontBold,
    color: RED,
  });
  y -= 18;

  const basic = [
    { name: 'FOCACCIA', desc: 'Garlic Butter & Italian Herbs', price: 'R69' },
    { name: 'VEGETARIAN PIZZA', desc: 'Tomatoes, garlic, onions, mixed herbs & mozzarella', price: 'R99' },
    { name: 'MARGHERITA PIZZA', desc: 'Cherry tomatoes, fresh basil, garlic, parmesan & mozzarella', price: 'R99' },
    { name: 'TROPICAL PIZZA', desc: 'Smoked ham, juicy pineapple & mozzarella', price: 'R139' },
    { name: 'BACON & CHEESE PIZZA', desc: 'Crispy streaky bacon, cheddar & mozzarella cheese', price: 'R149' },
    { name: 'REGINA PIZZA', desc: 'Button mushrooms, ham, Kalamata olives, garlic & mozzarella', price: 'R149' },
    { name: 'HAWAIIAN PIZZA', desc: 'Ham, sweet BBQ sauce swirl, pineapple & mozzarella', price: 'R149' },
  ];

  basic.forEach((p) => {
    page.drawText(p.name, { x: 40, y, size: 9.5, font: fontBold, color: WHITE });
    page.drawText(p.price, { x: width - 70, y, size: 9.5, font: fontBold, color: YELLOW });
    y -= 12;
    page.drawText(p.desc, { x: 40, y, size: 8, font: fontRegular, color: GRAY });
    y -= 14;
  });

  y -= 10;

  // Deluxe Pizzas
  page.drawText('DELUXE PIZZAS', {
    x: 30,
    y,
    size: 13,
    font: fontBold,
    color: YELLOW,
  });
  y -= 18;

  const deluxe = [
    { name: 'CHEESY GRILLER', desc: 'Sliced cheese griller sausage, caramelized onions & mozzarella', price: 'R159' },
    { name: 'PORK DELUXE', desc: 'Slow-cooked pulled pork, sweet basting & mozzarella', price: 'R159' },
    { name: 'PEPPERONI PIZZA', desc: 'Spicy pepperoni slices, mushrooms, olives & mozzarella', price: 'R169' },
    { name: 'SPICY BBQ CHICKEN', desc: 'Tender chicken, spicy jalapenos, streaky bacon & mozzarella', price: 'R169' },
    { name: 'CHICKEN & MUSHROOM', desc: 'Chicken strips, sautéed mushrooms, creamy mushroom sauce & mozzarella', price: 'R169' },
    { name: 'CHEESY STEAK PIZZA', desc: 'Tender sirloin steak strips, bell peppers, BBQ sauce & mozzarella', price: 'R179' },
    { name: 'MEATY PIZZA', desc: 'Spicy seasoned ground beef, fresh chillies & loaded mozzarella', price: 'R189' },
  ];

  deluxe.forEach((p) => {
    page.drawText(p.name, { x: 40, y, size: 9.5, font: fontBold, color: WHITE });
    page.drawText(p.price, { x: width - 70, y, size: 9.5, font: fontBold, color: YELLOW });
    y -= 12;
    page.drawText(p.desc, { x: 40, y, size: 8, font: fontRegular, color: GRAY });
    y -= 14;
  });

  y -= 10;

  // Extras Box
  page.drawRectangle({
    x: 30,
    y: y - 50,
    width: width - 60,
    height: 50,
    color: CARD_BG,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  });

  page.drawText('ADD EXTRAS - R30 EACH:', {
    x: 45,
    y: y - 20,
    size: 9.5,
    font: fontBold,
    color: WHITE,
  });

  page.drawText('Bacon  •  Cheddar Cheese  •  Mozzarella  •  Garlic  •  Fresh Chillies', {
    x: 45,
    y: y - 35,
    size: 9,
    font: fontBold,
    color: YELLOW,
  });

  fs.writeFileSync(path.join(outDir, 'pizza-menu.pdf'), await doc.save());
}

// 5. TASTY TREATS
async function generateTastyTreatsPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  drawHeader(page, 'Tasty Treats Menu', 'Perfect for Sharing • Made for Good Times • Mon - Sun 11am - 8pm', fontBold, fontRegular);

  let y = height - 150;

  // Lekker Snack Platters
  page.drawRectangle({
    x: 30,
    y: y - 180,
    width: width - 60,
    height: 180,
    color: CARD_BG,
    borderColor: RED,
    borderWidth: 1.5,
  });

  page.drawText('LEKKER SNACK PLATTERS - BARGAIN BUY FOR THE TABLE!', {
    x: 45,
    y: y - 25,
    size: 13,
    font: fontBold,
    color: RED,
  });

  const platterPrices = [
    { qty: 'PLATTER FOR 4 (X4)', price: 'R299' },
    { qty: 'PLATTER FOR 6 (X6)', price: 'R449' },
    { qty: 'PLATTER FOR 8 (X8)', price: 'R599' },
    { qty: 'PLATTER FOR 10 (X10)', price: 'R749' },
  ];

  let py = y - 50;
  platterPrices.forEach((p) => {
    page.drawText(p.qty, { x: 45, y: py, size: 10, font: fontBold, color: WHITE });
    page.drawText(p.price, { x: 260, y: py, size: 11, font: fontBold, color: YELLOW });
    py -= 18;
  });

  page.drawText('INCLUDES:', {
    x: 45,
    y: y - 135,
    size: 9,
    font: fontBold,
    color: GRAY,
  });

  page.drawText('Cheezy Sausage, Crispy Samoosa, Spring Roll, 100g Tender Chicken Strips & Handful of Hand-Crafted Fries', {
    x: 45,
    y: y - 152,
    size: 8.5,
    font: fontRegular,
    color: WHITE,
  });

  y -= 205;

  // Other Treats
  page.drawText('BURGERS & WRAPS', {
    x: 30,
    y,
    size: 13,
    font: fontBold,
    color: YELLOW,
  });
  y -= 18;

  const treats = [
    {
      name: 'HOMEMADE BURGER - R99',
      desc: 'Homemade 180g pure beef patty or grilled chicken breast on an oven fresh roll with a side of hand-crafted fries. (Add Bacon or Cheese = R20 each)',
    },
    {
      name: 'CHICKEN WRAP & FRIES - R99',
      desc: 'Original or Sweet Chilli crumbed chicken strips, fresh lettuce, tomato & crisp cucumber on a toasted tortilla with hand-crafted fries.',
    },
  ];

  treats.forEach((t) => {
    page.drawText(t.name, { x: 40, y, size: 10, font: fontBold, color: WHITE });
    y -= 13;
    page.drawText(t.desc, { x: 40, y, size: 8.5, font: fontRegular, color: GRAY });
    y -= 18;
  });

  y -= 10;

  // Sharing Pizzas
  page.drawText('SHARING PIZZAS', {
    x: 30,
    y,
    size: 13,
    font: fontBold,
    color: RED,
  });
  y -= 18;

  const pizzas = [
    { name: 'TROPICAL PIZZA (Ham, Pineapple & Mozzarella)', price: 'R139' },
    { name: 'BACON & CHEESE PIZZA (Streaky Bacon, Cheddar & Mozzarella)', price: 'R149' },
    { name: 'CHEESY GRILLER PIZZA (Cheesy Griller, Caramelized Onions & Mozzarella)', price: 'R159' },
    { name: 'BBQ CHICKEN PIZZA (Chicken, Jalapenos, Streaky Bacon & Mozzarella)', price: 'R169' },
  ];

  pizzas.forEach((pz) => {
    page.drawText(pz.name, { x: 40, y, size: 9.5, font: fontRegular, color: WHITE });
    page.drawText(pz.price, { x: width - 70, y, size: 9.5, font: fontBold, color: YELLOW });
    y -= 16;
  });

  y -= 15;
  page.drawText('* Pizzas are all freshly prepared. We are not a fast food outlet - good food takes a little time!', {
    x: 40,
    y,
    size: 8,
    font: fontRegular,
    color: GRAY,
  });

  fs.writeFileSync(path.join(outDir, 'tasty-treats.pdf'), await doc.save());
}

// 6. WEDNESDAY HALF-PRICE CAPTAINS TABLE
async function generateWednesdayHalfPricePDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();
  drawHeader(page, 'Wednesday Half-Price Captains Table', 'Great Food. Great Company. Half The Price! • Sit Down Only', fontBold, fontRegular);

  const meals = [
    { name: 'Homemade Beef/Chicken Burger (Add bacon/cheese R20)', orig: 'R125', half: 'R63' },
    { name: 'Chicken Schnitzel with Creamy Sauce & Fries', orig: 'R149', half: 'R75' },
    { name: 'Bangers & Mash with Rich Onion Gravy', orig: 'R139', half: 'R70' },
    { name: 'Fish & Chips with Homemade Tartar Sauce', orig: 'R159', half: 'R80' },
    { name: 'Braai Meal (Lamb Chop, Sosatie, Wors, Pork Rasher & Fries)', orig: 'R189', half: 'R95' },
    { name: 'Nachos with Spicy Mince, Cheese, Salsa & Guacamole', orig: 'R169', half: 'R85' },
    { name: '250g Sirloin Steak, Fried Egg & Hand-Cut Fries', orig: 'R169', half: 'R85' },
    { name: 'Eisbein "The House Speciality" with Sauerkraut & Mash', orig: 'R199', half: 'R100' },
    { name: 'T-Bone Steak 350g with Hand-Cut Fries', orig: 'R189', half: 'R95' },
    { name: '400g Sticky Pork Ribs with Fries', orig: 'R189', half: 'R95' },
    { name: '800g Sticky Pork Ribs with Fries', orig: 'R299', half: 'R145' },
    { name: 'Mixed Grill (Loin Chop, Sirloin, Sausage & Egg)', orig: 'R189', half: 'R95' },
    { name: 'Grilled Rump Steak 300g Swiss Cut', orig: 'R189', half: 'R95' },
    { name: 'Calamari (Grilled or Deep Fried) with Fries & Salad', orig: 'R179', half: 'R90' },
    { name: 'Surf & Turf (200g Prime Rump & Calamari)', orig: 'R219', half: 'R110' },
    { name: 'Fish & Calamari Combo (Hake Fillet & Calamari)', orig: 'R219', half: 'R110' },
  ];

  let y = height - 145;

  page.drawText('MEAL', { x: 40, y, size: 9, font: fontBold, color: GRAY });
  page.drawText('REGULAR', { x: width - 140, y, size: 9, font: fontBold, color: GRAY });
  page.drawText('WEDNESDAY', { x: width - 80, y, size: 9, font: fontBold, color: RED });
  y -= 14;

  meals.forEach((m, idx) => {
    // alternating row highlight
    if (idx % 2 === 0) {
      page.drawRectangle({
        x: 30,
        y: y - 4,
        width: width - 60,
        height: 18,
        color: CARD_BG,
      });
    }

    page.drawText(m.name, {
      x: 38,
      y: y + 2,
      size: 8.5,
      font: fontBold,
      color: WHITE,
    });

    page.drawText(m.orig, {
      x: width - 130,
      y: y + 2,
      size: 8.5,
      font: fontRegular,
      color: GRAY,
    });

    page.drawText(m.half, {
      x: width - 75,
      y: y + 2,
      size: 9.5,
      font: fontBold,
      color: YELLOW,
    });

    y -= 19;
  });

  y -= 10;
  page.drawText('* All weights pre-cooked. Sit down only. No take-aways on half-price specials.', {
    x: 40,
    y,
    size: 8,
    font: fontRegular,
    color: GRAY,
  });

  fs.writeFileSync(path.join(outDir, 'wednesday-half-price.pdf'), await doc.save());
}

// 7. MAIN MENU
async function generateMainMenuPDF() {
  const { doc, fontBold, fontRegular } = await createBaseDoc();

  // Page 1: Breakfast, Starters, Salads, Toasties, Little Sports, Shakes
  const page1 = doc.addPage([595, 842]);
  const { width, height } = page1.getSize();
  drawHeader(page1, 'Main Menu - Part 1', 'Cold Beer. Good Food. Good Times. • Sit Down Only (10am - 10pm)', fontBold, fontRegular);

  let y = height - 140;

  // Breakfast
  page1.drawText('BREAKFAST (Start Your Day Right)', { x: 30, y, size: 11, font: fontBold, color: RED });
  y -= 14;
  const bfast = [
    { name: 'English Breakfast (1 Egg, Bacon, Sausage, Mushrooms, Toast)', price: 'R99' },
    { name: 'Captain\'s Breakfast (2 Eggs, Bacon, 2 Sausages, Mushrooms, Tomato, Toast)', price: 'R129' },
    { name: 'Biker\'s Breakfast (Sat & Sun 10am-4pm: 2 Eggs, Bacon, 2 Sausages, Toast)', price: 'R99' },
    { name: '3 Egg Omelette (Plain R48 | Add Ham, Bacon, Cheese, Mushroom R25 each)', price: 'From R48' },
  ];
  bfast.forEach(b => {
    page1.drawText(b.name, { x: 40, y, size: 8, font: fontRegular, color: WHITE });
    page1.drawText(b.price, { x: width - 70, y, size: 8, font: fontBold, color: YELLOW });
    y -= 12;
  });

  y -= 10;
  // Starters
  page1.drawText('KICK OFF STARTERS', { x: 30, y, size: 11, font: fontBold, color: YELLOW });
  y -= 14;
  const starters = [
    { name: 'Chicken Livers Peri-Peri with Fresh Toast', price: 'R89' },
    { name: 'Garlic, Cheese & Bacon Roll (Oven baked in garlic butter & melted cheese)', price: 'R89' },
    { name: 'Crumbed Mushrooms served with Tartar Sauce', price: 'R89' },
    { name: 'Escargot (6 Sizzling Snails in Garlic Butter or Creamy Roquefort)', price: 'R129' },
    { name: 'Homemade Soup of the Day (Hearty Oxtail / Country Veg)', price: 'R69' },
    { name: 'Boerewors or Cheezy Griller Roll with Fries', price: 'R89' },
  ];
  starters.forEach(s => {
    page1.drawText(s.name, { x: 40, y, size: 8, font: fontRegular, color: WHITE });
    page1.drawText(s.price, { x: width - 70, y, size: 8, font: fontBold, color: YELLOW });
    y -= 12;
  });

  y -= 10;
  // Salads & Toasties
  page1.drawText('SALADS & TOASTIES', { x: 30, y, size: 11, font: fontBold, color: RED });
  y -= 14;
  const salads = [
    { name: 'Greek Salad (Fresh greens, grated feta & Calamata olives)', price: 'R99' },
    { name: 'Cajun Chicken Salad (Peach, chilli & lemon dressing)', price: 'R139' },
    { name: 'Veggie Burger (Soya or mushroom patty on fresh roll with fries)', price: 'R99' },
    { name: 'Toasted Cheese & Tomato (Add fries for R35)', price: 'R69' },
    { name: 'Toasted Ham, Cheese & Tomato / Chicken Mayo / Egg & Bacon', price: 'R79' },
    { name: 'Club Sandwich (Chicken, Cheese, Tomato, Bacon, Lettuce, Onion)', price: 'R119' },
  ];
  salads.forEach(s => {
    page1.drawText(s.name, { x: 40, y, size: 8, font: fontRegular, color: WHITE });
    page1.drawText(s.price, { x: width - 70, y, size: 8, font: fontBold, color: YELLOW });
    y -= 12;
  });

  y -= 10;
  // Little Sports & Milkshakes
  page1.drawText('LITTLE SPORTS & MILKSHAKES', { x: 30, y, size: 11, font: fontBold, color: YELLOW });
  y -= 14;
  const kids = [
    { name: 'Kiddies Meals: Fish Fingers / Mini Burger / Hot Dog / Mini Pizza (With Fries)', price: 'R79 - R89' },
    { name: 'Classic Milkshakes: Vanilla, Chocolate, Strawberry, Bubblegum', price: 'R58' },
    { name: 'Gourmet Shakes: Bar One, Fresh Coffee, Ferrero Rocher, Cookies & Cream', price: 'R60 - R64' },
  ];
  kids.forEach(k => {
    page1.drawText(k.name, { x: 40, y, size: 8, font: fontRegular, color: WHITE });
    page1.drawText(k.price, { x: width - 70, y, size: 8, font: fontBold, color: YELLOW });
    y -= 12;
  });

  // Page 2: Main Meals, Steaks, Baskets, Desserts
  const page2 = doc.addPage([595, 842]);
  drawHeader(page2, 'Main Menu - Part 2', 'Mains, Grills, Baskets & The Final Whistle', fontBold, fontRegular);

  let y2 = height - 140;

  page2.drawText('MAIN MEALS & GRILLS', { x: 30, y: y2, size: 11, font: fontBold, color: RED });
  y2 -= 14;

  const mains = [
    { name: 'Homemade 180g Beef or Chicken Burger with Fries (Add bacon/cheese R20)', price: 'R125' },
    { name: 'Chicken Schnitzel with Creamy Sauce & Fries', price: 'R149' },
    { name: 'Bangers & Mash (3 Sausages with Mash & Onion Gravy)', price: 'R139' },
    { name: 'Fish & Chips (Golden-fried with Hand-Crafted Fries & Tangy Sauce)', price: 'R159' },
    { name: 'Braai Meal (Lamb Chop, Sosatie, Wors, Pork Rasher & Fries)', price: 'R189' },
    { name: 'Nachos (Spicy Mince, Cheese, Salsa, Guacamole, Sour Cream)', price: 'R169' },
    { name: '250g Sirloin Steak, Fried Egg & Hand-Cut Fries', price: 'R169' },
    { name: 'Eisbein "The House Speciality" with Sauerkraut & Mash', price: 'R199' },
    { name: 'T-Bone Steak 350g with Hand-Crafted Fries', price: 'R189' },
    { name: 'Sticky Pork Ribs (400g: R189  |  800g: R289)', price: 'From R189' },
    { name: 'Mixed Grill (Loin Chop, Sirloin, Sausage & Egg with Fries)', price: 'R189' },
    { name: 'Grilled Rump 300g Swiss Cut', price: 'R189' },
    { name: 'Calamari (Grilled in Garlic, Lemon & Herb / Deep Fried)', price: 'R179' },
    { name: 'Surf & Turf (200g Prime Rump & Calamari)', price: 'R219' },
    { name: 'Fish & Calamari Combo (Hake Fillet & Calamari with Fries)', price: 'R219' },
  ];

  mains.forEach(m => {
    page2.drawText(m.name, { x: 40, y: y2, size: 8, font: fontRegular, color: WHITE });
    page2.drawText(m.price, { x: width - 70, y: y2, size: 8, font: fontBold, color: YELLOW });
    y2 -= 12;
  });

  y2 -= 8;
  page2.drawText('BASKETS & SIDES', { x: 30, y: y2, size: 11, font: fontBold, color: YELLOW });
  y2 -= 14;

  const baskets = [
    { name: 'Midi Basket (Sausage, Samoosa, Spring Roll, 100g Chicken Strips, Fries, Onion Rings)', price: 'R159' },
    { name: 'Maxi Basket (Double portions + 200g Chicken Strips, Full Fries & Onion Rings)', price: 'R299' },
    { name: 'Hand-Crafted Fries (Side: R48  |  Full Order: R68)  •  Beer-Battered Onion Rings: R48', price: 'From R48' },
    { name: 'Extras: Fried Egg R20, Veg of Day R20, Bacon/Sausage/Cheese R20, Sauces R28', price: 'From R20' },
  ];
  baskets.forEach(bk => {
    page2.drawText(bk.name, { x: 40, y: y2, size: 8, font: fontRegular, color: WHITE });
    page2.drawText(bk.price, { x: width - 70, y: y2, size: 8, font: fontBold, color: YELLOW });
    y2 -= 12;
  });

  y2 -= 8;
  page2.drawText('THE FINAL WHISTLE (Desserts & Coffees)', { x: 30, y: y2, size: 11, font: fontBold, color: RED });
  y2 -= 14;

  const desserts = [
    { name: 'Irish Coffee / Dom Pedro (Whiskey, Amarula, Cape Velvet or Kahlua)', price: 'R69' },
    { name: 'Traditional Warm Malva Pudding with Vanilla Ice Cream', price: 'R69' },
    { name: 'Bar One Chocolate Cake / Decadent Chocolate Brownie with Ice Cream', price: 'R69 - R79' },
    { name: 'Vanilla Ice Cream & Warm Bar One Chocolate Sauce', price: 'R69' },
  ];
  desserts.forEach(d => {
    page2.drawText(d.name, { x: 40, y: y2, size: 8, font: fontRegular, color: WHITE });
    page2.drawText(d.price, { x: width - 70, y: y2, size: 8, font: fontBold, color: YELLOW });
    y2 -= 12;
  });

  fs.writeFileSync(path.join(outDir, 'main-menu.pdf'), await doc.save());
}

async function run() {
  console.log('Generating PDFs in', outDir);
  await generateBraaiPacksPDF();
  await generateAdditionalOptionsPDF();
  await generateDailySpecialsPDF();
  await generatePizzaMenuPDF();
  await generateTastyTreatsPDF();
  await generateWednesdayHalfPricePDF();
  await generateMainMenuPDF();
  console.log('All 7 PDFs generated successfully!');
}

run().catch(console.error);
