import { Breadcrumb, BreadcrumbItem, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import SwitchColorMode from "./SwitchColorMode";
import { FaAngleRight } from "react-icons/fa";

const Navbar = () => {
  return (
    <Flex align="center" justify="space-between">
      <nav>
        <Flex gap={2}>
          <Breadcrumb
            spacing="8px"
            color="gray.400"
            separator={<FaAngleRight />}
          >
            <BreadcrumbItem>
              <NavLink to="/">Appointments</NavLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NavLink to="/patients">Patients</NavLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NavLink to="/doctors">Doctors</NavLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </nav>
      <SwitchColorMode />
    </Flex>
  );
};

export default Navbar;
