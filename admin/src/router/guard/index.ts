import type { Router } from "vue-router";

function createPermissionGuard(router: Router) {}

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // console.log('to', to);
    // console.log('from', from);
    next();
  })
}