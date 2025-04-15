export interface ITask {
    id?: string
    title: string
    description: string
    completed?: boolean
    createdAt?: Date
  }

  export interface IFunctionResponse<T> {
    status: number
    message: string
    error?: string
    data?: T
  }
  