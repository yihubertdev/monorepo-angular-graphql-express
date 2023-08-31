export interface IArticle {
  id?: string;
  userId: string;
  title: string;
  subTitle: string;
  description: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface IPost {
  id?: string;
  userId: string;
  image?: string[];
  content: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface ICollectionQueryBuilder<T> {
  documentId: string;
  collectionId?: string;
  documentValue?: T;
  next?: ICollectionQueryBuilder<T>;
}
