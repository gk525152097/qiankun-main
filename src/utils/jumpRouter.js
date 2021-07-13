import router from '../router'

export function jumpRouter (path, query) {
  router.push({ path, query })
}
