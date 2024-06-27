import postcss, { AcceptedPlugin } from 'postcss';
import nested from 'postcss-nested';

import plugin from '../src/index';
import { PostcssThemeOptions } from '../src/types';

export function normalizeResult(input: string) {
  return input
    .split('\n')
    .map((tok) => tok.trim())
    .join('');
}

export async function run(
  input: string,
  output: string,
  opts: PostcssThemeOptions,
  inputPath?: string
) {
  // Process the input CSS
  const result = await postcss([
    nested as AcceptedPlugin,
    plugin(opts),
  ]).process(input, { from: inputPath });
  expect(normalizeResult(result.css)).toEqual(normalizeResult(output));
  expect(result.warnings()).toHaveLength(0);
}
