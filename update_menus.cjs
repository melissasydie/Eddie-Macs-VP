const fs = require('fs');

const mainCats = [
    { id: 'cat_breakfast', name: 'Breakfast', order: 1 },
    { id: 'cat_starters', name: 'Kick Off Starters', order: 2 },
    { id: 'cat_salads', name: 'Sportsmans Salads', order: 3 },
    { id: 'cat_toasties', name: 'Toasties', order: 4 },
    { id: 'cat_kids', name: 'Little Sports', order: 5 },
    { id: 'cat_shakes', name: 'Milkshakes', order: 6 },
    { id: 'cat_main', name: 'Main Meals', order: 7 },
    { id: 'cat_sides', name: 'Offside (Sides)', order: 8 },
    { id: 'cat_baskets', name: 'Baskets', order: 9 },
    { id: 'cat_desserts', name: 'Final Whistle (Desserts)', order: 10 },
];

const mainItems = [
    { id: 'm1', categoryId: 'cat_breakfast', name: 'English Breakfast', description: '1 egg, bacon, 1 pork/beef sausage, mushrooms, toast', price: 'R99' },
    { id: 'm2', categoryId: 'cat_breakfast', name: '3 Egg Omlete', description: 'Add your choice of filling: Ham / Bacon / Cheese / Mushroom R25 each', price: 'R48' },
    { id: 'm3', categoryId: 'cat_breakfast', name: 'Captain\'s Breakfast', description: '2 eggs, bacon, 2 pork/beef sausages, mushrooms, tomato, toast', price: 'R129' },
    { id: 'm4', categoryId: 'cat_breakfast', name: 'Biker\'s Breakfast', description: '(Sat & Sun: 10am - 4pm) 2 eggs, bacon, 2 pork/beef sausages, mushrooms, tomato, toast', price: 'R99' },
    
    { id: 'm5', categoryId: 'cat_starters', name: 'Chicken Livers Peri-Peri', description: 'Sautéed chicken livers with a chilli lemon sauce served with toast', price: 'R89' },
    { id: 'm6', categoryId: 'cat_starters', name: 'Garlic, Cheese & Bacon Roll', description: 'Oven fresh roll dripping in hot garlic butter & topped with melted cheese & crispy bacon', price: 'R89' },
    { id: 'm7', categoryId: 'cat_starters', name: 'Crumbed Mushrooms', description: 'Crumbed mushrooms served with tartar sauce', price: 'R89' },
    { id: 'm8', categoryId: 'cat_starters', name: 'Escargot', description: '6 sizzling snails in garlic butter / creamy Roquefort & white wine sauce, served with bread', price: 'R129' },
    { id: 'm9', categoryId: 'cat_starters', name: 'Homemade Soup', description: 'Hearty oxtail/country veg. Served with bread & butter', price: 'R69' },
    { id: 'm10', categoryId: 'cat_starters', name: 'Boerewors / Cheezy Griller Roll', description: '', price: 'R89' },

    { id: 'm11', categoryId: 'cat_salads', name: 'Greek Salad', description: 'Grated feta & calamata olives', price: 'R99' },
    { id: 'm12', categoryId: 'cat_salads', name: 'Cajun Chicken Salad', description: 'Cajun spiced chicken strips on fresh greens in a peach, chilli & lemon dressing', price: 'R139' },
    { id: 'm13', categoryId: 'cat_salads', name: 'Salad Roll', description: 'A selection of salad greens, cheddar cheese & mayo on a toasted roll', price: 'R89' },
    { id: 'm14', categoryId: 'cat_salads', name: 'Veggie Burger', description: 'Guilt-free soya or mushroom patty on an oven fresh roll with tomato & lettuce served with hand-crafted fries', price: 'R99' },

    { id: 'm15', categoryId: 'cat_toasties', name: 'Cheese & Tomato', description: 'White or wholewheat. Add fries for R35', price: 'R69' },
    { id: 'm16', categoryId: 'cat_toasties', name: 'Ham/Cheese/Tomato', description: 'White or wholewheat. Add fries for R35', price: 'R79' },
    { id: 'm17', categoryId: 'cat_toasties', name: 'Chicken Mayo', description: 'White or wholewheat. Add fries for R35', price: 'R79' },
    { id: 'm18', categoryId: 'cat_toasties', name: 'Egg & Bacon', description: 'White or wholewheat. Add fries for R35', price: 'R79' },
    { id: 'm19', categoryId: 'cat_toasties', name: 'Club Sandwich', description: 'Chicken, cheese, tomato, bacon, lettuce & onion. White or wholewheat. Add fries for R35', price: 'R119' },

    { id: 'm20', categoryId: 'cat_kids', name: 'Fish Fingers', description: 'Served with hand-crafted fries', price: 'R79' },
    { id: 'm21', categoryId: 'cat_kids', name: 'Mini Beef/Chicken Burger', description: 'Served with hand-crafted fries', price: 'R89' },
    { id: 'm22', categoryId: 'cat_kids', name: 'Hot Dog', description: 'Served with hand-crafted fries', price: 'R79' },
    { id: 'm23', categoryId: 'cat_kids', name: 'Mini Pizza', description: 'Served with hand-crafted fries', price: 'R89' },

    { id: 'm24', categoryId: 'cat_shakes', name: 'Vanilla / Chocolate / Strawberry / Bubblegum', description: '', price: 'R58' },
    { id: 'm25', categoryId: 'cat_shakes', name: 'Bar One / Coffee', description: '', price: 'R60' },
    { id: 'm26', categoryId: 'cat_shakes', name: 'Ferrero Rocher / Cookies & Cream', description: '', price: 'R64' },

    { id: 'm27', categoryId: 'cat_main', name: 'Burger', description: 'Homemade 180g beef/grilled chicken burger, with a side of hand-crafted fries. Add bacon/cheese - R20 each', price: 'R125' },
    { id: 'm28', categoryId: 'cat_main', name: 'Chicken Schnitzel', description: 'Crumbed breast with creamy sauce & hand-crafted fries', price: 'R149' },
    { id: 'm29', categoryId: 'cat_main', name: 'Bangers & Mash', description: '3 pork/beef sausages with mash & onion gravy', price: 'R139' },
    { id: 'm30', categoryId: 'cat_main', name: 'Fish & Chips', description: 'Golden-fried, served with hand-crafted fries & our tangy sauce', price: 'R159' },
    { id: 'm31', categoryId: 'cat_main', name: 'Braai Meal', description: 'Lamb chop, chicken sosatie, wors, pork rasher & hand crafted fries', price: 'R189' },
    { id: 'm32', categoryId: 'cat_main', name: 'Nachos', description: 'Spicy mince smothered in cheese, & served with salsa, guacamole & sour cream', price: 'R169' },
    { id: 'm33', categoryId: 'cat_main', name: '250g Steak, Egg & Chips', description: 'Sirloin served with an egg & hand-crafted fries', price: 'R169' },
    { id: 'm34', categoryId: 'cat_main', name: 'Eisbein', description: '"The house speciality" served crispy with sauerkraut & mash', price: 'R199' },
    { id: 'm35', categoryId: 'cat_main', name: 'T-Bone 350g', description: 'Served rare, medium rare, medium with hand-crafted fries', price: 'R189' },
    { id: 'm36', categoryId: 'cat_main', name: '400g Ribs', description: 'Served with hand-crafted fries', price: 'R189' },
    { id: 'm37', categoryId: 'cat_main', name: '800gr Ribs', description: 'Served with hand-crafted fries', price: 'R289' },
    { id: 'm38', categoryId: 'cat_main', name: 'Mixed Grill', description: 'Loin chop, sirloin, pork/beef sausage & egg with hand-crafted fries', price: 'R189' },
    { id: 'm39', categoryId: 'cat_main', name: 'Grilled Rump', description: '300g Rump Swiss Cut', price: 'R189' },
    { id: 'm40', categoryId: 'cat_main', name: 'Calamari', description: 'Grilled in garlic, lemon & herb/deep fried with hand-crafted fries & salad', price: 'R179' },
    { id: 'm41', categoryId: 'cat_main', name: 'Surf & Turf', description: '200g prime rump & calamari dusted with seasonal flour', price: 'R219' },
    { id: 'm42', categoryId: 'cat_main', name: 'Fish & Calamari', description: 'Golden fried hake fillet with grilled/fried calamari', price: 'R219' },

    { id: 'm43', categoryId: 'cat_sides', name: 'Hand-Crafted Fries', description: 'Side order/Full order', price: 'R48/R68' },
    { id: 'm44', categoryId: 'cat_sides', name: 'Onion Rings', description: 'Side order of our famous beer-battered onion rings', price: 'R48' },
    { id: 'm45', categoryId: 'cat_sides', name: 'Egg / Veg of the Day / Bacon / Sausage / Cheese / Feta / All Dips', description: '', price: 'R20' },
    { id: 'm46', categoryId: 'cat_sides', name: 'All Sauces', description: '', price: 'R28' },

    { id: 'm47', categoryId: 'cat_baskets', name: 'Midi Basket', description: '2 portion cheezy sausage / 2 portion samoosa / 2 portion springroll / 100g chicken strips / side order hand-crafted fries / onion rings', price: 'R159' },
    { id: 'm48', categoryId: 'cat_baskets', name: 'Maxi Basket', description: '4 portion cheezy sausage / 4 portion samoosa / 4 portion springroll / 200g chicken strips / full order hand-crafted fries / onion rings', price: 'R299' },

    { id: 'm49', categoryId: 'cat_desserts', name: 'Irish Coffee', description: 'The age-old partnership of coffee & whiskey', price: 'R69' },
    { id: 'm50', categoryId: 'cat_desserts', name: 'Dom Pedro', description: 'Ice cream & whiskey/amarula/cape velvet/kahlua', price: 'R69' },
    { id: 'm51', categoryId: 'cat_desserts', name: 'Malva Pudding', description: 'Served with ice-cream', price: 'R69' },
    { id: 'm52', categoryId: 'cat_desserts', name: 'Bar One Chocolate Cake', description: '', price: 'R79' },
    { id: 'm53', categoryId: 'cat_desserts', name: 'Ice Cream & Bar One Sauce', description: '', price: 'R69' },
    { id: 'm54', categoryId: 'cat_desserts', name: 'Decadent Chocolate Brownie', description: 'Served with ice-cream', price: 'R69' },
];

