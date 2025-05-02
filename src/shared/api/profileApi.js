const BASE_URL = process.env.REACT_APP_BASE_URL;;

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
                throw new Error('Profile not found')
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching profile:', error)
            throw error
        }
    },

    async updateProfile(profileData) {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error updating profile:', error)
            throw error
        }
    },

    async getOptions(option) {
        try {
            const response = await fetch(`${BASE_URL}/list/${option}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            })
    
            if (!response.ok) {
                throw new Error(`Failed fetch list "${option}`);
            }
    
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetch list:', error)
            throw error
        }
    },
}