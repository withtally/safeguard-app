import { FC } from "react";
import { Stack } from "@chakra-ui/react";

// home
import HomeHeader from "modules/home/components/HomeHeader";
import HomeRoles from "modules/home/components/HomeRoles";
import HomeStates from "modules/home/components/HomeStates";
import HomeFailFlow from "modules/home/components/HomeFailFlow";

const Home: FC = () => {
  return (
    <Stack spacing={10}>
      <HomeHeader />
      <HomeFailFlow />
      <HomeRoles />
      <HomeStates />
    </Stack>
  );
};

export default Home;
