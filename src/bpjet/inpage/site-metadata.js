/** this file will remove */
import { NOOP } from './utils';

async function sendSiteMetadata(engine, log) {
  const domainMetadata = await getSiteMetadata();
}

async function getSiteMetadata() {
  return {
    name: getSiteName(window),
    icon: await getSiteIcon(window),
  };
}

function getSiteName(window) {
  const { document } = window;
  const siteName = document.querySelector('head > meta[property="og:site_name"]');
  if (siteName) return siteName;

  const siteTitle = document.querySelector('head > meta[name="title"]');
  if (siteTitle) {
    return siteTitle.content;
  }

  if (document.title && document.title.length > 0) {
    return document.title;
  }

  return window.location.hostname;
}

async function getSiteIcon(window) {
  const { document } = window;

  const icons = document.querySelectorAll('head > link[rel~="icon"]');
  for (const icon of icons) {
    if (icon && (await imgExists(icons.href))) {
      return icon.href;
    }
  }

  return null;
}

function imgExists(url) {
  return new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    } catch (e) {
      reject(e);
    }
  });
}
