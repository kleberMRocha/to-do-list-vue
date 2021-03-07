import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from 'uuidv4';
import {GetValues, alterValue} from './apiActionsServices';

Vue.use(Vuex);

const store = new Vuex.Store({
state:[],
mutations:{
    initialState:(state, tasks) => {
        state.push(...tasks);
    },
    addTask:(state, task) => {
        const id = uuid();
        task.id = id;
        state.push(task);
    },
    removeTask:(state, id) =>{
      const validTasks = state.filter(task => task.id != id);
      state.length = 0;
      state.push(...validTasks);

    },
    changeTakStatus:(state, id) => {
        state.map(task =>{
            return task.id === id 
            ? task.completed = !task.completed
            : task
        })
    },
},
actions: {
    getIntilValues({ commit }) {
     GetValues()
     .then(data => {
        commit('initialState', data)
     });
    },
    alterValues({ commit }, data){
        alterValue(data)
        .then(resposen => { 
            commit('changeTakStatus', resposen.id);
        }).catch(erro => console.log(erro))
    }
  }

});

export default store;