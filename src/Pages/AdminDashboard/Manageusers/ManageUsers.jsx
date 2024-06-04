import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now an Admin`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(error => {
        console.error("Failed to make admin:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to make admin",
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  const handleClickButtonTwo = (userId) => {
    console.log("Button Two clicked for user:", userId);
    // Add your logic for Button Two here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-3xl font-bold mb-4">Total Users: {users.length}</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">No</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {users.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role === 'admin' ? 'Admin' : 'User'}</td>
                <td className="py-3 px-6 text-center">
                  <button 
                    onClick={() => handleMakeAdmin(user)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
                  >
                    Make Admin
                  </button>
                  <button 
                    onClick={() => handleClickButtonTwo(user._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition duration-200 ml-2"
                  >
                    Button Two
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
