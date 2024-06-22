import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded date */
  ISO8601Date: { input: any; output: any; }
  /** Represents untyped JSON */
  JSON: { input: any; output: any; }
};

/** Autogenerated return type of CreateFriendRequest. */
export type CreateFriendRequestPayload = {
  __typename?: 'CreateFriendRequestPayload';
  errors?: Maybe<Scalars['JSON']['output']>;
};

/** Autogenerated return type of CreatePost. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  errors?: Maybe<Scalars['JSON']['output']>;
  post?: Maybe<Post>;
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  id: Scalars['ID']['output'];
  userProfile: UserProfile;
};

export enum FriendRequestActionEnums {
  /** Friend request is accepted */
  Accept = 'accept',
  /** Friend request is declined */
  Decline = 'decline'
}

/** Autogenerated return type of HandleFriendRequest. */
export type HandleFriendRequestPayload = {
  __typename?: 'HandleFriendRequestPayload';
  errors?: Maybe<Scalars['JSON']['output']>;
  friendRequestId?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFriendRequest?: Maybe<CreateFriendRequestPayload>;
  createPost?: Maybe<CreatePostPayload>;
  handleFriendRequest?: Maybe<HandleFriendRequestPayload>;
  removeFriend?: Maybe<RemoveFriendPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
};


