export default function Thumbnail({photo}){
    return (
        <section id="Gallery" className="-mb-[50px]">
            <div className="swiper w-full">
            <div className="swiper-wrapper">
                <div className="swiper-slide !w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                    <img
                    src="assets/images/thumbnails/thumbnail-details-1.png"
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                    />
                </div>
                </div>
                <div className="swiper-slide !w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                    <img
                    src="assets/images/thumbnails/thumbnail-details-2.png"
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                    />
                </div>
                </div>
                <div className="swiper-slide !w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                    <img
                    src="assets/images/thumbnails/thumbnail-details-3.png"
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                    />
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}