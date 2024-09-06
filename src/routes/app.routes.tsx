import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { RecoverPassword } from "../screens/RecoverPassword";
import { RegisterUser } from "../screens/RegisterUser";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="Login" component={Login} />
                <Screen name="RecoverPassword" component={RecoverPassword} />
                <Screen name="RegisterUser" component={RegisterUser} />
            </Navigator>
        </NavigationContainer>
    );
}
