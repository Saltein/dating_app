const BASE_URL = process.env.REACT_APP_BASE_URL;;

export const datingApi = {
    async getTenProfiles(user_id) {
        try {
            const response = await fetch(`${BASE_URL}/dating/other-profiles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    viewerId: user_id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get other profiles failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Get other profiles error:', error);
            throw error;
        }
    },

    async getLikes(user_id) {
        try {
            const response = await fetch(`${BASE_URL}/dating/liked-by/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get likes failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Get Likes error:', error);
            throw error;
        }
    },

    async skipProfile(viewerId, viewedId) {
        try {
            const response = await fetch(`${BASE_URL}/dating/interact/skip`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    viewerId: viewerId,
                    viewedId: viewedId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Skip profile failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Skip profile error:', error);
            throw error;
        }
    },

    async likeProfile(viewerId, viewedId) {
        try {
            const response = await fetch(`${BASE_URL}/dating/interact/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    viewerId: viewerId,
                    viewedId: viewedId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Like profile failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Like profile error:', error);
            throw error;
        }
    },

    async superlikeProfile(viewerId, viewedId) {
        try {
            const response = await fetch(`${BASE_URL}/dating/interact/superlike`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    viewerId: viewerId,
                    viewedId: viewedId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Superlike profile failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Superlike profile error:', error);
            throw error;
        }
    },

    async rejectProfile(rejector_id, rejected_id) {
        try {
            const response = await fetch(`${BASE_URL}/dating/interact/reject`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rejector_id: rejector_id,
                    rejected_id: rejected_id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Reject profile failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Reject profile error:', error);
            throw error;
        }
    },

    async clearViews(userId) {
        try {
            const response = await fetch(`${BASE_URL}/dating/interact/clear-views/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Delete views failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Delete views error:', error);
            throw error;
        }
    }
}