class User {
  constructor({ id, name, cpf, email, password, address, district, zipcode, city, state, validated, createdAt }) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.address = address;
    this.district = district;
    this.zipcode = zipcode;
    this.city = city;
    this.state = state;
    this.validated = validated;
    this.createdAt = createdAt;
  }
}

module.exports = User;
