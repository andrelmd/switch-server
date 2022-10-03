export declare type PortStatus = {
    port: string;
    status: string;
    speedDuplex: {
        configuration: string;
        actual: string;
    };
    flowControl: {
        configuration: string;
        actual: string;
    };
};
