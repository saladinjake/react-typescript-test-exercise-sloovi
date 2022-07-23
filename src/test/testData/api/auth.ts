import { 
   mockUsers,
   mockAuthenticatedUser,
} from "../data/testdata"


export const getAssignedUsersWithoutRedux = async (): Promise<{name:string, company_id:string}[]> => {
    return Promise.resolve(mockUsers);
}

interface Authenticated{
     email:string;
     password:string;
     token:string;
     first_name:string; 
     last_name:string;
     company_id: string
}

interface ErrorInterface{
	error: string
}

export const loginUsersWithoutRedux = async (credentials:{email:string, password:string}): Promise<Authenticated | ErrorInterface> => {
    if(credentials.email == mockAuthenticatedUser[0].email && credentials.password== mockAuthenticatedUser[0].password){
      return   Promise.resolve(mockAuthenticatedUser[0]);
    }
    return Promise.reject({error: "unauthenticated"});
}