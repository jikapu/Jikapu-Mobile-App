import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
export const storeItem = async (key, item) => {
  try {
    //we want to wait for the Promise returned by MMKV.setString()
    //to be resolved to the actual value before returning the value
    var jsonOfItem =  await AsyncStorage.setItem(key, item);
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}

export const getItem =  async (key) => {
  try {
    const retrievedItem =  await AsyncStorage.getItem(key);
    return retrievedItem ;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

export const removeItem = async (key) => {
  try {
    const jsonOfItem =  await AsyncStorage.removeItem(key);
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

export const clearDB = async () => {
  try {
    const retrievedItem =   await AsyncStorage.clear();
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
}
export const clearStorage =  async () => {
  try {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
      }
    }
  } catch(e){
    //
  }
}

