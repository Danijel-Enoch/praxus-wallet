// import React from 'react'

export default function Start() {
    return (
        <div className="flex flex-col w-full justify-between items-center h-[70dvh] z-10 ">
            <div className="px-3.5 py-2.5 bg-[#0B0D1D] rounded-md inline-flex justify-center items-center gap-2.5 w-fit ">
                <div className="flex justify-start  text-xs font-bold text-gradient">
                    Get Base Name
                </div>
            </div>
            <div className=" space-y-4">
                <div className="flex justify-center items-center gap-4">
                    <div className="">
                        <img src="/logo.png" alt="praxus" />
                    </div>
                    <div className="text-4xl font-bold">Hi, I'm Praxus</div>
                </div>
                <div className="flex justify-center text-center text-md w-[70%] container text-gray-500">You can kickstart your trading process with my comprehensive selection of predefined prompts.</div>
            </div>
            <div className=""></div>
        </div>
    );
}
