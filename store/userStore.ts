import { atom } from 'jotai';
import * as SecureStore from 'expo-secure-store';

// Атом для хранения имени с синхронизацией в SecureStore
export const nameAtom = atom(
    // Функция чтения начального значения
    async () => {
        const name = await SecureStore.getItemAsync('namePerson');
        return name || '';
    },
    // Функция записи (вызывается при изменении атома)
    async (get, set, newName: string) => {
        set(nameAtom, newName); // Обновляем атом
        await SecureStore.setItemAsync('namePerson', newName); // Сохраняем в SecureStore
    }
);

// Производный атом (опционально)
/* export const isNameEmptyAtom = atom((get) => {
  const name = get(nameAtom);
  return name.length === 0;
}); */