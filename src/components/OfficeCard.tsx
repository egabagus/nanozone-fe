import axios from "axios";
import { Office } from "../types/type";
import { useEffect, useState } from "react";
import Loader from "./utils/Loader";
import Error from "./utils/Error";

const apiKey = import.meta.env.VITE_API_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

export default function OfficeCard() {

    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storagePath = import.meta.env.VITE_STORAGE_PATH;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        axios
        .get(`${baseUrl}office-spaces`)
        .then((response) => {
            setOffices(response.data.data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false)
        });
    }, []);

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return  <Error/>
    }

    return (
        <div className="grid grid-cols-3 gap-[30px]">
            {offices.map((office) => (
                <div className="card" key={office.id}>
                    <a href="details.html" >
                        <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] bg-white overflow-hidden">
                            <div className="thumbnail-container relative w-full h-[200px]">
                            <p className="absolute top-5 left-5 w-fit rounded-full p-[6px_16px] bg-[#0D903A] font-bold text-sm leading-[21px] text-[#F7F7FD]">
                                Popular
                            </p>
                            <img
                                src={`${storagePath}${office.thumbnail}`}
                                className="w-full h-full object-cover"
                                alt="thumbnails"
                            />
                            </div>
                            <div className="card-detail-container flex flex-col p-5 pb-[30px] gap-4">
                            <h3 className="line-clamp-2 font-bold text-[22px] leading-[36px] h-[72px]">
                                {office.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-xl leading-[30px]">
                                Rp {office.price}
                                </p>
                                <div className="flex items-center justify-end gap-[6px]">
                                <p className="font-semibold">{office.duration} Days</p>
                                <img
                                    src="/assets/images/icons/clock.svg"
                                    className="w-6 h-6"
                                    alt="icon"
                                />
                                </div>
                            </div>
                            <hr className="border-[#F6F5FD]" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-end gap-[6px]">
                                <img
                                    src="/assets/images/icons/location.svg"
                                    className="w-6 h-6"
                                    alt="icon"
                                />
                                <p className="font-semibold">{office.city.name}</p>
                                </div>
                                <div className="flex items-center justify-end gap-[6px]">
                                <p className="font-semibold">4.5/5</p>
                                <img
                                    src="/assets/images/icons/Star 1.svg"
                                    className="w-6 h-6"
                                    alt="icon"
                                />
                                </div>
                            </div>
                            <hr className="border-[#F6F5FD]" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-end gap-[6px]">
                                <img
                                    src="/assets/images/icons/wifi.svg"
                                    className="w-6 h-6"
                                    alt="icon"
                                />
                                <p className="font-semibold">Fast-Connection</p>
                                </div>
                                <div className="flex items-center justify-end gap-[6px]">
                                <img
                                    src="/assets/images/icons/security-user.svg"
                                    className="w-6 h-6"
                                    alt="icon"
                                />
                                <p className="font-semibold">Secure 100%</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    )
}