<template>
  <header class="navbar">
    <div class="navbar-content">
      <span class="navbar-title">Stock DashBoard</span>
      <form @submit.prevent="goToStockPrice" class="stock-search-form">
        <input
          v-model="iscd"
          placeholder="종목코드 입력"
          class="stock-input"
          maxlength="6"
          required
        />
        <button type="submit" class="search-btn">조회</button>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      iscd: ''
    }
  },
  methods: {
    goToStockPrice() {
      if (this.iscd) {
        // stocks로 경로 변경
        this.$router.push(`/stocks/${this.iscd}/price`)
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  background: #3498db;
  color: #fff;
  box-shadow: 0 2px 10px rgba(44,62,80,0.08);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}
.navbar-content {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}
.navbar-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}
.stock-search-form {
  display: flex;
  align-items: center;
  gap: 8px;
}
.stock-input {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  font-size: 1em;
  width: 120px;
}
.search-btn {
  padding: 6px 14px;
  background: #fff;
  color: #3498db;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:hover {
  background: #e6f0ff;
}
</style>
