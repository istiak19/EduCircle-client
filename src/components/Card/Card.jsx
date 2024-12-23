import { Link } from "react-router-dom";

const Card = ({ assignment }) => {
    const { _id, title, marks, image, level } = assignment
    return (
        <div className="card border border-[#3F9CFF]shadow-xl p-4 space-y-4">
            <figure>
                <img className="h-64 rounded-xl"
                    src={image}
                    alt="Assignment Image" />
            </figure>
            <div className="space-y-2">
                <h2 className="card-title">{title}</h2>
                <p><span className="font-bold">Marks: </span>{marks}</p>
                <p><span className="font-bold">Difficulty level: </span>{level}</p>
                <div className="card-actions justify-between">
                    <button className="btn text-white hover:text-black text-xs bg-[#3F9CFF] hover:bg-[#3f9cff7d]">Delete</button>
                    <button className="btn text-white hover:text-black text-xs bg-[#3F9CFF] hover:bg-[#3f9cff7d]">Update</button>
                    <Link to={`/details/${_id}`} className="btn text-white hover:text-black text-xs bg-[#3F9CFF] hover:bg-[#3f9cff7d]">View assignment</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;