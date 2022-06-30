<template>
  <shareTest />
  <shareTestNotExisted description="自定义无法获取组件时的描述：the component not fount" />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import { setShare, vueComponentShare } from '@satumjs/component-share'
import HelloWorld from './components/HelloWorld.vue'
import ShareTest from './components/ShareTest.vue'

setShare('share-test', ShareTest)

export default {
  name: 'App',
  components: {
    HelloWorld,
    shareTest: vueComponentShare('share-test'),
    shareTestNotExisted: vueComponentShare('share-test-not-existed')
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
  margin-top: 60px;
}
</style>
