import {getDateAdjustedForTimezone} from "./utils";

describe("getDateForTimezone", () => {

    test("Returns a Date object adjusted for local time (Seattle)", async () => {
        const date = getDateAdjustedForTimezone(1613260800, -28800);
        expect(date.getHours()).toEqual(16);
        expect(date.getDay()).toEqual(6);
        expect(date.getFullYear()).toEqual(2021);
        expect(date.getMinutes()).toEqual(0);
        expect(date.getSeconds()).toEqual(0);
        expect(date.getMilliseconds()).toEqual(0);
    });

    test("Returns a Date object adjusted for local time (Denver)", async () => {
        const date = getDateAdjustedForTimezone(1613421300, -25200);
        expect(date.getHours()).toEqual(13);
        expect(date.getDay()).toEqual(1);
        expect(date.getFullYear()).toEqual(2021);
        expect(date.getMinutes()).toEqual(35);
        expect(date.getSeconds()).toEqual(0);
        expect(date.getMilliseconds()).toEqual(0);
    });

});
