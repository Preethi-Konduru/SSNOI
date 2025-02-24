import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { config } from '../configLoader';

test('Automate Okta Login and Dashboard Interaction', async ({ page }) => {
  // ✅ Create instances of LoginPage and DashboardPage
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // ✅ Step 1: Perform Login
  await loginPage.navigateToLogin();
  await loginPage.login();

  // ✅ Step 2: Navigate to Dashboard
  await dashboardPage.navigateToDashboard();
   
  // ✅ Step 3: Select Hierarchy
  await dashboardPage.selectHierarchy();

  // ✅ Step 4: Select Periods
  await dashboardPage.selectPeriods(config.startPeriodOption, config.endPeriodOption);

  // ✅ Step 5: Apply Filters
  await dashboardPage.applyFilters();

  console.log('✅ Test completed successfully!');
});
