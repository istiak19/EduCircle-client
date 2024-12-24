import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Card = ({ assignment }) => {
    const { _id, title, marks, image, level, email } = assignment
    const { user } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleDelete = async (id, email) => {
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

        try {
            const { data } = await axios.delete(`http://localhost:5000/assignment/${id}`)
            console.log(data)
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "Want to delete your assignment?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your assignment has been deleted.",
                        icon: "success"
                    });
                    queryClient.invalidateQueries(['assignments'])
                });
            }
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