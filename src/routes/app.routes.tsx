import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { RecoverPassword } from "../screens/RecoverPassword";
import { RegisterUser } from "../screens/RegisterUser";
import { NavigationContainer } from "@react-navigation/native";
import { TermsOfUse } from "../screens/TermsOfUse";
import { PrivacyPolicy } from "../screens/PrivacyPolicy";
import { CodeConfirmation } from "../screens/RecoverPassword/CodeConfirmation";
import { ChangePassword } from "../screens/RecoverPassword/ChangePassword";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="RecoverPassword"
                    component={RecoverPassword}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="RegisterUser"
                    component={RegisterUser}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="TermsOfUse"
                    component={TermsOfUse}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="CodeConfirmation"
                    component={CodeConfirmation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                        headerShown: false,
                    }}
                />
                <Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}
