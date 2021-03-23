<template>
  <div class="tasks">
    <Button
      icon="h-icon-plus"
      class="h-btn h-btn-primary h-btn-circle"
      @click="openModal"
    >
      Adicionar Uma nova Task
    </Button>
    <Modal v-model="modalIsOpen">
      <TaskForm @closeModelBtn="closeModal" />
    </Modal>
    <Loading
      text="Carregando Tarefas"
      :loading="loadingTasks"
    ></Loading>
    <div class="taskContainer">
      <div
        v-for="task in allTask"
        :key="task.id"
      >
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">
              {{ task.task }}
              
              <span
                class="tag"
                :class="
                  task.completed ? 'h-tag h-tag-primary' : 'h-tag h-tag-red'
                "
              >
                <i :class="task.completed ? 'h-icon-check' : 'h-icon-close'"></i>
                {{ task.completed ? 'Concluido' : 'Pendente' }}
              </span>
              <span :class="'tag h-tag h-tag'">
                <i class="h-icon-calendar"></i> Prazo: {{ task.deadline }}
              </span>
              <span
                v-if="task.priority === 'Alta'"
                class="tag h-tag h-tag-red"
              >
                Prioridade: {{ task.priority }}
              </span>
              <span
                v-if="task.priority === 'Media'"
                class="tag h-tag h-tag-yellow"
              >
                Prioridade: {{ task.priority }}
              </span>
              <span
                v-if="task.priority === 'Baixa'"
                class="tag h-tag h-tag-blue"
              >
                Prioridade: {{ task.priority }}
              </span>
            </span>
          </div>
          <div class="h-panel-body">
            <Button
              size="l"
              @click="alterValues({ id: task.id, completed: !task.completed })"
              :class="task.completed ? 'h-btn h-btn-primary' : ''"
            >
              {{
                task.completed
                  ? 'Marcar como pendente'
                  : 'Marcar como concluida'
              }}
            </Button>
            <div class="btnContainer">
              <div class="buttons">
                <ButtonGroup size="s">
                  <Button
                    class="h-btn h-btn-text-yellow h-btn-transparent"
                    icon="h-icon-edit"
                  >
                    Editar
                  </Button>
                  <Button
                   @click="confirm(task.id)"
                    class="h-btn h-btn-text-red h-btn-transparent"
                    icon="h-icon-trash"
                  >
                    Deletar
                  </Button>
                </ButtonGroup>
              </div>
            </div>
                 <Collapse class="Collapse">
              <CollapseItem title="Descrição:">
                {{ task.description }}
              </CollapseItem>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskForm from '../taskForm/index';
export default {
  name: 'CardProps',
  data: function () {
    return {
      modalIsOpen: false,
    };
  },
  computed: {
    loadingTasks: function () {
      if(this.allTask.length === 0){
        return false;
      }
      return this.allTask.length ? false : true;
    },
  },
  components: {
    TaskForm: TaskForm,
  },
  props: {
    allTask: Array,
  },
  methods: {
    openModal: function () {
      this.modalIsOpen = true;
    },
    closeModal: function () {
      this.modalIsOpen = false;
    },
     confirm(id) {
      this.$Confirm('Deletar a Tarefa?', 'Deletar?')
        .then(() => {
          this.removeValue(id);
          this.$Message.success('A tarefa foi deletada');
        })
        .catch(() => {
          this.$Message.error('Ação cancelada');
        });
    },
    ...mapActions(['alterValues','addValue', 'removeValue']),
  },
};
</script>

<style scoped>
.tag {
  margin-left: auto;
}

.buttons {
  display: flex;
  flex-direction: column;
}

h-btn-circle {
  justify-items: flex-start;
  display: none;
}
.btnContainer{
  margin: 15px 0;
}

.buttons button {
  margin-bottom: 8px;
}

.taskContainer {
  padding: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.taskContainer .h-panel {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 8px;
}

.Collapse {
  width: 235px;
}

@media (max-width: 800px) {
  .taskContainer .h-panel {
    width: 235px;
  }
  .Collapse {
    width: 100%;
  }
  .h-btn.h-btn-primary.h-btn-circle {
    margin: 5px 20px;
  }
}
</style>