const pizzaCats = [
    { id: 'p_basic', name: 'Basic Pizzas', order: 1 },
    { id: 'p_deluxe', name: 'Deluxe Pizzas', order: 2 },
];
const pizzaItems = [
    { id: 'p1', categoryId: 'p_basic', name: 'Focaccia', description: 'Garlic Butter', price: 'R69' },
    { id: 'p2', categoryId: 'p_basic', name: 'Vegetarian Pizza', description: 'Tomatoes, garlic, onions, herbs & mozzarella', price: 'R99' },
    { id: 'p3', categoryId: 'p_basic', name: 'Margherita Pizza', description: 'Cherry tomatoes, basil, garlic, parmesan & mozzarella', price: 'R99' },
    { id: 'p4', categoryId: 'p_basic', name: 'Tropical Pizza', description: 'Ham & pineapple & mozzarella', price: 'R139' },
    { id: 'p5', categoryId: 'p_basic', name: 'Bacon & Cheese Pizza', description: 'Bacon, cheddar & mozzarella', price: 'R149' },
    { id: 'p6', categoryId: 'p_basic', name: 'Regina Pizza', description: 'Mushrooms, ham, olives, garlic & mozzarella', price: 'R149' },
    { id: 'p7', categoryId: 'p_basic', name: 'Hawaiian Pizza', description: 'Ham, BBQ sauce, pineapple & mozzarella', price: 'R149' },

    { id: 'p8', categoryId: 'p_deluxe', name: 'Cheesy Griller', description: 'Cheese griller, caramalised onions & mozzarella', price: 'R159' },
    { id: 'p9', categoryId: 'p_deluxe', name: 'Pork Deluxe', description: 'Pulled pork & mozzarella', price: 'R159' },
    { id: 'p10', categoryId: 'p_deluxe', name: 'Pepperoni Pizza', description: 'Pepperoni, mushrooms, olives & mozzarella', price: 'R169' },
    { id: 'p11', categoryId: 'p_deluxe', name: 'Spicy BBQ Chicken', description: 'Chicken, jalapenos, bacon & mozzarella', price: 'R169' },
    { id: 'p12', categoryId: 'p_deluxe', name: 'Chicken & Mushroom', description: 'Chicken, mushrooms, creamy mushroom sauce & mozzarella', price: 'R169' },
    { id: 'p13', categoryId: 'p_deluxe', name: 'Cheesy Steak Pizza', description: 'Sirloin steak, peppers, BBQ sauce & mozzarella', price: 'R179' },
    { id: 'p14', categoryId: 'p_deluxe', name: 'Meaty Pizza', description: 'Spicy mince, chillies & mozzarella', price: 'R189' },
];

