import Navbar from '@/react-app/components/Navbar';
import Hero from '@/react-app/components/Hero';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';
import DynamicTestimonials from '@/react-app/components/DynamicTestimonials';
import { Zap, Target, Shield, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      
      {/* Section 1 - What We Do Best */}
      <section id="what-we-do" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-purple animate-neon-pulse-purple">
              What We Do Best
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At FLUX, we redefine what it means to grow online. Our team of creative strategists, designers, and data-driven marketers fuse art with analytics — transforming your brand into an unstoppable digital force.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: TrendingUp, title: 'Social Media Marketing', desc: 'that drives real ROI' },
              { icon: Target, title: 'Branding', desc: 'that commands attention' },
              { icon: Shield, title: 'Web Development', desc: 'that converts' },
              { icon: Zap, title: 'SEO', desc: 'that dominates search engines' },
              { icon: Users, title: 'Paid Campaigns', desc: 'that bring in the right audience' }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105">
                  <service.icon className="w-12 h-12 text-pink-400 mb-4 group-hover:text-purple-400 transition-colors duration-300" />
                  <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Every strategy we create is tailored, tactical, and turbocharged — built to evolve as fast as the digital world does.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Why Choose FLUX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-purple animate-neon-pulse-purple">
              Why Choose FLUX
            </h2>
            <p className="text-2xl text-white font-semibold mb-4">
              Because ordinary is never good enough.
            </p>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're obsessed with delivering measurable growth and unforgettable digital experiences.
              Our work is bold, strategic, and built on performance — not promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { emoji: '⚡', text: 'Transparency in every step' },
              { emoji: '🔥', text: 'Creative campaigns that convert' },
              { emoji: '🚀', text: 'Analytics that prove your power' },
              { emoji: '💎', text: 'Designs that speak your brand\'s language' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {benefit.emoji}
                </div>
                <p className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold neon-text-pink animate-neon-pulse-pink">
              We don't just follow trends — we set them.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - The FLUX Experience */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 neon-text-purple animate-neon-pulse-purple">
            The FLUX Experience
          </h2>
          
          <div className="space-y-8 mb-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Every click, scroll, and interaction on your brand should feel intentional — magnetic — alive.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              We bring motion, emotion, and precision into every campaign, crafting digital journeys that pull audiences in and keep them hooked.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Whether you're a startup hungry for recognition or an established brand chasing reinvention — we make sure your business doesn't just exist online… it thrives there.
            </p>
          </div>

          <button 
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:glow-lg group"
          >
            💬 Let's Build Your Digital Empire
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

      {/* Section 4 - Dynamic Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <DynamicTestimonials showOnlyFeatured={true} limit={3} />
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to elevate your brand?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Let's create something powerful — something unforgettable — together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:glow-lg group"
            >
              ✨ Work With FLUX
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-pink-500 text-pink-400 px-10 py-5 rounded-full text-xl font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 group"
            >
              📞 Book Your Free Consultation
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
