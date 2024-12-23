import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";

const Features = () => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        fetch("./features.json")
            .then((res) => res.json())
            .then((data) => setFeatures(data));
    }, []);

    return (
        <div className="w-11/12 mx-auto my-10">
            <div className="App">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Key Features{" "}
                    <span style={{ color: "#3F9CFF" }}>
                        <Typewriter
                            words={[
                                "Collaborative Group Study",
                                "Assignment Management",
                                "Real-Time Notifications",
                                "FAQ and Help",
                                "User-Friendly Interface",
                                "Performance Tracking !"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="border border-[#3F9CFF] rounded-lg p-4 text-center shadow-md"
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
                ))}
            </div>
        </div>
    );
};

export default Features;