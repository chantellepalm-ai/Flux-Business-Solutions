import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [submitMessage, setSubmitMessage] = useState('');
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });
        const element = document.getElementById('contact');
        if (element)
            observer.observe(element);
        return () => observer.disconnect();
    }, []);
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: '',
                    company: formData.company,
                    message: formData.message
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage('Thank you for contacting us! We\'ll get back to you soon.');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    service: '',
                    message: ''
                });
            }
            else {
                setSubmitStatus('error');
                setSubmitMessage(data.error || 'Failed to submit form. Please try again.');
            }
        }
        catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('Network error. Please try again.');
        }
        // Reset status after 5 seconds
        setTimeout(() => {
            setSubmitStatus('idle');
            setSubmitMessage('');
        }, 5000);
    };
    return (<section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,16,240,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-pink animate-neon-pulse-pink">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to <span className="neon-text-cyan">fuel your business growth</span>? Get in touch and let's create something <span className="neon-text-lime">extraordinary</span> together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium neon-text-pink mb-2">
                    Full Name *
                  </label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border-2 border-neon-pink/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:shadow-neon-pink transition-all duration-300" placeholder="John Doe"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium neon-text-cyan mb-2">
                    Email Address *
                  </label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border-2 border-neon-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300" placeholder="john@company.com"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium neon-text-purple mb-2">
                    Company Name
                  </label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border-2 border-neon-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:shadow-neon-purple transition-all duration-300" placeholder="Your Company"/>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium neon-text-lime mb-2">
                    Service Interested In
                  </label>
                  <select id="service" name="service" value={formData.service} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border-2 border-neon-lime/30 rounded-lg text-white focus:outline-none focus:border-neon-lime focus:shadow-neon-lime transition-all duration-300">
                    <option value="">Select a service</option>
                    <option value="social-media">Social Media Marketing</option>
                    <option value="web-dev">Web Development & SEO</option>
                    <option value="content">Content Creation</option>
                    <option value="branding">Branding & Design</option>
                    <option value="paid-ads">Paid Ads & Lead Generation</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium neon-text-pink mb-2">
                  Message *
                </label>
                <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 bg-black border-2 border-neon-pink/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:shadow-neon-pink transition-all duration-300 resize-none" placeholder="Tell us about your project and goals..."></textarea>
              </div>

              <button type="submit" disabled={submitStatus === 'loading'} className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-neon-multi border-2 border-neon-pink/50 hover:border-neon-pink transition-all duration-300 transform hover:scale-105 group flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300"/>
                {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (<div className="mt-4 p-4 bg-neon-lime/10 border-2 border-neon-lime/50 rounded-lg text-neon-lime text-center shadow-neon-lime">
                  {submitMessage}
                </div>)}
              
              {submitStatus === 'error' && (<div className="mt-4 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg text-red-400 text-center">
                  {submitMessage}
                </div>)}
            </form>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-black border-2 border-neon-cyan/50 rounded-2xl p-8 h-full shadow-neon-cyan">
              <h3 className="text-2xl font-bold neon-text-cyan mb-8 animate-neon-pulse-cyan">Get in Touch</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0 shadow-neon-pink">
                    <Mail className="w-6 h-6 text-white"/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-300 hover:text-neon-pink transition-colors duration-300">khaaliahyusuf@fluxza.co.za</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0 shadow-neon-cyan">
                    <Phone className="w-6 h-6 text-white"/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">068 900 2098</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-lime to-neon-cyan rounded-lg flex items-center justify-center flex-shrink-0 shadow-neon-lime">
                    <MapPin className="w-6 h-6 text-black" strokeWidth={2.5}/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-300">South Africa</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4 neon-text-purple">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
            { icon: Facebook, href: '#', color: 'neon-cyan' },
            { icon: Twitter, href: '#', color: 'neon-purple' },
            { icon: Linkedin, href: '#', color: 'neon-pink' },
            { icon: Instagram, href: '#', color: 'neon-lime' }
        ].map((social, index) => (<a key={index} href={social.href} className={`w-10 h-10 bg-black border-2 border-${social.color}/50 rounded-lg flex items-center justify-center text-${social.color} hover:bg-${social.color} hover:text-black hover:border-${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-${social.color}`}>
                      <social.icon className="w-5 h-5"/>
                    </a>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
