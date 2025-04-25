import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { allProf } from "@/data/allprof";
import { useNameOfProf } from "@/store/store";

const SelectProf = () => {
  const [detailsOfProf, setDetailsOfProf] = useState(allProf[0]);
  const { curNameProf, getNameProf, setNameProf } = useNameOfProf();
  const [selectValue, setSelectValue] = useState("");
  useEffect(() => {
    getNameProf();
    setSelectValue(curNameProf);
  }, []);

  const changeProf = (newItem: string) => {
    setNameProf(newItem);
    setSelectValue(newItem);
    setDetailsOfProf(
      allProf.find((item) => item.nameOfProf === newItem) || allProf[0]
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Picker
          selectedValue={curNameProf}
          onValueChange={changeProf}
          mode="dropdown"
          style={styles.picker}
        >
          {allProf.map((item) => (
            <Picker.Item
              key={item.codeOfProg}
              label={item.nameOfProf}
              value={item.nameOfProf}
            />
          ))}
        </Picker>
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.infoTextTitle}>Профессия:</Text>
          <Text style={styles.infoTextContent}>{detailsOfProf.nameOfProf}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.infoTextTitle}>Количество вопросов:</Text>
          <Text style={styles.infoTextContent}>
            {detailsOfProf.numberOfQuestions}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.infoTextTitle}>Код профессии:</Text>
          <Text style={styles.infoTextContent}>{detailsOfProf.codeOfProg}</Text>
        </View>
      </View>
    </View>
  );
};

export default SelectProf;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    backgroundColor: "lightblue",
    color: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginBlock: 30,
  },
  picker: {
    color: "white",
  },
  infoTextTitle: {
    maxWidth: 100,
    fontWeight: "500",
    fontSize: 16,
    marginInlineStart: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginInlineEnd: 20,
  },
  infoTextContent: {
    maxWidth: "58%",
    fontWeight: "400",
    fontSize: 14,
    marginInlineStart: 5,
    marginBottom: 10,
  },
});
