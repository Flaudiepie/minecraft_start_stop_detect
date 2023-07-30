import checkMcPort from "./portChecker"

const main = async () => {
    await checkMcPort(25565);
}

main()