<template>
  <section>
    <button @click="showDescription = !showDescription">Toggle Css only</button>

    <div ref="toggleContainer" :style="styleObject">
      <p>
        ungroup is a Berlin-based creative practice engaged in art, design,
        research and programming. We work on self-initiated projects alongside
        commissions in the art, tech and cultural fields.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showDescription: false,
      duration: 500,
      transitionTiming: 'cubic-bezier(0.45, 0, 0.55, 1)', // https://easings.net/de
      styleObject: {},
    }
  },
  computed: {},
  watch: {
    showDescription: function showDescription() {
      this.setStyle()
    },
  },
  mounted() {
    this.setStyle()
  },
  created() {
    if (!this.showDescription) {
      this.styleObject = {
        overflow: 'hidden',
        maxHeight: '0px',
        opacity: 0,
      }
    }
  },
  methods: {
    setStyle() {
      const newStyle = {
        overflow: 'hidden',
        transitionDuration: ''.concat(this.duration, 'ms'),
        transitionTimingFunction: this.transitionTiming,
      }
      if (this.showDescription) {
        // calculate style
        const height = this.$refs.toggleContainer.scrollHeight
        newStyle.maxHeight = ''.concat(height, 'px')
        newStyle.opacity = 1
      } else {
        newStyle.maxHeight = '0px'
        newStyle.opacity = 0
      }

      this.styleObject = newStyle
    },
  },
}
</script>
