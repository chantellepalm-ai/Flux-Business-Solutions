import Navbar from '@/react-app/components/Navbar';
import About from '@/react-app/components/About';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';
export default function AboutPage() {
    return (<div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
      <Footer />
      <FloatingCTA />
    </div>);
}
