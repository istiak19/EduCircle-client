import { FaArrowLeftLong } from "react-icons/fa6";
import error from '../assets/404error.png'
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className='bg-white max-w-6xl mx-auto'>
            <div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
                <div className='wf-ull lg:w-1/2'>
                    <h1>Oops!</h1>
                    <p className='mt-4'>Sorry, an unexpected error has occurred.</p>
                    <p className='mt-4'>
                        Sorry, the page you are looking for doesn't exist.Here are some
                        helpful links:
                    </p>

                    <div className='flex items-center mt-6 gap-x-3'>
                        <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 '>
                            <FaArrowLeftLong />
                            <span>Go back</span>
                        </button>

                        <Link
                            to='/'
                            className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gray-500 rounded-lg shrink-0 sm:w-auto hover:bg-gray-600'
                        >
                            Take me home page
                        </Link>
                    </div>
                </div>

                <div className='relative w-full mt-8 lg:w-1/2 lg:mt-0'>
                    <img
                        className=' w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover '
                        src={error}
                        alt='Error Page'
                    />
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;