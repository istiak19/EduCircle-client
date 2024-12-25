import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from '../Slide';

const Banner = () => {
    return (
        <div className="container px-6 py-10 mx-auto">
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide
                        // image={bgimg1}
                        text="Get Your Web Development Projects Done in minutes"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        // image={bgimg1}
                        text="Boost Your Productivity with Modern Tools"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        // image={bgimg1}
                        text="Simplify and Scale Your Digital Solutions"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
