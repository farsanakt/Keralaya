

export interface IAdminUserRepository {
    saveUser(data:): Promise<void>
    getAllUsers(): Promise<any[]>;
   
    
 
}