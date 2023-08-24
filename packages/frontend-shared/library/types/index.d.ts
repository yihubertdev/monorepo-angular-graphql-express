export interface IArticle {
  id?: string;
  userId: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface IPost {
  id?: string;
  userId: string;
  image?: string;
  content: string;
  createdAt?: Date;
  updatedA?: Date;
}

export interface ICollectionQueryBuilder<T> {
  documentId: string;
  collectionId?: string;
  documentValue?: T;
  next?: ICollectionQueryBuilder<T>;
}
