import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createCommunication } from 'apiSdk/communications';
import { Error } from 'components/error';
import { communicationValidationSchema } from 'validationSchema/communications';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CommunicationInterface } from 'interfaces/communication';

function CommunicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CommunicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCommunication(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CommunicationInterface>({
    initialValues: {
      sender_id: '',
      receiver_id: '',
      message: '',
    },
    validationSchema: communicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Communication
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="sender_id" mb="4" isInvalid={!!formik.errors?.sender_id}>
            <FormLabel>Sender</FormLabel>
            <Input type="text" name="sender_id" value={formik.values?.sender_id} onChange={formik.handleChange} />
            {formik.errors.sender_id && <FormErrorMessage>{formik.errors?.sender_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="receiver_id" mb="4" isInvalid={!!formik.errors?.receiver_id}>
            <FormLabel>Receiver</FormLabel>
            <Input type="text" name="receiver_id" value={formik.values?.receiver_id} onChange={formik.handleChange} />
            {formik.errors.receiver_id && <FormErrorMessage>{formik.errors?.receiver_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="message" mb="4" isInvalid={!!formik.errors?.message}>
            <FormLabel>Message</FormLabel>
            <Input type="text" name="message" value={formik.values?.message} onChange={formik.handleChange} />
            {formik.errors.message && <FormErrorMessage>{formik.errors?.message}</FormErrorMessage>}
          </FormControl>

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'communication',
  operation: AccessOperationEnum.CREATE,
})(CommunicationCreatePage);
