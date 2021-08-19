/*
 * @param method: string
 * @param url: string
 * @return XMLHttpRequest | XDomainRequest
 **/

const request = (method, url) => {
  let xmlRequest = null;
  if('withCredentials' in xmlRequest) {
    xmlRequest = new XMLHttpRequest();
    xmlRequest.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    xmlRequest = new XDomainRequest();
    xmlRequest.open(method, url);
  }
  return xmlRequest;
}

export {
  request
};