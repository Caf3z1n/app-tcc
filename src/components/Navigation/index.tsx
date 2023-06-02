import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { RiUserFollowLine, RiCheckboxMultipleLine, RiCalendarEventLine, RiVideoChatLine, RiUser3Line, RiUserSettingsLine, RiVideoDownloadLine, RiPictureInPicture2Line, RiLogoutBoxRLine } from 'react-icons/ri'
import { AuthContext, signOut } from '../../contexts/authContext'
import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

type NavigationProps = {
  isOpen: boolean;
  OpenCloseNavigation: () => void
}


export function Navigation({ isOpen, OpenCloseNavigation }: NavigationProps) {
  const { nivel } = useContext(AuthContext);

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={OpenCloseNavigation}>
      <DrawerOverlay>
        <DrawerContent bg="cores.fundo" p="1">
          <DrawerCloseButton mt="6" _focus={{ borderColor: 'none' }} />
          <DrawerHeader color="cores.cinzaEscuro">Navegação</DrawerHeader>
          <DrawerBody>
            <Stack spacing="12" align="flex-start">
              {
                nivel === 0 ? 
                (
                  <>
                    <NavSection title="APROVAR REGISTROS">
                      <NavLink href="/admin/aprovar-palestrante" icon={RiUserFollowLine}>
                        Solicitações de palestrantes
                      </NavLink>
                      <NavLink href="/admin/aprovar-palestras" icon={RiCheckboxMultipleLine}>
                        Solicitações de palestras
                      </NavLink>
                    </NavSection>
                    <NavSection title="GERENCIAL">
                      <NavLink href="/admin/usuarios" icon={RiUser3Line}>
                        Usuários
                      </NavLink>
                      <NavLink href="/admin/eventos" icon={RiCalendarEventLine}>
                        Eventos
                      </NavLink>
                      <NavLink href="/admin/palestras" icon={RiVideoChatLine}>
                        Palestras
                      </NavLink>
                    </NavSection>
                  </>
                ) : nivel === 1 ?
                (
                  <>
                    <NavSection title="PALESTRANTE">
                      <NavLink href="/palestrante/minhas-palestras" icon={RiVideoChatLine}>
                        Minhas palestras
                      </NavLink>
                    </NavSection>

                    <NavSection title="ESPECTADOR">
                      <NavLink href="/espectador/inscrever-se-palestras" icon={RiVideoDownloadLine}>
                        Inscrever-se em palestras
                      </NavLink>
                      <NavLink href="/espectador/palestras-inscritas" icon={RiPictureInPicture2Line}>
                        Minhas palestras inscritas
                      </NavLink>
                    </NavSection>
                  </>
                ) : (
                  <>
                    <NavSection title="ESPECTADOR">
                      <NavLink href="/espectador/inscrever-se-palestras" icon={RiVideoDownloadLine}>
                        Inscrever-se em palestras 
                      </NavLink>
                      <NavLink href="/espectador/palestras-inscritas" icon={RiPictureInPicture2Line}>
                        Minhas palestras inscritas
                      </NavLink>
                    </NavSection>
                  </>
                )
              }
              <NavSection title="PERFIL"> 
                <NavLink href="/meu-perfil" icon={RiUserSettingsLine}>
                  Meu perfil
                </NavLink>
                <Flex alignItems="center" cursor="pointer" onClick={signOut}>
                  <Icon color="red.300" fontSize="1.5rem" as={RiLogoutBoxRLine} mr="0.5rem" />
                  <Text color="red.300" fontWeight="medium" >
                    Deslogar
                  </Text>
                </Flex>
              </NavSection>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
