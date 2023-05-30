import { CommunicationInterface } from 'interfaces/communication';
import { FeedbackInterface } from 'interfaces/feedback';
import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface UserInterface {
  id?: string;
  roq_user_id?: string;
  tenant_id?: string;
  communication_communication_receiver_idTouser?: CommunicationInterface[];
  communication_communication_sender_idTouser?: CommunicationInterface[];
  feedback?: FeedbackInterface[];
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  restaurant?: RestaurantInterface[];

  _count?: {
    communication_communication_receiver_idTouser?: number;
    communication_communication_sender_idTouser?: number;
    feedback?: number;
    order?: number;
    reservation?: number;
    restaurant?: number;
  };
}
