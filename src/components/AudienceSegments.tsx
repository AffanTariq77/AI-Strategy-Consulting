import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Building2, Users } from "lucide-react";
import WhyWorkWithUs from "./WhyWorkWithUs";
import * as Dialog from "@radix-ui/react-dialog";
import ContactForm from "./ContactForm";

const AudienceSegments = () => {
  const segments = [
    {
      icon: Rocket,
      title: "Funded Startups",
      description:
        "Validate fast. We build robust, investor-ready MVPs that demonstrate real traction.",
      cta: "Launch Your MVP",
    },
    {
      icon: Building2,
      title: "Enterprises",
      description:
        "Modernize legacy systems with secure, scalable AI that unlocks data silos.",
      cta: "Scale Your Operations",
    },
    {
      icon: Users,
      title: "Product Teams",
      description: "Eliminate backlog bottlenecks. Our senior engineers plug directly into your workflow.",
      cta: "Augment Your Team",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
    <section id="case-studies" className="py-8 px-2 sm:px-6 md:py-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#192841" }}
            >
              Who We Serve
            </h2>
            <p className="text-xl text-muted-foreground">
              Tailored solutions for every type of organization
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
            {/* SVG gradient definition rendered once */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <linearGradient
                  id="audience-gradient"
                  x1="0"
                  y1="0"
                  x2="36"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8923cb" />
                  <stop offset="1" stopColor="#374c70" />
                </linearGradient>
              </defs>
            </svg>
            {segments.map((segment, index) => {
              const Icon = segment.icon;
              return (
                <Dialog.Root key={index}>
                  <Card
                    className={`p-6 md:p-8 text-center border border-border/40 transition-all duration-300 ${
                      isMobile
                        ? "hover:shadow-sky-blue"
                        : "hover:shadow-sky-blue hover:-translate-y-2"
                    }`}
                    style={{ background: "#F3F9FF" }}
                  >
                    <div className="mb-8 flex justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon
                          width={36}
                          height={36}
                          stroke="url(#audience-gradient)"
                          strokeWidth={1.5}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </div>
                    </div>
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ color: "#192841" }}
                    >
                      {segment.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {segment.description}
                    </p>
                    <Dialog.Trigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border border-border/40 hover:bg-sky-400 hover:shadow-sky-blue mt-4">
                        {segment.cta}
                      </Button>
                    </Dialog.Trigger>
                  </Card>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl w-full p-0 bg-transparent border-0 shadow-none z-50 focus:outline-none">
                      <div className="rounded-2xl bg-white shadow-xl border border-border p-0 overflow-hidden">
                        <div className="p-0">
                          <ContactForm onlyForm />
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              );
            })}
          </div>
        </div>
        {/* DialogContent moved into each Dialog.Root for proper popup behavior */}
      </section>
      <WhyWorkWithUs />
    </>
  );
};

export default AudienceSegments;
