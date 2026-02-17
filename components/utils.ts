import React from 'react';

/**
 * Prevents non-numeric characters from being entered into a number input.
 * Blocks 'e', 'E', '+', '-' which are technically valid in number inputs but
 * often undesirable for simple financial calculators.
 */
export const preventNonNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
    }
};
