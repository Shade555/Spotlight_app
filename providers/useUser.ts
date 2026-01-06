import { Platform } from "react-native";
// @ts-ignore
const { useUser } = Platform.OS === "web"
  ? require("@clerk/clerk-react")
  : require("@clerk/clerk-expo");
export { useUser };
