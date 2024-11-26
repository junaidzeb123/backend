import React from 'react'
import { useNavigate } from 'react-router';
import HeroImage from "../assets/Hero.png";
function Hero() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="lg:min-h-[560px] bg-blue-100 px-4 sm:px-10">
                <div className="max-w-7xl w-full mx-auto py-16">
                    <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                        <div>
                            <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">
                                Welcome to ChatSphere<h3>Seamless, Secure, and Instant Communication — Anytime, Anywhere.
                                </h3>
                            </h1>
                            <p className="text-base leading-relaxed">In a world where staying connected matters, ChatSphere offers a dynamic and modern messaging platform that keeps you in touch with the people that matter most, effortlessly and securely.</p>
                            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
                                <button
                                    onClick={() => navigate("/login")}
                                    className='bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>Get
                                    started
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[14px] fill-current ml-2"
                                        viewBox="0 0 492.004 492.004">
                                        <path
                                            d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                                            data-original="#000000" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="max-lg:mt-12 h-full">
                            <img src={HeroImage} alt="banner img" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
