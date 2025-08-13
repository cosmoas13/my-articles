import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    const { data, id } = this.props;
    return (
      <React.Fragment>
        <div className="text-gray-700 my-3 mx-3" id={id}>
          <h5 className="text-xl font-bold">About Me</h5>
          <div className="flex items-center">
            <p className="text-gray-600">Hello! I am Kevin Web Developer. </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 lg:pr-11">
              I am Bachelor of Information Technology graduate. The professional expertise that I have in the field of programming,
              React.js, Express.js, Redux. Have the experience from intensive 6 weeks Dumbways.id Bootcamp
              to develop apps effectively and efficiently.
            </p>
          </div>
        </div>
        {/*  */}
        <div className="text-gray-700 my-3 mx-3">
          <h5 className="text-xl font-bold">Basic Information</h5>
          {data.map((item, index) => {
            return (
              <div key={index} className="flex items-center justify-between">
                <p className="text-gray-600 py-1 text-base font-bold">{item.name}</p>
                <p className="text-gray-600 py-1">{item.value}</p>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}
