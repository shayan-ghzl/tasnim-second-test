import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

const SECRET_KEY = 'tasnim_secret_key';

export enum AuthStatus {
  pending = 1,
  reject = 2,
  passes = 3,
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  token: string | null = null;
  authenticationStatus: AuthStatus = AuthStatus.pending;

  private secureStorage = new SecureStorage(localStorage, {
    // Hash is a one way encryption
    hash: function hash(key: string | CryptoJS.lib.WordArray) {
      return CryptoJS.SHA256(key, { SECRET_KEY }).toString();
    },
    // Encrypt the localstorage data
    encrypt: function encrypt(data: string | CryptoJS.lib.WordArray) {
      const encryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY);
      return encryptedData.toString();
    },
    // Decrypt the encrypted data
    decrypt: function decrypt(data: string | CryptoJS.lib.CipherParams) {
      const decryptedData = CryptoJS.AES.decrypt(data, SECRET_KEY);
      return decryptedData.toString(CryptoJS.enc.Utf8);
    }
  });

  // stores in localStorage
  setItem(key: string, value: string) {
    this.secureStorage.setItem(key, value);
  }

  // get value from local storage
  getItem(key: string): string | null {
    return this.secureStorage.getItem(key);
  }

  // remove item from local storage
  removeItem(key: string) {
    this.secureStorage.removeItem(key);
  }

  length(): number {
    return this.secureStorage.length;
  }

  // clears all data in local storage
  clear() {
    this.secureStorage.clear();
  }

  getMainToken(): string | null {
    return this.secureStorage.getItem('mainauthorization');
  }

  setMainToken(value: string) {
    this.secureStorage.setItem('mainauthorization', value);
  }

  removeMainToken() {
    this.secureStorage.removeItem('mainauthorization');
  }
}
