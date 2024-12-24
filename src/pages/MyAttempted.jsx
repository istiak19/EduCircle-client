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
                            <td>{submission.my_marks ? submission.my_marks === null : 'N/A'}</td>
                            <td>{submission.feedback ? submission.feedback === null : 'N/A'}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyAttempted;