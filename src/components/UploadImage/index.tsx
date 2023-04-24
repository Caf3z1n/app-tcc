import { Box, Icon, Image, useToast } from "@chakra-ui/react";
import { MdOutlineUploadFile } from "react-icons/md";
import React, {Dispatch, useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { api } from "../../services/apiClient";

type UploadImageProps = {
  imagem: any;
  setImagem: Dispatch<any>;
  setIdFoto: Dispatch<any>;
}

export default function UploadImage({ imagem, setImagem, setIdFoto }: UploadImageProps) {
  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles) => {
    setImagem(
      Object.assign(acceptedFiles, {
        preview: window.URL.createObjectURL(new Blob(acceptedFiles, {type: "image/*"}))
      })
    )

    const data = new FormData();
    data.append('file', acceptedFiles[0]);

    try {
      const response = await api.post('/files', data);
      
      setIdFoto(response.data.id)
    }catch(err) {
      toast({
        title: "Erro ao carregar imagem",
        description: "Houve uma falha ao carregar esse tipo de imagem",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }

    
  }, [setImagem, setIdFoto, toast])
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: { 'image/*': ['.jpeg', '.png'] }})

  return (
    <Box cursor="pointer" border="2px" borderStyle="dashed" p={imagem !== null ? "" : '1rem'} borderRadius="100%" borderColor="cores.preto" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        imagem !== null ? (
          <Image src={imagem?.preview} alt="preview" w="7rem" h="7rem" objectFit="cover" borderRadius="50%" />
        ) : (
          <Icon as={MdOutlineUploadFile} mb="-2" fontSize="5rem"  color="cores.preto" />
        )
      }
    </Box>
  )
}
