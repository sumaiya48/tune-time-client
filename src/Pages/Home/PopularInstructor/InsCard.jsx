import { Link } from "react-router-dom";

const InsCard = ({ cls }) => {
    return (
        <div className="">
            <div className="text-center mb-6">
                <p className="text-2xl font-bold text-amber-700">Our Team</p>
                <h1 className="text-4xl font-extrabold text-cyan-900">Meet Our Teachers</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {cls.filter(classItem => classItem.numberOfStudents > 5).map(classItem => (
                    <div key={classItem.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                        <div className="bg-white p-6 rounded-lg ">
                            <div className="avatar flex justify-center mb-4">
                                <div className="w-24 rounded-full ring ring-amber-700 ring-offset-base-100 ring-offset-2">
                                    <img src={classItem.instructorImage} alt={classItem.instructorName} />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-2xl text-cyan-900">Class by: {classItem.instructorName}</p>
                                <h2 className="font-bolder text-xl text-amber-700 mt-2">
                                    {classItem.className}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link to="/instructor">
                    <button className="btn bg-amber-700 text-white hover:bg-amber-800">
                       See All Instructor
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default InsCard;
