class Report {
  constructor({ id, userId, type, description, location, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.type = type; 
    this.description = description;
    this.location = location;
    this.createdAt = createdAt;
  }
}

module.exports = Report;
