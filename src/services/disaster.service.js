import axios from 'axios';
import _ from 'lodash';

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
}

export default new DisasterService();
