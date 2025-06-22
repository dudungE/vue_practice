import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue' // 또는 Home.vue
import StockPricePage from '../components/StockPricePage.vue' // 종목 가격 상세 페이지 컴포넌트

const routes = [
  { path: '/', component: Home },
  { path: '/stocks/:ticker/price', component: StockPricePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
