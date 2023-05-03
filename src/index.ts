import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import * as dotenv from 'dotenv'
import { getDynamoTables, listAllCsvFiles, response, s3NameToDynamoName } from './helpers';
dotenv.config();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const csvList = await listAllCsvFiles();
    const tableList = await getDynamoTables();

    for (const csv of csvList) {
      if (tableList.includes(s3NameToDynamoName(csv.name)))
        csv.hasDynamoTable = true
    }

    return response(200, JSON.stringify(csvList));
  } catch (error) {
    return response(500, `Unexpected Error Happened: ${error}`);
  }
};