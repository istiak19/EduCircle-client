import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";

const PendingAssignments = () => {
    const { user } = useAuth()
    const [error, setError] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    
    const { data: submissions, isError, isLoading } = useQuery({
        queryKey: ['submission'], queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/assignment-submissions');
            return data;
        }
    })

    if (isLoading) return <Loading></Loading>

    if (isError) console.log(isError);

    const handleGiveMark = (info) => {
        if (info.submitted_email === user?.email) {
            Swal.fire({
                title: "You can't mark your own assignment!",
                icon: "error",
                draggable: true
            });
            return;
        }
        setSelectedSubmission(info)
    }

    const handleExaminer = e => {
        e.preventDefault()
        const form = new FormData(e.target);
        const my_marks = form.get('my_marks');
        const feedback = form.get('feedback');
        const update = { my_marks, feedback, status: 'completed' }
        console.log(update)
    }


    return (
        <div className="overflow-x-auto my-10">
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Assignment Title</th>
                        <th>Status</th>
                        <th>Assignment Marks</th>
                        <th>Examinee Name</th>
                        <th>Feedback</th>
                        <th>Action</th>
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
                            <td>
                                <button onClick={() => handleGiveMark(submission)} className="btn bg-[#3F9CFF] text-white font-medium">Give Mark</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            {/* Modal */}
            {
                selectedSubmission && <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl">Give Marks for {selectedSubmission.title}</h3>
                        <p className="mt-2">
                            <span className="font-bold">Assignment Link:</span>{" "}
                            <a
                                href={selectedSubmission.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                View Google Docs
                            </a>
                        </p>
                        <p className="mt-2 text-xs"><span className="font-bold">Note: </span>{selectedSubmission.note}</p>
                        <form className="mt-4" onSubmit={handleExaminer}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Marks</span>
                                </label>
                                <input
                                    type="number"
                                    name="my_marks"
                                    className="input input-bordered"
                                    placeholder="Enter marks"
                                    required
                                />
                            </div>
                            <div className="form-control mt-2">
                                <label className="label">
                                    <span className="label-text">Feedback</span>
                                </label>
                                <textarea
                                    name="feedback"
                                    className="textarea textarea-bordered"
                                    placeholder="Enter feedback"
                                    required
                                ></textarea>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn text-white bg-[#3F9CFF]">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn text-white btn-error"
                                    onClick={() => setSelectedSubmission(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default PendingAssignments;