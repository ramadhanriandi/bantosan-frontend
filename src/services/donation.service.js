import axios from 'axios';
import _ from 'lodash';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/donations';

class DonationService {
  getAllDonations = ({ userId, fundraisingId }) => {
    let params = [];

    params = _.compact(_.concat(
      params,
      !_.isNil(userId) ? `userId=${userId}` : null,
      !_.isNil(fundraisingId) ? `fundraisingId=${fundraisingId}` : null,
    ));

    return axios.get(
      `${API_URL}${_.size(params) > 0 ? `?${_.join(params, '&')}` : ''}`,
      { headers: authHeader() },
    );
  }

  postDonation = donation => axios.post(`${API_URL}`, {
    nominal: donation.nominal,
    donatur: donation.donatur,
    bank: donation.bank,
    fundraising: donation.fundraising,
  }, { headers: authHeader() })

  putDonation = (id, status) => axios.put(`${API_URL}/${id}`, {
    status,
  }, { headers: authHeader() })
}

export default new DonationService();
