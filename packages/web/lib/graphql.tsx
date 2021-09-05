/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  user: User;
  token: Scalars['String'];
};

export type Author = {
  __typename?: 'Author';
  firstName: Scalars['String'];
};

export type BaseEntity = {
  __typename?: 'BaseEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BulkSignedResponse = {
  __typename?: 'BulkSignedResponse';
  url: Scalars['String'];
  key: Scalars['String'];
};

export type CreateInput = {
  email: Scalars['String'];
};

export type CreateMessageInput = {
  symbolId: Scalars['String'];
  content: Scalars['String'];
  embedUrl?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
};

export type GetMessageChildrenInput = {
  messageId: Scalars['String'];
};

export type GetMessagesInput = {
  symbolId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  messageId: Scalars['String'];
  content: Scalars['String'];
  embedUrl?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
  children: Array<Message>;
  user: User;
  security: Security;
};

export type MessageChildren = {
  __typename?: 'MessageChildren';
  messageId: Scalars['String'];
  content: Scalars['String'];
  user: Author;
  children: Array<MessageChildren>;
};

export type MessageChildrenResponse = {
  __typename?: 'MessageChildrenResponse';
  descendants: Scalars['Float'];
  message: MessageChildren;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  replyToMessage: Message;
  removeMessage: Message;
  getSignedS3Url?: Maybe<Scalars['String']>;
  getBulkSignedS3Url?: Maybe<Array<BulkSignedResponse>>;
  login: AuthResponse;
  register: AuthResponse;
  create: Scalars['Boolean'];
  updateMe: User;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationReplyToMessageArgs = {
  data: ReplyToMessageInput;
};


export type MutationRemoveMessageArgs = {
  data: RemoveMessageInput;
};


export type MutationGetSignedS3UrlArgs = {
  data: S3SignedUrlInput;
};


export type MutationGetBulkSignedS3UrlArgs = {
  data: S3BulkSignedUrlInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationCreateArgs = {
  data: CreateInput;
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  invoiceId?: Maybe<Scalars['String']>;
  invoiceDelivered: Scalars['Boolean'];
  paymentId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  productDesc?: Maybe<Scalars['String']>;
  discountToken?: Maybe<Scalars['String']>;
  taxAmount?: Maybe<Scalars['Float']>;
  amountExcludingTax?: Maybe<Scalars['Float']>;
  amountIncludingTax?: Maybe<Scalars['Float']>;
  last4?: Maybe<Scalars['String']>;
  cardType?: Maybe<Scalars['String']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getMessages?: Maybe<Array<Message>>;
  getChildMessages?: Maybe<MessageChildrenResponse>;
  getPayments: Array<Maybe<Payment>>;
  search: Array<SearchSecurityResponse>;
  me?: Maybe<User>;
};


export type QueryGetMessagesArgs = {
  data: GetMessagesInput;
};


export type QueryGetChildMessagesArgs = {
  data: GetMessageChildrenInput;
};


export type QuerySearchArgs = {
  data: SearchSecurityInput;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RemoveMessageInput = {
  messageId: Scalars['String'];
};

export type ReplyToMessageInput = {
  messageId: Scalars['String'];
  content: Scalars['String'];
  embedUrl?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type S3BulkSignedUrlInput = {
  files: Array<S3SignedUrlInput>;
};

export type S3SignedUrlInput = {
  key: Scalars['String'];
  fileType: Scalars['String'];
};

export type SearchSecurityInput = {
  symbol: Scalars['String'];
};

export type SearchSecurityResponse = {
  __typename?: 'SearchSecurityResponse';
  symbolId: Scalars['String'];
  displaySymbol: Scalars['String'];
  figi: Scalars['String'];
  type: Scalars['String'];
  currency: Scalars['String'];
  description: Scalars['String'];
};

export type Security = {
  __typename?: 'Security';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  currency: Scalars['String'];
  description: Scalars['String'];
  displaySymbol: Scalars['String'];
  figi: Scalars['String'];
  mic: Scalars['String'];
  symbolId: Scalars['String'];
  symbol: Scalars['String'];
  simple: Scalars['String'];
  type: Scalars['String'];
  trending: Scalars['Boolean'];
  trendingScore?: Maybe<Scalars['Float']>;
  documentWithWeights?: Maybe<Scalars['Float']>;
  messages: Array<Maybe<Message>>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatarKey?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  payments: Array<Maybe<Payment>>;
  messages: Array<Maybe<Message>>;
  fullName: Scalars['String'];
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, fullName: string, email: string, payments: Array<Maybe<{ __typename?: 'Payment', invoiceId?: Maybe<string>, productDesc?: Maybe<string>, taxAmount?: Maybe<number>, amountExcludingTax?: Maybe<number>, amountIncludingTax?: Maybe<number>, last4?: Maybe<string>, cardType?: Maybe<string> }>> } } };

export type SearchQueryVariables = Exact<{
  data: SearchSecurityInput;
}>;


export type SearchQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchSecurityResponse', symbolId: string, displaySymbol: string, figi: string, type: string, currency: string, description: string }> };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, fullName: string, email: string, payments: Array<Maybe<{ __typename?: 'Payment', invoiceId?: Maybe<string>, productDesc?: Maybe<string>, taxAmount?: Maybe<number>, amountExcludingTax?: Maybe<number>, amountIncludingTax?: Maybe<number>, last4?: Maybe<string>, cardType?: Maybe<string> }>> } } };

export type MeFragment = { __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, fullName: string, email: string, payments: Array<Maybe<{ __typename?: 'Payment', invoiceId?: Maybe<string>, productDesc?: Maybe<string>, taxAmount?: Maybe<number>, amountExcludingTax?: Maybe<number>, amountIncludingTax?: Maybe<number>, last4?: Maybe<string>, cardType?: Maybe<string> }>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, firstName?: Maybe<string>, lastName?: Maybe<string>, fullName: string, email: string, payments: Array<Maybe<{ __typename?: 'Payment', invoiceId?: Maybe<string>, productDesc?: Maybe<string>, taxAmount?: Maybe<number>, amountExcludingTax?: Maybe<number>, amountIncludingTax?: Maybe<number>, last4?: Maybe<string>, cardType?: Maybe<string> }>> }> };

export type GetSignedUrlMutationVariables = Exact<{
  data: S3SignedUrlInput;
}>;


export type GetSignedUrlMutation = { __typename?: 'Mutation', getSignedS3Url?: Maybe<string> };

export type GetBulkSignedUrlMutationVariables = Exact<{
  data: S3BulkSignedUrlInput;
}>;


export type GetBulkSignedUrlMutation = { __typename?: 'Mutation', getBulkSignedS3Url?: Maybe<Array<{ __typename?: 'BulkSignedResponse', url: string, key: string }>> };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  firstName
  lastName
  fullName
  email
  payments {
    invoiceId
    productDesc
    taxAmount
    amountExcludingTax
    amountIncludingTax
    last4
    cardType
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      ...Me
    }
    token
  }
}
    ${MeFragmentDoc}`;
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchDocument = gql`
    query Search($data: SearchSecurityInput!) {
  search(data: $data) {
    symbolId
    displaySymbol
    figi
    type
    currency
    description
  }
}
    `;
export function useSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      ...Me
    }
    token
  }
}
    ${MeFragmentDoc}`;
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetSignedUrlDocument = gql`
    mutation GetSignedUrl($data: S3SignedUrlInput!) {
  getSignedS3Url(data: $data)
}
    `;
