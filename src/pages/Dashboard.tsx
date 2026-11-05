import { Sprout, MapPin, TrendingUp, ListChecks, Wheat, Cherry, Flower, Cloud, Calendar, Bell, CheckCircle2, Circle, ArrowRight, Droplets, Sun } from 'lucide-react';
import { dashboardStats, dashboardCrops, dashboardTasks, marketPrices, weatherForecast, images } from '@/data/demoData';
import type { PageId } from '@/components/navigation';

type DashboardProps = { onNavigate: (page: PageId) => void };

const iconMap: Record<string, typeof Sprout> = {
  sprout: Sprout, 'map-pin': MapPin, 'trending-up': TrendingUp, 'list-checks': ListChecks,
  wheat: Wheat, cherry: Cherry, flower: Flower,
};

const colorMap: Record<string, string> = {
  agri: 'bg-agri-100 text-agri-700',
  sky: 'bg-sky-100 text-sky-700',
  earth: 'bg-earth-100 text-earth-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const todayWeather = weatherForecast[0];
  const topPrices = marketPrices.slice(0, 4);
  const pendingTasks = dashboardTasks.filter(t => !t.done);

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-agri-700 to-agri-900">
        <img src={images.harvest} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative container-app px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-1">Welcome back, Ramesh!</h1>
              <p className="text-agri-100 text-sm">Nashik, Maharashtra · Last login: 02 Sep 2026, 8:30 AM</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                <Cloud className="w-6 h-6 text-agri-200" />
                <div>
                  <p className="text-white font-semibold text-lg leading-none">{todayWeather.temp}°C</p>
                  <p className="text-agri-200 text-xs mt-0.5">{todayWeather.condition}</p>
                </div>
              </div>
              <button className="relative w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((s, i) => {
            const Icon = iconMap[s.icon] || Sprout;
            return (
              <div key={i} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</p>
                <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Crops */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-gray-900">My Crops</h2>
              <button onClick={() => onNavigate('crops')} className="text-sm text-agri-600 font-semibold hover:text-agri-700 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {dashboardCrops.map((c, i) => {
                const Icon = iconMap[c.icon] || Sprout;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-agri-50/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-agri-100 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-agri-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{c.name}</h3>
                        <span className="text-xs text-gray-400 shrink-0">{c.area}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Sprout className="w-3 h-3" /> {c.stage}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Harvest: {c.harvest}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-agri-400 to-agri-600 rounded-full transition-all duration-700" style={{ width: `${c.health}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-agri-700">{c.health}% healthy</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks + Weather */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-gray-900">Tasks</h2>
                <span className="badge bg-amber-100 text-amber-700">{pendingTasks.length} pending</span>
              </div>
              <div className="space-y-3">
                {dashboardTasks.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {t.done ? <CheckCircle2 className="w-5 h-5 text-agri-500 mt-0.5 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 mt-0.5 shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm ${t.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{t.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{t.due}</span>
                        <span className={`badge px-2 py-0.5 text-[10px] ${
                          t.priority === 'High' ? 'bg-red-100 text-red-600' :
                          t.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>{t.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-sky-400 to-sky-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-white">Weather Today</h2>
                <Sun className="w-6 h-6 text-white/80" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-4xl font-display font-bold">{todayWeather.temp}°C</p>
                <div className="text-sm">
                  <p className="font-medium">{todayWeather.condition}</p>
                  <p className="text-white/80">Low {todayWeather.low}°C</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/10 rounded-lg py-2"><Droplets className="w-4 h-4 mx-auto mb-1 text-white/80" />{todayWeather.humidity}%</div>
                <div className="bg-white/10 rounded-lg py-2"><Cloud className="w-4 h-4 mx-auto mb-1 text-white/80" />{todayWeather.rain}% rain</div>
                <div className="bg-white/10 rounded-lg py-2">💨 {todayWeather.wind} km/h</div>
              </div>
              <button onClick={() => onNavigate('weather')} className="w-full mt-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-medium transition-colors">
                7-day forecast →
              </button>
            </div>
          </div>
        </div>

        {/* Market Prices Preview */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-display font-bold text-gray-900">Today's Market Prices</h2>
            <button onClick={() => onNavigate('market')} className="text-sm text-agri-600 font-semibold hover:text-agri-700 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topPrices.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-gray-100 hover:border-agri-200 hover:shadow-soft transition-all">
                <p className="font-semibold text-gray-900 text-sm mb-1">{p.crop}</p>
                <p className="text-xs text-gray-400 mb-2">{p.market}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-display font-bold text-agri-700">₹{p.price}</span>
                  <span className={`badge px-2 py-0.5 text-[10px] ${
                    p.trend === 'up' ? 'bg-agri-100 text-agri-700' :
                    p.trend === 'down' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {p.trend === 'up' ? '↑' : p.trend === 'down' ? '↓' : '→'} {p.change > 0 ? '+' : ''}{p.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
