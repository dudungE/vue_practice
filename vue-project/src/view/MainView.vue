<!-- src/views/MainView.vue -->
<template>
  <div>
    <IndexData title="코스피" endpoint="/main/kospi" />
    <IndexData title="코스닥" endpoint="/main/kosdaq" />
    <IndexData title="코스피200" endpoint="/main/kospi200" />
  </div>
</template>

<script>
import IndexData from '@/components/IndexData.vue';
export default { components: { IndexData } };
</script>
