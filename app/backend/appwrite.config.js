import { Client, Account, Databases, ID} from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const client = new Client()
    .setEndpoint(endpoint) // Your API Endpoint
    .setProject(projectID); // Your project ID

const account = new Account(client);
const databases = new Databases(client);


export { client, account, databases, ID };
