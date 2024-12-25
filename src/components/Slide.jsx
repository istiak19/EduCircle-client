import { Link } from "react-router-dom";

const Slide = ({ text, image }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[700px]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full'>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold text-[#3F9CFF] lg:text-4xl'>
                        {text}
                    </h1>
                    <br />
                    <Link
                        to='/CreateAssignments'
                        className='w-full px-5 py-4 mt-4 text-sm font-medium text-white bg-[#3F9CFF] rounded-full lg:w-auto hover:bg-blue-400'
                    >
                       Create Assignments & Hire Expert
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slide;