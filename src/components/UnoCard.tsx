import React from "react";
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

const UnoCard = ({
    color,
    number,
    hidden,
}: {
    color?: string;
    number?: number | string;
    hidden?: boolean;
}) => {
    return (
        <Flex
            w={60}
            h={100}
            p={0}
            justify={"center"}
            align={"center"}
            sx={{
                borderRadius: 10,
                border: "1px solid black",
                userSelect: "none",
                "&:hover": {
                    cursor: "pointer",
                    transform: "scale(1.1)",
                    zIndex: 1000,
                },
            }}
        >
            {!hidden ? (
                <Flex
                    justify={"center"}
                    align={"center"}
                    w={"80%"}
                    h={"80%"}
                    bg={color === "wild" ? "dark.7" : color}
                    sx={{
                        borderRadius: 8,
                    }}
                >
                    <Text
                        fz={"xl"}
                        fw={700}
                        c={color === "wild" ? "white" : "black"}
                    >
                        {number}
                    </Text>
                </Flex>
            ) : (
                <Flex
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                    w={"80%"}
                    h={"80%"}
                    bg={"black"}
                    sx={{
                        borderRadius: 8,
                    }}
                >
                    <Text c={"white"} fw={700}>
                        One
                    </Text>
                    <Text c={"white"} fw={700}>
                        Dos
                    </Text>
                    <Text c={"white"} fw={700}>
                        Trois
                    </Text>
                </Flex>
            )}
        </Flex>
    );
};

export default UnoCard;
