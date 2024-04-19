interface User {
  name: string;
  registration_number: string;
  phone_number: string;
  department: string;
  role: string;
  email: string;
  password: string;
  github: string;
  admin: boolean;
}

const defaultUser: User = {
  registration_number: "",
  name: "",
  phone_number: "",
  department: "",
  role: "",
  email: "",
  github: "",
  admin: false,
  password: "",
};

export { type User, defaultUser };
