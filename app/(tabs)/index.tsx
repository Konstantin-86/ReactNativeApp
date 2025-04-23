import { View, Text, StyleSheet, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import SelectProf from "@/components/selectProf";
import { useAtom } from 'jotai';
import { nameAtom } from '@/store/userStore';

const Index = () => {
  const [curName, setCurName] = useState<string>("");
  const [name, setName] = useAtom(nameAtom);
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
    <View >
      <LinearGradient
        colors={['rgba(2, 0, 36, 1)', 'rgba(9, 9, 121, 1)', 'rgba(0, 212, 255, 1)']}
        locations={[0.02, 0.11, 1]}
        start={{ x: 0, y: 0 }} // Начальная точка (левый верхний угол)
        end={{ x: 0, y: 1 }}   // Конечная точка (левый нижний угол)
        style={styles.gradient}
      >
        <View>
          <Text style={styles.mainText}>Программа для проверки знаний по ТБ</Text>
        </View>

        <SelectProf />
        <Pressable style={styles.myBtn} onPress={deletename}>
          <Text>Удалить имя</Text>
        </Pressable>
      </LinearGradient>

    </View>
  );
};
export default Index;

const styles = StyleSheet.create({

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: '100%',
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
