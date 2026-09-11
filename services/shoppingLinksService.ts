import { Product, ProductCategory, ProductShoppingLinks } from '../types';

export type ShoppingPlatformKey = 'bighaat' | 'agribegri' | 'iffcobazar' | 'amazon' | 'indiamart' | 'flipkart';

export interface ShoppingPlatformInfo {
  key: ShoppingPlatformKey;
  name: string;
  tagline: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  specialty: 'crops_seeds' | 'tools_machinery' | 'fertilizers' | 'general' | 'wholesale';
}

export const SHOPPING_PLATFORMS: Record<ShoppingPlatformKey, ShoppingPlatformInfo> = {
  bighaat: {
    key: 'bighaat',
    name: 'BigHaat',
    tagline: "India's #1 Digital Agri Marketplace",
    color: '#00875A',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800 border-emerald-200',
    specialty: 'crops_seeds',
  },
  agribegri: {
    key: 'agribegri',
    name: 'AgriBegri',
    tagline: 'Farm Tools, Sprayers & Heavy Machinery',
    color: '#EA580C',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800 border-orange-200',
    specialty: 'tools_machinery',
  },
  iffcobazar: {
    key: 'iffcobazar',
    name: 'IFFCO Bazar',
    tagline: 'Direct Cooperative Fertilizers & Bio-stimulants',
    color: '#15803D',
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-800 border-green-200',
    specialty: 'fertilizers',
  },
  amazon: {
    key: 'amazon',
    name: 'Amazon Kisan',
    tagline: 'Fast Delivery & Verified Sellers Across India',
    color: '#F59E0B',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800 border-amber-200',
    specialty: 'general',
  },
  indiamart: {
    key: 'indiamart',
    name: 'IndiaMART',
    tagline: 'Wholesale Bulk Rates & Direct Manufacturers',
    color: '#2563EB',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-800 border-blue-200',
    specialty: 'wholesale',
  },
  flipkart: {
    key: 'flipkart',
    name: 'Flipkart Agri',
    tagline: 'Affordable Farm Supplies & Easy Returns',
    color: '#3B82F6',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-800 border-indigo-200',
    specialty: 'general',
  },
};

/**
 * Cleans up product title to generate optimal search terms for agricultural marketplaces.
 * E.g. "Hybrid Paddy Seeds - PR 126 / Basmati (1kg)" -> "Hybrid Paddy Seeds PR 126 Basmati"
 */
export const cleanSearchTerm = (name: string): string => {
  return name
    .replace(/\s*\([^)]*\)/g, '') // remove parenthetical weights like (1kg)
    .replace(/[-–—/\\,]/g, ' ') // replace dashes, slashes, commas with spaces
    .replace(/[^\w\s]/gi, '') // remove special characters
    .replace(/\s+/g, ' ') // collapse multi-spaces
    .trim();
};

/**
 * Generates upgraded, high-conversion direct search or product URLs for each shopping platform.
 * Automatically adds domain-specific agricultural filters so farmers get genuine farm equipment.
 */
