<template>
  <section>
    <button @click="showContentWrapper = !showContentWrapper">
      Toggle Css only
    </button>

    <div ref="container" :style="styleObject" class="contentWrapper">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo
        sapiente laboriosam incidunt, nulla, necessitatibus ab labore rerum hic
        eaque facilis! Eum sequi iure ullam recusandae reprehenderit, eligendi
        sit ducimus nisi dicta, tenetur laborum iusto dolores vero. Aspernatur
        quidem facilis saepe. Earum obcaecati et, amet quod quasi animi sit
        quas?
      </p>
    </div>

    <br /><br />

    <button @click="isShow = !isShow">Toggle with transition</button>

    <transition name="slide">
      <div v-if="isShow" class="child">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo
          sapiente laboriosam incidunt, nulla, necessitatibus ab labore rerum
          hic eaque facilis! Eum sequi iure ullam recusandae reprehenderit,
          eligendi sit ducimus nisi dicta, tenetur laborum iusto dolores vero.
          Aspernatur quidem facilis saepe. Earum obcaecati et, amet quod quasi
          animi sit quas?
        </p>
      </div>
    </transition>

    <br /><br />

    <div>
      <button @click="open = !open">Toggle Whack ass plugin</button>
      <client-only>
        <VueSlideToggle
          class="toggle"
          :open="open"
          tag="section"
          :duration="300"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo
          sapiente laboriosam incidunt, nulla, necessitatibus ab labore rerum
          hic eaque facilis! Eum sequi iure ullam recusandae reprehenderit,
          eligendi sit ducimus nisi dicta, tenetur laborum iusto dolores vero.
          Aspernatur quidem facilis saepe. Earum obcaecati et, amet quod quasi
          animi sit quas?
        </VueSlideToggle>
      </client-only>

      <br />
      <br />
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo
        sapiente laboriosam incidunt, nulla, necessitatibus ab labore rerum hic
        eaque facilis! Eum sequi iure ullam recusandae reprehenderit, eligendi
        sit ducimus nisi dicta, tenetur laborum iusto dolores vero. Aspernatur
        quidem facilis saepe. Earum obcaecati et, amet quod quasi animi sit
        quas?
      </h3>
    </div>
  </section>
</template>

<script>
import { VueSlideToggle } from 'vue-slide-toggle'
export default {
  components: {
    VueSlideToggle,
  },
  data() {
    return {
      showContentWrapper: false,
      styleObject: {},
      isShow: true,
      open: true,
    }
  },
  computed: {
    // style: function style() {
    //   // if (this.innerOpen && this.doneOpenTransition) return null;
    //   // var heightSize = this.innerOpen ? this.scrollHeight : 0;
    //   return this.setStyle()
    // },
  },
  watch: {
    showContentWrapper: function showContentWrapper(bool) {
      console.log('watch changed')
      // var _this = this;
      this.setStyle()
      // if (!bool) {
      //   this.getHeight();
      //   this.doneOpenTransition = false;
      //   this.$nextTick().then(function () {
      //     _this.innerOpen = false;
      //   });
      // } else {
      //   this.innerOpen = true;
      // }
    },
  },
  mounted() {
    this.setStyle()
  },
  created() {
    if (!this.showContentWrapper) {
      this.styleObject = {
        overflow: 'hidden',
        maxHeight: '0px',
      }
    }
  },
  methods: {
    setStyle() {
      let newStyle
      if (this.showContentWrapper) {
        // calculate style first:
        const container = this.$refs.container
        // eslint-disable-next-line no-unused-vars
        const height = container.scrollHeight
        // this.scrollHeight = container.scrollHeight

        newStyle = {
          overflow: 'hidden',
          maxHeight: ''.concat(height, 'px'),
        }
      } else {
        newStyle = {
          overflow: 'hidden',
          maxHeight: '0px',
        }
      }

      console.log(newStyle)
      this.styleObject = newStyle
      // let id = document.getElementById('contentWrapper')
      // id.style =

      // return newStyle
      // console.log(newStyle)
    },
  },
}
</script>

<style lang="scss">
.contentWrapper {
  background-color: red;
  transition-duration: 0.3s;
}

// .open {
//   max-height: 255px; // this has to be set programatically
//   overflow: hidden;
// }

// .close {
//   overflow: hidden;
//   max-height: 0px;
// }

.toggle {
  background-color: yellow;
}

.child {
  background-color: yellow;

  p {
    margin: 0;
  }
}

.slide-enter-active {
  transition-duration: 0.3s;
  // transition-timing-function: ease-in-out;
}

.slide-leave-active {
  transition-duration: 0.3s;
  // transition-timing-function: ease-in-out;
}

.slide-enter-to,
.slide-leave {
  max-height: 225px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0px;
}
</style>
