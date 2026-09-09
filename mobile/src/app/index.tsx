import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

	async function sayHello() {

    	const response = await fetch(
        	"http://192.168.0.4:8000/users",
        	{
            	method: "POST",
            	headers: {
                	"Content-Type": "application/json"
            	},
            	body: JSON.stringify({
                	name
            	})
        	}
    	);

    	const data = await response.json();

    	setMessage("Hello " + data.name);

    	setTimeout(function () {
        	setMessage("");
    	}, 2000);
	}

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Hello Arun App
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />

            <Button
                title="Say Hello"
                onPress={sayHello}
            />

            <Text style={styles.message}>
                {message}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ffffff",
    },

    title: {
        fontSize: 28,
        marginBottom: 30,
        color: "#000000",
        fontWeight: "bold",
    },

    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: 10,
        marginBottom: 20,
    },

    message: {
        fontSize: 24,
        marginTop: 20,
        color: "#2196F3",
        fontWeight: "bold",
    },
});
