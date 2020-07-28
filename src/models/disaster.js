export default class Disaster {
  constructor(
    name,
    category,
    description,
    location,
    evidence,
    reporter,
    status,
    display,
    createdAt,
    updatedAt,
  ) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.location = location;
    this.evidence = evidence;
    this.reporter = reporter;
    this.status = status;
    this.display = display;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
