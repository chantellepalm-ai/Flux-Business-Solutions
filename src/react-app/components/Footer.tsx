import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-black border-t-2 border-neon-pink/30 relative overflow-hidden">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,255,255,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,16,240,0.08),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://019a3531-1a36-703a-9471-7514fb810b7c.mochausercontent.com/Modern-creative-agency-service-list-instagram-post-(portrait).jpg" 
              alt="FLUX Logo" 
              className="h-16 w-auto mb-4 transition-all duration-300 hover:scale-105 hover:drop-shadow-neon-pink"
            />
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming brands through <span className="neon-text-cyan">innovative</span> digital marketing strategies. 
              Your growth <span className="neon-text-pink">accelerator</span> in the digital age.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', color: 'neon-cyan' },
                { icon: Twitter, href: '#', color: 'neon-purple' },
                { icon: Linkedin, href: '#', color: 'neon-pink' },
                { icon: Instagram, href: '#', color: 'neon-lime' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-black border-2 border-${social.color}/50 rounded-lg flex items-center justify-center text-${social.color} hover:bg-${social.color} hover:text-black hover:border-${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 neon-text-pink">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-sm hover:drop-shadow-neon-cyan"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 neon-text-purple">Services</h3>
            <ul className="space-y-3">
              {[
                'Social Media Marketing',
                'Web Development & SEO',
                'Content Creation',
                'Branding & Design',
                'Paid Ads & Lead Generation'
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate('/services')}
                    className="text-gray-400 hover:text-neon-lime transition-colors duration-300 text-sm cursor-pointer hover:drop-shadow-neon-lime"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <NewsletterSignup variant="footer" />
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-start-4">
            <h3 className="text-white font-semibold mb-4 neon-text-cyan">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-neon-cyan mt-0.5 mr-3 flex-shrink-0 drop-shadow-neon-cyan" />
                <div>
                  <p className="text-gray-400 text-sm hover:text-neon-cyan transition-colors duration-300">khaaliahyusuf@fluxza.co.za</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-neon-pink mt-0.5 mr-3 flex-shrink-0 drop-shadow-neon-pink" />
                <div>
                  <p className="text-gray-400 text-sm hover:text-neon-pink transition-colors duration-300">068 900 2098</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t-2 border-neon-purple/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} <span className="neon-text-pink">FLUX</span> Business Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-sm hover:drop-shadow-neon-cyan">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors duration-300 text-sm hover:drop-shadow-neon-purple">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-lime transition-colors duration-300 text-sm hover:drop-shadow-neon-lime">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
