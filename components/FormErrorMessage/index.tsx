import { Text } from 'react-native'

export function ErrorMessage({ error }: { error?: string }) {
    return (
        <Text style={{
            color: '#FF4040',
            fontSize: 12,
            width: "100%",
            textAlign: "right",
            fontWeight: "bold",
        }}>
            {error || ""}
        </Text>
    )
}