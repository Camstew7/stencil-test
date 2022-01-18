import { CookieService } from './cookie.service';
import jwt_decode from 'jwt-decode';

export interface AuthTokenPayload {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    activeCompanyId: string;
    isInternal: boolean;
    timezone: string;
    language: string;
    created: string;
    modified: string;
    department: string;
  };
  company: {
    _id: string;
    name: string;
    country: string;
    created: string;
    modified: string;
  };
}

class AuthServiceController {
  constructor() {}

  getCurrentAuthToken(): string {
    let authToken: string = '';

    try {
      authToken = JSON.parse(CookieService.getCookie('gydaToken')).token;
    } catch (e) {
      console.error('Failed to retrieve current auth token', e);
    }

    return authToken;
  }

  getCurrentAuthPayload(): AuthTokenPayload {
    const currentAuthToken = this.getCurrentAuthToken();
    let currentAuthTokenPayload;

    try {
      currentAuthTokenPayload = jwt_decode(currentAuthToken);
    } catch (e) {
      console.error('Failed to decode auth token payload', e);
    }

    return currentAuthTokenPayload;
  }
}

export const AuthService = new AuthServiceController();
