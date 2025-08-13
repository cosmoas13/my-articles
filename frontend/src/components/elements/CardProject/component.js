import React, { Component } from 'react';
import Image from 'next/image';

export default class Card extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <section className="text-gray-200 bg-gray-100">
          <div className="flex flex-wrap sm:m-4 mx-4 mb-10 mt-4">
            {/* start */}
            {data.map((item, index) => {
              return (
                <div key={index} className="p-10 lg:w-1/3 lg:mb-0 mb-6 flex flex-col">
                  <div className="pattern-dots-md bg-primary text-slate-900">
                    <div className="rounded-lg bg-slate-800 transform translate-x-6 -translate-y-6">
                      <div className='bg-white h-32 relative'>
                        <h2 className="text-2xl title-font font-bold text-slate-800 text-center absolute right-0 left-0 bottom-0 top-8">{item.name}</h2>
                        <div className='text-center absolute top-20 right-0 left-0'>
                          <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-white shadow-md mb-5 flex-shrink-0 p-2">
                            <Image width={55} height={55} src={item.icon} alt='logo-project' />
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow text-gray-300 text-center pb-4 pt-12 px-4">
                        <p className="leading-relaxed text-sm">{item.description}</p>
                        {item.urlData === '#' ?
                          <div className='bg-white font-semibold text-slate-900 mt-3 mx-auto w-7/12 rounded-md pointer-events-none'>
                            <a href={item.urlData} target="_blank" rel="noreferrer">
                              <p className="leading-relaxed text-sm">Under Development</p>
                            </a>
                          </div> :
                          <div className='bg-white hover:bg-gray-300 font-semibold text-slate-900 hover:text-white mt-3 mx-auto w-7/12 rounded-md'>
                            <a href={item.urlData} target="_blank" rel="noreferrer">
                              <p className="leading-relaxed text-sm">Visit Website</p>
                            </a>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* end */}
          </div>
        </section >
      </div >
    )
  }
}
