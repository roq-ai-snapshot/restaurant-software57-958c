import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReservationInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  date: Date;
  time: Date;
  party_size: number;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
