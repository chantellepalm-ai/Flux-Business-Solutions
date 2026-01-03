import Navbar from '@/react-app/components/Navbar';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';
import FloatingCTA from '@/react-app/components/FloatingCTA';
import AppointmentBooking from '@/react-app/components/AppointmentBooking';
export default function ContactPage() {
    return (<div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-16">
        <Contact />
      </div>
      
      {/* Appointment Booking Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentBooking />
        </div>
      </section>
      
      <Footer />
      <FloatingCTA />
    </div>);
}
