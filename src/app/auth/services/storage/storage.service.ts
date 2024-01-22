import { Injectable } from '@angular/core';

const TOKEN = "token";
const ID = "id";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveId(id: number) {
    window.localStorage.removeItem(ID);
    window.localStorage.setItem(ID, id.toString());
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getId() {
    return window.localStorage.getItem(ID);
  }

  static logout() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(ID);
  }

}
