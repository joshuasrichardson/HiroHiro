import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserRelationshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerUser = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly nativeLanguage?: string | null;
  readonly learningLanguage?: string | null;
  readonly pictureURLs?: (string | null)[] | null;
  readonly nationality?: string | null;
  readonly languageLevel?: string | null;
  readonly languageGoals?: (string | null)[] | null;
  readonly hobbies?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly nativeLanguage?: string | null;
  readonly learningLanguage?: string | null;
  readonly pictureURLs?: (string | null)[] | null;
  readonly nationality?: string | null;
  readonly languageLevel?: string | null;
  readonly languageGoals?: (string | null)[] | null;
  readonly hobbies?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerUserRelationship = {
  readonly id: string;
  readonly userId: string;
  readonly otherUserId: string;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserRelationship = {
  readonly id: string;
  readonly userId: string;
  readonly otherUserId: string;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserRelationship = LazyLoading extends LazyLoadingDisabled ? EagerUserRelationship : LazyUserRelationship

export declare const UserRelationship: (new (init: ModelInit<UserRelationship, UserRelationshipMetaData>) => UserRelationship) & {
  copyOf(source: UserRelationship, mutator: (draft: MutableModel<UserRelationship, UserRelationshipMetaData>) => MutableModel<UserRelationship, UserRelationshipMetaData> | void): UserRelationship;
}