<template>
  <div>
    <Form ref="form" :label-width="150" :rules="rules" :model="data">
      <FormItem label="Task" prop="task">
        <input type="text" v-model="data.task"/>
      </FormItem>
      <FormItem label="new password" prop="newpassword1">
        <input type="password" v-model="data.newpassword1"/>
      </FormItem>
      <FormItem label="Enter the new password again" prop="newpassword2">
        <input type="password" v-model="data.newpassword2"/>
      </FormItem>
      <FormItem>
        <Button color="primary"
                :loading="isLoading"
                @click="submit">
                Adicionar
                </Button>
                <Button @click="closeModelBtn">Cancelar</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      data: {
        task: null,
        newpassword1: null,
        newpassword2: null
      },
      rules: {
        required: ['task', 'newpassword1', 'newpassword2'],
      }
    };
  },
  methods: {
    closeModelBtn() {
      this.$emit('closeModelBtn');
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Message('Successful verification');
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.$Message.error(
          `and also ${
            validResult.messages.length
          }. The error has not been verified.`
        );
      }
    },
  }
};
</script>