import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Understand",
      description: "Deep exploration of business goals and data feasibility.",
      details:
        "We conduct technical audits and one-on-one strategy calls to define clear KPIs, ensuring we build a solution that solves the right problem from day one.",
    },
    {
      number: "02",
      title: "Architect",
      description: "Mapping secure, scalable, and AI-ready infrastructure.",
      details:
        "We map the full system architecture, from vector databases to API gateways, ensuring your data remains secure while maximizing model performance.",
    },
    {
      number: "03",
      title: "Build (AI Core)",
      description: "Shipping functional, stable, and clean code powered by AI.",
      details:
        "We ship in weeks, turning architectural plans into working software using best-in-class frameworks like LangChain, OpenAI, and Next.js.",
    },
    {
      number: "04",
      title: "Iterate",
      description: "Optimizing model accuracy based on real user feedback.",
      details:
        "AI isn't static. We analyze early usage data to refine prompts, reduce latency, and eliminate hallucinations before the full public launch.",
    },
    {
      number: "05",
      title: "Scale",
      description: "Automating operations for long-term reliability and growth.",
      details:
        "We implement CI/CD pipelines, auto-scaling protocols, and enterprise-grade security to ensure your system performs flawlessly as traffic increases.",
    },
  ];

  const [hovered, setHovered] = React.useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHoverEnter = (index: number) => {
    if (!isMobile) {
      setHovered(index);
    }
  };

  const handleHoverLeave = () => {
    setHovered(null);
  };

  return (
    <section id="process" className="py-10 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#192841" }}
          >
            The AI Engineering Blueprint
          </h2>
          <p className="text-xl text-muted-foreground">
            From loose concept to deployed infrastructure, we systematically de-risk
your build at every stage. A proven process from concept to scale
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleHoverEnter(index)}
                onMouseLeave={() => handleHoverLeave()}
              >
                <Card
                  className={`p-6 h-full border border-border/40 transition-all duration-300 bg-[#F3F9FF] ${
                    isMobile
                      ? "hover:shadow-sky-blue"
                      : hovered === index
                        ? "scale-105 shadow-2xl z-20"
                        : "hover:shadow-sky-blue"
                  }`}
                  style={{ background: "#F3F9FF" }}
                >
                  <div className="mb-4 flex justify-center items-center">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="process-gradient"
                          x1="0"
                          y1="0"
                          x2="48"
                          y2="48"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#8923cb" />
                          <stop offset="1" stopColor="#374c70ff" />
                        </linearGradient>
                      </defs>
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="2.2rem"
                        fontWeight="bold"
                        fill="url(#process-gradient)"
                      >
                        {step.number}
                      </text>
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#192841" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      hovered === index
                        ? "max-h-40 opacity-100 mt-4"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <p className="text-xs text-slate-600">{step.details}</p>
                  </div>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
