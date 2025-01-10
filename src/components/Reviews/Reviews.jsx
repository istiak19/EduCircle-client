import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hook/useAuth";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { isDarkMode } = useAuth()

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        fetch("./reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);
    return (
        <div className="my-10">
            <h2 className={`text-3xl font-bold text-center pb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>User Reviews</h2>
            <div className="scroll-wrapper">
                <div className="scroll-container">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className={`scroll-card border border-[#3F9CFF] rounded-lg p-4 shadow-lg ${isDarkMode ? 'bg-[#1D232A]' : 'bg-white'}`}
                            data-aos="fade-right"
                        >
                            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{review.userName}</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-black'} `}>{review.reviewText}</p>
                        </div>
                    ))}
                    {
                        reviews.map((review, idx) => (
                            <div
                                key={`duplicate-${idx}`}
                                className={`scroll-card border border-[#3F9CFF] rounded-lg p-4 shadow-lg ${isDarkMode ? 'bg-[#1D232A]' : 'bg-white'}`}
                                data-aos="fade-right"
                            >
                                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{review.userName}</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-black'} `}>{review.reviewText}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Reviews;