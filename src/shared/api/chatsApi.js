const BASE_URL = process.env.REACT_APP_BASE_URL;;

export const chatsApi = {
    async getMatches(user_id) {
        try {
            const response = await fetch(`${BASE_URL}/dating/matches/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get matches failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Get matches error:', error);
            throw error;
        }
    },

    async getMessages(match_id) {
        try {
            const response = await fetch(`${BASE_URL}/chats/${match_id}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Get messages failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Get messages error:', error);
            throw error;
        }
    }
}