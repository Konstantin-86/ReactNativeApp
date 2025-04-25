// store.ts
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface NameStore {
  name: string;
  getName: () => Promise<void>;
  setName: (newName: string) => Promise<void>;
}
interface ProfStore {
  curNameProf: string;
  getNameProf: () => Promise<void>;
  setNameProf: (newName: string) => Promise<void>;
}

export const useNameStore = create<NameStore>((set) => ({
  name: "зустанд работяга",

  getName: async () => {
    try {
      const storedName = await SecureStore.getItemAsync("namePerson");
      set({ name: storedName || "" });
    } catch (error) {
      console.error("Failed to load name:", error);
      set({ name: "" });
    }
  },

  setName: async (newName) => {
    try {
      await SecureStore.setItemAsync("namePerson", newName);
      set({ name: newName });
    } catch (error) {
      console.error("Failed to save name:", error);
    }
  },
}));
export const useNameOfProf = create<ProfStore>((set) => ({
  curNameProf: "выбери свою профессию",

  getNameProf: async () => {
    try {
      const storedName = await SecureStore.getItemAsync("nameProf");
      set({ curNameProf: storedName || "" });
    } catch (error) {
      console.error("Failed to load name:", error);
      set({ curNameProf: "" });
    }
  },

  setNameProf: async (newName) => {
    try {
      await SecureStore.setItemAsync("nameProf", newName);
      set({ curNameProf: newName });
    } catch (error) {
      console.error("Failed to save name:", error);
    }
  },
}));
