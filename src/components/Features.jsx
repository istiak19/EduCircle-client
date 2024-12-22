import { useEffect, useState } from "react";

const Features = () => {
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetch('./features.json')
            .then(res => res.json())
            .then(data => setFeatures(data))
    }, [])

    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-[#3F9CFF] rounded-lg p-4 text-center shadow-md"
                    >
                        <img
                            src={feature.icon}
                            alt='Feature image'
                            className="w-20 h-20 mx-auto mb-3 rounded-md"
                        />
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;