import React, { Component } from 'react';
import Image from 'next/image';

export default class CardEducation extends Component {
  render() {
    const { data, id } = this.props;
    return (
      <React.Fragment>
        {data.map((item, index) => {
          return (
            <div key={index} id={id} className='flex py-3'>
              <div className='flex bg-white py-3 w-16 relative'>
                <div className='absolute top-8 left-2'>
                  <div className="w-20 h-20 inline-flex items-center justify-center rounded-full shadow-md bg-white flex-shrink-0 p-2 mx-2.5">
                    <Image width={55} height={55} src={item.icon} alt='logo-project' />
                  </div>
                </div>
              </div>
              <div className='flex bg-slate-800 py-6 w-full'>
                <div className='flex flex-col pl-6 text-gray-300 ml-8'>
                  <h1 className='font-bold text-lg pb-1'>{item.title}</h1>
                  <div className='border border-gray-500 w-full'></div>
                  <p className='font-semibold text-lg'>{item.role} - {item.job}</p>
                  <p>{item.since}</p>
                  <p>{item.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
