import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";
import './feature.css';
import useAuth from "../Hook/useAuth";

const Features = () => {
    const [features, setFeatures] = useState([]);
    const { isDarkMode } = useAuth()

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        fetch("./features.json")
            .then((res) => res.json())
            .then((data) => setFeatures(data));
    }, []);

    return (
        <div className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'text-gray-800'}`}>
            <div className="App">
                <h1 className="text-3xl font-bold text-center pt-8 mb-6">
                    Key Features{" "}
                    <span style={{ color: "#3F9CFF" }}>
                        <Typewriter
                            words={[
                                "👥 Collaborative Study Groups",
                                "📂 Easy Assignment Creation & Submission",
                                "📊 Performance Analytics & Tracking",
                                "🔔 Real-Time Updates & Notifications",
                                "💡 Peer Grading System for Engagement",
                                "📖 Comprehensive FAQ",
                                "🎨 Intuitive User Interface for Seamless Experience",
                            ]}
                            loop={5}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </h1>
            </div>
            <div className="scroll-wrapper">
                <div className="scroll-container">
                    {
                        features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`scroll-card border shadow-[0px_10px_30px_rgba(63,156,255,0.3)] border-[#3F9CFF] rounded-lg p-4 transition-transform duration-300 hover:shadow-[0px_15px_40px_rgba(63,156,255,0.5)] hover:scale-105 ${isDarkMode ? 'bg-[#1D232A]' : 'bg-white'}`}
                                data-aos="fade-right"
                            >
                                <img
                                    src={feature.icon}
                                    alt="Feature"
                                    className="w-20 h-20 mx-auto mb-3 rounded-md"
                                />
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))
                    }
                    {
                        features.map((feature, idx) => (
                            <div
                                key={`duplicate-${idx}`}
                                className={`scroll-card border border-[#3F9CFF] rounded-lg p-4 shadow-[0px_10px_30px_rgba(63,156,255,0.3)] transition-transform duration-300 hover:shadow-[0px_15px_40px_rgba(63,156,255,0.5)] hover:scale-105 ${isDarkMode ? 'bg-[#1D232A]' : 'bg-white'}`}
                                data-aos="fade-right"
                            >
                                <img
                                    src={feature.icon}
                                    alt="Feature"
                                    className="w-20 h-20 mx-auto mb-3 rounded-md"
                                />
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Features;