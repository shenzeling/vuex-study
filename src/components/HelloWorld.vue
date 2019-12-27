<!-- 使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，
  但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，
  最好还是作为组件的局部状态 -->
<template>
  <div class="hello" @click="increment">
    {{count}}
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      localCount: 8
    }
  },
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // },
//   computed: mapState({ // mapState可以简化添加多个状态，辅助函数mapState可以帮助我们生成计算属性
//     count: state => state.count,
//     countAlias: 'count',
//     countPlusLocalcount (state) {
//       return state.count + this.localCount
//     }
// }),
  // computed: mapState(['count']), // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。,
  computed: { //mapState 函数返回的是一个对象。我们将它与局部计算属性混合使用//我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性
    localCo () {
      return 'sss'
    },
    ...mapState({ // 将对象展开合并为一个传给computed属性
      count: state => state.count,
      countAlias: 'count',
      countPlusLocalcount (state) {
        return state.count + this.localCount
      }
    }),
    ...mapGetters ([
      'getTodoId'
    ])
  },
  // 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
  //或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
//   methods: {
//     ...mapMutations([
//       'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

//       // `mapMutations` 也支持载荷：
//       'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
//     ]),
//     ...mapMutations({
//       add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
//     })
//   }
// },
  methods: {
    ...mapMutations(['increment']), // 其实就是把mutation中函数又声明在methods中；都可以用
    // incremen () {
    //   this.increment({s:8})
    // }
    // 上面这种和下面这种都可以实现
    // increment () {
    //   // this.$store.commit('increment')
    //   // this.$store.commit('increment', 10)
    //   // this.$store.commit('increment', {s:8})
    //   this.$store.commit({
    //     type: 'increment',
    //     s:9
    //   })
    // }
    // increment () {
    //   this.$store.dispatch('increment')
    // }
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    ...mapActions({
      add: 'incrementAsync' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    increment() {
    //   this.$store.dispatch({
    //   type: 'incrementAsync',
    //   amount: 10
    // })
      this.$store.dispatch('actionA').then(() => {
        // ...
      }),
    }
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
