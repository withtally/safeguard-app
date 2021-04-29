import {Routes} from 'modules/common/lib/types';
 
export const useUserInfo = () => {
    // TODO: get user role information from contract
    const userRole: keyof Routes = "manager";
    const userIsAdmin = false; //userRole === 'admin';

    return {
        userRole,
        userIsAdmin
    }
}