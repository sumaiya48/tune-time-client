import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';

const ClassCard = ({ cls }) => {
    const [selectedClasses, setSelectedClasses] = useState([]);

    const handleSelect = async (classItem) => {
        // Check if the class is already selected
        if (selectedClasses.find(item => item.id === classItem.id)) {
            Swal.fire({
                title: 'Already Selected',
                text: 'This class is already in your selected classes.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Add the new class to the selected classes
        const updatedSelectedClasses = [...selectedClasses, classItem];
        setSelectedClasses(updatedSelectedClasses);
        localStorage.setItem('selectedClasses', JSON.stringify(updatedSelectedClasses));
        localStorage.setItem('selectedClassesCount', updatedSelectedClasses.length);

        // Dispatch custom event to update the badge count
        const event = new CustomEvent('selectedClassesCountChanged', { detail: updatedSelectedClasses.length });
        window.dispatchEvent(event);

        // Show SweetAlert confirmation
        Swal.fire({
            title: 'Class Selected',
            text: 'You have successfully selected this class.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Send a POST request to save the selected class to the API
        try {
            const response = await fetch('http://localhost:5000/selectedclasses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classItem)
            });
            if (!response.ok) {
                throw new Error('Failed to save selected class');
            }
            // Handle success if needed
        } catch (error) {
            console.error('Error saving selected class: ', error);
            // Handle error if needed
        }
    };

    // Function to check if a class is selected
    const isClassSelected = (classItem) => {
        return selectedClasses.some(item => item.id === classItem.id);
    };

    return (
        <div className="">
            <div className="text-center mb-6">
                <p className="text-2xl font-bold text-amber-700">Our Classes</p>
                <h1 className="text-4xl font-extrabold text-cyan-900">MOST POPULAR CLASSES</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {cls.filter(classItem => classItem.numberOfStudents > 5).map(classItem => (
                    <div key={classItem.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img src={classItem.classImage} alt={classItem.className} /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-bolder">
                                    {classItem.className}
                                    <div className="badge badge-secondary">POPULAR</div>
                                </h2>
                                <p className="font-bold">Class by: {classItem.instructorName}</p>
                                <p className="font-bold">{classItem.price}</p>
                                <button 
                                    className={`btn bg-amber-700 text-white hover:bg-amber-800 mt-2 ${isClassSelected(classItem) ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => handleSelect(classItem)}
                                    disabled={isClassSelected(classItem)}
                                >
                                    {isClassSelected(classItem) ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Link to="/classes">
                    <button className="btn bg-amber-700 text-white hover:bg-amber-800">
                        View All Classes
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ClassCard;
