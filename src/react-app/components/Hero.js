import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
export default function Hero() {
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setAnimate(true);
    }, []);
    return (<section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-black to-neon-cyan/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,16,240,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.15),transparent_50%)]"></div>
      
      {/* Electric particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (<div key={i} className={`absolute rounded-full animate-float ${i % 4 === 0 ? 'bg-neon-pink shadow-neon-pink' :
                i % 4 === 1 ? 'bg-neon-cyan shadow-neon-cyan' :
                    i % 4 === 2 ? 'bg-neon-purple shadow-neon-purple' :
                        'bg-neon-lime shadow-neon-lime'}`} style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
            }}></div>))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Headline */}
        <h1 className={`text-4xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="block neon-text-pink animate-neon-pulse-pink">Where Brands Evolve.</span>
          <span className="block neon-text-cyan animate-neon-pulse-cyan">Ideas Ignite.</span>
          <span className="block neon-text-lime text-neon-lime" style={{
            textShadow: '0 0 10px rgba(204, 255, 0, 0.8), 0 0 20px rgba(204, 255, 0, 0.6), 0 0 30px rgba(204, 255, 0, 0.4)'
        }}>
            Results Multiply.
          </span>
        </h1>

        {/* Subheadline */}
        <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Welcome to <span className="neon-text-pink font-semibold">FLUX Business Solutions</span> — the pulse of digital innovation. 
          We don't just market your business; we <span className="neon-text-cyan">amplify your influence</span>, <span className="neon-text-purple">ignite engagement</span>, and turn visibility into profit.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-neon-pink to-neon-purple text-white px-8 py-4 rounded-full text-lg font-semibold shadow-neon-multi transition-all duration-300 transform hover:scale-105 hover:shadow-neon-pink border border-neon-pink/50 hover:border-neon-pink group">
            🔥 Let's Get Started
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <button onClick={() => navigate('/services')} className="border-2 border-neon-cyan text-neon-cyan px-8 py-4 rounded-full text-lg font-semibold hover:bg-neon-cyan hover:text-black transition-all duration-300 transform hover:scale-105 shadow-neon-cyan group">
            ⚡ View Our Services
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-neon-purple drop-shadow-neon-purple"/>
        </div>
      </div>
    </section>);
}
