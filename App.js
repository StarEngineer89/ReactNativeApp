import React, { useState, useEffect } from "react";
import { enableScreens } from "react-native-screens";
import { useFonts } from "@use-expo/font";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { customFonts } from "src/config";
import { AuthProvider, MentorProvider, PupilProvider } from "src/context";
import SplashScreen from "src/screens/Auth/SplashScreen";
import AppNavigator from "src/navigations/AppNavigator";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "src/hooks";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future releaser",
]);

enableScreens();
const App = () => {
  let [fontsLoaded] = useFonts({ ...customFonts });

  const [isLoading, setIsLoading] = useState(true);
  const { autoSignIn } = useAuth();

  useEffect(async () => {
    autoSignIn();
    // signout();

    setTimeout(() => setIsLoading(false), 300);

    return () => {};
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return isLoading ? (
    <SafeAreaProvider>
      <SplashScreen />
    </SafeAreaProvider>
  ) : (
    <SafeAreaProvider>
      <>
        <StatusBar style="auto" />
        <AppNavigator />
      </>
    </SafeAreaProvider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <AuthProvider>
      <MentorProvider>
        <PupilProvider>
          <ActionSheetProvider>
            <ConnectedApp />
          </ActionSheetProvider>
        </PupilProvider>
      </MentorProvider>
    </AuthProvider>
    </GestureHandlerRootView>

  );
};
