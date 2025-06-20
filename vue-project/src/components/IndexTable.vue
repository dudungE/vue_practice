<template>
  <div class="index-table-container">
    <h2>{{ title }}</h2>
    <div v-if="loading">로딩중...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else class="index-table">
      <thead>
        <tr>
          <th>지수명</th>
          <th>현재가</th>
          <th>전일대비</th>
          <th>등락률(%)</th>
          <th>고가</th>
          <th>저가</th>
          <th>거래량</th>
          <th>거래대금</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in indexData" :key="idx">
          <td>{{ item.hts_kor_isnm }}</td>
          <td>{{ item.bstp_nmix_prpr }}</td>
          <td :class="getChangeClass(item.prdy_vrss_sign)">
            {{ getChangeSign(item.prdy_vrss_sign) }}{{ item.bstp_nmix_prdy_vrss }}
          </td>
          <td>{{ item.bstp_nmix_prdy_ctrt }}</td>
          <td>{{ item.bstp_nmix_hgpr }}</td>
          <td>{{ item.bstp_nmix_lwpr }}</td>
          <td>{{ formatNumber(item.acml_vol) }}</td>
          <td>{{ formatNumber(item.acml_tr_pbmn) }}</td>
        </tr>
      </tbody>
    </table>
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
    },
    formatNumber(value) {
      if (!value) return '0';
      return Number(value).toLocaleString();
    }
  }
};
</script>

<style scoped>
.index-table-container {
  margin-bottom: 32px;
  background: #fff;
  border-radius: 18px;
  padding: 28px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

h2 {
  color: #222;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
}

.index-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.index-table th, .index-table td {
  border: none;
  padding: 12px 10px;
  text-align: center;
  color: #222;
  font-size: 1em;
}

.index-table th {
  background: #f7f7f7;
  color: #111;
  font-weight: 600;
  font-size: 1.05em;
}

.index-table tr {
  border-bottom: 1.5px solid #ececec;
  transition: background 0.2s;
}

.index-table tr:last-child {
  border-bottom: none;
}

.index-table tr:hover {
  background: #f3f6fa;
}

.positive { color: #e74c3c; font-weight: 700; }
.negative { color: #3498db; font-weight: 700; }
</style>
