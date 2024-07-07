import { User } from '../entities/User';

export interface UserDTO {
    id: string;
    email: string;
    username: string;
    role: string;
}

export function mapUsersToDTO(users: User[]): UserDTO[] {
    return users.map(user => ({
        id: user.id || '', // Handle undefined by providing a default value
        email: user.email,
        username: user.username,
        role: user.role,
    }));
}

export function mapUserToDTO(user: User): UserDTO {
    return {
        id: user.id || '', // Handle undefined by providing a default value
        email: user.email,
        username: user.username,
        role: user.role,
    };
}
