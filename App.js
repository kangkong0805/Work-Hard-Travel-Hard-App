import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* 누르면 투명도 애니메이션 부여하는 컴포넌트*/}
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>

        {/* 누르면 강조 애니메이션 부여하는 컴포넌트*/}
        <TouchableHighlight
          underlayColor="red"
          activeOpacity={0.2}
          onPress={() => {
            console.log("pressed");
          }}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

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
    color: "#fff",
    fontSize: 38,
    fontWeight: 600,
  },
});
