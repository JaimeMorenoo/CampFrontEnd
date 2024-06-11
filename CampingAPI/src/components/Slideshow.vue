<template>
    <div class="slideshow-container">
      <swiper :autoplay=true :loop="true" :pagination="pagination" :navigation="false">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import camp1 from '@/assets/camp1.jpg';
  import camp2 from '@/assets/camp2.jpg';
  import camp3 from '@/assets/camp3.jpg';

  
  export default {
    name: 'Slideshow',
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        slides: [
          {
            image: camp1,
          },
          {
            image: camp2,
          },
          {
            image: camp3,
          },
        ],
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        
        
      };
    },
  };
  </script>
  <style scoped>
.slideshow-container {
  width: 100%;
  overflow:hidden;
  position: relative;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 2rem;
  padding: 3em 0;
}

.swiper {
  width: 100%;
  height: 200px; /* Altura deseada del slider */
}

.swiper-slide {
  width: 0%; /* Ancho deseado de cada diapositiva */
  margin: 0 auto;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

</style>