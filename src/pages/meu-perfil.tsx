import { Button } from "@chakra-ui/react";
import Header from "../components/Header";
import { signOut } from "../contexts/authContext";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function MeuPerfil() {
  return (
    <>
      <Header />
      <Button onClick={signOut} />
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
