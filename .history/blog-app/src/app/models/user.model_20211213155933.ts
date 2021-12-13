export interface IUser {
  user: {
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string
  }
}

export interface IProfile {
  profile: {
    username: string,
    bio: string,
    image: string,
    following: boolean
  }
}

export interface IUserUpdate {
  user: {
    email: string,
    bio: string,
    image: string,
    password?: string,
    username?: string
  }
}
