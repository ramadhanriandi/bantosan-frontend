export default class Donation {
  constructor(
    nominal,
    bank,
    donatur,
    fundraising,
    status,
    createdAt,
    updatedAt,
  ) {
    this.nominal = nominal;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.donatur = donatur;
    this.bank = bank;
    this.fundraising = fundraising;
  }
}
