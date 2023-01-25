/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      firstName
      lastName
      email
      nativeLanguage
      learningLanguage
      pictureURLs
      nationality
      languageLevel
      languageGoals
      hobbies
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      firstName
      lastName
      email
      nativeLanguage
      learningLanguage
      pictureURLs
      nationality
      languageLevel
      languageGoals
      hobbies
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      firstName
      lastName
      email
      nativeLanguage
      learningLanguage
      pictureURLs
      nationality
      languageLevel
      languageGoals
      hobbies
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateUserRelationship = /* GraphQL */ `
  subscription OnCreateUserRelationship(
    $filter: ModelSubscriptionUserRelationshipFilterInput
    $owner: String
  ) {
    onCreateUserRelationship(filter: $filter, owner: $owner) {
      userId
      otherUserId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateUserRelationship = /* GraphQL */ `
  subscription OnUpdateUserRelationship(
    $filter: ModelSubscriptionUserRelationshipFilterInput
    $owner: String
  ) {
    onUpdateUserRelationship(filter: $filter, owner: $owner) {
      userId
      otherUserId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteUserRelationship = /* GraphQL */ `
  subscription OnDeleteUserRelationship(
    $filter: ModelSubscriptionUserRelationshipFilterInput
    $owner: String
  ) {
    onDeleteUserRelationship(filter: $filter, owner: $owner) {
      userId
      otherUserId
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
