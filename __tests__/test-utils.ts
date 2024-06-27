import postcss, { AcceptedPlugin } from 'postcss';
import nested from 'postcss-nested';

import { postcssThemed } from '../src/index';
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
  // Create a PostCSS instance using the postcssThemed plugin with the provided options
  const processor = postcss([
    nested as AcceptedPlugin,
    postcssThemed(opts), // Use the updated postcssThemed export
  ]);

  // Process the input CSS
  const result = await processor.process(input, { from: inputPath });
  expect(normalizeResult(result.css)).toEqual(normalizeResult(output));
  expect(result.warnings()).toHaveLength(0);
}
