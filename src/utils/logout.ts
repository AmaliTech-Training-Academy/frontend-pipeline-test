export const performIdpLogout = (idpLogoutUrl: string) => {
  const logoutWindow = window.open(
    idpLogoutUrl,
    "_blank",
    "width=1,height=1,toolbar=no,menubar=no,scrollbars=no,resizable=no"
  );

  setTimeout(() => {
    if (logoutWindow && !logoutWindow.closed) {
      logoutWindow.close();
    }
  }, 2000);
};
