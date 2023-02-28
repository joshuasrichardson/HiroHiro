import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CompositeIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
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

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserRelationship = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<UserRelationship, ['userId', 'otherUserId']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userId: string;
  readonly otherUserId: string;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserRelationship = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<UserRelationship, ['userId', 'otherUserId']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userId: string;
  readonly otherUserId: string;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserRelationship = LazyLoading extends LazyLoadingDisabled ? EagerUserRelationship : LazyUserRelationship

export declare const UserRelationship: (new (init: ModelInit<UserRelationship>) => UserRelationship) & {
  copyOf(source: UserRelationship, mutator: (draft: MutableModel<UserRelationship>) => MutableModel<UserRelationship> | void): UserRelationship;
}