import type { CustomRequest } from "./http/custom-request.ts";
import type { CustomResponse } from "./http/custom-response.ts";

type Handler = (req: CustomRequest, res: CustomResponse) => Promise<void> | void;

export class Router {
  routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
    HEAD: {}
  } as any;
  get(route: string, handler: Handler) {
    this.routes["GET"][route] = handler;
  };
  post(route: string, handler: Handler) {
    this.routes["POST"][route] = handler;
  };
  put(route: string, handler: Handler) {
    this.routes["PUT"][route] = handler;
  };
  delete(route: string, handler: Handler) {
    this.routes["DELETE"][route] = handler;
  };
  head(route: string, handler: Handler) {
    this.routes["HEAD"][route] = handler;
  };
  find(method: string, pathname: string) {
    const routesByMethod = this.routes[method];
    if(!routesByMethod) return null;

    const matchedRoute = routesByMethod[pathname];
    if(matchedRoute) return { route: matchedRoute, params: {} };

    const pathnameParts = pathname.split("/").filter(Boolean);

    for(const route of Object.keys(routesByMethod)) {
      if(!route.includes(":")) continue;

      const routeParts = route.split("/").filter(Boolean);
      if(routeParts.length !== pathnameParts.length) continue;
      if(pathnameParts[0] !== routeParts[0]) continue;

      const params: Record<string, string> = {};
      let ok = true;

      for(let index = 0; index < pathnameParts.length; index++) {
        const segment = routeParts[index];
        const value = pathnameParts[index];
        if(segment.startsWith(":")) {
          params[segment.slice(1)] = value;
        } else if(segment !== value) {
          ok = false;
          break;
        };
      };

      if(ok) {
        return { route: routesByMethod[route], params };
      };
    };

    return null;
  };
};