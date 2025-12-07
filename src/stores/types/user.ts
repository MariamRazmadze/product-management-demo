export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken?: string;
};

export type LoginResponse = User;

export type AuthProps = {
  user: User | null;
  isAuthenticated: boolean;
  authStatus: {
    isLoading: boolean;
    isSuccess: boolean;
    error: string;
    message: string;
  };
};
