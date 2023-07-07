import { StyleSheet } from "react-native";
import { theme } from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: 600,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  toDoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
