import axios from 'axios';
import { generateRandomString, getRandomInt, getHeaders, getStringBetweenStrings, SearchError } from './utils';

const W_GOOGLE = 'https://www.google.com/';

/**
 * Google image search.
 *
 * @param {string} query - search query
 *
 * @returns {Promise.<{ id: string; url: string; width: number; height: number; color: number;
 * preview: { url: string; width: number; height: number; }, origin: { title: string;
 * website: { name: string; domain: string; url: string; } } }[]>}
 */
export const imageSearch = async (query: string): Promise<{
    id: string; url: string; width: number; height: number; color: number;
    preview: { url: string; width: number; height: number; }; origin: {
        title: string;
        website: { name: string; domain: string; url: string; };
    };
}[]> => {
    const form_data = new URLSearchParams();

    const payload = [
        [
            [
                'HoAMBc',
                JSON.stringify([
                    null, null, [
                        0, null, 2529, 85, 2396,
                        [], [9429, 9520], [194, 194],
                        false, null, null, 9520
                    ],
                    null, null, null, null, null, null, null, null,
                    null, null, null, null, null, null, null, null,
                    null, null, null, null, null, null, null, null,
                    null, [
                        query,
                    ],
                    null, null, null,
                    null, null, null,
                    null, null, [
                        null, 'CAE=', 'GGwgAA=='
                    ], null, true
                ]),
                null, 'generic'
            ]
        ]
    ];

    form_data.append('f.req', JSON.stringify(payload));
    form_data.append('at', `${generateRandomString(29)}:${Date.now()}`);

    console.log(form_data);

    const response = await axios.post(`${W_GOOGLE}_/VisualFrontendUi/data/batchexecute`, form_data, {
        params: {
            'rpcids': 'HoAMBc',
            'source-path': '/search',
            'f.sid': -getRandomInt(0, 9000000000000000000),
            'bl': 'boq_visualfrontendserver_20220505.05_p0',
            'hl': 'en',
            'authuser': 0,
            '_reqid': getRandomInt(1, 50000),
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            crossOriginIsolated: false,
            'access-control-allow-origin': '*',
            ...getHeaders({ mobile: false })
        }
    }).catch((err) => err);
    console.log(response);

    if (response instanceof Error)
        throw new SearchError('Could not execute search', { status_code: (response as any).response?.status || 0, message: response?.message });

    const res = '[null' + (getStringBetweenStrings(response.data, '"[null', ']"') || '') + ']';
    const data = JSON.parse(res.replace(/\\"/g, '"').replace(/\\\\"/g, '\''));

    if (data.length <= 1)
        throw new SearchError('Got unexpected response from BatchExecute API', data);

    if (!data[31])
        throw new SearchError(data[53][1], data[53][2]);

    const items = data[31][0][12][2];

    const results = items.map((item: any) => {
        const image = item[1]?.[3];
        const preview = item[1]?.[2];
        const origin = item[1]?.[9];

        if (image && preview && origin)
            return {
                id: item[1][1],
                url: decodeURIComponent(JSON.parse('"' + image[0].replace(/"/g, '"') + '"')),
                width: image[1],
                height: image[2],
                color: item[1][6],
                preview: {
                    url: decodeURIComponent(JSON.parse('"' + preview[0].replace(/"/g, '"') + '"')),
                    width: preview[1],
                    height: preview[2]
                },
                origin: {
                    title: origin['2008'][1],
                    website: {
                        name: origin['2003'][12],
                        domain: origin['2003'][17],
                        url: origin['2003'][2]
                    }
                }
            }
    }).filter((item: any) => item);

    return results;
}