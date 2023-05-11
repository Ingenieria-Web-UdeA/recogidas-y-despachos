import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { DateFiltersContextProvider } from '@context/DateFiltersContext';
import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <DateFiltersContextProvider>
          <Component {...pageProps} />
        </DateFiltersContextProvider>
        <ToastContainer />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default App;
