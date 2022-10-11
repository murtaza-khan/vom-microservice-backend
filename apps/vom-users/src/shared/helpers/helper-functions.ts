import { HttpException, HttpStatus } from "@nestjs/common";


const validRole = async(currentUserRole:string , inputRole:string)=>{
    console.log("currentUserRole:" , currentUserRole , "inputRole:" , inputRole);
        if(inputRole === 'super' || inputRole === 'affliate' || inputRole === 'admin' || inputRole === 'group_manager' || inputRole === 'employee'){
        if(currentUserRole === 'super'){
            if(inputRole === 'affliate'){
                return true;
            }
            else{
                return false;
            }
        }
        else if(currentUserRole === 'affliate'){
            if(inputRole === 'admin'){
                return true;
            }
            else{
                return false;
            }
        }
        else if(currentUserRole === 'admin'){
            if(inputRole === 'group_manager' || inputRole === 'employee'){
                return true;
            }
            else{
                return false;
            }
        }
        else if(currentUserRole === 'group_manager'){
            if(inputRole === 'employee'){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }
    else{
        throw new HttpException(`invalid userRole ${inputRole}` , HttpStatus.BAD_REQUEST); 
    }
}

export {validRole}