export function useGetSignedUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetSignedUrlMutation, GetSignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetSignedUrlMutation, GetSignedUrlMutationVariables>(GetSignedUrlDocument, options);
      }
export type GetSignedUrlMutationHookResult = ReturnType<typeof useGetSignedUrlMutation>;
export type GetSignedUrlMutationResult = Apollo.MutationResult<GetSignedUrlMutation>;
export type GetSignedUrlMutationOptions = Apollo.BaseMutationOptions<GetSignedUrlMutation, GetSignedUrlMutationVariables>;
export const GetBulkSignedUrlDocument = gql`
    mutation GetBulkSignedUrl($data: S3BulkSignedUrlInput!) {
  getBulkSignedS3Url(data: $data) {
    url
    key
  }
}
    `;
export function useGetBulkSignedUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetBulkSignedUrlMutation, GetBulkSignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetBulkSignedUrlMutation, GetBulkSignedUrlMutationVariables>(GetBulkSignedUrlDocument, options);
      }
export type GetBulkSignedUrlMutationHookResult = ReturnType<typeof useGetBulkSignedUrlMutation>;
export type GetBulkSignedUrlMutationResult = Apollo.MutationResult<GetBulkSignedUrlMutation>;
export type GetBulkSignedUrlMutationOptions = Apollo.BaseMutationOptions<GetBulkSignedUrlMutation, GetBulkSignedUrlMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;