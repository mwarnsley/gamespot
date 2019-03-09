<template>
  <div>
    <carousel
      :mouse-drag="true"
      :per-page="1"
      paginationEnabled="false"
    >
      <slide
        :key="`featured_slide${index}`"
        v-for="(slide, index) in slides"
      >
        <div
          class="slider_bck"
          :style="{ background: `url(${slide.bck})`}"
        >
          <div class="gradient">
            <div class="container">
              <div class="content">

                <div class="item">
                  {{ slide.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import SlideOne from "../../assets/images/featured/1.jpg";
import SlideTwo from "../../assets/images/featured/2.jpg";
import SlideThree from "../../assets/images/featured/3.jpg";
import SlideFour from "../../assets/images/featured/4.jpg";

export default {
  name: "Featured",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      slides: [
        {
          title: "Red Dead Redemption 2",
          bck: SlideOne
        },
        {
          title: "Watchdogs 2",
          bck: SlideTwo
        },
        {
          title: "Rise of the Tomb Raider",
          bck: SlideThree
        },
        {
          title: "Spiderman",
          bck: SlideFour
        }
      ]
    };
  }
};
</script>

