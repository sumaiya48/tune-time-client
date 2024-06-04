import { Link, Outlet } from "react-router-dom";
import { TbShoppingCartFilled } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import { IoIosCloudDone } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { MdAddHomeWork } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { MdFlightClass } from "react-icons/md";
import useAdmin from "../Pages/Hooks/useAdmin";



const Dashboard = () => {

  const isAdmin = useAdmin();
  // const isAdmin = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content pt-10">
        <li><h2 className="text-3xl">TIME & TUNE</h2></li>
              <li><h2>MUSIC SCHOOL</h2></li>
          {
            isAdmin ? <>
            
              <li> <Link to="/dashboard/home"> <MdAddHomeWork />Admin Dashboard</Link></li>
              
              <li> <Link to="/dashboard/manageclasses"> <MdFlightClass />Manage Classes</Link></li>
              <li> <Link to="/dashboard/manageusers"><FaUserGroup /> Manage Users</Link></li>
              
            </> : <>
              <li><h2 className="text-3xl">TIME & TUNE</h2></li>
              <li><h2>MUSIC SCHOOL</h2></li>
              <li> <Link to="/dashboard/home"> <MdAddHomeWork />User Home</Link></li>
              <li> <Link> <ImHome />User Home</Link></li>
              <li> <Link to="/dashboard/selectedclass"> <TbShoppingCartFilled />My Selected Class</Link></li>
              <li> <Link to="/dashboard/enrolledclass"> <IoIosCloudDone />My Enrolled Class</Link></li>
              <li> <Link to="/dashboard/payment"> <GiWallet />Payment History</Link></li>
            </>
          }


          <div className="divider"></div>
          <li> <Link to="/"> <ImHome />Home</Link></li>
          <li> <Link to="/classes"> <PiStudentFill />Classes</Link></li>




        </ul>

      </div>
    </div>
  );
};

export default Dashboard;