import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser({ id: null, isAdmin: null });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      } else {
        // Fetch user details if the data doesn't exist in localStorage
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data._id) {
              const userData = {
                id: data._id,
                isAdmin: data.isAdmin,
              };
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
            } else {
              unsetUser(); // If no user data, clear the context
            }
          })
          .catch((err) => unsetUser());
      }
    } else {
      unsetUser(); // If no token, clear the context
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
