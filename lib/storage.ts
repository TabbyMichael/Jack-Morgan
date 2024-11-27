import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `products/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