const menuSpecials = [
    { id: 's1', dayOfWeek: 'EVERYDAY', title: 'English Breakfast', description: '1x egg, 2x bacon, 1x sausage & hand-cut fries', price: 'R59.90', colorTheme: 'yellow' },
    { id: 's2', dayOfWeek: 'MONDAY', title: 'Buy 1 Get One Free Pizza', description: 'Buy any deluxe pizza & get a basic pizza free!', price: 'FREE PIZZA', colorTheme: 'blue' },
    { id: 's3', dayOfWeek: 'MONDAY', title: 'Chicken Schnitzel', description: 'Served with hand-cut fries', price: 'R99', colorTheme: 'blue' },
    { id: 's4', dayOfWeek: 'TUESDAY', title: 'Braai Meal', description: 'Lamb chop, chicken sosatie, wors, pork rasher & hand cut fries', price: 'R99', colorTheme: 'cyan' },
    { id: 's5', dayOfWeek: 'TUESDAY', title: 'Bacon & Cheese Burger', description: 'Homemade bacon & cheese burger served with hand-cut fries', price: 'R99', colorTheme: 'cyan' },
    { id: 's6', dayOfWeek: 'WEDNESDAY', title: 'Famous Half-Price Captains Table', description: 'Choice of 16 main meals @ half price. All day special', price: 'HALF PRICE', colorTheme: 'green' },
    { id: 's7', dayOfWeek: 'THURSDAY', title: 'Chicken Schnitzel', description: 'Served with hand-cut fries', price: 'R99', colorTheme: 'orange' },
    { id: 's8', dayOfWeek: 'THURSDAY', title: 'Steak Roll & Hand-Cut Fries', description: 'Steak smothered in fried onions on a fresh hotdog roll & hand-cut fries', price: 'R99', colorTheme: 'orange' },
    { id: 's9', dayOfWeek: 'FRIDAY', title: 'Friday R99 Meals', description: 'Eisbein, Chicken Schnitzel, Beef Curry, Fish & Chips, Bangers & Mash', price: 'R99 EACH', colorTheme: 'red' },
    { id: 's10', dayOfWeek: 'SATURDAY', title: '800gr Ribs', description: '', price: 'R199', colorTheme: 'pink' },
    { id: 's11', dayOfWeek: 'SATURDAY', title: 'Any Basic Pizza', description: '', price: 'R129', colorTheme: 'pink' },
    { id: 's12', dayOfWeek: 'SATURDAY', title: 'Any Deluxe Pizza', description: '', price: 'R149', colorTheme: 'pink' },
    { id: 's13', dayOfWeek: 'SATURDAY', title: 'Eisbein', description: 'Served crispy with sauerkraut & mash', price: 'R169', colorTheme: 'pink' },
    { id: 's14', dayOfWeek: 'SUNDAY', title: 'Any Basic Pizza', description: '', price: 'R129', colorTheme: 'yellow' },
    { id: 's15', dayOfWeek: 'SUNDAY', title: 'Any Deluxe Pizza', description: '', price: 'R149', colorTheme: 'yellow' },
];

