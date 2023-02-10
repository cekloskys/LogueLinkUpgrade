import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerBlocks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blocks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hour: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlocks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blocks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hour: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Blocks = LazyLoading extends LazyLoadingDisabled ? EagerBlocks : LazyBlocks

export declare const Blocks: (new (init: ModelInit<Blocks>) => Blocks) & {
  copyOf(source: Blocks, mutator: (draft: MutableModel<Blocks>) => MutableModel<Blocks> | void): Blocks;
}

type EagerRooms = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rooms, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly room: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRooms = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rooms, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly room: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Rooms = LazyLoading extends LazyLoadingDisabled ? EagerRooms : LazyRooms

export declare const Rooms: (new (init: ModelInit<Rooms>) => Rooms) & {
  copyOf(source: Rooms, mutator: (draft: MutableModel<Rooms>) => MutableModel<Rooms> | void): Rooms;
}

type EagerTimes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Times, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Times, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly time: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Times = LazyLoading extends LazyLoadingDisabled ? EagerTimes : LazyTimes

export declare const Times: (new (init: ModelInit<Times>) => Times) & {
  copyOf(source: Times, mutator: (draft: MutableModel<Times>) => MutableModel<Times> | void): Times;
}

type EagerDates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDates = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dates, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dates = LazyLoading extends LazyLoadingDisabled ? EagerDates : LazyDates

export declare const Dates: (new (init: ModelInit<Dates>) => Dates) & {
  copyOf(source: Dates, mutator: (draft: MutableModel<Dates>) => MutableModel<Dates> | void): Dates;
}

type EagerReservations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentName: string;
  readonly studentEmail: string;
  readonly date: string;
  readonly startTime: string;
  readonly room: string;
  readonly hrBlock: number;
  readonly nbrParticipants: number;
  readonly course?: string | null;
  readonly teacher?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReservations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentName: string;
  readonly studentEmail: string;
  readonly date: string;
  readonly startTime: string;
  readonly room: string;
  readonly hrBlock: number;
  readonly nbrParticipants: number;
  readonly course?: string | null;
  readonly teacher?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reservations = LazyLoading extends LazyLoadingDisabled ? EagerReservations : LazyReservations

export declare const Reservations: (new (init: ModelInit<Reservations>) => Reservations) & {
  copyOf(source: Reservations, mutator: (draft: MutableModel<Reservations>) => MutableModel<Reservations> | void): Reservations;
}