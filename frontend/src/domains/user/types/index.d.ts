interface UserInfos {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  establishmentId: string;
}

interface UserLogin {
  username: string | undefined;
  password: string | undefined;
}

interface UserSignIn {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  establishmentId: string;
}


export { UserInfos, UserLogin, UserSignIn };