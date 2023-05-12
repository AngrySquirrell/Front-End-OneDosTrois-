import "./App.css";
import { useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./scripts/pocketbase";
import { Flex, Text } from "@mantine/core";
import { socket } from "./scripts/globalVariable";

function App() {
    const { auth } = useAuthStore();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });
    }, []);

    return (
        <>
            <Navbar auth={auth} />
            {auth.isValid ? (
                <Gameboard />
            ) : (
                <Flex
                    w={"100vw"}
                    h={"100vh"}
                    justify={"center"}
                    align={"center"}
                >
                    <Text weight={700} size={24}>
                        Vous devez vous connecter pour jouer !
                    </Text>
                </Flex>
            )}
        </>
    );
}

export default App;
