import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Impact from "@/components/Impact";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import AudienceSegments from "@/components/AudienceSegments";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ClientMarquee from "@/components/ClientMarquee";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <Impact />
      <TechStack />
      <Process />
      <AudienceSegments />
      <ClientMarquee />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
