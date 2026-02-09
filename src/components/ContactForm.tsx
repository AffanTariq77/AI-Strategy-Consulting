import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";


import React, { useState } from "react";

const ContactForm = ({ onlyForm = false }: { onlyForm?: boolean }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    // Basic validation
    if (!formData.name || !formData.email || !formData.details) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.details,
          company: formData.company,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to book strategy call.");
      }
      setSuccess(true);
      setFormData({ name: "", email: "", company: "", details: "" });
    } catch (err: any) {
      setError(err.message || "Failed to book strategy call.");
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <form className="space-y-4 xs:space-y-5 sm:space-y-6 p-3 xs:p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-none border-none" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-4">
  <div className="space-y-1.5 xs:space-y-2">
    <label htmlFor="name" className="text-xs xs:text-sm font-medium">
      Full Name *
    </label>
    <Input
      id="name"
      placeholder="John Doe"
      required
      value={formData.name}
      onChange={handleChange}
      className="py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 text-xs xs:text-sm sm:text-base"
    />
  </div>

  <div className="space-y-1.5 xs:space-y-2">
    <label htmlFor="email" className="text-xs xs:text-sm font-medium">
      Work Email *
    </label>
    <Input
      id="email"
      type="email"
      placeholder="john@company.com"
      required
      value={formData.email}
      onChange={handleChange}
      className="py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 text-xs xs:text-sm sm:text-base"
    />
  </div>
</div>

      <div className="space-y-1.5 xs:space-y-2">
        <label htmlFor="company" className="text-xs xs:text-sm font-medium">
          Company Name
        </label>
        <Input id="company" placeholder="Your Company" value={formData.company} onChange={handleChange} className="py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 text-xs xs:text-sm sm:text-base" />
      </div>
      <div className="space-y-1.5 xs:space-y-2">
        <label htmlFor="details" className="text-xs xs:text-sm font-medium">
          Project Details *
        </label>
        <Textarea
          id="details"
          placeholder="Tell us about your project goals, timeline, and any specific requirements..."
          className="min-h-[120px] py-3 px-4 text-base"
          required
          value={formData.details}
          onChange={handleChange}
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Message sent successfully!</div>}
      <Button
        type="submit"
        size="lg"
        className="w-full hover:bg-sky-400 hover:shadow-sky-blue bg-[#192841] text-white text-base font-semibold rounded-lg py-3 sm:py-4"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book My Strategy Call"}
      </Button>
    </form>
  );
  if (onlyForm) return form;
  return (
    <section id="contact" className="py-10 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Start Your Project
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            You have the vision. We have the engineering team to build it. Tell us about your goals,
and we'll define the bridge to get you there.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Fill out the form below to secure your free strategy session.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold">Ready to start?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Deliverable</h4>
                  <p className="text-muted-foreground">
                    Receive a clear AI Roadmap.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Clarity</h4>
                  <p className="text-muted-foreground">
                    Identify your highest-ROI opportunities in 30 mins.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg">
            {form}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
