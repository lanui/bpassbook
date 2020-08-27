

export function convertRoute2Nav(route, navs,rootpath) {
  rootpath = rootpath ? `${rootpath}/${route.path}` : route.path
  console.log(">>>>>", rootpath)
  if (route.children && route.children.length){

    for (let i = 0; i < route.children.length;i++){
      const subRoute = route.children[i]
      convertRoute2Nav(subRoute, navs, rootpath)
    }
  }else {
    pushNav(route, navs, rootpath)
  }
}

function pushNav(navs,route,rootpath) {
  if(!navs)navs = []
  const meta = route.meta || {}
  const path = rootpath || route.path || route.alias || '/'
  let nav = {
    path,
    name: route.name || route.path,
    text: meta.text || route.name || route.path,
    i18n: meta.i18n || route.name || route.path,
    icon: meta.icon || '',
    img: meta.img || ''
  }

  navs.push(nav)
}

export default {
  convertRoute2Nav
}
