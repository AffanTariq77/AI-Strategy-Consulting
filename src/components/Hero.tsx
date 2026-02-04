import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import Hero3DImage from "./Hero3DImage";

const Hero = () => {
  return (
    <Dialog>
      <section className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-6 xs:pb-8 sm:pb-10 px-3 xs:px-4 sm:px-6 md:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-20">
          {/* Left: Text */}
          <div className="flex-1 w-full text-left space-y-5 xs:space-y-6 sm:space-y-7 max-w-2xl md:pr-8">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-[1.1]">
              Build, Scale, and Transform With<br className="hidden md:block" />
              AI-Centric Software Development
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-2xl text-muted-foreground max-w-xl md:max-w-2xl">
              We help start-ups and enterprises turn product ideas into powerful, scalable digital solutions, from MVP to full-fledged AI-driven platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 items-center md:items-start mt-4">
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-sky-400 text-primary-foreground gap-2 hover:shadow-sky-blue px-5 xs:px-6 sm:px-8 py-3 xs:py-4 text-sm xs:text-base sm:text-lg md:text-xl font-semibold w-full sm:w-auto"
                >
                  Book a Strategy Call
                  <ArrowRight className="h-4 xs:h-5 w-4 xs:w-5" />
                </Button>
              </DialogTrigger>
            </div>
            <div className="pt-4 xs:pt-5 sm:pt-6">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 xs:mb-6">
                Trusted by 50+ Industries with a 90% Client Retention.
              </p>
            </div>
          </div>
          {/* Right: 3D Animation */}
          <div className="flex-1 flex justify-center items-center w-full mb-8 md:mb-0">
            <Hero3DImage />
          </div>
        </div>
        <DialogContent className="max-w-xl p-0 bg-transparent border-0 shadow-none">
          <div className="rounded-2xl bg-white shadow-xl border border-border p-0 overflow-hidden">
            <div className="p-0">
              <ContactForm onlyForm />
            </div>
          </div>
        </DialogContent>
      </section>
    </Dialog>

  );
};

export default Hero;
