import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import logo from "@/assets/airbridge-logo.png";



const Footer = () => {
  return (
    <Dialog>
    <footer
      className="text-secondary-foreground border-t-[0.5px] border-[#b3c7e6]/50 w-full overflow-x-hidden"
      style={{ background: "#98cfecff" }}
    >
      <div className="w-full px-3 xs:px-4 sm:px-6 py-5 xs:py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5">
          <div className="flex items-center justify-center mb-2 xs:mb-3 sm:mb-4">
            <img src={logo} alt="AirBridge Devs" className="h-5 xs:h-6 sm:h-8 w-auto" />
          </div>
          <h2
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight px-2"
            style={{ color: "#192841" }}
          >
            Your Data Already Knows What To Do Next
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#23395d] max-w-2xl mx-auto text-center leading-relaxed px-2">
            Stop asking "Can AI help us?" and start seeing exactly how it improves performance, efficiency, and revenue.
          </p>
         <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-sky-400 text-primary-foreground hover:shadow-sky-blue text-xs xs:text-sm sm:text-base py-2 sm:py-3 px-4 xs:px-6 sm:px-8">
                  Start Your AI Implementation
                </Button>
          </DialogTrigger>
        </div>
      </div>

      <div className="border-t border-[#b3c7e6] w-full overflow-x-hidden">
        <div className="w-full px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-5 md:py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 xs:gap-4 sm:gap-6">
            <p className="text-xs text-[#23395d] opacity-50 text-center md:text-left order-last md:order-first">
              © 2026 AirBridge Devs. All rights reserved.
            </p>
            <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-6 w-full xs:w-auto">
              <nav className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 text-xs">
                <a href="#services" className="text-[#23395d] opacity-70 hover:text-sky-400 transition-colors font-medium whitespace-nowrap">Services</a>
                <span className="text-[#23395d] opacity-30 hidden xs:inline">•</span>
                <a href="#process" className="text-[#23395d] opacity-70 hover:text-sky-400 transition-colors font-medium whitespace-nowrap">Process</a>
                <span className="text-[#23395d] opacity-30 hidden xs:inline">•</span>
                <a href="#techstack" className="text-[#23395d] opacity-70 hover:text-sky-400 transition-colors font-medium whitespace-nowrap">Tech Stack</a>
              </nav>
              <div className="flex items-center gap-3 xs:gap-4">
                <a
                  href="https://www.linkedin.com/company/airbridgedevs/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#23395d] opacity-40 hover:text-sky-400 transition-colors flex-shrink-0"
                >
                  <Linkedin className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5" />
                </a>
                <a
                  href="mailto:info@airbridgedevs.com"
                  className="text-xs text-[#23395d] opacity-40 hover:text-sky-400 transition-colors whitespace-nowrap"
                >
                  info@airbridgedevs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none">
        <div className="rounded-2xl bg-white shadow-xl border border-border p-0 overflow-hidden">
          <div className="p-0">
            <ContactForm onlyForm />
          </div>
        </div>
      </DialogContent>
    </footer>
    </Dialog>
    
  );
};

export default Footer;
