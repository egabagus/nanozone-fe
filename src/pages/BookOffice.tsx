import axios from "axios";
import Navbar from "../components/Navbar";
import { FormEvent, useEffect, useState } from "react";
import { Office } from "../types/type";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import Error from "../components/utils/Error";
import PaymentMethod from "../components/PaymentMethod";
import { z } from "zod";
import { bookingSchema } from "../validations/bookingValidation";

const apiKey = import.meta.env.VITE_API_KEY;
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

export default function BookOffice() {

    const [office, setOffices] = useState<Office | null>();
    const [loading, setLoading] = useState(true);
    const [uniqueNumber, setUniqueNumber] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const storagePath = import.meta.env.VITE_STORAGE_PATH;
    const baseUrl = import.meta.env.VITE_API_URL;
    const appUrl = import.meta.env.VITE_BASE_URL;
    const { slug } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        start_date: "",
        office_space_id: "",
        totalAmount: "",
        duration: ""
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
        .get(`${baseUrl}office-spaces/${slug}`)
        .then((response) => {
            setOffices(response.data.data);
            setLoading(false);

            const val = response.data.data;
            const OfficeSpaceId = val.id;
            const price = val.price;
            const uniqueNumberVal = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            const totalAmountVal = price - uniqueNumberVal;
            const durationVal = val.duration

            setUniqueNumber(uniqueNumberVal);
            setTotalAmount(totalAmountVal);
            setDuration(durationVal);

            setFormData((prevData) => ({
                ...prevData,
                office_space_id: OfficeSpaceId,
                total_amount: totalAmount,
                duration: durationVal
            }));
        }).catch((error) => {
            setError(error);
            setLoading(false)
        });
    }, [slug]);

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return  <Error/>
    }
    if (!office) {
        return 'NOT FOUND'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const validation = bookingSchema.safeParse(formData);
        // if (validation.error) {
        //     console.log(validation.error.issues);
        //     return;
        // }

        setLoading(true)

        try{
            const response = await axios.post(
                `${baseUrl}booking-transactions`,
                {
                    ...formData
                }
            )

            console.log("Booking Success " + response)
        } catch (error) {
           console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Navbar/>
            <div
                id="Banner"
                className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]"
            >
                <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">
                Start Booking Your Office
                </h1>
                <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
                <img
                src="/assets/images/thumbnails/thumbnail-details-4.png"
                className="absolute w-full h-full object-cover object-top"
                alt=""
                />
            </div>
            <form
                className="relative flex justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20"
            >
                <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
                <div className="flex items-center gap-4">
                    <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
                    <img
                        src="/assets/images/thumbnails/thumbnail-details-4.png"
                        className="w-full h-full object-cover"
                        alt="thumbnail"
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                    <p className="font-bold text-xl leading-[30px]">
                        {office.name}
                    </p>
                    <div className="flex items-center gap-[6px]">
                        <img
                        src="/assets/images/icons/location.svg"
                        className="w-6 h-6"
                        alt="icon"
                        />
                        <p className="font-semibold">{office.city.name}</p>
                    </div>
                    </div>
                </div>
                <hr className="border-[#F6F5FD]" />
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold">Complete The Details</h2>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold">
                        Full Name
                    </label>
                    <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                        <img
                            src="/assets/images/icons/security-user-black.svg"
                            className="w-6 h-6"
                            alt="icon"
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            id="name"
                            className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                            placeholder="Write your complete name"
                        />
                        <input
                            type="hidden"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            id="duration"
                            className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                            placeholder="Write your complete name"
                        />
                        <input
                            type="hidden"
                            name="total_amount"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            id="total_amount"
                            className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                            placeholder="Write your complete name"
                        />
                        {formErrors.find((error) => error.path.includes('name')) && (
                            <p className="text-red-500">Name is Required</p>
                        )}
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-semibold">
                        Phone Number
                    </label>
                    <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                        <img
                            src="/assets/images/icons/call-black.svg"
                            className="w-6 h-6"
                            alt="icon"
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            id="phone"
                            className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                            placeholder="Write your valid number"
                        />
                        {formErrors.find((error) => error.path.includes('phone')) && (
                            <p className="text-red-500">Phone is Required</p>
                        )}
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-semibold">
                        Started At
                    </label>
                    <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] overflow-hidden">
                        <img
                            src="/assets/images/icons/calendar-black.svg"
                            className="w-6 h-6"
                            alt="icon"
                        />
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            id="start_date"
                            className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        {formErrors.find((error) => error.path.includes('start_date')) && (
                            <p className="text-red-500">Start Date is Required</p>
                        )}
                    </div>
                    </div>
                </div>
                <hr className="border-[#F6F5FD]" />
                <div className="flex items-center gap-3">
                    <img
                    src="/assets/images/icons/shield-tick.svg"
                    className="w-[30px] h-[30px]"
                    alt="icon"
                    />
                    <p className="font-semibold leading-[28px]">
                    Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat fokus
                    bekerja
                    </p>
                </div>
                <hr className="border-[#F6F5FD]" />
                <div className="flex flex-col gap-[30px]">
                    <h2 className="font-bold">Bonus Packages For You</h2>
                    <div className="grid grid-cols-2 gap-[30px]">
                        {office.benefits.map((benefit) => (
                            <div className="flex items-center gap-4" key={benefit.id}>
                                <img
                                src="/assets/images/icons/coffee.svg"
                                className="w-[34px] h-[34px]"
                                alt="icon"
                                />
                                <div className="flex flex-col gap-[2px]">
                                <p className="font-bold text-lg leading-[24px]">{benefit.name}</p>
                                <p className="text-sm leading-[21px]">Work-Life Balance</p>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>
                </div>
                <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
                <h2 className="font-bold">Your Order Details</h2>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                    <p className="font-semibold">Duration</p>
                    <p className="font-bold">{office.duration} Days Working</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <p className="font-semibold">Sub Total</p>
                    <p className="font-bold">Rp {office.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <p className="font-semibold">Unique Code</p>
                    <p className="font-bold text-[#FF2D2D]">-Rp {uniqueNumber}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <p className="font-semibold">Grand Total</p>
                    <p className="font-bold text-[22px] leading-[33px] text-[#0D903A]">
                        Rp {totalAmount?.toLocaleString('id-ID')}
                    </p>
                    </div>
                    <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white">
                    <img
                        src="/assets/images/icons/Polygon 1.svg"
                        className="absolute -top-[15px] right-[10px] "
                        alt=""
                    />
                    <p className="font-semibold text-sm leading-[24px] z-10">
                        Tolong perhatikan kode unik berikut ketika melakukan pembayaran
                        kantor
                    </p>
                    </div>
                </div>
                <hr className="border-[#F6F5FD]" />
                <h2 className="font-bold">Send Payment to</h2>
                <PaymentMethod/>
                <hr className="border-[#F6F5FD]" />
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]"
                >
                    <span>I've Made The Payment</span>
                </button>
                </div>
            </form>
            </>
    );
}