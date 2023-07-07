import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto, AntDesign } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const WORKING = "@working";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    try {
      const s = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch (e) {
      console.error(e);
    }
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  const addToDo = async () => {
    if (text === "") return;
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working: working, check: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const changeCheck = async (key) => {
    const newToDos = {
      ...toDos,
      [key]: {
        text: toDos[key].text,
        working: toDos[key].working,
        check: !toDos[key].check,
      },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem(WORKING, String(working));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTheme = async () => {
    const w = await AsyncStorage.getItem(WORKING);
    setWorking(w === "true");
  };

  useEffect(() => {
    loadToDos();
    loadTheme();
  }, []);
  useEffect(() => {
    saveTheme();
  }, [working]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText} // 텍스트 변환 이벤트 발생 시 실행
          returnKeyType="done"
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          style={styles.input}
          value={text}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View key={key} style={styles.toDo}>
                <Text
                  style={{
                    ...styles.toDoText,
                    textDecorationLine: toDos[key].check
                      ? "line-through"
                      : "none",
                    color: toDos[key].check ? "#aaa" : "#fff",
                  }}
                >
                  {toDos[key].text}
                </Text>
                <View style={styles.iconBox}>
                  <AntDesign
                    name={toDos[key].check ? "checksquareo" : "checksquare"}
                    size={18}
                    color="white"
                    onPress={() => changeCheck(key)}
                  />
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <Fontisto name="trash" size={18} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          )}
        </ScrollView>
      </View>
    </View>
  );
}
