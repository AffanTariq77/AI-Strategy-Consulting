import etnioLogo from "@/assets/clients/etnio-logo.png";
import fanfoodLogo from "@/assets/clients/fanfood-logo.png";
import devblockLogo from "@/assets/clients/devblock-logo.png";
import raffLogo from "@/assets/clients/raff-logo.png";

const ClientMarquee = () => {
  const clients = [
    { name: "Etnio", logo: etnioLogo },
    { name: "FanFood", logo: fanfoodLogo },
    { name: "DevBlock", logo: devblockLogo },
    { name: "Raff", logo: raffLogo },
  ];

  // Repeat the array enough times for a seamless loop
  const marqueeClients = [...clients, ...clients];

  return (
    <div className="relative overflow-hidden py-5 xs:py-6 sm:py-8 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 px-3 xs:px-4">
      <div
        className="flex gap-6 xs:gap-8 sm:gap-12 min-w-full animate-marquee-loop"
        style={{
          animationDuration: "32s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {marqueeClients.map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-10 lg:px-14"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-8 xs:h-10 sm:h-12 w-auto object-contain mx-auto"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation-name: marquee-loop;
        }
      `}</style>
    </div>
  );
};

export default ClientMarquee;
