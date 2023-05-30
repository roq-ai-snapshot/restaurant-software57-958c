import { OrderItemInterface } from 'interfaces/order-item';
import { MenuInterface } from 'interfaces/menu';

export interface MenuItemInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  menu_id: string;
  order_item?: OrderItemInterface[];
  menu?: MenuInterface;
  _count?: {
    order_item?: number;
  };
}
