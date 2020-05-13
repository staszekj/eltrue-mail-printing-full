import {mocked} from 'ts-jest/utils'
import {PORT} from '../server'

jest.mock('../server', () => {
    return {
        PORT: 2000
    }
});

describe("Test", () => {
    it('should be', () => {
        expect(PORT).toBe(2000)
    });
});
