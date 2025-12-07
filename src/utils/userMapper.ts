import type { User, LoginResponse } from "../stores/types/user";

export function mapToUser(
  data: LoginResponse | User,
  accessToken?: string
): User {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    image: data.image,
    accessToken: accessToken || data.accessToken,
    refreshToken: "refreshToken" in data ? data.refreshToken : undefined,
  };
}
