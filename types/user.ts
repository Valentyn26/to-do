export interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginUser {
    email: string;
    password: string;
}