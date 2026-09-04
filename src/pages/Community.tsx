import { useState, useMemo } from 'react';
import { Users, Search, Heart, MessageSquare, Clock, Tag, Plus, TrendingUp, Filter } from 'lucide-react';
import { communityPosts, type CommunityPost } from '@/data/demoData';

const categories = ['All', 'Pest Control', 'Market Trends', 'Machinery', 'Crop Disease', 'Success Story'];

const avatarColors = ['bg-agri-600', 'bg-sky-600', 'bg-earth-600', 'bg-amber-600', 'bg-teal-600'];

export default function Community() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return communityPosts.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-lime-600 to-green-800 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-lime-100 mb-3"><Users className="w-3.5 h-3.5" /> Farmer Community</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Farmer Community Forum</h1>
          <p className="text-lime-100 max-w-xl">Share your experiences, ask questions, and learn from fellow farmers across India.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <button className="btn-primary w-full"><Plus className="w-4 h-4" /> Create a Post</button>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4"><Filter className="w-4 h-4 text-gray-400" /><h3 className="text-sm font-semibold text-gray-700">Categories</h3></div>
              <div className="space-y-1">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${category === c ? 'bg-agri-100 text-agri-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="card p-5 bg-gradient-to-br from-agri-600 to-agri-800 text-white">
              <TrendingUp className="w-6 h-6 mb-2 text-agri-200" />
              <h3 className="font-semibold text-white mb-1">Trending Topics</h3>
              <ul className="space-y-2 mt-3">
                {['#cotton-prices', '#drip-irrigation', '#tomato-pests', '#rice-blight', '#organic-farming'].map(t => (
                  <li key={t} className="text-sm text-agri-100 hover:text-white cursor-pointer transition-colors">{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search posts by title, content, or author..." value={search} onChange={e => setSearch(e.target.value)} className="input-field !pl-12" />
            </div>

            <p className="text-sm text-gray-500 mb-4">{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</p>

            <div className="space-y-4">
              {filtered.map((post: CommunityPost, i) => (
                <div key={post.id} className="card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.time}</span>
                      </div>
                      <p className="text-xs text-gray-400">{post.location}</p>
                    </div>
                    <span className="badge bg-agri-50 text-agri-600 border border-agri-100">{post.category}</span>
                  </div>

                  <h2 className="text-lg font-display font-bold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map(t => <span key={t} className="badge bg-gray-100 text-gray-500"><Tag className="w-2.5 h-2.5" />{t}</span>)}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                    <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-2 text-sm font-medium transition-all ${liked.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
                      <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-red-500' : ''}`} />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-sky-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />{post.comments} Comments
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-agri-500 transition-colors ml-auto">
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16"><Users className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-400">No posts found. Try a different search or category.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
