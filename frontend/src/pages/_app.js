import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import favicon from '../static/icons/logo.png';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<React.Fragment>
				<Head>
					<title>Portfolio Kevin</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='icon' href={favicon.src} type='image/x-icon' />
					<link href='https://unpkg.com/pattern.css' rel='stylesheet'></link>
				</Head>
				<div className='app'>
					<Component {...pageProps} />
				</div>
			</React.Fragment>
		);
	}
}

export default MyApp;
