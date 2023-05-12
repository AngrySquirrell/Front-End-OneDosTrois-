import { useEffect, useState } from "react";
import ActiveCard from "./ActiveCard";
import EnemyDeck from "./EnemyDeck";
import UnoCard from "./UnoCard";
import {
    Header,
    Flex,
    Text,
    Button,
    Modal,
    TextInput,
    Avatar,
    Card,
} from "@mantine/core";
import { socket } from "../scripts/globalVariable";
import { useAuthStore } from "../scripts/pocketbase";
import { GameData } from "../scripts/globalInterface";
import PlayerDeck from "./PlayerDeck";
import { notifications } from "@mantine/notifications";

const Gameboard = () => {
    const [gameInfo, setGameInfo] = useState<GameData>();
    const { auth } = useAuthStore();
    useEffect(() => {
        socket.on("joined", (data) => {});
        socket.emit("join", {
            name: auth.model?.username,
            uuid: auth.model?.id,
        });

        socket.on("gameInfo", (data) => {
            setGameInfo(data);
            console.log(data);
        });
        socket.emit("getGameInfo");

        socket.on("error", (data) => {
            notifications.show({
                title: "Erreur",
                message: data,
                color: "red",
                autoClose: 5000,
            });
        });
        socket.on("info", (data) => {
            notifications.show({
                title: "Info",
                message: data,
                color: "blue",
                autoClose: 5000,
            });
        });

        socket.on("gameStarted", (data) => {
            notifications.show({
                title: "La partie a commencé !",
                message: "Bonne chance !",
                autoClose: 5000,
            });

            socket.emit("getGameInfo");
        });

        return () => {
            socket.removeAllListeners();
        };
    }, []);

    return (
        <Flex
            gap={4}
            h={"100vh"}
            w={"100vw"}
            direction={"column"}
            justify={"space-between"}
            align={"center"}
            py={64}
            sx={{ boxSizing: "border-box" }}
        >
            {gameInfo?.isFull ? (
                <>
                    <EnemyDeck length={8} />

                    <ActiveCard {...gameInfo.activeCard} />

                    <Flex gap={4} h={"fit-content"}>
                        <PlayerDeck deck={gameInfo?.deck} />
                    </Flex>
                </>
            ) : (
                <Flex
                    w="100%"
                    h={"100%"}
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                >
                    <Text weight={700} size={24}>
                        En attente d'un deuxième joueur...
                    </Text>
                    <Flex gap={8}>
                        <Button
                            onClick={() => {
                                socket.emit("join", {
                                    name: auth.model?.username,
                                    uuid: auth.model?.id,
                                });
                            }}
                        >
                            Re-join
                        </Button>
                        <Button
                            onClick={() => {
                                socket.emit("startGame");
                            }}
                        >
                            Essayer de lancer la partie
                        </Button>
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default Gameboard;
