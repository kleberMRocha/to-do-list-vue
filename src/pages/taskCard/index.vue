<template>
  <div class="tasks">
    <Button icon="h-icon-plus" class="h-btn h-btn-primary h-btn-circle">
      Adicionar Uma nova Task
    </Button>
    <div v-for="task in allTask" :key="task.id">
      <div>
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
                <i
                  :class="task.completed ? 'h-icon-check' : 'h-icon-close'"
                ></i>
                {{ task.completed ? 'Concluido' : 'Pendente' }}
              </span>
              <span v-if="task.priority === 'Alta'" class="tag h-tag h-tag-red">
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
              <span :class="'tag h-tag h-tag'">
                <i class="h-icon-calendar"></i> Prazo: {{ task.deadline }}
              </span>
            </span>
            <span class="">
              <div class="buttons">
                <ButtonGroup>
                  <Button
                    @click="
                      alterValues({ id: task.id, completed: !task.completed })
                    "
                    :class="task.completed ? 'h-btn h-btn-primary' : ''"
                  >
                    {{
                      task.completed
                        ? 'Marcar como pendente'
                        : 'Marcar como concluida'
                    }}
                  </Button>
                  <Button
                    class="h-btn h-btn-text-yellow h-btn-transparent"
                    icon="h-icon-edit"
                  >
                    Editar
                  </Button>
                  <Button
                    class="h-btn h-btn-text-red h-btn-transparent"
                    icon="h-icon-trash"
                  >
                    Deletar
                  </Button>
                </ButtonGroup>
              </div>
            </span>
          </div>
          <div class="h-panel-body">

            <Collapse>
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
export default {
  name: 'CardProps',
  props: {
    allTask: Array,
  },
  methods: {
    ...mapActions(['alterValues']),
  },
};
</script>

<style scoped>
.tag {
  margin-left: auto;
}

h-btn-circle {
  justify-items: flex-start;
  display: none;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.buttons button {
  margin-bottom: 8px;
}
</style>
