interface StudentSphereUser {
  email: string;
  username: string;
  password: string;
  idRole: string;
  firstName: string;
  lastName: string;
  establishmentId: string;
}

interface StudentSphereUserDbRow {
  email: string;
  username: string;
  password: string;
  id_role: string;
  first_name: string;
  last_name: string;
  establishment_id: string;
}

export { StudentSphereUser, StudentSphereUserDbRow };