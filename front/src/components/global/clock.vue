<template>
  <canvas id="clock"></canvas>
</template>

<script>
export default {
  name: 'Clock',
  components: {},
  props: {
    size: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {};
  },
  computed: {},
  methods: {
    drawBackground (ctx, r, rem) {
      ctx.save();
      ctx.translate(r, r);
      ctx.beginPath();
      ctx.lineWidth = 10 * rem;
      ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
      ctx.stroke();
      const hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      ctx.font = 18 * rem + 'px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      hourNumbers.forEach(function (number, i) {
        const rad = ((2 * Math.PI) / 12) * i;
        const x = Math.cos(rad) * (r - 30 * rem);
        const y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number, x, y);
      });

      for (let i = 0; i < 60; i++) {
        const rad = ((2 * Math.PI) / 60) * i;
        const x = Math.cos(rad) * (r - 18 * rem);
        const y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
          ctx.fillStyle = '#000';
          ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        } else {
          ctx.fillStyle = '#ccc';
          ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
      }
    },
    drawHour (ctx, r, rem, hour, minute) {
      ctx.save();
      ctx.beginPath();
      const rad = ((2 * Math.PI) / 12) * hour;
      const mrad = ((2 * Math.PI) / 12 / 60) * minute;
      ctx.rotate(rad + mrad);
      ctx.lineWidth = 6 * rem;
      ctx.moveTo(0, 10 * rem);
      ctx.lineTo(0, -r / 2);
      ctx.stroke();
      ctx.restore();
    },
    drawMinute (ctx, r, rem, minute) {
      ctx.save();
      ctx.beginPath();
      const rad = ((2 * Math.PI) / 60) * minute;
      ctx.rotate(rad);
      ctx.lineWidth = 3 * rem;
      ctx.moveTo(0, 10 * rem);
      ctx.lineTo(0, -r + 30 * rem);
      ctx.stroke();
      ctx.restore();
    },
    drawSecond (ctx, r, rem, second) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = '#c14543';
      const rad = ((2 * Math.PI) / 60) * second;
      ctx.rotate(rad);
      ctx.moveTo(-2, 20 * rem);
      ctx.lineTo(2, 20 * rem);
      ctx.lineTo(1, -r + 18 * rem);
      ctx.lineTo(-1, -r + 18 * rem);
      ctx.fill();
      ctx.restore();
    },
    drawDot (ctx, rem) {
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
      ctx.fill();
    },
    draw (ctx, r, rem, width, height) {
      ctx.clearRect(0, 0, width, height);
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      this.drawBackground(ctx, r, rem);
      this.drawHour(ctx, r, rem, hour, minute);
      this.drawMinute(ctx, r, rem, minute);
      this.drawSecond(ctx, r, rem, second);
      this.drawDot(ctx, rem);
      ctx.restore();
    }
  },
  mounted () {
    const dom = document.getElementById('clock');
    const ctx = dom.getContext('2d');
    ctx.canvas.width = this.size;
    ctx.canvas.height = this.size;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const r = width / 2;
    const rem = width / 200;
    this.draw(ctx, r, rem, width, height);
    setInterval(() => {
      this.draw(ctx, r, rem, width, height);
    }, 1000);
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