export const generateUpgradedShoppingLinks = (
  name: string,
  category?: ProductCategory,
  customLinks?: ProductShoppingLinks
): Record<ShoppingPlatformKey, string> => {
  const baseTerm = cleanSearchTerm(name);
  const encodedQuery = encodeURIComponent(baseTerm);

  // Platform specific agricultural refinements
  const isSeed = category === ProductCategory.Seeds || /seed|beej|hybrid|sapling/i.test(name);
  const isTool = category === ProductCategory.Tools || category === ProductCategory.Irrigation || /sprayer|pump|weeder|cutter|tiller|plough|pipe|pruning/i.test(name);
  const isFertilizer = category === ProductCategory.Fertilizers || /fertilizer|urea|dap|potash|pesticide|fungicide|neem|npk/i.test(name);

  // BigHaat link: BigHaat uses Next.js path routing: /search/{term} (query param ?q= returns 404)
  // We refine the term to top keywords for highest search relevance on BigHaat
  const bighaatTerm = baseTerm.length > 45 ? baseTerm.split(' ').slice(0, 5).join(' ') : baseTerm;
  const bighaatUrl = customLinks?.bighaat || `https://www.bighaat.com/search/${encodeURIComponent(bighaatTerm)}`;

  // AgriBegri link
  const agribegriUrl = customLinks?.agribegri || `https://agribegri.com/search.php?q=${encodedQuery}&utm_source=krishimitra`;

  // IFFCO Bazar link
  const iffcobazarUrl = customLinks?.iffcobazar || `https://www.iffcobazar.in/en/search?q=${encodedQuery}&utm_source=krishimitra`;

  // Amazon India link: refined with agricultural & gardening / industrial keywords
  const amazonKeyword = isTool
    ? `${baseTerm} agriculture tool`
    : isSeed
    ? `${baseTerm} farming seeds`
    : isFertilizer
    ? `${baseTerm} organic agriculture`
    : `${baseTerm} farming`;
  const amazonUrl = customLinks?.amazon || `https://www.amazon.in/s?k=${encodeURIComponent(amazonKeyword)}&tag=krishimitra-21`;

  // IndiaMART link: includes wholesale manufacturer search
  const indiamartKeyword = isTool ? `${baseTerm} manufacturer machinery` : `${baseTerm} wholesale supplier`;
  const indiamartUrl = customLinks?.indiamart || `https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(indiamartKeyword)}`;

  // Flipkart link: tagged with agriculture category
  const flipkartKeyword = `${baseTerm} agriculture`;
  const flipkartUrl = customLinks?.flipkart || `https://www.flipkart.com/search?q=${encodeURIComponent(flipkartKeyword)}&marketplace=FLIPKART`;

  return {
    bighaat: bighaatUrl,
    agribegri: agribegriUrl,
    iffcobazar: iffcobazarUrl,
    amazon: amazonUrl,
    indiamart: indiamartUrl,
    flipkart: flipkartUrl,
  };
};

export interface DetectedSupplyItem {
  name: string;
  category: 'seed' | 'fertilizer' | 'tool' | 'irrigation';
  icon: string;
  suggestedAction: string;
  links: Record<ShoppingPlatformKey, string>;
}

/**
 * Intelligent detector for crops, fertilizers, pesticides, and tools in AI text
 * Allows the farmer to quickly view and purchase whatever remedy or tool the AI advised.
 */
