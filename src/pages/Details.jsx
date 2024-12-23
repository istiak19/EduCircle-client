import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from 'date-fns';
import { useLoaderData } from "react-router-dom";

const Details = () => {
    //     const {data}=useQuery({queryKey: ['assignments'],  queryFn:async()=>{
    // const {data}=await axios.get()
    // }})
    const assignment = useLoaderData()
    const { _id, title, description, marks, image, deadline, level, email, name } = assignment

    return (
        <div className="card my-16 max-w-3xl p-5 mx-auto space-y-4 border shadow-xl">
            <figure>
                <img className="w-full rounded-xl border border-[#3F9CFF]"
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="space-y-3">
                <h2 className="card-title">Title: {title}</h2>
                <p><span className="font-bold">Description: </span>{description}</p>
                <p><span className="font-bold">Marks: </span>{marks}</p>
                <p><span className="font-bold">Difficulty level: </span>{level}</p>
                <p><span className="font-bold">Deadline: </span>{deadline ? format(new Date(deadline), 'P') : 'N/A'}</p>
                <div className="card-actions">
                    <button className="btn w-full text-white hover:text-black text-xs bg-[#3F9CFF] hover:bg-[#3f9cff7d]">Take assignment</button>
                </div>
            </div>
        </div>
    );
};

export default Details;