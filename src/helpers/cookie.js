const CookieHelper = {
  setCookie: function (name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const sameSite = "SameSite=Lax"; // Adjust as needed
    // eslint-disable-next-line no-restricted-globals
    const secure = location.hostname !== "localhost" ? "Secure;" : ""; // Only use Secure on non-localhost
    document.cookie = `${name}=${value};${expires};path=/;${secure}${sameSite}`;
  },

  getCookie: function (name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

    for (let cookie of cookies) {
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  },

  removeCookie: function (name) {
    this.setCookie(name, "", -1);
  },
};

export default CookieHelper;
