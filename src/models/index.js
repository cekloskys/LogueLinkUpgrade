// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Blocks, Rooms, Times, Dates, Reservations } = initSchema(schema);

export {
  Blocks,
  Rooms,
  Times,
  Dates,
  Reservations
};