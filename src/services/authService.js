// Central auth utility for login state and role checks

export function isAuthenticated() {
  return !!localStorage.getItem('currentUser');
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

export function getUserRole() {
  const user = getCurrentUser();
  return user?.role || null;
}

export function logout() {
  localStorage.removeItem('currentUser');
}
