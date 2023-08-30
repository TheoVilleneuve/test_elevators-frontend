import '../styles/globals.css';
import Head from 'next/head';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import elevator1 from '../reducers/elevator1'
import callButtons from '../reducers/callButtons';

const store = configureStore({
  reducer: {elevator1, callButtons},
 });


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Test elevators
        </title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
