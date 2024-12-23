const SubmissionForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="w-full max-w-lg mt-10 mx-auto p-5 shadow-lg border rounded-lg">
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
                        id="googleDocsLink"
                        name="googleDocsLink"
                        // value={formData.googleDocsLink}
                        // onChange={handleChange}
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
                        id="quickNote"
                        name="quickNote"
                        placeholder="Write a quick note about your submission..."
                        className="textarea textarea-bordered w-full"
                        rows="4"
                    ></textarea>
                </div>
                {/* Submit Button */}
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