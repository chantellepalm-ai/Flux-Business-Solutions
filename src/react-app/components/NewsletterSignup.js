import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
export default function NewsletterSignup({ variant = 'footer', className = '' }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name: name || undefined }),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('success');
                setMessage('Thank you for subscribing to our newsletter!');
                setEmail('');
                setName('');
            }
            else {
                setStatus('error');
                setMessage(data.error || 'Failed to subscribe. Please try again.');
            }
        }
        catch (error) {
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
        // Reset status after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };
    if (variant === 'footer') {
        return (<div className={`bg-black border-2 border-neon-purple/50 rounded-lg p-6 shadow-neon-purple ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-6 w-6 text-neon-cyan drop-shadow-neon-cyan"/>
          <h3 className="text-xl font-semibold neon-text-cyan">Stay Updated</h3>
        </div>
        <p className="text-gray-300 mb-4">Get the latest insights and industry updates delivered to your inbox.</p>
        
        {status === 'success' ? (<div className="flex items-center gap-2 text-neon-lime">
            <CheckCircle className="h-5 w-5 drop-shadow-neon-lime"/>
            <span>{message}</span>
          </div>) : (<form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-2 border-neon-pink/30 bg-black text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink focus:shadow-neon-pink transition-all duration-300"/>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-2 border-neon-cyan/30 bg-black text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"/>
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg font-bold shadow-neon-purple hover:shadow-neon-pink transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-neon-purple/50 hover:border-neon-pink hover:scale-105">
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            {status === 'error' && (<div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4"/>
                <span className="text-sm">{message}</span>
              </div>)}
          </form>)}
      </div>);
    }
    // Inline variant for blog page or other sections
    return (<div className={`bg-black border-2 border-neon-cyan/50 rounded-lg p-6 shadow-neon-cyan ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-5 w-5 text-neon-pink drop-shadow-neon-pink"/>
        <h3 className="text-lg font-semibold neon-text-pink">Subscribe to Our Newsletter</h3>
      </div>
      <p className="text-gray-300 mb-6">Get expert insights and the latest trends in <span className="neon-text-cyan">digital marketing</span>.</p>
      
      {status === 'success' ? (<div className="flex items-center gap-2 text-neon-lime">
          <CheckCircle className="h-5 w-5 drop-shadow-neon-lime"/>
          <span>{message}</span>
        </div>) : (<form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-2 border-neon-purple/30 bg-black text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:shadow-neon-purple transition-all duration-300"/>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border-2 border-neon-lime/30 bg-black text-white placeholder-gray-500 focus:outline-none focus:border-neon-lime focus:shadow-neon-lime transition-all duration-300"/>
          </div>
          <button type="submit" disabled={status === 'loading'} className="w-full px-4 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-white rounded-lg font-bold shadow-neon-cyan hover:shadow-neon-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-neon-cyan/50 hover:border-neon-purple hover:scale-105">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
          {status === 'error' && (<div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-4 w-4"/>
              <span className="text-sm">{message}</span>
            </div>)}
        </form>)}
    </div>);
}
