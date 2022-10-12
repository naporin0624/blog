import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Color: string;
  Date: string;
  URL: string;
  Upload: File;
};

export type CreatePostInput = {
  body: Scalars['String'];
  publishedAt?: InputMaybe<Scalars['Date']>;
  tag?: InputMaybe<Array<Scalars['Int']>>;
  thumbnail: Scalars['Upload'];
  title: Scalars['String'];
};

export type CreateTagInput = {
  color: Scalars['Color'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createTag: Tag;
  deletePost: Scalars['Boolean'];
  publishPost: Scalars['Boolean'];
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateTagArgs = {
  data: CreateTagInput;
};


export type MutationDeletePostArgs = {
  data: PostUniqueWhereInput;
};


export type MutationPublishPostArgs = {
  data: PostUniqueWhereInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  publishedAt?: Maybe<Scalars['Date']>;
  tags?: Maybe<Array<Tag>>;
  thumbnail: Scalars['URL'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type PostOrderInput = {
  publishedAt?: InputMaybe<Order>;
  title?: InputMaybe<Order>;
};

export type PostUniqueWhereInput = {
  id: Scalars['Int'];
};

export type PostWhereInput = {
  publishedAt?: InputMaybe<Scalars['Date']>;
  tag?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Post>>;
  publishedPosts?: Maybe<Array<Post>>;
  tags?: Maybe<Array<Tag>>;
};


export type QueryPostsArgs = {
  order?: InputMaybe<PostOrderInput>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryPublishedPostsArgs = {
  order?: InputMaybe<PostOrderInput>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryTagsArgs = {
  where?: InputMaybe<TagWhereInput>;
};

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['Color']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
};

export type TagUniqueWhereInput = {
  id: Scalars['Int'];
};

export type TagWhereInput = {
  id?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  publishedAt?: InputMaybe<Scalars['Date']>;
  tag?: InputMaybe<Array<Scalars['Int']>>;
  thumbnail?: InputMaybe<Scalars['URL']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number } };

export type PostQueryVariables = Exact<{ [key: string]: never; }>;


export type PostQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: number, title: string, body: string, thumbnail: string }> | null };


export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;