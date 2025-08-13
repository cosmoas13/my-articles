import React, { Component } from 'react';
import { ICONS } from '../../../configs';
import Image from 'next/image';

export default class ScrollTop extends Component {
  state = {
    visible: 'false'
  }

  componentDidMount() {
    this._handleToggleVisible();
  }

  _handleToggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      this.setState({
        visible: true
      })
    }
    else if (scrolled <= 300) {
      this.setState({
        visible: false
      })
    }
  }

  _handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this._handleToggleVisible)
    }
    return (
      <div className={`animate-bounce fixed right-3 bottom-3 z-10 cursor-pointer ${this.state.visible ? 'inline' : 'hidden'}`}>
        <div className='flex items-center justify-center rounded-full w-14 h-14 mx-2 bg-slate-400 hover:bg-slate-500 cursor-pointer transition duration-150 ease-in-out' onClick={this._handleScrollToTop}>
          <Image src={ICONS.W_ARROW_TOP} alt='logo-mainhome' />
        </div>
      </div>
    )
  }
}
