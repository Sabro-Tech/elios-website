import { useState } from 'react';

// Same phone number used for both channels (matches Footer.tsx's primary number).
const PHONE_NUMBER = '923081911579';
const PHONE_DISPLAY = '+92 308 1911579';
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;
const CALL_URL = `tel:+${PHONE_NUMBER}`;

// Sticky mobile/desktop contact CTA: a single floating button that expands
// into a choice of "Chat on WhatsApp" or "Call Now" rather than jumping
// straight to WhatsApp, so a visitor who'd rather just call isn't forced
// into a chat app. Same fixed bottom-right placement as before.
export default function WhatsAppButton() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
            {/* Expanded choices */}
            <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <a
                    href={CALL_URL}
                    className="flex items-center gap-3 bg-white text-[#1e4186] pl-5 pr-2 py-2 rounded-full shadow-xl border border-gray-100 font-bold text-sm hover:bg-brand-blue hover:text-white transition-all group"
                    aria-label={`Call us at ${PHONE_DISPLAY}`}
                >
                    <span>Call Now</span>
                    <span className="relative bg-brand-blue text-white group-hover:bg-white group-hover:text-brand-blue p-2.5 rounded-full flex items-center justify-center transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </span>
                </a>
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white text-[#1e4186] pl-5 pr-2 py-2 rounded-full shadow-xl border border-gray-100 font-bold text-sm hover:bg-[#25d366] hover:text-white transition-all group"
                    aria-label="Chat with us on WhatsApp"
                >
                    <span>Chat on WhatsApp</span>
                    <span className="relative bg-[#25d366] text-white group-hover:bg-white group-hover:text-[#25d366] p-2.5 rounded-full flex items-center justify-center transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </span>
                </a>
            </div>

            {/* Main trigger */}
            <button
                onClick={() => setOpen(o => !o)}
                className="group flex items-center justify-center relative"
                aria-label={open ? 'Close contact options' : 'Contact us'}
                aria-expanded={open}
            >
                {!open && (
                    <span className="absolute right-full mr-4 bg-white text-[#1e4186] px-4 py-2 rounded-xl shadow-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border border-gray-100">
                        Need Help? Get in touch!
                    </span>
                )}
                <div className={`absolute inset-0 bg-[#25d366] rounded-full blur-md transition-all ${open ? 'opacity-20' : 'opacity-40 group-hover:opacity-60 animate-pulse'}`}></div>
                <div className={`relative text-white p-4 rounded-full shadow-2xl transform transition-all group-hover:scale-110 group-active:scale-95 flex items-center justify-center ${open ? 'bg-gradient-to-br from-gray-500 to-gray-700 rotate-45' : 'bg-gradient-to-br from-[#25d366] to-[#128c7e]'}`}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        )}
                    </svg>
                </div>
            </button>
        </div>
    );
}
