import React from "react";
import {
    Header,
    Flex,
    Text,
    Button,
    Modal,
    TextInput,
    Avatar,
    HoverCard,
    Box,
} from "@mantine/core";
import UnoCard from "./UnoCard";
import { Card } from "../scripts/globalInterface";

const ActiveCard = ({ color, value, type }: Card) => {
    return (
        <Flex gap={8}>
            <HoverCard shadow="md">
                <HoverCard.Target>
                    <Box>
                        <UnoCard hidden />
                    </Box>
                </HoverCard.Target>
                <HoverCard.Dropdown bg={"dark.3"}>
                    <Text c={"white"} size={"sm"}>
                        Piocher une carte
                    </Text>
                </HoverCard.Dropdown>
            </HoverCard>

            <UnoCard color={color} number={value} />
        </Flex>
    );
};

export default ActiveCard;
