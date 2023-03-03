import { StyleSheet } from "react-native";

// colors
export const primaryOrange = "#f48405";
export const secondaryOrange = "#f4dcc1";
export const primaryBlue = "#84acdc";
export const secondaryBlue = "#c4d7eb";
export const backgroundGray = "#f3f3f3";

export const profileStyles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: "100%",
  },
  image: {
    width: "90%",
    height: "100%",
    borderColor: primaryOrange,
    borderWidth: 5,
    borderRadius: 20,
    border: "solid",
  },
  outerContainer: {
    flex: 1,
  },
  textContainer: {
    display: "flex",
    padding: 30,
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    display: "flex",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
  text: {
    fontSize: "20px",
    padding: 10,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: 10,
    paddingTop: 25,
  },
});
