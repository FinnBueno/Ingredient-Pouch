import UserAgent from 'user-agents';

export class SearchError extends Error {
    date: Date;
    info: any;
    constructor(message: string, info: any) {
        super(message);

        info && (this.info = info);

        this.date = new Date();
    }
}

/**
 * Returns headers with a random user agent.
 *
 * @param {boolean} is_mobile 
 * @returns {string}
 */
export function getHeaders(options = { mobile: false }) {
    return {
        'accept': 'text/html',
        'accept-encoding': 'gzip, deflate',
        'accept-language': 'en-US,en',
        'referer': 'https://www.google.com/',
        'upgrade-insecure-requests': 1,
        'user-agent': options.mobile && new UserAgent(/Android/).toString() || new UserAgent({ deviceCategory: 'desktop' }).toString()
    };
}

/**
 * Refines the html.
 *
 * @param {string} data - Raw html data.
 * @returns {string}
 */
export function refineData(data: any) {
    return data
        // Removes classes we don't need: 
        .replace(/N6jJud MUxGbd lyLwlc/g, '')
        .replace(/YjtGef ExmHv MUxGbd/g, '')
        .replace(/MUxGbd lyLwlc aLF0Z/g, '')

        // Descriptions: -> MUxGbd yDYNvb 
        .replace(/yDYNvb lEBKkf/g, 'yDYNvb')
        .replace(/VwiC3b MUxGbd yDYNvb/g, 'MUxGbd yDYNvb')

        // Urls: -> C8nzq BmP5tf 
        .replace(/cz3goc BmP5tf/g, 'C8nzq BmP5tf')

        // Titles: -> yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe 
        .replace(/yUTMj MBeuO ynAwRc PpBGzd YcUVQe/g, 'yUTMj MBeuO ynAwRc gsrt PpBGzd YcUVQe')
        .replace(/oewGkc LeUQr/g, 'PpBGzd YcUVQe')
        .replace(/q8U8x MBeuO/g, 'yUTMj MBeuO')
        .replace(/ynAwRc PpBGzd/g, 'ynAwRc gsrt PpBGzd');
}

/**
 * Gets a string between two delimiters.
 *
 * @param {string} data - The data.
 * @param {string} start_string - Start string.
 * @param {string} end_string - End string.
 * 
 * @returns {string}
 */
export function getStringBetweenStrings(data: any, start_string: string, end_string: string) {
    const regex = new RegExp(`${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`, 's');
    const match = data.match(regex);
    return match ? match[1] : undefined;
}

export function escapeStringRegexp(txt: string) {
    return txt.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}


/**
 * Generates a random string with a given length.
 * 
 * @param {number} length
 * @returns {string}
 */
export function generateRandomString(length: number) {
    const result = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    for (let i = 0; i < length; i++) {
        result.push(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
    }

    return result.join('');
}

/**
 * Gets a random integer between two values.
 * 
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
