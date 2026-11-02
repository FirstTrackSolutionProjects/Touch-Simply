import { useState } from "react";
import { Link } from "react-router-dom";
import { LifeBuoy, Send, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const TicketCategory = ({ name, icon: Icon, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
      isSelected ? "border-brand-secondary bg-brand-secondary/10 shadow-inner" : "border-neutral-border hover:border-brand-secondary/50 hover:bg-neutral-bg"
    }`}
  >
    <div className={`p-2 rounded-full ${isSelected ? 'bg-brand-secondary/20 text-brand-secondary' : 'bg-neutral-bg text-neutral-text-secondary'}`}>
      <Icon size={22} />
    </div>
    <span className={`text-sm font-semibold ${isSelected ? "text-brand-secondary" : "text-neutral-text-primary"}`}>{name}</span>
  </button>
);

const SupportPage = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { name: "Account & Login", icon: LifeBuoy },
    { name: "Payments & Coins", icon: LifeBuoy },
    { name: "Bug Report", icon: LifeBuoy },
    { name: "Feature Request", icon: LifeBuoy },
    { name: "Other", icon: LifeBuoy },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !subject.trim() || !description.trim()) {
      toast.error("Please select a category and fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast.success("Your support ticket has been created!");
    } catch (error) {
      toast.error("Failed to submit ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-neutral-border">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-text-primary mt-4">Ticket Submitted!</h1>
          <p className="text-neutral-text-secondary mt-2">We've received your request. Our support team will get back to you shortly at <span className="font-semibold text-neutral-text-primary">{user?.email}</span>.</p>
          <Link to="/dashboard" className="mt-8 inline-block w-full bg-brand-secondary text-white font-semibold py-3 rounded-xl hover:bg-brand-secondary-dark transition-colors">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-bg via-brand-secondary/5 to-brand-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-text-secondary hover:text-brand-secondary mb-4"><ChevronLeft size={16} /> Back to Dashboard</Link>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-text-primary">Support Center</h1>
            <p className="mt-2 text-md text-neutral-text-secondary">How can we help you today? Submit a ticket below.</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-neutral-border/60">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-base font-semibold text-neutral-text-primary">1. Select a Topic</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
                {categories.map(c => (
                  <TicketCategory key={c.name} name={c.name} icon={c.icon} isSelected={category === c.name} onClick={() => setCategory(c.name)} />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-base font-semibold text-neutral-text-primary">2. Subject</label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="A short summary of your issue"
                className="mt-2 w-full rounded-xl border border-neutral-border px-4 py-3 outline-none transition focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="text-base font-semibold text-neutral-text-primary">3. Describe Your Issue</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide as much detail as possible..."
                rows={6}
                className="mt-2 w-full rounded-xl border border-neutral-border px-4 py-3 outline-none transition focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20 resize-y"
                maxLength={1000}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-secondary to-brand-primary text-white font-semibold py-3.5 rounded-xl hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-secondary/20"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              {submitting ? "Submitting Ticket..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
