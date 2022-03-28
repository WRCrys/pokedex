import 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import * as eva from '@eva-design/eva';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AntProvider } from '@ant-design/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <AntProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ApplicationProvider>
        </AntProvider>
      </ReduxProvider>
    </AuthProvider>
  );
};

export default App;
