export const logoutHandler = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('id')) {
      localStorage.removeItem('id');
    }

    if (localStorage.getItem('username')) {
      localStorage.removeItem('username');
    }
  }
};

export const isSignedIn = () => {
  if (typeof window !== 'undefined') {
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    return id !== null && username !== null;
  }

  return false;
};
