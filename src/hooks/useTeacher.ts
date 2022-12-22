import { useContext } from 'react';
import { MentorContext } from 'src/context';

export default function useTeacher() {
  return useContext(MentorContext);
}
