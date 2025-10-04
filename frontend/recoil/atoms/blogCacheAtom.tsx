import type { BlogType } from "@venkitta/medium_common"
import { atom } from "recoil"

export const blogCacheAtom = atom<Record<string, BlogType>>({
    key: "blogCache",
    default: {},
})