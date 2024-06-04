// src/components/NavBar.jsx
import  { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { TbShoppingCartFilled } from 'react-icons/tb';

import { AuthContext } from '../../../providers/AuthProvider';
import useSelectedClasses from '../../Hooks/useSelectedClasses';

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [selectedClasses] = useSelectedClasses();
  const [selectedClassesCount, setSelectedClassesCount] = useState(0);

  useEffect(() => {
    const updateSelectedClassesCount = () => {
      const count = JSON.parse(localStorage.getItem('selectedClassesCount')) || 0;
      setSelectedClassesCount(count);
    };

    window.addEventListener('selectedClassesCountChanged', updateSelectedClassesCount);

    // Initial count set
    updateSelectedClassesCount();

    return () => {
      window.removeEventListener('selectedClassesCountChanged', updateSelectedClassesCount);
    };
  }, [selectedClasses]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/instructor">Instructors</Link></li>
      <li><Link to="/classes">Classes</Link></li>
      {user && <li><Link to="/dashboard">Dashboard</Link></li>}
      <Link to='/dashboard/selectedclass'>
        <button className="btn">
          <TbShoppingCartFilled />
          <div className="badge badge-secondary">+{selectedClassesCount}</div>
        </button>
      </Link>
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">TIME & TUNE</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button onClick={handleLogOut} className="btn bg-amber-700 text-white hover:bg-amber-800">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn bg-amber-700 text-white hover:bg-amber-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
