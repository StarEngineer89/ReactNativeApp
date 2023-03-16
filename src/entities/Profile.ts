import {Category} from "src/entities";

interface Profile {
  _id: string;
  image: string;
  name: string;
  type: number;
  interest: Category[];
}

export default Profile;
