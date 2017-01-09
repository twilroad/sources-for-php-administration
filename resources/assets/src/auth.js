import Vue from 'vue'
import store from './stores'

export default {
  logined () {
    let token = JSON.parse(window.localStorage.getItem('token'))
    if (token) {
      if (token.access_token && token.refresh_token) {
        Vue.http.headers.common['Accept'] = 'application/json'
        Vue.http.headers.common['Authorization'] = 'Bearer ' + token.access_token
        store.commit('token', token)
        let setting = store.state.setting
        if (!setting.hasOwnProperty()) {
          Vue.http.post(window.api + '/setting/all').then(response => {
            store.commit('setting', response.body.data)
          })
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}