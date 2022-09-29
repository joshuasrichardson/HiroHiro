import { Auth } from "aws-amplify";

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
    return await Auth.signIn(username, password);
  } catch (error) {
    console.log("error signing in", error);
  }
};

const ServerFacade = {
  register,
  confirmSignUp,
  login,
};

export default ServerFacade;
