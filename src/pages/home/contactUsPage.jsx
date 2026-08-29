import { useState } from "react";
import axios from "axios";
import { 
  FaLocationDot, 
  FaPhoneVolume, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaCircleCheck,
  FaCopy
} from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState(null); // Reference number Popup එක සඳහා

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/inquiries",
        formData
      );

      // Backend එකෙන් ලැබෙන ticket අංකය State එකට ගැනීම
      const generatedTicket = response.data.inquiryId || "INQ00000001";
      setTicketData({
        id: generatedTicket,
        name: formData.name,
        email: formData.email,
      });

      toast.success("පණිවිඩය සාර්ථකව යොමු කරන ලදී!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error.response?.data?.message || "පණිවිඩය යැවීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTicketId = () => {
    if (ticketData?.id) {
      navigator.clipboard.writeText(ticketData.id);
      toast.success("Reference ID පිටපත් කරගන්නා ලදී!");
    }
  };

  return (
    <div className="w-full min-h-full bg-gray-50 py-12 px-6 lg:px-20 relative">
      {/* Reference Ticket Success Modal */}
      {ticketData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center relative">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              <FaCircleCheck />
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-1">Thank You!</h3>
            <p className="text-gray-500 text-sm mb-6">
              ආයුබෝවන් <span className="font-semibold text-gray-700">{ticketData.name}</span>, ඔබගේ පණිවිඩය සාර්ථකව ලැබුණි.
            </p>

            {/* Ticket Card */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 mb-6">
              <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-1">
                Your Reference / Ticket ID
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-extrabold text-accent tracking-wide">
                  {ticketData.id}
                </span>
                <button
                  onClick={copyTicketId}
                  className="p-2 hover:bg-white rounded-lg text-accent transition cursor-pointer shadow-sm"
                  title="Copy ID"
                >
                  <FaCopy />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">
                අනාගත විමසීම් සඳහා මෙම අංකය ළඟ තබා ගන්න. තහවුරු කිරීමේ පණිවිඩයක් {ticketData.email} වෙත යවා ඇත.
              </p>
            </div>

            <button
              onClick={() => setTicketData(null)}
              className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition shadow-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-accent text-xs font-bold tracking-wider uppercase">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-3 mb-4">
          Contact iComputers
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          පරිගණක අමතර කොටස්, මිලදී ගැනීම් හෝ තාක්ෂණික සහාය පිළිබඳ ඕනෑම ගැටලුවක් සඳහා අප අමතන්න.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information Cards */}
        <div className="flex flex-col gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent flex items-center justify-center text-xl shrink-0">
              <FaLocationDot />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Our Location</h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                123 Galle Road, Colombo 03, Sri Lanka.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent flex items-center justify-center text-xl shrink-0">
              <FaPhoneVolume />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Call Us</h3>
              <p className="text-gray-500 text-sm mt-1">+94 11 234 5678</p>
              <p className="text-gray-500 text-sm">+94 77 123 4567</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent flex items-center justify-center text-xl shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Email Us</h3>
              <p className="text-gray-500 text-sm mt-1">support@icomputers.lk</p>
              <p className="text-gray-500 text-sm">sales@icomputers.lk</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent flex items-center justify-center text-xl shrink-0">
              <FaClock />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">Working Hours</h3>
              <p className="text-gray-500 text-sm mt-1">Mon - Sat: 9.00 AM - 7.00 PM</p>
              <p className="text-gray-500 text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Inquiry about Warranty / Product availability"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Write your message here..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 w-full md:w-auto self-start px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <FaPaperPlane className="text-sm" />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}