const halfpriceMeals = [
    { name: 'Burger', orig: 'R125', half: 'R63' },
    { name: 'Chicken Schnitzel', orig: 'R149', half: 'R75' },
    { name: 'Bangers & Mash', orig: 'R139', half: 'R70' },
    { name: 'Fish & Chips', orig: 'R159', half: 'R80' },
    { name: 'Braai Meal', orig: 'R189', half: 'R95' },
    { name: 'Nachos', orig: 'R169', half: 'R85' },
    { name: '250g Steak, Egg & Chips', orig: 'R169', half: 'R85' },
    { name: 'Eisbein', orig: 'R199', half: 'R100' },
    { name: 'T-Bone 350g', orig: 'R189', half: 'R95' },
    { name: '400g Ribs', orig: 'R189', half: 'R95' },
    { name: '800gr Ribs', orig: 'R299', half: 'R145' },
    { name: 'Mixed Grill', orig: 'R189', half: 'R95' },
    { name: 'Grilled Rump', orig: 'R189', half: 'R95' },
    { name: 'Calamari', orig: 'R179', half: 'R90' },
    { name: 'Surf & Turf', orig: 'R219', half: 'R110' },
    { name: 'Fish & Calamari', orig: 'R219', half: 'R110' },
];

let content = fs.readFileSync('src/pages/PublicView.tsx', 'utf8');

