const BASE_URL = process.env.REACT_APP_BASE_URL;

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
            console.log('profileData', profileData)

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
                if (response.status === 404) {
                    return [];
                }
                throw new Error(`Failed fetch list "${option}"`);
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetch list:', error)
            throw error
        }
    },

    async uploadPhoto(photoFile) {
        const formData = new FormData();
        formData.append('avatar', photoFile);

        const res = await fetch(`${BASE_URL}/profile/upload-photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        if (!res.ok) throw new Error('Photo upload failed');
        const data = await res.json();
        return data.url;
    }
}