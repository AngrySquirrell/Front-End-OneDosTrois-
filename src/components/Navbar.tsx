import {
    Header,
    Flex,
    Text,
    Button,
    Modal,
    TextInput,
    Avatar,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import pb, { getUrl } from "../scripts/pocketbase";
import { useForm } from "@mantine/form";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { BaseAuthStore } from "pocketbase";
import { socket } from "../scripts/globalVariable";

interface NavbarProps {
    auth: BaseAuthStore;
}

const Navbar = ({ auth }: NavbarProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [id, setID] = useLocalStorage({
        key: "UDT_id",
        defaultValue: `${crypto.getRandomValues(new Uint32Array(1))[0]}`,
    });

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });

    const handleAuth: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        let payload = {
            email: form.values.email,
            password: form.values.password,
        };
        try {
            const res = await pb
                .collection("users")
                .authWithPassword(payload.email, payload.password);
            setID(res.record.id);
            close();
        } catch (err) {
            notifications.show({
                title: "Erreur",
                message: "Email ou mot de passe incorrect",
                autoClose: 5000,
                withCloseButton: true,
                color: "red",
            });
        }
    };

    return (
        <>
            <Header height={64} fixed>
                <Flex
                    w={"100%"}
                    h={"100%"}
                    justify={"space-around"}
                    align={"center"}
                >
                    <Text ta={"center"} fz={"xl"} fw={700}>
                        OneDosTrois
                    </Text>
                    {!auth.isValid ? (
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "blue.6",
                                to: "orange.8",
                                deg: 120,
                            }}
                            onClick={open}
                        >
                            Se connecter
                        </Button>
                    ) : (
                        <Flex gap={8} align={"center"}>
                            <Avatar
                                src={getUrl(auth.model, auth.model?.avatar)}
                            />
                            <Text> {auth.model?.username}</Text>
                            <Button
                                variant="light"
                                color="red"
                                compact
                                onClick={() => pb.authStore.clear()}
                            >
                                X
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Header>
            <Modal
                centered
                opened={opened}
                onClose={close}
                title={"Se connecter"}
            >
                <form onSubmit={handleAuth}>
                    <TextInput
                        withAsterisk
                        label={"Email"}
                        placeholder="your@email.com"
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label={"Mot de passe"}
                        placeholder="123456789"
                        {...form.getInputProps("password")}
                        type="password"
                    />
                    <Button
                        disabled={!(form.values.email && form.values.password)}
                        mt={8}
                        type="submit"
                    >
                        Envoyer
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default Navbar;
