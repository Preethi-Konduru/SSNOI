import { configs } from './config';

// Select scenario based on environment variable or use 'default'
const scenario = process.env.TEST_SCENARIO || 'default';
const config = configs[scenario];

console.log(`✅ Running Test Scenario: ${scenario}`);

if (scenario === 'default') {
    console.log('📝 Enter all values and click on apply.');
  } else if (scenario === 'scenario2') {
    console.log(`⚠ WARNING: Start Date is greater than End Date.`);
  }

export { config };
