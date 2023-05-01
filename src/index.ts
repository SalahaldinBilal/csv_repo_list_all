import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { listAllCsvFiles } from './helpers';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const files = await listAllCsvFiles();

    return {
      statusCode: 200,
      body: JSON.stringify(files)
    }
  }
  catch (error) {
    return {
      statusCode: 500,
      body: `Unexpected Error Happened: ${error}`
    }
  }
};