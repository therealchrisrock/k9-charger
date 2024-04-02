import { useFieldExtension, Wrapper } from "@graphcms/app-sdk-react";
import {Box, Button, Flex, Grid, Inline, Input} from "@hygraph/baukasten";
import {useEffect, useState} from "react";
import {typeGuard} from "../@types/app";

type PositionProps = {
    rows: number;
    columns: number
    selected: number
}
function FieldElement() {
    const { value, onChange, extension, field, model, ...props } = useFieldExtension();
    console.log(field, model)
    const {fieldConfig} = extension
    const init: Omit<PositionProps, 'selected'> = {
        rows: typeGuard(fieldConfig.ROWS, 'number') ? fieldConfig.ROWS : 3,
        columns: typeGuard(fieldConfig.COLUMNS, 'number') ? fieldConfig.COLUMNS : 3

    }
    const [localValue, setLocalValue] = useState<PositionProps>(value || {
        rows: init.rows,
        columns: init.columns,
        selected: Math.floor(init.rows*init.columns/2)
    });

    useEffect(() => {
        onChange(localValue);
    }, [localValue, onChange]);

    return (
        <Grid gridTemplateColumns={`repeat(${localValue.columns}, 1fr)`} gap="8">
            {[...new Array(localValue.rows*localValue.columns)].map((_, idx) => (
                <Button
                    key={idx}
                    onClick={() => setLocalValue({...localValue, selected: idx})}
                    variant={localValue.selected === idx ? 'solid' : 'outline'}
                     ></Button>
            ))}

        </Grid>
    );
}

export default function Field() {
    return (
        <Wrapper>
            <FieldElement />
        </Wrapper>
    );
}
