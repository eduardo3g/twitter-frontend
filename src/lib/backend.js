import { API } from 'aws-amplify';
import gql from 'graphql-tag';

const getMyProfile = async () => {
  const result = await API.graphql({
      query: gql`query getMyProfile {
        getMyProfile {
          backgroundImageUrl
          bio
          birthdate
          createdAt
          followersCount
          followingCount
          id
          imageUrl
          likesCount
          location
          name
          screenName
          tweetsCount
          website
        }
      }`,
      authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  });

  const profile = result.data.getMyProfile;
  profile.imageUrl = profile.imageUrl || 'default_profile.png';

  return profile;
};

export {
  getMyProfile,
};