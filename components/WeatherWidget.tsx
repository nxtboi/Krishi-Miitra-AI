import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Droplets,
  Thermometer,
  Wind,
  Navigation,
  MapPin,
  RefreshCw,
  Search,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Umbrella,
  X,
  Sparkles,
} from 'lucide-react';
import {
  WeatherData,
  DEFAULT_FARM_LOCATIONS,
  getDeviceCoordinates,
  fetchWeatherData,
  searchLocations,
  LocationSearchResult,
} from '../services/weatherService';
import { weatherTranslations } from '../services/weatherTranslations';
import { LanguageCode, User } from '../types';

interface WeatherWidgetProps {
  user?: User;
  language: LanguageCode;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ user, language }) => {
  const t = weatherTranslations[language] || weatherTranslations.en;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [lastCoords, setLastCoords] = useState<{ lat: number; lon: number; name?: string; isGps: boolean } | null>(null);

  const searchTimeoutRef = useRef<any>(null);

  // Initialize weather using device geolocation or fallback
  const loadWeatherFromGps = useCallback(async (isManualTrigger: boolean = false) => {
    if (isManualTrigger) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage(null);

    try {
      // 1. Try to get device coordinates
      const coords = await getDeviceCoordinates();
      const data = await fetchWeatherData(coords.latitude, coords.longitude, undefined, true);
      setWeather(data);
      setLastCoords({ lat: coords.latitude, lon: coords.longitude, isGps: true });
      setShowLocationPicker(false);
    } catch (err: any) {
      console.warn('Geolocation failed or blocked:', err.message);

      // 2. Fallback to user profile's district/state or primary agricultural hub (Ludhiana/Karnal)
      let fallbackName = 'Ludhiana, Punjab';
      let fallbackLat = 30.9010;
      let fallbackLon = 75.8573;

      if (user?.district && user?.state) {
        fallbackName = `${user.district}, ${user.state}`;
      } else if (user?.district) {
        fallbackName = user.district;
      }

      // If user profile has custom district, search for it
      try {
        if (user?.district) {
          const results = await searchLocations(user.district);
          if (results.length > 0) {
            fallbackLat = results[0].latitude;
            fallbackLon = results[0].longitude;
            fallbackName = `${results[0].name}, ${results[0].admin1 || 'India'}`;
          }
        }
      } catch {
        // use default fallback
      }

      try {
        const fallbackData = await fetchWeatherData(fallbackLat, fallbackLon, fallbackName, false);
        setWeather(fallbackData);
        setLastCoords({ lat: fallbackLat, lon: fallbackLon, name: fallbackName, isGps: false });
        if (isManualTrigger) {
          setErrorMessage(err.message || t.errorGps);
        }
      } catch (fetchErr: any) {
        setErrorMessage('Unable to load weather data at this moment.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?.district, user?.state, t.errorGps]);

  // Load on initial mount
  useEffect(() => {
    loadWeatherFromGps(false);
  }, [loadWeatherFromGps]);

  // Handle explicit refresh
  const handleRefresh = async () => {
    if (!lastCoords) {
      loadWeatherFromGps(true);
      return;
    }
    setIsRefreshing(true);
    try {
      const data = await fetchWeatherData(
        lastCoords.lat,
        lastCoords.lon,
        lastCoords.name,
        lastCoords.isGps
      );
      setWeather(data);
    } catch (e: any) {
      console.error('Refresh failed', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Select a preset region or search result
  const handleSelectLocation = async (lat: number, lon: number, name: string) => {
    setIsRefreshing(true);
    setShowLocationPicker(false);
    setSearchQuery('');
    setSearchResults([]);
    setErrorMessage(null);
    try {
      const data = await fetchWeatherData(lat, lon, name, false);
      setWeather(data);
      setLastCoords({ lat, lon, name, isGps: false });
    } catch (err) {
      setErrorMessage('Failed to fetch weather for selected location.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Debounced search for locations
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (val.trim().length >= 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchLocations(val);
        setSearchResults(results);
        setIsSearching(false);
      }, 400);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Weather icon selector
  const renderWeatherIcon = (code: number, isDay: boolean = true, className: string = 'w-8 h-8') => {
    if (code === 0) {
      return <Sun className={`${className} text-amber-500 animate-pulse`} />;
    }
    if (code === 1 || code === 2) {
      return <CloudSun className={`${className} text-amber-500`} />;
    }
    if (code === 3) {
      return <Cloud className={`${className} text-gray-400`} />;
    }
    if (code === 45 || code === 48) {
      return <CloudFog className={`${className} text-slate-400`} />;
    }
    if (code >= 51 && code <= 57) {
      return <CloudDrizzle className={`${className} text-sky-500`} />;
    }
    if (code >= 61 && code <= 82) {
      return <CloudRain className={`${className} text-blue-600`} />;
    }
    if (code >= 95) {
      return <CloudLightning className={`${className} text-purple-600`} />;
    }
    return <Sun className={`${className} text-amber-500`} />;
  };

  // Advisory color styling
  const getAdvisoryBadge = (status: 'good' | 'warning' | 'alert' | 'info') => {
    switch (status) {
      case 'good':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
          dot: 'bg-emerald-500',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />,
          dot: 'bg-amber-500',
        };
      case 'alert':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />,
          dot: 'bg-rose-500',
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />,
          dot: 'bg-blue-500',
        };
    }
  };

  if (isLoading && !weather) {
    return (
      <div
        id="weather-widget-loading"
        className="w-full bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mt-6 animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-200 rounded-full"></div>
            <div>
              <div className="h-5 w-36 bg-stone-200 rounded"></div>
              <div className="h-3 w-24 bg-stone-100 rounded mt-2"></div>
            </div>
          </div>
          <div className="h-8 w-24 bg-stone-200 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="h-16 bg-stone-100 rounded-xl"></div>
          <div className="h-16 bg-stone-100 rounded-xl"></div>
          <div className="h-16 bg-stone-100 rounded-xl"></div>
          <div className="h-16 bg-stone-100 rounded-xl"></div>
        </div>
        <p className="text-xs text-stone-400 text-center mt-4">{t.loading}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        id="weather-widget-error"
        className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-5 mt-6 text-stone-700"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span className="font-semibold text-rose-900">{t.title}</span>
          </div>
          <button
            id="weather-retry-btn"
            onClick={() => loadWeatherFromGps(true)}
            className="text-xs bg-white border border-rose-300 text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-100 font-medium transition-colors"
          >
            {t.refresh}
          </button>
        </div>
        <p className="text-xs text-rose-700 mt-2">
          {errorMessage || 'Unable to connect to live weather service.'}
        </p>
      </div>
    );
  }

  const advisoryTheme = getAdvisoryBadge(weather.advisory.status);

  return (
    <div
      id="live-weather-widget"
      className="w-full bg-gradient-to-br from-white via-stone-50 to-emerald-50/40 rounded-2xl shadow-md border border-stone-200 mt-6 overflow-hidden transition-all duration-300"
    >
      {/* Top Bar: Location Header, GPS indicator, Refresh */}
      <div className="p-4 md:p-6 pb-3 border-b border-stone-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl flex-shrink-0 shadow-inner">
              {renderWeatherIcon(weather.weatherCode, weather.isDay, 'w-6 h-6 md:w-7 md:h-7')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="weather-location-name" className="text-base md:text-xl font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{weather.regionName}</span>
                </h2>
                {weather.isGps ? (
                  <span
                    id="gps-active-badge"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300"
                    title="Real-time coordinates from device GPS"
                  >
                    <Navigation className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                    GPS
                  </span>
                ) : (
                  <button
                    id="weather-enable-gps-btn"
                    onClick={() => loadWeatherFromGps(true)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 transition-colors"
                    title="Click to detect exact GPS location from your device"
                  >
                    <Navigation className="w-3 h-3" />
                    {t.detectLocation}
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                <span>{weather.weatherDescription}</span>
                <span>•</span>
                <span>{t.updatedAt}: {weather.lastUpdated}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              id="weather-change-location-btn"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              title="Search or change farming region"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Region</span>
            </button>
            <button
              id="weather-refresh-btn"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-stone-200 bg-white transition-all shadow-sm disabled:opacity-60"
              aria-label={t.refresh}
              title={t.refresh}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Optional error notification banner */}
        {errorMessage && (
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-stone-400 hover:text-stone-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Location Picker / Search Drawer */}
        {showLocationPicker && (
          <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  id="weather-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="p-1.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Results */}
            {isSearching && (
              <p className="text-[11px] text-stone-500 py-1">Searching regions...</p>
            )}
            {searchResults.length > 0 && (
              <div className="space-y-1 mb-2 max-h-36 overflow-y-auto">
                {searchResults.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() =>
                      handleSelectLocation(
                        loc.latitude,
                        loc.longitude,
                        `${loc.name}${loc.admin1 ? ', ' + loc.admin1 : ''}`
                      )
                    }
                    className="w-full text-left px-2 py-1 text-xs hover:bg-emerald-50 hover:text-emerald-900 rounded flex items-center justify-between"
                  >
                    <span className="font-medium">{loc.name}</span>
                    <span className="text-[11px] text-stone-400">{loc.admin1 || loc.country}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick Presets */}
            <div className="pt-2 border-t border-stone-200">
              <p className="text-[11px] font-semibold text-stone-500 mb-1.5 uppercase tracking-wider">
                {t.usePreset}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => loadWeatherFromGps(true)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center gap-1 shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  {t.detectLocation}
                </button>
                {DEFAULT_FARM_LOCATIONS.slice(0, 6).map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectLocation(loc.latitude, loc.longitude, loc.name)}
                    className="px-2 py-1 text-[11px] bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 rounded-md transition-colors"
                  >
                    {loc.name.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Metrics Grid: Temperature, Humidity, Rainfall Probability */}
      <div className="p-4 md:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Metric 1: Current Temperature */}
        <div
          id="metric-temperature"
          className="bg-white p-3.5 md:p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-colors"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.currentTemp}</span>
            <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-800 tracking-tight">
              {weather.temperature}°C
            </span>
            <span className="text-[11px] text-stone-400">
              {t.feelsLike} {weather.apparentTemperature}°
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-stone-500 border-t border-stone-100 pt-1.5">
            <span>{weather.weatherDescription}</span>
          </div>
        </div>

        {/* Metric 2: Air Humidity */}
        <div
          id="metric-humidity"
          className="bg-white p-3.5 md:p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-sky-300 transition-colors"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.humidity}</span>
            <div className="p-1.5 bg-sky-50 rounded-lg text-sky-600">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-800 tracking-tight">
              {weather.humidity}%
            </span>
            <span
              className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                weather.humidity > 80
                  ? 'bg-amber-100 text-amber-800'
                  : weather.humidity < 40
                  ? 'bg-rose-50 text-rose-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {weather.humidity > 80 ? 'High' : weather.humidity < 40 ? 'Dry' : 'Normal'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 border-t border-stone-100 pt-1.5 flex items-center justify-between">
            <span>{t.windSpeed}</span>
            <span className="font-semibold text-stone-700">{weather.windSpeed} km/h</span>
          </div>
        </div>

        {/* Metric 3: Live Rainfall Probability */}
        <div
          id="metric-rainfall-probability"
          className="bg-white p-3.5 md:p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.rainProbability}</span>
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <Umbrella className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span
              className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                weather.precipitationProbability >= 50
                  ? 'text-blue-700'
                  : weather.precipitationProbability >= 20
                  ? 'text-amber-700'
                  : 'text-stone-800'
              }`}
            >
              {weather.precipitationProbability}%
            </span>
            <span className="text-[11px] text-stone-400">Current hour</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 border-t border-stone-100 pt-1.5 flex items-center justify-between">
            <span>{t.todayPeakRain}</span>
            <span
              className={`font-semibold ${
                weather.todayMaxRainProbability >= 60
                  ? 'text-blue-700'
                  : weather.todayMaxRainProbability >= 30
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }`}
            >
              {weather.todayMaxRainProbability}%
            </span>
          </div>
        </div>

        {/* Metric 4: Precipitation & Rain Status */}
        <div
          id="metric-precipitation"
          className="bg-white p-3.5 md:p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.precipitation}</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-700">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-800 tracking-tight">
              {weather.precipitation}
            </span>
            <span className="text-xs text-stone-500 font-medium">mm</span>
          </div>
          <div className="mt-2 text-[11px] text-stone-500 border-t border-stone-100 pt-1.5 flex items-center justify-between">
            <span>Spraying status</span>
            <span
              className={`font-semibold ${
                weather.precipitationProbability > 40 || weather.windSpeed > 20
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }`}
            >
              {weather.precipitationProbability > 40
                ? 'Delay Spray'
                : weather.windSpeed > 20
                ? 'Windy'
                : 'Favorable'}
            </span>
          </div>
        </div>
      </div>

      {/* Farming Advisory Box */}
      <div className="px-4 md:px-6 pb-4">
        <div
          id="weather-farming-advisory"
          className={`p-3.5 md:p-4 rounded-xl border ${advisoryTheme.bg} flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm`}
        >
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5">{advisoryTheme.icon}</div>
            <div>
              <h3 className="text-xs md:text-sm font-bold flex items-center gap-1.5">
                <span>{t.farmingAdvisory}: {weather.advisory.title}</span>
              </h3>
              <p className="text-xs mt-1 leading-relaxed opacity-95">
                {weather.advisory.advice}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px]">
                <span className="font-semibold bg-white/70 px-2 py-0.5 rounded border border-current/20">
                  🌱 {weather.advisory.sprayingRecommendation}
                </span>
                <span className="font-semibold bg-white/70 px-2 py-0.5 rounded border border-current/20">
                  💧 {weather.advisory.irrigationRecommendation}
                </span>
              </div>
            </div>
          </div>

          <button
            id="weather-toggle-details-btn"
            onClick={() => setShowDetails(!showDetails)}
            className="flex-shrink-0 self-end md:self-center px-3 py-1.5 text-xs font-semibold bg-white rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-sm flex items-center gap-1 transition-colors"
          >
            <span>{showDetails ? t.hideDetails : t.viewDetails}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Forecast Drawer: Hourly and 3-Day Forecast */}
      {showDetails && (
        <div id="weather-expanded-forecast" className="p-4 md:p-6 pt-0 border-t border-stone-200/60 bg-white/70 animate-fade-in">
          {/* Upcoming Hourly Forecast */}
          <div className="mt-4">
            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {t.hourlyForecast}
            </h4>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {weather.hourly.map((hour, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-20 bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-center flex flex-col items-center justify-between shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <span className="text-[11px] font-semibold text-stone-500">{hour.hour}</span>
                  <div className="my-1.5">
                    {renderWeatherIcon(hour.weatherCode, true, 'w-6 h-6')}
                  </div>
                  <span className="text-sm font-bold text-stone-800">{hour.temp}°C</span>
                  <div className="mt-1 flex items-center gap-0.5 text-[10px] text-blue-600 font-medium">
                    <Umbrella className="w-3 h-3" />
                    <span>{hour.rainProb}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Day Daily Forecast */}
          <div className="mt-4 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              {t.dailyForecast}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {weather.daily.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    {renderWeatherIcon(day.weatherCode, true, 'w-6 h-6')}
                    <div>
                      <p className="text-xs font-bold text-stone-800">{day.dayName}</p>
                      <p className="text-[11px] text-stone-500">{day.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-stone-800">
                      {day.maxTemp}° <span className="text-stone-400 font-normal">/ {day.minTemp}°</span>
                    </p>
                    <p className="text-[10px] text-blue-600 font-medium flex items-center justify-end gap-0.5">
                      <Umbrella className="w-2.5 h-2.5" />
                      {day.rainProbMax}% rain
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
