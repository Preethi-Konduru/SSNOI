import { Page } from '@playwright/test';
import { config } from '../configLoader';


export class DashboardPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToDashboard() {
    console.log('✅ Selecting DIR System...');
    await this.page.getByRole('combobox', { name: 'DIR System' }).locator('div').nth(3).click();
    await this.page.getByText(config.dirSystemOption).click();
    await this.page.waitForTimeout(30000);
    console.log('✅ Effective Share option selected.');
  }

  async selectHierarchy() {
    console.log('✅ Selecting Hierarchy...');
    await this.page.locator('div').filter({ hasText: /^Select Hierarchy$/ }).nth(2).click();
    await this.page.getByRole('combobox', { name: 'Select Hierarchy' }).fill(config.hierarchyFilter);
    await this.page.getByText(config.hierarchyOption).click();
    console.log('✅ Hierarchy option selected.');
  }

  async selectedPeriod() {
    console.log('✅ Selecting Ownership Calculation Period...');
    await this.page.locator('#ownershipCalcSelectedPeriodSelect0').click();
    await this.page.locator('div').filter({ hasText: /^Selected Period$/ }).nth(2).click();
    await this.page.getByRole('textbox', { name: 'Filter Search' }).fill(config.selectedPeriodFilter);
    await this.page.getByText(config.selectedPeriodOption).click();
  }

  async selectPeriods(startPeriod: string, endPeriod: string) {
    console.log('✅ Selecting Start Period...');
    await this.page.locator('div').filter({ hasText: /^Start Period$/ }).nth(2).click();
    
    // ✅ Enter Start Period filter search field inside Start Period dropdown
    await this.page.getByRole('listbox', { name: 'Start Period' })
      .getByPlaceholder('Filter Search')
      .fill(config.startPeriodFilter);
    
    // ✅ Click on the first matching Start Period option
    await this.page.getByRole('listbox', { name: 'Start Period' })
      .locator('span').filter({ hasText: startPeriod }).nth(0).click();

    console.log('✅ Selecting End Period...');
    await this.page.locator('div').filter({ hasText: /^End Period$/ }).nth(2).click();
    
    // ✅ Enter End Period filter search field inside End Period dropdown
    await this.page.getByRole('listbox', { name: 'End Period' })
      .getByPlaceholder('Filter Search')
      .fill(config.endPeriodFilter);
    
    // ✅ Click on the first matching End Period option
    await this.page.getByRole('listbox', { name: 'End Period' })
      .locator('span').filter({ hasText: endPeriod }).nth(0).click();
  }

async applyFilters() {
    console.log('✅Apply Filters...');
    await this.page.getByRole('tablist').click();
    await this.page.getByRole('button', { name: 'Apply' }).click();
  }
}