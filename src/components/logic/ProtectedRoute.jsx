import { Navigate } from 'react-router-dom';
import { authFunctions } from './authFunctions';
const ProtectedRoute = ({ children }) => {

    let logged = authFunctions.isLogged();
  if (!logged) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
