import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Classes = () => {
    const [classData, setClassData] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/info');
            const data = await response.json();
            setClassData(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const savedClasses = JSON.parse(localStorage.getItem('selectedClasses')) || [];
        setSelectedClasses(savedClasses);
    }, []);

    const handleSelect = async (classItem) => {
        if (classItem.availableSeats === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Seats Available',
                text: 'This class has no available seats.',
            });
            return;
        }

        if (!selectedClasses.find(item => item.id === classItem.id)) {
            const updatedClasses = [...selectedClasses, classItem];
            setSelectedClasses(updatedClasses);
            localStorage.setItem('selectedClasses', JSON.stringify(updatedClasses));
            updateSelectedClassesCount(updatedClasses.length);

            // Save to server
            try {
                const response = await fetch('http://localhost:5000/selectedclasses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(classItem),
                });

                const result = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Class Selected',
                        text: 'Class has been successfully selected!',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'Failed to select class',
                    });
                }
            } catch (error) {
                console.error('Error saving selected class: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to select class',
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Class Already Selected',
                text: 'This class has already been selected.',
            });
        }
    };

    const isClassSelected = (classItem) => {
        return selectedClasses.some(item => item.id === classItem.id);
    };

    const updateSelectedClassesCount = (count) => {
        localStorage.setItem('selectedClassesCount', count);
        const event = new CustomEvent('selectedClassesCountChanged', { detail: count });
        window.dispatchEvent(event);
    };

    return (
        <div className="my-7">
            <div className="text-center mb-6">
                <p className="text-2xl pt-28 font-bold text-amber-700">Our Classes</p>
                <h1 className="text-4xl font-extrabold text-cyan-900">MOST POPULAR CLASSES</h1>
            </div>

            <div className="flex flex-wrap justify-center">
                {classData.map(classItem => (
                    <div key={classItem.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                        <div className={`card ${classItem.availableSeats === 0 ? 'bg-red-600' : 'bg-base-100'} shadow-xl`}>
                            <figure><img src={classItem.classImage} alt={classItem.className} /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-bolder">
                                    {classItem.className}
                                </h2>
                                <p>Instructor: {classItem.instructorName}</p>
                                <p>Available seats: {classItem.availableSeats}</p>
                                <p>Price: {classItem.price}</p>
                                <button 
                                    className={`btn bg-amber-700 text-white hover:bg-amber-800 mt-2 ${isClassSelected(classItem) ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => handleSelect(classItem)}
                                    disabled={isClassSelected(classItem) || classItem.availableSeats === 0}
                                >
                                    {isClassSelected(classItem) ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
