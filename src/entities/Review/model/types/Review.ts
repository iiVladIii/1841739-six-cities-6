import { User } from '@/entities/User';

export interface Review {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
}
