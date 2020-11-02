import { Injectable } from '@angular/core';
const USER_ID = 'userId';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const EMAIL_KEY = 'email';
const AVATAR_KEY = 'avatar';
const AUTHORITIES_KEY = 'authorities';
const USER_WALLET = 'wallet';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private roles: Array<string> = [];

  constructor() { }

  saveUserId(userId: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
  }

  saveUserWallet(wallet: number): void {
    window.sessionStorage.removeItem(String(USER_WALLET));
    window.sessionStorage.setItem(String(USER_WALLET), String(wallet));
  }

  getUserWallet(): string {
    return sessionStorage.getItem(USER_WALLET);
  }

  getUserId(): string {
    return sessionStorage.getItem(USER_ID);
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUsername(username: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  saveEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }

  getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }

  saveAvatar(avatarUrl: string): void {
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatarUrl);
  }

  getAvatar(): string {
    return sessionStorage.getItem(AVATAR_KEY);
  }

  saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  logOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, JSON.stringify(user));
  }

  public getUser(): void {
    return JSON.parse(sessionStorage.getItem(USERNAME_KEY));
  }
}
