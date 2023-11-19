import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchUserById, UserData } from '../services/ApiService';

const UserDetails: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        fetchUserById(Number(userId))
            .then((data) => {
                if (data) {
                    setUser(data);
                } else {
                    console.error('User not found or an error occurred.');
                }
            })
            .catch((error) => console.error('Error fetching user details:', error));
    }, [userId]);

    return (
        <div>
            <h2>User Details</h2>
            <Link to="/user-list">Back to User List</Link>

            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetails;
