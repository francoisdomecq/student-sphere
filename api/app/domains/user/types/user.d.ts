interface StudentSphereUser {
  email:string;
  username: string;
  password:string;
  idRole:string;
  firstName: string;
  lastName: string;
  establishmentId: string;
}

interface AuthUser {
  username: string;
  password: string;
}

export { StudentSphereUser, AuthUser };