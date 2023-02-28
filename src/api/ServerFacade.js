import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  userByEmail,
  listUsers,
  listUserRelationships,
} from "../graphql/queries";
import {
  updateUser,
  updateUserRelationship,
  createUserRelationship,
} from "../graphql/mutations";

const register = async (username, password, email) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
      autoSignIn: {
        // enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    return user;
  } catch (error) {
    console.log("error signing up:", error);
    throw error;
  }
};

const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
};

const login = async (username, password) => {
  try {
    await Auth.signIn(username, password);
    const response = await API.graphql({
      query: userByEmail,
      variables: { email: username },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return response.data.userByEmail.items.filter((user) => !user._deleted)[0];
  } catch (error) {
    console.log("error signing in", error);
  }
};

const getUserUpdateReq = (id, attribute, value, version) => {
  return {
    id: id,
    _version: version,
    [attribute]: value,
  };
};

const setUserAttribute = async (id, attribute, value, version) => {
  try {
    console.log(attribute, value);
    const updateRequest = getUserUpdateReq(id, attribute, value, version);
    console.log(updateRequest);
    const response = await API.graphql({
      query: updateUser,
      variables: { input: updateRequest },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(response.data.updateUser);
    return response.data.updateUser;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const result = await API.graphql({
      query: listUsers,
      variables: {},
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(result); //todo: filter out friends
    return result.data.listUsers.items;
  } catch (error) {
    console.log("Error getting users: ", error);
  }
};

const getUnseenUsers = async (userId, friendsIds) => {
  return (await getAllUsers()).filter(
    (user) => !friendsIds.some((id) => id === user.id || id === userId)
  );
};

const getUser = (id) => {
  if (!id) id = Math.floor(Math.random() * 1000);
  return {
    email: `TanakaFamily${id}@gmail.com`,
    firstName: `The`,
    lastName: `Tanaka Family`,
    nativeLanguage: "Japanese",
    learningLanguage: "English",
    pictureURLs: "../../assets/family.png",
    nationality: "Japanese",
    languageLevel: "Intermediate",
    languageGoals: ["Speaking"],
    hobbies: ["Karate", "Reading", "Fishing", "Swimming"],
  };
};

const getFriends = async (id) => {
  try {
    const firstResult = await API.graphql({
      query: listUserRelationships,
      variables: {
        input: {
          userId: id,
          status: "friends",
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(firstResult);

    const secondResult = await API.graphql({
      query: listUserRelationships,
      variables: {
        input: {
          otherUserId: id,
          status: "friends",
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(secondResult);

    const ids = firstResult.data.listUserRelationships.items.map(
      (item) => item.otherUserId
    );
    ids.push(
      ...secondResult.data.listUserRelationships.items.map(
        (item) => item.userId
      )
    );

    const allUsers = await getAllUsers();
    return allUsers.filter((user) => ids.includes(user.id) && user.id !== id);

    // const result = await API.graphql({
    //   query: listUsers,
    //   variables: {},
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // });
    // console.log(result);
    // return result.data.listUsers.items;
  } catch (error) {
    console.log("Error getting users: ", error);
  }
};

const createDummyUsers = async () => {
  const numUsers = 100;

  for (let i = 0; i < numUsers; i++) {
    const input = {
      firstName: `DummyUser${i}`,
      lastName: `LastName${i}`,
      email: `dummyuser${i}@example.com`,
      nativeLanguage: "English",
      learningLanguage: "Japanese",
      pictureURLs: [],
      nationality: "American",
      languageLevel: "Intermediate",
      languageGoals: "Improve speaking skills",
      hobbies: ["reading", "traveling"],
    };

    try {
      const response = await API.graphql({
        query: createUser,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(`Created user with id: ${response.data.createUser.id}`);
    } catch (err) {
      console.log(`Error creating user: ${err}`);
    }
  }
};

const updateOrCreateUserRelationship = async (input) => {
  try {
    // Try to update the UserRelationship
    const updateResponse = await API.graphql({
      query: updateUserRelationship,
      variables: {
        input,
        condition: {
          userId: { eq: input.userId },
          otherUserId: { eq: input.otherUserId },
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    // If the update succeeded, return the updated UserRelationship
    if (updateResponse.updateUserRelationship) {
      return updateResponse.updateUserRelationship;
    }
  } catch (updateError) {
    // If the update failed, try to create the UserRelationship
    try {
      const createResponse = await API.graphql({
        query: createUserRelationship,
        variables: {
          input,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      // If the create succeeded, return the created UserRelationship
      if (createResponse.createUserRelationship) {
        return createResponse.createUserRelationship;
      }
    } catch (createError) {
      // If the create also failed, throw an error
      console.log(createError);
      console.log(updateError);
      // throw new Error(
      //   `Failed to update or create UserRelationship: ${updateError.toString()}, ${createError.toString()}`
      // );
    }
  }
};

const addFriend = async (user, profileUser) => {
  const resp = await updateOrCreateUserRelationship({
    userId: user.id,
    otherUserId: profileUser.id,
    status: "friends",
  });
  return resp;
  const response = await API.graphql({
    query: updateUserRelationship,
    variables: {
      input: {
        userId: user.id,
        otherUserId: profileUser.id,
        status: "friends",
      },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });
  console.log(response);
  console.log(
    user.firstName,
    user.lastName,
    "added",
    profileUser.firstName,
    profileUser.lastName
  );
};

const dismissUser = async (user, profileUser) => {
  console.log(
    user.firstName,
    user.lastName,
    "dismissed",
    profileUser.firstName,
    profileUser.lastName
  );
};

const ServerFacade = {
  register,
  confirmSignUp,
  login,
  setUserAttribute,
  getUnseenUsers,
  getUser,
  getFriends,
  addFriend,
  dismissUser,
};

export default ServerFacade;
