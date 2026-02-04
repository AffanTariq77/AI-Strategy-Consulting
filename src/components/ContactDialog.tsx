import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";

const ContactDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-2xl p-0 bg-transparent border-0 shadow-none">
      <div className="bg-white rounded-2xl shadow-2xl p-0">
        <ContactForm />
      </div>
    </DialogContent>
  </Dialog>
);

export default ContactDialog;
