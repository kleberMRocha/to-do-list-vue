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
            <strong>
              Boas-Vindas - Lista De Tarefas
            </strong>
          </h1>
          <p>
            <Progress :percent="percentage"
              ><span slot="title"> Concluidas</span
              ><span slot="text"
                ><span class="primary-color"></span>{{ percentage }} %</span
              ></Progress
            >
          </p>

          <TaskCard :allTask="allTask" />
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
      siderCollapsed: true,
      menuDatas: [
        { title: 'Home', key: 'welcome', icon: 'h-icon-home' },
        {
          title: 'Gerenciar Tarefas',
          key: 'tasks',
          icon: 'h-icon-task',
          count: 0,
        },
      ],
    };
  },
  components: {
    TaskCard: taskCard,
  },
  computed: {
    ...mapState({
      allTask: (state) => state,
      pendentTasksNumber: (state) => {
        const total = state.filter((task) => task.completed != true);
        return total.length;
      },
      percentage: (state) => {
        const total = state.filter((task) => task.completed != true);
        return Math.floor(100 - (total.length * 100) / 3);
      },
    }),
  },
};
</script>

<style lang="less">
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
    border-radius: 15px;
    height: 100%;
    padding: 2%;
    display: flex;
    flex-direction: column;
  }

  .h-panel {
    margin-bottom: 15px;
  }

  .h-layout-footer {
    padding: 24px 50px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
}
</style>
