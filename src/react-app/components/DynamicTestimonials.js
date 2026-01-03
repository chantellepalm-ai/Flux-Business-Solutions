import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
export default function DynamicTestimonials({ showOnlyFeatured = false, limit = 6, className = '' }) {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchTestimonials();
    }, []);
    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            const data = await response.json();
            if (response.ok) {
                let filteredTestimonials = data.testimonials || [];
                if (showOnlyFeatured) {
                    filteredTestimonials = filteredTestimonials.filter((t) => t.is_featured);
                }
                if (limit) {
                    filteredTestimonials = filteredTestimonials.slice(0, limit);
                }
                setTestimonials(filteredTestimonials);
            }
            else {
                setError('Failed to load testimonials');
                // Fallback to static testimonials if API fails
                setFallbackTestimonials();
            }
        }
        catch (err) {
            setError('Network error loading testimonials');
            setFallbackTestimonials();
        }
        finally {
            setLoading(false);
        }
    };
    const setFallbackTestimonials = () => {
        const fallbackData = [
            {
                id: 1,
                client_name: "Sarah Johnson",
                client_company: "TechStart Inc.",
                client_position: "CEO",
                testimonial_text: "Flux transformed our digital presence completely. Their strategic approach to SEO and content marketing increased our leads by 300% in just 6 months.",
                rating: 5,
                is_featured: true
            },
            {
                id: 2,
                client_name: "Michael Chen",
                client_company: "GreenLeaf Solutions",
                client_position: "Marketing Director",
                testimonial_text: "The team at Flux doesn't just execute campaigns - they become true partners in your growth. Their data-driven insights have been invaluable.",
                rating: 5,
                is_featured: true
            },
            {
                id: 3,
                client_name: "Emily Rodriguez",
                client_company: "Urban Fitness",
                client_position: "Founder",
                testimonial_text: "Working with Flux was a game-changer for our local business. They helped us reach customers we never thought possible through targeted social media campaigns.",
                rating: 5,
                is_featured: true
            }
        ];
        setTestimonials(showOnlyFeatured ? fallbackData.filter(t => t.is_featured) : fallbackData.slice(0, limit));
    };
    const renderStars = (rating) => {
        return (<div className="flex gap-1">
        {[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}/>))}
      </div>);
    };
    if (loading) {
        return (<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(3)].map((_, i) => (<div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>))}
      </div>);
    }
    if (error || testimonials.length === 0) {
        return null; // Gracefully hide if no testimonials
    }
    return (<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {testimonials.map((testimonial) => (<div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start gap-3 mb-4">
            <Quote className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0"/>
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "{testimonial.testimonial_text}"
              </p>
              {testimonial.rating && (<div className="mb-3">
                  {renderStars(testimonial.rating)}
                </div>)}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.client_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.client_name}</p>
                {testimonial.client_position && testimonial.client_company && (<p className="text-sm text-gray-600">
                    {testimonial.client_position}, {testimonial.client_company}
                  </p>)}
                {testimonial.client_company && !testimonial.client_position && (<p className="text-sm text-gray-600">{testimonial.client_company}</p>)}
              </div>
            </div>
          </div>
        </div>))}
    </div>);
}
