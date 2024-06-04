import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MySelectedClasses = () => {
    const [selectedClasses, setSelectedClasses] = useState([]);

    useEffect(() => {
        const savedClasses = JSON.parse(localStorage.getItem('selectedClasses')) || [];
        setSelectedClasses(savedClasses);
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedClasses = selectedClasses.filter(classItem => classItem.id !== id);
                setSelectedClasses(updatedClasses);
                localStorage.setItem('selectedClasses', JSON.stringify(updatedClasses));
                localStorage.setItem('selectedClassesCount', updatedClasses.length);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your class has been deleted.",
                    icon: "success"
                });

                // Dispatch custom event
                const event = new CustomEvent('selectedClassesCountChanged', { detail: updatedClasses.length });
                window.dispatchEvent(event);
            }
        });
    };

    const getTotalPrice = () => {
        const total = selectedClasses.reduce((total, classItem) => {
            const priceString = classItem.price.replace('$', ''); // Remove the dollar sign
            const price = parseFloat(priceString);
            return total + (isNaN(price) ? 0 : price);
        }, 0);
        return total.toFixed(2);
    };

    const handlePay = () => {
        // Implement the payment logic here
        console.log('Proceed to payment with selected classes:', selectedClasses);
    };

    return (
        <div className="pt-40">
            <div className="text-center mb-6">
                <p className="text-2xl font-bold text-amber-700">Selected Classes</p>
                <h1 className="text-4xl font-extrabold text-cyan-900">Your Selected Classes</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Number</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClasses.length > 0 ? (
                            selectedClasses.map((classItem, index) => (
                                <tr key={classItem.id}>
                                    <th>{index + 1}</th>
                                    <td>{classItem.classNumber}</td>
                                    <td>{classItem.className}</td>
                                    <td>{classItem.instructorName}</td>
                                    <td>{classItem.availableSeats}</td>
                                    <td>${classItem.price}</td>
                                    <td>
                                        <button 
                                            className="btn bg-red-600 text-white hover:bg-red-700 mr-2"
                                            onClick={() => handleDelete(classItem.id)}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="btn bg-amber-700 text-white hover:bg-amber-800"
                                            disabled={true} // Disable the button when a class is selected
                                        >
                                            Pay
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No classes selected.</td>
                            </tr>
                        )}
                    </tbody>
                    {selectedClasses.length > 0 && (
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="text-right font-bold">Total Price:</td>
                                <td>${getTotalPrice()}</td>
                                <td>
                                    <button className="btn bg-amber-700 text-white hover:bg-amber-800" onClick={handlePay}>
                                        Pay for All
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;
