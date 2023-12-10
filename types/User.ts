interface User {
    id: number;
    name: string;
    about: string;
    avatar: {large: string; medium: string};
    bannerImage: string;
    isFollowing: boolean;
    isFollower: boolean;
    isBlocked: boolean;
    createdAt: number;
}