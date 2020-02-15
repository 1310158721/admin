<template>
  <div class="desc-message-list-wrapper" ref='wrapper'>
    <div
      class="desc-message-list-item-wrapper"
      v-for="i in responseData"
      :key="i.id"
    >
      <div class="desc-message-list-item-title">{{ i.tag }}</div>
      <div class="desc-message-list-item-info" v-if="i.list && i.list.length">
        <div
          @click="handleClick(j.point)"
          class="list-item-info"
          :class="{
            active:
              j.point.lat === activePoint.lat && j.point.lng === activePoint.lng
          }"
          v-for="j in i.list"
          :key="j.id"
        >
          <div class="list-item-info-title-wrapper">
            <span class="list-item-info-title">{{ j.title }}</span>
            <span class="list-item-info-distance">{{ j.distance }}</span>
          </div>
          <div class="list-item-info-address-wrapper" v-if="j.address.length">
            <span
              class="list-item-info-address-item"
              :class="{ wrap: j.address.length > 1 }"
              v-for="k in j.address"
              :key="k.id"
              >{{ k }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftNavigation',
  components: {},
  props: {
    responseData: {
      type: Array,
      default: () => []
    },
    point: {
      type: Object,
      default: () => {}
    },
    center: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activePoint: {
        lng: 0,
        lat: 0
      }
    };
  },
  computed: {},
  methods: {
    handleClick (point) {
      this.activePoint = point;
      this.$emit('leftClick', point);
    }
  },
  created () {},
  mounted () {},
  watch: {
    'point' (val) {
      const parentDom = this.$refs.wrapper.parentNode;
      this.activePoint = val;
      if (this.center.lat === val.lat && this.center.lng === val.lng) {
        parentDom.scrollTop = 0;
      } else {
        this.$nextTick(() => {
          const activeDom = parentDom.querySelectorAll('.active')[0];
          activeDom && activeDom.scrollIntoView();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.desc-message-list-wrapper {
  min-height: 100%;
  .desc-message-list-item-wrapper {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    box-sizing: border;
    &:last-child {
      margin-bottom: 0px;
    }
    .desc-message-list-item-title {
      font-weight: bold;
      font-size: 20px;
    }
    .desc-message-list-item-info {
      margin-top: 5px;
      box-sizing: border;
      cursor: pointer;
      .list-item-info {
        margin-bottom: 5px;
        box-sizing: border;
        &:hover {
          .list-item-info-title {
            color: red;
          }
        }
        &.active {
          .list-item-info-title {
            color: red;
          }
        }
        .list-item-info-title-wrapper {
          display: flex;
          flex-direction: row;
          margin-bottom: 2px;
          box-sizing: border;
          .list-item-info-title {
            flex: 1;
            font-size: 16px;
            font-weight: 450;
          }
          .list-item-info-distance {
            color: rgba(255, 0, 0, 0.5);
            font-weight: bold;
          }
        }
        .list-item-info-address-wrapper {
          .list-item-info-address-item {
            display: inline-block;
            margin: 2px 4px;
            padding: 2px 4px;
            box-sizing: border;
            border-radius: 2px;
            background-color: #ffffff;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
            &.wrap {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
