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
import { createReservation } from 'apiSdk/reservations';
import { Error } from 'components/error';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { ReservationInterface } from 'interfaces/reservation';

function ReservationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReservationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReservation(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReservationInterface>({
    initialValues: {
      customer_id: '',
      date: new Date(new Date().toDateString()),
      time: new Date(new Date().toDateString()),
      party_size: 0,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: reservationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Reservation
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="customer_id" mb="4" isInvalid={!!formik.errors?.customer_id}>
            <FormLabel>Customer</FormLabel>
            <Input type="text" name="customer_id" value={formik.values?.customer_id} onChange={formik.handleChange} />
            {formik.errors.customer_id && <FormErrorMessage>{formik.errors?.customer_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.date}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>
          <FormControl id="time" mb="4">
            <FormLabel>Time</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.time}
              onChange={(value: Date) => formik.setFieldValue('time', value)}
            />
          </FormControl>
          <FormControl id="party_size" mb="4" isInvalid={!!formik.errors?.party_size}>
            <FormLabel>Party Size</FormLabel>
            <NumberInput
              name="party_size"
              value={formik.values?.party_size}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('party_size', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.party_size && <FormErrorMessage>{formik.errors?.party_size}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.name}
              </option>
            )}
          />
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
  entity: 'reservation',
  operation: AccessOperationEnum.CREATE,
})(ReservationCreatePage);
