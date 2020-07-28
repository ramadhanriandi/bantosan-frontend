import axios from 'axios';
import _ from 'lodash';

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
}

export default new FundraisingService();
