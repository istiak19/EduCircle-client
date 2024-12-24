import axios from "axios";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Assignments from "./Assignments";

const SubmissionForm = () => {
    const { user } = useAuth()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const link = form.get('link');
        const note = form.get('note');
        const formData = { assignment_id: id, link, note, submitted_email: user?.email, status: 'pending' }
        console.log(formData)
        try {
            const { data } = await axios.post('http://localhost:5000/assignment-submissions', formData)
            console.log(data)
            if (data.insertedId) {
                Swal.fire({
                    title: "Your assignment has been successfully submitted!",
                    icon: "success",
                    draggable: true
                });
                e.target.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-lg my-10 mx-auto p-5 shadow-lg border rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Submit Assignment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="googleDocsLink"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Google Docs Link <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        placeholder="https://docs.google.com/document/d/..."
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="quickNote"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Quick Note
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        placeholder="Write a quick note about your submission..."
                        className="textarea textarea-bordered w-full"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn bg-[#3F9CFF] text-white font-medium w-full hover:bg-blue-400"
                >
                    Submit Assignment
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;