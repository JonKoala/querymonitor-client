import appconfig from '~/appconfig.yml'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

function formatUrl(url) {
  return url.startsWith('/') ? url.slice(1) : url;
}

export default {
  get(service, config) {
    service = formatUrl(service);
    return Vue.axios.get(`${appconfig['url']['api']}/${service}`, config)
      .then(response => {
        return response.data;
      }).catch(err => {
        throw new Error(`ApiService error: ${err}`);
      });
  }
};
