// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reservations, Times, User, Blocks, Rooms, Dates } = initSchema(schema);

export {
  Reservations,
  Times,
  User,
  Blocks,
  Rooms,
  Dates
};