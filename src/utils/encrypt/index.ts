import CryptoJS from "crypto-js";

export const encrypt = (word, keyStr) => {
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

export const decrypt = (word, keyStr) => {
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export const encryptPassword = (password) => {
  return encrypt(password, '90cea1acefbb2461');
}


