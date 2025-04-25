import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import { useNameStore } from "../../store/store";
import * as SecureStore from "expo-secure-store";

const Stats = () => {
  const [inputName, setInputName] = useState("");
  const { name, getName, setName } = useNameStore();
  useEffect(() => {
    getName();
  }, []);

  const changeName = async () => {
    setName(inputName);
    Keyboard.dismiss();
  };

  const deleteNameInStorage = async () => {
    setName("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{inputName}</Text>

      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
        placeholder="Enter your name"
        onSubmitEditing={changeName}
      />
      <Pressable style={styles.button} onPress={changeName}>
        <Text> Изменить</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={deleteNameInStorage}>
        <Text> удалить в хранилище</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 7,
    backgroundColor: "teal",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
});
export default Stats;
