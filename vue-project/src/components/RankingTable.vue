<template>
  <div class="ranking-container">
    <div class="button-group">
      <button
        v-for="btn in buttons"
        :key="btn.type"
        :class="{ active: activeButton === btn.type }"
        @click="fetchRankData(btn)"
      >
        {{ btn.label }}
      </button>
    </div>

    <!-- 로딩 -->
    <transition name="fade">
      <div v-if="loading" class="skeleton-list">
        <div v-for="n in 8" :key="n" class="skeleton-card"></div>
      </div>
    </transition>

    <!-- 에러 -->
    <transition name="fade">
      <div v-if="error" class="error-message">{{ error }}</div>
    </transition>

    <!-- 표(테이블) 형태 -->
    <table v-if="!loading && !error" class="ranking-table">
      <thead>
        <tr>
          <th>순위</th>
          <th>종목명</th>
          <th>종목코드</th>
          <th>현재가</th>
          <th>전일대비</th>
          <th>등락률</th>
          <th>거래량</th>
          <th>거래대금</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in rankData" :key="item.code + idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.code }}</td>
          <td>{{ formatNumber(item.price) }}</td>

          <td :class="getChangeClass(item.daebi)">
            {{ getChangeSign(item.prdy_vrss_sign) }}{{ formatNumber(item.daebi) }}
          </td>

          <td :class="getChangeClass(item.prdy_vrss_sign)">
            {{ getChangeSign(item.prdy_vrss_sign) }}{{ item.daebi }}%
          </td>

          <td>{{ formatNumber(item.acml_vol) }}</td>
          <td>{{ formatNumber(item.trade_amt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      buttons: [
        { type: 'volume', label: '거래량', endpoint: '/main/volume-rank' },
        { type: 'value', label: '거래대금', endpoint: '/main/trading-value-rank' },
        { type: 'up', label: '급상승', endpoint: '/main/price-up-rank' },
        { type: 'down', label: '급하락', endpoint: '/main/price-down-rank' },
        { type: 'cap', label: '시총', endpoint: '/main/market-cap-rank' }
      ],
      activeButton: 'volume',
      rankData: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchRankData(this.buttons[0])
  },
  methods: {
    async fetchRankData(btn) {
      if (this.activeButton === btn.type && this.rankData.length > 0) return
      this.loading = true
      this.error = null
      this.activeButton = btn.type
      try {
        const response = await axios.get(btn.endpoint)
        this.rankData = response.data
      } catch (e) {
        this.error = '데이터를 불러오는 중 오류가 발생했습니다'
      } finally {
        this.loading = false
      }
    },
    getChangeClass(sign) {
      return sign === '2' ? 'positive' : 'negative'
    },
    getChangeSign(sign) {
      return sign === '2' ? '+' : ''
    },
    formatNumber(value) {
      if (!value) return '0'
      return Number(value).toLocaleString()
    }
  }
}
</script>

<style scoped>
.ranking-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 8px 40px 8px;
  background: #f9fafb;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.07);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 24px;
}

.button-group button {
  flex: 1;
  background: #fff;
  color: #222;
  border: 1.5px solid #3182f6;
  border-radius: 18px;
  padding: 12px 0;
  font-size: 1.07em;
  font-weight: 700;
  transition: background 0.18s, color 0.18s, border 0.18s;
  cursor: pointer;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 4px rgba(44,62,80,0.05);
}

.button-group button.active,
.button-group button:focus {
  background: #3182f6;
  color: #fff;
  border: 1.5px solid #3182f6;
  box-shadow: 0 2px 8px rgba(49,130,246,0.10);
  outline: none;
}

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
}
.skeleton-card {
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e3eaf2 25%, #f3f6fa 50%, #e3eaf2 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.2s infinite linear;
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.error-message {
  color: #e74c3c;
  font-weight: 600;
  margin: 32px 0;
}

.ranking-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(52,152,219,0.08);
  margin: 0 auto 32px auto;
  transition: box-shadow 0.2s;
}

.ranking-table th, .ranking-table td {
  border: none;
  padding: 14px 12px;
  text-align: center;
  font-size: 1.07em;
  color: #222;
  background: #fff;
}

.ranking-table th {
  background: #f4f6fa;
  color: #1a1a1a;
  font-weight: 800;
  font-size: 1.09em;
  border-bottom: 2px solid #e9f2fa;
  letter-spacing: 0.5px;
}

.ranking-table tr {
  border-bottom: 1.5px solid #f0f4f8;
  transition: background 0.18s;
}

.ranking-table tr:last-child {
  border-bottom: none;
}

.ranking-table tr:hover {
  background: #f7fbff;
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
  .ranking-table {
    font-size: 0.96em;
    min-width: 700px;
  }
  .button-group {
    flex-direction: column;
    gap: 8px;
  }
  .button-group button {
    width: 100%;
  }
  .ranking-container {
    overflow-x: auto;
  }
}
</style>
