export const ANILIST_QUERY = {
  USER_PROFILE: `query {
        Viewer {
          id
          name
          about
          avatar
          bannerImage
          isFollowing
          isFollower
          isBlocked
          createdAt
      }
      }`,
};
