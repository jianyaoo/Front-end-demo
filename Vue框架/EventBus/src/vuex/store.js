import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        name:'admin'
    },
    mutations:{
        GET_LOGIN_NAME(state , payLoad){
            state.name = payLoad.loginNmae || '';
        }
    },
    actions:{

    },
});
export default store ;