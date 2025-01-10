import { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user, isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const title = form.get('title');
        const description = form.get('description');
        const marks = form.get('marks');
        const image = form.get('image');
        const deadline = startDate;
        const level = form.get('level');
        const email = user?.email;
        const name = user?.displayName;
        if (!title || typeof title !== 'string' || title.trim() === "" || !/^[A-Za-z\s]+$/.test(title)) {
            Swal.fire({
                title: "Title should only contain letters and spaces!",
                icon: "error",
                draggable: true
            });
            return;
        }
        if (!description || description.trim() === "" || typeof description !== 'string' || !/^[A-Za-z0-9\s!.,?'-]+$/.test(description)) {
            Swal.fire({
                title: "Description should contain only letters, numbers and valid special characters!",
                icon: "error",
                draggable: true
            });
            return;
        }
        if (!marks || isNaN(marks) || marks <= 0) {
            Swal.fire({
                title: "Marks should be a valid positive number greater than 0!",
                icon: "error",
                draggable: true
            });
            return;
        }
        const urlPattern = /^https?:\/\/[^\s]+$/;
        if (!image || !urlPattern.test(image)) {
            Swal.fire({
                title: "Please enter a valid image URL!",
                icon: "error",
                draggable: true
            });
            return;
        }
        if (deadline <= new Date()) {
            Swal.fire({
                title: "Due date should be in the future!",
                icon: "error",
                draggable: true
            });
            return;
        }

        const newAssignment = { title, description, marks, image, deadline, level, email, name };

        try {
            const { data } = await axiosSecure.post('/assignments', newAssignment);
            if (data.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Assignment created successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });
                e.target.reset();
                navigate('/assignments');
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}>
            <Helmet>
                <title>CreateAssignment - EduCircle</title>
            </Helmet>
            <form
                onSubmit={handleSubmit}
                className={`max-w-2xl my-20 mx-auto border shadow-lg p-6 rounded-xl space-y-4 ${isDarkMode ? 'bg-[#2E353D]' : 'bg-white'}`}
            >
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Create Assignment</h2>
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                        placeholder="Enter assignment title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className={`textarea textarea-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                        placeholder="Enter assignment description"
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="marks" className="block text-sm font-medium mb-2">
                        Marks
                    </label>
                    <input
                        type="number"
                        name="marks"
                        className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                        placeholder="Enter assignment marks"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium mb-2">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="image"
                        className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 justify-between w-full items-center gap-4">
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                            Difficulty Level
                        </label>
                        <select
                            name="level"
                            className={`select select-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                            required
                        >
                            <option value="">Difficulty Level</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
                            Due Date
                        </label>
                        <DatePicker
                            className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`btn font-medium w-full ${isDarkMode ? 'bg-[#3F9CFF] hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'} text-white`}
                >
                    Add Assignment
                </button>
            </form>
        </div>
    );
};

export default CreateAssignments;