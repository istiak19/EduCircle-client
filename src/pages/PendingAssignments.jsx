import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";
import { useState } from "react";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosSecure";

const PendingAssignments = () => {
    const { user, isDarkMode } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: submissions, isError, isLoading } = useQuery({
        queryKey: ['submission', selectedSubmission], queryFn: async () => {
            const { data } = await axiosSecure.get('/assignment-submissions');
            return data.filter(submission => submission?.status !== "completed");
        }
    })

    if (isLoading) return <Loading></Loading>

    if (isError) return <p className="mt-5 flex justify-center items-center text-red-600 text-5xl">Error Loading Submissions</p>;

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

    const handleExaminer = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const my_marks = form.get('my_marks');
        const feedback = form.get('feedback');
        if (parseInt(my_marks) > parseInt(selectedSubmission.marks)) {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Marks cannot exceed the assignment total!',
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }
        const updateInfo = { my_marks, feedback, status: 'completed' }
        const id = selectedSubmission._id;
        try {
            const { data } = await axiosSecure.put(`https://server-omega-ten-52.vercel.app/assignment-submission/${id}`, updateInfo)
            // console.log(data)
            if (data.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Assignment evaluated successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });
                setSelectedSubmission(null)
            }
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <div className="overflow-x-auto my-10 w-11/12 mx-auto">
            <table className={`table ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <thead>
                    <tr className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
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
                            <td>{submission.examinee_name}</td>
                            <td>{submission.feedback ? submission.feedback : 'N/A'}</td>
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