import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function Welcome() {
  const [namePerson, setNamePerson] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isCheckingStorage, setIsCheckingStorage] = useState<boolean>(true);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  // Проверяем хранилище при монтировании
  useEffect(() => {
    async function checkStorage() {
      try {
        const storedName = await SecureStore.getItemAsync("namePerson");
        if (storedName) {
          showWelcomeAndRedirect(storedName);
        }
      } catch (error) {
        console.error("Storage error:", error);
        setIsCheckingStorage(false);
      }
    }

    checkStorage();
  }, []);

  // Логика отображения приветствия и перенаправления
  const showWelcomeAndRedirect = (name: string) => {
    setShowWelcome(true);
    setNamePerson(name);

    setTimeout(() => {
      router.replace("/(tabs)");
    }, 3000);
  };

  // Сохранение имени и переход
  const handleSaveName = async () => {
    if (!inputName.trim()) return;

    try {
      await SecureStore.setItemAsync("namePerson", inputName);
      showWelcomeAndRedirect(inputName);
    } catch (error) {
      console.error("Failed to save name:", error);
    }
  };

  /*  if (isCheckingStorage) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } */

  if (showWelcome) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Добро пожаловать, {namePerson}!</Text>
        <Text style={styles.redirectText}>
          Перенаправляем вас в приложение...
        </Text>
      </View>
    );
  }

  // Форма ввода имени
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellcome</Text>
      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
        placeholder="Ваше имя"
      />
      <Button
        title="Продолжить"
        onPress={handleSaveName}
        disabled={!inputName.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  redirectText: {
    fontSize: 16,
    color: "#666",
  },
});
