// Central auth utility for login state and role checks

const authService = {
  login: (email, password) => {
    // Get user from localStorage (simulated database)
    const userKey = `user_${email}`;
    const userData = localStorage.getItem(userKey);
    
    if (!userData) {
      throw new Error('User not found');
    }
    
    const user = JSON.parse(userData);
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role
    }));
    
    return user;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      // If parsing fails, clear invalid data
      localStorage.removeItem('currentUser');
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('currentUser');
  },

  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || null;
  },

  isAuthorized: (allowedRoles) => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
};

export default authService;
