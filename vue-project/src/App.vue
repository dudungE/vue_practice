<template>
  <div id="app">
    <AppHeader />
    <main>
      <div class="main-content">
        <RankingTable />
        <IndexTable />
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import RankingTable from './components/RankingTable.vue'
import IndexTable from './components/IndexTable.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    RankingTable,
    IndexTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f7f8fa;
  min-height: 100vh;
  margin: 0;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 16px 0 16px; /* 헤더 높이(64px) + 여유 */
}
.main-content {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
@media (max-width: 1100px) {
  .main-content {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
</style>
