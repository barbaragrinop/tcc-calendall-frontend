import { Text } from 'react-native'

export default function LogoText({size = 30}: {size?: number}) {
    return (
        <Text style={{ fontSize: size, fontFamily: "Acme" }}>CALENDALL</Text>
    );
}  
