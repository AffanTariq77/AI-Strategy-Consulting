import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const TechStack = () => {
  // Add details for each technology (richer content, can add icons if desired)
  const techCategories = {
    ai: [
      {
        name: "OpenAI",
        details: {
          title: "OpenAI",
          desc: "Industry-leading LLMs (GPT-4) providing the reasoning engine for complex enterprise automation.",
          url: "https://openai.com/",
        },
      },
      {
        name: "Anthropic",
        details: {
          title: "Anthropic",
          desc: "High-security models with massive context windows, ideal for analyzing large documents and datasets.",
          url: "https://www.anthropic.com/",
        },
      },
      {
        name: "LlamaIndex",
        details: {
          title: "LlamaIndex",
          desc: "The premier data framework for connecting your private data sources to Large Language Models.",
          url: "https://www.llamaindex.ai/",
        },
      },
      {
        name: "PyTorch",
        details: {
          title: "PyTorch",
          desc: "Flexible deep learning framework used for building and training custom, high-performance neural networks.",
          url: "https://pytorch.org/",
        },
      },
      {
        name: "TensorFlow",
        details: {
          title: "TensorFlow",
          desc: "Production-grade machine learning platform designed for scalable model deployment in enterprise environments.",
          url: "https://www.tensorflow.org/",
        },
      },
      {
        name: "Pinecone",
        details: {
          title: "Pinecone",
          desc: "High-performance vector database enabling real-time semantic search and long-term memory for AI.",
          url: "https://www.pinecone.io/",
        },
      },
      {
        name: "LangChain",
        details: {
          title: "LangChain",
          desc: "The standard architecture for chaining LLMs into cognitive applications that can reason and act.",
          url: "https://www.langchain.com/",
        },
      },
      {
        name: "Cohiere",
        details: {
          title: "Cohiere",
          desc: "Reliable enterprise-grade language models for text generation, summarization, and semantic search.",
          url: "https://cohere.com/",
        },
      },
      {
        name: "Mistral",
        details: {
          title: "Mistral",
          desc: "High-performance open-source AI models offering excellent cost-to-quality ratio for edge and cloud deployment.",
          url: "https://mistral.ai/",
        },
      },
      {
        name: "Hugging Face",
        details: {
          title: "Hugging Face",
          desc: "Open-source hub for thousands of pre-trained models and datasets, enabling rapid ML prototyping and deployment.",
          url: "https://huggingface.co/",
        },
      },
      {
        name: "Scikit-learn",
        details: {
          title: "Scikit-learn",
          desc: "Comprehensive Python library for classical machine learning, preprocessing, and model evaluation.",
          url: "https://scikit-learn.org/",
        },
      },
      {
        name: "RAG pipelines",
        details: {
          title: "RAG pipelines",
          desc: "Retrieval-Augmented Generation systems combining document retrieval with language models for accurate, context-aware responses.",
          url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation",
        },
      },
    ],
    backend: [
      {
        name: "Node.js",
        details: {
          title: "Node.js",
          desc: "Non-blocking, event-driven JavaScript runtime perfect for building scalable, real-time server applications.",
          url: "https://nodejs.org/",
        },
      },
      {
        name: "Python",
        details: {
          title: "Python",
          desc: "Versatile language with rich AI/ML libraries (NumPy, Pandas, Scikit-learn), ideal for backend services and data processing.",
          url: "https://www.python.org/",
        },
      },
      {
        name: "PostgreSQL",
        details: {
          title: "PostgreSQL",
          desc: "Open-source relational database with advanced features like JSON support, full-text search, and excellent scaling.",
          url: "https://www.postgresql.org/",
        },
      },
      {
        name: "MongoDB",
        details: {
          title: "MongoDB",
          desc: "NoSQL document database optimized for flexible schemas and horizontal scaling across distributed systems.",
          url: "https://www.mongodb.com/",
        },
      },
      {
        name: "Redis",
        details: {
          title: "Redis",
          desc: "In-memory data store enabling ultra-fast caching, session management, and real-time data operations.",
          url: "https://redis.io/",
        },
      },
      {
        name: "Docker",
        details: {
          title: "Docker",
          desc: "Containerization platform ensuring consistent deployment across development, staging, and production environments.",
          url: "https://www.docker.com/",
        },
      },
      {
        name: "Kubernetes",
        details: {
          title: "Kubernetes",
          desc: "Orchestration platform for automating containerized application deployment, scaling, and management.",
          url: "https://kubernetes.io/",
        },
      },
      {
        name: "FastAPI",
        details: {
          title: "FastAPI",
          desc: "Modern Python web framework for building APIs with automatic documentation and exceptional performance.",
          url: "https://fastapi.tiangolo.com/",
        },
      },
      {
        name: "Express.js",
        details: {
          title: "Express.js",
          desc: "Minimal and flexible Node.js framework for building robust APIs and web applications quickly.",
          url: "https://expressjs.com/",
        },
      },
      {
        name: "Go",
        details: {
          title: "Go",
          desc: "Ultra-fast, compiled language ideal for high-concurrency cloud services and microservices.",
          url: "https://go.dev/",
        },
      },
      {
        name: "Ruby on Rails",
        details: {
          title: "Ruby on Rails",
          desc: "The 'startup speed' framework for rapid prototyping and launching MVPs in record time.",
          url: "https://rubyonrails.org/",
        },
      },
      {
        name: "GraphQL",
        details: {
          title: "GraphQL",
          desc: "Flexible query language that optimizes data fetching, reducing network load for complex applications.",
          url: "https://graphql.org/",
        },
      },
      {
        name: "Microservices",
        details: {
          title: "Microservices",
          desc: "Modular architecture ensuring independent scaling, fault isolation, and easier long-term maintenance.",
          url: "https://microservices.io/",
        },
      },
      {
        name: "Serverless",
        details: {
          title: "Serverless",
          desc: "Event-driven architecture that eliminates infrastructure management and scales costs purely on usage.",
          url: "https://serverless.com/",
        },
      },
      {
        name: "Real-time systems",
        details: {
          title: "Real-time systems",
          desc: "WebSocket-based architecture enabling instant data synchronization and live user collaboration.",
          url: "https://ably.com/concepts/real-time",
        },
      },
    ],
    frontend: [
      {
        name: "React",
        details: {
          title: "React",
          desc: "Modern JavaScript library for building interactive, component-driven user interfaces with excellent developer experience.",
          url: "https://react.dev/",
        },
      },
      {
        name: "TypeScript",
        details: {
          title: "TypeScript",
          desc: "Typed superset of JavaScript providing compile-time error detection and superior code maintainability.",
          url: "https://www.typescriptlang.org/",
        },
      },
      {
        name: "Tailwind CSS",
        details: {
          title: "Tailwind CSS",
          desc: "Utility-first CSS framework enabling rapid UI development with consistent, responsive design patterns.",
          url: "https://tailwindcss.com/",
        },
      },
      {
        name: "Next.js",
        details: {
          title: "Next.js",
          desc: "React framework with built-in SSR, static generation, and API routes for full-stack web applications.",
          url: "https://nextjs.org/",
        },
      },
      {
        name: "Vue.js",
        details: {
          title: "Vue.js",
          desc: "Progressive JavaScript framework combining the best of React and Angular with a gentle learning curve.",
          url: "https://vuejs.org/",
        },
      },
      {
        name: "Angular",
        details: {
          title: "Angular",
          desc: "Full-featured framework for building large-scale, enterprise-grade single-page applications.",
          url: "https://angular.io/",
        },
      },
      {
        name: "Vite",
        details: {
          title: "Vite",
          desc: "Next-generation frontend tooling offering lightning-fast builds and instant HMR for superior DX.",
          url: "https://vitejs.dev/",
        },
      },
      {
        name: "Webpack",
        details: {
          title: "Webpack",
          desc: "Powerful module bundler with extensive ecosystem enabling advanced code splitting and optimization.",
          url: "https://webpack.js.org/",
        },
      },
      {
        name: "Storybook",
        details: {
          title: "Storybook",
          desc: "Isolated component development environment enabling better testing and documentation of UI components.",
          url: "https://storybook.js.org/",
        },
      },
      {
        name: "Testing Library",
        details: {
          title: "Testing Library",
          desc: "User-centric testing framework encouraging writing tests that validate actual user behavior.",
          url: "https://testing-library.com/",
        },
      },
      {
        name: "Three.js",
        details: {
          title: "Three.js",
          desc: "JavaScript 3D library enabling creation of stunning interactive 3D experiences in the browser.",
          url: "https://threejs.org/",
        },
      },
      {
        name: "D3.js",
        details: {
          title: "D3.js",
          desc: "Data visualization library for creating custom, interactive, and dynamic visual representations.",
          url: "https://d3js.org/",
        },
      },
    ],
    cloud: [
      {
        name: "AWS",
        details: {
          title: "AWS",
          desc: "Comprehensive cloud platform offering EC2, S3, Lambda, RDS, and hundreds of services for any use case.",
          url: "https://aws.amazon.com/",
        },
      },
      {
        name: "Google Cloud",
        details: {
          title: "Google Cloud",
          desc: "Enterprise-grade cloud with strong AI/ML capabilities, superior data analytics, and BigQuery integration.",
          url: "https://cloud.google.com/",
        },
      },
      {
        name: "Azure",
        details: {
          title: "Azure",
          desc: "Microsoft's cloud platform integrating seamlessly with enterprise software and offering strong AI services.",
          url: "https://azure.microsoft.com/",
        },
      },
      {
        name: "Vercel",
        details: {
          title: "Vercel",
          desc: "Optimal platform for Next.js deployment offering edge functions, automatic CI/CD, and global CDN.",
          url: "https://vercel.com/",
        },
      },
      {
        name: "Netlify",
        details: {
          title: "Netlify",
          desc: "Git-connected platform for deploying static sites and serverless functions with automatic rollback.",
          url: "https://www.netlify.com/",
        },
      },
      {
        name: "Heroku",
        details: {
          title: "Heroku",
          desc: "Platform-as-a-Service simplifying app deployment with built-in DevOps, databases, and scaling.",
          url: "https://www.heroku.com/",
        },
      },
      {
        name: "DigitalOcean",
        details: {
          title: "DigitalOcean",
          desc: "Developer-friendly cloud provider offering affordable VPS, managed databases, and Kubernetes solutions.",
          url: "https://www.digitalocean.com/",
        },
      },
      {
        name: "GitHub Actions",
        details: {
          title: "GitHub Actions",
          desc: "Native CI/CD automation within GitHub enabling automated testing, building, and deployment workflows.",
          url: "https://github.com/features/actions",
        },
      },
      {
        name: "GitLab CI",
        details: {
          title: "GitLab CI",
          desc: "Built-in CI/CD pipeline system with superior parallelization and enterprise security features.",
          url: "https://docs.gitlab.com/ee/ci/",
        },
      },
      {
        name: "Jenkins",
        details: {
          title: "Jenkins",
          desc: "Open-source automation server enabling flexible, powerful CI/CD pipeline orchestration.",
          url: "https://www.jenkins.io/",
        },
      },
    ],
    data: [
      {
        name: "Apache Spark",
        details: {
          title: "Apache Spark",
          desc: "Unified analytics engine for large-scale distributed data processing with exceptional performance.",
          url: "https://spark.apache.org/",
        },
      },
      {
        name: "Apache Kafka",
        details: {
          title: "Apache Kafka",
          desc: "Distributed streaming platform for building real-time data pipelines and event-driven applications.",
          url: "https://kafka.apache.org/",
        },
      },
      {
        name: "Snowflake",
        details: {
          title: "Snowflake",
          desc: "Cloud-native data warehousing for seamless storage, analysis, and sharing across multiple clouds.",
          url: "https://www.snowflake.com/",
        },
      },
      {
        name: "BigQuery",
        details: {
          title: "BigQuery",
          desc: "Serverless, highly scalable data warehouse designed for real-time business insights and analytics.",
          url: "https://cloud.google.com/bigquery",
        },
      },
      {
        name: "Redshift",
        details: {
          title: "Redshift",
          desc: "Fast, simple, and cost-effective data warehousing fully integrated with the AWS ecosystem.",
          url: "https://aws.amazon.com/redshift/",
        },
      },
      {
        name: "Airflow",
        details: {
          title: "Airflow",
          desc: "Platform to programmatically author, schedule, and monitor complex data processing workflows.",
          url: "https://airflow.apache.org/",
        },
      },
      {
        name: "dbt",
        details: {
          title: "dbt",
          desc: "Analytics engineering tool that transforms raw data in the warehouse into reliable business insights.",
          url: "https://www.getdbt.com/",
        },
      },
      {
        name: "ETL / Data Lakes",
        details: {
          title: "ETL / Data Lakes",
          desc: "Centralized repositories and pipelines capable of processing and storing vast amounts of raw data.",
          url: "https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/",
        },
      },
    ],
  };

  const [hovered, setHovered] = useState<{ cat: string; idx: number } | null>(
    null,
  );
  const [clicked, setClicked] = useState<{ cat: string; idx: number } | null>(
    null,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHoverEnter = (cat: string, idx: number) => {
    if (!isMobile) {
      setHovered({ cat, idx });
    }
  };

  const handleHoverLeave = () => {
    setHovered(null);
  };

  const handleClick = (cat: string, idx: number) => {
    if (isMobile) {
      setClicked(
        clicked && clicked.cat === cat && clicked.idx === idx
          ? null
          : { cat, idx }
      );
    }
  };

  return (
    <section id="tech-stack" className="py-6 xs:py-8 sm:py-10 px-3 xs:px-4 sm:px-6 md:py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 xs:mb-4"
            style={{ color: "#192841" }}
          >
            Our Unified Tech Stack
          </h2>
          <p className="text-sm xs:text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            We engineer with modern, scalable technologies combined with
advanced AI frameworks to ensure your product is fast, intelligent, and built for
long-term growth.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full mb-8 xs:mb-10 sm:mb-12 gap-1 xs:gap-2 h-auto p-1 xs:p-1.5">
              <TabsTrigger value="ai" className="text-xs xs:text-sm py-2 xs:py-3">AI & ML</TabsTrigger>
              <TabsTrigger value="backend" className="text-xs xs:text-sm py-2 xs:py-3">Backend</TabsTrigger>
              <TabsTrigger value="frontend" className="text-xs xs:text-sm py-2 xs:py-3 sm:col-span-1 col-span-1">Frontend</TabsTrigger>
              <TabsTrigger value="cloud" className="hidden sm:inline-flex text-xs xs:text-sm py-2 xs:py-3">Cloud/DevOps</TabsTrigger>
              <TabsTrigger value="data" className="hidden sm:inline-flex text-xs xs:text-sm py-2 xs:py-3">Data</TabsTrigger>
            </TabsList>
            {Object.entries(techCategories).map(([key, technologies]) => (
              <TabsContent key={key} value={key} className="space-y-6 xs:space-y-8">
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center p-2 sm:p-6 md:p-8">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => handleHoverEnter(key, index)}
                      onMouseLeave={() => handleHoverLeave()}
                      onClick={() => handleClick(key, index)}
                      className="relative"
                    >
                      <Badge
                        variant="secondary"
                        className={`px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm sm:text-base bg-card/80 text-foreground border border-border/40 transition-all duration-300 opacity-100 cursor-pointer ${
                          isMobile
                            ? "hover:border-sky-400 hover:shadow-sky-blue"
                            : hovered && hovered.cat === key && hovered.idx === index
                              ? "scale-105 shadow-2xl z-30 border-sky-400"
                              : "hover:border-sky-400 hover:shadow-sky-blue"
                        }`}
                      >
                        {tech.name}
                      </Badge>
                      {/* Tooltip with pointer and richer content */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 mt-3 w-[90vw] xs:w-[280px] sm:w-[320px] max-w-xs bg-background border border-border rounded-xl shadow-2xl p-3 xs:p-4 sm:p-5 text-xs sm:text-sm text-muted-foreground font-sans transition-all duration-300 z-40 pointer-events-none flex flex-col items-center gap-2 ${
                          isMobile
                            ? clicked && clicked.cat === key && clicked.idx === index
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                            : hovered && hovered.cat === key && hovered.idx === index
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                        }`}
                        style={{
                          boxShadow: "0 8px 32px 0 rgba(0, 80, 180, 0.10)",
                        }}
                      >
                        <div className="text-sm font-semibold text-primary text-center">
                          {tech.details.title}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mb-2">
                          {tech.details.desc}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-background border-l border-t border-border rotate-45 z-10"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
