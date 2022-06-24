import React, { useEffect, useState } from 'react';
import { Flex, Text } from 'rebass';
import { Input } from 'src/atoms';
import { useDebouncedState } from 'src/services/debounced-state';
import { imageSearch } from 'src/services/image-search/search';

export const ImageSearch: React.FC<{}> = () => {
    const [searchTerm, setSearchTerm] = useDebouncedState<string | undefined>(undefined, 1000);
    const [results, setResults] = useState<string[]>([]);
    const [loadingID, setLoadingID] = useState<number>(0);
    useEffect(() => {
        if (!searchTerm) return;

        const taskID = Math.random();
        setLoadingID(taskID);
        console.log('Search!');
        imageSearch(searchTerm).then(searchResults => {
            if (loadingID !== taskID) return;
            setResults(searchResults.map(r => r.url));
        });
    }, [searchTerm]);

    return (
        <Flex flexDirection='column'>
            <Input
                label='Cover image'
                name='imageSearchTerm'
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Flex>
                {results.map(r => (
                    <Text variant='body'>{r}</Text>
                ))}
            </Flex>
        </Flex>
    );
}