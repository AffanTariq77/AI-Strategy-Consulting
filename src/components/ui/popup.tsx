import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  display?: 'center' | 'top' | 'bottom';
  logoUrl?: string;
  heading?: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  display = 'center',
  logoUrl,
  heading,
  description,
  children,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  let alignClass = 'items-center justify-center';
  if (display === 'top') alignClass = 'items-start justify-center';
  if (display === 'bottom') alignClass = 'items-end justify-center';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
  <div
    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl min-h-[60vh] max-h-[90vh]
               border border-[#e3e8f0] flex flex-col relative"
  >
    {/* Header */}
    <div className="flex items-center justify-between px-8 py-5 border-b border-[#e3e8f0]">
      {/* Title (Left) */}
      {heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-[#23395d]">
          {heading}
        </h2>
      )}

      {/* Close Button (Right) */}
      {showCloseButton && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-gray-400 hover:text-[#23395d]
                     text-3xl font-bold transition-colors leading-none"
        >
          ×
        </button>
      )}
    </div>

    {/* Optional description under header */}
    {description && (
      <p className="px-8 pt-4 text-lg text-[#23395d]/80">
        {description}
      </p>
    )}

    {/* Content */}
    <div className="px-8 py-6 flex-1 overflow-y-auto">
      {children}
    </div>
  </div>
</div>

  );
};

export default Popup;
