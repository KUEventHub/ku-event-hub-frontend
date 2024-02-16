export interface FriendCard {
  _id: string;
  username: string;
  profilePictureUrl: string;
  isSelf: boolean;
}

export interface FriendRequest {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePictureUrl: string;
  };
}
