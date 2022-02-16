declare namespace Express{
    export interface Request{
        user:{
            userId: string;
            iat: number;
            exp: number;
        }
      
    }
}