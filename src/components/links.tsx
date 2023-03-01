import React from "react"
import DevIcon from 'assets/awesome-dev.svg'
import DribbbleIcon from 'assets/icon-dribbble.svg'
import GitHubIcon from 'assets/icon-github.svg'
import LinkedInIcon from 'assets/icon-linkedin.svg'
import MediumIcon from 'assets/icon-medium.svg'
import TwitterIcon from 'assets/icon-twitter.svg'
import SOIcon from 'assets/icon-stack-overflow.svg'

const LinkModal = () => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block align-bottom bg-sky-400 dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-sky-400 dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Deactivate account</h3>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <LinkedInIcon className="w-full h-7 ml-5" />
                            <GitHubIcon className="w-full h-7 ml-5" />
                            <TwitterIcon className="w-full h-7 ml-5" />
                            <DevIcon className="w-full h-7 ml-5" />
                            <DribbbleIcon className="w-full h-7 ml-5" />
                            <SOIcon className="w-full h-7 ml-5" />
                            <MediumIcon className="w-full h-7 ml-5" />
                        </div>
                    </div>
                    <div className="bg-sky-400 dark:bg-slate-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkModal
