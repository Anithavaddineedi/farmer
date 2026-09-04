import { Cloud, CloudRain, CloudLightning, Sun, Droplets, Wind, Thermometer, MapPin, Calendar, AlertTriangle, Sprout } from 'lucide-react';
import { weatherForecast } from '@/data/demoData';

const iconMap: Record<string, typeof Cloud> = {
  'cloud-sun': Cloud, 'cloud-rain': CloudRain, 'cloud-lightning': CloudLightning, 'sun': Sun, 'cloud': Cloud,
};

const conditionColor: Record<string, string> = {
  'Sunny': 'from-amber-400 to-orange-500',
  'Partly Cloudy': 'from-sky-400 to-sky-600',
  'Light Rain': 'from-sky-500 to-blue-600',
  'Heavy Rain': 'from-blue-600 to-indigo-700',
  'Thunderstorm': 'from-indigo-700 to-purple-800',
};

const advisories = [
  { icon: 'rain', title: 'Heavy Rain Expected (Thu)', text: 'Heavy rainfall forecasted for Thursday. Secure your harvested produce and avoid spraying pesticides. Ensure proper drainage in rice fields.', level: 'warning' },
  { icon: 'sun', title: 'Favorable Sowing Window (Sat-Sun)', text: 'Sunny conditions expected this weekend — ideal for sowing Rabi crops like gram and mustard. Soil moisture from Thursday rain will be beneficial.', level: 'success' },
  { icon: 'wind', title: 'Strong Winds (Thu-Fri)', text: 'Wind speeds up to 25 km/h expected. Provide support to tall crops like sugarcane and banana. Delay any planned spraying activities.', level: 'warning' },
];

export default function Weather() {
  const today = weatherForecast[0];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-sky-600 to-blue-900 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-sky-100 mb-3"><Cloud className="w-3.5 h-3.5" /> Weather Information</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Weather Forecast & Advisory</h1>
          <p className="text-sky-100 max-w-xl">Plan your farming activities with accurate 7-day forecasts and tailored agricultural advisories.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Current Weather Hero */}
        <div className={`bg-gradient-to-br ${conditionColor[today.condition]} rounded-2xl p-6 sm:p-8 text-white shadow-lg`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/80 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Nashik, Maharashtra</span>
              </div>
              <div className="flex items-center gap-4">
                {(() => { const Icon = iconMap[today.icon] || Cloud; return <Icon className="w-16 h-16" />; })()}
                <div>
                  <p className="text-5xl font-display font-bold">{today.temp}°C</p>
                  <p className="text-lg text-white/90">{today.condition}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[120px]">
                <Thermometer className="w-5 h-5 text-white/80 mb-1" />
                <p className="text-xs text-white/70">Min Temp</p>
                <p className="text-lg font-semibold">{today.low}°C</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[120px]">
                <Droplets className="w-5 h-5 text-white/80 mb-1" />
                <p className="text-xs text-white/70">Humidity</p>
                <p className="text-lg font-semibold">{today.humidity}%</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[120px]">
                <CloudRain className="w-5 h-5 text-white/80 mb-1" />
                <p className="text-xs text-white/70">Rain Chance</p>
                <p className="text-lg font-semibold">{today.rain}%</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[120px]">
                <Wind className="w-5 h-5 text-white/80 mb-1" />
                <p className="text-xs text-white/70">Wind</p>
                <p className="text-lg font-semibold">{today.wind} km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-display font-bold text-gray-900">7-Day Forecast</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {weatherForecast.map((d, i) => {
              const Icon = iconMap[d.icon] || Cloud;
              return (
                <div key={i} className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${i === 0 ? 'bg-sky-50 ring-2 ring-sky-200' : 'bg-gray-50'}`}>
                  <p className="text-sm font-semibold text-gray-900">{i === 0 ? 'Today' : d.day}</p>
                  <p className="text-xs text-gray-400 mb-3">{d.date}</p>
                  <Icon className="w-8 h-8 mx-auto mb-3 text-sky-500" />
                  <p className="text-lg font-display font-bold text-gray-900">{d.temp}°</p>
                  <p className="text-xs text-gray-400">{d.low}°</p>
                  <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <span className="flex items-center justify-center gap-1"><CloudRain className="w-3 h-3" />{d.rain}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farming Advisories */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sprout className="w-5 h-5 text-agri-600" />
            <h2 className="text-lg font-display font-bold text-gray-900">Farming Advisories</h2>
          </div>
          <div className="space-y-4">
            {advisories.map((a, i) => (
              <div key={i} className={`rounded-xl p-4 flex items-start gap-4 ${
                a.level === 'warning' ? 'bg-amber-50 border border-amber-200' : 'bg-agri-50 border border-agri-200'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  a.level === 'warning' ? 'bg-amber-100' : 'bg-agri-100'
                }`}>
                  {a.level === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> : <Sprout className="w-5 h-5 text-agri-600" />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{a.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
