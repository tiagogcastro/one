declare module '@ioc:Adonis/Core/Request' {

  export interface RequestContract {
    user: {
      id: string;
    }
  }
}