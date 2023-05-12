import React from "react";
import { Card } from "../scripts/globalInterface";
import { Flex } from "@mantine/core";
import UnoCard from "./UnoCard";

interface PlayerDeckProps {
    deck: Card[];
}

const PlayerDeck = ({ deck }: PlayerDeckProps) => {
    return (
        <>
            <Flex gap={4} h={"fit-content"} direction={"row"}>
                {deck.map((el, id) => (
                    <UnoCard key={id} color={el.color} number={el.value} />
                ))}
            </Flex>
        </>
    );
};

export default PlayerDeck;
