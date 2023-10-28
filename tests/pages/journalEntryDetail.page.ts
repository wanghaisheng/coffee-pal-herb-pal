import type { Locator, Page } from '@playwright/test';

export class JournalEntryDetailPage {
  constructor(private readonly page: Page) {}

  get header(): Locator {
    return this.page.getByRole('heading', { name: 'Journal Entry' });
  }

  get methodInput(): Locator {
    return this.page.getByPlaceholder('Brew method');
  }

  get coffeeTypeInput(): Locator {
    return this.page.getByLabel('Type of coffee');
  }

  get waterInput(): Locator {
    return this.page.getByLabel('Amount of water');
  }

  get coffeeInput(): Locator {
    return this.page.getByLabel('Amount of coffee');
  }

  get waterTemperatureInput(): Locator {
    return this.page.getByLabel('Water temperature');
  }

  get grindSettingsInput(): Locator {
    return this.page.getByLabel('Grind settings');
  }

  get descriptionInput(): Locator {
    return this.page.getByLabel('Description');
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async clickCopyButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Copy' }).click();
  }

  async clickDeleteButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete' }).click();
  }

  async clickCloseButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }
}
