export interface User {
    id: number;
    username: string;
    password: string;
}

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}