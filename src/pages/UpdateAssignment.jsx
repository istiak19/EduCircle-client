import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

const UpdateAssignment = () => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const { user, isDarkMode } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const { data: assignment, isLoading, isError } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assignment/${id}`);
            return data;
        },
    });
    // console.log(assignment)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const title = form.get('title')
        const description = form.get('description')
        const marks = form.get('marks')
        const image = form.get('image')
        const deadline = startDate
        const level = form.get('level')
        const email = user?.email
        const name = user?.displayName
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

        const newAssignment = { title, description, marks, image, deadline, level, email, name }

        try {
            const { data } = await axiosSecure.put(`/assignment/${assignment?._id}`, newAssignment)

            if (data.modifiedCount > 0) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Assignment updated successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
            navigate('/assignments')
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <div>
            <Helmet>
                <title>UpdateAssignment - EduCircle</title>
            </Helmet>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className={`max-w-2xl my-20 mx-auto border shadow-lg p-6 rounded-xl space-y-4 ${isDarkMode ? 'bg-[#2E353D]' : 'bg-white'}`}
                >
                    <div className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <h2 className="text-2xl font-bold mb-4 text-center">Update Assignment</h2>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={assignment?.title}
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
                            defaultValue={assignment?.description}
                            className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
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
                            defaultValue={assignment?.marks}
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
                            defaultValue={assignment?.image}
                            className={`input input-bordered w-full ${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'}`}
                            placeholder="Enter image URL"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <button type="submit" className="btn font-medium bg-[#3F9CFF] text-white w-full hover:bg-blue-400">Update Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAssignment;