import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint
  .setProject('66e4b10d000e9dc1bf4c');  // Your Appwrite project ID

export const account = new Account(client);
