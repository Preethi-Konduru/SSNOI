import { authenticator } from 'otplib';

// Replace with your actual TOTP Secret
const totpSecret = 'ADRHP2UFCYQ7UUH3';

const otpCode = authenticator.generate(totpSecret);
console.log(`🔹 Playwright Generated OTP: ${otpCode}`);
