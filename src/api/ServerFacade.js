import { API, Auth, graphqlOperation } from "aws-amplify";
import { userByEmail, listUsers } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";

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

const getUnseenUsers = async (id) => {
  return Array.from({ length: 20 }, () => getUser());
};

const getUser = (id) => {
  if (!id) id = Math.floor(Math.random() * 1000);
  return {
    email: `friend${id}@gmail.com`,
    firstName: `Friend`,
    lastName: `${id}`,
    nativeLanguage: "Good Language",
    learningLanguage: "Better Language",
    pictureURLs: "../../assets/guy.png",
    nationality: "Korean",
    languageLevel: "10",
    languageGoals: ["Be the best"],
    hobbies: ["Chess"],
  };
};

const getFriends = async (id) => {
  try {
    const result = await API.graphql({
      query: listUsers,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(result);
    return result.data.listUsers.items;
  } catch (error) {
    console.log("Error getting users: ", error);
  }
};

const addFriend = async (user, profileUser) => {
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
