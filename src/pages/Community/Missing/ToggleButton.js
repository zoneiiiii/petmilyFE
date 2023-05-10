import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00ff00'
        },
        background: {
            paper: '#fff',
        },
        text: {
            secondary: '#46505A',
        },
        action: {
            active: '#FF8F8F',
        },
    },
});

function ColorToggleButton() {
    const [missing, setMissing] = React.useState('실종');

    const handleChange = (event, newMissing) => {
        setMissing(newMissing);
    };

    return (
        <ThemeProvider theme={theme}>
            <ToggleButtonGroup
                size='large'
                sx={{
                    height: 40,
                    width: 200,
                    marginTop: 1,
                }}
                value={missing}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton
                    value="실종"
                    sx={{
                        backgroundColor: '#FF8F8F',
                        color: 'white',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: '#FF8282',
                        },
                        '&.Mui-selected': {
                            backgroundColor: '#FF4646',
                            color: 'white',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: '#FF8282',
                            }
                        },
                    }} > 실종</ToggleButton>
                <ToggleButton
                    value="완료"
                    sx={{
                        backgroundColor: '#D4D4D4',
                        color: 'white',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: '#BFBFBF',
                        },
                        '&.Mui-selected': {
                            backgroundColor: '#808080',
                            color: 'white',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: '#9C9C9C',
                            }
                        },
                    }}>완료</ToggleButton>
            </ToggleButtonGroup>
        </ThemeProvider >
    );
};

export default ColorToggleButton;