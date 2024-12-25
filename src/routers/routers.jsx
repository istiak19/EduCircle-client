import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import Register from "../pages/Register";
import PendingAssignments from "../pages/pendingAssignments";
import PrivateRouter from "../routers/PrivateRouter"
import Home from "../pages/Home";
import Assignments from "../pages/Assignments";
import CreateAssignments from "../pages/CreateAssignments";
import MyAttempted from "../pages/MyAttempted";
import Details from "../pages/Details";
import SubmissionForm from "../pages/SubmissionForm";
import UpdateAssignment from "../pages/UpdateAssignment";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/assignments',
                element: <Assignments></Assignments>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/pending-assignments',
                element: <PrivateRouter><PendingAssignments></PendingAssignments></PrivateRouter>
            },
            {
                path: '/CreateAssignments',
                element: <PrivateRouter><CreateAssignments></CreateAssignments></PrivateRouter>
            },
            {
                path: '/myAttempted',
                element: <PrivateRouter><MyAttempted></MyAttempted></PrivateRouter>
            },
            {
                path: '/details/:id',
                loader: ({ params }) => fetch(`https://server-omega-ten-52.vercel.app/assignment/${params.id}`),
                element: <PrivateRouter><Details></Details></PrivateRouter>
            },
            {
                path: '/take-assignment/:id',
                loader: ({ params }) => fetch(`https://server-omega-ten-52.vercel.app/assignment/${params.id}`),
                element: <PrivateRouter><SubmissionForm></SubmissionForm></PrivateRouter>
            },
            {
                path: '/update/:id',
                loader: ({ params }) => fetch(`https://server-omega-ten-52.vercel.app/assignment/${params.id}`),
                element: <PrivateRouter><UpdateAssignment></UpdateAssignment></PrivateRouter>
            }
        ]
    },
])

export default routers;