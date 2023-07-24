import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { SyntaxProblems } from '@idl/parsing/problem-codes';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Detects invalid return statements in functions (no val)`, () => {
  it(`[auto generated] ok`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [`function myfunc`, `  compile_opt idl2`, `  return,1`, `end`];

    // extract tokens
    const tokenized = await index.getParsedProCode('not-real', code, {
      postProcess: true,
    });

    // define expected tokens
    const expected: SyntaxProblems = [];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expected);
  });

  it(`[auto generated] bad`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [`function myfunc`, `  compile_opt idl2`, `  return`, `end`];

    // extract tokens
    const tokenized = await index.getParsedProCode('not-real', code, {
      postProcess: true,
    });

    // define expected tokens
    const expected: SyntaxProblems = [
      {
        code: 22,
        info: 'In function definitions, the "return" procedure must have one (and only one) value',
        start: [2, 2, 6],
        end: [2, 8, 0],
      },
    ];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expected);
  });

  it(`[auto generated] bad in objects`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [
      `function myfunc::method`,
      `  compile_opt idl2`,
      `  return`,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('not-real', code, {
      postProcess: true,
    });

    // define expected tokens
    const expected: SyntaxProblems = [
      {
        code: 22,
        info: 'In function definitions, the "return" procedure must have one (and only one) value',
        start: [2, 2, 6],
        end: [2, 8, 0],
      },
    ];

    // verify results
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expected);
  });
});
