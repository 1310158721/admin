<template>
  <div class="baidu-map-peripheral-wrapper">
    <div class="search-wrapper mgb-20">
      <el-input
        class="search-item"
        :placeholder="$t('Map.BaiduMap.InputPlaceholder')"
        size="small"
        v-model="searchWord"
        @keyup.enter.native="handleSearch"
      >
        <template slot="append">
          <el-button size="small" type="primary" @click.native="handleSearch"
            >{{ $t('Map.BaiduMap.InputSearchButtons') }}</el-button
          >
        </template>
      </el-input>
    </div>
    <div class="peripheral-buttons-wrapper mgb-20">
      <span
        class="peripheral-buttons"
        :class="{ active: i.keyword === keyword.keyword }"
        v-for="(i, index) in peripheralButtons"
        :key="index"
        @click="peripheralButtonsClick(i)"
        >{{ i.label }}</span
      >
    </div>
    <div class="baidu-map-information-wrapper">
      <div class="desc-informations mgr-20">
        <leftNavigation
          @leftClick="leftClick"
          :responseData="responseData"
          :point='activePoint'
          :center='center'
          v-loading='isMapLoading'
        />
      </div>
      <div class="baidu-map" v-loading="isMapLoading">
        <baidu-map
          class="map-box"
          :center="center"
          @ready="mapReady"
          :zoom="15"
          :min-zoom="13"
          :scroll-wheel-zoom="true"
        >
          <specialOverlay
            v-for="i in getLocalPoint"
            :key="i.id"
            :item="i"
            :isActive="
              i.point.lat === activePoint.lat && i.point.lng === activePoint.lng
            "
            @specialOverlayClick="specialOverlayClick"
          />
          <bm-overlay
            ref="customOverlay"
            :class="{ centerSample: true, active: isCenterActive }"
            pane="labelPane"
            @draw="draw"
          >
            <div class="overlay-wrapper" @click.prevent="handleClickLocalPoint">
              <i class="iconfont icon icon-dizhi"></i>
              <i class="iconfont icon-sanjiaoxing triangle"></i>
              <span class="title">{{ address }}</span>
            </div>
          </bm-overlay>
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
import specialOverlay from './specialOverlay';
import leftNavigation from './leftNavigation';
export default {
  name: 'BaiduMapPeripheral',
  components: {
    specialOverlay,
    leftNavigation
  },
  props: {},
  data () {
    return {
      searchWord: '深圳市',
      city: '深圳', // 默认查询深圳市
      address: null,
      keyword: {
        keyword: '交通',
        search: ['地铁站', '公交站']
      },
      center: {
        lng: 113.95008534684693,
        lat: 22.543237423924563
      },
      Br: [],
      BMAP: null,
      MAP: null,
      responseData: [],
      isCenterActive: true,
      activePoint: {
        lat: 0,
        lng: 0
      },
      isMapLoading: true
    };
  },
  computed: {
    peripheralButtons () {
      return [
        {
          label: this.$t('Map.BaiduMap.交通'),
          keyword: '交通',
          search: ['地铁站', '公交站']
        },
        {
          label: this.$t('Map.BaiduMap.商超'),
          keyword: '商超',
          search: ['商场', '超市']
        },
        {
          label: this.$t('Map.BaiduMap.美食'),
          keyword: '美食',
          search: ['美食']
        },
        {
          label: this.$t('Map.BaiduMap.咖啡厅'),
          keyword: '咖啡厅',
          search: ['咖啡厅']
        },
        {
          label: this.$t('Map.BaiduMap.酒吧'),
          keyword: '酒吧',
          search: ['酒吧']
        },
        {
          label: this.$t('Map.BaiduMap.公园'),
          keyword: '公园',
          search: ['公园']
        },
        {
          label: this.$t('Map.BaiduMap.景点'),
          keyword: '景点',
          search: ['景点']
        },
        {
          label: this.$t('Map.BaiduMap.药店'),
          keyword: '药店',
          search: ['药店']
        }
      ];
    },
    getLocalPoint () {
      let result = [];
      this.responseData.map(i => {
        result = result.concat(i.list);
      });
      return result;
    },
    keywordIcon () {
      return [
        {
          keyword: '地铁站',
          icon: 'icon-ditie'
        },
        {
          keyword: '公交站',
          icon: 'icon-gongjiao'
        },
        {
          keyword: '商场',
          icon: 'icon-shangchang'
        },
        {
          keyword: '超市',
          icon: 'icon-chaoshi'
        },
        {
          keyword: '美食',
          icon: 'icon-meishi'
        },
        {
          keyword: '咖啡厅',
          icon: 'icon-kafeiting'
        },
        {
          keyword: '酒吧',
          icon: 'icon-jiuba'
        },
        {
          keyword: '公园',
          icon: 'icon-gongyuan'
        },
        {
          keyword: '景点',
          icon: 'icon-scenery'
        },
        {
          keyword: '药店',
          icon: 'icon-yao'
        }
      ];
    }
  },
  methods: {
    peripheralButtonsClick (i) {
      this.keyword = i;
      this.MAP.panTo(new this.BMAP.Point(this.center.lng, this.center.lat));
      this.isCenterActive = true;
      this.activePoint = this.center;
      this.isMapLoading = true;
      this.handleSearch();
    },
    handleSearch () {
      if (!this.searchWord.trim()) {
        this.$message.warning('查询地址不能为空');
        return false;
      }
      this.isMapLoading = true;
      this.address = this.searchWord;
      const address = this.address;
      const BMap = this.BMAP;
      const Geocoder = new BMap.Geocoder();
      Geocoder.getPoint(
        address,
        point => {
          this.center = point;
          // 获取完数据后，将其定位到当前的中心点，避免初次点击/拖拽地图时覆盖物会重新定位
          this.MAP.panTo(new this.BMAP.Point(this.center.lng, this.center.lat));
          this.mapLocalSearch(this.keyword.search, res => {
            this.formatResponseData(res);
            this.isCenterActive = true;
            this.activePoint = this.center;
            this.$nextTick(() => {
              setTimeout(() => {
                this.isMapLoading = false;
              }, 400);
            });
          });
        },
        '深圳市'
      );
    },
    mapReady ({ BMap, map }) {
      this.BMAP = BMap;
      this.MAP = map;
      this.handleSearch();
    },
    draw ({ el, BMap, map }) {
      const { lng, lat } = this.center;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 10 + 'px';
      el.style.top = pixel.y - 10 + 'px';
    },
    // 搜索指定周边，并获取相关数据
    mapLocalSearch (keyword, cb) {
      const { lng, lat } = this.center;
      const Point = new this.BMAP.Point(lng, lat);
      const localSearch = new this.BMAP.LocalSearch(Point, {
        onSearchComplete: cb
      });

      localSearch.searchNearby(keyword, Point, 2000);
    },
    formatResponseData (res) {
      this.responseData = res.map(i => {
        const keywordIcon = this.keywordIcon.filter(
          k => k.keyword === i.keyword
        )[0].icon;
        i.Br = i.Br.map(j => {
          j.address = j.address.split(';');
          j.icon = keywordIcon;
          j.distance =
            Math.floor(this.MAP.getDistance(this.center, j.point)) + 'm';
          return j;
        });
        return {
          tag: i.keyword,
          // tag: this.peripheralButtons.filter((j) => j.search.includes(i.keyword))[0].label,
          list: i.Br
        };
      });
    },
    leftClick (point) {
      this.activePoint = point;
      this.MAP.panTo(new this.BMAP.Point(point.lng, point.lat));
      this.isCenterActive = false;
    },
    specialOverlayClick (point) {
      this.activePoint = point;
      this.MAP.panTo(new this.BMAP.Point(point.lng, point.lat));
      this.isCenterActive = false;
    },
    handleClickLocalPoint () {
      this.isCenterActive = true;
      this.activePoint = this.center;
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
$sampleSize: 20px;
.baidu-map-peripheral-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-wrapper {
    height: 32px;
    display: flex;
    flex-direction: row;
    .search-item {
      width: 300px;
    }
  }
  .peripheral-buttons-wrapper {
    height: 32px;
    .peripheral-buttons {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      text-align: center;
      padding: 0px 20px;
      margin: 0px 10px;
      border: 1px black solid;
      border-radius: 4px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        border: 1px #409eff solid;
        color: #409eff;
      }
      &.active {
        border: 1px red solid;
        color: red;
        font-weight: bold;
      }
    }
  }
  .baidu-map-information-wrapper {
    flex: 1;
    height: calc(100% - 104px);
    display: flex;
    flex-direction: row;
    .desc-informations {
      width: 300px;
      height: 100%;
      overflow-y: auto;
      border: 1px black solid;
      box-sizing: border-box;
    }
    .baidu-map {
      flex: 1;
      width: 100%;
      height: 100%;
      /deep/.anchorBL {
        display: none;
      }
      .map-box {
        height: 100%;
        width: 100%;
        .centerSample {
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
          &:hover {
            z-index: 200;
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
      }
    }
  }
}
</style>
