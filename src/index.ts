import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { listAllCsvFiles, response } from './helpers';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    return response(200, JSON.stringify(await listAllCsvFiles()));
  }
  catch (error) {
    return response(500, `Unexpected Error Happened: ${error}`);
  }
};