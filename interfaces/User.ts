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
}
