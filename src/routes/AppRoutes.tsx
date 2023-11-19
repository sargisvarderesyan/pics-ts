import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../components/Home';
import UserList from '../components/UsersList';
import UserDetails from '../components/UserDetails';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/user-details/:userId" element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
