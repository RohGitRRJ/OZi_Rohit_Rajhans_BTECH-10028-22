import api from './api';

/**
 * User service for profile management
 */
const userService = {
  /**
   * Get user profile
   */
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (passwordData) => {
    const response = await api.put('/users/password', passwordData);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  /**
   * Delete account
   */
  deleteAccount: async () => {
    const response = await api.delete('/users/profile');
    if (response.data.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return response.data;
  }
};

export default userService;
