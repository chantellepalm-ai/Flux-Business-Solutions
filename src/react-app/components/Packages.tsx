import { Sparkles, Zap, TrendingUp, Flame, Check } from 'lucide-react';
import { Link } from 'react-router';

export default function Packages() {
  const packages = [
    {
      name: 'Spark',
      tagline: 'Entry-level, ignites your brand',
      icon: Sparkles,
      price: 'Starting Package',
      gradient: 'from-neon-lime to-neon-cyan',
      borderColor: 'neon-lime',
      features: [
        'Brand identity consultation',
        'Basic logo design',
        'Social media setup (2 platforms)',
        '2 social media posts per week',
        'Business card design',
        'Email signature template',
        'Brand color palette',
        'Basic style guide',
        '6 months support'
      ]
    },
    {
      name: 'Pulse',
      tagline: 'Growing momentum, steady energy',
      icon: TrendingUp,
      price: 'Growth Package',
      gradient: 'from-neon-cyan to-neon-purple',
      borderColor: 'neon-cyan',
      features: [
        'Everything in Spark, plus:',
        '3 social media posts per week',
        'Social media setup (4 platforms)',
        'Content calendar template',
        'Marketing materials (flyers, posters)',
        'Monthly analytics reports',
        '6 months support'
      ],
      popular: true
    },
    {
      name: 'Surge',
      tagline: 'High-impact, results-driven',
      icon: Zap,
      price: 'Premium Package',
      gradient: 'from-neon-purple to-neon-pink',
      borderColor: 'neon-purple',
      features: [
        'Everything in Pulse, plus:',
        '5 social media posts per week',
        'Complete brand strategy',
        'SEO optimization',
        'Email marketing campaigns',
        'Video branding content',
        'Quarterly strategy reviews',
        '6 months support'
      ]
    },
    {
      name: 'Ignite',
      tagline: 'Full-power, all-in, unstoppable',
      icon: Flame,
      price: 'Enterprise Package',
      gradient: 'from-neon-pink to-neon-magenta',
      borderColor: 'neon-pink',
      features: [
        'Everything in Surge, plus:',
        '7 social media posts per week',
        'Full digital marketing suite',
        'Paid advertising management',
        '12 months support + ongoing partnership'
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-black py-20 relative overflow-hidden">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,16,240,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,255,0.1),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 neon-text-pink animate-neon-pulse-pink">
            Our Packages
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect package to <span className="neon-text-cyan">power your brand's transformation</span>. From igniting your presence to achieving <span className="neon-text-lime">unstoppable momentum</span>.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <div
                key={index}
                className={`relative bg-black rounded-2xl p-8 border-2 border-${pkg.borderColor}/50 hover:border-${pkg.borderColor} transition-all duration-300 hover:shadow-${pkg.borderColor} hover:scale-105 ${
                  pkg.popular ? `ring-2 ring-${pkg.borderColor} ring-offset-2 ring-offset-black shadow-${pkg.borderColor}` : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`bg-gradient-to-r ${pkg.gradient} text-black px-4 py-1 rounded-full text-sm font-bold shadow-${pkg.borderColor}`}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${pkg.gradient} mb-4 shadow-${pkg.borderColor}`}>
                    <Icon size={32} className="text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-lg mb-4">{pkg.tagline}</p>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                    {pkg.price}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check size={20} className={`mr-3 mt-1 flex-shrink-0 text-${pkg.borderColor} drop-shadow-${pkg.borderColor}`} />
                      <span className={`text-gray-300 ${feature.includes('Everything in') ? 'font-semibold text-white' : ''}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  className={`block w-full text-center bg-gradient-to-r ${pkg.gradient} text-black font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 shadow-${pkg.borderColor} hover:scale-105 border-2 border-${pkg.borderColor}/50 hover:border-${pkg.borderColor}`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-black border-2 border-neon-purple/50 rounded-2xl p-12 shadow-neon-purple">
          <h3 className="text-3xl font-bold neon-text-purple mb-4">
            Not sure which package is right for you?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Let's chat about your goals and find the perfect solution to <span className="neon-text-pink">ignite your brand's potential</span>.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold py-4 px-8 rounded-full shadow-neon-multi border-2 border-neon-pink/50 hover:border-neon-pink transition-all duration-300 hover:scale-105"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
