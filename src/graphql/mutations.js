/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserRelationship = /* GraphQL */ `
  mutation CreateUserRelationship(
    $input: CreateUserRelationshipInput!
    $condition: ModelUserRelationshipConditionInput
  ) {
    createUserRelationship(input: $input, condition: $condition) {
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
export const updateUserRelationship = /* GraphQL */ `
  mutation UpdateUserRelationship(
    $input: UpdateUserRelationshipInput!
    $condition: ModelUserRelationshipConditionInput
  ) {
    updateUserRelationship(input: $input, condition: $condition) {
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
export const deleteUserRelationship = /* GraphQL */ `
  mutation DeleteUserRelationship(
    $input: DeleteUserRelationshipInput!
    $condition: ModelUserRelationshipConditionInput
  ) {
    deleteUserRelationship(input: $input, condition: $condition) {
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
