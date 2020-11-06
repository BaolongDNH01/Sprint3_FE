import {Injectable} from '@angular/core';

const USER_ID = 'userId';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const EMAIL_KEY = 'email';
const AUTHORITIES_KEY = 'authorities';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private roles: Array<string> = [];

  constructor() {
  }

  saveUserId(userId: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
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
