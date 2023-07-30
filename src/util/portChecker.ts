import { exec } from "child_process"

export const checkMcPort = async (port: number, watch: boolean): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        const command = `nc -l -p ${port} >/dev/null`;
        if(watch){
            exec(command, (error, stdout, stderr) => {
                if(error){
                    console.log(error)
                }
                resolve(true)
            })
        }
    })
}

export default checkMcPort;