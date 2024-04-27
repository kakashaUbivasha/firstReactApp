import { Routes, Route, Navigate } from "react-router-dom";
import Autorization from "../ui/Autorization.jsx";
import Registration from "../ui/Registration.jsx";
import UserTable from "../ui/userTable.jsx";
import Home from "../Home.jsx";
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && token !== '';

    return isAuthenticated ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/autorization" replace />
    );
};

const MainRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="autorization" element={<Autorization />} />
            <Route path="registration" element={<Registration />} />
            <Route path="user-table" element={<PrivateRoute element={UserTable} />} />
        </Routes>
    );
};
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
};
export default MainRouter;
