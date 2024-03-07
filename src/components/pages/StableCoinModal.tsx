import React from 'react'

const StableCoinModal = () => {
    return (
        <div className="absolute max-w-sm my-3 overflow-x-auto bg-white rounded-lg shadow-lg">
            <div className="flex px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-center w-5">
                    <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                    </svg>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-700">Information modal</span>
            </div>

            <div className="px-10 py-5 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua.
            </div>

            <div className="flex justify-end px-5 py-4 bg-gray-100 border-t border-gray-300">
                <button className="px-3 py-2 text-sm text-gray-600 transition duration-150 hover:text-gray-700">Close</button>
            </div>
        </div>
    )
}

export default StableCoinModal