export type MutationCreateFriendRequestArgs = {
  receiverId: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHandleFriendRequestArgs = {
  friendRequestAction: FriendRequestActionEnums;
  friendRequestId: Scalars['ID']['input'];
};


export type MutationRemoveFriendArgs = {
  friendRequestId: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  authorProfile: UserProfile;
  authorUsername: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  edited: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type PostPage = {
  __typename?: 'PostPage';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  nodes: Array<Post>;
  nodesCount: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  posts: PostPage;
  receivedFriendRequests: Array<FriendRequest>;
  sentFriendRequests: Array<FriendRequest>;
  suggestedFriends: Array<User>;
  /** Returns a list of users */
  users?: Maybe<Array<User>>;
};


export type QueryPostsArgs = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of RemoveFriend. */
export type RemoveFriendPayload = {
  __typename?: 'RemoveFriendPayload';
  errors?: Maybe<Scalars['JSON']['output']>;
};

/** Autogenerated return type of UpdatePost. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  errors?: Maybe<Scalars['JSON']['output']>;
  post?: Maybe<Post>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  profile: UserProfile;
  username: Scalars['String']['output'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['ISO8601Date']['output']>;
  displayName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type CreateFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['ID']['input'];
}>;


export type CreateFriendRequestMutation = { __typename?: 'Mutation', createFriendRequest?: { __typename?: 'CreateFriendRequestPayload', errors?: any | null } | null };

export type CreatePostMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', errors?: any | null, post?: { __typename?: 'Post', id: number, title?: string | null, content: string, createdAt: string, edited: boolean, authorUsername: string, authorProfile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null } } | null } | null };

export type HandleFriendRequestMutationVariables = Exact<{
  friendRequestId: Scalars['ID']['input'];
  friendRequestAction: FriendRequestActionEnums;
}>;


export type HandleFriendRequestMutation = { __typename?: 'Mutation', handleFriendRequest?: { __typename?: 'HandleFriendRequestPayload', errors?: any | null, friendRequestId?: number | null } | null };

export type RemoveFriendMutationVariables = Exact<{
  friendRequestId: Scalars['ID']['input'];
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend?: { __typename?: 'RemoveFriendPayload', errors?: any | null } | null };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'UpdatePostPayload', errors?: any | null, post?: { __typename?: 'Post', title?: string | null, content: string, edited: boolean } | null } | null };

export type GetPostsQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostPage', hasPreviousPage: boolean, hasNextPage: boolean, pagesCount: number, nodesCount: number, nodes: Array<{ __typename?: 'Post', id: number, title?: string | null, content: string, createdAt: string, edited: boolean, authorUsername: string, authorProfile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null } }> } };

export type GetReceivedFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReceivedFriendRequestsQuery = { __typename?: 'Query', receivedFriendRequests: Array<{ __typename?: 'FriendRequest', id: number, userProfile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null, bio?: string | null } }> };

export type GetSentFriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSentFriendRequestsQuery = { __typename?: 'Query', sentFriendRequests: Array<{ __typename?: 'FriendRequest', id: number, userProfile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null, bio?: string | null } }> };

export type GetSuggestedFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestedFriendsQuery = { __typename?: 'Query', suggestedFriends: Array<{ __typename?: 'User', id: number, profile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null, bio?: string | null } }> };

export type GetUsersQueryVariables = Exact<{
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: number, username: string, profile: { __typename?: 'UserProfile', id: number, displayName: string, avatar?: string | null } }> | null };


export const CreateFriendRequestDocument = gql`
    mutation createFriendRequest($receiverId: ID!) {
  createFriendRequest(receiverId: $receiverId) {
    errors
  }
}
    `;
export type CreateFriendRequestMutationFn = Apollo.MutationFunction<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;

/**
 * __useCreateFriendRequestMutation__
 *
 * To run a mutation, you first call `useCreateFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useCreateFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>(CreateFriendRequestDocument, options);
      }
export type CreateFriendRequestMutationHookResult = ReturnType<typeof useCreateFriendRequestMutation>;
export type CreateFriendRequestMutationResult = Apollo.MutationResult<CreateFriendRequestMutation>;
export type CreateFriendRequestMutationOptions = Apollo.BaseMutationOptions<CreateFriendRequestMutation, CreateFriendRequestMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($title: String, $content: String!) {
  createPost(title: $title, content: $content) {
    errors
    post {
      id
      title
      content
      createdAt
      edited
      authorProfile {
        id
        displayName
        avatar
      }
      authorUsername
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const HandleFriendRequestDocument = gql`
    mutation handleFriendRequest($friendRequestId: ID!, $friendRequestAction: FriendRequestActionEnums!) {
  handleFriendRequest(
    friendRequestId: $friendRequestId
    friendRequestAction: $friendRequestAction
  ) {
    errors
    friendRequestId
  }
}
    `;
export type HandleFriendRequestMutationFn = Apollo.MutationFunction<HandleFriendRequestMutation, HandleFriendRequestMutationVariables>;

/**
 * __useHandleFriendRequestMutation__
 *
 * To run a mutation, you first call `useHandleFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleFriendRequestMutation, { data, loading, error }] = useHandleFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *      friendRequestAction: // value for 'friendRequestAction'
 *   },
 * });
 */
export function useHandleFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<HandleFriendRequestMutation, HandleFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleFriendRequestMutation, HandleFriendRequestMutationVariables>(HandleFriendRequestDocument, options);
      }
export type HandleFriendRequestMutationHookResult = ReturnType<typeof useHandleFriendRequestMutation>;
export type HandleFriendRequestMutationResult = Apollo.MutationResult<HandleFriendRequestMutation>;
export type HandleFriendRequestMutationOptions = Apollo.BaseMutationOptions<HandleFriendRequestMutation, HandleFriendRequestMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation removeFriend($friendRequestId: ID!) {
  removeFriend(friendRequestId: $friendRequestId) {
    errors
  }
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($postId: ID!, $title: String, $content: String!) {
  updatePost(postId: $postId, title: $title, content: $content) {
    errors
    post {
      title
      content
      edited
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const GetPostsDocument = gql`
    query getPosts($authorId: ID, $page: Int, $perPage: Int) {
  posts(authorId: $authorId, page: $page, perPage: $perPage) {
    nodes {
      id
      title
      content
      createdAt
      edited
      authorProfile {
        id
        displayName
        avatar
      }
      authorUsername
    }
    hasPreviousPage
    hasNextPage
    pagesCount
    nodesCount
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetReceivedFriendRequestsDocument = gql`
    query getReceivedFriendRequests {
  receivedFriendRequests {
    id
    userProfile {
      id
      displayName
      avatar
      bio
    }
  }
}
    `;

/**
 * __useGetReceivedFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetReceivedFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReceivedFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReceivedFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReceivedFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>(GetReceivedFriendRequestsDocument, options);
      }
export function useGetReceivedFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>(GetReceivedFriendRequestsDocument, options);
        }
export function useGetReceivedFriendRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>(GetReceivedFriendRequestsDocument, options);
        }
export type GetReceivedFriendRequestsQueryHookResult = ReturnType<typeof useGetReceivedFriendRequestsQuery>;
export type GetReceivedFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetReceivedFriendRequestsLazyQuery>;
export type GetReceivedFriendRequestsSuspenseQueryHookResult = ReturnType<typeof useGetReceivedFriendRequestsSuspenseQuery>;
export type GetReceivedFriendRequestsQueryResult = Apollo.QueryResult<GetReceivedFriendRequestsQuery, GetReceivedFriendRequestsQueryVariables>;
export const GetSentFriendRequestsDocument = gql`
    query getSentFriendRequests {
  sentFriendRequests {
    id
    userProfile {
      id
      displayName
      avatar
      bio
    }
  }
}
    `;

/**
 * __useGetSentFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetSentFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSentFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSentFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSentFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>(GetSentFriendRequestsDocument, options);
      }
export function useGetSentFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>(GetSentFriendRequestsDocument, options);
        }
export function useGetSentFriendRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>(GetSentFriendRequestsDocument, options);
        }
export type GetSentFriendRequestsQueryHookResult = ReturnType<typeof useGetSentFriendRequestsQuery>;
export type GetSentFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetSentFriendRequestsLazyQuery>;
export type GetSentFriendRequestsSuspenseQueryHookResult = ReturnType<typeof useGetSentFriendRequestsSuspenseQuery>;
export type GetSentFriendRequestsQueryResult = Apollo.QueryResult<GetSentFriendRequestsQuery, GetSentFriendRequestsQueryVariables>;
export const GetSuggestedFriendsDocument = gql`
    query getSuggestedFriends {
  suggestedFriends {
    id
    profile {
      id
      displayName
      avatar
      bio
    }
  }
}
    `;

/**
 * __useGetSuggestedFriendsQuery__
 *
 * To run a query within a React component, call `useGetSuggestedFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
      }
export function useGetSuggestedFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
        }
export function useGetSuggestedFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
        }
export type GetSuggestedFriendsQueryHookResult = ReturnType<typeof useGetSuggestedFriendsQuery>;
export type GetSuggestedFriendsLazyQueryHookResult = ReturnType<typeof useGetSuggestedFriendsLazyQuery>;
export type GetSuggestedFriendsSuspenseQueryHookResult = ReturnType<typeof useGetSuggestedFriendsSuspenseQuery>;
export type GetSuggestedFriendsQueryResult = Apollo.QueryResult<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($searchQuery: String) {
  users(searchQuery: $searchQuery) {
    id
    username
    profile {
      id
      displayName
      avatar
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;