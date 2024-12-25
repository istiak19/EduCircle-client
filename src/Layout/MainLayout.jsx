import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import useAuth from "../Hook/useAuth";

const MainLayout = () => {
    const { isDarkMode } = useAuth()
    return (
        <div className={`${isDarkMode ? 'bg-[#1D232A]' : 'bg-white'}`}>
            <Navbar></Navbar>
            {/* min-h-[calc(100vh-240px)] */}
            <div className='min-h-[calc(100vh-240px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;