export const detectSuppliesInText = (text: string): DetectedSupplyItem[] => {
  if (!text) return [];

  const catalog: Array<{
    match: RegExp;
    name: string;
    category: 'seed' | 'fertilizer' | 'tool' | 'irrigation';
    icon: string;
    action: string;
    productCategory: ProductCategory;
  }> = [
    // Fertilizers & Treatments
    {
      match: /\b(neem\s*oil|neem\s*spray|नीम\s*का\s*तेल|ਨਿੰਮ\s*ਦਾ\s*ਤੇਲ)\b/i,
      name: 'Neem Oil Organic Spray (10000 PPM)',
      category: 'fertilizer',
      icon: '🍃',
      action: 'Organic Pest Control',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(urea|nano\s*urea|यूरिया|ਯੂਰੀਆ)\b/i,
      name: 'IFFCO Nano Urea (Liquid Fertilizer)',
      category: 'fertilizer',
      icon: '🧪',
      action: 'Nitrogen Nutrition',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(dap|di-ammonium\s*phosphate|डीएपी)\b/i,
      name: 'DAP (Di-Ammonium Phosphate) Fertilizer',
      category: 'fertilizer',
      icon: '🌾',
      action: 'Root Growth & Soil Vigor',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(npk|19:19:19|19-19-19|एनपीके)\b/i,
      name: 'NPK 19-19-19 Water Soluble Fertilizer',
      category: 'fertilizer',
      icon: '🌱',
      action: 'Balanced Plant Growth',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(potash|mop|muriate\s*of\s*potash|पोटाश)\b/i,
      name: 'MOP Potash Fertilizer (Organic/Chemical)',
      category: 'fertilizer',
      icon: '🌿',
      action: 'Grain & Fruit Hardiness',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(trichoderma|pseudomonas|bio\s*fungicide|ट्राइकोडर्मा)\b/i,
      name: 'Trichoderma Viride Bio-Fungicide',
      category: 'fertilizer',
      icon: '🦠',
      action: 'Root Rot & Fungal Shield',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(zinc|zinc\s*sulphate|जिंक\s*सल्फेट)\b/i,
      name: 'Agricultural Zinc Sulphate (Chelated 12%)',
      category: 'fertilizer',
      icon: '✨',
      action: 'Micronutrient Defense',
      productCategory: ProductCategory.Fertilizers,
    },
    {
      match: /\b(vermicompost|organic\s*manure|केंचुआ\s*खाद)\b/i,
      name: 'Pure Organic Vermicompost Manure',
      category: 'fertilizer',
      icon: '🪱',
      action: 'Soil Organic Carbon',
      productCategory: ProductCategory.Fertilizers,
    },

    // Tools & Machinery
    {
      match: /\b(knapsack|battery\s*sprayer|spray\s*pump|छिड़काव\s*पंप|ਸਪਰੇਅ\s*ਪੰਪ)\b/i,
      name: '16L Dual Battery Knapsack Sprayer Pump',
      category: 'tool',
      icon: '⚡',
      action: 'Pesticide & Foliar Spray',
      productCategory: ProductCategory.Tools,
    },
    {
      match: /\b(weeder|power\s*weeder|cultivator|गुड़ाई\s*मशीन)\b/i,
      name: 'Power Weeder & Tiller (2-Stroke/4-Stroke)',
      category: 'tool',
      icon: '🚜',
      action: 'Weed Eradication & Aeration',
      productCategory: ProductCategory.Tools,
    },
    {
      match: /\b(brush\s*cutter|grass\s*cutter|घास\s*काटने\s*की\s*मशीन)\b/i,
      name: 'Multi-function Brush Cutter with Crop Blade',
      category: 'tool',
      icon: '✂️',
      action: 'Harvesting & De-weeding',
      productCategory: ProductCategory.Tools,
    },
    {
      match: /\b(pruning|secateur|cutter|छंटाई\s*कैंची)\b/i,
      name: 'Heavy Duty Orchard Pruning Shears',
      category: 'tool',
      icon: '✂️',
      action: 'Branch Pruning & Budding',
      productCategory: ProductCategory.Tools,
    },

    // Irrigation
    {
      match: /\b(drip\s*irrigation|drip\s*tape|lateral\s*pipe|ड्रिप\s*सिंचाई|ਟਪਕਾ\s*ਸਿੰਚਾਈ)\b/i,
      name: 'Complete 1-Acre Inline Drip Irrigation Kit',
      category: 'irrigation',
      icon: '💧',
      action: 'Water Saving 70%',
      productCategory: ProductCategory.Irrigation,
    },
    {
      match: /\b(sprinkler|rain\s*gun|फव्वारा\s*सिंचाई|ਸਪ੍ਰਿੰਕਲਰ)\b/i,
      name: 'High-Pressure 360° Rain Gun Sprinkler',
      category: 'irrigation',
      icon: '💦',
      action: 'Uniform Field Coverage',
      productCategory: ProductCategory.Irrigation,
    },

    // Crops & Seeds
    {
      match: /\b(paddy|rice\s*seed|dhaan|बासमती|धान\s*के\s*बीज)\b/i,
      name: 'Certified Hybrid High-Yield Paddy Seeds',
      category: 'seed',
      icon: '🌾',
      action: 'Resistant to Blast Disease',
      productCategory: ProductCategory.Seeds,
    },
    {
      match: /\b(wheat\s*seed|gehu|गेहूं\s*के\s*बीज|ਕਣਕ\s*ਦੇ\s*ਬੀਜ)\b/i,
      name: 'Certified Sharbati / HD Wheat Seeds',
      category: 'seed',
      icon: '🍞',
      action: 'High Tillering & Yield',
      productCategory: ProductCategory.Seeds,
    },
    {
      match: /\b(cotton\s*seed|bt\s*cotton|कपास\s*के\s*बीज|ਨਰਮਾ)\b/i,
      name: 'Bollgard II Hybrid Bt Cotton Seeds',
      category: 'seed',
      icon: '☁️',
      action: 'Bollworm Resistant',
      productCategory: ProductCategory.Seeds,
    },
    {
      match: /\b(mustard\s*seed|sarson|सरसों\s*के\s*बीज)\b/i,
      name: 'Pusa Bold / Pioneer Hybrid Mustard Seeds',
      category: 'seed',
      icon: '🌼',
      action: 'High Oil Content (42%+)',
      productCategory: ProductCategory.Seeds,
    },
  ];

  const results: DetectedSupplyItem[] = [];
  const matchedNames = new Set<string>();

  for (const item of catalog) {
    if (item.match.test(text) && !matchedNames.has(item.name)) {
      matchedNames.add(item.name);
      results.push({
        name: item.name,
        category: item.category,
        icon: item.icon,
        suggestedAction: item.action,
        links: generateUpgradedShoppingLinks(item.name, item.productCategory),
      });
      if (results.length >= 3) break; // Limit to 3 most relevant items per message
    }
  }

  return results;
};
