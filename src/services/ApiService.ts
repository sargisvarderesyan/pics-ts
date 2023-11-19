const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Replace with your actual API endpoint

// Define the type for user data
export interface UserData {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Function to fetch a list of users
export async function fetchUsers(): Promise<UserData[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error: any) {
        throw new Error('Error fetching users: ' + error.message);
    }
}

// Function to create a new user (you can adjust this function based on your API)
export async function createUser(newUser: UserData): Promise<UserData> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error: any) {
        throw new Error('Error creating user: ' + error.message);
    }
}

// Function to delete a user (you can adjust this function based on your API)
export async function deleteUser(userId: number): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error: any) {
        throw new Error('Error deleting user: ' + error.message);
    }
}

export async function fetchUserById(userId: number): Promise<UserData | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData: UserData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}
