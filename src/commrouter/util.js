

export const routes2navs = (routes) => {
  if (!routes || !routes.length) return []
  let _routes = Object.assign([], routes)

  _routes = _recursiveDel(_routes, '', null)

  return _expending(_routes,[])

  function _recursiveDel(rs, rootpath, parent) {
    rs = rs.filter(r => !r.navhide).map(r => {
      r = Object.assign({}, r)
      let fullpath = rootpath ? (rootpath === '/' ? `${rootpath}${r.path}` : `${rootpath}/${r.path}`) : r.path
      r.path = fullpath

      delete r.component

      let breadcrumbs = []
      if (parent && parent.breadcrumbs) breadcrumbs = [...parent.breadcrumbs]
      r.breadcrumbs = breadcrumbs

      if (r.meta) {
        if (r.meta.sort !== undefined) r.sort = r.meta.sort
        if (r.meta.icon) r.icon = r.meta.icon
        if (r.meta.i18n) {
          r.i18n = r.meta.i18n
          r.breadcrumbs.push(Object.assign({ i18n: r.i18n, path: fullpath}))
        }
        if (r.meta.text) r.text = r.meta.text

        delete r.meta
      }

      if (r.children && r.children.length) {
        r.children = _recursiveDel(r.children, r.path, r)
      }

      return r
    })

    return rs
  }

  function _expending(rs, arr) {
    rs.map(r => {
      if (!r.children) {
        arr.push(Object.assign({}, r))
      } else {
        _expending(r.children, arr)
      }
    })

    return arr.filter(n => n.name !== 'home.index' ).sort((n1, n2) => {
      if (n1.sort < n2.sort) { return -1 } else {
        return 1
      }
    })
  }
}



export default {

}
