import React, { useState, useEffect, useMemo } from 'react';
import { LanguageCode, ProductCategory, Product } from '../types';
import translations from '../services/translations';
import { getProducts } from '../services/mockProducts';
import ProductCard from './ProductCard';
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  X,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { SHOPPING_PLATFORMS, ShoppingPlatformKey } from '../services/shoppingLinksService';

interface ShopPageProps {
  language: LanguageCode;
}

const QUICK_TAGS = [
  { label: '🌾 Hybrid Paddy', query: 'paddy' },
  { label: '🍞 HD Wheat', query: 'wheat' },
  { label: '☁️ Bt Cotton', query: 'cotton' },
  { label: '⚡ 16L Sprayer', query: 'sprayer' },
  { label: '🚜 Power Weeder', query: 'weeder' },
  { label: '🧪 Nano Urea', query: 'urea' },
  { label: '🍃 Neem Oil', query: 'neem' },
  { label: '💧 1-Acre Drip Kit', query: 'drip' },
  { label: '💦 Rain Gun', query: 'rain gun' },
];

const ShopPage: React.FC<ShopPageProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<ShoppingPlatformKey | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = (translations.shopPage as any)[language] || {};
  const t_categories = t.categories || {};
  const categories = Object.values(ProductCategory) as ProductCategory[];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProducts(searchTerm, selectedCategory);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategory]);

  // Handle category toggle
  const handleCategoryClick = (category: ProductCategory) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
  };

  // Sort & filter processed products
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Platform filtering (prioritize or filter)
    if (selectedPlatform !== 'all') {
      list = list.filter((p) => {
        if (selectedPlatform === 'bighaat') {
          return p.category === ProductCategory.Seeds || p.category === ProductCategory.Fertilizers;
        }
        if (selectedPlatform === 'agribegri') {
          return p.category === ProductCategory.Tools || p.category === ProductCategory.Irrigation;
        }
        if (selectedPlatform === 'iffcobazar') {
          return p.category === ProductCategory.Fertilizers || p.category === ProductCategory.Seeds;
        }
        return true;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }

    return list;
  }, [products, selectedPlatform, sortBy]);

  return (
    <div className="p-4 md:p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title & Value Proposition */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Auto-Upgraded Agricultural Links Engine</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Krishi Mitra Farm Mart & Tools Hub
              </h1>
              <p className="text-green-100 text-sm md:text-base mt-1 max-w-2xl">
                Direct verified manufacturer links, government cooperative fertilizers, and heavy-duty farm equipment with automated price comparison across BigHaat, AgriBegri, IFFCO, and Amazon.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center bg-black/20 p-3 rounded-xl backdrop-blur-xs text-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-semibold text-white">Farmer Protected</div>
                <div className="text-green-200">Pre-filtered against counterfeit seeds & tools</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 space-y-3">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder || 'Search for crops, seeds, tools, fertilizers...'}
              className="w-full pl-11 pr-10 py-3 text-base border border-gray-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Suggested Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-gray-400 font-medium whitespace-nowrap">Popular Crops & Tools:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag.query}
                onClick={() => {
                  setSearchTerm(tag.query);
                  setSelectedCategory(null);
                }}
                className={`px-2.5 py-1 rounded-full border transition-all whitespace-nowrap ${
                  searchTerm.toLowerCase() === tag.query.toLowerCase()
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
              Select Farming Category
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`p-3.5 rounded-xl text-left font-medium transition-all border ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-md translate-y-[-1px]'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
                  }`}
                >
                  <div className="text-sm font-semibold leading-tight">
                    {t_categories[category] || category}
                  </div>
                  <div className={`text-[11px] mt-1 ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                    Auto-optimized links
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketplace Filter & Sorting Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs text-xs">
          {/* Store Pill Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="font-semibold text-gray-500 mr-1 whitespace-nowrap">Platform:</span>
            <button
              onClick={() => setSelectedPlatform('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedPlatform === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Stores
            </button>
            {(Object.keys(SHOPPING_PLATFORMS) as ShoppingPlatformKey[]).map((key) => {
              const info = SHOPPING_PLATFORMS[key];
              const isActive = selectedPlatform === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPlatform(key)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap border ${
                    isActive
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {info.name}
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown & Count */}
          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            <span className="text-gray-500">
              <strong className="text-gray-900">{processedProducts.length}</strong> items
            </span>
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-gray-700 py-1 px-2 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {isLoading ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <div className="inline-block animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mb-3" />
              <p className="text-gray-600 font-medium">Fetching verified farm supplies & tools...</p>
            </div>
          ) : processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} language={language} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 p-6">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {t.noResults || 'No products found'}
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                Try searching for broader terms like "paddy", "urea", "sprayer", or "pump".
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedPlatform('all');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
