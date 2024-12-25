import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../../assets/slide/pic-1.jpg'
import banner2 from '../../assets/slide/pic-2.jpg'
import banner3 from '../../assets/slide/pic-3.jpg'
import Slide from '../Slide';

const Banner = () => {
    return (
        <div className="container mx-auto">
            <Swiper
                spaceBetween={30}
                 loop={true}
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
                        image={banner1}
                        text=" Welcome to Online Group-Study with Friends"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={banner2}
                        text="Create, Complete, and Grade Assignments"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={banner3}
                        text="Enhance Collaboration and Learning Together"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
