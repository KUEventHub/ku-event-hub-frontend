export interface CreateUser {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    idCode: string;
    faculty: string;
    phoneNumber: string;
    gender: string;
    description?: string;
    profilePicture: {
      url?: string;
      base64Image?: string;
    };
    interestedEventTypes: string[];
  };
}

export interface UserMenu {
  user: {
    _id: string;
    username: string;
    email: string;
    profilePictureUrl: string;
  };
}

export interface EditUserInfo {
  user: {
    username?: string;
    firstName?: string;
    lastName?: string;
    idCode?: string;
    faculty?: string;
    phoneNumber?: string;
    gender?: string;
    description?: string;
    profilePicture?: {
      url?: string;
      base64Image?: string;
    };
    interestedEventTypes?: string[];
  };
}

export interface EditUserPrivacy {
  user: {
    showUserInformation?: boolean;
    showEvents?: boolean;
    showFriends?: boolean;
  };
}

export interface UserList {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  loginTime: string;
  role: string;
  isBanned: boolean;
  auth0UserId: string;
}

export interface BannedUserList {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  ban: {
    _id: string;
    time: Date;
    reason: string;
  };
  auth0UserId: string;
}

export interface Auth0UserData {
  blocked?: boolean;
}
