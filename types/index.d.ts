declare module "ie-buster" {
  const check: () => boolean
  const clear: () => void
  const create: (options?: Options) => void
  const init: (options?: Options) => void

  export interface Options {
    appId?: string
    parentSelector?: string
    mainText?: string
    linkText?: string
    linkUrl?: string
    linkNewTab?: boolean
    appStyles?: { [key: string]: string | number } = {}
    cardStyles?: { [key: string]: string | number } = {}
    textStyles?: { [key: string]: string | number } = {}
    linkStyles?: { [key: string]: string | number } = {}
  }
}
