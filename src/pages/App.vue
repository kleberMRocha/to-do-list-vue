<template>
  <div class="main">
    <Layout>
      <Layout :siderCollapsed="siderCollapsed">
        <Sider theme="white">
          <Menu
            style="margin-top: 40px;"
            className="h-menu-white"
            :datas="menuDatas"
            :inlineCollapsed="siderCollapsed"
            ref="menu"
          >
          </Menu>
        </Sider>
        <Content class="content">
          <h1>
            <strong class="wellcome">
              Boas-Vindas - Lista De Tarefas 
              <div>
                <i class="h-icon-calendar"></i>
                {{ hoje }}
              </div>
            </strong>
          </h1>
          <p>
            <Progress :percent="percentage"
              ><span slot="title"> Concluidas</span
              ><span slot="text"
                ><span class="primary-color"></span>{{ Number(percentage) || '0' }} %</span
              ></Progress
            >
          </p>
          <TaskCard :allTask="allTask"/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import taskCard from './taskCard/index';

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      siderCollapsed: false,
      menuDatas: [
        { title: 'Home', key: 'welcome', icon: 'h-icon-home' },
        {
          title: 'Gerenciar Tarefas',
          key: 'tasks',
          icon: 'h-icon-task',
          count: 0,
        },
      ],
      windowSize: window.innerWidth,
    };
  },
  components: {
    TaskCard: taskCard,
  },
  methods:{
  },
  computed: {
    ...mapState({
      allTask: (state) => state,
      pendentTasksNumber: (state) => {
        const total = state.filter((task) => task.completed != true);
        return total.length;
      },
      percentage: (state) => {
        const totalPending = state.filter((task) => task.completed != true).length;
        const totalTasks = state.length;

        return Number(100 - (totalPending * 100)/totalTasks);
 
      },
      hoje: () => {
        const hoje = new Date();
        const dia = hoje.getDate();
        let mes = hoje.getMonth() + 1;
        const ano = hoje.getFullYear();

        mes < 10 
        ? mes = `0${mes}`
        : mes;

        return `${dia}/${mes}/${ano}`
      },
    }),
  },
  watch: {
    windowSize: function(value) {
      this.siderCollapsed = value < 850;
    },
  },
  created: function() {
    window.addEventListener(
      'resize',
      () => (this.windowSize = window.innerWidth)
    );
  },
  destroyed: function() {
    window.removeEventListener('resize', () => {});
  },
};
</script>

<style lang="less">

.wellcome{
  display: flex;
  justify-content: space-between;
  padding: 0 5% 0 0;

}
.wellcome{

  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.9rem;

}

.content {
  padding: 0 30px;
  height: 100%;
}

.main {
  .h-layout {
    background: #f0f2f5;
    height: 100%;
  }

  h1 {
    color: #6a6a6a;
    font-size: 2.1rem;
  }
  button.h-btn-circle {
    margin-bottom: 15px;
    align-self: flex-start;
  }
  .tasks {
    background: url('../assets/bg.jpg');
    background-repeat: repeat-y;
    border-radius: 15px;
    height: 100%;
    widows: 100%;
    display: flex;
    flex-direction: column;
    padding: 2%;
  }

  .h-panel {
    margin-bottom: 15px;
  }

  .h-layout-footer {
    padding: 24px 50px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }

  @media(max-width: 800px){
    .tasks{
       padding: 0;
    }
    
  }
}
</style>
