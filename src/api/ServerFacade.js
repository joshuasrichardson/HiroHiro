import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import { User } from "../models";
import { API, graphqlOperation } from "aws-amplify";
import { userByEmail } from "../graphql/queries";
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

const setNationality = async (user, nationality) => {
  user.nationality = nationality;
  user.createdAt = undefined;
  user.updatedAt = undefined;
  user._deleted = undefined;
  user._lastChangedAt = undefined;
  user.owner = undefined;
  try {
    const response = await API.graphql({
      query: updateUser,
      variables: { input: user },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const ServerFacade = {
  register,
  confirmSignUp,
  login,
  setNationality,
};

export default ServerFacade;
