import axios from 'axios';

export default axios.create({
  baseURL: 'https://en.wikipedia.org/api/rest_v1/page/summary'
});