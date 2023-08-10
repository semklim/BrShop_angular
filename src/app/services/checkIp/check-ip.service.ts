import { Injectable } from '@angular/core';

export type CheckIpResponse = {
  ipNumeric: number;
  isBehindProxy: boolean;
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  continent: string;
  continentCode: string;
};

type ApiBdcResponse = {
  ipString: string;
  ipNumeric: number;
  ipType: string;
  isBehindProxy: boolean;
};

type FreeIpApiResponse = {
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  continent: string;
  continentCode: string;
};

@Injectable({
  providedIn: 'root',
})
export class CheckIpService {
  ipData: Promise<CheckIpResponse>;

  constructor() {
    this.ipData = this.checkIp();
  }

  async checkIp() {
    const ipInfo = await fetch('https://api-bdc.net/data/client-ip').then(
      (response) => response.json() as unknown as ApiBdcResponse,
    );
    const url = `https://freeipapi.com/api/json/${ipInfo.ipString}`;
    const moreIpData = await fetch(url).then((response) => response.json() as unknown as FreeIpApiResponse);
    const result: CheckIpResponse = {
      ...moreIpData,
      isBehindProxy: ipInfo.isBehindProxy,
      ipNumeric: ipInfo.ipNumeric,
    };
    return result;
  }
}
