import { useEffect, useState } from 'react';
import { Heart, Lightbulb, Users, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,79,255,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,16,240,0.15),transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text-pink animate-neon-pulse-pink">
            ABOUT FLUX BUSINESS SOLUTIONS
          </h1>
          <p className="text-3xl md:text-4xl font-bold neon-text-cyan mb-8 animate-neon-pulse-cyan">
            Born From Vision. Driven by Purpose.
          </p>
        </div>

        {/* Origin Story */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black border-2 border-neon-purple/50 rounded-2xl p-8 md:p-12 shadow-neon-purple">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
              FLUX Business Solutions is the brainchild of <span className="neon-text-pink font-semibold">Khaaliah Yusuf</span>, a powerhouse with over <span className="neon-text-cyan font-semibold">17 years of experience</span> in the sales and marketing arena.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              What started as a spark — a dream to merge creativity with strategy — has evolved into a <span className="neon-text-lime">dynamic, full-service</span> digital marketing agency built on passion, precision, and purpose.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              At FLUX, we don't just help brands grow; <span className="text-white font-semibold neon-text-purple">we help them transform</span>. We blend bold ideas, smart data, and innovative storytelling to create meaningful digital connections that drive measurable success.
            </p>
          </div>
        </div>

        {/* Our Vision */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neon-pink to-neon-purple rounded-full mb-6 shadow-neon-pink">
              <Lightbulb className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-lime animate-neon-pulse-pink">
              Our Vision
            </h2>
          </div>
          
          <div className="bg-black border-2 border-neon-pink/50 rounded-2xl p-8 md:p-12 shadow-neon-pink">
            <p className="text-xl md:text-2xl text-white font-semibold mb-8 text-center">
              To be more than a marketing agency — to be a <span className="neon-text-cyan">movement</span> that inspires growth, independence, and innovation.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              As a <span className="neon-text-pink font-semibold">woman-owned business</span>, FLUX stands proudly at the intersection of empowerment and enterprise. We're committed to uplifting and educating the next generation of entrepreneurs, giving young people the tools, confidence, and mentorship they need to build businesses of their own.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We believe in <span className="neon-text-lime font-semibold">creating opportunities — not waiting for them</span>. Through workshops, digital mentorship, and accessible business guidance, we aim to help the youth step into their power, think creatively, and build legacies that last.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neon-cyan to-neon-lime rounded-full mb-6 shadow-neon-cyan">
              <Target className="w-10 h-10 text-black" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-cyan animate-neon-pulse-cyan">
              Our Mission
            </h2>
          </div>
          
          <div className="bg-black border-2 border-neon-cyan/50 rounded-2xl p-8 md:p-12 shadow-neon-cyan">
            <p className="text-xl md:text-2xl text-white font-semibold mb-8 text-center">
              To redefine digital marketing by combining <span className="neon-text-pink">strategic insight</span> with <span className="neon-text-purple">heart-driven creativity</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 text-center">
              To turn every client's vision into <span className="neon-text-lime">impact</span>, every brand story into <span className="neon-text-cyan">influence</span>, and every idea into <span className="neon-text-pink">income</span>.
            </p>
            
            <div className="space-y-6">
              <p className="text-xl neon-text-purple font-semibold mb-6 text-center">We're here to:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black border-2 border-neon-pink/50 rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-neon-pink">
                  <TrendingUp className="w-12 h-12 text-neon-pink mx-auto mb-4 drop-shadow-neon-pink group-hover:text-neon-purple transition-colors duration-300" />
                  <p className="text-lg text-gray-200">Empower businesses to grow <span className="neon-text-pink">fearlessly</span>.</p>
                </div>
                
                <div className="bg-black border-2 border-neon-cyan/50 rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-neon-cyan">
                  <Users className="w-12 h-12 text-neon-cyan mx-auto mb-4 drop-shadow-neon-cyan group-hover:text-neon-lime transition-colors duration-300" />
                  <p className="text-lg text-gray-200">Educate and uplift <span className="neon-text-cyan">future entrepreneurs</span>.</p>
                </div>
                
                <div className="bg-black border-2 border-neon-lime/50 rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-neon-lime">
                  <Heart className="w-12 h-12 text-neon-lime mx-auto mb-4 drop-shadow-neon-lime group-hover:text-neon-pink transition-colors duration-300" />
                  <p className="text-lg text-gray-200">Create marketing that moves people — <span className="neon-text-lime">emotionally and financially</span>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why FLUX */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full mb-6 shadow-neon-purple">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-purple animate-neon-pulse-purple">
              Why FLUX
            </h2>
          </div>
          
          <div className="bg-black border-2 border-neon-purple/50 rounded-2xl p-8 md:p-12 text-center shadow-neon-purple">
            <p className="text-2xl md:text-3xl text-white font-bold mb-8">
              Because we don't follow the flow — <span className="neon-text-pink">we create it</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Every project we take on is powered by <span className="neon-text-cyan">curiosity</span>, guided by <span className="neon-text-lime">expertise</span>, and executed with <span className="neon-text-pink">excellence</span>. Our team thrives on innovation, precision, and the belief that success is built on relationships, not transactions.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              With Khaaliah's leadership and a passionate team of creatives, FLUX Business Solutions continues to challenge convention — proving that a brand led by <span className="neon-text-purple">vision, purpose, and heart</span> can change the game.
            </p>
          </div>
        </div>

        {/* Join the Movement */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black border-2 border-neon-pink/50 rounded-2xl p-8 md:p-12 text-center shadow-neon-multi">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-pink animate-neon-pulse-pink">
              Join the Movement
            </h2>
            <p className="text-2xl md:text-3xl neon-text-cyan font-bold mb-4">
              FLUX isn't just a name — it's a mindset.
            </p>
            <p className="text-xl md:text-2xl text-gray-200 mb-3">
              It's about <span className="neon-text-lime">transformation</span>, <span className="neon-text-purple">evolution</span>, and <span className="neon-text-pink">growth</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              Whether you're a brand ready to rise, or a young visionary ready to learn — your journey starts here.
            </p>
            
            <Link 
              to="/contact"
              className="inline-block bg-gradient-to-r from-neon-pink to-neon-purple text-white px-10 py-5 rounded-full text-xl font-semibold shadow-neon-multi border-2 border-neon-pink/50 hover:border-neon-pink transition-all duration-300 transform hover:scale-105 group"
            >
              ⚡ Let's build something extraordinary, together.
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
