export const USER_QUERY = {
  PROFILE: `query {
        Viewer {
          id
          name
          about
          avatar {
            large
            medium
          }
          bannerImage
          isFollowing
          isFollower
          isBlocked
          createdAt
      }
      }`,
};
