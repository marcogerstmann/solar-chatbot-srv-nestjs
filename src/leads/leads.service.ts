import { Injectable } from '@nestjs/common';
import { Lead } from './model/lead';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

@Injectable()
export class LeadsService {
  async captureToGoogleSpreadsheet(lead: Lead) {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(
      '15mpbPy9UQvnVZkWgXgSBYipHhgUC4uS7kMxZawqNvW8',
      serviceAccountAuth,
    );
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Name: lead.name, Anschrift: lead.address, Telefonnummer: lead.phone });
  }
}
