import moment from "moment";

export function timestamp(){
    console.log(`[${moment().format("DD/MM/YYYY")} - ${moment().format("HH:mm:ss")}] Updating game list ...`)
}