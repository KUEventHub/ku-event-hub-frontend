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
