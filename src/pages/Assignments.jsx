import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import Card from "../components/Card/Card";
import { useState } from "react";
import useAuth from "../Hook/useAuth";
import { Helmet } from "react-helmet";

const Assignments = () => {
    const { isDarkMode } = useAuth();
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    const { data: assignments, isError, isLoading } = useQuery({
        queryKey: ['assignments', filter, search],
        queryFn: async () => {
            const { data } = await axios.get(`https://server-omega-ten-52.vercel.app/assignments?filter=${filter}&search=${search}`);
            return data;
        }
    });

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    if (isError) console.log(isError);

    const handleReset = () => {
        setFilter('');
        setSearch('');
    };

    return (
        <div className={`w-11/12 mx-auto`}>
            <Helmet>
                <title>Assignment - EduCircle</title>
            </Helmet>
            {/* Filters and Search */}
            <div className={`flex flex-col md:flex-row justify-center items-center gap-5 my-8`}>
                <select
                    name="level"
                    id="level"
                    onChange={(e) => setFilter(e.target.value)}
                    className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'} border p-3 rounded-lg`}
                    value={filter}
                >
                    <option value="">Filter By Difficulty Level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                {/* Search */}
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                        placeholder="Search"
                        value={search}
                    />
                </label>

                <div>
                    <button onClick={handleReset} className="btn bg-[#3F9CFF] text-white font-medium px-8">All Reset</button>
                </div>
            </div>

            {/* Assignments card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {assignments?.map((assignment) => (
                    <Card key={assignment._id} assignment={assignment}></Card>
                ))}
            </div>
        </div>
    );
};

export default Assignments;