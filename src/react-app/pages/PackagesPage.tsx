import Navbar from '@/react-app/components/Navbar';
import Packages from '@/react-app/components/Packages';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-16">
        <Packages />
      </div>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
