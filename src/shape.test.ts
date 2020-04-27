import { isNumber, isString } from "./core";
import { isArrayOf } from "./array";
import { isPairOf } from "./pair";
import { isEither } from "./either";
import { isShape, testShape } from "./shape";

interface Language {
  name: string;
  nativeName: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Country {
  name: string;
  capital: string;
  latLng: [number, number];
  timeZones: string[];
  currency: Currency;
  languages: Language[];
}

const isLanguage = isShape<Language>({
  name: isString,
  nativeName: isString,
});

const isCurrency = isShape<Currency>({
  code: isString,
  name: isString,
  symbol: isString,
});

const isCountry = isShape<Country>({
  name: isString,
  capital: isString,
  latLng: isPairOf(isNumber, isNumber),
  timeZones: isArrayOf(isString),
  currency: isCurrency,
  languages: isArrayOf(isLanguage),
});

describe("isShape for simple interface", () => {
  test.each([["2"], [2], [() => {}]])("returns false for %p", (value) => {
    expect(isLanguage(value)).toBe(false);
  });

  test("return true for exact match", () => {
    const french = {
      name: "French",
      nativeName: "français",
    };
    expect(isLanguage(french)).toBe(true);
  });

  test("return true for extra properties", () => {
    const french = {
      iso639_1: "fr",
      name: "French",
      nativeName: "français",
    };
    expect(isLanguage(french)).toBe(true);
  });

  test("return false when missing properties", () => {
    const french = {
      name: "French",
    };
    expect(isLanguage(french)).toBe(false);
  });

  test("return false for incorrect property types", () => {
    const robotLanguage = {
      name: "robot",
      nativeName: 42,
    };
    expect(isLanguage(robotLanguage)).toBe(false);
  });
});

describe("isShape for nested interface", () => {
  const france = {
    name: "France",
    capital: "Paris",
    latLng: [46, 2],
    timeZones: ["UTC-10:00", "UTC-09:30", "UTC-09:00"],
    currency: { code: "EUR", name: "Euro", symbol: "€" },
    languages: [
      {
        name: "French",
        nativeName: "français",
      },
    ],
  };

  test("return true for exact match", () => {
    expect(isCountry(france)).toBe(true);
  });

  test("return true for extra properties", () => {
    const franceTest = {
      ...france,
      numericCode: "250",
    };
    expect(isCountry(franceTest)).toBe(true);
  });

  test("return false when missing properties", () => {
    const missingLanguages = {
      name: "France",
      capital: "Paris",
      latLng: [46, 2],
      timeZones: ["UTC-10:00", "UTC-09:30", "UTC-09:00"],
      currency: { code: "EUR", name: "Euro", symbol: "€" },
    };
    expect(isCountry(missingLanguages)).toBe(false);
  });

  test("return false for incorrect property type", () => {
    const latLngStrings = {
      ...france,
      latLng: ["46", "2"],
    };
    expect(isCountry(latLngStrings)).toBe(false);
  });

  test("return false for incorrect nested property type", () => {
    const currencyMissingSymbol = {
      ...france,
      currency: { code: "EUR", name: "Euro" },
    };
    expect(isCountry(currencyMissingSymbol)).toBe(false);

    const languageMissingName = {
      ...france,
      languages: [
        ...france.languages,
        {
          name: "Spanish",
        },
      ],
    };
    expect(isCountry(languageMissingName)).toBe(false);
  });
});

const testLanguage = testShape<Language>({
  name: isString,
  nativeName: isString,
});

const testCurrency = testShape<Currency>({
  code: isString,
  name: isString,
  symbol: isString,
});

const testCountry = testShape<Country>({
  name: isString,
  capital: isString,
  latLng: isPairOf(isNumber, isNumber),
  timeZones: isArrayOf(isString),
  currency: isCurrency,
  languages: isArrayOf(isLanguage),
});

describe("testShape for simple interface", () => {
  test.each([["2"], [2], [() => {}]])("returns false for %p", (value) => {
    expect(testLanguage(value)).toStrictEqual({
      success: false,
      message: "argument is not a plain object",
    });
  });

  test("return success for exact match", () => {
    const french = {
      name: "French",
      nativeName: "français",
    };
    expect(testLanguage(french)).toStrictEqual({
      success: true,
      value: french,
    });
  });

  test("return true for extra properties", () => {
    const french = {
      iso639_1: "fr",
      name: "French",
      nativeName: "français",
    };
    expect(testLanguage(french)).toStrictEqual({
      success: true,
      value: french,
    });
  });

  test("return false when missing properties", () => {
    const french = {
      nativeName: "français",
    };
    expect(testLanguage(french)).toStrictEqual({
      success: false,
      message: "missing property: name",
    });
  });

  test("return false for incorrect property types", () => {
    const robotLanguage = {
      name: "robot",
      nativeName: 42,
    };
    expect(testLanguage(robotLanguage)).toStrictEqual({
      success: false,
      message: "value of property 'nativeName' is not of the expected type.",
    });
  });
});

describe("isShape for nested interface", () => {
  const france = {
    name: "France",
    capital: "Paris",
    latLng: [46, 2],
    timeZones: ["UTC-10:00", "UTC-09:30", "UTC-09:00"],
    currency: { code: "EUR", name: "Euro", symbol: "€" },
    languages: [
      {
        name: "French",
        nativeName: "français",
      },
    ],
  };

  test("return true for exact match", () => {
    expect(testCountry(france)).toStrictEqual({
      success: true,
      value: france,
    });
  });

  test("return true for extra properties", () => {
    const franceTest = {
      ...france,
      numericCode: "250",
    };

    expect(testCountry(france)).toStrictEqual({
      success: true,
      value: france,
    });
  });

  test("return false when missing properties", () => {
    const missingLanguages = {
      name: "France",
      capital: "Paris",
      latLng: [46, 2],
      timeZones: ["UTC-10:00", "UTC-09:30", "UTC-09:00"],
      currency: { code: "EUR", name: "Euro", symbol: "€" },
    };

    expect(testCountry(missingLanguages)).toStrictEqual({
      success: false,
      message: "missing property: languages",
    });
  });

  test("return false for incorrect property type", () => {
    const latLngStrings = {
      ...france,
      latLng: ["46", "2"],
    };

    expect(testCountry(latLngStrings)).toStrictEqual({
      success: false,
      message: "value of property 'latLng' is not of the expected type.",
    });
  });

  test("return false for incorrect nested property type", () => {
    const currencyMissingSymbol = {
      ...france,
      currency: { code: "EUR", name: "Euro" },
    };
    expect(testCountry(currencyMissingSymbol)).toStrictEqual({
      success: false,
      message: "value of property 'currency' is not of the expected type.",
    });

    const languageMissingName = {
      ...france,
      languages: [
        ...france.languages,
        {
          name: "Spanish",
        },
      ],
    };
    expect(testCountry(languageMissingName)).toStrictEqual({
      success: false,
      message: "value of property 'languages' is not of the expected type.",
    });
  });
});

describe("testShape with either", () => {
  interface Cooridnates {
    x: number | string;
    y: number;
  }

  const testCoordinates = testShape<Cooridnates>({
    x: isEither(isNumber, isString),
    y: isNumber,
  });

  test.each([[2], [() => {}]])("returns false for %p", (value) => {
    expect(testCoordinates(value)).toStrictEqual({
      success: false,
      message: "argument is not a plain object",
    });
  });

  test("invalid property type", () => {
    const testCoords = { x: "2", y: "4" };
    expect(testCoordinates(testCoords)).toStrictEqual({
      success: false,
      message: "value of property 'y' is not of the expected type.",
    });
  });

  test.each([[{ x: "2", y: 4 }], [{ x: 2, y: 4 }]])(
    "returns false for %p",
    (value) => {
      expect(testCoordinates(value)).toStrictEqual({
        success: true,
        value,
      });
    }
  );
});
