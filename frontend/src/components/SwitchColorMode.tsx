import { Flex, Switch, useColorMode } from "@chakra-ui/react";

const SwitchColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center" gap={2}>
      <Switch onChange={toggleColorMode} colorScheme="green" />
      {colorMode === "light" ? "Dark" : "Light"} <span>Mode</span>
    </Flex>
  );
};

export default SwitchColorMode;
