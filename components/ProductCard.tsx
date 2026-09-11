import React, { useState } from 'react';
import { Product, ProductCategory, LanguageCode } from '../types';
import translations from '../services/translations';
import {
  AmazonIcon,
  FlipkartIcon,
  IndiaMartIcon,
  BigHaatIcon,
  AgriBegriIcon,
  IffcoIcon,
} from './icons/Icons';
import {
  generateUpgradedShoppingLinks,
  SHOPPING_PLATFORMS,
  ShoppingPlatformKey,
} from '../services/shoppingLinksService';
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  Star,
  ChevronDown,
  ChevronUp,
  Share2,
  Percent,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  language: LanguageCode;
}

const CATEGORY_FALLBACK_IMAGES: Record<ProductCategory, string> = {
  [ProductCategory.Seeds]: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
  [ProductCategory.Fertilizers]: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600',
  [ProductCategory.Tools]: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=600',
  [ProductCategory.Irrigation]: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600',
};

const ProductCard: React.FC<ProductCardProps> = ({ product, language }) => {
  const t = (translations.shopPage as any)[language] || {};
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentImg, setCurrentImg] = useState(product.image);
  const [hasFallbackLoaded, setHasFallbackLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const handleImgError = () => {
    if (!hasFallbackLoaded) {
      setHasFallbackLoaded(true);
      const fallback = CATEGORY_FALLBACK_IMAGES[product.category] || CATEGORY_FALLBACK_IMAGES[ProductCategory.Seeds];
      setCurrentImg(fallback);
    } else {
      setIsBroken(true);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Upgraded smart links tailored for Indian agricultural marketplaces
  const upgradedLinks = generateUpgradedShoppingLinks(
    product.name,
    product.category,
    product.shoppingLinks
  );

  const openPlatformLink = (platform: ShoppingPlatformKey, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = upgradedLinks[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = (platform: ShoppingPlatformKey, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = upgradedLinks[platform];
    if (url && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedKey(platform);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  // Determine top 3 primary buttons based on product category
  const primaryKeys: ShoppingPlatformKey[] = React.useMemo(() => {
    const isTool = /tool|sprayer|pump|weeder|cutter|tiller|shears|spade|irrigation|pipe/i.test(
      product.name + ' ' + product.category
    );
    const isFertilizer = /fertilizer|urea|dap|potash|pesticide|neem|npk|manure/i.test(
      product.name + ' ' + product.category
    );

    if (isTool) {
      return ['agribegri', 'amazon', 'indiamart'];
    }
    if (isFertilizer) {
      return ['iffcobazar', 'bighaat', 'amazon'];
    }
    // Default / Seeds
    return ['bighaat', 'amazon', 'indiamart'];
  }, [product.name, product.category]);

  const renderPlatformIcon = (key: ShoppingPlatformKey) => {
    switch (key) {
      case 'bighaat':
        return <BigHaatIcon className="h-5 w-5 shrink-0" />;
      case 'agribegri':
        return <AgriBegriIcon className="h-5 w-5 shrink-0" />;
      case 'iffcobazar':
        return <IffcoIcon className="h-5 w-5 shrink-0" />;
      case 'amazon':
        return <AmazonIcon className="h-5 w-5 shrink-0" />;
      case 'indiamart':
        return <IndiaMartIcon className="h-5 w-5 shrink-0" />;
      case 'flipkart':
        return <FlipkartIcon className="h-5 w-5 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-lg hover:border-green-300">
      {/* Product Image & Badges */}
      <div className="relative w-full h-48 bg-emerald-50/50 overflow-hidden group">
        {!isBroken ? (
          <img
            src={currentImg}
            alt={product.name}
            onError={handleImgError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-linear-to-br from-emerald-50 to-green-100/60">
            <span className="text-3xl mb-1">
              {product.category === ProductCategory.Seeds ? '🌾' : product.category === ProductCategory.Fertilizers ? '🧪' : product.category === ProductCategory.Tools ? '🛠️' : '💧'}
            </span>
            <span className="text-xs font-semibold text-emerald-950 line-clamp-1">{product.name}</span>
            <span className="text-[10px] text-emerald-700">{product.brand || 'Verified Agri Supplier'}</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white font-semibold text-xs px-2.5 py-1 rounded-full shadow flex items-center gap-1">
            <Percent className="w-3 h-3" />
            <span>{discountPercent}% OFF</span>
          </div>
        )}

        {/* Farmer Verified Badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-green-800 border border-green-200 font-medium text-[11px] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span>Agri-Grade</span>
        </div>

        {/* Category Pill at bottom of image */}
        <div className="absolute bottom-2 left-2.5 bg-gray-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-0.5 rounded-md font-medium">
          {product.category}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand & Unit */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="font-semibold text-green-800 uppercase tracking-wider">
            {product.brand || 'Verified Agri Provider'}
          </span>
          {product.unit && <span>{product.unit}</span>}
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug mb-1"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description snippet */}
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center gap-0.5 bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-1.5 py-0.5 rounded">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{product.rating || 4.8}</span>
          </div>
          <span className="text-gray-400">
            ({product.reviewsCount || 150}+ farmer reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-green-700 font-bold text-2xl tracking-tight">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formattedOriginalPrice}
            </span>
          )}
          {product.inStock !== false && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-auto">
              In Stock
            </span>
          )}
        </div>

        {/* Auto-Upgrade Banner */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-lg p-2.5 mb-3 flex items-center gap-2 text-xs text-emerald-900">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="flex-1 text-[11px] leading-tight">
            <span className="font-semibold">Auto-Upgraded Links:</span> Verified agri
            sellers, direct delivery & bulk mandi quotes.
          </div>
        </div>

        {/* Primary Recommended Store Buttons */}
        <div className="space-y-2 mt-auto">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {t.shopOnlineTitle || 'Auto-Upgraded Stores'}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {primaryKeys.map((key) => {
              const info = SHOPPING_PLATFORMS[key];
              return (
                <button
                  key={key}
                  onClick={(e) => openPlatformLink(key, e)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all hover:scale-[1.02] active:scale-95 shadow-2xs ${info.badgeBg} ${info.badgeText}`}
                  title={`Open on ${info.name}: ${info.tagline}`}
                >
                  <div className="flex items-center justify-center h-6 mb-1">
                    {renderPlatformIcon(key)}
                  </div>
                  <span className="text-[11px] font-semibold leading-none truncate max-w-full">
                    {info.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Toggle All 6 Stores Drawer */}
          <button
            onClick={() => setShowAllPlatforms(!showAllPlatforms)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <span>{t.compareStores || 'Compare All 6 Stores'}</span>
              <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded-full font-semibold">
                Best Rates
              </span>
            </span>
            {showAllPlatforms ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Expanded All 6 Stores Panel */}
          {showAllPlatforms && (
            <div className="pt-2 pb-1 space-y-1.5 border-t border-gray-100 animate-in fade-in duration-200">
              {(Object.keys(SHOPPING_PLATFORMS) as ShoppingPlatformKey[]).map((key) => {
                const info = SHOPPING_PLATFORMS[key];
                const isCopied = copiedKey === key;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {renderPlatformIcon(key)}
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 truncate">
                          {info.name}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {info.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        onClick={(e) => handleCopyLink(key, e)}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors"
                        title={isCopied ? 'Link Copied' : 'Copy Upgraded Link'}
                      >
                        {isCopied ? (
                          <span className="text-[10px] font-bold text-green-600">
                            ✓
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => openPlatformLink(key, e)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-medium px-2 py-1 rounded text-[11px] transition-colors"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
