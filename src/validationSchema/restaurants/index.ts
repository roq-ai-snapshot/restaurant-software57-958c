import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { menuValidationSchema } from 'validationSchema/menus';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  feedback: yup.array().of(feedbackValidationSchema),
  menu: yup.array().of(menuValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
});
