export default class Fundraising {
  constructor(
    title,
    description,
    day,
    target,
    status,
    startDate,
    endDate,
    createdAt,
    updatedAt,
    organizer,
    banks,
  ) {
    this.title = title;
    this.description = description;
    this.day = day;
    this.target = target;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.organizer = organizer;
    this.banks = banks;
  }
}
