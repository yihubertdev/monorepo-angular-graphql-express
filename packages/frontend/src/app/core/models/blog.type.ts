export interface IBlog {
  userId: string;
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface IArticle {
  id?: string;
  userId: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}
