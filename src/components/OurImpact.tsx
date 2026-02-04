import { Card } from "@/components/ui/card";
import { Award, Briefcase, Repeat, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Award,
    value: "200+",
    label: "Projects",
  },
  {
    icon: Briefcase,
    value: "50+",
    label: "Industries",
  },
  {
    icon: Repeat,
    value: "90%",
    label: "Client Return Ratio",
  },
  {
    icon: TrendingUp,
    value: "250+",
    label: "Digital Transformations",
  },
];

const OurImpact = () => {
  return (
    <section className="py-6 xs:py-8 sm:py-10 px-3 xs:px-4 sm:px-6 md:py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 xs:mb-4"
            style={{ color: "#192841" }}
          >
            Proven Engineering at Scale
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't just write code; we eliminate technical debt. From rapid MVP launches to
enterprise modernization, our systems are built to last.
          </p>
        </div>
        {/* SVG gradient definition rendered once */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="impact-gradient" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#8923cb" />
              <stop offset="1" stopColor="#8923cb" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card
                key={idx}
                className="p-4 xs:p-6 sm:p-8 text-center border border-border/40 hover:shadow-sky-blue transition-all duration-300 hover:-translate-y-2"
                style={{ background: "#F3F9FF" }}
              >
                <div className="flex justify-center mb-3 xs:mb-4 sm:mb-6">
                  <Icon
                    width={28}
                    height={28}
                    className="xs:w-8 sm:w-10"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="url(#impact-gradient)"
                    stroke="url(#impact-gradient)"
                  />
                </div>
                <div
                  className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 xs:mb-3"
                  style={{ color: "#192841" }}
                >
                  {metric.value}
                </div>
                <div className="text-xs xs:text-sm sm:text-lg text-muted-foreground font-medium">
                  {metric.label}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
