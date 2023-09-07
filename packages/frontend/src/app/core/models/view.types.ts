import { InputType } from "./constants";

export interface IFormInput {
  id: string;
  type: InputType;
  label?: string;
  key: string;
  value: string;
  placeholder?: string;
  select?: (string | number)[];
  documentPath?: string;
  documentCategory?: string;
  error?: string;
}

export interface IPostCategoryList {
  icon: string;
  number: number;
  category: string;
}

export interface IPostList {
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  content: string;
}
