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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getOrderItemById, updateOrderItemById } from 'apiSdk/order-items';
import { Error } from 'components/error';
import { orderItemValidationSchema } from 'validationSchema/order-items';
import { OrderItemInterface } from 'interfaces/order-item';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrderInterface } from 'interfaces/order';
import { MenuItemInterface } from 'interfaces/menu-item';
import { getOrders } from 'apiSdk/orders';
import { getMenuItems } from 'apiSdk/menu-items';

function OrderItemEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrderItemInterface>(
    () => (id ? `/order-items/${id}` : null),
    () => getOrderItemById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrderItemInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrderItemById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrderItemInterface>({
    initialValues: data,
    validationSchema: orderItemValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Order Item
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<OrderInterface>
              formik={formik}
              name={'order_id'}
              label={'Order'}
              placeholder={'Select Order'}
              fetcher={getOrders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.customer_id}
                </option>
              )}
            />
            <AsyncSelect<MenuItemInterface>
              formik={formik}
              name={'menu_item_id'}
              label={'Menu Item'}
              placeholder={'Select Menu Item'}
              fetcher={getMenuItems}
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'order_item',
  operation: AccessOperationEnum.UPDATE,
})(OrderItemEditPage);
