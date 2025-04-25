import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { allProf } from "@/data/allprof";
import { vlep } from "@/data/vlep";
import { useNameOfProf } from "@/store/store";

interface Prof {
  codeOfProg: number;
  nameOfProf: string;
  numberOfQuestions: number;
}

const Examen = () => {
  const [currentProf, setCurrentProf] = useState<Prof>(allProf[0]);
  const [countOfQuestions, setCountOfQuestions] = useState<number>(0);

  const { curNameProf, getNameProf } = useNameOfProf();
  useEffect(() => {
    getNameProf();
  }, []);
  console.log(curNameProf);

  useEffect(() => {
    const getCurrentProf = async () => {
      try {
        const savedProf = await SecureStore.getItemAsync("nameProf");
        if (savedProf) {
          setCurrentProf(
            allProf.find(
              (item) => item.nameOfProf === currentProf.nameOfProf
            ) || allProf[0]
          );
        }
      } catch (error) {
        console.error("Failed to load saved profession:", error);
      }
    };
    getCurrentProf();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>режим Экзамен</Text>
      <Text>{curNameProf}</Text>
      <Text>{vlep[countOfQuestions].nameOfQuestion}</Text>
      <Text>{vlep[countOfQuestions].answer1}</Text>
      <Text>{vlep[countOfQuestions].answer2}</Text>
      <Text>{vlep[countOfQuestions]?.answer3}</Text>
      <Text>{vlep[countOfQuestions]?.answer4}</Text>
      <Text>{vlep[countOfQuestions]?.answer5}</Text>
      <Pressable
        style={styles.myBtn}
        onPress={() => setCountOfQuestions(countOfQuestions + 1)}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  );
};
export default Examen;

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
