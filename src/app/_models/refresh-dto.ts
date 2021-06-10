export class RefreshDTO {
    jwt: string;
    refreshToken: string;
    constructor(jwt: string, refreshToken: string) {
        this.jwt = jwt;
        this.refreshToken = refreshToken;
    }
}
