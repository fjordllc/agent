/** src/app/login/actions.ts 内の data を同じ型を指定 **/
declare global {
  type AuthUser = {
    email: string;
    password: string;
  };
}

export {};
