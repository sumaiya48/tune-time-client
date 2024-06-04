import  { useState, useEffect } from 'react';


const Instructor = () => {
    const [instructorData, setInstructorData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/info');
            const data = await response.json();
            setInstructorData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-7">
            <div className="text-center mb-6">
                <p className="text-2xl pt-28 font-bold text-amber-700">Our Team</p>
                <h1 className="text-4xl font-extrabold text-cyan-900">Meet Our Teachers</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {instructorData.map(instructor => (
                    <div key={instructor.id} className="w-full sm:w-1/2 lg:w-1/4 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="avatar flex justify-center mb-4">
                                <img className="w-24 h-24 rounded-full ring ring-amber-700 ring-offset-base-100 ring-offset-2" src={instructor.instructorImage} alt={instructor.instructorName} />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-2xl text-cyan-900">{instructor.instructorName}</p>
                                <p>Email: {instructor.instructorEmail}</p>
                                <p>Number of Classes taken: {instructor.numClassesTakenByInstructor}</p>
                                <p>Name of the Classes taken: {instructor.className}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );
};

export default Instructor;
