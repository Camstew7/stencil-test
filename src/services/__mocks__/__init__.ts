import { TranslationService } from '../translation.service';

/*
* This is as a helpful single import to mock all services
*/
//jest.mock(`${__dirname}/../environment.service`);
jest.mock(`${__dirname}/../manifest-client.service`);

beforeAll(() => {
  TranslationService.setLanguage('en')
});
