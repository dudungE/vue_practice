
// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '@/views/MainView.vue';

Vue.use(VueRouter);

const routes = [{ path: '/', name: 'home', component: MainView }];

export default new VueRouter({ mode: 'history', routes });
