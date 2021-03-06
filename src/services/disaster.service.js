import axios from 'axios';
import _ from 'lodash';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/disasters';

class DisasterService {
  getAllDisasters = ({ display, userId }) => {
    let params = [];
    params = _.compact(_.concat(
      params,
      !_.isNil(display) ? `display=${display}` : null,
      !_.isNil(userId) ? `userId=${userId}` : null,
    ));
    return axios.get(`${API_URL}${_.size(params) > 0 ? `?${_.join(params, '&')}` : ''}`);
  }

  getDisasterById = id => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

  postDisaster = disaster => axios.post(`${API_URL}`, {
    name: disaster.name,
    category: disaster.category,
    description: disaster.description,
    location: disaster.location,
    evidence: disaster.evidence,
    reporter: disaster.reporter,
  }, { headers: authHeader() })

  putDisaster = (id, disaster) => axios.put(`${API_URL}/${id}`, {
    name: disaster.name,
    category: disaster.category,
    description: disaster.description,
    status: disaster.status,
    location: disaster.location,
    evidence: disaster.evidence,
    display: disaster.display,
  }, { headers: authHeader() })

  deleteDisaster = id => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
}

export default new DisasterService();
