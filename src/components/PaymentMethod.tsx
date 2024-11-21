import axios from "axios";
import { useEffect, useState } from "react";
import { PaymentMethods } from "../types/type";
import { useParams } from "react-router-dom";
import Loader from "./utils/Loader";
import Error from "./utils/Error";

const apiKey = import.meta.env.VITE_API_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

export default function PaymentMethod() {

    const [methods, setPayment] = useState<PaymentMethods[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storagePath = import.meta.env.VITE_STORAGE_PATH;
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
        .get(`${baseUrl}payment-methods`)
        .then((response) => {
            setPayment(response.data.data);
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
    if (!methods) {
        return 'NOT FOUND'
    }

    return (
        <div className="flex flex-col gap-[30px]">
            {methods.map((method) => (
                <div className="flex items-center gap-3" key={method.id}>
                    <div className="w-[71px] flex shrink-0">
                        <img
                        src={`${storagePath}${method.thumbnail}`}
                        className="w-full object-contain"
                        alt="bank logo"
                        />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                        <div className="flex items-center gap-1">
                        <p className="font-semibold">{method.desc}</p>
                        <img
                            src="/assets/images/icons/verify.svg"
                            className="w-[18px] h-[18px]"
                            alt="icon"
                        />
                        </div>
                        <p>{method.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}