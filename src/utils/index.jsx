import React from "react"
import logo from "@/assets/vite.svg"

export const Loading = () => {
    return <div className="w-full h-screen flex flex-col justify-center items-center">
        <img src={logo} alt="" />
        <p className="text-gray-600 text-sm">Yuklanmoqda...</p>
    </div>
}

export const Suspense = ({children}) => {
    return <React.Suspense fallback={<Loading/>}>{children}</React.Suspense>
}