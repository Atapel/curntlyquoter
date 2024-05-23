"use client"
import {FunctionComponent} from 'react';
import { Button } from 'react-bootstrap';
import Link from "next/link";
import { UseConfigurationReducerContext } from "@context/globalContext";
import { TConfigDB } from "@context/types";
interface IResumeDraftButtonProps {
    configFromDb: TConfigDB
}
function ResumeDraftButton(props:IResumeDraftButtonProps){
    const { state, dispatch } = UseConfigurationReducerContext();
    const loadConfigurationIntoState = (configObject: TConfigDB) => {
        dispatch({ 
            type: 'LOAD_CONFIGURATION_FROM_DB', 
            payload: configObject 
        })
    }
    return (
        <Link href="/configurator">
            <Button
                variant="success"
                onClick={() => { loadConfigurationIntoState(props.configFromDb) }}
            >
                Resume Configuration
            </Button>
        </Link>
    );
}
export default ResumeDraftButton;
