import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuth from "../Hook/useAuth";

const FAQ = () => {
    const { isDarkMode } = useAuth()
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className='my-14'>
            <div className='my-5 flex justify-center'>
                <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-4xl font-bold`} data-aos="flip-left">Frequently Asked <span className='text-[#3F9CFF]'>Questions</span></h2>
            </div>
            <div className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'} hero`}>
                <div className="hero-content flex-col gap-5 lg:flex-row">
                    <div className="max-w-md p-3 border-[#3f9cff57] rounded-2xl border border-[#3F9CFF] shadow-2xl">
                        <img
                            src="https://i.ibb.co.com/NTsVtmv/faq-concept-23-2148147094.jpg"
                            className="rounded-lg" />
                    </div>
                    <div>
                        <div className="collapse collapse-arrow shadow-lg border border-[#3f9cff57]">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">What is Educircle?</div>
                            <div className="collapse-content">
                                <p>Educircle is an online platform that allows users to collaborate in group studies by creating, completing, and grading assignments.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow  mt-5 shadow-lg border border-[#3f9cff57]">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">How do I register for Educircle?</div>
                            <div className="collapse-content">
                                <p>Click on the 'Register' button on the homepage to create an account. After registering, you can log in to access all features.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow  mt-5 shadow-lg border border-[#3f9cff57]">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">Can I grade my friends' assignments?</div>
                            <div className="collapse-content">
                                <p>Yes, all registered users are connected as friends. You can grade assignments created by your friends.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow mt-5 shadow-lg border border-[#3f9cff57]">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">Is there a deadline for assignments?</div>
                            <div className="collapse-content">
                                <p>Yes, assignment creators set deadlines when creating assignments. Ensure you complete and submit your assignments before the deadline.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;