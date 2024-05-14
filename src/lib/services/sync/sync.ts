import type { ActiveJournalEntry, DeletedJournalEntry, JournalEntry } from '$lib/models/journal';
import type { ActiveCoffeeEntry, CoffeeEntry, DeletedCoffeeEntry } from '$lib/models/myCoffees';
import type { Connection, SyncClient, SyncResult } from '$lib/models/sync';
import { onlineStore } from 'svelte-legos';
import { NextcloudSyncClient } from './nextcloud';
import { get } from 'svelte/store';
import { syncStore } from '$lib/stores/sync';
import { syncStateStore } from '$lib/stores/syncState';
import { journalStore } from '$lib/stores/journal';
import { myCoffeesStore } from '$lib/stores/myCoffees';
import { clearScheduledSync } from '../scheduler/syncScheduler';

const isOnline = onlineStore();

export async function sync(): Promise<void> {
  const sync = get(syncStore);
  if (!sync.connection) {
    return;
  }

  if (!get(isOnline)) {
    return;
  }

  clearScheduledSync();

  syncStateStore.setIsSynchronizing(true);

  const journalEntries = await journalStore.loadAll();
  const coffeeEntries = await myCoffeesStore.loadAll();

  try {
    const journalSync = syncJournal(sync.connection, journalEntries);
    const myCoffeesSync = syncMyCoffees(sync.connection, coffeeEntries);

    const [journalSyncResult, myCoffeesSyncResult] = await Promise.allSettled([
      journalSync,
      myCoffeesSync,
    ]);

    if (journalSyncResult.status === 'fulfilled') {
      journalStore.apply(journalSyncResult.value);
    }

    if (myCoffeesSyncResult.status === 'fulfilled') {
      myCoffeesStore.apply(myCoffeesSyncResult.value);
    }

    syncStore.updateLastSync();
  } finally {
    syncStateStore.setIsSynchronizing(false);
  }
}

async function syncJournal(
  connection: Connection,
  entries: Array<JournalEntry>,
): Promise<SyncResult<ActiveJournalEntry, DeletedJournalEntry>> {
  const client = await initSyncClient(connection);
  return await client.sync<ActiveJournalEntry, DeletedJournalEntry>({ entries }, 'journal');
}

async function syncMyCoffees(
  connection: Connection,
  entries: Array<CoffeeEntry>,
): Promise<SyncResult<ActiveCoffeeEntry, DeletedCoffeeEntry>> {
  const client = await initSyncClient(connection);
  return await client.sync<ActiveCoffeeEntry, DeletedCoffeeEntry>({ entries }, 'my-coffees');
}

async function initSyncClient(connection: Connection): Promise<SyncClient> {
  switch (connection.server.provider) {
    case 'nextcloud': {
      const client = new NextcloudSyncClient(connection);
      await client.init();
      return client;
    }
  }
}
