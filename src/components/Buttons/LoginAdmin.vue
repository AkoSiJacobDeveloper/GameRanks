<template>
  <button @click="openModal" class="p-3 px-5 fw-bold rounded-1">Admin</button>
</template>

<script>
export default {
  methods: {
    openModal() {
      console.log('Button Clicked!')
      this.$emit('open-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';

button {
  font-family: $headline-font;
  border: 1px solid #d3d3d3;
  transition:
    background-color 0.3s ease,
    border 0.3s ease;

  &:hover {
    background-color: #1e90ff;
    border-color: #1e90ff;
  }
}
</style>
