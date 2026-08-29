// src/pages/admin/inquiriesDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaTrashCan, 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaClock, 
  FaTicket, 
  FaArrowRotateRight,
  FaPaperPlane
} from "react-icons/fa6";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/lodingAnimation";

export default function InquiriesDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  
  // Reply State
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  const fetchInquiries = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_API_URL + "/inquiries", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const data = res.data.inquiries || [];
        setInquiries(data);
        if (data.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Inquiries Error:", err);
        toast.error("පණිවිඩ ලබා ගැනීමට නොහැකි විය.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenMessage = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyText(""); // Clear reply input
    if (!inquiry.isRead) {
      const token = localStorage.getItem("token");
      axios
        .put(
          import.meta.env.VITE_API_URL + `/inquiries/${inquiry._id}/read`,
          {},
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
          setInquiries((prev) =>
            prev.map((item) =>
              item._id === inquiry._id ? { ...item, isRead: true } : item
            )
          );
        })
        .catch(console.error);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error("කරුණාකර Reply පණිවිඩය ඇතුළත් කරන්න.");
      return;
    }

    setIsSendingReply(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/inquiries/${selectedInquiry._id}/reply`,
        { replyMessage: replyText },
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success(response.data.message || "Reply එක පාරිභෝගිකයාට යවන ලදී!");
      setReplyText("");
      
      // Update local inquiry status to Resolved
      setInquiries((prev) =>
        prev.map((item) =>
          item._id === selectedInquiry._id ? { ...item, status: "Resolved", isRead: true } : item
        )
      );
    } catch (error) {
      console.error("Reply sending failed:", error);
      toast.error(error.response?.data?.message || "Reply යැවීමට නොහැකි විය.");
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (!window.confirm("මෙම පණිවිඩය මකා දැමීමට අවශ්‍යද?")) return;

    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_API_URL + `/inquiries/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("පණිවිඩය සාර්ථකව ඉවත් කරන ලදී.");
        const updated = inquiries.filter((item) => item._id !== id);
        setInquiries(updated);
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(updated.length > 0 ? updated[0] : null);
        }
      })
      .catch((err) => {
        toast.error("Error deleting inquiry: " + err.message);
      });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100 p-6 md:p-8 rounded-2xl flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-5 mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaEnvelope className="text-indigo-600 text-2xl" />
            Messages & Support Tickets
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Customer inquiries and tickets from Contact Us page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-semibold text-sm">
            Total: {inquiries.length} | Unread: {inquiries.filter((i) => !i.isRead).length}
          </div>
          <button
            onClick={fetchInquiries}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition cursor-pointer"
            title="Refresh"
          >
            <FaArrowRotateRight />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <LoadingAnimation />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex-1 bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-200 flex flex-col items-center justify-center">
          <FaEnvelopeOpen className="text-5xl text-gray-300 mb-3" />
          <p className="text-lg font-medium text-gray-600">පාරිභෝගික පණිවිඩ කිසිවක් හමු නොවීය.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Message List Panel */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[650px]">
            <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm flex justify-between items-center">
              <span>Inbox</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                {inquiries.filter((i) => !i.isRead).length} New
              </span>
            </div>

            <div className="overflow-y-auto divide-y divide-gray-100 flex-1">
              {inquiries.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleOpenMessage(item)}
                  className={`p-4 cursor-pointer transition flex items-start gap-3 hover:bg-indigo-50/60 ${
                    selectedInquiry?._id === item._id
                      ? "bg-indigo-50/80 border-l-4 border-indigo-600"
                      : item.isRead
                      ? "bg-white"
                      : "bg-blue-50/40 font-semibold"
                  }`}
                >
                  <div className="text-indigo-600 mt-1 text-base shrink-0">
                    {item.isRead ? (
                      <FaEnvelopeOpen className="text-gray-400" />
                    ) : (
                      <FaEnvelope className="text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-gray-800 font-semibold truncate">{item.name}</p>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded font-mono font-bold">
                        {item.inquiryId || "INQ"}
                      </span>
                      <p className="text-xs text-gray-700 font-medium truncate">{item.subject}</p>
                    </div>

                    <p className="text-xs text-gray-400 truncate">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail & Direct Reply View Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-[650px] overflow-y-auto">
            {selectedInquiry ? (
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  {/* Top Bar: Subject & Delete */}
                  <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-lg font-mono flex items-center gap-1">
                          <FaTicket className="text-[10px]" />
                          {selectedInquiry.inquiryId}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FaClock />
                          {new Date(selectedInquiry.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {selectedInquiry.subject || "General Inquiry"}
                      </h2>
                    </div>

                    <button
                      onClick={(e) => handleDelete(selectedInquiry._id, e)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                      title="Delete Message"
                    >
                      <FaTrashCan />
                    </button>
                  </div>

                  {/* Sender Info */}
                  <div className="py-3 border-b border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400">From: </span>
                      <span className="font-bold text-gray-800">{selectedInquiry.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Email: </span>
                      <span className="font-medium text-indigo-600">{selectedInquiry.email}</span>
                    </div>
                  </div>

                  {/* Customer Message Body */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Customer Inquiry
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 text-gray-700 text-sm leading-relaxed border border-gray-100 whitespace-pre-wrap max-h-[140px] overflow-y-auto">
                      {selectedInquiry.message}
                    </div>
                  </div>
                </div>

                {/* Direct Reply Form (In-App) */}
                <form onSubmit={handleSendReply} className="pt-3 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Send Direct Reply to {selectedInquiry.name}
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response to the customer here..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={isSendingReply}
                      className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-semibold transition shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      <FaPaperPlane className="text-xs" />
                      <span>{isSendingReply ? "Sending Reply..." : "Send Email Reply"}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FaEnvelope className="text-5xl mb-3 text-gray-300" />
                <p>වම් පසින් පණිවිඩයක් තෝරන්න.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}