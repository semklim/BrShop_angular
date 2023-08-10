import { Injectable } from '@angular/core';

export type IpInfoResponse = {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
};

@Injectable({
  providedIn: 'root',
})
export class CheckIpService {
  ipData: IpInfoResponse | null = null;

  constructor() {
    this.checkIp().then((data) => {
      this.ipData = data;
      console.log(data);
    });
  }

  async checkIp() {
    // const ipInfo = await fetch('https://api-bdc.net/data/client-ip').then((response) => response.json());
    const url = `https://ipinfo.io/json?token=240fec7368fc4c`; // this is better.
    try {
      const moreIpData = await fetch(url).then((response) => response.json() as unknown as IpInfoResponse);
      return moreIpData;
    } catch (e: any) {
      console.log(e.message);
      return { error: `Can't fetch data` } as unknown as IpInfoResponse;
    }
  }
}
