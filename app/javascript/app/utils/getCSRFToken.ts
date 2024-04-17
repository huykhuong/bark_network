export const getCSRFToken = () => {
  const element = document.querySelector(
    "meta[name=csrf-token]"
  ) as HTMLMetaElement;

  return element.content;
};
