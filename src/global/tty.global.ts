/**
 * Checks if the application is running in an interactive terminal (TTY).
 * If false, stdin is redirected (e.g., to a file or pipe).
 */
export const isTTYAvailable = process.stdin.isTTY === true;
