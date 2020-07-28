import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/donations';

class DonationService {
  postDonation = donation => axios.post(`${API_URL}`, {
    nominal: donation.nominal,
    donatur: donation.donatur,
    bank: donation.bank,
    fundraising: donation.fundraising,
  }, { headers: authHeader() })
}

export default new DonationService();
