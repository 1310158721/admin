<template>
  <div v-test @click='handleClick'>
    Test
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    handleClick () {
      console.log('test');
    }
  }
};
</script>

<style lang="scss" scoped></style>

