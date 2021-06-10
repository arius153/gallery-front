export class LogOutDTO {
    refreshToken: string;
    constructor (token: string) {
        this.refreshToken = token;
    }
}
