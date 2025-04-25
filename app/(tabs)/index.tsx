import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import SelectProf from "@/components/selectProf";

const Index = () => {
  const [curName, setCurName] = useState<string>("");
  const [updateName, setUpdateName] = useState<boolean>(false);
  useEffect(() => {
    const checkName = async () => {
      try {
        const name = await SecureStore.getItemAsync("namePerson");
        if (name) {
          setCurName(name);
        }
      } catch (error) {
        console.error("Failed to get name:", error);
      }
    };
    checkName();
  }, [updateName]);
  const deletename = async () => {
    try {
      await SecureStore.deleteItemAsync("namePerson");
      setUpdateName(!updateName);
    } catch (error) {
      console.error("Failed to delete name:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/mainBg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.mainText}>
            Программа для проверки знаний по ТБ
          </Text>
        </View>
        <SelectProf />
      </View>
    </ImageBackground>
  );
};
export default Index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    minHeight: "100%",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    marginBlockStart: 30,
  },
  myBtn: {
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
