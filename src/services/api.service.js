import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


function formatUrl(url) {
  return url.startsWith('/') ? url.slice(1) : url;
}

export default {
  async delete(service, config) {
    service = formatUrl(service);
    return await Vue.axios.delete(`${CONFIG.url.api}/${service}`, config);
  },
  async get(service, config) {
    service = formatUrl(service);
    var response = await Vue.axios.get(`${CONFIG.url.api}/${service}`, config);
    return response.data;
  },
  async post(service, data) {
    service = formatUrl(service);
    return await Vue.axios.post(`${CONFIG.url.api}/${service}`, data);
  },
  async put(service, data) {
    service = formatUrl(service);
    return await Vue.axios.put(`${CONFIG.url.api}/${service}`, data);
  }
};
