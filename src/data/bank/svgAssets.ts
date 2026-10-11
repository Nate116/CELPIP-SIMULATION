/**
 * Scalable Vector Graphic (SVG) Scene and Object Illustrations
 * For CELPIP Speaking Task 3 (Scene) & Task 8 (Unusual Situation)
 * Highly descriptive, high-contrast, scalable, Canadian settings.
 */

export const SPEAKING_SVG_ASSETS: Record<string, { title: string; description: string; svg: string }> = {
  // Test 1: Farmers Market Scene & Whimsical Tree Coat Rack
  'scene_t1_market': {
    title: 'Kitsilano Farmers Market on West 4th Avenue',
    description: 'A bustling outdoor Saturday market with 3 striped vendor canopies. In the foreground left, an artisan baker with a blue apron stacks fresh sourdough loaves into wicker baskets. In the center, a mother pushing a stroller converses with a farmer who is weighing bunches of heirloom carrots on a brass hanging scale. In the background right, a street musician with an acoustic guitar plays beside a park bench where a golden retriever is resting. A cyclist with a front basket is entering on the far right.',
    svg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#e0f2fe"/></linearGradient>
    <linearGradient id="canopy1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0284c7"/><stop offset="50%" stop-color="#ffffff"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#skyGrad1)"/>
  <rect y="320" width="800" height="180" fill="#cbd5e1"/>
  <!-- Trees in background -->
  <circle cx="100" cy="240" r="80" fill="#86efac"/>
  <circle cx="250" cy="230" r="90" fill="#4ade80"/>
  <circle cx="680" cy="240" r="85" fill="#86efac"/>
  <!-- Tent 1 (Left: Organic Bakery) -->
  <polygon points="60,200 240,200 210,130 90,130" fill="url(#canopy1)" stroke="#0369a1" stroke-width="3"/>
  <rect x="75" y="200" width="150" height="120" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
  <rect x="85" y="240" width="130" height="25" fill="#f59e0b"/>
  <text x="150" y="258" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#78350f">ORGANIC SOURDOUGH</text>
  <!-- Baker -->
  <circle cx="150" cy="190" r="16" fill="#fbcfe8"/>
  <rect x="135" y="206" width="30" height="40" fill="#0284c7" rx="4"/>
  <!-- Tent 2 (Center: Farm Fresh Carrots) -->
  <polygon points="300,190 480,190 450,120 330,120" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
  <rect x="315" y="190" width="150" height="130" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
  <text x="390" y="160" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">LOCAL PRODUCE</text>
  <!-- Scale & Vendor -->
  <line x1="390" y1="190" x2="390" y2="230" stroke="#475569" stroke-width="4"/>
  <circle cx="390" cy="245" r="18" fill="#fbbf24"/>
  <circle cx="360" cy="210" r="15" fill="#fed7aa"/>
  <!-- Shopper with stroller -->
  <circle cx="530" cy="250" r="16" fill="#fed7aa"/>
  <rect x="520" y="266" width="20" height="45" fill="#6366f1" rx="4"/>
  <ellipse cx="565" cy="305" rx="20" ry="15" fill="#38bdf8"/>
  <circle cx="550" cy="325" r="9" fill="#334155"/>
  <circle cx="580" cy="325" r="9" fill="#334155"/>
  <!-- Right: Musician on bench -->
  <rect x="620" y="270" width="90" height="20" fill="#78350f" rx="3"/>
  <circle cx="650" cy="240" r="14" fill="#fcd34d"/>
  <ellipse cx="665" cy="255" rx="14" ry="18" fill="#d97706" transform="rotate(30 665 255)"/>
  <!-- Dog resting -->
  <ellipse cx="730" cy="315" rx="24" ry="12" fill="#ca8a04"/>
  <circle cx="750" cy="308" r="8" fill="#ca8a04"/>
  <!-- Labels -->
  <rect x="20" y="20" width="230" height="32" rx="8" fill="#0f172a" opacity="0.8"/>
  <text x="30" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#38bdf8">TASK 3: FARMERS MARKET SCENE</text>
</svg>`
  },

  'unusual_t1_coatrack': {
    title: 'Handcrafted Twisted Cedar Tree Coat Rack',
    description: 'An eccentric 6-foot-tall freestanding wooden coat rack carved from reclaimed coastal cedar. The base resembles splayed tree roots. The main trunk is twisted and notched in a spiral. Five protruding branches serve as hooks, each tipped with a carved Canadian forest animal head: a beaver, a horned owl, a black bear cub, a red fox, and a racoon. A carved wooden bird rests on the crown.',
    svg: `<svg viewBox="0 0 500 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wood1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#78350f"/><stop offset="50%" stop-color="#b45309"/><stop offset="100%" stop-color="#451a03"/></linearGradient>
  </defs>
  <rect width="500" height="600" fill="#f8fafc"/>
  <line x1="50" y1="540" x2="450" y2="540" stroke="#cbd5e1" stroke-width="4"/>
  <!-- Roots / Base -->
  <path d="M210,540 Q250,510 230,460 L270,460 Q250,510 290,540 Z" fill="url(#wood1)"/>
  <path d="M250,490 Q170,520 150,540" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
  <path d="M250,490 Q330,520 350,540" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
  <!-- Twisted Trunk -->
  <path d="M235,460 Q265,380 235,300 Q270,200 240,110 L260,110 Q290,200 255,300 Q285,380 255,460 Z" fill="url(#wood1)"/>
  <!-- Branch 1: Left lower (Beaver hook) -->
  <path d="M245,360 Q170,340 140,310" stroke="#78350f" stroke-width="14" fill="none" stroke-linecap="round"/>
  <circle cx="140" cy="310" r="14" fill="#92400e"/>
  <text x="140" y="340" font-family="sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Beaver</text>
  <!-- Branch 2: Right lower (Bear hook) -->
  <path d="M250,330 Q330,310 360,280" stroke="#78350f" stroke-width="14" fill="none" stroke-linecap="round"/>
  <circle cx="360" cy="280" r="15" fill="#451a03"/>
  <text x="360" y="310" font-family="sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Bear</text>
  <!-- Branch 3: Left upper (Owl hook) -->
  <path d="M245,230 Q170,210 130,170" stroke="#78350f" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="130" cy="170" r="14" fill="#b45309"/>
  <text x="130" y="200" font-family="sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Horned Owl</text>
  <!-- Branch 4: Right upper (Fox hook) -->
  <path d="M255,190 Q330,170 370,140" stroke="#78350f" stroke-width="12" fill="none" stroke-linecap="round"/>
  <circle cx="370" cy="140" r="13" fill="#ea580c"/>
  <text x="370" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Red Fox</text>
  <!-- Top Crown bird -->
  <ellipse cx="250" cy="95" rx="14" ry="10" fill="#0284c7"/>
  <polygon points="262,95 272,98 262,102" fill="#f59e0b"/>
  <!-- Dimension scale -->
  <line x1="430" y1="90" x2="430" y2="540" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <text x="440" y="320" font-family="sans-serif" font-size="12" fill="#64748b" transform="rotate(90 440 320)">Approx. 1.85 m (6 ft)</text>
  <rect x="20" y="20" width="220" height="32" rx="8" fill="#0f172a" opacity="0.8"/>
  <text x="30" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">TASK 8: UNUSUAL COAT RACK</text>
</svg>`
  },

  // Test 2: Community Center Ice Rink Scene & Steampunk Coffee Trike
  'scene_t2_icerink': {
    title: 'Community Ice Rink & Warming Pavilion',
    description: 'An indoor municipal recreation ice arena. In the center, young figure skaters practice spins while a hockey coach with a whistle stands along the red boards instructing two teenagers in helmets. On the spectator bleachers to the left, parents in winter parkas drink hot tea from thermoses. In the far background, the Zamboni ice resurfacer sits parked near the garage doors.',
    svg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="#f1f5f9"/>
  <!-- Ice Oval -->
  <ellipse cx="430" cy="340" rx="330" ry="130" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/>
  <!-- Red lines on ice -->
  <ellipse cx="430" cy="340" rx="60" ry="24" fill="none" stroke="#ef4444" stroke-width="3"/>
  <line x1="430" y1="210" x2="430" y2="470" stroke="#ef4444" stroke-width="3"/>
  <!-- Bleachers on left -->
  <polygon points="40,240 180,240 160,380 20,380" fill="#cbd5e1" stroke="#94a3b8"/>
  <circle cx="80" cy="270" r="14" fill="#3b82f6"/>
  <circle cx="120" cy="265" r="14" fill="#ec4899"/>
  <!-- Figure skater in center -->
  <ellipse cx="430" cy="330" rx="10" ry="16" fill="#8b5cf6"/>
  <circle cx="430" cy="308" r="11" fill="#fbcfe8"/>
  <path d="M425,345 L415,365 M435,345 L445,360" stroke="#64748b" stroke-width="3"/>
  <!-- Coach and player at boards -->
  <rect x="620" y="240" width="100" height="15" fill="#ef4444"/>
  <circle cx="640" cy="225" r="14" fill="#1e293b"/>
  <circle cx="675" cy="225" r="14" fill="#0284c7"/>
  <!-- Zamboni machine back right -->
  <rect x="680" y="150" width="70" height="45" fill="#3b82f6" rx="6"/>
  <circle cx="695" cy="195" r="10" fill="#0f172a"/>
  <circle cx="735" cy="195" r="10" fill="#0f172a"/>
  <rect x="20" y="20" width="220" height="32" rx="8" fill="#0f172a" opacity="0.8"/>
  <text x="30" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#38bdf8">TASK 3: COMMUNITY ARENA</text>
</svg>`
  },

  'unusual_t2_coffeetrike': {
    title: 'Custom Cargo Trike Espresso Bar',
    description: 'A heavy-duty cargo tricycle converted into a self-contained mobile espresso station. At the front between two fat-bike tires sits an insulated oak counter holding an antique copper lever espresso machine with a brass pressure dial. Overhead is a mini striped fabric awning supported by copper pipes. A hand-cranked brass bean grinder is attached to the handlebar stem, and a chalkboard menu hangs on the side.',
    svg: `<svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="500" height="500" fill="#f8fafc"/>
  <!-- Front Wheels -->
  <circle cx="130" cy="370" r="50" fill="none" stroke="#1e293b" stroke-width="8"/>
  <circle cx="130" cy="370" r="8" fill="#1e293b"/>
  <!-- Rear Wheel -->
  <circle cx="390" cy="370" r="50" fill="none" stroke="#1e293b" stroke-width="8"/>
  <circle cx="390" cy="370" r="8" fill="#1e293b"/>
  <!-- Frame & Saddle -->
  <path d="M130,370 L260,370 L340,300 L390,370" stroke="#0f172a" stroke-width="6" fill="none"/>
  <line x1="340" y1="300" x2="330" y2="260" stroke="#0f172a" stroke-width="6"/>
  <ellipse cx="325" cy="255" rx="18" ry="7" fill="#78350f"/>
  <!-- Front Wooden Box / Coffee Bar -->
  <rect x="70" y="240" width="180" height="110" fill="#b45309" stroke="#78350f" stroke-width="4" rx="6"/>
  <!-- Espresso Machine (Copper & Brass) -->
  <rect x="95" y="180" width="70" height="60" fill="#b45309" stroke="#d97706" stroke-width="3" rx="4"/>
  <circle cx="130" cy="195" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <line x1="160" y1="180" x2="185" y2="150" stroke="#ca8a04" stroke-width="5" stroke-linecap="round"/>
  <!-- Awning on copper poles -->
  <line x1="80" y1="240" x2="80" y2="110" stroke="#d97706" stroke-width="4"/>
  <line x1="240" y1="240" x2="240" y2="110" stroke="#d97706" stroke-width="4"/>
  <polygon points="60,110 260,110 240,80 80,80" fill="#0284c7"/>
  <rect x="20" y="20" width="220" height="32" rx="8" fill="#0f172a" opacity="0.8"/>
  <text x="30" y="42" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f59e0b">TASK 8: ESPRESSO TRIKE</text>
</svg>`
  }
};
