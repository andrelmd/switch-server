import { Browser, Page } from 'puppeteer-core';
import { FlowControl } from './enums/flow-control.enum';
import { Speed } from './enums/speed.enum';
import { State } from './enums/state.enum';
import { DeviceInformation } from './types/device-information.type';
import { Frames } from './types/frame.type';
import { PortStatus } from './types/port-status.type';
import { Ports } from './types/port.type';
import { Tab } from './types/tab.type';
export declare class Crawler {
    browser?: Browser;
    page?: Page;
    private constructor();
    static init(): Promise<Crawler>;
    private launchBrowser;
    loginToSwitch(baseUrl: string, username: string, password: string): Promise<void>;
    getSystemInformation(): Promise<DeviceInformation>;
    goToTab(tabName: Tab): Promise<void>;
    changePortStatus(port: Ports, status: State, speed: Speed, flowControl: FlowControl): Promise<void>;
    getPortStatus(): Promise<PortStatus[]>;
    getFrame(frameName: Frames): import("puppeteer-core").Frame;
    writeMainFrameToFile(): Promise<void>;
    waitMs(ms: number): Promise<unknown>;
}
