export class UserLoginResponse {
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
