import { FaArrowLeft } from "react-icons/fa6";
import error from "../assets/error.jpg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="bg-blue-500 px-4 md:px-20 lg:px-60">
            <div className="container min-h-screen px-6 py-12 mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-12">
                {/* Text Content */}
                <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold">Oops!</h1>
                    <p className="mt-4 text-lg">Sorry, an unexpected error has occurred.</p>
                    <p className="mt-4 text-sm">
                        Sorry, the page you are looking for doesn't exist. Here are some helpful links:
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="btn border-none text-white text-sm tracking-wide font-semibold bg-blue-700 rounded-lg inline-flex items-center gap-2 hover:bg-blue-600 hover:scale-105 transition-transform"
                        >
                            <FaArrowLeft /> Take Me Home
                        </Link>
                    </div>
                </div>
                {/* Image Section */}
                <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
                    <img
                        className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover"
                        src={error}
                        alt="Error Page"
                    />
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;