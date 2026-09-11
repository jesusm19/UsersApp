export class User {
  id: number;
  name!: string;
  lastname!: string;
  email!: string;
  username!: string;
  password!: string;

  constructor(id: number, name: string, lastname: string, email: string, username: string, password: string) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}