import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser } from '../services/ApiService';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState(1);

    useEffect(() => {
        fetchUsers()
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const handleAddItem = () => {
        const newUser: User = {
            id: items.length + 1,
            name: 'New Item',
            email: 'New item description',
            age: 5,
        };
        createUser(newUser)
            .then((newItem) => setItems([...items, newItem]))
            .catch((error: any) => console.error('Error adding item:', error));
    };

    const handleDeleteItem = (itemId: number) => {
        deleteUser(itemId)
            .then(() => setItems(items.filter((item) => item.id !== itemId)))
            .catch((error) => console.error('Error deleting item:', error));
    };

    const handleSort = (column: string) => {
        if (column === 'name' || column === 'age') {
            if (column === sortBy) {
                setSortOrder(sortOrder * -1);
            } else {
                setSortBy(column);
                setSortOrder(1);
            }
        }
    };

    const sortedItems = [...items].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
        if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
        return 0;
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Link to="/user-list" style={{ marginRight: '20px' }}>
                User List
            </Link>
            <h1>Home Page</h1>
            <button onClick={handleAddItem} style={{ marginBottom: '10px' }}>
                Add Item
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th>Email</th>
                    <th onClick={() => handleSort('age')}>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {sortedItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.id}</td>
                        <td>
                            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default Home;
