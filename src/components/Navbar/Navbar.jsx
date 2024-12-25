import { Link, NavLink } from 'react-router-dom';
import logoPic from '../../assets/logo/online-study-100.png'
import useAuth from '../../Hook/useAuth';
const Navbar = () => {
    const { user, signOutUser } = useAuth()

    const links = <>
        <li className='mr-2'><NavLink to='/'>Home</NavLink></li>
        <li className='mr-2'><NavLink to='/assignments'>Assignments</NavLink></li>
        {
            user && <li className='mr-2'><NavLink to='/pending-assignments'>Pending Assignments</NavLink></li>
        }
    </>

    const handleSignOut = () => {
        signOutUser()
            .then(() => {

            })
            .catch((error) => {
                // console.log(error.message)
            })
    }

    return (
        <div className="navbar backdrop-blur-lg bg-[#F2F2F2] z-50 sticky top-0 lg:px-14 py-2 sm:py-5">
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
                            <h3 className='text-3xl font-bold'>EduCircle</h3>
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
                {
                    user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div title={user?.displayName} className="w-10 rounded-full">
                                <img referrerPolicy='no-referrer'
                                    alt="Profile Pic"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow">
                            <li><Link to='/CreateAssignments'>Create Assignments</Link></li>
                            <li><Link to='/myAttempted'>My Attempted Assignments</Link></li>
                        </ul>
                    </div>
                }
                {
                    user ? <button onClick={handleSignOut} className="btn bg-[#3F9CFF] text-white font-semibold ml-3">Logout</button> : <Link to='/login' className="btn bg-[#3F9CFF] text-white font-semibold">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;