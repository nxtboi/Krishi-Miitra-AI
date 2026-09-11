export interface HourlyWeather {
  time: string;
  hour: string;
  temp: number;
  rainProb: number;
  precipitation: number;
  weatherCode: number;
}

export interface DailyWeather {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  rainProbMax: number;
  weatherCode: number;
}

export interface FarmingAdvisory {
  status: 'good' | 'warning' | 'alert' | 'info';
  title: string;
  advice: string;
  sprayingRecommendation: string;
  irrigationRecommendation: string;
}

export interface WeatherData {
  regionName: string;
  subRegion?: string;
  latitude: number;
  longitude: number;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  todayMaxRainProbability: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  lastUpdated: string;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  advisory: FarmingAdvisory;
  isGps: boolean;
}

export interface LocationSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
}

// Popular farming districts across Indian agricultural belts as fallback & quick select
export const DEFAULT_FARM_LOCATIONS = [
  { name: 'Ludhiana, Punjab', latitude: 30.9010, longitude: 75.8573, state: 'Punjab' },
  { name: 'Karnal, Haryana', latitude: 29.6857, longitude: 76.9905, state: 'Haryana' },
  { name: 'Indore, Madhya Pradesh', latitude: 22.7196, longitude: 75.8577, state: 'Madhya Pradesh' },
  { name: 'Pune, Maharashtra', latitude: 18.5204, longitude: 73.8567, state: 'Maharashtra' },
  { name: 'Varanasi, Uttar Pradesh', latitude: 25.3176, longitude: 82.9739, state: 'Uttar Pradesh' },
  { name: 'Guntur, Andhra Pradesh', latitude: 16.3067, longitude: 80.4365, state: 'Andhra Pradesh' },
  { name: 'Jaipur, Rajasthan', latitude: 26.9124, longitude: 75.7873, state: 'Rajasthan' },
  { name: 'Patna, Bihar', latitude: 25.5941, longitude: 85.1376, state: 'Bihar' },
  { name: 'Bengaluru Rural, Karnataka', latitude: 13.2325, longitude: 77.5815, state: 'Karnataka' },
  { name: 'Bardhaman, West Bengal', latitude: 23.2324, longitude: 87.8615, state: 'West Bengal' },
];

export const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0: return 'Clear Sky';
    case 1: return 'Mainly Clear';
    case 2: return 'Partly Cloudy';
    case 3: return 'Overcast';
    case 45: return 'Foggy';
    case 48: return 'Depositing Rime Fog';
    case 51: return 'Light Drizzle';
    case 53: return 'Moderate Drizzle';
    case 55: return 'Dense Drizzle';
    case 56: case 57: return 'Freezing Drizzle';
    case 61: return 'Slight Rain';
    case 63: return 'Moderate Rain';
    case 65: return 'Heavy Rain';
    case 66: case 67: return 'Freezing Rain';
    case 71: return 'Slight Snow';
    case 73: return 'Moderate Snow';
    case 75: return 'Heavy Snow';
    case 77: return 'Snow Grains';
    case 80: return 'Slight Showers';
    case 81: return 'Moderate Showers';
    case 82: return 'Violent Rain Showers';
    case 85: case 86: return 'Snow Showers';
    case 95: return 'Thunderstorm';
    case 96: return 'Thunderstorm with Hail';
    case 99: return 'Severe Thunderstorm with Hail';
    default: return 'Fair';
  }
};

