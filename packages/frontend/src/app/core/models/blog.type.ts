export interface IBlog {
  userId: string;
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IArticle {
  id?: string;
  userId: string;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}
