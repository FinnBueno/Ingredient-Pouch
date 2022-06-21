import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useIngredients } from 'src/services/database/ingredients';
import { Ingredient } from 'src/services/database/types';

type IngredientSelectorProps = {
    onSelect: (_: Ingredient) => void;
    name: string;
    label: string;
};

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
    onSelect,
    label,
    name,
}) => {
    const { items: ingredients } = useIngredients();
    return (
        <Autocomplete
            disablePortal
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            // getOptionLabel={}
            options={ingredients.map(i => i.name)}
            renderInput={
                params => (
                    <TextField {...params} label={label} name={name} />
                )
            }
        />
    );
}