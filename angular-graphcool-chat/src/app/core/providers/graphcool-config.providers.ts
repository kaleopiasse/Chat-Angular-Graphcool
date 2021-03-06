import { InjectionToken } from "../../../../node_modules/@angular/core";

const graphcoolId = 'cjj6jf08v3ge90110gl99q67s';

export interface GraphcoolConfig{
    simpleAPI: string;
    subscriptionAPI: string;
    fileAPI: string;
    fileDownloadURL: string;
};

export const graphcoolConfig: GraphcoolConfig = {
    simpleAPI:`https://api.graph.cool/simple/v1/${graphcoolId}`,
    subscriptionAPI:`wss://subscriptions.graph.cool/v1/${graphcoolId}`,
    fileAPI:`https://api.graph.cool/file/v1/${graphcoolId}`,
    fileDownloadURL:`https://files.graph.cool/${graphcoolId}`
};

export const GRAPHCOOL_CONFIG = new InjectionToken<GraphcoolConfig>(
    'graphcool.config',
    {
        providedIn: 'root',
        factory: () => {
            return graphcoolConfig;
        }
    }
);