import './features.css'
import icon01 from '../../../../assets/01.png'
import icon02 from '../../../../assets/02.png'
import icon03 from '../../../../assets/03.png'
import icon04 from '../../../../assets/04.png'
import icon05 from '../../../../assets/05.png'
import icon06 from '../../../../assets/06.png'

const Features = () => {
    return (
        <div className='font-graphik bg-[#F4F8FF]'>
            <section className="mx-auto max-w-7xl text-black">
                <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="text-center w-full py-10">
                        <h2 class="text-3xl sm:text-3xl font-graphik">
                            <span class="">Rhoncus, accumsan dictum</span>
                        </h2>

                        <p className="mt-4 lg:block text-black font-bold lg:text-5xl">
                            Etiam nulla lectus amet nunc <br />
                            molestie at vulputate.
                        </p>

                        <h2 class="text-3xl sm:text-3xl font-graphik mt-8">
                            <span class="mid-line">Neque, pulvinar vestibulum non aliquam.</span>
                        </h2>
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <div className="mt-8 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2 md:gap-32 lg:grid-cols-3">
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon01} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-lg font-bold text-center">Et, odio elementum</h2>
                                <p className="text-base text-black text-center font-graphik">
                                    Aliquam vehicula pellentesque id mi quam ipsum. Arcu nisl faucibus mattis etiam.
                                </p>
                            </div>
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon02} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-lg font-bold text-center">Massa leo scelerisque</h2>
                                <p className="text-base text-black text-center">
                                    Velit nulla eu tortor elit sed. Volutpat ornare mi tempor, hac morbi faucibus.
                                </p>
                            </div>
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon03} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-xl font-bold">Phasellus non sit</h2>
                                <p className="text-base text-black text-center">
                                    Lobortis adipiscing sit senectus id. Rhoncus lacus mi aliquam tortor nibh.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className="mt-8 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2 md:gap-32 lg:grid-cols-3">
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon04} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-lg font-bold text-center">Enim scelerisque dictum</h2>
                                <p className="text-base text-black text-center font-graphik">
                                    Turpis eget ut sed vitae in sapien egestas ultrices feugiat. Elementum platea.
                                </p>
                            </div>
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon05} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-lg font-bold text-center">Vulputate et enim</h2>
                                <p className="text-base text-black text-center">
                                    Amet, eros nisl vestibulum tincidunt pellentesque. Congue id sapien dictum a.
                                </p>
                            </div>
                            <div className="flex items-center flex-col justify-center gap-4 max-w-[250px]">
                                <div className='h-12 w-12 rounded-full bg-[#EFF3FD] flex justify-center items-center'>
                                    <img src={icon06} alt="" className='h-10 w-10' />
                                </div>
                                <h2 className="text-xl font-bold">Faucibus eget blandit</h2>
                                <p className="text-base text-black text-center">
                                    Tristique viverra lorem nibh eget tellus eget morbi porttitor. Faucibus sit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features

