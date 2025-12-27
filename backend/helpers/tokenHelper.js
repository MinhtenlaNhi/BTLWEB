module.exports.tokenRandom = (length) => {
    let token = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0;i < length;i++){
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
}