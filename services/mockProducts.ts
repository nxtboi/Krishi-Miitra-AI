import { Product, ProductCategory } from '../types';
import { generateUpgradedShoppingLinks } from './shoppingLinksService';

export const mockProducts: Product[] = [
  // SEEDS & CROPS
  {
    id: "s001",
    name: "Hybrid Paddy Seeds - PR 126 / Basmati (1kg)",
    category: ProductCategory.Seeds,
    price: 380,
    originalPrice: 480,
    rating: 4.8,
    reviewsCount: 320,
    brand: "Pioneer Agri",
    unit: "1 kg pack",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    keywords: ["rice", "paddy", "dhaan", "chawal", "seeds", "beej", "basmati", "kharif", "crop"],
    description: "High-tillering disease resistant paddy seeds suitable for all major Indian soil profiles.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Hybrid Paddy Seeds PR 126 Basmati", ProductCategory.Seeds)
  },
  {
    id: "s002",
    name: "High-Yield Sharbati / HD-3086 Wheat Seeds (5kg)",
    category: ProductCategory.Seeds,
    price: 320,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 512,
    brand: "Kisan Agro Seed",
    unit: "5 kg bag",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    keywords: ["wheat", "gehu", "seeds", "beej", "sharbati", "rabi", "crop"],
    description: "Certified rust-resistant certified wheat seed variety with high protein and grain luster.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("High Yield Sharbati Wheat Seeds HD 3086", ProductCategory.Seeds)
  },
  {
    id: "s003",
    name: "Bollgard II Hybrid Bt Cotton Seeds (450g)",
    category: ProductCategory.Seeds,
    price: 853,
    originalPrice: 990,
    rating: 4.7,
    reviewsCount: 210,
    brand: "Rasi Seeds",
    unit: "450g packet",
    image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&q=80&w=600",
    keywords: ["cotton", "kapas", "narma", "bt cotton", "seeds", "beej", "kharif"],
    description: "Genetically protected BG-II hybrid cotton seed providing immunity against American bollworm.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Bollgard II Hybrid Bt Cotton Seeds", ProductCategory.Seeds)
  },
  {
    id: "s004",
    name: "Pusa Bold Hybrid Mustard / Sarson Seeds (1kg)",
    category: ProductCategory.Seeds,
    price: 240,
    originalPrice: 310,
    rating: 4.6,
    reviewsCount: 145,
    brand: "ICAR Certified",
    unit: "1 kg pack",
    image: "https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&q=80&w=600",
    keywords: ["mustard", "sarson", "rai", "oilseed", "seeds", "beej", "rabi"],
    description: "Bold grain hybrid variety with 42% high oil extraction recovery and drought tolerance.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Pusa Bold Hybrid Mustard Seeds", ProductCategory.Seeds)
  },
  {
    id: "s005",
    name: "Hybrid Sweet Corn / Maize Seeds (1kg)",
    category: ProductCategory.Seeds,
    price: 490,
    originalPrice: 600,
    rating: 4.7,
    reviewsCount: 98,
    brand: "Advanta Golden",
    unit: "1 kg pack",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=600",
    keywords: ["maize", "corn", "makka", "bhutta", "seeds", "beej"],
    description: "Fast maturing hybrid corn seeds providing uniformly dense cobs with high market price.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Hybrid Maize Corn Seeds", ProductCategory.Seeds)
  },
  {
    id: "s006",
    name: "All-Season Kitchen & Farm Vegetable Seeds Kit (12 Varieties)",
    category: ProductCategory.Seeds,
    price: 399,
    originalPrice: 750,
    rating: 4.8,
    reviewsCount: 680,
    brand: "AgriSeeds India",
    unit: "12 packets combo",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=600",
    keywords: ["vegetable", "sabji", "tomato", "chilli", "brinjal", "onion", "seeds", "beej", "organic"],
    description: "Non-GMO heirloom vegetable seeds kit including Tomato, Chilli, Brinjal, Okra, and Spinach.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Vegetable Seeds Kit All Season Farming", ProductCategory.Seeds)
  },

  // FERTILIZERS & CROP CARE
  {
    id: "f001",
    name: "IFFCO Nano Urea Liquid Fertilizer (500ml)",
    category: ProductCategory.Fertilizers,
    price: 225,
    originalPrice: 250,
    rating: 4.9,
    reviewsCount: 1204,
    brand: "IFFCO",
    unit: "500 ml bottle (= 1 Bag 45kg)",
    image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?auto=format&fit=crop&q=80&w=600",
    keywords: ["urea", "nano urea", "liquid fertilizer", "khaad", "nitrogen", "iffco"],
    description: "World's 1st nanotech liquid fertilizer replacing conventional urea bags with 80%+ nitrogen uptake.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("IFFCO Nano Urea Liquid Fertilizer 500ml", ProductCategory.Fertilizers)
  },
  {
    id: "f002",
    name: "DAP (Di-Ammonium Phosphate) Granular Fertilizer (50kg Bag)",
    category: ProductCategory.Fertilizers,
    price: 1350,
    originalPrice: 1500,
    rating: 4.8,
    reviewsCount: 890,
    brand: "IFFCO / KRIBHCO",
    unit: "50 kg bag",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=600",
    keywords: ["dap", "fertilizer", "khaad", "phosphate", "nitrogen", "npk"],
    description: "Standard primary root booster containing 18% Nitrogen and 46% Phosphorus for seeding stage.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("DAP Di Ammonium Phosphate Fertilizer 50kg", ProductCategory.Fertilizers)
  },
  {
    id: "f003",
    name: "Cold-Pressed Neem Oil Organic Insecticide (10,000 PPM - 1L)",
    category: ProductCategory.Fertilizers,
    price: 650,
    originalPrice: 890,
    rating: 4.9,
    reviewsCount: 420,
    brand: "BioCure Agri",
    unit: "1 Liter bottle",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    keywords: ["neem oil", "pesticide", "organic", "insecticide", "kitnashak", "aphids", "whitefly"],
    description: "100% water-soluble high azadirachtin neem oil for eco-friendly insect, mite, and caterpillar control.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Cold Pressed Pure Neem Oil 10000 PPM Agriculture", ProductCategory.Fertilizers)
  },
  {
    id: "f004",
    name: "NPK 19-19-19 100% Water Soluble Fertilizer (1kg)",
    category: ProductCategory.Fertilizers,
    price: 195,
    originalPrice: 280,
    rating: 4.7,
    reviewsCount: 340,
    brand: "Mahadhan",
    unit: "1 kg pouch",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600",
    keywords: ["npk", "19-19-19", "fertilizer", "foliar spray", "drip", "khaad"],
    description: "Balanced nutrition supplement for quick vegetative shoot development through foliar or fertigation.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("NPK 19 19 19 Water Soluble Fertilizer", ProductCategory.Fertilizers)
  },
  {
    id: "f005",
    name: "Trichoderma Viride Bio-Fungicide (1kg)",
    category: ProductCategory.Fertilizers,
    price: 260,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 190,
    brand: "National Bio-Center",
    unit: "1 kg pack",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600",
    keywords: ["trichoderma", "bio fungicide", "root rot", "wilt", "damping off", "organic"],
    description: "Antagonistic biological fungi that prevents Fusarium wilt, collar rot, and damping off in crops.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Trichoderma Viride Bio Fungicide Agriculture", ProductCategory.Fertilizers)
  },
  {
    id: "f006",
    name: "Pure Organic Vermicompost Manure (25kg)",
    category: ProductCategory.Fertilizers,
    price: 450,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 280,
    brand: "Kisan Organic",
    unit: "25 kg bag",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600",
    keywords: ["vermicompost", "organic", "earthworm", "manure", "gobar", "soil"],
    description: "Microbial-rich organic vermicompost that improves soil aeration, water retention, and microbial count.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Pure Organic Vermicompost Manure Agriculture 25kg", ProductCategory.Fertilizers)
  },

  // FARMING TOOLS & MACHINERY
  {
    id: "t001",
    name: "16L Dual Battery Knapsack Sprayer Pump",
    category: ProductCategory.Tools,
    price: 2899,
    originalPrice: 3800,
    rating: 4.9,
    reviewsCount: 780,
    brand: "Balwaan Agri",
    unit: "Complete 16L Kit",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    keywords: ["sprayer", "pump", "battery", "knapsack", "spray", "auzaar", "chemical spray"],
    description: "Rechargeable 12V-12Ah battery knapsack sprayer with telescopic lance and 4 multi-angle brass nozzles.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("16L Dual Battery Knapsack Sprayer Agriculture", ProductCategory.Tools)
  },
  {
    id: "t002",
    name: "2-Stroke Mini Power Weeder & Tiller (63cc)",
    category: ProductCategory.Tools,
    price: 13500,
    originalPrice: 17000,
    rating: 4.7,
    reviewsCount: 310,
    brand: "KisanKraft",
    unit: "1 Unit with blades",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    keywords: ["weeder", "power weeder", "tiller", "cultivator", "plough", "rotavator"],
    description: "Compact petrol power cultivator designed for inter-cultivation de-weeding in vegetables and sugarcane.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Mini Power Weeder Tiller Cultivator 63cc", ProductCategory.Tools)
  },
  {
    id: "t003",
    name: "Heavy-Duty 4-in-1 Crop & Brush Cutter (52cc)",
    category: ProductCategory.Tools,
    price: 8200,
    originalPrice: 11500,
    rating: 4.8,
    reviewsCount: 460,
    brand: "Neptune Agri",
    unit: "Kit with 80T Blade",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=600",
    keywords: ["brush cutter", "crop cutter", "grass cutter", "reaper", "harvesting"],
    description: "High-rpm backpack crop harvesting machine for paddy, wheat, grass, and thick weeds.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Brush Cutter Crop Harvesting Machine 52cc", ProductCategory.Tools)
  },
  {
    id: "t004",
    name: "Japanese SK5 Steel Heavy Pruning Shears & Secateurs",
    category: ProductCategory.Tools,
    price: 680,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 620,
    brand: "Sharpex Agri",
    unit: "1 Piece",
    image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=600",
    keywords: ["pruning", "secateur", "cutter", "shears", "gardening", "grafting"],
    description: "Razor sharp forged SK-5 high carbon steel blade for clean orchard branch cutting and grafting.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Heavy Duty SK5 Pruning Shears Secateurs", ProductCategory.Tools)
  },
  {
    id: "t005",
    name: "Forged Steel Agriculture Spade / Fawda with Handle",
    category: ProductCategory.Tools,
    price: 520,
    originalPrice: 650,
    rating: 4.6,
    reviewsCount: 290,
    brand: "Tata Agrico",
    unit: "1 Piece with Ashwood Handle",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=600",
    keywords: ["spade", "fawda", "shovel", "auzaar", "kudal", "khurpa"],
    description: "Tempered manganese steel spade blade with anti-corrosion coating for heavy digging and bund making.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Tata Agrico Heavy Duty Spade Fawda", ProductCategory.Tools)
  },

  // IRRIGATION SYSTEMS
  {
    id: "i001",
    name: "Complete 1-Acre Inline Drip Irrigation System Kit",
    category: ProductCategory.Irrigation,
    price: 14200,
    originalPrice: 18500,
    rating: 4.9,
    reviewsCount: 390,
    brand: "Jain Irrigation / Finolex",
    unit: "1 Acre Full System",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600",
    keywords: ["drip", "irrigation", "sichai", "system", "pipe", "lateral", "dripper", "venturi"],
    description: "Includes 16mm ISI inline drip lateral pipes, screen filter, venturi injector, ball valves, and joiners.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Complete 1 Acre Inline Drip Irrigation System Kit", ProductCategory.Irrigation)
  },
  {
    id: "i002",
    name: "High-Pressure 360° Rain Gun Sprinkler Kit (1.5 inch)",
    category: ProductCategory.Irrigation,
    price: 3499,
    originalPrice: 4800,
    rating: 4.8,
    reviewsCount: 275,
    brand: "Falcon Agri",
    unit: "Gun + Tripod Stand Kit",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600",
    keywords: ["rain gun", "sprinkler", "fawara", "irrigation", "sichai", "water gun"],
    description: "Throws uniform artificial rain across 80 to 120 ft radius with adjustable sector angles.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("Rain Gun Sprinkler 1.5 inch Tripod Kit", ProductCategory.Irrigation)
  },
  {
    id: "i003",
    name: "Reinforced HDPE Lay-Flat Discharge Delivery Hose (65mm x 60m)",
    category: ProductCategory.Irrigation,
    price: 3100,
    originalPrice: 4100,
    rating: 4.7,
    reviewsCount: 180,
    brand: "Vardhman Pipes",
    unit: "60 Meter Roll",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
    keywords: ["lay flat pipe", "hose", "delivery pipe", "irrigation", "sichai", "lapeta pipe"],
    description: "Lightweight, flexible 4-bar burst pressure lay-flat lapeta delivery pipe resistant to sunlight and tearing.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("HDPE Lay Flat Delivery Pipe 60m Agriculture", ProductCategory.Irrigation)
  },
  {
    id: "i004",
    name: "Solar / Electric Monoblock 1 HP Submersible Water Pump",
    category: ProductCategory.Irrigation,
    price: 6999,
    originalPrice: 9200,
    rating: 4.8,
    reviewsCount: 220,
    brand: "Kirloskar / Crompton",
    unit: "1 HP Set",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    keywords: ["water pump", "motor", "submersible", "solar pump", "irrigation", "sichai"],
    description: "Copper-wound high head energy-efficient agricultural monoblock pump with thermal overload protection.",
    verifiedForFarming: true,
    inStock: true,
    shoppingLinks: generateUpgradedShoppingLinks("1 HP Agricultural Monoblock Water Pump Submersible", ProductCategory.Irrigation)
  }
];

export const getProducts = async (
  term?: string,
  category?: ProductCategory | null,
  platformFilter?: string | null
): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...mockProducts];
      if (category) {
        results = results.filter((p) => p.category === category);
      }
      if (term && term.trim()) {
        const lowerTerm = term.toLowerCase().trim();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description?.toLowerCase().includes(lowerTerm) ||
            p.brand?.toLowerCase().includes(lowerTerm) ||
            p.keywords.some((kw) => kw.toLowerCase().includes(lowerTerm))
        );
      }
      resolve(results);
    }, 150);
  });
};
