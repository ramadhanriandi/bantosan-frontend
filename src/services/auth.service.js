import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class AuthService {
  login = user => axios.post(`${API_URL}/login`, {
    username: user.username,
    password: user.password,
  }).then((response) => {
    if (response.data.value.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data.value));
    }
    return response.data;
  })

  logout = () => {
    localStorage.removeItem('user');
  }

  register = user => axios.post(`${API_URL}/register`, {
    username: user.username,
    email: user.email,
    password: user.password,
  })

  getAllUsers = () => axios.get(`${API_URL}`, { headers: authHeader() });

  getUserById = id => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

  updateUser = (id, user) => axios.put(`${API_URL}/${id}`, {
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    phone: user.phone,
    status: user.status,
    avatar: user.avatar,
    identity: user.identity,
  }, { headers: authHeader() })
}

export default new AuthService();
