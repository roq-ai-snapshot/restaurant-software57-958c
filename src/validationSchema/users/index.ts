import * as yup from 'yup';
import { communicationValidationSchema } from 'validationSchema/communications';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { restaurantValidationSchema } from 'validationSchema/restaurants';

export const userValidationSchema = yup.object().shape({
  roq_user_id: yup.string(),
  tenant_id: yup.string(),
  communication_communication_receiver_idTouser: yup.array().of(communicationValidationSchema),
  communication_communication_sender_idTouser: yup.array().of(communicationValidationSchema),
  feedback: yup.array().of(feedbackValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  restaurant: yup.array().of(restaurantValidationSchema),
});
