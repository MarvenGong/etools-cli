# etools-cli
## 快速开发脚手架工具
### 安装
1. 安装nodejs环境，如已安装跳过。
2. npm i -g etools-cli 安装脚手架
3. etools -v 如能打印版本信息即安装成功。
### 指令文档
- etools -v 查看版本信息
- etools create-vue-app projectName 初始化vue项目 根据指引填写必要的项目名称，描述等信息完成初始化即可
  > 注：若未输入projectName参数会在当前目录下创建项目，请自行确认当前目录信息。
  
- etools generate [fileType, fileName] 生成模板文件
  
  #### 参数说明
  - fileType 模板类型，暂时只支持vue
  - fileName 文件名 不包含扩展名。
  
  #### 示例
  ~~~
  etools generate vue user
  ~~~

  #### 生成的模板内容如下

  ~~~javascript
  <template>
    <section id="user"></section> 
  </template>
  <script>
    export default {
      name: 'user'
      data() {
        return {
          title: 'user'
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
  </style>
  ~~~