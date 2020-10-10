import axios from 'axios';
import { toWei } from 'web3-utils';

/**
 * fast,fastest,safeLow,average,
 * result/10=gwei
 */
export const GasStationURL = 'https://ethgasstation.info/json/ethgasAPI.json';
//https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=d25c7ac1e2958f7593af2a32c63c5476f18338d3764bc720e9e7b73c1bc9
const API_KEY = 'd25c7ac1e2958f7593af2a32c63c5476f18338d3764bc720e9e7b73c1bc9';

export const DEF_GAS_LIMIT = 66126;
export const DEF_GAS_PRICE = 20.0;

/**
 * safeLow,standard,fast,fastest
 * unit GWei
 */
export const EtherChainURL = 'https://etherchain.org/api/gasPriceOracle';

export const DEF_TIMEOUT = 10000;

export const getCurrentGas = async ({ gasLimit = DEF_GAS_LIMIT, timeout = DEF_TIMEOUT, tag = '' }) => {
  if (!tag) tag = new Date().getTime();

  let result = {
    tag,
    exact: false,
    gasLimit,
    standard: DEF_GAS_PRICE,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(GasStationURL, { timeout })
      .then((stationResp) => {
        if (stationResp && stationResp.status && stationResp.data && stationResp.data.average) {
          result.standard = stationResp.data.average / 10;
          result.safeLow = stationResp.data.safeLow / 10;
          result.fast = stationResp.data.fast / 10;
          result.fastest = stationResp.data.fastest / 10;

          result.exact = true;
          // minutes
          result.speed = stationResp.data.speed;
          result.standardWait = stationResp.data.avgWait;
          result.safeLowWait = stationResp.data.safeLowWait;
          result.fastWait = stationResp.data.fastWait;
          result.fastestWait = stationResp.data.fastestWait;

          resolve(result);
        } else {
          axios
            .get(EtherChainURL, { timeout })
            .then((ecResp) => {
              if (ecResp && ecResp.status === 200 && ecResp.data && ecResp.data.standard) {
                result.standard = ecResp.data.standard;
                result.safeLow = ecResp.data.safeLow;
                result.fast = ecResp.data.fast;
                result.fastest = ecResp.data.fastest;
                result.exact = false;
                resolve(result);
              } else {
                reject(`fetch ${EtherChainURL}, no data response.`);
              }
            })
            .catch((error) => {
              reject(error.message || `fetch ${EtherChainURL}, fail.`);
            });
        }
      })
      .catch((error) => {
        console.log('>>getCurrentGas >>>>>>GasStationURL>>>>>>', error);
        axios
          .get(EtherChainURL, { timeout })
          .then((ecResp) => {
            if (ecResp && ecResp.status === 200 && ecResp.data && ecResp.data.standard) {
              result.standard = ecResp.data.standard;
              result.safeLow = ecResp.data.safeLow;
              result.fast = ecResp.data.fast;
              result.fastest = ecResp.data.fastest;
              result.exact = false;

              resolve(result);
            } else {
              reject(`fetch ${EtherChainURL}, no data response.`);
            }
          })
          .catch((error) => {
            reject(error.message || `fetch ${EtherChainURL}, fail.`);
          });
      });
  });

  // try{
  //   const stationResp = await axios.get(GasStationURL, { timeout });
  //   if (stationResp && stationResp.status
  //     && stationResp.data && stationResp.data.average){

  //     result.standard = response.data.average / 10
  //     result.safeLow = response.data.safeLow / 10
  //     result.fast = response.data.fast / 10
  //     result.fastest = response.data.fastest / 10

  //     result.exact = true
  //     // minutes
  //     result.speed = response.data.speed
  //     result.standardWait = response.data.avgWait
  //     result.safeLowWait = response.data.safeLowWait
  //     result.fastWait = response.data.fastWait
  //     result.fastestWait = response.data.fastestWait

  //     netok = true
  //   }
  // }catch(error) {
  //   try {
  //     const ecResp = await axios.get(EtherChainURL, { timeout })
  //     if (ecResp && ecResp.status === 200 && ecResp.data && ecResp.data.standard) {
  //       result.standard = response.data.average
  //       result.safeLow = response.data.safeLow
  //       result.fast = response.data.fast
  //       result.fastest = response.data.fastest
  //       result.exact = false

  //       netok = true
  //     }
  //   } catch (err) {

  //   }

  //   if (!netok){
  //     result.error = 'get gas params error,please checkout your network.'
  //     result.standard = DEF_GAS_PRICE
  //   }

  //   return result
  // }

  // return new Promise((resolve,reject) =>{

  //   axios.get(GasStationURL, { timeout})
  //   .then(response =>{
  //     if (response.status == 200 && response.data && response.data.average){
  //       result.standard = response.data.average/10
  //       result.safeLow = response.data.safeLow/10
  //       result.fast = response.data.fast/10
  //       result.fastest = response.data.fastest/10

  //       result.exact = true
  //       // minutes
  //       result.speed = response.data.speed
  //       result.standardWait = response.data.avgWait
  //       result.safeLowWait = response.data.safeLowWait
  //       result.fastWait = response.data.fastWait
  //       result.fastestWait = response.data.fastestWait
  //     }
  //   }).catch(err =>{

  //   })
  // })
};

export const GasStationPersonalUrl = (apiKey) => {
  apiKey = apiKey || API_KEY;
  return ``;
};
