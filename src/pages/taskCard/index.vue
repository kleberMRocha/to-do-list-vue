<template>
  <Row :space="4">
   <div class="tasks">
   <Modal v-model="modalIsOpen">
      <TaskForm 
      @closeModelBtn="closeModal"  
      v-if="!isEditar"
      :taskEditar="false"

      />
    </Modal>
    <Button
      icon="h-icon-plus"
      class="h-btn h-btn-primary h-btn-circle"
      @click="openModal"
    >
      Adicionar Uma nova Task
    </Button>
    <Loading
      text="Carregando Tarefas"
      :loading="loadingTasks"
    ></Loading>
    <div class="taskContainer">
      <div
        v-for="task in allTask"
        :key="task.id"
      >
        <Modal v-if="isEditar"  v-model="modalIsOpen">
      <TaskForm @closeModelBtn="closeModal"  
          :Editar="isEditar" 
          :taskEditar="isEditar ? currentTask : null" 
      />
    </Modal>
        <div class="h-panel">
          <div class="h-panel-bar">
            <Cell width="24">
              <div>
                <span class="h-panel-title">

                {{ task.task }}

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
            </span>
              </div>
            </Cell>
          
          </div>
          <div class="h-panel-body">
             <Cell width="24">
              <Button
              size="l"
              :block="true"
              @click="alterValues({ id: task.id, completed: !task.completed })"
              :class="task.completed ? 'h-btn h-btn-primary' : ''"
            >
             <i class="h-icon-complete"></i> 
              {{
                task.completed
                  ? 'Marcar como pendente'
                  : 'Marcar como concluida'
              }}
            </Button>

             </Cell>
              <Cell width="24">
               <div class="btnContainer">
              <div class="buttons">
                <ButtonGroup size="s">
                  <Button
                    @click="openModalEditar(task)"
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
              </Cell>
                <Cell width="24">
                <Collapse class="Collapse">
              <CollapseItem title="Descrição:">
                {{ task.description }}
              </CollapseItem>
            </Collapse>
                </Cell>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Row>
</template>

<script>
import { mapActions } from 'vuex';
import TaskForm from '../taskForm/index';
export default {
  name: 'CardProps',
  data: function () {
    return {
      isEditar: false,
      modalIsOpen: false,
      currentTask:{}
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
      this.isEditar = false;
      this.modalIsOpen = true;
    },
      setEditTask: function(task){
      this.currentTask = task;
    },
    closeModal: function () {
      this.modalIsOpen = false;
    },
    openModalEditar: function (task) {
      this.isEditar = true;
      this.modalIsOpen = true;
      this.setEditTask(task);
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
  display: flex;
  justify-content: center;
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
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 8px;
}

.Collapse {
  width: 100%;
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
