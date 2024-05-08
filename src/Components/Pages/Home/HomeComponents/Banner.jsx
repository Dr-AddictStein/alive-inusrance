import React, { useContext } from 'react';
import './banner.css';
import { NavbarContext } from '../../../../Others/context/NavbarContext';
import { Link } from 'react-router-dom';
import bannerImage from '../../../../assets/Hero Image.png'; // Import the banner image

const Banner = () => {
    const { instruction } = useContext(NavbarContext);

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat font-sans"
            style={{
                backgroundImage: `url(${bannerImage})`,
                maxHeight: `calc(80vh - 80px)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

            <div className="relative mx-auto max-w-screen-xl  px-4 sm:px-6 lg:flex h-[70vh] lg:items-center lg:px-8">
                {instruction === 'home' && (
                    <div className="max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
                            Arcu suscipit
                            <strong className="block font-extrabold text-black"> massa aliquam  </strong>
                        </h1>

                        <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                            At lacus vitae nulla sagittis scelerisque nisl. Pellentesque duis cursus vestibulum, facilisi ac, sed faucibus.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full bg-[#1D6FFF] px-12 py-3 text-base font-semibold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring sm:w-auto"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                )}

                {instruction === 'customer-login' && (
                    <div>
                        <div className="w-full mx-auto lg:w-[500px]">
                            <form className="p-12">
                                <div className='py-10'>
                                    <h1 className="backdrop-blur-sm mb-5 font-semibold text-4xl text-black">Customer Login</h1>
                                    <h1 className='text-black'>Need an account? <Link className='font-bold'>Register here</Link></h1>
                                </div>
                                <div className="space-y-5">
                                    <div className="relative">
                                        <input id="email" type="email" placeholder="Email" className="py-3 block w-full pl-4 outline-none text-black rounded-lg border" />
                                    </div>
                                    <div className="relative">
                                        <input id="pass" type="password" placeholder="Password" className="py-3 block w-full pl-4 outline-none text-black rounded-lg border" />
                                    </div>
                                </div>
                                <button type="submit" className="py-3 rounded-sm text-white bg-[#1D6FFF] font-semibold px-5 w-full mb-4 mt-6 after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 relative inline-block">Submit</button>
                                <h1 className='text-black'>Forgot Password? </h1>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Banner;
