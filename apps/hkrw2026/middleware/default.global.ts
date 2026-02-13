export default defineNuxtRouteMiddleware((to, from) => {
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.path === '/event/520') {
      return navigateTo('/event/523')
    }
    if(to.path === '/category/Paper_Cutting_and_Chinese_Knotting') {
      return navigateTo('/page/Paper_Cutting_and_Chinese_Knotting')
    }
  })