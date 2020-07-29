import axios from 'axios';
import _ from 'lodash';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/fundraisings';

class FundraisingService {
  getAllFundraisings = ({ limit, status, userId }) => {
    let params = [];

    params = _.compact(_.concat(
      params,
      !_.isNil(limit) ? `limit=${limit}` : null,
      !_.isNil(status) ? `status=${status}` : null,
      !_.isNil(userId) ? `userId=${userId}` : null,
    ));

    return axios.get(`${API_URL}${_.size(params) > 0 ? `?${_.join(params, '&')}` : ''}`);
  }

  getFundraisingById = id => axios.get(`${API_URL}/${id}`);

  postFundraising = fundraising => axios.post(`${API_URL}`, {
    title: fundraising.title,
    description: fundraising.description,
    day: fundraising.day,
    target: fundraising.target,
    banks: fundraising.banks,
    organizer: fundraising.organizer,
  }, { headers: authHeader() })

  putFundraising = (id, fundraising) => axios.put(`${API_URL}/${id}`, {
    title: fundraising.title,
    description: fundraising.description,
    day: fundraising.day,
    target: fundraising.target,
    status: fundraising.status,
    banks: fundraising.banks,
    organizer: fundraising.organizer,
  }, { headers: authHeader() })

  deleteFundraising = id => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
}

export default new FundraisingService();
