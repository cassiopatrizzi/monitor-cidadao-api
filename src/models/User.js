class User {
  constructor({ id, name, email, password, address, district, zipcode, city, state, validated, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.validated = validated;
    this.createdAt = createdAt;
  }
}

module.exports = User;
