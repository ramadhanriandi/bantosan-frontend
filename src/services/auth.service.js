import axios from 'axios';

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
}

export default new AuthService();
