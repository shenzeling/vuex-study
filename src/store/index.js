import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 2, text: '...', done: true }
    ]
  },
  mutations: { // Mutation 必须是同步函数;不能是异步的
    // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：
    // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
    // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
    // increment (state) {
    //   state.count++
    // }
    // increment (state,n) { // 提交载荷（Payload）
    //   state.count += n
    // }
    increment (state,payload) { // 提交载荷（Payload）提交的是个对象
      state.count+= payload.amount
    }
  },
  getters: {
    //有时候我们需要从 store 中的 state 中派生出一些状态
    // Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
    // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    doneTodos (state) { // Getter 接受 state 作为其第一个参数;也可以接受其他getter作为第二个参数
      return state.todos.filter(todo => todo.done)
    },
    getTodoId: (state) => (id) => { // Getter 接受 state 作为其第一个参数;也可以接受其他getter作为第二个参数
      return state.todos.filter(todo => todo.id === id)
    },
    // getTodoId (state) {
    //   return function (id) {
    //     return state.todos.filter(todo => todo.id === id)
    //   }
    // },
    doneTodosCount (state,getters) {
      return getters.doneTodos.length
    }
    // Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值 store.getters.doneTodos
  },
  actions: {
    // increment ({commit}) {
    //   commit('increment')
    // },
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    actionA ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    },
    actionB ({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit('someOtherMutation')
      })
    },
    async actionc ({ commit }) {
      // commit('gotData', await getData())
    },
    async actiond ({ dispatch, commit }) {
      await dispatch('actionc') // 等待 actionc 完成
      // commit('gotOtherData', await getOtherData())
    }
  }
})