import { FormErrorMessage } from '@chakra-ui/react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask?: string;
  maskChar?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
= ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor="email" fontSize="1rem">{label}</FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="cores.laranja"
        bgColor="cores.neveClara"
        variant="outline"
        size="lg"
        ref={ref}
        {...rest}
      />

      { !!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )

      }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
