import React, { Component } from 'react';
import { useState, useEffect } from "react";

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
            console.log(response);
            /*setTimeout(() => {
                location.reload();
            }, 300)*/
        })
    }

    if (isLoading) {
        return <div></div>;
    }

    return (
        <div>
            <h3>Edit Configuration</h3>
            <form>
                {
                    config.map(function (config, index) {
                        return (
                            <div className="form-group col-md-4">
                                <label>{config.setting}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={config.id}
                                    defaultValue={config.value}
                                    onChange={e=> updateVal(e)}
                                />
                            </div>
                        )
                    })
                }
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveConfig}
                >Submit</button>
            </form>
        </div>
    )
}