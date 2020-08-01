export default class User {
  constructor(
    username,
    password,
    email,
    fullname,
    phone,
    status,
    role,
    createdAt,
    updatedAt,
    avatar,
    identity,
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.fullname = fullname;
    this.phone = phone;
    this.status = status;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatar = avatar;
    this.identity = identity;
  }
}
