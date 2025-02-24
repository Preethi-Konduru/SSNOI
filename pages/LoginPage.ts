import { Page } from '@playwright/test';
import { authenticator } from 'otplib';
import dotenv from 'dotenv';

// ✅ Load environment variables (TOTP Secret)
dotenv.config();

export class LoginPage {
  private page: Page;
  private username: string;
  private password: string;
  private totpSecret: string;

  constructor(page: Page) {
    this.page = page;
    this.username = process.env.OKTA_USERNAME!;
    this.password = process.env.OKTA_PASSWORD!;
    this.totpSecret = process.env.TOTP_SECRET!;
  }

  async navigateToLogin() {
    console.log('✅ Navigating to Microsoft login page...');
    await this.page.goto(
      'https://login.microsoftonline.com/4da80bb9-7b82-4c4c-9159-deb67172c593/oauth2/authorize?response_type=id_token&client_id=d8067c63-1c65-468c-b4d0-2b1f9d1fd647&redirect_uri=https%3a%2f%2frcs-dna-portal-mcaqa.azurewebsites.net&state=0210bfbf-2886-4d1a-b7c4-81d846860a20&client-request-id=fa01de65-3c83-46bd-af39-9d4a6b62b75f&x-client-SKU=Js&x-client-Ver=1.0.18&nonce=c1c8418e-90dc-4a50-ae61-0f8f4daf9586&sso_nonce=AwABEgEAAAADAOz_BQD0_2bpRk9fPVwX9ibkHyPDf6ZLl4bhC0iEoS-ct0HlAljPTBr53jIA2ySUC1TH47ohilT9n_7eDSxOpyK6pjBMhaAgAA&mscrid=fa01de65-3c83-46bd-af39-9d4a6b62b75f'
    );
  }

  async login() {
    console.log('✅ Entering username...');
    await this.page.getByRole('textbox', { name: 'someone@example.com' }).fill(this.username);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();

    console.log('✅ Entering password...');
    await this.page.getByRole('textbox', { name: 'Password' }).fill(this.password);
    await this.page.getByRole('button', { name: 'Verify' }).click();

    console.log('✅ Selecting Google Authenticator...');
    await this.page.getByRole('link', { name: 'Select Google Authenticator.' }).click();

    // ✅ Generate OTP using `otplib`
    console.log('✅ Generating OTP from Okta Verify...');
    const otpCode = authenticator.generate(this.totpSecret);
    console.log(`🔹 Generated OTP: ${otpCode}`);

    // ✅ Enter OTP
    console.log('✅ Entering OTP...');
    await this.page.getByRole('textbox', { name: 'Enter code' }).fill(otpCode);
    await this.page.getByRole('button', { name: 'Verify' }).click();

    //await this.page.goto('https://rcs-dna-portal-mcaqa.azurewebsites.net/dir/dirLanding');
    console.log('✅ Login successful!');
  }
}
