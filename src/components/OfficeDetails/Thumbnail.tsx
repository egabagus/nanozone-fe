import { Swiper, SwiperSlide } from "swiper/react"

export default function Thumbnail({photos}){

    const storagePath = import.meta.env.VITE_STORAGE_PATH;

    return (
        <section id="Gallery" className="-mb-[50px]">
            <Swiper
            direction="horizontal"
            spaceBetween={30}
            slidesPerView="auto"
            slidesOffsetAfter={30}
            slidesOffsetBefore={30}>
                {photos.map((photos) => (
                    <SwiperSlide className="swiper-slide !w-fit"key={photos.id}>
                        <div className="w-[700px] h-[550px] overflow-hidden">
                            <img
                            src={`${storagePath}${photos.photo}`}
                            className="w-full h-full object-cover"
                            alt="thumbnail"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}