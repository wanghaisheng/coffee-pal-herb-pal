export interface MyCoffees {
  entries: Array<any>;
}

export type CoffeeEntry = ActiveCoffeeEntry | DeletedCoffeeEntry;

export interface ActiveCoffeeEntry {
  id: string;
  name: string;
  origin?: string;
  trader?: string;
  aromas: Array<string>;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeletedCoffeeEntry {
  id: string;
  deletedAt: string;
}

export interface MyCoffeesState extends MyCoffees {
  activeEntries: Array<ActiveCoffeeEntry>;
  isLoading: boolean;
}

export function isActiveCoffeeEntry(
  entry?: ActiveCoffeeEntry | DeletedCoffeeEntry | null,
): entry is ActiveCoffeeEntry {
  return (entry as ActiveCoffeeEntry)?.createdAt !== undefined;
}

export function isDeletedCoffeeEntry(
  entry?: ActiveCoffeeEntry | DeletedCoffeeEntry | null,
): entry is DeletedCoffeeEntry {
  return (entry as DeletedCoffeeEntry)?.deletedAt !== undefined;
}