import CryptoJS from 'crypto-js';

const SECRET_KEY = 'nh-highway-delights-2024';

export const encryptData = (data: any): string => {
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
};

export const decryptData = (encryptedData: string): any => {
  try {
    const decodedData = decodeURIComponent(encryptedData);
    const decrypted = CryptoJS.AES.decrypt(decodedData, SECRET_KEY);
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};