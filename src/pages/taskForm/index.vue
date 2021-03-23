<template>
  <div>
    <div>
      <h1> <i class="h-icon-task"> </i> Adicionar nova Tarefa </h1>
    </div>
    <Loading
      text="Loading"
      :loading="loading"
    ></Loading>
    <Form
      ref="form"
      :label-width="150"
      :rules="rules"
      :model="data"
    >
      <FormItem
        label="Nome da tarefa"
        prop="task"
      >
        <input
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
          color="primary"
          :loading="isLoading"
          @click="submit"
        >
          Adicionar
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
    };
  },
  methods: {
    ...mapActions(['addValue']),
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
    }
  },
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