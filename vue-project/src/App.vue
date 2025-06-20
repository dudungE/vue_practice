<template>
  <div id="app">
    <h1>주요 주식 지수</h1>
    <IndexTable title="코스피" endpoint="/main/kospi" />
    <IndexTable title="코스닥" endpoint="/main/kosdaq" />
    <IndexTable title="코스피200" endpoint="/main/kospi200" />
  </div>
</template>

<script>
import IndexTable from './components/IndexTable.vue';

export default {
  name: 'App',
  components: {
    IndexTable
  }
}
</script>
