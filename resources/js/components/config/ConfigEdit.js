import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

export default function ConfigEdit() {
    const [config, setConfig] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(async () => {
        await axios.get('/get/config').then(function (response) {
            setConfig(response.data)
            setLoading(false);
        })
    }, []);

    const updateVal = (input) => {
        let setting = [];
        config.map(function (cfg, index) {
            if (input.target.id == cfg.id) {
                setting.push({
                    'id': cfg.id,
                    'setting': cfg.setting,
                    'value': input.target.value
                });
            } else {
                setting.push({
                    'id': cfg.id,
                    'setting': cfg.setting,
                    'value': cfg.value
                });
            }
        })
        setConfig(setting);
    }

    const saveConfig = () => {
        axios.post('/config/edit', {
            config
        }).then((response) => {
            setTimeout(() => {
                location.reload();
            }, 300)
        })
    }

    if (isLoading) {
        return <div></div>;
    }

    const inputProps = {
        step: 1,
        min: 1
      };
      
    const configform = () => {
        return config.map(function (config, index) {
            return (
                <Grid item xs={12}>
                    <TextField
                        id={config.id}
                        type="number"
                        inputProps={inputProps}
                        label={config.setting}
                        defaultValue={config.value}
                        onChange={e=> updateVal(e)}
                    />
                </Grid>
            );
        });
    }
    
    return (
        <Grid container spacing={2}>
            
            <Grid item xs={12}>
                <Typography variant="h5">
                    Edit Configuration
                </Typography>
            </Grid>
                {
                    configform()
                }
            <Grid item xs={12}>
            <Button
                onClick={saveConfig}
                size='large'>
                Submit
            </Button>
            </Grid>
        </Grid>
    )
}