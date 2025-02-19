import { Link } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const Slide = ({ text, image, overlayImage }) => {
    const { isDarkMode } = useAuth();

    return (
        <div className='relative w-full h-[400px] bg-center bg-cover' style={{ backgroundImage: `url(${image})` }}>
            {/* Overlay */}
            <div className={`absolute inset-0 ${isDarkMode ? "bg-black opacity-70" : "bg-black opacity-60"}`}></div>

            {/* Overlay Image */}
            {overlayImage && (
                <img
                    src={overlayImage}
                    alt="Overlay"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
            )}

            {/* Content */}
            <div className='relative flex items-center justify-center w-full h-full'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-[#3F9CFF] lg:text-4xl'>{text}</h1>
                    <br />
                    <Link
                        to='/CreateAssignments'
                        className='w-full px-5 py-4 mt-4 text-sm font-medium text-white border-2 border-[#3F9CFF] rounded-full lg:w-auto hover:bg-blue-400'
                    >
                        Create Assignments & Hire Expert
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slide;