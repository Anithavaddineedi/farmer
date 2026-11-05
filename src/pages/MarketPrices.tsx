import { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, MapPin, X, ArrowUpDown } from 'lucide-react';
import { marketPrices } from '@/data/demoData';

const states = ['All', 'Maharashtra', 'Punjab', 'Karnataka', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Telangana'];
const trends = ['All', 'up', 'down', 'stable'] as const;

export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('All');
  const [trend, setTrend] = useState<typeof trends[number]>('All');
  const [sortBy, setSortBy] = useState<'price' | 'change'>('price');

  const filtered = useMemo(() => {
    let result = marketPrices.filter(p => {
      const matchSearch = p.crop.toLowerCase().includes(search.toLowerCase()) || p.market.toLowerCase().includes(search.toLowerCase());
      const matchState = state === 'All' || p.state === state;
      const matchTrend = trend === 'All' || p.trend === trend;
      return matchSearch && matchState && matchTrend;
    });
    result = [...result].sort((a, b) => sortBy === 'price' ? b.price - a.price : Math.abs(b.change) - Math.abs(a.change));
    return result;
  }, [search, state, trend, sortBy]);

  const reset = () => { setSearch(''); setState('All'); setTrend('All'); setSortBy('price'); };

  const trendIcon = (t: string) => {
    if (t === 'up') return <TrendingUp className="w-4 h-4 text-agri-600" />;
    if (t === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-sky-600 to-sky-900 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-sky-100 mb-3"><TrendingUp className="w-3.5 h-3.5" /> Market Prices</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Live Mandi Prices</h1>
          <p className="text-sky-100 max-w-xl">Check the latest crop prices across major agricultural markets in India. Updated daily.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by crop name or market..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field !pl-12"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">State</label>
              <select value={state} onChange={e => setState(e.target.value)} className="input-field !py-2 cursor-pointer">
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Trend</label>
              <div className="flex gap-2">
                {trends.map(t => (
                  <button key={t} onClick={() => setTrend(t)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                    trend === t ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Sort by</label>
              <div className="flex gap-2">
                <button onClick={() => setSortBy('price')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${sortBy === 'price' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <ArrowUpDown className="w-3.5 h-3.5" /> Price
                </button>
                <button onClick={() => setSortBy('change')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${sortBy === 'change' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <ArrowUpDown className="w-3.5 h-3.5" /> Change
                </button>
              </div>
            </div>
          </div>
          {(search || state !== 'All' || trend !== 'All') && (
            <button onClick={reset} className="mt-4 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
              <X className="w-4 h-4" /> Clear filters
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing <span className="font-semibold text-gray-700">{filtered.length}</span> price entries</p>

        {/* Price Table - Desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Crop</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Market</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">State</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Price (₹)</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Trend</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-agri-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{p.crop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.market}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" />{p.state}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-display font-bold text-gray-900">₹{p.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 block">{p.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      p.trend === 'up' ? 'bg-agri-100 text-agri-700' : p.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {trendIcon(p.trend)}
                      {p.change > 0 ? '+' : ''}{p.change}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-400">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{p.crop}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{p.market}, {p.state}</p>
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                  p.trend === 'up' ? 'bg-agri-100 text-agri-700' : p.trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                }`}>{trendIcon(p.trend)}{p.change > 0 ? '+' : ''}{p.change}%</div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-display font-bold text-agri-700">₹{p.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal ml-1">{p.unit}</span></span>
                <span className="text-xs text-gray-400">{p.date}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No prices found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
