import { exec } from "child_process"

export const checkMcPort = async (port: number) => {
    const command = `nc -l -p ${port} >/dev/null`;
    await exec(command, (error, stdout, stderr) => {
        if(error){
            console.log(error)
        }
        console.log(`stdout: ${stdout}`)
    })

}

export default checkMcPort;