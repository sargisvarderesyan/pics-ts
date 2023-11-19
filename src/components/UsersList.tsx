import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/ApiService';
import { Link, useNavigate   } from 'react-router-dom';

import '../styles/UsersList.scss'

interface User {
    id: number;
    name: string;
    email: string;
    age:number;
}

const UserList: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const handleDeleteItem = (itemId: number,event:any) => {
        event.stopPropagation()
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

    const filteredItems = sortedItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const onCellClick = (cell:any) => {
        navigate(`/user-details/${cell.id}`)
        console.log(cell)
    }

    return (
        <div>
            <Link to={'/'}>Home</Link>
            <h1>User List</h1>
            <div className='search_block'>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th>Email</th>
                    <th onClick={() => handleSort('age')}>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredItems.map((item) => (
                    <tr key={item.id} onClick={()=>onCellClick(item)}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.id}</td>
                        <td>
                            <button onClick={(e) => handleDeleteItem(item.id,e)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
