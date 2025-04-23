import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { allProf } from "@/data/allprof";
import * as SecureStore from "expo-secure-store";
import { useAtom } from 'jotai';
import { nameAtom } from '@/store/userStore';

const SelectProf = () => {
    const [name, setName] = useAtom(nameAtom);
    const [selectedValue, setSelectedValue] = useState(allProf[0].nameOfProf);
    const [isLoading, setIsLoading] = useState(true);
    const [detailsOfProf, setDetailsOfProf] = useState(allProf[0]);

    useEffect(() => {
        const loadSavedProf = async () => {
            try {
                const savedProf = await SecureStore.getItemAsync("nameProf");
                if (savedProf) {
                    setSelectedValue(savedProf);
                }
            } catch (error) {
                console.error("Failed to load saved profession:", error);
            } finally {
                setIsLoading(false);
                setDetailsOfProf(allProf.find((item) => item.nameOfProf === selectedValue) || allProf[0]);
            }
        };

        loadSavedProf();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const setNewProf = async () => {
                try {
                    await SecureStore.setItemAsync("nameProf", selectedValue);
                } catch (error) {
                    console.error("Failed to save name:", error);
                }
            };
            setNewProf();
            setDetailsOfProf(allProf.find((item) => item.nameOfProf === selectedValue) || allProf[0]);
        }
    }, [selectedValue, isLoading]);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>

            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
            <View >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoTextTitle}>Профессия:</Text>
                    <Text style={styles.infoTextContent}>{selectedValue}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoTextTitle}>Количество вопросов:</Text>
                    <Text style={styles.infoTextContent}>{detailsOfProf.numberOfQuestions}</Text>
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