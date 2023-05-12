import React from "react";
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

const EnemyDeck = ({ length }: { length: number }) => {
    return (
        <Flex gap={4} h={"fit-content"} direction={"row"}>
            {Array(length)
                .fill(0)
                .map((el, id) => (
                    <UnoCard key={id} hidden />
                ))}
        </Flex>
    );
};

export default EnemyDeck;
