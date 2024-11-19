import { useEffect, useState } from "react"
import { City } from "../types/type";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

axios.defaults.headers.common['Authorization'] = `Bearer 2|zhDoCrbaCoaeNl412waggjQUwUbWOsA9v3lA4bMFbb41daf0`;

export default function CityCard() {

    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storagePath = "http://nanozone-be.test/storage/";

    useEffect(() => {
        axios
        .get("http://nanozone-be.test/api/admin/cities")
        .then((response) => {
            setCities(response.data.data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false)
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return  <p>Error: {error}</p>
    }

    return (
        <Swiper 
        direction="horizontal"
        spaceBetween={30}
        slidesPerView="auto"
        slidesOffsetAfter={30}
        slidesOffsetBefore={30}>
            {cities.map((city) => (
                <SwiperSlide key={city.id} className="!w-fit first-of-type:pl-[calc((100%-1130px-60px)/2)] last-of-type:pr-[calc((100%-1130px-60px)/2)]">
                    <a href="city-details.html" className="card">
                        <div className="relative flex shrink-0 w-[230px] h-[300px] rounded-[20px] overflow-hidden">
                            <div className="relative flex flex-col justify-end w-full h-full p-5 gap-[2px] bg-[linear-gradient(180deg,_rgba(0,0,0,0)_49.87%,_rgba(0,0,0,0.8)_100%)] z-10">
                            <h3 className="font-bold text-xl leading-[30px] text-white">
                                {city.name}
                            </h3>
                            </div>
                            <img
                            src={`${storagePath}${city.photo}`}
                            className="absolute w-full h-full object-cover"
                            alt="thumbnails"
                            />
                        </div>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}