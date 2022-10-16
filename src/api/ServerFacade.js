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

const getUserUpdateReq = (id, attribute, value, version) => {
  if (attribute === "nationality") {
    return {
      id: id,
      _version: version,
      nationality: value,
    };
  }
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

const ServerFacade = {
  register,
  confirmSignUp,
  login,
  setUserAttribute,
};

export default ServerFacade;
