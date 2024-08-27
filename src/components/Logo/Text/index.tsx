import { Text } from 'react-native'


export function LogoText({size = 30}: {size?: number}) {
    return (
        <Text style={{ fontSize: size, fontFamily: "Acme" }}>CALENDALL</Text>
    );
}  
