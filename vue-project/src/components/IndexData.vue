<template>
  <div class="index-container">
    <h2>{{ title }}</h2>
    <div v-if="loading">로딩중...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="(item, idx) in indexData" :key="idx" class="index-item">
        <div>{{ item.hts_kor_isnm }}: {{ item.bstp_nmix_prpr }}</div>
        <div :class="getChangeClass(item.prdy_vrss_sign)">
          {{ getChangeSign(item.prdy_vrss_sign) }}{{ item.bstp_nmix_prdy_vrss }}
          ({{ item.bstp_nmix_prdy_ctrt }}%)
        </div>
        <div>고가: {{ item.bstp_nmix_hgpr }}, 저가: {{ item.bstp_nmix_lwpr }}</div>
        <div>거래량: {{ item.acml_vol }}, 거래대금: {{ item.acml_tr_pbmn }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    title: String,
    endpoint: String
  },
  data() {
    return {
      indexData: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(this.endpoint);
        this.indexData = response.data;
      } catch (e) {
        this.error = '데이터를 불러오지 못했습니다';
      } finally {
        this.loading = false;
      }
    },
    getChangeClass(sign) {
      return sign === '2' ? 'positive' : 'negative';
    },
    getChangeSign(sign) {
      return sign === '2' ? '+' : '';
    }
  }
};
</script>

<style scoped>
.positive { color: #e74c3c; }
.negative { color: #3498db; }
.index-container {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  background: #fff;
}
.index-item {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
