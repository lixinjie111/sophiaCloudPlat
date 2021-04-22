<template>
  <div class="container">
    <div class="">
      <div class="init-page-title">暂无应用服务</div>
      <div class="border init-page-content">
        <div class="init-page-content-l item">
          <h1 class="init-page-content-title">创建应用服务</h1>
          <div class="init-page-content-l-m gary">这是一段任务描述，44个字符内容</div>
          <div>
            <a-button type="primary" class="create-btn" @click="openModal(1)">
              创建应用
            </a-button>
            <a-button>
              查看Demo
            </a-button>
          </div>
        </div>
        <div class="init-page-content-r item">
          <h1 class="init-page-content-title">帮助你更好地创建应用服务</h1>
          <ul class="gary">
            <li>如何创建应用服务</li>
            <li>查看应用服务发布文档</li>
            <li>帮助文档</li>
          </ul>
        </div>
      </div>
    </div>
    <create-app-modal :visible="true" :industryList="industryList" title="" v-if="showModal === 1" @cancel="closeModal" @refreshList="refreshList"/>
  </div>
</template>

<script>
  import CreateAppModal from './components/CreateAppModal.vue'
  export default {
    components: { CreateAppModal },
    props: ['industryList'],
    data(){
      return{
        showModal: null
      }
    },
    methods: {
      closeModal(){
        this.showModal = null
      },
      openModal(type){
        this.showModal = type
      },
      onNext(values){
        this.showModal = 2
      },
      onCreate(values){
        this.showModal = 2
      },
      refreshList(){
        this.$emit('refreshList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #c3cfe9;
  .container {
    width: 100%;
    height: 100%;
  }
  .gary{
    color: $color;
  }
  .init-page-title{
    width: 500px;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin: 20px auto;
  }
  .init-page-content{
    width: 900px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .init-page-content-l{
      padding-left: 50px;
      position: relative;
      width: 60%;
    }
    .init-page-content-title{
      font-size: 20px;
      font-weight: 700;
      margin: 20px 0;
    }
    .init-page-content-l-m{
      margin: 20px 0;
    }
    .create-btn{
      margin-right: 10px;
    }
    .init-page-content-r{
      border-left: 1px solid $color;
      padding: 0 30px;
      width: 40%;
      ul{
        list-style-type: disc;
        padding-left: 20px;
      }
    }
  }
  .border {
    border: 1px solid $color;
  }
</style>
