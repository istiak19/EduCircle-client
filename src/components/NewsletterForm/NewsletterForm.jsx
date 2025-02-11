import { useState } from "react";
import { toast } from "react-toastify";
import { FiMail } from "react-icons/fi";
import useAuth from "../../Hook/useAuth";

const NewsletterForm = () => {
    const { isDarkMode } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("❌ Please enter a valid email address!");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            toast.success("✅ Subscribed successfully! 🎉");
            setEmail("");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className={`mb-16 p-8 rounded-xl shadow-xl max-w-6xl mx-auto text-center transition-all duration-300 
            ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-300 to-indigo-400 text-gray-900"}`}
        >
            <h2 className="text-3xl font-extrabold mb-3">
                📢 Stay Updated with <span className={isDarkMode ? "text-blue-400" : "text-blue-700"}>EduCircle!</span>
            </h2>
            <p className="mb-5 text-gray-200">
                Subscribe to receive the latest updates, exclusive content, and educational insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full">
                    <FiMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors 
                        ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} size={20}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:ring-2 transition-all duration-300
                            ${isDarkMode ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-400" : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-300
                        ${loading ? "bg-gray-400 cursor-not-allowed" : isDarkMode ? "bg-blue-500 hover:bg-blue-400" : "bg-blue-600 hover:bg-blue-500"}`}
                    disabled={loading}
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
        </div>
    );
};

export default NewsletterForm;