// Replace the main menu items arrays in MainMenuView
content = content.replace(
    /const displayCats = categories\.length > 0 \? categories : \[[^\]]+\];/,
    `const displayCats = categories.length > 0 ? categories : ${JSON.stringify(mainCats, null, 4)};`
);

content = content.replace(
    /const displayItems = items\.length > 0 \? items : \[[^\]]+\];/,
    `const displayItems = items.length > 0 ? items : ${JSON.stringify(mainItems, null, 4)};`
);

// Replace specials
content = content.replace(
    /const displaySpecials = specials\.length > 0 \? specials : \[[^\]]+\];/,
    `const displaySpecials = specials.length > 0 ? specials : ${JSON.stringify(menuSpecials, null, 4)};`
);


// Replace MenusHubView menus
content = content.replace(
    /const menus = \[[^\]]+\];/,
    `const menus = [
    { id: 'main', title: 'Main Menu', subtitle: 'Burgers, Schnitzels, Ribs & More', color: 'bg-red-600', hoverColor: 'hover:bg-red-500', icon: Utensils },
    { id: 'specials', title: 'Daily Specials', subtitle: 'Unbeatable deals every day of the week', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-500', icon: Flame },
    { id: 'pizza', title: 'Pizza Menu', subtitle: 'Delicious Thin Based Pizzas', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-400', icon: Pizza },
    { id: 'treats', title: 'Tasty Treats', subtitle: 'Platters & Pizzas made for sharing', color: 'bg-yellow-500', textClass: 'text-stone-900', hoverColor: 'hover:bg-yellow-400', icon: Gift },
    { id: 'braai', title: 'Braai Packs', subtitle: 'Perfect for groups, teams & events', color: 'bg-red-700', hoverColor: 'hover:bg-red-600', icon: Flame },
    { id: 'additional', title: 'Additional Menu Options', subtitle: 'Snack platters for functions', color: 'bg-stone-700', hoverColor: 'hover:bg-stone-600', icon: Users },
    { id: 'halfprice', title: 'Wednesday Half-Price', subtitle: 'Famous Captains Table Deals', color: 'bg-green-600', hoverColor: 'hover:bg-green-500', icon: CheckCircle2 },
  ];`
);

