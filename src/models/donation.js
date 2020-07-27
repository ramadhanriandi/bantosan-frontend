export default class Donation {
  constructor(
    nominal,
    status,
    createdAt,
    updatedAt,
    donatur,
    bank,
    fundraising,
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
