import Vue from "vue";
import Vuex from "vuex";
import {
  GetValues,
  alterValue,
  addValue,
  deleteValue,
} from "./apiActionsServices";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: [],
  mutations: {
    initialState: (state, tasks) => {
      state.push(...tasks);
    },
    addTask: (state, task) => {
      state.push(task);
    },
    removeTask: (state, id) => {
      const validTasks = state.filter((task) => task.id != id);
      state.length = 0;
      state.push(...validTasks);
    },
    changeTakStatus: (state, id) => {
      state.map((task) => {
        return task.id === id ? (task.completed = !task.completed) : task;
      });
    },
    updateTask: (state, data) => {
    const newState =   state.map(task => {
        if(task.id === data.id){
          task = data;
          return task;
        }
        return task;
      });
     state.length = 0;
     state.push(...newState);
    },
  },
  actions: {
    getIntilValues({ commit }) {
      GetValues().then((data) => {
        commit("initialState", data);
      });
    },
    alterValues({ commit }, data) {
      alterValue(data)
        .then((resposen) => {
          commit("changeTakStatus", resposen.id);
        })
        .catch((erro) => console.log(erro));
    },
    addValue({ commit }, data) {
      addValue(data)
        .then((reponse) => {
          commit("addTask", reponse);
        })
        .catch((erro) => console.log(erro));
    },
    removeValue({ commit }, id) {
      deleteValue(id)
        .then(() => {
          commit("removeTask", id);
        })
        .catch((erro) => console.log(erro));
    },
    updateValue({ commit }, data) {
        alterValue(data)
        .then(() => {
          commit("updateTask", data);
        })
        .catch((erro) => console.log(erro));
    },
  },
});

export default store;