export const getFarmingAdvisory = (
  temp: number,
  humidity: number,
  rainProb: number,
  maxRainProbToday: number,
  windSpeed: number
): FarmingAdvisory => {
  const effectiveRain = Math.max(rainProb, maxRainProbToday);

  if (effectiveRain >= 60) {
    return {
      status: 'alert',
      title: 'High Rainfall Risk Ahead',
      advice: 'Strong likelihood of rain today. Avoid broadcasting chemical fertilizers and delay foliar pesticide sprays to prevent chemical runoff and wastage.',
      sprayingRecommendation: 'Postpone spraying until weather clears.',
      irrigationRecommendation: 'Suspend irrigation. Natural rain expected.',
    };
  }

  if (effectiveRain >= 35) {
    return {
      status: 'warning',
      title: 'Moderate Chance of Precipitation',
      advice: 'Rain showers are possible later in the day. Keep an eye on local cloud buildup before planning deep irrigation or chemical application.',
      sprayingRecommendation: 'Spray only if rain is not imminent in next 4 hours.',
      irrigationRecommendation: 'Reduce irrigation volume and check soil moisture.',
    };
  }

  if (humidity >= 85) {
    return {
      status: 'warning',
      title: 'High Humidity Alert',
      advice: 'High atmospheric moisture creates favorable conditions for fungal diseases (powdery mildew, blast, rust). Regularly inspect lower crop foliage.',
      sprayingRecommendation: 'Consider preventative biological fungicide if disease symptoms appear.',
      irrigationRecommendation: 'Avoid late afternoon watering to prevent water pooling on foliage.',
    };
  }

  if (temp >= 38) {
    return {
      status: 'alert',
      title: 'High Temperature / Heat Stress Alert',
      advice: 'Intense heat can trigger flower dropping and leaf scorching. Irrigate crops in early morning or evening hours to reduce evapotranspiration stress.',
      sprayingRecommendation: 'Never spray pesticides during peak afternoon heat.',
      irrigationRecommendation: 'Irrigate during cool morning or evening hours.',
    };
  }

  if (windSpeed >= 20) {
    return {
      status: 'warning',
      title: 'Breezy / High Wind Speed',
      advice: `Wind speed is currently ${windSpeed} km/h. Spray drift is likely to reduce pesticide/fertilizer effectiveness and affect non-target areas.`,
      sprayingRecommendation: 'Delay foliar spraying until wind drops below 15 km/h.',
      irrigationRecommendation: 'Standard irrigation is safe. Monitor sprinkler drift.',
    };
  }

  return {
    status: 'good',
    title: 'Optimal Farming Conditions',
    advice: 'Favorable temperature, stable humidity, and low rainfall probability. An ideal window for field preparation, sowing, fertilizing, or crop management.',
    sprayingRecommendation: 'Safe and effective conditions for pesticide/nutrient application.',
    irrigationRecommendation: 'Irrigate according to your standard crop schedule.',
  };
};

/**
 * Attempt to get device position via navigator.geolocation
 */
export const getDeviceCoordinates = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser or device.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please allow location access in your browser.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

/**
 * Reverse geocode coordinates to human-readable district/state
 */
export const reverseGeocodeCoordinates = async (
  latitude: number,
  longitude: number
): Promise<{ regionName: string; subRegion?: string }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
      {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const locality =
        addr.district ||
        addr.state_district ||
        addr.county ||
        addr.city ||
        addr.town ||
        addr.village ||
        addr.suburb;
      const state = addr.state || addr.country;

      if (locality && state) {
        return {
          regionName: `${locality}, ${state}`,
          subRegion: addr.country && addr.country !== state ? addr.country : undefined,
        };
      } else if (locality) {
        return { regionName: locality };
      } else if (data.display_name) {
        const parts = data.display_name.split(',').map((p: string) => p.trim());
        const display = parts.slice(0, 2).join(', ');
        return { regionName: display };
      }
    }
  } catch (err) {
    console.warn('Reverse geocoding request failed or timed out:', err);
  }

  // Fallback if reverse geocoding is unavailable
  return {
    regionName: `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`,
  };
};

/**
 * Search locations by text query using Open-Meteo geocoding
 */
