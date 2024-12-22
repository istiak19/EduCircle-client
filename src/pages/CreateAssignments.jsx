import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";

const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useAuth()
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
            const { data } = await axios.post('http://localhost:5000/assignments', newAssignment);
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Assignment created successfully!",
                    showConfirmButton: false,
                    timer: 1000
                });
                e.target.reset()
                navigate('/assignments')
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl my-20 mx-auto border border-[#3F9CFF] bg-white shadow-lg p-6 rounded-xl space-y-4"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
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
                <button type="submit" className="btn font-medium bg-[#3F9CFF] text-white w-full">Add Assignment</button>
            </form>
        </div>
    );
};

export default CreateAssignments;