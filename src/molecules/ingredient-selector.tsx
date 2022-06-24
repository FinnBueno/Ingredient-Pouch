import React, { useState } from 'react';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { useIngredients } from 'src/services/database/ingredients';
import { Ingredient } from 'src/services/database/types';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'src/atoms/modal';
import { NewIngredientForm } from 'src/pages/ingredients/forms/new-ingredient';
import { Flex } from 'rebass';
import _ from 'lodash';

type IngredientSelectorProps = {
    onSelect: (_: Ingredient) => void;
    name: string;
};

type IngredientSuggestion = {
    name: string;
    inputValue: string;
}

const filter = createFilterOptions<Ingredient | IngredientSuggestion>();

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
    onSelect,
    name,
}) => {
    const [modalOpen, setModalOpen] = useState<string | undefined>(undefined);
    const { items: ingredients } = useIngredients();
    const [lastEnter, setLastEnter] = useState(0);
    return (
        <>
            <Modal isOpen={!!modalOpen} onBgClick={() => setModalOpen(undefined)}>
                <Flex p={3}>
                    <NewIngredientForm name={modalOpen} onSubmit={ingredient => {
                        setModalOpen(undefined);
                        onSelect(ingredient);
                    }} />
                </Flex>
            </Modal>
            <Autocomplete
                key={lastEnter}
                disablePortal
                freeSolo
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                clearIcon={
                    <FaTrash size={20} />
                }
                options={ingredients as (Ingredient | IngredientSuggestion)[]}
                getOptionLabel={option => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    return (option as (IngredientSuggestion | Ingredient)).name;
                }}
                renderInput={
                    params => (
                        <TextField {...params} name={name} />
                    )
                }
                onChange={(_event, newValue) => {
                    if (!newValue) return;
                    if (typeof newValue === 'string') {
                        setModalOpen(newValue);
                    } else if ((newValue as any).inputValue) {
                        setModalOpen((newValue as any).inputValue);
                    } else {
                        onSelect(newValue as Ingredient);
                    }
                    setLastEnter(_.now());
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            name: `Add '${params.inputValue}'`,
                            inputValue: params.inputValue,
                        });
                    }

                    return filtered;
                }}
            />
        </>
    );
}