import { View, Text, StyleSheet, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Главная в табах</Text>
      <Text>имя {curName}</Text>
      <Pressable style={styles.myBtn} onPress={deletename}>
        <Text>Удалить имя</Text>
      </Pressable>
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    color: "lightblue",
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
