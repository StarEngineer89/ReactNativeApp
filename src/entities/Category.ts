interface Category {
  _id: string;
  name: string;
  type: string;
  image: string;
  parent: string;
  sortOrder: number;
  predefined: boolean;
  slug: string;
  size: number;
  uploading: boolean;
  voiceURL: string;
}

interface StudentCategory extends Category {
  recorded: number;
  total: number;
  children: {
    _id: string;
    voiceURL: string;
    studentVoiceURL: string;
    score: number;
  }[];
}

export default Category;
export { StudentCategory };
