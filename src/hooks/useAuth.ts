import { useContext } from 'react';
import { AuthContext } from 'src/context';

export default function useAuth() {
  return useContext(AuthContext);
}
