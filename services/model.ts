export type DissaterData = Dissater[]

export interface Dissater {
  id: number
  name: string
  actions: Action[]
}

export interface Action {
  action_id: number
  thien_tai_id: number
  title: string
  description: string
}
