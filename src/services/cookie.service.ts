class CookieServiceController {
  constructor() {}

  // Literally pulled from https://www.w3schools.com/js/js_cookies.asp
  // for now.
  getCookie(cname: string): string {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  setCookie(cname: string, cvalue: string, exdays: number, domain: string): void {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/;domain=${domain}`;
  }

}

export const CookieService = new CookieServiceController();
