interface Category {
  _id: string;
  name: string;
  type: string;
  image: string;
  parent: {
    required: boolean;
    default: any;
  };
  sortOrder: {
    type: number;
  };
  predefined: boolean;
}

export default Category;