// Now we need to add the new views and modify the routing in App
// Let's create the components first

const newComponents = `

function PizzaMenuView() {
  const categories = ${JSON.stringify(pizzaCats, null, 4)};
  const items = ${JSON.stringify(pizzaItems, null, 4)};

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
  const meals = ${JSON.stringify(halfpriceMeals, null, 4)};

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

`;

content = content.replace('function BraaiPacksView() {', newComponents + '\nfunction BraaiPacksView() {');


// Overwrite BraaiPacksView with the detailed version
const braaiPacksView = `function BraaiPacksView() {
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
}`;

content = content.replace(/function BraaiPacksView\(\) \{[\s\S]*?(?=function TastyTreatsView)/, braaiPacksView + '\n\n');

// Overwrite TastyTreatsView
const tastyTreatsView = `function TastyTreatsView() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-800 -z-10"></div>
         <div className="inline-block bg-stone-950 px-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-red-600 mb-0 leading-none drop-shadow-xl" style={{ fontFamily: 'var(--font-slug)' }}>Tasty</h2>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white drop-shadow-xl leading-none" style={{ fontFamily: 'var(--font-slug)' }}>Treats</h2>
         </div>
      </div>
      <p className="text-center text-yellow-500 font-bold uppercase tracking-widest mb-12 text-xl">Perfect for sharing. Made for good times.</p>

      <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl mb-12">
        <h3 className="text-4xl font-black uppercase tracking-widest text-yellow-500 mb-2 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Lekker Snack Platters</h3>
        <p className="text-stone-400 font-bold uppercase tracking-wider mb-6 mt-2">Bargain buy for the table!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-stone-800/50 pb-2">
              <span className="text-2xl font-bold uppercase tracking-wider text-white">X 4</span>
              <span className="text-2xl font-black text-yellow-500">R299</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-800/50 pb-2">
              <span className="text-2xl font-bold uppercase tracking-wider text-white">X 6</span>
              <span className="text-2xl font-black text-yellow-500">R449</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-800/50 pb-2">
              <span className="text-2xl font-bold uppercase tracking-wider text-white">X 8</span>
              <span className="text-2xl font-black text-yellow-500">R599</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-800/50 pb-2">
              <span className="text-2xl font-bold uppercase tracking-wider text-white">X 10</span>
              <span className="text-2xl font-black text-yellow-500">R749</span>
            </div>
          </div>
          <div className="bg-stone-950 p-6 border border-stone-800 rounded">
             <p className="text-stone-300 font-bold uppercase tracking-wider leading-relaxed">
               Cheezy sausage, samoosa, spring roll, 100gm chicken strips & handful of hand crafted fries
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
         <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-3xl font-black uppercase tracking-widest text-white bg-red-600 px-4 py-1" style={{ fontFamily: 'var(--font-slug)' }}>Burger</h3>
             <span className="text-3xl font-black text-white bg-red-600 px-4 py-1" style={{ fontFamily: 'var(--font-slug)' }}>R99</span>
           </div>
           <p className="text-stone-300 font-bold uppercase tracking-wider text-sm mb-4">Homemade 180g beef or grilled chicken burger on an oven fresh roll with a side of hand-crafted fries</p>
           <p className="text-yellow-500 font-bold uppercase tracking-wider text-xs">Add bacon/cheese - R20 each</p>
         </div>

         <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-3xl font-black uppercase tracking-widest text-white bg-red-600 px-4 py-1" style={{ fontFamily: 'var(--font-slug)' }}>Chicken Wrap & Fries</h3>
             <span className="text-3xl font-black text-white bg-red-600 px-4 py-1" style={{ fontFamily: 'var(--font-slug)' }}>R99</span>
           </div>
           <p className="text-stone-300 font-bold uppercase tracking-wider text-sm">Original/sweet chillie, with crumbed chicken strips, lettuce, tomato & cucumber on a tortilla & a side of hand-crafted fries</p>
         </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 p-8 shadow-xl">
        <h3 className="text-5xl font-black uppercase tracking-widest text-white mb-8 border-b-2 border-stone-800 pb-4" style={{ fontFamily: 'var(--font-slug)' }}>Pizzas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
             <div className="flex justify-between items-center border-b border-stone-800/50 pb-2 mb-2">
               <span className="text-lg font-bold uppercase tracking-wider text-white">Tropical</span>
               <span className="text-lg font-black text-yellow-500">R139</span>
             </div>
             <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Ham & pineapple & mozzarella</p>
          </div>
          <div>
             <div className="flex justify-between items-center border-b border-stone-800/50 pb-2 mb-2">
               <span className="text-lg font-bold uppercase tracking-wider text-white">Bacon & Cheese</span>
               <span className="text-lg font-black text-yellow-500">R149</span>
             </div>
             <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Bacon, cheddar & mozzarella</p>
          </div>
          <div>
             <div className="flex justify-between items-center border-b border-stone-800/50 pb-2 mb-2">
               <span className="text-lg font-bold uppercase tracking-wider text-white">Cheesy Griller</span>
               <span className="text-lg font-black text-yellow-500">R159</span>
             </div>
             <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Cheese griller, caramalised onions & mozzarella</p>
          </div>
          <div>
             <div className="flex justify-between items-center border-b border-stone-800/50 pb-2 mb-2">
               <span className="text-lg font-bold uppercase tracking-wider text-white">BBQ Chicken</span>
               <span className="text-lg font-black text-yellow-500">R169</span>
             </div>
             <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Chicken, jalapenos, bacon & mozzarella</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(/function TastyTreatsView\(\) \{[\s\S]*?(?=function DownloadsView)/, tastyTreatsView + '\n\n');

// Finally, we need to wire up the views in the main router block
// Find where it renders these views:

/*
        {currentView === 'menus' && <MenusHubView setCurrentView={setCurrentView} />}
        {currentView === 'specials' && <MenuWrapper setCurrentView={setCurrentView}><SpecialsView specials={specials} /></MenuWrapper>}
        {currentView === 'main' && <MenuWrapper setCurrentView={setCurrentView}><MainMenuView categories={categories} items={menuItems} /></MenuWrapper>}
        {currentView === 'braai' && <MenuWrapper setCurrentView={setCurrentView}><BraaiPacksView /></MenuWrapper>}
        {currentView === 'treats' && <MenuWrapper setCurrentView={setCurrentView}><TastyTreatsView /></MenuWrapper>}
*/

const routingRe = /{currentView === 'treats' && <MenuWrapper setCurrentView=\{setCurrentView\}><TastyTreatsView \/><\/MenuWrapper>}/;
const newRouting = `{currentView === 'treats' && <MenuWrapper setCurrentView={setCurrentView}><TastyTreatsView /></MenuWrapper>}
        {currentView === 'pizza' && <MenuWrapper setCurrentView={setCurrentView}><PizzaMenuView /></MenuWrapper>}
        {currentView === 'additional' && <MenuWrapper setCurrentView={setCurrentView}><AdditionalMenuOptionsView /></MenuWrapper>}
        {currentView === 'halfprice' && <MenuWrapper setCurrentView={setCurrentView}><WednesdayHalfPriceView /></MenuWrapper>}`;

content = content.replace(routingRe, newRouting);

fs.writeFileSync('src/pages/PublicView.tsx', content);

