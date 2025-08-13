import React, { Component } from 'react'
import Image from 'next/image';

export default class Card extends Component {
  render() {
    const { data, id } = this.props;
    return (
      <React.Fragment>
        {data.map((item, index) => {
          return (
            <div key={index} id={id} className={`flex flex-row justify-center items-center mx-auto text-white w-20 h-20 rounded-full shadow-md hover:shadow-lg`}>
              <Image
                src={item.icon}
                width={50}
                height={50}
                alt="logo"
              />
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
