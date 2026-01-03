import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';
import NewsletterSignup from '@/react-app/components/NewsletterSignup';
import { Calendar, User, ArrowRight, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const categories = ['All', 'Marketing', 'Advertising', 'Digital', 'Strategy', 'Analytics', 'Social Media'];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const fetchBlogPosts = async (category = 'All') => {
        try {
            setLoading(true);
            setError(null);
            const url = category === 'All'
                ? '/api/blogposts'
                : `/api/blogposts?category=${encodeURIComponent(category)}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            const data = await response.json();
            setBlogPosts(data.blogPosts || []);
        }
        catch (err) {
            console.error('Error fetching blog posts:', err);
            setError('Failed to load blog posts. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    const syncRSSFeed = async () => {
        try {
            setSyncing(true);
            const response = await fetch('/api/sync-rss-feed', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to sync RSS feed');
            }
            const data = await response.json();
            console.log('RSS sync result:', data);
            // Refresh the blog posts after syncing
            await fetchBlogPosts(selectedCategory);
        }
        catch (err) {
            console.error('Error syncing RSS feed:', err);
            setError('Failed to sync blog feed. Please try again later.');
        }
        finally {
            setSyncing(false);
        }
    };
    useEffect(() => {
        fetchBlogPosts(selectedCategory);
    }, [selectedCategory]);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const getReadTime = (excerpt) => {
        const wordCount = excerpt.split(' ').length;
        const minutes = Math.ceil(wordCount / 200);
        return `${minutes} min read`;
    };
    return (<div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/30 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text-purple animate-neon-pulse-purple">
              FLUX Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Latest insights from Marketing Dive - Stay ahead of the digital curve with expert content, industry trends, and actionable strategies.
            </p>
            <button onClick={syncRSSFeed} disabled={syncing} className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
              <RefreshCw className={`w-5 h-5 mr-2 ${syncing ? 'animate-spin' : ''}`}/>
              {syncing ? 'Syncing...' : 'Refresh Feed'}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-purple animate-neon-pulse-purple">
              Featured Articles
            </h2>
            <p className="text-gray-300 text-lg">
              Curated content from Marketing Dive
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                {category}
              </button>))}
          </div>

          {/* Loading State */}
          {loading && (<div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </div>)}

          {/* Error State */}
          {error && !loading && (<div className="text-center py-16">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={() => fetchBlogPosts(selectedCategory)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                Try Again
              </button>
            </div>)}

          {/* Empty State */}
          {!loading && !error && blogPosts.length === 0 && (<div className="text-center py-16">
              <p className="text-gray-400 mb-4">No blog posts found. Click "Refresh Feed" to sync the latest content.</p>
              <button onClick={syncRSSFeed} disabled={syncing} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50">
                <RefreshCw className={`w-5 h-5 mr-2 ${syncing ? 'animate-spin' : ''}`}/>
                {syncing ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>)}

          {/* Articles Grid */}
          {!loading && !error && blogPosts.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (<article key={post.id} className="group cursor-pointer">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10">
                      {post.image_url && (<div className="relative h-48 overflow-hidden">
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop';
                    }}/>
                          <div className="absolute top-4 left-4">
                            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>)}
                      
                      <div className="p-6">
                        <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1"/>
                            {formatDate(post.published_date)}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1"/>
                            {post.author}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-pink-400 transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">{getReadTime(post.excerpt)}</span>
                          <span className="flex items-center text-pink-400 text-sm font-medium group-hover:text-pink-300 transition-colors duration-300">
                            Read More
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>))}
            </div>)}

          {/* Newsletter Signup */}
          <div className="mt-16 max-w-2xl mx-auto">
            <NewsletterSignup variant="inline"/>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Want More Digital Marketing Insights?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Visit Marketing Dive for hundreds more articles, analysis, and resources to stay ahead in the digital marketing landscape.
              </p>
              <a href="https://www.marketingdive.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25">
                Explore Marketing Dive
                <ArrowRight className="ml-2 w-5 h-5"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>);
}
