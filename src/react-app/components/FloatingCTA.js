import { FaWhatsapp } from 'react-icons/fa';
export default function FloatingCTA() {
    const whatsappNumber = "27689002098";
    const whatsappMessage = "Hello FLUX Business Solutions, I'm interested in your services!";
    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    };
    return (<button onClick={handleWhatsAppClick} className="fixed bottom-6 right-6 z-40 bg-neon-lime text-black px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-110 border-2 border-neon-lime flex items-center space-x-2 group font-bold animate-neon-pulse-lime">
      <FaWhatsapp size={24} className="drop-shadow-neon-lime"/>
      <span className="font-bold">WhatsApp Us</span>
    </button>);
}
