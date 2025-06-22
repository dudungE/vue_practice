<template>
  <div>
    <h2>종목 코드: {{ ticker }}</h2>
    <!-- 종목 가격 정보 표시 -->
  </div>
</template>

<script>
export default {
  computed: {
    ticker() {
      return this.$route.params.ticker
    }
  }
}
</script>
