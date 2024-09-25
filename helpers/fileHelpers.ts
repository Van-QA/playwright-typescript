import * as fs from 'fs';
import * as path from 'path';

// Reusable function to write key-value pairs to the .env file
export function writeToEnvFile(key: string, value: string) {
  // Define the path to your .env file
  const envFilePath = path.resolve(process.cwd(), '.env');

  // Read the current .env file content
  let envContent = '';
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf-8');
  }

  // Check if the key already exists
  const keyRegex = new RegExp(`^${key}=.*`, 'm');
  if (keyRegex.test(envContent)) {
    // Replace the existing key-value pair
    envContent = envContent.replace(keyRegex, `${key}=${value}`);
  } else {
    // Append new key-value pair
    envContent += `${key}=${value}\n`;
  }

  // Write the updated content back to the .env file
  fs.writeFileSync(envFilePath, envContent.trim(), 'utf-8');
}
