import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const MyAttempted = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState(null);
    const [submissions, setSubmission] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { data } = await axios.get(`https://server-omega-ten-52.vercel.app/assignment-submissions?email=${user?.email}`, { withCredentials: true })
                const { data } = await axiosSecure.get(`/assignment-submissions?email=${user?.email}`)
                setSubmission(data)
                console.log(data)
            } catch (error) {
                setError(error)
                console.log(error)
            }
        }
        if (user?.email) {
            fetchData();
        }
    }, [user?.email])

    // if (error) return <p>{error}</p>

    return (
        <div className="overflow-x-auto my-10 w-11/12 mx-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Assignment Title</th>
                        <th>Status</th>
                        <th>Assignment Marks</th>
                        <th>My Marks</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        submissions.map((submission, idx) => <tr key={submission._id}>
                            <th>{idx + 1}</th>
                            <td>{submission.title}</td>
                            <td>{submission.status}</td>
                            <td>{submission.marks}</td>
                            <td>{submission.my_marks ? submission.my_marks : 'N/A'}</td>
                            <td>{submission.feedback ? submission.feedback : 'N/A'}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyAttempted;