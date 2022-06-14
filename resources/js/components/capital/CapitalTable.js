import axios from "axios";
import { useState, useEffect } from "react";

export default function CapitalTable() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [ident, setIdent] = useState({});
    useEffect(async () => {
        
    }, []);
  
    if (isLoading) {
        return <div></div>;
    }

    return (
        <div className="container">
        capital list
        </div>
    );
}