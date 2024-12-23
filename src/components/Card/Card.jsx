import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Card = ({ assignment }) => {
    const { _id, title, marks, image, level, email } = assignment
    const { user } = useAuth()
    const navigate = useNavigate()
    console.log(user?.email)
    const queryClient = useQueryClient()

    const handleDelete = async (id, email) => {
        console.log('delete---->', id, email)
        if (email !== user?.email) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "You are not authorized to delete this assignment!",
                showConfirmButton: false,
                timer: 1500
            });
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

    const handleUpdateRedirecting = (id, email) => {
        if (email !== user?.email) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "You are not authorized to update this assignment!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        navigate(`/update/${id}`)
        console.log('update---->', id, email)
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
                    <button onClick={() => handleUpdateRedirecting(_id, email)} className="btn text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">Update</button>
                    <Link to={`/details/${_id}`} className="btn text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">View assignment</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;