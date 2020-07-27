export default class Disaster {
  constructor(
    name,
    category,
    status,
    description,
    location,
    evidence,
    display,
    createdAt,
    updatedAt,
    reporter,
  ) {
    this.name = name;
    this.category = category;
    this.status = status;
    this.description = description;
    this.location = location;
    this.evidence = evidence;
    this.display = display;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.reporter = reporter;
  }
}
