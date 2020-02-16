<template>
  <div>
    <draggable
      v-model="list"
      :disabled="dragDisabled"
      @change="handleChange"
    >
      <transition-group>
        <div v-for="element in list" :key="element" class="list-item">
          {{ element }}
          <span @mouseenter="mouseEnter" @mouseleave="mouseleave"></span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'VueDraggable',
  components: {
    draggable
  },
  props: {},
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      dragDisabled: true
    };
  },
  computed: {},
  methods: {
    handleChange (val) {
      console.log(val.moved);
    },
    mouseEnter () {
      this.dragDisabled = false;
    },
    mouseleave () {
      this.dragDisabled = true;
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background: lightblue;
  border: 2px black solid;
  margin: 2px;
  text-align: center;
  position: relative;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: red;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
