import { Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../../contexts/ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }} {...rest}>
        <Icon as={icon} fontSize="1.5rem" />
        <Text ml="0.5rem" fontWeight="medium" fontSize="1rem">{children}</Text>
    </ChakraLink>
  </ActiveLink>
  )
}