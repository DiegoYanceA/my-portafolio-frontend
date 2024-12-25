import { expect, test } from 'vitest'
import { escapeRegExp } from './RegexUtil.js'

test('Validate that the text "c++" does not produce an error', () => {
    const regex = new RegExp(escapeRegExp("c++"), "gi");
    const validate = regex.exec("Lenguaje c++") != null;
    expect(validate).toBe(true)
})