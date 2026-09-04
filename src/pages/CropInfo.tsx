import { useState, useMemo } from 'react';
import { Search, Sprout, Calendar, Droplets, Thermometer, Ruler, TrendingUp, X } from 'lucide-react';
import { crops, type Crop } from '@/data/demoData';

const categories: ('All' | Crop['category'])[] = ['All', 'Cereal', 'Vegetable', 'Fruit', 'Pulse', 'Oilseed', 'Cash Crop'];
const seasons: ('All' | Crop['season'])[] = ['All', 'Kharif', 'Rabi', 'Zaid', 'All Season'];

export default function CropInfo() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<typeof categories[number]>('All');
  const [season, setSeason] = useState<typeof seasons[number]>('All');
  const [selected, setSelected] = useState<Crop | null>(null);

  const filtered = useMemo(() => {
    return crops.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || c.category === category;
      const matchSeason = season === 'All' || c.season === season;
      return matchSearch && matchCat && matchSeason;
    });
  }, [search, category, season]);

  const resetFilters = () => {
    setSearch(''); setCategory('All'); setSeason('All');
  };

  const waterColor = (w: string) => w === 'Low' ? 'text-sky-600 bg-sky-50' : w === 'Medium' ? 'text-blue-600 bg-blue-50' : 'text-indigo-600 bg-indigo-50';

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-agri-700 to-agri-900 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-agri-200 mb-3"><Sprout className="w-3.5 h-3.5" /> Crop Information</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Crop Knowledge Library</h1>
          <p className="text-agri-100 max-w-xl">Browse detailed guides on crops — growing season, water requirements, soil type, expected yield, and more.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops by name (e.g., rice, wheat, tomato)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field !pl-12"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      category === c ? 'bg-agri-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Season</label>
              <div className="flex flex-wrap gap-2">
                {seasons.map(s => (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      season === s ? 'bg-agri-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {(search || category !== 'All' || season !== 'All') && (
            <button onClick={resetFilters} className="mt-4 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
              <X className="w-4 h-4" /> Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> {filtered.length === 1 ? 'crop' : 'crops'}
        </p>

        {/* Crop Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Sprout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No crops found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(crop => (
              <div key={crop.id} className="card overflow-hidden group cursor-pointer" onClick={() => setSelected(crop)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 badge bg-white/90 backdrop-blur-sm text-agri-700">{crop.category}</div>
                  <div className="absolute top-3 right-3 badge bg-agri-600/90 text-white">{crop.season}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2 group-hover:text-agri-700 transition-colors">{crop.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{crop.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-gray-500"><Calendar className="w-3.5 h-3.5 text-agri-500" /> {crop.duration}</div>
                    <div className="flex items-center gap-1.5 text-gray-500"><TrendingUp className="w-3.5 h-3.5 text-agri-500" /> {crop.yield}</div>
                    <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium ${waterColor(crop.water)}`}><Droplets className="w-3.5 h-3.5" /> {crop.water} water</div>
                    <div className="flex items-center gap-1.5 text-gray-500"><Thermometer className="w-3.5 h-3.5 text-agri-500" /> {crop.temperature}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-56">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="badge bg-white/90 text-agri-700">{selected.category}</span>
                <span className="badge bg-agri-600 text-white">{selected.season}</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">{selected.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{selected.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Growing Season', value: selected.season, icon: Calendar },
                  { label: 'Duration', value: selected.duration, icon: Ruler },
                  { label: 'Expected Yield', value: selected.yield, icon: TrendingUp },
                  { label: 'Water Requirement', value: selected.water, icon: Droplets },
                  { label: 'Ideal Soil', value: selected.soil, icon: Sprout },
                  { label: 'Temperature', value: selected.temperature, icon: Thermometer },
                ].map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-agri-600 mb-1">
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">{d.label}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">{d.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
