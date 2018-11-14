import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: _import('login/index')
    }, {
      path: '/change-password',
      component: _import('changePassword/index')
    }, {
      path: '/map',
      component: _import('map/index')
    }, {
      path: '/home',
      component: _import('homepage/homepage'),
      redirect: '/home/facility',
      children: [{
        path: 'facility',
        name: 'facility',
        component: _import('facility/facility')
      }, {
        path: 'bills',
        name: 'bills',
        component: _import('bills/bills')
      }]
    }, {
      path: '/service-record',
      component: _import('serviceRecord/serviceRecord')
    }, {
      path: '/device-service',
      component: _import('deviceService/deviceService')
    }, {
      path: '/service-details',
      component: _import('serviceDetails/serviceDetails')
    }, {
      path: '/bills-details',
      component: _import('billsDetails/billsDetails')
    }
  ]
})
