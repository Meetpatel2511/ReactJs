export const API_KEY = 'AIzaSyDat3oPxmY9HL_0G6LI3kGP552h1S_XORs'

export const Convertor = (value) => {

    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"k";
    }
    else{
        return value
    }
    


}