export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query.trim()
      )}&count=5&language=en&format=json`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      admin1: r.admin1,
      country: r.country,
    }));
  } catch (e) {
    console.error('Failed to search locations:', e);
    return [];
  }
};

/**
 * Fetch complete real-time weather and agricultural metrics for specific coordinates
 */
export const fetchWeatherData = async (
  latitude: number,
  longitude: number,
  knownRegionName?: string,
  isGps: boolean = false
): Promise<WeatherData> => {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=3`;

  const [weatherRes, geoResult] = await Promise.all([
    fetch(weatherUrl),
    knownRegionName
      ? Promise.resolve({ regionName: knownRegionName, subRegion: undefined as string | undefined })
      : reverseGeocodeCoordinates(latitude, longitude),
  ]);

  if (!weatherRes.ok) {
    throw new Error(`Weather service returned status ${weatherRes.status}`);
  }

  const data = await weatherRes.json();
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  // Match current time in hourly arrays to extract live precipitation probability
  const currentTime = current?.time || new Date().toISOString().slice(0, 13);
  let currentHourIdx = 0;
  if (hourly?.time && Array.isArray(hourly.time)) {
    const prefix = currentTime.slice(0, 13); // e.g. "2026-09-11T21"
    const foundIdx = hourly.time.findIndex((t: string) => t.startsWith(prefix));
    if (foundIdx !== -1) {
      currentHourIdx = foundIdx;
    }
  }

  const rainProbCurrent =
    hourly?.precipitation_probability && hourly.precipitation_probability[currentHourIdx] !== undefined
      ? Number(hourly.precipitation_probability[currentHourIdx])
      : 0;

  const todayMaxRainProb =
    daily?.precipitation_probability_max && daily.precipitation_probability_max[0] !== undefined
      ? Number(daily.precipitation_probability_max[0])
      : rainProbCurrent;

  const temperature = Math.round((current?.temperature_2m ?? 0) * 10) / 10;
  const apparentTemperature = Math.round((current?.apparent_temperature ?? temperature) * 10) / 10;
  const humidity = Math.round(current?.relative_humidity_2m ?? 0);
  const precipitation = Math.round((current?.precipitation ?? 0) * 10) / 10;
  const windSpeed = Math.round((current?.wind_speed_10m ?? 0) * 10) / 10;
  const weatherCode = current?.weather_code ?? 0;
  const isDay = Boolean(current?.is_day ?? 1);

  // Format next 8 hourly intervals
  const formattedHourly: HourlyWeather[] = [];
  if (hourly?.time) {
    const startIdx = Math.max(0, currentHourIdx);
    const endIdx = Math.min(hourly.time.length, startIdx + 8);
    for (let i = startIdx; i < endIdx; i++) {
      const timeStr = hourly.time[i];
      const hourPart = timeStr.includes('T') ? timeStr.split('T')[1].slice(0, 5) : timeStr;
      formattedHourly.push({
        time: timeStr,
        hour: hourPart,
        temp: Math.round(hourly.temperature_2m[i]),
        rainProb: Math.round(hourly.precipitation_probability?.[i] ?? 0),
        precipitation: Math.round((hourly.precipitation?.[i] ?? 0) * 10) / 10,
        weatherCode: hourly.weather_code[i] ?? 0,
      });
    }
  }

  // Format daily forecasts (up to 3 days)
  const formattedDaily: DailyWeather[] = [];
  if (daily?.time) {
    const daysCount = Math.min(daily.time.length, 3);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < daysCount; i++) {
      const dateStr = daily.time[i];
      const dateObj = new Date(dateStr);
      const isToday = i === 0;
      const isTomorrow = i === 1;
      const dayName = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : dayNames[dateObj.getDay()];

      formattedDaily.push({
        date: dateStr,
        dayName,
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        rainProbMax: Math.round(daily.precipitation_probability_max?.[i] ?? 0),
        weatherCode: daily.weather_code[i] ?? 0,
      });
    }
  }

  const advisory = getFarmingAdvisory(
    temperature,
    humidity,
    rainProbCurrent,
    todayMaxRainProb,
    windSpeed
  );

  return {
    regionName: geoResult.regionName,
    subRegion: geoResult.subRegion,
    latitude,
    longitude,
    temperature,
    apparentTemperature,
    humidity,
    precipitationProbability: rainProbCurrent,
    todayMaxRainProbability: todayMaxRainProb,
    precipitation,
    windSpeed,
    weatherCode,
    weatherDescription: getWeatherDescription(weatherCode),
    isDay,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hourly: formattedHourly,
    daily: formattedDaily,
    advisory,
    isGps,
  };
};
