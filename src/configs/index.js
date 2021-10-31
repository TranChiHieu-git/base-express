const JSONConfig = () => {
    let timeExpires = 12 * 60 * 60 * 1000;
    return {
        cookie_options: {
            maxAge: timeExpires,
            expires: new Date(Date.now() + timeExpires),
            path: "/"
        },
        secretKey: "AMQ/5JU@#*2^$5@#$J@ZXCM!@#$K@#$K124K@#I$",
        secretRefreshKey: "A/%j492SqGMJ%RI3!242$K312+4+-493$",
    }
}
module.exports = JSONConfig;
