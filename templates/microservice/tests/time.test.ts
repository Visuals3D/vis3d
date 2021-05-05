import { expect } from 'chai';
import { TimeService } from '../src/services/time/time.service';

describe('Time Tests', () => {
    it('Checking Date to UTC String converter', () => {

        const timeService:TimeService = TimeService.Instance;
        expect(timeService.utcStringFromDate(new Date("1995-12-17T03:24:00+02:00")) === '1995-12-17T01:24:00').to.be.true;
    });

    it('Checking is Date String', () => {

        const timeService:TimeService = TimeService.Instance;
        expect(timeService.isDateString("1995-12-17T03:24:00+02:00")).to.be.true;
        expect(timeService.isDateString("1-95-12-17/:24:00X2:00")).to.be.false;
    });
});
