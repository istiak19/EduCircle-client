import { Link, NavLink } from 'react-router-dom';
import logoPic from '../../assets/logo/online-study-100.png'
import useAuth from '../../Hook/useAuth';
const Navbar = () => {
    const { name } = useAuth()

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/assignments'>Assignments</NavLink></li>
        <li><NavLink to='/pending-assignments'>Pending Assignments</NavLink></li>
    </>

    return (
        <div className="navbar bg-[#007bffc0] px-14 py-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="text-xl">
                    <div className='flex items-center gap-2'>
                        <div>
                            <img className='w-14' src={logoPic} alt="" />
                        </div>
                        <div>
                            <h3 className='text-3xl font-bold text-white'>EduCircle</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login' className="btn">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;