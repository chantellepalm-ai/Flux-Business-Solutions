import { useEffect, useState } from 'react';
import { Lightbulb, Share2, Code, Search, Target, FileText, Palette, BarChart3, Mail, Users, ArrowRight } from 'lucide-react';
export default function Services() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });
        const element = document.getElementById('services');
        if (element)
            observer.observe(element);
        return () => observer.disconnect();
    }, []);
    const services = [
        {
            icon: Lightbulb,
            title: 'Digital Strategy & Consulting',
            features: [
                'Digital marketing strategy development',
                'Brand positioning & identity strategy',
                'Competitive market analysis',
                'Campaign planning & execution',
                'Data-driven performance insights',
                'Growth & lead generation strategy'
            ],
            color: 'from-neon-cyan to-neon-blue',
            iconColor: 'neon-cyan'
        },
        {
            icon: Share2,
            title: 'Social Media Marketing',
            features: [
                'Social media management (Facebook, Instagram, LinkedIn, TikTok, X)',
                'Content creation & curation',
                'Paid social advertising',
                'Community engagement & page moderation',
                'Influencer collaborations',
                'Social media analytics & reporting'
            ],
            color: 'from-neon-pink to-neon-magenta',
            iconColor: 'neon-pink'
        },
        {
            icon: Code,
            title: 'Web Design & Development',
            features: [
                'Responsive website design (desktop & mobile)',
                'UX/UI design & optimization',
                'Landing page creation for campaigns',
                'E-commerce website development',
                'Website maintenance & updates',
                'SEO-friendly structure & speed optimization'
            ],
            color: 'from-neon-purple to-neon-pink',
            iconColor: 'neon-purple'
        },
        {
            icon: Search,
            title: 'Search Engine Optimization (SEO)',
            features: [
                'Keyword research & analysis',
                'On-page & off-page optimization',
                'Technical SEO audits',
                'Link building strategies',
                'Local SEO (Google Business optimization)',
                'Monthly SEO performance tracking'
            ],
            color: 'from-neon-lime to-neon-cyan',
            iconColor: 'neon-lime'
        },
        {
            icon: Target,
            title: 'Paid Advertising (PPC & Display Ads)',
            features: [
                'Google Ads (Search, Display, Video)',
                'Social media ad campaigns (Meta, LinkedIn, TikTok)',
                'Remarketing & retargeting strategies',
                'Conversion rate optimization',
                'Ad copywriting & creative design',
                'Analytics & ROI tracking'
            ],
            color: 'from-neon-cyan to-neon-purple',
            iconColor: 'neon-cyan'
        },
        {
            icon: FileText,
            title: 'Content Marketing',
            features: [
                'Blog writing & article development',
                'Email marketing campaigns',
                'Copywriting for web & digital assets',
                'Press releases & brand storytelling',
                'Whitepapers, eBooks, and case studies',
                'Video scripts, reels & short-form content strategy'
            ],
            color: 'from-neon-purple to-neon-cyan',
            iconColor: 'neon-purple'
        },
        {
            icon: Palette,
            title: 'Branding & Creative Design',
            features: [
                'Logo design & brand identity creation',
                'Brand guidelines & visual direction',
                'Marketing collateral design (brochures, flyers, banners)',
                'Packaging design',
                'Motion graphics & video editing',
                'Photography & creative direction'
            ],
            color: 'from-neon-pink to-neon-lime',
            iconColor: 'neon-pink'
        },
        {
            icon: BarChart3,
            title: 'Analytics & Reporting',
            features: [
                'Google Analytics setup & tracking',
                'Social media insights dashboards',
                'Monthly campaign reports',
                'Conversion tracking & performance measurement',
                'Marketing automation & CRM integration'
            ],
            color: 'from-neon-lime to-neon-purple',
            iconColor: 'neon-lime'
        },
        {
            icon: Mail,
            title: 'Email & Automation Marketing',
            features: [
                'Email campaign design & management',
                'Lead nurturing sequences',
                'Drip campaigns & autoresponders',
                'CRM integration (HubSpot, Mailchimp, Zoho, etc.)',
                'Analytics and deliverability optimization'
            ],
            color: 'from-neon-cyan to-neon-pink',
            iconColor: 'neon-cyan'
        },
        {
            icon: Users,
            title: 'Training & Mentorship',
            features: [
                'Digital marketing workshops',
                'Youth entrepreneurship training',
                'Social media marketing for small businesses',
                'Branding & business startup mentorship',
                'Marketing strategy coaching'
            ],
            color: 'from-neon-purple to-neon-lime',
            iconColor: 'neon-purple'
        }
    ];
    return (<section id="services" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,16,240,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,255,0.1),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 neon-text-pink animate-neon-pulse-pink">
            Digital Marketing Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to <span className="neon-text-cyan">accelerate</span> your business growth and <span className="neon-text-lime">maximize</span> your online presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (<div key={index} className={`group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="relative h-full">
                {/* Card */}
                <div className="h-full bg-black border-2 border-neon-pink/30 rounded-2xl p-8 transition-all duration-500 hover:border-neon-cyan/80 hover:shadow-neon-multi transform hover:-translate-y-2 animate-neon-border">
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-${service.iconColor}`}>
                    <service.icon className="w-8 h-8 text-black" strokeWidth={2.5}/>
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold text-white mb-6 text-center group-hover:text-${service.iconColor} transition-colors duration-300`}>
                    {service.title}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (<li key={featureIndex} className="flex items-start text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-3 mt-2 flex-shrink-0 shadow-${service.iconColor}`}></div>
                        <span>{feature}</span>
                      </li>))}
                  </ul>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            </div>))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black border-2 border-neon-purple/50 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-neon-multi">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 via-neon-cyan/10 to-neon-lime/10 blur-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold mb-4 neon-text-cyan animate-neon-pulse-cyan">
                Ready to Transform Your Brand?
              </h3>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's create something <span className="neon-text-pink">extraordinary</span> together. Get in touch today and start your <span className="neon-text-lime">digital evolution</span>.
              </p>
              <button onClick={() => window.location.href = '/contact'} className="bg-gradient-to-r from-neon-pink to-neon-purple text-white px-10 py-5 rounded-full text-lg font-semibold shadow-neon-multi border border-neon-pink/50 hover:border-neon-pink transition-all duration-300 transform hover:scale-105 group inline-flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
