import { Profile } from './profile.model';

export interface Article {
    _id: string;
    name: string;
    description: string;
    body: string;
    category: string;
    image: string;
    crated_at: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}