function getTpl(fileType, name) {
  let tplVueStr = `<template>
  <section id="${name}"></section> 
</template>
<script>
  export default {
    name: '${name}'
    data() {
      return {
        title: '${name}'
      }
    },
    components: {},
    computed: {},
    watch: {},
    // 组件创建前钩子
    beforeCreate() {},
    // 组件创建完成钩子
    created() {},
    // 组件挂载前钩子
    beforeMount() {},
    // 组件挂载完成钩子
    mounted() {},
    // 组件更新前钩子
    beforeUpdate() {},
    // 组件更新完成钩子
    updated() {},
    // 组件销毁前钩子
    beforeDestroy() {},
    // 组件销毁完成钩子
    destroyed() {}
  }
</script>
<style lang="scss" scoped>
</style>`;
  if (fileType === 'vue') {
    return tplVueStr;
  }
  return '';
}
module.exports = getTpl;