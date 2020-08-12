import React from 'react';

export default React.createContext({
  isAdmin: false,
  principal: '',
  login: (principal, isManager) => {},
  logout: () => {}
});
