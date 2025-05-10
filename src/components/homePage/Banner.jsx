import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import sliderImage from "../../assets/images/image3.webp";
import sliderImage1 from "../../assets/images/image2.webp";
import sliderImage2 from "../../assets/images/image1.jpg";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="lg:h-[30rem] w-full" src={sliderImage} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img className="lg:h-[30rem] w-full" src={sliderImage1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img className="lg:h-[30rem] w-full" src={sliderImage2} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
