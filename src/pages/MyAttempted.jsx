import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import axios from "axios";

const MyAttempted = () => {
    const { user } = useAuth()
    const [submissions, setSubmission] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/assignment-submissions?email=${user?.email}`)
                setSubmission(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (user?.email) {
            fetchData();
        }
    }, [user?.email])

    return (
        <div className="overflow-x-auto my-10">
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Marks</th>
                        <th>My marks</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        submissions.map((submission, idx) => <tr>
                            <th>{idx+1}</th>
                            <td>{submission.title}</td>
                            <td>{submission.status}</td>
                            <td>{submission.marks}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyAttempted;