import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/airbridge-logo.png";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <Dialog>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="AirBridge Devs" className="h-6 sm:h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => scrollToSection("services")}
                className="transition-colors transition-transform duration-200 text-headernav text-sm hover:text-headernav-dark hover:scale-105"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="transition-colors transition-transform duration-200 text-headernav text-sm hover:text-headernav-dark hover:scale-105"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("tech-stack")}
                className="transition-colors transition-transform duration-200 text-headernav text-sm hover:text-headernav-dark hover:scale-105"
              >
                Tech Stack
              </button>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-sky-400 text-primary-foreground hover:shadow-sky-blue text-sm py-2 px-4">
                  Book a Consultation
                </Button>
              </DialogTrigger>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pb-3 flex flex-col gap-3 border-t border-border pt-3">
              <button
                onClick={() => scrollToSection("services")}
                className="transition-colors text-left text-headernav text-sm hover:text-headernav-dark"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="transition-colors text-left text-headernav text-sm hover:text-headernav-dark"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("tech-stack")}
                className="transition-colors text-left text-headernav text-sm hover:text-headernav-dark"
              >
                Tech Stack
              </button>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-sky-400 text-primary-foreground w-full hover:shadow-sky-blue text-sm py-2">
                  Book a Consultation
                </Button>
              </DialogTrigger>
            </div>
          )}
        </div>
      </nav>
      <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none">
        <div className="rounded-2xl bg-white shadow-xl border border-border p-0 overflow-hidden">
          <div className="p-0">
            <ContactForm onlyForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Navigation;
