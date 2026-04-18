/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/currently` | `/currently`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/today` | `/today`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/weekly` | `/weekly`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/currently` | `/currently`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/today` | `/today`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/weekly` | `/weekly`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/currently${`?${string}` | `#${string}` | ''}` | `/currently${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/today${`?${string}` | `#${string}` | ''}` | `/today${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/weekly${`?${string}` | `#${string}` | ''}` | `/weekly${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/currently` | `/currently`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/today` | `/today`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/weekly` | `/weekly`; params?: Router.UnknownInputParams; };
    }
  }
}
