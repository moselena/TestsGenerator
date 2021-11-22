import axios from 'axios'

export default axios.create({
  baseURL: 'https://tests-generator-default-rtdb.firebaseio.com/'
})