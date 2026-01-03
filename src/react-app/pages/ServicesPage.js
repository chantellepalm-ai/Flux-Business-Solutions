import Navbar from '@/react-app/components/Navbar';
import Services from '@/react-app/components/Services';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';
export default function ServicesPage() {
    return (<div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-16">
        <Services />
      </div>
      <Footer />
      <FloatingCTA />
    </div>);
}
