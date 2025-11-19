import { atom } from "jotai";
const isLoginAtom = atom({
  key: 'isLoginAtom',
  default: false,
});

export { isLoginAtom };
