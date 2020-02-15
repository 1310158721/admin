<template>
  <bm-overlay
    v-if="item"
    ref="customOverlay"
    :class="{ sample: true, active: this.isActive || isMouseEnter, hover: isMouseEnter }"
    pane="labelPane"
    @draw="draw"
  >
    <div
      class="overlay-wrapper"
      @click.prevent="handleClick(item.point)"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <i class="iconfont icon" :class="item.icon"></i>
      <i class="iconfont icon-sanjiaoxing triangle"></i>
      <span class="title">{{ item.title }}</span>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  name: 'specialOverlay',
  components: {},
  props: {
    item: {
      type: Object,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      BMAP: null,
      MAP: null,
      isMouseEnter: false
    };
  },
  computed: {},
  methods: {
    draw ({ el, BMap, map }) {
      this.MAP = map;
      this.BMAP = BMap;
      const { lng, lat } = this.item.point;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 10 + 'px';
      el.style.top = pixel.y - 10 + 'px';
    },
    handleClick (point) {
      this.$emit('specialOverlayClick', point);
    },
    mouseEnter () {
      this.isMouseEnter = true;
    },
    mouseLeave () {
      this.isMouseEnter = false;
    }
  },
  created () {},
  mounted () {},
  watch: {
    'item.point' () {
      this.$refs.customOverlay.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
$sampleSize: 20px;
.sample {
  width: $sampleSize;
  height: $sampleSize;
  position: absolute;
  &.active {
    z-index: 100;
    .overlay-wrapper {
      .title {
        color: red;
        background-color: #fff;
      }
      .triangle {
        color: #fff;
      }
      .icon {
        color: red;
      }
    }
  }
  &.hover {
    z-index: 200;
  }
  .overlay-wrapper {
    width: $sampleSize;
    height: $sampleSize;
    position: relative;
    top: 0;
    left: 0;
    .icon {
      display: inline-block;
      font-size: 20px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: rgb(102, 102, 102);
      border-radius: 50%;
      background-color: #ffffff;
    }
    .title {
      display: inline-block;
      line-height: 30px;
      padding: 0 20px;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -41px;
      white-space: nowrap;
      background-color: rgb(102, 102, 102);
    }
    .triangle {
      font-size: 20px;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 50%;
      top: -15px;
      transform: translateX(-50%);
      color: rgb(102, 102, 102);
    }
  }
}
</style>
