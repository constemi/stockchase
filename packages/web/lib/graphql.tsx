/* eslint-disable */
import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string
}

export type BaseEntity = {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  email: Scalars["String"]
  password: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  fullName: Scalars["String"]
}

export type BulkSignedResponse = {
  __typename?: "BulkSignedResponse"
  url: Scalars["String"]
  key: Scalars["String"]
}

export type AuthResponse = {
  __typename?: "AuthResponse"
  user: User
  token: Scalars["String"]
}

export type S3SignedUrlInput = {
  key: Scalars["String"]
  fileType: Scalars["String"]
}

export type S3BulkSignedUrlInput = {
  files: Array<S3SignedUrlInput>
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  avatarKey?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type ResetPasswordInput = {
  password: Scalars["String"]
  token: Scalars["String"]
}

export type LoginInput = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type RegisterInput = {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
}

export type Mutation = {
  __typename?: "Mutation"
  getSignedS3Url?: Maybe<Scalars["String"]>
  getBulkSignedS3Url?: Maybe<Array<BulkSignedResponse>>
  login: AuthResponse
  register: AuthResponse
  updateMe: User
  logout: Scalars["Boolean"]
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export type MutationGetSignedS3UrlArgs = {
  data: S3SignedUrlInput
}

export type MutationGetBulkSignedS3UrlArgs = {
  data: S3BulkSignedUrlInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationRegisterArgs = {
  data: RegisterInput
}

export type MutationUpdateMeArgs = {
  data: UpdateUserInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type MeFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "fullName" | "email"
>

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & { me?: Maybe<{ __typename?: "User" } & MeFragment> }

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation" } & Pick<Mutation, "logout">

export type GetSignedUrlMutationVariables = Exact<{
  data: S3SignedUrlInput
}>

export type GetSignedUrlMutation = { __typename?: "Mutation" } & Pick<Mutation, "getSignedS3Url">

export type GetBulkSignedUrlMutationVariables = Exact<{
  data: S3BulkSignedUrlInput
}>

export type GetBulkSignedUrlMutation = { __typename?: "Mutation" } & {
  getBulkSignedS3Url?: Maybe<
    Array<{ __typename?: "BulkSignedResponse" } & Pick<BulkSignedResponse, "url" | "key">>
  >
}

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<Mutation, "forgotPassword">

export type LoginMutationVariables = Exact<{
  data: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type RegisterMutationVariables = Exact<{
  data: RegisterInput
}>

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token"> & {
      user: { __typename?: "User" } & MeFragment
    }
}

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput
}>

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<Mutation, "resetPassword">

export const MeFragmentDoc = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    email
  }
`
export const MeDocument = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>
export const GetSignedUrlDocument = gql`
  mutation GetSignedUrl($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data)
  }
`
export function useGetSignedUrlMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<GetSignedUrlMutation, GetSignedUrlMutationVariables>,
) {
  return ApolloReactHooks.useMutation<GetSignedUrlMutation, GetSignedUrlMutationVariables>(
    GetSignedUrlDocument,
    baseOptions,
  )
}
export type GetSignedUrlMutationHookResult = ReturnType<typeof useGetSignedUrlMutation>
export type GetSignedUrlMutationResult = Apollo.MutationResult<GetSignedUrlMutation>
export type GetSignedUrlMutationOptions = Apollo.BaseMutationOptions<
  GetSignedUrlMutation,
  GetSignedUrlMutationVariables
>
export const GetBulkSignedUrlDocument = gql`
  mutation GetBulkSignedUrl($data: S3BulkSignedUrlInput!) {
    getBulkSignedS3Url(data: $data) {
      url
      key
    }
  }
`
export function useGetBulkSignedUrlMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetBulkSignedUrlMutation,
    GetBulkSignedUrlMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<GetBulkSignedUrlMutation, GetBulkSignedUrlMutationVariables>(
    GetBulkSignedUrlDocument,
    baseOptions,
  )
}
export type GetBulkSignedUrlMutationHookResult = ReturnType<typeof useGetBulkSignedUrlMutation>
export type GetBulkSignedUrlMutationResult = Apollo.MutationResult<GetBulkSignedUrlMutation>
export type GetBulkSignedUrlMutationOptions = Apollo.BaseMutationOptions<
  GetBulkSignedUrlMutation,
  GetBulkSignedUrlMutationVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    baseOptions,
  )
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    baseOptions,
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
