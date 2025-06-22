<template>
  <div class="index-container">
    <h2>주요 지수 통합 정보</h2>
    <div class="index-table-wrapper">
      <table class="index-table">
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
          <!-- 로딩 -->
          <tr v-if="loading">
            <td colspan="8" class="index-loading">
              로딩중...
            </td>
          </tr>
          <!-- 에러 -->
          <tr v-else-if="error">
            <td colspan="8" class="error-message">
              {{ error }}
            </td>
          </tr>
          <!-- 데이터 -->
          <tr v-else v-for="(item, idx) in combinedData" :key="idx">
            <td>{{ item.hts_kor_isnm }}</td>
            <td>{{ formatNumber(item.bstp_nmix_prpr) }}</td>
            <td :class="getChangeClass(item.prdy_vrss_sign)">
              {{ getChangeSign(item.prdy_vrss_sign) }}{{ formatNumber(item.bstp_nmix_prdy_vrss) }}
            </td>
            <td :class="getChangeClass(item.prdy_vrss_sign)">
              {{ getChangeSign(item.prdy_vrss_sign) }}{{ item.bstp_nmix_prdy_ctrt }}%
            </td>
            <td>{{ formatNumber(item.bstp_nmix_hgpr) }}</td>
            <td>{{ formatNumber(item.bstp_nmix_lwpr) }}</td>
            <td>{{ formatNumber(item.acml_vol) }}</td>
            <td>{{ formatNumber(item.acml_tr_pbmn) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      combinedData: [],
      loading: true,
      error: null,
      endpoints: [
        { url: '/main/kospi',   label: '코스피'    },
        { url: '/main/kosdaq',  label: '코스닥'    },
        { url: '/main/kospi200',label: '코스피200' }
      ]
    };
  },
  mounted() {
    this.fetchCombinedData();
  },
  methods: {
    async fetchCombinedData() {
      this.loading = true;
      this.error = null;
      try {
        const requests = this.endpoints.map(ep => axios.get(ep.url));
        const responses = await Promise.all(requests);
        this.combinedData = responses.map((response, i) => {
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          return {
            ...data,
            hts_kor_isnm: this.endpoints[i].label // 지수명 덮어쓰기
          };
        });
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
.index-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 8px 40px 8px;
  background: #f9fafb;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.07);
}
h2 {
  color: #222;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 1px;
  text-align: left;
}
.index-table-wrapper {
  min-height: 220px; /* 최소 높이로 테이블 영역 고정 */
}
.index-table {
  width: 100%;
  min-width: 700px;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(52,152,219,0.08);
  margin: 0 auto 32px auto;
  transition: box-shadow 0.2s;
  table-layout: fixed; /* 컬럼 너비 고정 */
}
.index-table th, .index-table td {
  border: none;
  padding: 14px 12px;
  text-align: center;
  font-size: 1.07em;
  color: #222;
  background: #fff;
  word-break: keep-all;
}
.index-table th {
  background: #f4f6fa;
  color: #1a1a1a;
  font-weight: 800;
  font-size: 1.09em;
  border-bottom: 2px solid #e9f2fa;
  letter-spacing: 0.5px;
}
.index-table tr {
  border-bottom: 1.5px solid #f0f4f8;
  transition: background 0.18s;
}
.index-table tr:last-child {
  border-bottom: none;
}
.index-table tr:hover {
  background: #f7fbff;
}
.index-loading {
  color: #222;
  font-size: 1.1em;
  padding: 24px 0;
  min-height: 56px;
}
.error-message {
  color: #e74c3c;
  font-weight: 600;
  padding: 24px 0;
  min-height: 56px;
}
.positive {
  color: #e74c3c;
  font-weight: 700;
}
.negative {
  color: #1565c0;
  font-weight: 700;
}
@media (max-width: 768px) {
  .index-table {
    font-size: 0.96em;
    min-width: 700px;
  }
  .index-container {
    overflow-x: auto;
  }
}
</style>
