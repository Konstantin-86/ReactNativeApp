import { View, Text, StyleSheet } from "react-native";
import { useNameStore } from "../../store/store";
import { useEffect } from "react";

const Profile = () => {
  const { name, getName } = useNameStore();
  useEffect(() => {
    getName();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile в табах</Text>
      <Text>Profile в {name}</Text>
    </View>
  );
};
export default Profile;

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
