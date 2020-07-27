export default class User {
  constructor(username, password, email, fullname, phone, status, role, createdAt, updatedAt) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.fullname = fullname;
    this.phone = phone;
    this.status = status;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
