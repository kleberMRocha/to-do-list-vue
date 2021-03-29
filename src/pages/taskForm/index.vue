<template>
  <div>
    <div>
      <h1> <i class="h-icon-task"> </i> {{!isEditar ? 'Adicionar' : 'Editar' }} nova Tarefa </h1>
    </div>
    <Loading
      text="Loading"
      :loading="loading"
    ></Loading>
    <Form
      v-if="!isEditar"
      ref="form"
      :label-width="150"
    >
      <FormItem
        label="Nome da tarefa"
        prop="task"
      >
        <input
          value="batata"
          v-wordlimit="30"
          :required="required"
          type="text"
          v-model="data.task"
        />
      </FormItem>
      <FormItem
        label="Data de entrega"
        prop="date"
      >
        <div>
          <DatePicker
            :required="required"
            placeholder="Selecione uma data"
            v-model="data.deadline"
            :format="format"
          ></DatePicker>
        </div>
      </FormItem>
      <FormItem
        label="Prioridade"
        prop="prioridade"
      >
        <Select
          :required="required"
          placeholder="Prioridade"
          v-model="data.priority"
          :datas="param"
        ></Select>
      </FormItem>
      <FormItem
        label="Textarea"
        :single="true"
        prop="textareaData"
      >
        <textarea
          rows="3"
          v-autosize
          v-wordcount="50"
          v-model="data.description"
        ></textarea>
      </FormItem>
      <FormItem>
        <Button
          :loading="isLoading"
          @click="submit"
        >
          Adicionar
        </Button>
        <Button @click="closeModelBtn">Cancelar</Button>
      </FormItem>
    </Form>
    <Form
      v-if="isEditar"
      ref="form"
      :label-width="150"
    >
      <FormItem
        label="Nome da tarefa"
        prop="task"
      >
        <input
          value="batata"
          v-wordlimit="30"
          :required="required"
          type="text"
          v-model="editData.task"
        />
      </FormItem>
      <FormItem
        label="Data de entrega"
        prop="date"
      >
        <div>
          <DatePicker
            :required="required"
            placeholder="Selecione uma data"
            v-model="editData.deadline"
            :format="format"
          ></DatePicker>
        </div>
      </FormItem>
      <FormItem
        label="Prioridade"
        prop="prioridade"
      >
        <Select
          :required="required"
          placeholder="Prioridade"
          v-model="editData.priority"
          :datas="param"
        ></Select>
      </FormItem>
      <FormItem
        label="Textarea"
        :single="true"
        prop="textareaData"
      >
        <textarea
          rows="3"
          v-autosize
          v-wordcount="50"
          v-model="editData.description"
        ></textarea>
      </FormItem>
      <FormItem>
        <Button
          :loading="isLoading"
          @click="update"
        >
          Atualizar
        </Button>

        <Button @click="closeModelBtn">Cancelar</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      loading: false,
      isEditar: this.Editar,
      format: "DD/MM/YYYY",
      isLoading: false,
      required: true,
      param: [
        { title: 'Alta', key: 'Alta' },
        { title: 'Media', key: 'Media' },
        { title: 'Baixa', key: 'Baixa' },
      ],
      data: {
        task: null,
        deadline: null,
        startDate: this.hoje,
        priority: null,
        description: null,
        completed: false
      },
      editData: {
        id: this.taskEditar.id ? this.taskEditar.id : '',
        task: this.taskEditar.task ? this.taskEditar.task : '',
        deadline: this.taskEditar.deadline ? this.taskEditar.deadline : '',
        startDate: this.taskEditar.startDate ? this.taskEditar.startDate : '',
        priority: this.taskEditar.priority ? this.taskEditar.priority : '',
        description: this.taskEditar.description ? this.taskEditar.description : '',
        completed: false
      },
    };
  },
  methods: {
    ...mapActions(['addValue','updateValue']),
    closeModelBtn () {
      this.$emit('closeModelBtn');
      this.loading = false;
    },
    submit () {
      if (this.data.task && this.data.deadline) {
        this.$Message('Tarefa Adicionada com sucesso!');
        this.addValue(this.data);

      } else {
        this.$Message.error('Tarefa deve ter um Nome e uma data de entrega');
      }
    },
    update () {
      this.$Message('Tarefa alterada com sucesso');
      console.log()
      this.updateValue(this.editData);
    }
  },
  props: ['taskEditar', 'Editar'],
  computed: {
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
  },
  watch: {
    required () {
      this.$refs.form.resetValid();
    }
  },
};
</script>