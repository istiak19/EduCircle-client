import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
    const assignment = useLoaderData()
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth()
    const { _id, title, description, marks, image, deadline, level, email, name } = assignment
    const navigate = useNavigate()

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
        const newAssignment = { title, description, marks, image, deadline, level, email, name }

        try {
            const { data } = await axios.put(`http://localhost:5000/assignment/${_id}`, newAssignment)
            console.log(data)
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
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl my-20 mx-auto border shadow-lg p-6 rounded-xl space-y-4"
                >
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Update Assignment</h2>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={title}
                            className="input input-bordered w-full"
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
                            defaultValue={description}
                            className="textarea textarea-bordered w-full"
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
                            defaultValue={marks}
                            name="marks"
                            className="input input-bordered w-full"
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
                            defaultValue={image}
                            className="input input-bordered w-full"
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
                                className="select select-bordered w-full"
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
                                className="input input-bordered w-full"
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