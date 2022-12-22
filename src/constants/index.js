import images from "./images";
import URL, { STORAGE } from "./urls";
import { StudentsTutorialIcon, CategoriesTutorialIcon } from "components/svgs";

export const Tutorials = {
  students: {
    message:
      "As a teacher you’re able to add who you want to teach by listing students who you want to tutor in this section.",
    buttonTitle: "Let's Get Started",
    icon: <StudentsTutorialIcon />,
  },
  sets: {
    message:
      "Manage the content you’re teaching by adding, editing, & recording content in this section.",
    buttonTitle: "Let’s Create Some Content",
    icon: <CategoriesTutorialIcon />,
  },
};

export { images, URL, STORAGE };
export { default as localCategories } from "./preloaded";
