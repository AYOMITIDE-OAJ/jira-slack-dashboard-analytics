interface User {
    _id: string;
    name: string;
    email: string;
    country: string | null;
    isDisabled: boolean;
    isEmailVerified: boolean;
    emailVerifiedAt: string | null;
    displayPicture: string | null;
    passwordResetExpires: string | null;
    passwordResetToken: string | null;
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    role: string;
  }