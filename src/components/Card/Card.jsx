import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Card = ({ assignment, setAssignments }) => {
    const { _id, title, marks, image, level, email } = assignment
    const { user } = useAuth()
    console.log(user?.email)
    const queryClient = useQueryClient()

    const handleDelete = async (id, email) => {
        if (email !== user?.email) {
            toast.error("You can't delete this assignment !.")
            return;
        }
        console.log(id, email)
        try {
            const { data } = await axios.delete(`http://localhost:5000/assignment/${id}`)
            console.log(data)
            queryClient.invalidateQueries(['assignments'])
        } catch (error) {
            console.log(error)
        }
    }

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
                    <button onClick={() => handleDelete(_id, email)} className="btn text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">Delete</button>
                    <button className="btn text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">Update</button>
                    <Link to={`/details/${_id}`} className="btn text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">View assignment</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;