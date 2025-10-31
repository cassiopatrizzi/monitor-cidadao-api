class Report {
  constructor({ id, userId, type, description, location, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.type = type; // Ex: air-quality, noise, lighting, potholes, trash, construction, flooded-areas, public-transport, social
    this.description = description;
    this.location = location;
    this.createdAt = createdAt;
  }
}

module.exports = Report;
