const BASE_URL = 'http://localhost:5000';

export const profileApi = {
    async getProfile() {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Profile not found');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }
};



// const obj = {
//     id: '',
//     photo: [],
//     name: '',
//     age: '',
//     description: '',
//     quality: [],
//     interest: [],
//     music: [],
//     films_books: {
//         films: '',
//         books: '',
//     },
//     games: [],
//     likes: 0,
//     views: 0,
// }