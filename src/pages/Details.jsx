import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from 'date-fns';
import { Link, useLoaderData, useParams } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Loading from "../components/Loading/Loading";

const Details = () => {
    const { isDarkMode } = useAuth()
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    // console.log(id)
    const { data: assignment, isLoading, isError } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignment/${id}`);
            return data;
        },
    });

    if (isLoading) return <Loading></Loading>
    // console.log(assignment)

    return (
        <div className={`card my-16 max-w-3xl p-5 mx-auto space-y-4 border shadow-xl ${isDarkMode ? 'bg-[#1D232A] text-white border-gray-500' : 'bg-white text-gray-800'}`}>
            <figure>
                <img className="w-full rounded-xl border border-[#3F9CFF]"
                    src={assignment?.image}
                    alt="Shoes" />
            </figure>
            <div className="space-y-3">
                <h2 className="card-title">Title: {assignment?.title}</h2>
                <p><span className="font-bold">Description: </span>{assignment?.description}</p>
                <p><span className="font-bold">Marks: </span>{assignment?.marks}</p>
                <p><span className="font-bold">Difficulty level: </span>{assignment?.level}</p>
                <p><span className="font-bold">Deadline: </span>{assignment?.deadline ? format(new Date(assignment?.deadline), 'P') : 'N/A'}</p>
                <div className="card-actions">
                    <Link to={`/take-assignment/${assignment?._id}`} className="btn w-full text-white text-xs bg-[#3F9CFF] hover:bg-blue-400">Take assignment</Link>
                </div>
            </div>
        </div>
    );
};

export default Details;