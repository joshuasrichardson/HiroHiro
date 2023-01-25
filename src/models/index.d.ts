import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type UserMetaData = {
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