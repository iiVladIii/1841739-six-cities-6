export interface User {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export interface UserAuthData extends User {
    email: string;
    token: string;
}
