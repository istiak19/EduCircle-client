import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import Card from "../components/Card/Card";

const Assignments = () => {
    const { data: assignments, isError, isLoading } = useQuery({
        queryKey: ['assignments'], queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/assignments')
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    if (isError) console.log(isError);
    console.log(assignments)
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
                {
                    assignments.map(assignment => <Card key={assignment._id} assignment={assignment}></Card>)
                }
            </div>
        </div>
    );
};

export default Assignments;