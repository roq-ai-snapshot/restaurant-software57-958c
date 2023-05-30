import * as yup from 'yup';
import { menuItemValidationSchema } from 'validationSchema/menu-items';

export const menuValidationSchema = yup.object().shape({
  restaurant_id: yup.string().nullable().required(),
  menu_item: yup.array().of(menuItemValidationSchema),
});
