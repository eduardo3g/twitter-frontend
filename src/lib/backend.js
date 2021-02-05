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

const getProfileByScreenName = async (screenName) => {
  const result = await API.graphql({
    query: gql`
      query getProfile($screenName: String!) {
        getProfile(screenName: $screenName) {
          id
          name
          screenName
          imageUrl
          backgroundImageUrl
          bio
          location
          website
          birthdate
          createdAt
          followersCount
          followingCount
          tweetsCount
          likesCounts
          following
          followedBy
        }
      }
    `,
    variables: {
      screenName
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
  const profile = result.data.getProfile

  profile.imageUrl = profile.imageUrl || 'default_profile.png'
  return profile
}

const getMyTimeline = async (limit, nextToken) => {
  const result = await API.graphql({
    query: gql`
      query getMyTimeline($limit:Int!, $nextToken:String) {
        getMyTimeline(limit: $limit, nextToken: $nextToken) {
          nextToken
          tweets {
            __typename
            id
            profile {
              id
              name
              screenName
              imageUrl
            }
            createdAt
            ... on Tweet {
              text
              liked
              likes
              retweeted
              retweets
              replies
            }
            ... on Retweet {
              retweetOf {
                id
                profile {
                  id
                  name
                  screenName
                  imageUrl
                }
                createdAt
                ... on Tweet {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
                ... on Reply {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
              }
            }
            ... on Reply {
              text
              liked
              likes
              retweeted
              retweets
              replies
              inReplyToTweet {
                id
                profile {
                  id
                  name
                  screenName
                  imageUrl
                }
                createdAt
                ... on Tweet {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
                ... on Reply {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
                ... on Retweet {
                  retweetOf {
                    id
                  }
                }
              }
              inReplyToUsers {
                id
                name
                screenName
                imageUrl
              }
            }
          }
        }
      }
    `,
    variables: {
      limit,
      nextToken
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.getMyTimeline
}

const getTweets = async (userId, limit, nextToken) => {
  const result = await API.graphql({
    query: gql`
      query getTweets($userId:ID!, $limit:Int!, $nextToken:String) {
        getTweets(userId:$userId, limit:$limit, nextToken: $nextToken) {
          nextToken
          tweets {           
            __typename 
            id
            profile {
              id
              name
              screenName
              imageUrl
            }
            createdAt
            ... on Tweet {
              text
              liked
              likes
              retweeted
              retweets
              replies
            }
            ... on Retweet {
              retweetOf {
                id
                profile {
                  id
                  name
                  screenName
                  imageUrl
                }
                createdAt
                ... on Tweet {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
                ... on Reply {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
              }
            }
            ... on Reply {
              text
              liked
              likes
              retweeted
              retweets
              replies
              inReplyToTweet {
                id
                profile {
                  id
                  name
                  screenName
                  imageUrl
                }
                createdAt
                ... on Tweet {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
                ... on Reply {
                  text
                  liked
                  likes
                  retweeted
                  retweets
                  replies
                }
              }
              inReplyToUsers {
                id
                name
                screenName
                imageUrl
              }
            }
          }
        }
      }
    `,
    variables: {
      userId,
      limit,
      nextToken
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.getTweets
}

const getImageUploadUrl = async (extension, contentType) => {
  const result = await API.graphql({
    query: gql`
      query getImageUploadUrl($extension:String, $contentType:String) {
        getImageUploadUrl(extension:$extension, contentType:$contentType) 
      }
    `,
    variables: {
      extension,
      contentType
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.getImageUploadUrl
}

const editMyProfile = async (newProfile) => {
  const result = await API.graphql({
    query: gql`
      mutation editMyProfile($newProfile:ProfileInput!) {
        editMyProfile(newProfile: $newProfile) {
          backgroundImageUrl
          bio
          createdAt
          birthdate
          followersCount
          followingCount
          id
          imageUrl
          likesCounts
          location
          name
          screenName
          tweetsCount
          website
        }
      }
    `,
    variables: {
      newProfile
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
  return result.data.editMyProfile
}

const tweet = async (text) => {
  const result = await API.graphql({
    query: gql`
      mutation tweet($text:String!) {
        tweet(text: $text) {
          createdAt
          id
          liked
          likes
          profile {
            imageUrl
            name
            screenName
          }
          replies
          retweeted
          retweets
          text
        }
      }
    `,
    variables: {
      text
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
  return result.data.tweet
}

const retweet = async (tweetId) => {
  await API.graphql({
    query: gql`
      mutation retweet($tweetId:ID!) {
        retweet(tweetId: $tweetId) {
          id
          createdAt
        }
      }
    `,
    variables: {
      tweetId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const unretweet = async (tweetId) => {
  await API.graphql({
    query: gql`
      mutation unretweet($tweetId:ID!) {
        unretweet(tweetId: $tweetId)
      }
    `,
    variables: {
      tweetId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const like = async (tweetId) => {
  await API.graphql({
    query: gql`
      mutation like($tweetId:ID!) {
        like(tweetId: $tweetId)
      }
    `,
    variables: {
      tweetId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const unlike = async (tweetId) => {
  await API.graphql({
    query: gql`
      mutation unlike($tweetId:ID!) {
        unlike(tweetId: $tweetId)
      }
    `,
    variables: {
      tweetId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const reply = async (tweetId, text) => {
  const result = await API.graphql({
    query: gql`
      mutation reply($tweetId:ID!, $text:String!) {
        reply(tweetId: $tweetId, text: $text) {
          id
          createdAt
          liked
          likes
          profile {
            imageUrl
            name
            screenName
          }
          replies
          retweeted
          retweets
          text
        }
      }
    `,
    variables: {
      tweetId,
      text
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.reply
}

const follow = async (userId) => {
  await API.graphql({
    query: gql`
      mutation follow($userId:ID!) {
        follow(userId: $userId)
      }
    `,
    variables: {
      userId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const unfollow = async (userId) => {
  await API.graphql({
    query: gql`
      mutation unfollow($userId:ID!) {
        unfollow(userId: $userId)
      }
    `,
    variables: {
      userId
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })
}

const getFollowers = async (userId, limit = 10) => {
  const result = await API.graphql({
    query: gql`
      query getFollowers($userId:ID!, $limit:Int!) {
        getFollowers(userId: $userId, limit: $limit) {
          profiles {
            id
            name
            screenName
            imageUrl
            bio
            ... on OtherProfile {
              following
              followedBy
            }
          },
          nextToken
        }
      }
    `,
    variables: {
      userId,
      limit
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.getFollowers
}

const getFollowing = async (userId, limit = 10) => {
  const result = await API.graphql({
    query: gql`
      query getFollowing($userId:ID!, $limit:Int!) {
        getFollowing(userId: $userId, limit: $limit) {
          profiles {
            id
            name
            screenName
            imageUrl
            bio
            ... on OtherProfile {
              following
              followedBy
            }
          },
          nextToken
        }
      }
    `,
    variables: {
      userId,
      limit
    },
    authMode: process.env.VUE_APP_APPSYNC_AUTHENTICATION_TYPE,
  })

  return result.data.getFollowing
}

export {
  getMyProfile,
  getProfileByScreenName,
  getMyTimeline,
  getTweets,
  getImageUploadUrl,
  editMyProfile,
  tweet,
  retweet,
  unretweet,
  like,
  unlike,
  reply,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
};