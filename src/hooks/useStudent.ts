import { useContext } from 'react';
import { PupilContext } from 'src/context';

export default function useStudent() {
  return useContext(PupilContext);
}
